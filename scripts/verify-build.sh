#!/bin/bash
# Build verification script for Commander Tracker
# This script validates the build and checks for common issues

set -e

echo "🔍 Commander Tracker Build Verification"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall status
ERRORS=0
WARNINGS=0

# Function to print success
success() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print warning
warning() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# Function to print error
error() {
    echo -e "${RED}✗${NC} $1"
    ((ERRORS++))
}

echo "Step 1: Checking Node.js version..."
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -ge 20 ]; then
    success "Node.js version is $NODE_VERSION (>= 20 required)"
else
    error "Node.js version is $NODE_VERSION (>= 20 required)"
fi
echo ""

echo "Step 2: Checking dependencies..."
if [ -d "node_modules" ]; then
    success "node_modules directory exists"
else
    warning "node_modules not found, running npm install..."
    npm install
fi
echo ""

echo "Step 3: Running linter..."
if npm run lint > /tmp/lint.log 2>&1; then
    success "No ESLint errors or warnings"
else
    error "ESLint found issues. Check /tmp/lint.log"
    cat /tmp/lint.log
fi
echo ""

echo "Step 4: Checking TypeScript compilation..."
if npx tsc --noEmit > /tmp/tsc.log 2>&1; then
    success "TypeScript compilation successful"
else
    error "TypeScript errors found. Check /tmp/tsc.log"
    cat /tmp/tsc.log
fi
echo ""

echo "Step 5: Building production bundle..."
if npm run build > /tmp/build.log 2>&1; then
    success "Production build successful"
else
    error "Build failed. Check /tmp/build.log"
    cat /tmp/build.log
    exit 1
fi
echo ""

echo "Step 6: Checking build output..."
if [ -d ".next" ]; then
    success ".next directory created"
    
    # Check for critical files
    if [ -f ".next/package.json" ]; then
        success "Build package.json found"
    else
        error "Build package.json missing"
    fi
    
    if [ -d ".next/static" ]; then
        success "Static assets directory found"
    else
        error "Static assets directory missing"
    fi
    
    if [ -d ".next/server" ]; then
        success "Server build found"
    else
        error "Server build missing"
    fi
else
    error ".next directory not found"
fi
echo ""

echo "Step 7: Verifying public assets..."
if [ -d "public/images" ]; then
    IMAGE_COUNT=$(find public/images -type f | wc -l)
    success "Found $IMAGE_COUNT background images"
    
    # List images
    echo "   Images found:"
    find public/images -type f -exec basename {} \; | sed 's/^/   - /'
else
    warning "public/images directory not found"
fi
echo ""

echo "Step 8: Checking configuration..."
if [ -f "next.config.ts" ]; then
    success "next.config.ts found"
    
    # Check for problematic configurations
    if grep -q 'output.*standalone' next.config.ts; then
        warning "Using 'standalone' output mode - public files won't be copied automatically"
    else
        success "Not using standalone mode"
    fi
    
    if grep -q 'unoptimized.*true' next.config.ts; then
        success "Images configured as unoptimized (good for static export)"
    fi
else
    error "next.config.ts not found"
fi
echo ""

echo "Step 9: Checking for common issues..."

# Check for .env files
if [ -f ".env" ] || [ -f ".env.local" ]; then
    warning "Environment files found - ensure secrets are not committed"
fi

# Check for large node_modules in git
if git ls-files | grep -q node_modules; then
    error "node_modules appears to be committed to git"
fi

# Check for .next in git
if git ls-files | grep -q ".next/"; then
    error ".next directory appears to be committed to git"
fi

success "Common issues check complete"
echo ""

echo "Step 10: Build size analysis..."
if [ -d ".next" ]; then
    BUILD_SIZE=$(du -sh .next | cut -f1)
    success "Total build size: $BUILD_SIZE"
    
    STATIC_SIZE=$(du -sh .next/static 2>/dev/null | cut -f1 || echo "N/A")
    echo "   Static assets: $STATIC_SIZE"
    
    SERVER_SIZE=$(du -sh .next/server 2>/dev/null | cut -f1 || echo "N/A")
    echo "   Server bundle: $SERVER_SIZE"
fi
echo ""

echo "========================================"
echo "Build Verification Complete!"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "You can now run the production server:"
    echo "  npm start"
    echo ""
    echo "Or create a static export:"
    echo "  1. Add 'output: \"export\"' to next.config.ts"
    echo "  2. Run 'npm run build'"
    echo "  3. Deploy the 'out' directory"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠ Build completed with $WARNINGS warning(s)${NC}"
    echo "Review warnings above and address if necessary."
    exit 0
else
    echo -e "${RED}✗ Build failed with $ERRORS error(s) and $WARNINGS warning(s)${NC}"
    echo "Please fix the errors above before deploying."
    exit 1
fi
