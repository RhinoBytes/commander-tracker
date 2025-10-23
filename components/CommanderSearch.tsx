'use client';

import { useState, useEffect } from 'react';
import { scryfallAPI } from '@/utils/scryfall';
import { useGameState } from '@/hooks/useGameState';

interface CommanderSearchProps {
  playerId: number;
  isPartner?: boolean;
}

export default function CommanderSearch({ playerId, isPartner = false }: CommanderSearchProps) {
  const { setCommander, commanders } = useGameState();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentCommander = commanders[playerId]?.[isPartner ? 'partner' : 'main'];

  // Sync query with current commander name
  useEffect(() => {
    if (currentCommander?.name) {
      setQuery(currentCommander.name);
    }
  }, [currentCommander?.name]);

  const handleSearch = async (value: string) => {
    setQuery(value);
    setError(null);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const result = await scryfallAPI.getAutocompleteSuggestions(value);
      setSuggestions(result.data);
      if (result.data.length === 0 && value.length >= 3) {
        setError('No commanders found. Try a different search.');
      }
    } catch {
      setError('Failed to search. Check your internet connection.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (cardName: string) => {
    setLoading(true);
    setError(null);
    try {
      const card = await scryfallAPI.getCardByName(cardName);
      
      if (card) {
        setCommander(
          playerId,
          {
            name: card.name,
            image: scryfallAPI.getArtCropURL(card),
          },
          isPartner
        );
        setQuery(card.name);
      } else {
        setError('This card cannot be a commander.');
      }
    } catch {
      setError('Failed to fetch card details. Please try again.');
    } finally {
      setSuggestions([]);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-purple-300">
        {isPartner ? 'Partner Commander' : 'Main Commander'}
      </h4>
      
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search for a commander..."
          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
        />
        
        {loading && (
          <div className="absolute right-2 top-2">
            <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {error && (
          <div className="mt-1 text-xs text-red-400">
            {error}
          </div>
        )}
        
        {suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto bg-gray-900 border border-white/20 rounded shadow-lg">
            {suggestions.map((name) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className="w-full px-3 py-2 text-left hover:bg-purple-600 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      {currentCommander && (
        <div className="flex items-center gap-3 p-2 bg-white/5 rounded">
          <div
            className="w-14 h-14 bg-cover bg-center rounded border border-white/30"
            style={{ backgroundImage: `url(${currentCommander.image})` }}
          />
          <span className="text-sm font-semibold">{currentCommander.name}</span>
        </div>
      )}
    </div>
  );
}
