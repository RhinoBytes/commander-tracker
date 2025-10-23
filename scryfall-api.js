/**
 * Scryfall API Integration for Commander Tracker
 */
class ScryfallAPI {
  constructor() {
    this.baseURL = 'https://api.scryfall.com';
    this.autocompleteEndpoint = '/cards/autocomplete';
    this.namedCardEndpoint = '/cards/named';
    this.searchEndpoint = '/cards/search';
    this.debounceTimeout = null;
    this.debounceDelay = 300; // ms
  }

  /**
   * Get autocomplete suggestions as user types
   * @param {string} query - User input to search
   * @param {function} callback - Function to handle results
   */
  getAutocompleteSuggestions(query, callback) {
    // Clear any existing timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Don't search for less than 3 characters
    if (!query || query.length < 3) {
      callback({ data: [] });
      return;
    }

    // Debounce requests to avoid too many API calls
    this.debounceTimeout = setTimeout(() => {
      fetch(`${this.baseURL}${this.autocompleteEndpoint}?q=${encodeURIComponent(query)}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Scryfall API error: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          callback(data);
        })
        .catch(error => {
          console.error('Autocomplete error:', error);
          callback({ data: [] });
        });
    }, this.debounceDelay);
  }

  /**
   * Fetch full card data by exact name
   * @param {string} cardName - Exact card name
   * @param {function} callback - Function to handle card data
   */
  getCardByName(cardName, callback) {
    fetch(`${this.baseURL}${this.namedCardEndpoint}?exact=${encodeURIComponent(cardName)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Card not found: ${response.status}`);
        }
        return response.json();
      })
      .then(card => {
        // Check if this card can be a commander
        if (this.canBeCommander(card)) {
          callback(card);
        } else {
          callback(null, 'This card cannot be a commander.');
        }
      })
      .catch(error => {
        console.error('Card fetch error:', error);
        callback(null, 'Card not found or network error.');
      });
  }

  /**
   * Search for cards that can be commanders
   * @param {string} query - Search query
   * @param {function} callback - Function to handle search results
   */
  searchCommanders(query, callback) {
    // Build a query that searches for legendary creatures or planeswalkers with "can be your commander"
    const commanderQuery = `${query} (type:legendary type:creature) OR (type:planeswalker o:"can be your commander")`;

    fetch(`${this.baseURL}${this.searchEndpoint}?q=${encodeURIComponent(commanderQuery)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Search failed: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        callback(data);
      })
      .catch(error => {
        console.error('Commander search error:', error);
        callback({ data: [], error: error.message });
      });
  }

  /**
   * Check if a card can be a commander
   * @param {object} card - Card data from Scryfall
   * @returns {boolean} - Whether card can be a commander
   */
  canBeCommander(card) {
    // Check if it's a legendary creature
    const isLegendaryCreature =
      card.type_line &&
      card.type_line.includes('Legendary') &&
      card.type_line.includes('Creature');

    // Check if it's a planeswalker that can be a commander
    const isPlaneswalkerCommander =
      card.type_line &&
      card.type_line.includes('Planeswalker') &&
      card.oracle_text &&
      card.oracle_text.toLowerCase().includes('can be your commander');

    return isLegendaryCreature || isPlaneswalkerCommander;
  }

  /**
   * Get art crop URL for a card
   * @param {object} card - Card data from Scryfall
   * @returns {string} - URL to art crop image
   */
  getArtCropURL(card) {
    if (card && card.image_uris && card.image_uris.art_crop) {
      return card.image_uris.art_crop;
    } else if (card && card.card_faces && card.card_faces[0].image_uris) {
      // For double-faced cards, use front face
      return card.card_faces[0].image_uris.art_crop;
    } else {
      // Fallback to a default image
      return 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/e/0/e094c67d-1384-43c0-8ad0-bf91d8d47803.jpg';
    }
  }

  /**
   * Get normal card image URL for tooltips
   * @param {object} card - Card data from Scryfall
   * @returns {string} - URL to normal card image
   */
  getNormalImageURL(card) {
    if (card && card.image_uris && card.image_uris.normal) {
      return card.image_uris.normal;
    } else if (card && card.card_faces && card.card_faces[0].image_uris) {
      // For double-faced cards, use front face
      return card.card_faces[0].image_uris.normal;
    } else {
      // Fallback
      return 'https://c1.scryfall.com/file/scryfall-cards/normal/front/e/0/e094c67d-1384-43c0-8ad0-bf91d8d47803.jpg';
    }
  }
}