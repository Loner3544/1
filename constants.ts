import { Prize } from './types';

export const PRIZES: Prize[] = [
  {
    id: 'p1',
    name: '云雾普洱拿铁',
    description: '醇厚熟普与丝滑热奶的融合，仿佛置身景迈山的云雾之中，口感绵密。',
    rarity: 'Common',
    imageUrl: 'https://picsum.photos/id/425/600/600',
    notes: '陈香, 顺滑, 醇厚'
  },
  {
    id: 'p2',
    name: '古树美式',
    description: '300年树龄的生普与明亮浓缩咖啡的碰撞。唤醒灵魂的晨钟，回甘悠长。',
    rarity: 'Common',
    imageUrl: 'https://picsum.photos/id/431/600/600',
    notes: '花香, 回甘, 醒神'
  },
  {
    id: 'p3',
    name: '桂花糯香冷萃',
    description: '糯香普洱冷萃，点缀香甜干桂花，清凉中透着金秋的芬芳。',
    rarity: 'Rare',
    imageUrl: 'https://picsum.photos/id/312/600/600',
    notes: '甘甜, 馥郁, 清爽'
  },
  {
    id: 'p4',
    name: '陈皮摩卡',
    description: '广式陈皮融入巧克力酱，搭配深烘咖啡与陈年普洱，温暖治愈。',
    rarity: 'Rare',
    imageUrl: 'https://picsum.photos/id/1060/600/600',
    notes: '柑橘香, 浓郁, 温润'
  },
  {
    id: 'p5',
    name: '龙窑柴烧特调',
    description: '传统龙窑柴烧工艺带来的传奇风味。独特的烟熏香气连接过去与未来。',
    rarity: 'Legendary',
    imageUrl: 'https://picsum.photos/id/225/600/600',
    notes: '烟熏, 焦糖, 层次丰富'
  }
];

export const COLORS = {
  primary: '#8b3a3a', // Cinnabar Red
  secondary: '#3a5a40', // Tea Green
  paper: '#fdfbf7', // Rice Paper
  ink: '#2c2c2c', // Ink Black
  gold: '#d4af37', // Gold
};