document.addEventListener('DOMContentLoaded', function() {
  // Initialize Scryfall API
  const scryfallAPI = new ScryfallAPI();

  // Initialize player life counters and commander data
  const players = [1, 2, 3, 4];
  const commanderData = {
    1: {
      name: "",
      image: "",
      partnerName: null,
      partnerImage: null
    },
    2: {
      name: "",
      image: "",
      partnerName: null,
      partnerImage: null
    },
    3: {
      name: "",
      image: "",
      partnerName: null,
      partnerImage: null
    },
    4: {
      name: "",
      image: "",
      partnerName: null,
      partnerImage: null
    }
  };

  players.forEach(player => {
    const playerSquare = document.getElementById(`player${player}`);
    const lifeDisplay = document.getElementById(`p${player}-life`);
    const decrementArea = document.getElementById(`p${player}-decrement`);
    const incrementArea = document.getElementById(`p${player}-increment`);
    const menuButton = playerSquare.querySelector('.hamburger-icon');
    const menuPanel = playerSquare.querySelector('.menu-panel');
    const closeMenuButton = playerSquare.querySelector('.close-menu');

    // Life counter starting value
    let life = 40;

    // Decrease life when left side is clicked
    decrementArea.addEventListener('click', function(e) {
      e.stopPropagation();
      life -= 1;
      lifeDisplay.textContent = life;
      animateLifeChange(lifeDisplay, 'decrease');
    });

    // Increase life when right side is clicked
    incrementArea.addEventListener('click', function(e) {
      e.stopPropagation();
      life += 1;
      lifeDisplay.textContent = life;
      animateLifeChange(lifeDisplay, 'increase');
    });

    // Make life counter directly editable when clicked
    lifeDisplay.addEventListener('click', function(e) {
      e.stopPropagation();
      const currentLife = parseInt(lifeDisplay.textContent);

      // Create input element
      const input = document.createElement('input');
      input.type = 'number';
      input.value = currentLife;
      input.className = 'life-edit';
      input.min = 0;

      // Replace life display with input
      lifeDisplay.textContent = '';
      lifeDisplay.appendChild(input);
      input.focus();
      input.select();

      // Handle input blur and enter key
      function saveLifeTotal() {
        const newLife = parseInt(input.value);
        if (!isNaN(newLife) && newLife >= 0) {
          life = newLife;
          lifeDisplay.textContent = life;
          animateLifeChange(lifeDisplay, newLife > currentLife ? 'increase' : 'decrease');
        } else {
          lifeDisplay.textContent = currentLife;
        }
      }

      input.addEventListener('blur', saveLifeTotal);
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          saveLifeTotal();
          input.blur();
        }
      });
    });

    // Menu button functionality
    menuButton.addEventListener('click', function(e) {
      e.stopPropagation();
      menuPanel.classList.toggle('menu-open');
    });

    // Close menu button
    closeMenuButton.addEventListener('click', function() {
      menuPanel.classList.remove('menu-open');
    });

    // Set up main commander search
    setupCommanderSearch(player, scryfallAPI, false);

    // Set up partner commander search directly - no toggle needed
    setupCommanderSearch(player, scryfallAPI, true);

    // Set up commander damage trackers
    setupCommanderDamageTrackers(player, commanderData);

    // Set up infect counter
    setupInfectCounter(player);
  });

  // Animation for life change
  function animateLifeChange(element, type) {
    const color = type === 'decrease' ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)';
    element.style.backgroundColor = color;

    setTimeout(() => {
      element.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    }, 200);
  }

  // Commander damage tracker setup
  function setupCommanderDamageTrackers(player, commanderData) {
    const cmdDamageSection = document.getElementById(`p${player}-cmd-damage`);
    cmdDamageSection.innerHTML = ''; // Clear existing trackers

    // Create trackers for each opponent
    for (let i = 1; i <= 4; i++) {
      if (i !== player) {
        const opponentTracker = document.createElement('div');
        opponentTracker.className = 'cmd-damage-tracker';

        // Use opponent's commander name if available, otherwise use player number
        const opponentName = commanderData[i] ? commanderData[i].name.split(',')[0] : `Player ${i}`;

        opponentTracker.innerHTML = `
          <span>${opponentName}:</span>
          <div class="counter-controls">
            <button class="decrement-btn">-</button>
            <span class="damage-count" id="p${player}-cmd-damage-from-${i}">0</span>
            <button class="increment-btn">+</button>
          </div>
        `;

        cmdDamageSection.appendChild(opponentTracker);

        // Add event listeners to buttons
        const decrementBtn = opponentTracker.querySelector('.decrement-btn');
        const incrementBtn = opponentTracker.querySelector('.increment-btn');
        const damageCount = opponentTracker.querySelector('.damage-count');

        decrementBtn.addEventListener('click', function() {
          let count = parseInt(damageCount.textContent);
          if (count > 0) {
            count--;
            damageCount.textContent = count;

            // Check if we've reached commander damage threshold (21)
            if (count >= 21) {
              damageCount.classList.add('lethal-damage');
            } else {
              damageCount.classList.remove('lethal-damage');
            }
          }
        });

        incrementBtn.addEventListener('click', function() {
          let count = parseInt(damageCount.textContent);
          count++;
          damageCount.textContent = count;

          // Check if we've reached commander damage threshold (21)
          if (count >= 21) {
            damageCount.classList.add('lethal-damage');
          }
        });
      }
    }
  }

  // Infect counter setup
  function setupInfectCounter(player) {
    const playerSquare = document.getElementById(`player${player}`);
    const infectCounter = playerSquare.querySelector('.infect-counter');
    const decrementBtn = infectCounter.querySelector('.decrement-btn');
    const incrementBtn = infectCounter.querySelector('.increment-btn');
    const infectCount = infectCounter.querySelector('.infect-count');

    decrementBtn.addEventListener('click', function() {
      let count = parseInt(infectCount.textContent);
      if (count > 0) {
        count--;
        infectCount.textContent = count;

        // Check if we're at poison threshold
        if (count >= 10) {
          infectCount.classList.add('lethal-poison');
        } else {
          infectCount.classList.remove('lethal-poison');
        }
      }
    });

    incrementBtn.addEventListener('click', function() {
      let count = parseInt(infectCount.textContent);
      count++;
      infectCount.textContent = count;

      // Check if we've reached poison threshold
      if (count >= 10) {
        infectCount.classList.add('lethal-poison');
      }
    });
  }

  // Set up commander search with Scryfall API
  function setupCommanderSearch(playerId, scryfallAPI, isPartner = false) {
    const playerSquare = document.getElementById(`player${playerId}`);
    const searchIndex = isPartner ? 1 : 0;
    const searchInput = playerSquare.querySelectorAll('.commander-search')[searchIndex];
    const commanderPreview = playerSquare.querySelectorAll('.commander-preview')[searchIndex];
    const commanderName = playerSquare.querySelectorAll('.commander-name')[searchIndex];

    // Create suggestion dropdown if it doesn't exist
    let suggestionsContainer = searchInput.nextElementSibling;
    if (!suggestionsContainer || !suggestionsContainer.classList.contains('suggestions-dropdown')) {
      suggestionsContainer = document.createElement('div');
      suggestionsContainer.className = 'suggestions-dropdown';
      searchInput.parentNode.insertBefore(suggestionsContainer, searchInput.nextSibling);
    }

    // Create loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading-indicator';
    loadingIndicator.innerHTML = '<div class="spinner"></div>';
    loadingIndicator.style.display = 'none';
    searchInput.parentNode.insertBefore(loadingIndicator, suggestionsContainer);

    // Add event listener for input
    searchInput.addEventListener('input', function() {
      const query = searchInput.value.trim();

      // Show loading indicator for searches with 3+ characters
      if (query.length >= 3) {
        loadingIndicator.style.display = 'block';
      }

      // Get autocomplete suggestions
      scryfallAPI.getAutocompleteSuggestions(query, function(results) {
        loadingIndicator.style.display = 'none';
        suggestionsContainer.innerHTML = '';

        if (results.data && results.data.length > 0) {
          suggestionsContainer.style.display = 'block';

          // Display each suggestion
          results.data.forEach(cardName => {
            const suggestion = document.createElement('div');
            suggestion.className = 'suggestion-item';
            suggestion.textContent = cardName;
            suggestion.dataset.cardName = cardName;

            // Create tooltip container for this suggestion
            const tooltip = document.createElement('div');
            tooltip.className = 'card-tooltip';
            suggestion.appendChild(tooltip);

            // Load card image on hover
            suggestion.addEventListener('mouseenter', function() {
              tooltip.innerHTML = '<div class="spinner"></div>';

              scryfallAPI.getCardByName(cardName, function(card, error) {
                if (card) {
                  const imgUrl = scryfallAPI.getNormalImageURL(card);
                  tooltip.innerHTML = `<img src="${imgUrl}" alt="${cardName}">`;
                } else {
                  tooltip.innerHTML = `<div class="error-message">${error || 'Card not found'}</div>`;
                }
              });
            });

            // Select this commander when clicked
            suggestion.addEventListener('click', function() {
              selectCommander(cardName, playerId, isPartner, scryfallAPI);
              suggestionsContainer.style.display = 'none';
              searchInput.value = cardName;
            });

            suggestionsContainer.appendChild(suggestion);
          });
        } else if (query.length >= 3) {
          // No results found message
          suggestionsContainer.style.display = 'block';
          const noResults = document.createElement('div');
          noResults.className = 'no-results';
          noResults.textContent = 'No commanders found';
          suggestionsContainer.appendChild(noResults);
        } else {
          suggestionsContainer.style.display = 'none';
        }
      });
    });

    // Handle Enter key
    searchInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        const firstSuggestion = suggestionsContainer.querySelector('.suggestion-item');
        if (firstSuggestion) {
          selectCommander(firstSuggestion.dataset.cardName, playerId, isPartner, scryfallAPI);
          suggestionsContainer.style.display = 'none';
        }
      }
    });

    // Hide suggestions when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target) && !suggestionsContainer.contains(e.target)) {
        suggestionsContainer.style.display = 'none';
      }
    });

    // Allow direct commander name entry
    searchInput.addEventListener('blur', function() {
      setTimeout(() => {
        if (searchInput.value.trim().length > 0 && !suggestionsContainer.contains(document.activeElement)) {
          suggestionsContainer.style.display = 'none';
        }
      }, 200);
    });
  }

  // Select a commander from search results
  function selectCommander(cardName, playerId, isPartner, scryfallAPI) {
    const playerSquare = document.getElementById(`player${playerId}`);
    const searchIndex = isPartner ? 1 : 0;
    const commanderPreview = playerSquare.querySelectorAll('.commander-preview')[searchIndex];
    const commanderNameElement = playerSquare.querySelectorAll('.commander-name')[searchIndex];

    // Show loading in the preview
    commanderPreview.style.backgroundImage = 'none';
    commanderPreview.innerHTML = '<div class="spinner"></div>';

    // Fetch the full card data
    scryfallAPI.getCardByName(cardName, function(card, error) {
      commanderPreview.innerHTML = '';

      if (card) {
        const artUrl = scryfallAPI.getArtCropURL(card);

        // Update commander preview
        commanderPreview.style.backgroundImage = `url(${artUrl})`;
        commanderNameElement.textContent = card.name;

        // Update the commanderData object
        if (!commanderData[playerId]) {
          commanderData[playerId] = {};
        }

        if (isPartner) {
          // This is the partner commander
          commanderData[playerId].partnerName = card.name;
          commanderData[playerId].partnerImage = artUrl;
        } else {
          // This is the main commander
          commanderData[playerId].name = card.name;
          commanderData[playerId].image = artUrl;
        }

        // Check if we have both main and partner commanders
        if (commanderData[playerId].image && commanderData[playerId].partnerImage) {
          // Update player square with split background
          playerSquare.classList.add('has-partner');
          playerSquare.style.backgroundImage = `url(${commanderData[playerId].image}), url(${commanderData[playerId].partnerImage})`;

          // Update player name to include both commanders
          const mainShortName = commanderData[playerId].name.split(',')[0];
          const partnerShortName = commanderData[playerId].partnerName.split(',')[0];
          const playerNameElement = playerSquare.querySelector('.player-name');
          playerNameElement.textContent = `Player ${playerId}: ${mainShortName} & ${partnerShortName}`;
        } else if (commanderData[playerId].image) {
          // Only main commander is set
          playerSquare.classList.remove('has-partner');
          playerSquare.style.backgroundImage = `url(${commanderData[playerId].image})`;

          // Update player name to show only main commander
          const shortName = commanderData[playerId].name.split(',')[0];
          const playerNameElement = playerSquare.querySelector('.player-name');
          playerNameElement.textContent = `Player ${playerId}: ${shortName}`;
        }

        // Update commander damage labels in other players' sections
        if (!isPartner) {
          const shortName = card.name.split(',')[0];
          updateCommanderDamageLabels(playerId, shortName);
        }
      } else {
        // Error handling
        commanderPreview.style.backgroundImage = 'none';
        commanderPreview.innerHTML = '<div class="error">Not a valid commander</div>';
        commanderNameElement.textContent = 'Invalid Commander';
      }
    });
  }

  // Update commander damage labels when a commander changes
  function updateCommanderDamageLabels(changedPlayerId, shortName) {
    // For each player, update the damage tracker that references the changed player
    for (let i = 1; i <= 4; i++) {
      if (i !== changedPlayerId) {
        const damageSection = document.getElementById(`p${i}-cmd-damage`);
        if (damageSection) {
          // Find the specific tracker for the changed player by ID pattern
          const damageTracker = damageSection.querySelector(`[id$="-cmd-damage-from-${changedPlayerId}"]`);
          if (damageTracker) {
            // Find the parent tracker element
            const trackerElement = damageTracker.closest('.cmd-damage-tracker');
            if (trackerElement) {
              // Update the label text
              const label = trackerElement.querySelector('span:first-child');
              if (label) {
                label.textContent = `${shortName}:`;
              }
            }
          }
        }
      }
    }
  }
});