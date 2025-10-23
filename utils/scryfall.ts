/**
 * Scryfall API Integration for Commander Tracker
 * Adapted for Next.js from the original scryfall-api.js
 */

export interface ScryfallCard {
  id: string;
  name: string;
  type_line: string;
  oracle_text?: string;
  mana_cost?: string;
  image_uris?: {
    art_crop: string;
    normal: string;
    large: string;
  };
  card_faces?: Array<{
    image_uris: {
      art_crop: string;
      normal: string;
      large: string;
    };
  }>;
}

export interface AutocompleteResponse {
  data: string[];
}

class ScryfallAPI {
  private baseURL = 'https://api.scryfall.com';
  private autocompleteEndpoint = '/cards/autocomplete';
  private namedCardEndpoint = '/cards/named';
  private searchEndpoint = '/cards/search';
  private debounceTimeout: NodeJS.Timeout | null = null;
  private debounceDelay = 300; // ms

  /**
   * Get autocomplete suggestions as user types
   */
  async getAutocompleteSuggestions(query: string): Promise<AutocompleteResponse> {
    if (!query || query.length < 3) {
      return { data: [] };
    }

    try {
      const response = await fetch(
        `${this.baseURL}${this.autocompleteEndpoint}?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`Scryfall API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Autocomplete error:', error);
      return { data: [] };
    }
  }

  /**
   * Fetch full card data by exact name
   */
  async getCardByName(cardName: string): Promise<ScryfallCard | null> {
    try {
      const response = await fetch(
        `${this.baseURL}${this.namedCardEndpoint}?exact=${encodeURIComponent(cardName)}`
      );

      if (!response.ok) {
        throw new Error(`Card not found: ${response.status}`);
      }

      const card = await response.json();

      // Check if this card can be a commander
      if (this.canBeCommander(card)) {
        return card;
      } else {
        throw new Error('This card cannot be a commander.');
      }
    } catch (error) {
      console.error('Card fetch error:', error);
      return null;
    }
  }

  /**
   * Search for cards that can be commanders
   */
  async searchCommanders(query: string): Promise<ScryfallCard[]> {
    const commanderQuery = `${query} (type:legendary type:creature) OR (type:planeswalker o:"can be your commander")`;

    try {
      const response = await fetch(
        `${this.baseURL}${this.searchEndpoint}?q=${encodeURIComponent(commanderQuery)}`
      );

      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Commander search error:', error);
      return [];
    }
  }

  /**
   * Check if a card can be a commander
   */
  canBeCommander(card: ScryfallCard): boolean {
    const isLegendaryCreature =
      !!card.type_line &&
      card.type_line.includes('Legendary') &&
      card.type_line.includes('Creature');

    const isPlaneswalkerCommander =
      !!card.type_line &&
      card.type_line.includes('Planeswalker') &&
      !!card.oracle_text &&
      card.oracle_text.toLowerCase().includes('can be your commander');

    return isLegendaryCreature || isPlaneswalkerCommander;
  }

  /**
   * Get art crop URL for a card
   */
  getArtCropURL(card: ScryfallCard): string {
    if (card?.image_uris?.art_crop) {
      return card.image_uris.art_crop;
    } else if (card?.card_faces?.[0]?.image_uris) {
      return card.card_faces[0].image_uris.art_crop;
    } else {
      return 'https://c1.scryfall.com/file/scryfall-cards/art_crop/front/e/0/e094c67d-1384-43c0-8ad0-bf91d8d47803.jpg';
    }
  }

  /**
   * Get normal card image URL for tooltips
   */
  getNormalImageURL(card: ScryfallCard): string {
    if (card?.image_uris?.normal) {
      return card.image_uris.normal;
    } else if (card?.card_faces?.[0]?.image_uris) {
      return card.card_faces[0].image_uris.normal;
    } else {
      return 'https://c1.scryfall.com/file/scryfall-cards/normal/front/e/0/e094c67d-1384-43c0-8ad0-bf91d8d47803.jpg';
    }
  }
}

// Export singleton instance
export const scryfallAPI = new ScryfallAPI();
