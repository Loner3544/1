export interface Prize {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Rare' | 'Legendary';
  imageUrl: string;
  notes: string; // Tasting notes
}

export interface FortuneResult {
  fortune: string; // The generated poetic fortune
  luckyElement: string; // e.g., "Water", "Wood"
}

export interface HistoryItem {
  id: string; // Unique timestamp ID
  prizeId: string;
  prizeName: string;
  prizeImage: string;
  fortune: string;
  luckyElement: string;
  timestamp: number;
}
