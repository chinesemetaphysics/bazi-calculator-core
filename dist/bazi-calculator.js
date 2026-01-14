/**
 * BaZi Calculator - Core Constants
 * Contains all fundamental data structures for Chinese Metaphysics
 * Version: 9.0 - Algorithmic Edition
 * 
 * REFERENCE POINTS (DO NOT MODIFY):
 * - December 17, 1923 = 甲子 (Jia Zi) Day Pillar - VERIFIED
 * - 2017 Annual Flying Star Center = 1
 * - Flying Star 9-year descending cycle
 */

// ==============================================
// HEAVENLY STEMS (天干) - Yin/Yang Five Elements
// ==============================================
const HEAVENLY_STEMS = [
    { chinese: '甲', pinyin: 'Jiǎ', english: 'Yang Wood', element: 'wood', polarity: 'yang', index: 0 },
    { chinese: '乙', pinyin: 'Yǐ', english: 'Yin Wood', element: 'wood', polarity: 'yin', index: 1 },
    { chinese: '丙', pinyin: 'Bǐng', english: 'Yang Fire', element: 'fire', polarity: 'yang', index: 2 },
    { chinese: '丁', pinyin: 'Dīng', english: 'Yin Fire', element: 'fire', polarity: 'yin', index: 3 },
    { chinese: '戊', pinyin: 'Wù', english: 'Yang Earth', element: 'earth', polarity: 'yang', index: 4 },
    { chinese: '己', pinyin: 'Jǐ', english: 'Yin Earth', element: 'earth', polarity: 'yin', index: 5 },
    { chinese: '庚', pinyin: 'Gēng', english: 'Yang Metal', element: 'metal', polarity: 'yang', index: 6 },
    { chinese: '辛', pinyin: 'Xīn', english: 'Yin Metal', element: 'metal', polarity: 'yin', index: 7 },
    { chinese: '壬', pinyin: 'Rén', english: 'Yang Water', element: 'water', polarity: 'yang', index: 8 },
    { chinese: '癸', pinyin: 'Guǐ', english: 'Yin Water', element: 'water', polarity: 'yin', index: 9 }
];

// ==============================================
// EARTHLY BRANCHES (地支) - Chinese Zodiac
// ==============================================
const EARTHLY_BRANCHES = [
    { chinese: '子', pinyin: 'Zǐ', animal: 'Rat', element: 'water', polarity: 'yang', 
      hours: '23:00-01:00', season: 'Winter', direction: 'N', index: 0,
      hiddenStems: ['癸'] }, // Gui Water
    { chinese: '丑', pinyin: 'Chǒu', animal: 'Ox', element: 'earth', polarity: 'yin',
      hours: '01:00-03:00', season: 'Winter', direction: 'NE', index: 1,
      hiddenStems: ['己', '癸', '辛'] }, // Ji Earth, Gui Water, Xin Metal
    { chinese: '寅', pinyin: 'Yín', animal: 'Tiger', element: 'wood', polarity: 'yang',
      hours: '03:00-05:00', season: 'Spring', direction: 'NE', index: 2,
      hiddenStems: ['甲', '丙', '戊'] }, // Jia Wood, Bing Fire, Wu Earth
    { chinese: '卯', pinyin: 'Mǎo', animal: 'Rabbit', element: 'wood', polarity: 'yin',
      hours: '05:00-07:00', season: 'Spring', direction: 'E', index: 3,
      hiddenStems: ['乙'] }, // Yi Wood
    { chinese: '辰', pinyin: 'Chén', animal: 'Dragon', element: 'earth', polarity: 'yang',
      hours: '07:00-09:00', season: 'Spring', direction: 'SE', index: 4,
      hiddenStems: ['戊', '乙', '癸'] }, // Wu Earth, Yi Wood, Gui Water
    { chinese: '巳', pinyin: 'Sì', animal: 'Snake', element: 'fire', polarity: 'yin',
      hours: '09:00-11:00', season: 'Summer', direction: 'SE', index: 5,
      hiddenStems: ['丙', '戊', '庚'] }, // Bing Fire, Wu Earth, Geng Metal
    { chinese: '午', pinyin: 'Wǔ', animal: 'Horse', element: 'fire', polarity: 'yang',
      hours: '11:00-13:00', season: 'Summer', direction: 'S', index: 6,
      hiddenStems: ['丁', '己'] }, // Ding Fire, Ji Earth
    { chinese: '未', pinyin: 'Wèi', animal: 'Goat', element: 'earth', polarity: 'yin',
      hours: '13:00-15:00', season: 'Summer', direction: 'SW', index: 7,
      hiddenStems: ['己', '丁', '乙'] }, // Ji Earth, Ding Fire, Yi Wood
    { chinese: '申', pinyin: 'Shēn', animal: 'Monkey', element: 'metal', polarity: 'yang',
      hours: '15:00-17:00', season: 'Autumn', direction: 'SW', index: 8,
      hiddenStems: ['庚', '壬', '戊'] }, // Geng Metal, Ren Water, Wu Earth
    { chinese: '酉', pinyin: 'Yǒu', animal: 'Rooster', element: 'metal', polarity: 'yin',
      hours: '17:00-19:00', season: 'Autumn', direction: 'W', index: 9,
      hiddenStems: ['辛'] }, // Xin Metal
    { chinese: '戌', pinyin: 'Xū', animal: 'Dog', element: 'earth', polarity: 'yang',
      hours: '19:00-21:00', season: 'Autumn', direction: 'NW', index: 10,
      hiddenStems: ['戊', '辛', '丁'] }, // Wu Earth, Xin Metal, Ding Fire
    { chinese: '亥', pinyin: 'Hài', animal: 'Pig', element: 'water', polarity: 'yin',
      hours: '21:00-23:00', season: 'Winter', direction: 'NW', index: 11,
      hiddenStems: ['壬', '甲'] } // Ren Water, Jia Wood
];

// ==============================================
// FIVE ELEMENTS (五行)
// ==============================================
const FIVE_ELEMENTS = {
    wood: { 
        chinese: '木', 
        english: 'Wood', 
        color: '#22c55e',
        produces: 'fire',     // Wood feeds Fire
        controls: 'earth',    // Wood controls Earth
        weakens: 'water',     // Wood drains Water
        controlledBy: 'metal', // Metal controls Wood
        organs: { yin: 'Liver 肝', yang: 'Gallbladder 膽' },
        season: 'Spring',
        direction: 'East',
        emotion: 'Anger'
    },
    fire: { 
        chinese: '火', 
        english: 'Fire', 
        color: '#ef4444',
        produces: 'earth',
        controls: 'metal',
        weakens: 'wood',
        controlledBy: 'water',
        organs: { yin: 'Heart 心', yang: 'Small Intestine 小腸' },
        season: 'Summer',
        direction: 'South',
        emotion: 'Joy'
    },
    earth: { 
        chinese: '土', 
        english: 'Earth', 
        color: '#eab308',
        produces: 'metal',
        controls: 'water',
        weakens: 'fire',
        controlledBy: 'wood',
        organs: { yin: 'Spleen 脾', yang: 'Stomach 胃' },
        season: 'Late Summer',
        direction: 'Center',
        emotion: 'Worry'
    },
    metal: { 
        chinese: '金', 
        english: 'Metal', 
        color: '#94a3b8',
        produces: 'water',
        controls: 'wood',
        weakens: 'earth',
        controlledBy: 'fire',
        organs: { yin: 'Lung 肺', yang: 'Large Intestine 大腸' },
        season: 'Autumn',
        direction: 'West',
        emotion: 'Grief'
    },
    water: { 
        chinese: '水', 
        english: 'Water', 
        color: '#3b82f6',
        produces: 'wood',
        controls: 'fire',
        weakens: 'metal',
        controlledBy: 'earth',
        organs: { yin: 'Kidney 腎', yang: 'Bladder 膀胱' },
        season: 'Winter',
        direction: 'North',
        emotion: 'Fear'
    }
};

// ==============================================
// FLYING STARS (飛星)
// ==============================================
const FLYING_STARS = {
    1: { 
        name: 'White', 
        chinese: '一白', 
        chineseName: '貪狼',
        english: 'Greedy Wolf',
        element: 'water', 
        nature: 'auspicious', 
        meaning: 'Career, Wisdom, Nobility',
        enhancement: 'Metal (generates Water)',
        cure: null
    },
    2: { 
        name: 'Black', 
        chinese: '二黑', 
        chineseName: '巨門',
        english: 'Giant Gate',
        element: 'earth', 
        nature: 'inauspicious', 
        meaning: 'Sickness, Illness',
        enhancement: null,
        cure: 'Metal (drains Earth) - 6 coins, Wu Lou'
    },
    3: { 
        name: 'Jade', 
        chinese: '三碧', 
        chineseName: '祿存',
        english: 'Salary Preserved',
        element: 'wood', 
        nature: 'neutral', 
        meaning: 'Arguments, Legal Issues, Gossip',
        enhancement: null,
        cure: 'Fire (exhausts Wood) - Red items, bright lights'
    },
    4: { 
        name: 'Green', 
        chinese: '四綠', 
        chineseName: '文曲',
        english: 'Literary Arts',
        element: 'wood', 
        nature: 'neutral', 
        meaning: 'Romance, Academic Success, Creativity',
        enhancement: 'Water (feeds Wood)',
        cure: null
    },
    5: { 
        name: 'Yellow', 
        chinese: '五黃', 
        chineseName: '廉貞',
        english: 'Incorruptible',
        element: 'earth', 
        nature: 'inauspicious', 
        meaning: 'Misfortune, Disasters - MOST MALEVOLENT',
        enhancement: null,
        cure: 'Heavy Metal - 6-rod wind chime, brass cure'
    },
    6: { 
        name: 'White', 
        chinese: '六白', 
        chineseName: '武曲',
        english: 'Military Arts',
        element: 'metal', 
        nature: 'auspicious', 
        meaning: 'Authority, Mentor Luck, Heaven Luck',
        enhancement: 'Earth (generates Metal)',
        cure: null
    },
    7: { 
        name: 'Red', 
        chinese: '七赤', 
        chineseName: '破軍',
        english: 'Army Breaker',
        element: 'metal', 
        nature: 'inauspicious', 
        meaning: 'Robbery, Injury, Betrayal',
        enhancement: null,
        cure: 'Water (drains Metal) - Blue items, water feature'
    },
    8: { 
        name: 'White', 
        chinese: '八白', 
        chineseName: '左輔',
        english: 'Left Assistant',
        element: 'earth', 
        nature: 'auspicious', 
        meaning: 'Wealth, Prosperity - CURRENT PERIOD STAR',
        enhancement: 'Fire (generates Earth)',
        cure: null
    },
    9: { 
        name: 'Purple', 
        chinese: '九紫', 
        chineseName: '右弼',
        english: 'Right Assistant',
        element: 'fire', 
        nature: 'auspicious', 
        meaning: 'Celebration, Future Prosperity, Recognition',
        enhancement: 'Wood (generates Fire)',
        cure: null
    }
};

// ==============================================
// LO SHU MAGIC SQUARE (洛書)
// ==============================================
const LOSHU = {
    positions: ['SE', 'S', 'SW', 'E', 'Center', 'W', 'NE', 'N', 'NW'],
    baseValues: [4, 9, 2, 3, 5, 7, 8, 1, 6], // Original Lo Shu arrangement
    // Grid mapping: index -> position
    //  SE(4)  S(9)  SW(2)
    //  E(3)   C(5)  W(7)
    //  NE(8)  N(1)  NW(6)
};

// ==============================================
// DIRECTION ELEMENTS
// ==============================================
const DIRECTION_ELEMENTS = {
    'N': 'water', 'S': 'fire', 'E': 'wood', 'W': 'metal',
    'NE': 'earth', 'NW': 'metal', 'SE': 'wood', 'SW': 'earth',
    'Center': 'earth'
};

const DIRECTION_NAMES = {
    'N': { english: 'North', chinese: '北' },
    'S': { english: 'South', chinese: '南' },
    'E': { english: 'East', chinese: '東' },
    'W': { english: 'West', chinese: '西' },
    'NE': { english: 'Northeast', chinese: '東北' },
    'NW': { english: 'Northwest', chinese: '西北' },
    'SE': { english: 'Southeast', chinese: '東南' },
    'SW': { english: 'Southwest', chinese: '西南' },
    'Center': { english: 'Center', chinese: '中' }
};

// ==============================================
// EIGHT MANSIONS (八宅) - Complete Kua Data
// ==============================================
const EIGHT_MANSIONS = {
    1: {
        group: 'East',
        favorable: {
            'SE': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath - Best for Wealth', rank: 1 },
            'E': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor - Health & Benefactors', rank: 2 },
            'S': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity - Relationships & Harmony', rank: 3 },
            'N': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability - Personal Growth', rank: 4 }
        },
        unfavorable: {
            'W': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap - Minor Setbacks', rank: 5 },
            'NE': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts - Backstabbing', rank: 6 },
            'NW': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings - Disputes', rank: 7 },
            'SW': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss - Most Harmful', rank: 8 }
        }
    },
    2: {
        group: 'West',
        favorable: {
            'NE': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 },
            'W': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 },
            'NW': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 },
            'SW': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 }
        },
        unfavorable: {
            'E': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 },
            'SE': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 },
            'S': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 },
            'N': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 }
        }
    },
    3: {
        group: 'East',
        favorable: {
            'S': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 },
            'N': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 },
            'SE': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 },
            'E': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 }
        },
        unfavorable: {
            'SW': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 },
            'NW': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 },
            'NE': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 },
            'W': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 }
        }
    },
    4: {
        group: 'East',
        favorable: {
            'N': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 },
            'S': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 },
            'E': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 },
            'SE': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 }
        },
        unfavorable: {
            'NW': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 },
            'SW': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 },
            'W': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 },
            'NE': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 }
        }
    },
    6: {
        group: 'West',
        favorable: {
            'W': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 },
            'NE': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 },
            'SW': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 },
            'NW': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 }
        },
        unfavorable: {
            'SE': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 },
            'E': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 },
            'N': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 },
            'S': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 }
        }
    },
    7: {
        group: 'West',
        favorable: {
            'NW': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 },
            'SW': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 },
            'NE': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 },
            'W': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 }
        },
        unfavorable: {
            'S': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 },
            'N': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 },
            'E': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 },
            'SE': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 }
        }
    },
    8: {
        group: 'West',
        favorable: {
            'SW': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 },
            'NW': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 },
            'W': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 },
            'NE': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 }
        },
        unfavorable: {
            'N': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 },
            'S': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 },
            'SE': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 },
            'E': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 }
        }
    },
    9: {
        group: 'East',
        favorable: {
            'E': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 },
            'SE': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 },
            'N': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 },
            'S': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 }
        },
        unfavorable: {
            'NE': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 },
            'W': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 },
            'SW': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 },
            'NW': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 }
        }
    }
};

// ==============================================
// TEN GODS (十神) RELATIONSHIPS
// ==============================================
const TEN_GODS = {
    'F': { chinese: '比肩', english: 'Friend', abbrev: 'F', nature: 'Same Element Same Polarity' },
    'RW': { chinese: '劫財', english: 'Rob Wealth', abbrev: 'RW', nature: 'Same Element Diff Polarity' },
    'EG': { chinese: '食神', english: 'Eating God', abbrev: 'EG', nature: 'Produced Same Polarity' },
    'HO': { chinese: '傷官', english: 'Hurting Officer', abbrev: 'HO', nature: 'Produced Diff Polarity' },
    'DW': { chinese: '正財', english: 'Direct Wealth', abbrev: 'DW', nature: 'Controlled Diff Polarity' },
    'IW': { chinese: '偏財', english: 'Indirect Wealth', abbrev: 'IW', nature: 'Controlled Same Polarity' },
    'DO': { chinese: '正官', english: 'Direct Officer', abbrev: 'DO', nature: 'Controller Diff Polarity' },
    '7K': { chinese: '七殺', english: 'Seven Killings', abbrev: '7K', nature: 'Controller Same Polarity' },
    'DR': { chinese: '正印', english: 'Direct Resource', abbrev: 'DR', nature: 'Producer Diff Polarity' },
    'IR': { chinese: '偏印', english: 'Indirect Resource', abbrev: 'IR', nature: 'Producer Same Polarity' }
};

// ==============================================
// NA YIN (納音) - 60 Jiazi Sound Elements
// ==============================================
const NA_YIN = [
    { jiazi: '甲子', nayin: '海中金', english: 'Gold in the Sea', element: 'metal' },
    { jiazi: '乙丑', nayin: '海中金', english: 'Gold in the Sea', element: 'metal' },
    { jiazi: '丙寅', nayin: '爐中火', english: 'Fire in the Furnace', element: 'fire' },
    { jiazi: '丁卯', nayin: '爐中火', english: 'Fire in the Furnace', element: 'fire' },
    { jiazi: '戊辰', nayin: '大林木', english: 'Wood of the Forest', element: 'wood' },
    { jiazi: '己巳', nayin: '大林木', english: 'Wood of the Forest', element: 'wood' },
    { jiazi: '庚午', nayin: '路旁土', english: 'Earth by the Roadside', element: 'earth' },
    { jiazi: '辛未', nayin: '路旁土', english: 'Earth by the Roadside', element: 'earth' },
    { jiazi: '壬申', nayin: '劍鋒金', english: 'Gold of the Sword', element: 'metal' },
    { jiazi: '癸酉', nayin: '劍鋒金', english: 'Gold of the Sword', element: 'metal' },
    { jiazi: '甲戌', nayin: '山頭火', english: 'Fire on the Mountain', element: 'fire' },
    { jiazi: '乙亥', nayin: '山頭火', english: 'Fire on the Mountain', element: 'fire' },
    { jiazi: '丙子', nayin: '澗下水', english: 'Water in the Stream', element: 'water' },
    { jiazi: '丁丑', nayin: '澗下水', english: 'Water in the Stream', element: 'water' },
    { jiazi: '戊寅', nayin: '城頭土', english: 'Earth on the City Wall', element: 'earth' },
    { jiazi: '己卯', nayin: '城頭土', english: 'Earth on the City Wall', element: 'earth' },
    { jiazi: '庚辰', nayin: '白蠟金', english: 'White Wax Gold', element: 'metal' },
    { jiazi: '辛巳', nayin: '白蠟金', english: 'White Wax Gold', element: 'metal' },
    { jiazi: '壬午', nayin: '楊柳木', english: 'Willow Wood', element: 'wood' },
    { jiazi: '癸未', nayin: '楊柳木', english: 'Willow Wood', element: 'wood' },
    { jiazi: '甲申', nayin: '泉中水', english: 'Water in the Spring', element: 'water' },
    { jiazi: '乙酉', nayin: '泉中水', english: 'Water in the Spring', element: 'water' },
    { jiazi: '丙戌', nayin: '屋上土', english: 'Earth on the Roof', element: 'earth' },
    { jiazi: '丁亥', nayin: '屋上土', english: 'Earth on the Roof', element: 'earth' },
    { jiazi: '戊子', nayin: '霹靂火', english: 'Thunderbolt Fire', element: 'fire' },
    { jiazi: '己丑', nayin: '霹靂火', english: 'Thunderbolt Fire', element: 'fire' },
    { jiazi: '庚寅', nayin: '松柏木', english: 'Pine and Cypress Wood', element: 'wood' },
    { jiazi: '辛卯', nayin: '松柏木', english: 'Pine and Cypress Wood', element: 'wood' },
    { jiazi: '壬辰', nayin: '長流水', english: 'Long Running Water', element: 'water' },
    { jiazi: '癸巳', nayin: '長流水', english: 'Long Running Water', element: 'water' },
    { jiazi: '甲午', nayin: '沙中金', english: 'Gold in the Sand', element: 'metal' },
    { jiazi: '乙未', nayin: '沙中金', english: 'Gold in the Sand', element: 'metal' },
    { jiazi: '丙申', nayin: '山下火', english: 'Fire at the Foot of Mountain', element: 'fire' },
    { jiazi: '丁酉', nayin: '山下火', english: 'Fire at the Foot of Mountain', element: 'fire' },
    { jiazi: '戊戌', nayin: '平地木', english: 'Wood on the Plain', element: 'wood' },
    { jiazi: '己亥', nayin: '平地木', english: 'Wood on the Plain', element: 'wood' },
    { jiazi: '庚子', nayin: '壁上土', english: 'Earth on the Wall', element: 'earth' },
    { jiazi: '辛丑', nayin: '壁上土', english: 'Earth on the Wall', element: 'earth' },
    { jiazi: '壬寅', nayin: '金箔金', english: 'Gold Foil', element: 'metal' },
    { jiazi: '癸卯', nayin: '金箔金', english: 'Gold Foil', element: 'metal' },
    { jiazi: '甲辰', nayin: '覆燈火', english: 'Lamp Fire', element: 'fire' },
    { jiazi: '乙巳', nayin: '覆燈火', english: 'Lamp Fire', element: 'fire' },
    { jiazi: '丙午', nayin: '天河水', english: 'Heavenly River Water', element: 'water' },
    { jiazi: '丁未', nayin: '天河水', english: 'Heavenly River Water', element: 'water' },
    { jiazi: '戊申', nayin: '大驛土', english: 'Earth of the Post Station', element: 'earth' },
    { jiazi: '己酉', nayin: '大驛土', english: 'Earth of the Post Station', element: 'earth' },
    { jiazi: '庚戌', nayin: '釵釧金', english: 'Hairpin Gold', element: 'metal' },
    { jiazi: '辛亥', nayin: '釵釧金', english: 'Hairpin Gold', element: 'metal' },
    { jiazi: '壬子', nayin: '桑柘木', english: 'Mulberry Wood', element: 'wood' },
    { jiazi: '癸丑', nayin: '桑柘木', english: 'Mulberry Wood', element: 'wood' },
    { jiazi: '甲寅', nayin: '大溪水', english: 'Water of the Great Stream', element: 'water' },
    { jiazi: '乙卯', nayin: '大溪水', english: 'Water of the Great Stream', element: 'water' },
    { jiazi: '丙辰', nayin: '沙中土', english: 'Earth in the Sand', element: 'earth' },
    { jiazi: '丁巳', nayin: '沙中土', english: 'Earth in the Sand', element: 'earth' },
    { jiazi: '戊午', nayin: '天上火', english: 'Fire in the Sky', element: 'fire' },
    { jiazi: '己未', nayin: '天上火', english: 'Fire in the Sky', element: 'fire' },
    { jiazi: '庚申', nayin: '石榴木', english: 'Pomegranate Wood', element: 'wood' },
    { jiazi: '辛酉', nayin: '石榴木', english: 'Pomegranate Wood', element: 'wood' },
    { jiazi: '壬戌', nayin: '大海水', english: 'Water of the Great Sea', element: 'water' },
    { jiazi: '癸亥', nayin: '大海水', english: 'Water of the Great Sea', element: 'water' }
];

// Export all constants
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        HEAVENLY_STEMS,
        EARTHLY_BRANCHES,
        FIVE_ELEMENTS,
        FLYING_STARS,
        LOSHU,
        DIRECTION_ELEMENTS,
        DIRECTION_NAMES,
        EIGHT_MANSIONS,
        TEN_GODS,
        NA_YIN
    };
}
/**
 * BaZi Calculator - Solar Terms Astronomical Calculator
 * Calculates Solar Terms algorithmically using VSOP87 simplified formulas
 * Valid for years 1900-2100+ with high accuracy
 * 
 * This replaces the hardcoded SOLAR_TERMS lookup table with computed values.
 */

// ==============================================
// SOLAR TERMS DEFINITIONS (二十四節氣)
// ==============================================
const SOLAR_TERM_DATA = [
    // 節氣 (Jie) - Major Solar Terms (odd numbers, start of months)
    { index: 0, name: 'Li Chun', chinese: '立春', english: 'Beginning of Spring', longitude: 315 },
    { index: 2, name: 'Jing Zhe', chinese: '驚蟄', english: 'Awakening of Insects', longitude: 345 },
    { index: 4, name: 'Qing Ming', chinese: '清明', english: 'Clear and Bright', longitude: 15 },
    { index: 6, name: 'Li Xia', chinese: '立夏', english: 'Beginning of Summer', longitude: 45 },
    { index: 8, name: 'Mang Zhong', chinese: '芒種', english: 'Grain in Ear', longitude: 75 },
    { index: 10, name: 'Xiao Shu', chinese: '小暑', english: 'Minor Heat', longitude: 105 },
    { index: 12, name: 'Li Qiu', chinese: '立秋', english: 'Beginning of Autumn', longitude: 135 },
    { index: 14, name: 'Bai Lu', chinese: '白露', english: 'White Dew', longitude: 165 },
    { index: 16, name: 'Han Lu', chinese: '寒露', english: 'Cold Dew', longitude: 195 },
    { index: 18, name: 'Li Dong', chinese: '立冬', english: 'Beginning of Winter', longitude: 225 },
    { index: 20, name: 'Da Xue', chinese: '大雪', english: 'Major Snow', longitude: 255 },
    { index: 22, name: 'Xiao Han', chinese: '小寒', english: 'Minor Cold', longitude: 285 },
    // 中氣 (Qi) - Minor Solar Terms (even numbers)
    { index: 1, name: 'Yu Shui', chinese: '雨水', english: 'Rain Water', longitude: 330 },
    { index: 3, name: 'Chun Fen', chinese: '春分', english: 'Spring Equinox', longitude: 0 },
    { index: 5, name: 'Gu Yu', chinese: '穀雨', english: 'Grain Rain', longitude: 30 },
    { index: 7, name: 'Xiao Man', chinese: '小滿', english: 'Grain Full', longitude: 60 },
    { index: 9, name: 'Xia Zhi', chinese: '夏至', english: 'Summer Solstice', longitude: 90 },
    { index: 11, name: 'Da Shu', chinese: '大暑', english: 'Major Heat', longitude: 120 },
    { index: 13, name: 'Chu Shu', chinese: '處暑', english: 'End of Heat', longitude: 150 },
    { index: 15, name: 'Qiu Fen', chinese: '秋分', english: 'Autumn Equinox', longitude: 180 },
    { index: 17, name: 'Shuang Jiang', chinese: '霜降', english: 'Frost Descent', longitude: 210 },
    { index: 19, name: 'Xiao Xue', chinese: '小雪', english: 'Minor Snow', longitude: 240 },
    { index: 21, name: 'Dong Zhi', chinese: '冬至', english: 'Winter Solstice', longitude: 270 },
    { index: 23, name: 'Da Han', chinese: '大寒', english: 'Major Cold', longitude: 300 }
];

// Jie (節) terms that mark month boundaries for BaZi
// Index in SOLAR_TERM_DATA: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22
const MONTH_BOUNDARY_TERMS = [
    { termIndex: 0, monthBranch: 2, name: 'Li Chun' },      // 立春 → 寅月 (Tiger)
    { termIndex: 2, monthBranch: 3, name: 'Jing Zhe' },     // 驚蟄 → 卯月 (Rabbit)
    { termIndex: 4, monthBranch: 4, name: 'Qing Ming' },    // 清明 → 辰月 (Dragon)
    { termIndex: 6, monthBranch: 5, name: 'Li Xia' },       // 立夏 → 巳月 (Snake)
    { termIndex: 8, monthBranch: 6, name: 'Mang Zhong' },   // 芒種 → 午月 (Horse)
    { termIndex: 10, monthBranch: 7, name: 'Xiao Shu' },    // 小暑 → 未月 (Goat)
    { termIndex: 12, monthBranch: 8, name: 'Li Qiu' },      // 立秋 → 申月 (Monkey)
    { termIndex: 14, monthBranch: 9, name: 'Bai Lu' },      // 白露 → 酉月 (Rooster)
    { termIndex: 16, monthBranch: 10, name: 'Han Lu' },     // 寒露 → 戌月 (Dog)
    { termIndex: 18, monthBranch: 11, name: 'Li Dong' },    // 立冬 → 亥月 (Pig)
    { termIndex: 20, monthBranch: 0, name: 'Da Xue' },      // 大雪 → 子月 (Rat)
    { termIndex: 22, monthBranch: 1, name: 'Xiao Han' }     // 小寒 → 丑月 (Ox)
];

// ==============================================
// JULIAN DAY CALCULATIONS
// ==============================================

/**
 * Convert Gregorian date to Julian Day Number
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day (can include decimal for time)
 * @returns {number} Julian Day Number
 */
function gregorianToJulianDay(year, month, day) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }
    
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    
    return Math.floor(365.25 * (year + 4716)) + 
           Math.floor(30.6001 * (month + 1)) + 
           day + B - 1524.5;
}

/**
 * Convert Julian Day Number to Gregorian date
 * @param {number} JD - Julian Day Number
 * @returns {Object} { year, month, day, hour, minute }
 */
function julianDayToGregorian(JD) {
    const Z = Math.floor(JD + 0.5);
    const F = JD + 0.5 - Z;
    
    let A;
    if (Z < 2299161) {
        A = Z;
    } else {
        const alpha = Math.floor((Z - 1867216.25) / 36524.25);
        A = Z + 1 + alpha - Math.floor(alpha / 4);
    }
    
    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);
    
    const day = B - D - Math.floor(30.6001 * E);
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;
    
    // Extract time from fractional day
    const dayFraction = F;
    const totalHours = dayFraction * 24;
    const hour = Math.floor(totalHours);
    const minute = Math.floor((totalHours - hour) * 60);
    
    return { 
        year, 
        month, 
        day: Math.floor(day), 
        hour, 
        minute,
        dayFraction: day - Math.floor(day)
    };
}

// ==============================================
// SOLAR LONGITUDE CALCULATION (VSOP87 Simplified)
// ==============================================

/**
 * Calculate apparent solar longitude for a given Julian Day
 * Based on simplified VSOP87 algorithm
 * Accuracy: ~0.01 degrees (sufficient for solar term calculation)
 * @param {number} JD - Julian Day Number
 * @returns {number} Solar longitude in degrees (0-360)
 */
function calculateSolarLongitude(JD) {
    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  FIXED: Corrected mean longitude coefficient                       ║
    // ║  Was: 360007.6982779 (WRONG - one extra zero!)                    ║
    // ║  Now: 36000.76983 (CORRECT)                                       ║
    // ╚════════════════════════════════════════════════════════════════════╝
    
    // Julian centuries from J2000.0 (Jan 1, 2000 12:00 TT)
    const T = (JD - 2451545.0) / 36525;
    const T2 = T * T;
    const T3 = T2 * T;
    
    // Mean longitude of the Sun (degrees)
    // L0 = 280.46646 + 36000.76983*T + 0.0003032*T²
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
    L0 = L0 % 360;
    if (L0 < 0) L0 += 360;
    
    // Mean anomaly of the Sun (degrees)
    // M = 357.52911 + 35999.05029*T - 0.0001537*T²
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T2;
    M = M % 360;
    if (M < 0) M += 360;
    const Mrad = M * Math.PI / 180;
    
    // Equation of center (degrees)
    const C = (1.914602 - 0.004817 * T - 0.000014 * T2) * Math.sin(Mrad)
            + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
            + 0.000289 * Math.sin(3 * Mrad);
    
    // Sun's true longitude
    let sunLong = L0 + C;
    
    // Mean longitude of ascending node of Moon (for nutation)
    let Omega = 125.04 - 1934.136 * T;
    const OmegaRad = (Omega % 360) * Math.PI / 180;
    
    // Apparent longitude (with nutation and aberration corrections)
    // Nutation: ~-0.00569° * sin(Ω)
    // Aberration: ~-0.00478°
    let apparentLong = sunLong - 0.00569 - 0.00478 * Math.sin(OmegaRad);
    
    // Normalize to 0-360
    apparentLong = apparentLong % 360;
    if (apparentLong < 0) apparentLong += 360;
    
    return apparentLong;
}

/**
 * Find the exact Julian Day when the Sun reaches a specific longitude
 * Uses Newton-Raphson iteration for precision
 * @param {number} year - Year to search within
 * @param {number} targetLongitude - Target solar longitude (0-360)
 * @returns {number} Julian Day Number
 */
function findSolarLongitudeJD(year, targetLongitude) {
    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  FIXED: Correct initial estimate based on solar term dates         ║
    // ║  Spring Equinox (longitude 0°) occurs around March 20 (day 79)    ║
    // ║  Sun moves ~0.9856° per day (360° / 365.25 days)                  ║
    // ╚════════════════════════════════════════════════════════════════════╝
    
    const avgDailyMotion = 360 / 365.25; // ~0.9856 degrees per day
    
    // Calculate days from Spring Equinox (March 20, day ~79)
    // Spring Equinox is at longitude 0°
    // We need to find when sun reaches targetLongitude
    
    let daysFromEquinox;
    if (targetLongitude <= 180) {
        // Longitude 0-180: Spring Equinox to Autumn Equinox (Mar-Sep)
        daysFromEquinox = targetLongitude / avgDailyMotion;
    } else {
        // Longitude 180-360: Autumn Equinox to next Spring Equinox (Sep-Mar)
        // 315° (Li Chun) is 45° before 360° (next Spring Equinox)
        // So it's about 45/0.9856 = ~46 days before March 20 = ~Feb 4
        daysFromEquinox = (targetLongitude - 360) / avgDailyMotion;
    }
    
    // Spring Equinox is around March 20 = day 79 of year
    const dayOfYear = 79 + daysFromEquinox;
    
    // Convert to Julian Day
    let JD = gregorianToJulianDay(year, 1, 1) + dayOfYear - 1;
    
    // Newton-Raphson iteration for precision
    for (let i = 0; i < 50; i++) {
        const currentLong = calculateSolarLongitude(JD);
        let diff = targetLongitude - currentLong;
        
        // Handle wrap-around at 0/360 boundary
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        
        // Check convergence (< 0.00001° is ~1 second accuracy)
        if (Math.abs(diff) < 0.00001) break;
        
        // Adjust JD based on how far off we are
        JD += diff / avgDailyMotion;
    }
    
    return JD;
}

// ==============================================
// SOLAR TERM DATE CALCULATION
// ==============================================

/**
 * Calculate the date of a specific solar term for a given year
 * @param {number} year - Gregorian year
 * @param {number} termIndex - Solar term index (0-23)
 * @returns {Object} { year, month, day, hour, minute, term }
 */
function calculateSolarTermDate(year, termIndex) {
    const term = SOLAR_TERM_DATA.find(t => t.index === termIndex);
    if (!term) {
        throw new Error(`Invalid term index: ${termIndex}`);
    }
    
    // Adjust year for terms after winter solstice
    let calcYear = year;
    if (termIndex >= 22) {
        // Xiao Han and Da Han are in January of the following year
        // But we calculate them for the Chinese year that starts at Li Chun
    }
    
    const JD = findSolarLongitudeJD(calcYear, term.longitude);
    const date = julianDayToGregorian(JD);
    
    return {
        ...date,
        term: term,
        julianDay: JD
    };
}

/**
 * Get all 12 Jie (節) dates for a year (month boundary terms)
 * @param {number} year - Gregorian year
 * @returns {Array} Array of term dates with metadata
 */
function getYearSolarTerms(year) {
    const terms = [];
    
    // Calculate all 12 Jie terms
    for (let i = 0; i < 12; i++) {
        const termIndex = i * 2; // Jie terms are at even indices (0, 2, 4, ...)
        const date = calculateSolarTermDate(year, termIndex);
        terms.push({
            ...date,
            solarMonthIndex: i, // 0 = 寅月, 1 = 卯月, etc.
            monthBranch: (i + 2) % 12
        });
    }
    
    return terms;
}

/**
 * Get the Li Chun date for a specific year
 * @param {number} year - Gregorian year
 * @returns {Object} Date object for Li Chun
 */
function getLiChunDate(year) {
    return calculateSolarTermDate(year, 0);
}

/**
 * Find which solar month a given date falls into
 * @param {number} year - Gregorian year
 * @param {number} month - Gregorian month (1-12)
 * @param {number} day - Day of month
 * @returns {Object} { solarMonthIndex, monthBranch, previousTerm, nextTerm }
 */
function getSolarMonthForDate(year, month, day) {
    // Get terms for current year and previous year
    const currentYearTerms = getYearSolarTerms(year);
    const prevYearTerms = getYearSolarTerms(year - 1);
    
    // Create a timeline of all relevant terms
    const allTerms = [
        ...prevYearTerms.slice(-2).map(t => ({ ...t, year: year - 1 })), // Last 2 terms of prev year
        ...currentYearTerms.map(t => ({ ...t, year }))
    ];
    
    // Convert target date to comparable value
    const targetJD = gregorianToJulianDay(year, month, day);
    
    // Find which term period the date falls into
    for (let i = allTerms.length - 1; i >= 0; i--) {
        const term = allTerms[i];
        const termJD = gregorianToJulianDay(term.year, term.month, term.day);
        
        if (targetJD >= termJD) {
            return {
                solarMonthIndex: term.solarMonthIndex,
                monthBranch: term.monthBranch,
                currentTerm: term,
                termDate: { year: term.year, month: term.month, day: term.day }
            };
        }
    }
    
    // Fallback (shouldn't reach here)
    return {
        solarMonthIndex: 10, // 子月
        monthBranch: 0
    };
}

// ==============================================
// CACHE FOR PERFORMANCE
// ==============================================
const solarTermCache = new Map();

/**
 * Get cached solar terms for a year
 * @param {number} year 
 * @returns {Array}
 */
function getCachedSolarTerms(year) {
    if (!solarTermCache.has(year)) {
        solarTermCache.set(year, getYearSolarTerms(year));
    }
    return solarTermCache.get(year);
}

/**
 * Clear the cache (useful if memory is a concern)
 */
function clearSolarTermCache() {
    solarTermCache.clear();
}

// ==============================================
// LEGACY COMPATIBILITY - Generate lookup table format
// ==============================================

/**
 * Generate SOLAR_TERMS lookup table in the old format for backward compatibility
 * Format: { year: [[m,d], [m,d], ...12 entries...] }
 * @param {number} startYear 
 * @param {number} endYear 
 * @returns {Object}
 */
function generateSolarTermsTable(startYear, endYear) {
    const table = {};
    
    for (let year = startYear; year <= endYear; year++) {
        const terms = getCachedSolarTerms(year);
        table[year] = terms.map(t => [t.month, t.day]);
    }
    
    return table;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SOLAR_TERM_DATA,
        MONTH_BOUNDARY_TERMS,
        gregorianToJulianDay,
        julianDayToGregorian,
        calculateSolarLongitude,
        findSolarLongitudeJD,
        calculateSolarTermDate,
        getYearSolarTerms,
        getLiChunDate,
        getSolarMonthForDate,
        getCachedSolarTerms,
        clearSolarTermCache,
        generateSolarTermsTable
    };
}
/**
 * BaZi Calculator - Four Pillars Calculator
 * Contains all pillar calculation functions with verified algorithms
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  Version: 9.0.1 - KUA FORMULA FIXED                             ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  REFERENCE POINTS - DO NOT MODIFY:                              ║
 * ║  - December 17, 1923 = 甲子 (Jia Zi) Day Pillar                 ║
 * ║  - Validated against historical figures (Jobs, Gates, etc.)       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ==============================================
// DAY PILLAR CALCULATION
// ==============================================

/**
 * Calculate Day Pillar using the verified reference point
 * December 17, 1923 = 甲子 (Jia Zi, index 0)
 */
function calculateDayPillar(year, month, day) {
    const refDate = Date.UTC(1923, 11, 17);
    const targetDate = Date.UTC(year, month - 1, day);
    const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
    const jiaziIndex = ((daysDiff % 60) + 60) % 60;

    return {
        stemIndex: jiaziIndex % 10,
        branchIndex: jiaziIndex % 12,
        jiaziIndex: jiaziIndex
    };
}

// ==============================================
// YEAR PILLAR CALCULATION
// ==============================================

function calculateYearPillar(year, month, day, liChunDate = null) {
    let liChun = liChunDate;
    if (!liChun && typeof getLiChunDate === 'function') {
        const liChunData = getLiChunDate(year);
        liChun = { month: liChunData.month, day: liChunData.day };
    }
    if (!liChun) {
        liChun = { month: 2, day: 4 };
    }

    let adjustedYear = year;
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) {
        adjustedYear = year - 1;
    }

    const stemIndex = ((adjustedYear - 4) % 10 + 10) % 10;
    const branchIndex = ((adjustedYear - 4) % 12 + 12) % 12;

    return { stemIndex, branchIndex, adjustedYear, chineseYear: adjustedYear };
}

// ==============================================
// MONTH PILLAR CALCULATION
// ==============================================

function fallbackSolarMonth(year, month, day) {
    const jieApprox = [
        [2, 4], [3, 6], [4, 5], [5, 6], [6, 6], [7, 7],
        [8, 8], [9, 8], [10, 8], [11, 7], [12, 7], [1, 6]
    ];

    let solarMonthIndex = 11;

    if (month === 1) {
        solarMonthIndex = day >= jieApprox[11][1] ? 11 : 10;
    } else if (month === 2) {
        solarMonthIndex = day >= jieApprox[0][1] ? 0 : 11;
    } else {
        for (let i = 1; i < 11; i++) {
            if (month === jieApprox[i][0]) {
                solarMonthIndex = day >= jieApprox[i][1] ? i : i - 1;
                break;
            } else if (month > jieApprox[i][0] && month < jieApprox[i + 1][0]) {
                solarMonthIndex = i;
                break;
            }
        }
    }

    return { solarMonthIndex, monthBranch: (solarMonthIndex + 2) % 12 };
}

function getSolarMonthName(index) {
    const names = [
        '寅月 (Tiger)', '卯月 (Rabbit)', '辰月 (Dragon)', '巳月 (Snake)',
        '午月 (Horse)', '未月 (Goat)', '申月 (Monkey)', '酉月 (Rooster)',
        '戌月 (Dog)', '亥月 (Pig)', '子月 (Rat)', '丑月 (Ox)'
    ];
    return names[index] || '';
}

function calculateMonthPillar(year, month, day, yearStemIndex, solarMonthInfo = null) {
    let solarMonth = solarMonthInfo;
    if (!solarMonth && typeof getSolarMonthForDate === 'function') {
        solarMonth = getSolarMonthForDate(year, month, day);
    }
    if (!solarMonth) {
        solarMonth = fallbackSolarMonth(year, month, day);
    }

    const solarMonthIndex = solarMonth.solarMonthIndex;
    const monthBranchIndex = (solarMonthIndex + 2) % 12;
    const stemBaseMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
    const monthStemBase = stemBaseMap[yearStemIndex];
    const monthStemIndex = (monthStemBase + solarMonthIndex) % 10;

    return {
        stemIndex: monthStemIndex,
        branchIndex: monthBranchIndex,
        solarMonthIndex,
        solarMonthName: getSolarMonthName(solarMonthIndex)
    };
}

// ==============================================
// HOUR PILLAR CALCULATION
// ==============================================

function calculateHourPillar(hour, minute, dayStemIndex) {
    const totalMinutes = hour * 60 + minute;
    let hourBranchIndex;

    if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) hourBranchIndex = 0;
    else if (totalMinutes < 3 * 60) hourBranchIndex = 1;
    else if (totalMinutes < 5 * 60) hourBranchIndex = 2;
    else if (totalMinutes < 7 * 60) hourBranchIndex = 3;
    else if (totalMinutes < 9 * 60) hourBranchIndex = 4;
    else if (totalMinutes < 11 * 60) hourBranchIndex = 5;
    else if (totalMinutes < 13 * 60) hourBranchIndex = 6;
    else if (totalMinutes < 15 * 60) hourBranchIndex = 7;
    else if (totalMinutes < 17 * 60) hourBranchIndex = 8;
    else if (totalMinutes < 19 * 60) hourBranchIndex = 9;
    else if (totalMinutes < 21 * 60) hourBranchIndex = 10;
    else hourBranchIndex = 11;

    const stemBaseMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
    const hourStemBase = stemBaseMap[dayStemIndex];
    const hourStemIndex = (hourStemBase + hourBranchIndex) % 10;

    const timeRanges = [
        '23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
        '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
        '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
    ];

    return {
        stemIndex: hourStemIndex,
        branchIndex: hourBranchIndex,
        timeRange: timeRanges[hourBranchIndex]
    };
}

// ==============================================
// KUA NUMBER CALCULATION
// ==============================================
// ╔════════════════════════════════════════════════════════════════════╗
// ║  ⚠️ PROTECTED - DO NOT MODIFY WITHOUT RUNNING VALIDATION TESTS    ║
// ║  Fixed v9.0.1 - Verified Kua formulas                             ║
// ║                                                                    ║
// ║  CORRECT FORMULAS:                                                 ║
// ║  • Pre-2000 Male:   10 - digit_sum                                ║
// ║  • Pre-2000 Female: digit_sum + 5                                 ║
// ║  • Post-2000 Male:  9 - digit_sum (if ≤0, add 9)                  ║
// ║  • Post-2000 Female: digit_sum + 6                                ║
// ║  • Kua 5: Males → 2, Females → 8                                  ║
// ╚════════════════════════════════════════════════════════════════════╝

function calculateKuaNumber(year, month, day, gender) {
    let calcYear = year;

    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  Li Chun (立春) is around February 3-5 each year                   ║
    // ║  Use getLiChunDate() for accurate date, fallback to Feb 4         ║
    // ╚════════════════════════════════════════════════════════════════════╝
    let liChunMonth = 2;
    let liChunDay = 4;

    // Get accurate Li Chun date if available
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            // Sanity check: Li Chun should always be in February
            if (liChun.month === 2 && liChun.day >= 3 && liChun.day <= 5) {
                liChunMonth = liChun.month;
                liChunDay = liChun.day;
            }
        } catch (e) {
            // Use default Feb 4
        }
    }

    // Chinese year starts at Li Chun, not Jan 1
    // If birth is before Li Chun, use previous year for Kua calculation
    if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
        calcYear = year - 1;
    }

    // Step 1: Take last two digits of the year
    const lastTwo = calcYear % 100;

    // Step 2: Sum digits until single digit (1-9)
    let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
    while (digitSum > 9) {
        digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
    }

    let kua;
    const isMale = gender === 'male';

    // Step 3: Apply gender and era-specific formula
    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  VERIFIED FORMULAS:                                               ║
    // ║  Pre-2000 Male:   10 - digit_sum                                  ║
    // ║  Pre-2000 Female: digit_sum + 5                                   ║
    // ║  Post-2000 Male:  9 - digit_sum                                   ║
    // ║  Post-2000 Female: digit_sum + 6                                  ║
    // ╚════════════════════════════════════════════════════════════════════╝
    if (calcYear >= 2000) {
        // Post-2000 formula
        if (isMale) {
            kua = 9 - digitSum;
            if (kua <= 0) kua += 9;
        } else {
            kua = digitSum + 6;
            if (kua > 9) kua -= 9;
        }
    } else {
        // Pre-2000 formula
        if (isMale) {
            kua = 10 - digitSum;
            if (kua <= 0) kua += 9;
            if (kua > 9) kua -= 9;
        } else {
            kua = digitSum + 5;
            if (kua > 9) kua -= 9;
        }
    }

    // Step 4: Kua 5 does not exist in Eight Mansions
    if (kua === 5) kua = isMale ? 2 : 8;

    return kua;
}

// ==============================================
// COMPLETE BAZI CHART
// ==============================================

function calculateBaZiChart(year, month, day, hour = 12, minute = 0, gender = 'male') {
    let liChunDate = null;
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            liChunDate = { month: liChun.month, day: liChun.day };
        } catch (e) { }
    }

    const yearPillar = calculateYearPillar(year, month, day, liChunDate);
    const monthPillar = calculateMonthPillar(year, month, day, yearPillar.stemIndex);
    const dayPillar = calculateDayPillar(year, month, day);
    const hourPillar = calculateHourPillar(hour, minute, dayPillar.stemIndex);
    const kuaNumber = calculateKuaNumber(year, month, day, gender);

    return {
        year: yearPillar,
        month: monthPillar,
        day: dayPillar,
        hour: hourPillar,
        dayMaster: dayPillar.stemIndex,
        kuaNumber,
        gender,
        birthInfo: { year, month, day, hour, minute, chineseYear: yearPillar.adjustedYear }
    };
}

// ==============================================
// VALIDATION
// ==============================================

function validateCalculations() {
    const tests = [];

    // Day Pillar Tests
    const ref1 = calculateDayPillar(1923, 12, 17);
    tests.push({
        name: 'Day: Dec 17, 1923 = 甲子',
        pass: ref1.stemIndex === 0 && ref1.branchIndex === 0,
        expected: '甲子', actual: `Stem:${ref1.stemIndex} Branch:${ref1.branchIndex}`
    });

    const ref2 = calculateDayPillar(1954, 4, 7);
    tests.push({
        name: 'Day: Apr 7, 1954 = 癸巳 (Famous Actor)',
        pass: ref2.stemIndex === 9 && ref2.branchIndex === 5,
        expected: '癸巳', actual: `Stem:${ref2.stemIndex} Branch:${ref2.branchIndex}`
    });

    // Steve Jobs: Feb 24, 1955 = 丙辰 (Bing Chen) - Yang Fire Day Master
    const refJobs = calculateDayPillar(1955, 2, 24);
    tests.push({
        name: 'Day: Feb 24, 1955 = 丙辰 (Steve Jobs)',
        pass: refJobs.stemIndex === 2 && refJobs.branchIndex === 4,
        expected: '丙辰', actual: `Stem:${refJobs.stemIndex} Branch:${refJobs.branchIndex}`
    });

    // Bill Gates: Oct 28, 1955 = 壬戌 (Ren Xu) - Yang Water Day Master
    const refGates = calculateDayPillar(1955, 10, 28);
    tests.push({
        name: 'Day: Oct 28, 1955 = 壬戌 (Bill Gates)',
        pass: refGates.stemIndex === 8 && refGates.branchIndex === 10,
        expected: '壬戌', actual: `Stem:${refGates.stemIndex} Branch:${refGates.branchIndex}`
    });

    // ═══════════════════════════════════════════════════════════════
    // KUA TESTS - MALE (Pre-2000): Formula = 10 - digit_sum
    // ═══════════════════════════════════════════════════════════════
    tests.push({
        name: 'Kua: 1960 Male = 4 ★PRIMARY TEST★',
        pass: calculateKuaNumber(1960, 6, 15, 'male') === 4,
        expected: 4, actual: calculateKuaNumber(1960, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 1954 Male = 1 (Jackie Chan)',
        pass: calculateKuaNumber(1954, 4, 7, 'male') === 1,
        expected: 1, actual: calculateKuaNumber(1954, 4, 7, 'male')
    });

    tests.push({
        name: 'Kua: 1879 Male = 3 (Historical Figure)',
        pass: calculateKuaNumber(1879, 3, 14, 'male') === 3,
        expected: 3, actual: calculateKuaNumber(1879, 3, 14, 'male')
    });

    tests.push({
        name: 'Kua: 1974 Male = 8',
        pass: calculateKuaNumber(1974, 6, 15, 'male') === 8,
        expected: 8, actual: calculateKuaNumber(1974, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 1985 Male = 6',
        pass: calculateKuaNumber(1985, 6, 15, 'male') === 6,
        expected: 6, actual: calculateKuaNumber(1985, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 1950 Male = 2 (5→2)',
        pass: calculateKuaNumber(1950, 6, 15, 'male') === 2,
        expected: 2, actual: calculateKuaNumber(1950, 6, 15, 'male')
    });

    // ═══════════════════════════════════════════════════════════════
    // KUA TESTS - FEMALE (Pre-2000): Formula = digit_sum + 5
    // ═══════════════════════════════════════════════════════════════
    tests.push({
        name: 'Kua: 1960 Female = 2',
        pass: calculateKuaNumber(1960, 6, 15, 'female') === 2,
        expected: 2, actual: calculateKuaNumber(1960, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 1985 Female = 9',
        pass: calculateKuaNumber(1985, 6, 15, 'female') === 9,
        expected: 9, actual: calculateKuaNumber(1985, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 1990 Female = 8 (5→8)',
        pass: calculateKuaNumber(1990, 6, 15, 'female') === 8,
        expected: 8, actual: calculateKuaNumber(1990, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 1969 Female = 2',
        pass: calculateKuaNumber(1969, 6, 15, 'female') === 2,
        expected: 2, actual: calculateKuaNumber(1969, 6, 15, 'female')
    });

    // ═══════════════════════════════════════════════════════════════
    // KUA TESTS - POST-2000
    // ═══════════════════════════════════════════════════════════════
    tests.push({
        name: 'Kua: 2012 Male = 6',
        pass: calculateKuaNumber(2012, 8, 31, 'male') === 6,
        expected: 6, actual: calculateKuaNumber(2012, 8, 31, 'male')
    });

    tests.push({
        name: 'Kua: 2000 Male = 9',
        pass: calculateKuaNumber(2000, 6, 15, 'male') === 9,
        expected: 9, actual: calculateKuaNumber(2000, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 2003 Female = 9',
        pass: calculateKuaNumber(2003, 6, 15, 'female') === 9,
        expected: 9, actual: calculateKuaNumber(2003, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 2000 Female = 6',
        pass: calculateKuaNumber(2000, 6, 15, 'female') === 6,
        expected: 6, actual: calculateKuaNumber(2000, 6, 15, 'female')
    });

    return tests;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateDayPillar, calculateYearPillar, calculateMonthPillar,
        calculateHourPillar, calculateKuaNumber, calculateBaZiChart,
        validateCalculations, fallbackSolarMonth, getSolarMonthName
    };
}
/**
 * BaZi Calculator - Flying Stars Calculator (飛星)
 * Calculates Annual, Monthly, Daily, and Hourly Flying Stars
 * 
 * Flying Star Feng Shui (玄空飛星) uses the Lo Shu magic square
 * with stars "flying" according to specific patterns.
 * 
 * Version: 9.0 - Algorithmic Edition
 */

// ==============================================
// LO SHU CONFIGURATION
// ==============================================

const LOSHU_POSITIONS = ['SE', 'S', 'SW', 'E', 'Center', 'W', 'NE', 'N', 'NW'];
const LOSHU_BASE = [4, 9, 2, 3, 5, 7, 8, 1, 6];

// Flying sequence (forward): Center → NW → W → NE → S → N → SW → E → SE
const FORWARD_SEQUENCE = [4, 8, 7, 6, 1, 0, 2, 3, 5];
// Flying sequence (reverse): Center → SE → E → SW → N → S → NE → W → NW
const REVERSE_SEQUENCE = [4, 5, 3, 2, 0, 1, 6, 7, 8];

// ==============================================
// FLYING STAR CHART GENERATION
// ==============================================

/**
 * Generate Flying Star chart from center star
 * Uses Lo Shu transformation formula
 * @param {number} centerStar - Center star (1-9)
 * @returns {Object} Direction -> Star number mapping
 */
function generateFlyingStarChart(centerStar) {
    const chart = {};
    
    // Calculate offset from base Lo Shu (center = 5)
    const offset = centerStar - 5;
    
    // Apply offset to each position
    for (let i = 0; i < 9; i++) {
        const position = LOSHU_POSITIONS[i];
        let starValue = LOSHU_BASE[i] + offset;
        
        // Wrap around 1-9 (not 0-8)
        while (starValue < 1) starValue += 9;
        while (starValue > 9) starValue -= 9;
        
        chart[position] = starValue;
    }
    
    return chart;
}

// ==============================================
// ANNUAL FLYING STARS
// ==============================================

/**
 * Calculate Annual Flying Star Chart
 * 
 * The annual center star follows a 9-year descending cycle:
 * - Period 8 (2004-2023): Star 8 is most auspicious
 * - Period 9 (2024-2043): Star 9 becomes most auspicious
 * 
 * Reference: 2017 Center = 1, 2018 = 9, 2019 = 8, ... 2026 = 1
 * Formula: Center = (1 - (year - 2017)) mod 9, where 0 → 9
 * 
 * @param {number} year - Gregorian year
 * @param {number} month - Month (for Li Chun adjustment)
 * @param {number} day - Day (for Li Chun adjustment)
 * @returns {Object} Flying star chart
 */
function calculateAnnualFlyingStars(year, month, day) {
    // Adjust for Li Chun (Chinese new year ~Feb 4)
    let fsYear = year;
    
    // Get Li Chun date
    let liChunMonth = 2, liChunDay = 4;
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            liChunMonth = liChun.month;
            liChunDay = liChun.day;
        } catch (e) {}
    }
    
    if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
        fsYear = year - 1;
    }
    
    // Calculate center star using 9-year descending cycle
    // 2017 = 1, 2018 = 9, 2019 = 8, etc.
    const diff = fsYear - 2017;
    let centerStar = ((1 - diff) % 9 + 9) % 9;
    if (centerStar === 0) centerStar = 9;
    
    return generateFlyingStarChart(centerStar);
}

/**
 * Get the annual center star for a year
 * @param {number} year 
 * @returns {number} Center star (1-9)
 */
function getAnnualCenterStar(year) {
    const diff = year - 2017;
    let centerStar = ((1 - diff) % 9 + 9) % 9;
    return centerStar === 0 ? 9 : centerStar;
}

// ==============================================
// MONTHLY FLYING STARS
// ==============================================

/**
 * Calculate Monthly Flying Star Chart
 * 
 * Monthly stars follow a pattern based on the year's center star:
 * - Years with center 1, 4, 7: February (寅月) starts with 8
 * - Years with center 2, 5, 8: February (寅月) starts with 5
 * - Years with center 3, 6, 9: February (寅月) starts with 2
 * 
 * Each subsequent month descends by 1 (Yang year) or ascends (Yin)
 * 
 * @param {number} year - Gregorian year
 * @param {number} month - Gregorian month (1-12)
 * @param {number} day - Day
 * @returns {Object} Flying star chart
 */
function calculateMonthlyFlyingStars(year, month, day) {
    // Get annual center star
    const annualCenter = getAnnualCenterStar(year);
    
    // Determine monthly starting star based on annual center
    let monthlyStartStar;
    if ([1, 4, 7].includes(annualCenter)) {
        monthlyStartStar = 8;
    } else if ([2, 5, 8].includes(annualCenter)) {
        monthlyStartStar = 5;
    } else {
        monthlyStartStar = 2;
    }
    
    // Get solar month index
    let solarMonthIndex = 0;
    if (typeof getSolarMonthForDate === 'function') {
        const solarInfo = getSolarMonthForDate(year, month, day);
        solarMonthIndex = solarInfo.solarMonthIndex;
    } else {
        // Approximate
        solarMonthIndex = (month + 9) % 12; // Convert to 寅月 = 0
    }
    
    // Calculate center star (descending each month)
    let monthlyCenterStar = monthlyStartStar - solarMonthIndex;
    while (monthlyCenterStar < 1) monthlyCenterStar += 9;
    
    return generateFlyingStarChart(monthlyCenterStar);
}

// ==============================================
// DAILY FLYING STARS
// ==============================================

/**
 * Calculate Daily Flying Star Chart
 * 
 * Daily stars are based on the 60 Jiazi cycle divided into three Yuan:
 * - Upper Yuan (上元): Jiazi 1-20, descending from star 1
 * - Middle Yuan (中元): Jiazi 21-40, descending from star 4 (or 7)
 * - Lower Yuan (下元): Jiazi 41-60, descending from star 7 (or 4)
 * 
 * Yang days use forward flight, Yin days use reverse flight.
 * 
 * @param {number} year - Year
 * @param {number} month - Month
 * @param {number} day - Day
 * @returns {Object} Flying star chart with metadata
 */
function calculateDailyFlyingStars(year, month, day) {
    // Get day pillar to determine Jiazi index
    let jiaziIndex = 0;
    if (typeof calculateDayPillar === 'function') {
        const dayPillar = calculateDayPillar(year, month, day);
        jiaziIndex = dayPillar.jiaziIndex;
    } else {
        // Calculate directly
        const refDate = Date.UTC(1923, 11, 17);
        const targetDate = Date.UTC(year, month - 1, day);
        const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
        jiaziIndex = ((daysDiff % 60) + 60) % 60;
    }
    
    // Determine Yuan and calculate daily center star
    // Traditional method: 9-day cycles within each 20-day Yuan
    let centerStar;
    const yuanPosition = jiaziIndex % 60;
    const cycleInYuan = yuanPosition % 9; // Position within 9-day cycle
    
    if (yuanPosition < 20) {
        // Upper Yuan - starts at 1, descends (1, 9, 8, 7, 6, 5, 4, 3, 2)
        centerStar = ((1 - cycleInYuan) % 9 + 9) % 9;
        if (centerStar === 0) centerStar = 9;
    } else if (yuanPosition < 40) {
        // Middle Yuan - starts at 4, descends (4, 3, 2, 1, 9, 8, 7, 6, 5)
        centerStar = ((4 - cycleInYuan) % 9 + 9) % 9;
        if (centerStar === 0) centerStar = 9;
    } else {
        // Lower Yuan - starts at 7, descends (7, 6, 5, 4, 3, 2, 1, 9, 8)
        centerStar = ((7 - cycleInYuan) % 9 + 9) % 9;
        if (centerStar === 0) centerStar = 9;
    }
    
    const chart = generateFlyingStarChart(centerStar);
    
    return {
        chart,
        centerStar,
        jiaziIndex,
        yuan: yuanPosition < 20 ? 'Upper' : yuanPosition < 40 ? 'Middle' : 'Lower'
    };
}

// ==============================================
// HOURLY FLYING STARS
// ==============================================

/**
 * Calculate Hourly Flying Star Chart
 * 
 * Hourly stars are based on the daily center star and shift each Chinese hour.
 * Yang days (odd stem index) use forward flight.
 * Yin days (even stem index) use reverse flight.
 * 
 * @param {number} year - Year
 * @param {number} month - Month
 * @param {number} day - Day
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @returns {Object} Hourly flying star data
 */
function calculateHourlyFlyingStars(year, month, day, hour, minute) {
    // Get daily flying star data
    const dailyData = calculateDailyFlyingStars(year, month, day);
    const dailyCenter = dailyData.centerStar;
    
    // Get day stem to determine Yang/Yin
    let dayStemIndex = 0;
    if (typeof calculateDayPillar === 'function') {
        const dayPillar = calculateDayPillar(year, month, day);
        dayStemIndex = dayPillar.stemIndex;
    } else {
        dayStemIndex = dailyData.jiaziIndex % 10;
    }
    
    // Determine Chinese hour index (0-11)
    const totalMinutes = hour * 60 + minute;
    let hourBranchIndex;
    
    if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) hourBranchIndex = 0;      // 子
    else if (totalMinutes < 3 * 60) hourBranchIndex = 1;   // 丑
    else if (totalMinutes < 5 * 60) hourBranchIndex = 2;   // 寅
    else if (totalMinutes < 7 * 60) hourBranchIndex = 3;   // 卯
    else if (totalMinutes < 9 * 60) hourBranchIndex = 4;   // 辰
    else if (totalMinutes < 11 * 60) hourBranchIndex = 5;  // 巳
    else if (totalMinutes < 13 * 60) hourBranchIndex = 6;  // 午
    else if (totalMinutes < 15 * 60) hourBranchIndex = 7;  // 未
    else if (totalMinutes < 17 * 60) hourBranchIndex = 8;  // 申
    else if (totalMinutes < 19 * 60) hourBranchIndex = 9;  // 酉
    else if (totalMinutes < 21 * 60) hourBranchIndex = 10; // 戌
    else hourBranchIndex = 11; // 亥
    
    // Yang/Yin day determines flight direction
    const isYangDay = dayStemIndex % 2 === 0; // 甲丙戊庚壬 = Yang
    
    // Calculate hourly center star
    let hourlyCenterStar;
    if (isYangDay) {
        // Forward flight
        hourlyCenterStar = dailyCenter + hourBranchIndex;
    } else {
        // Reverse flight
        hourlyCenterStar = dailyCenter - hourBranchIndex;
    }
    
    // Normalize to 1-9
    hourlyCenterStar = ((hourlyCenterStar - 1) % 9 + 9) % 9 + 1;
    
    const chart = generateFlyingStarChart(hourlyCenterStar);
    
    // Hour data
    const HOUR_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const HOUR_PINYIN = ['Zǐ', 'Chǒu', 'Yín', 'Mǎo', 'Chén', 'Sì', 'Wǔ', 'Wèi', 'Shēn', 'Yǒu', 'Xū', 'Hài'];
    const TIME_RANGES = [
        '23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
        '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
        '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
    ];
    
    return {
        chart,
        centerStar: hourlyCenterStar,
        hourBranchIndex,
        hourName: HOUR_NAMES[hourBranchIndex],
        hourPinyin: HOUR_PINYIN[hourBranchIndex],
        timeRange: TIME_RANGES[hourBranchIndex],
        isYangDay,
        flightDirection: isYangDay ? 'Forward (順飛)' : 'Reverse (逆飛)'
    };
}

/**
 * Get all 12 hourly flying star charts for a day
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @returns {Array} Array of hourly data
 */
function getAllHourlyStars(year, month, day) {
    const hours = [];
    const testHours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    
    for (let i = 0; i < 12; i++) {
        const hourData = calculateHourlyFlyingStars(year, month, day, testHours[i], 0);
        hours.push({
            ...hourData,
            index: i
        });
    }
    
    return hours;
}

// ==============================================
// ANNUAL AFFLICTIONS
// ==============================================

/**
 * Calculate Annual Afflictions based on the year branch
 * 
 * Afflictions:
 * - Tai Sui (太歲): Grand Duke Jupiter - do not face/disturb
 * - Sui Po (歲破): Year Breaker - opposite of Tai Sui
 * - Wu Huang (五黃): Five Yellow - from flying stars
 * - San Sha (三煞): Three Killings - based on year element frame
 * 
 * @param {number} year - Gregorian year
 * @param {number} month - Month
 * @param {number} day - Day
 * @returns {Object} Affliction locations
 */
function getAnnualAfflictions(year, month, day) {
    // Adjust for Li Chun
    let affYear = year;
    let liChunMonth = 2, liChunDay = 4;
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            liChunMonth = liChun.month;
            liChunDay = liChun.day;
        } catch (e) {}
    }
    
    if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
        affYear = year - 1;
    }
    
    // Year branch index
    const branchIndex = ((affYear - 4) % 12 + 12) % 12;
    
    // Tai Sui directions by branch
    const TAI_SUI_DIRECTIONS = {
        0: 'N',   // Rat
        1: 'NE',  // Ox (shared with Tiger)
        2: 'NE',  // Tiger
        3: 'E',   // Rabbit
        4: 'SE',  // Dragon (shared with Snake)
        5: 'SE',  // Snake
        6: 'S',   // Horse
        7: 'SW',  // Goat (shared with Monkey)
        8: 'SW',  // Monkey
        9: 'W',   // Rooster
        10: 'NW', // Dog (shared with Pig)
        11: 'NW'  // Pig
    };
    
    // San Sha based on year element frame
    // Fire frame (Yin-Wu-Xu: Tiger-Horse-Dog): N
    // Wood frame (Hai-Mao-Wei: Pig-Rabbit-Goat): W
    // Water frame (Shen-Zi-Chen: Monkey-Rat-Dragon): S
    // Metal frame (Si-You-Chou: Snake-Rooster-Ox): E
    const SAN_SHA_MAP = {
        0: 'S',   // Rat - Water frame
        1: 'E',   // Ox - Metal frame
        2: 'N',   // Tiger - Fire frame
        3: 'W',   // Rabbit - Wood frame
        4: 'S',   // Dragon - Water frame
        5: 'E',   // Snake - Metal frame
        6: 'N',   // Horse - Fire frame
        7: 'W',   // Goat - Wood frame
        8: 'S',   // Monkey - Water frame
        9: 'E',   // Rooster - Metal frame
        10: 'N',  // Dog - Fire frame
        11: 'W'   // Pig - Wood frame
    };
    
    const OPPOSITE = {
        'N': 'S', 'S': 'N', 'E': 'W', 'W': 'E',
        'NE': 'SW', 'SW': 'NE', 'NW': 'SE', 'SE': 'NW'
    };
    
    const taiSuiDir = TAI_SUI_DIRECTIONS[branchIndex];
    const suiPoDir = OPPOSITE[taiSuiDir];
    const sanShaDir = SAN_SHA_MAP[branchIndex];
    
    // Wu Huang from annual flying stars
    const annualStars = calculateAnnualFlyingStars(year, month, day);
    let wuHuangDir = 'Center';
    for (let dir in annualStars) {
        if (annualStars[dir] === 5) {
            wuHuangDir = dir;
            break;
        }
    }
    
    // Animal names
    const ANIMALS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
                     'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    
    return {
        taiSui: {
            direction: taiSuiDir,
            icon: '⚠️',
            name: 'Tai Sui',
            chinese: '太歲',
            description: 'Grand Duke Jupiter - Do not face or disturb'
        },
        suiPo: {
            direction: suiPoDir,
            icon: '🔄',
            name: 'Sui Po',
            chinese: '歲破',
            description: 'Year Breaker - Avoid major renovations'
        },
        wuHuang: {
            direction: wuHuangDir,
            icon: '🚫',
            name: 'Wu Huang',
            chinese: '五黃',
            description: 'Five Yellow - Most malevolent, requires metal cure'
        },
        sanSha: {
            direction: sanShaDir,
            icon: '⛔',
            name: 'San Sha',
            chinese: '三煞',
            description: 'Three Killings - Never sit with back to this direction',
            frame: getSanShaFrame(sanShaDir)
        },
        yearAnimal: ANIMALS[branchIndex],
        yearBranch: branchIndex
    };
}

/**
 * Get San Sha extended frame (affects 3 mountains)
 * @param {string} mainDir - Main direction
 * @returns {Array} All affected directions
 */
function getSanShaFrame(mainDir) {
    const frames = {
        'N': ['N', 'NE', 'NW'],
        'S': ['S', 'SE', 'SW'],
        'E': ['E', 'NE', 'SE'],
        'W': ['W', 'NW', 'SW']
    };
    return frames[mainDir] || [mainDir];
}

// ==============================================
// STAR ANALYSIS HELPERS
// ==============================================

/**
 * Get star nature classification
 * @param {number} star - Star number (1-9)
 * @returns {string} 'auspicious', 'inauspicious', or 'neutral'
 */
function getStarNature(star) {
    const auspicious = [1, 6, 8, 9];
    const inauspicious = [2, 5, 7];
    const neutral = [3, 4];
    
    if (auspicious.includes(star)) return 'auspicious';
    if (inauspicious.includes(star)) return 'inauspicious';
    return 'neutral';
}

/**
 * Find best direction for a given chart
 * @param {Object} chart - Flying star chart
 * @param {Array} excludeDirections - Directions to exclude (afflicted)
 * @returns {Object} Best direction data
 */
function findBestDirection(chart, excludeDirections = []) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const auspiciousStars = [8, 9, 1, 6]; // In order of current period importance
    
    for (let star of auspiciousStars) {
        for (let dir of directions) {
            if (chart[dir] === star && !excludeDirections.includes(dir)) {
                return {
                    direction: dir,
                    star: star,
                    nature: 'auspicious'
                };
            }
        }
    }
    
    // If no auspicious found, return least harmful
    return {
        direction: directions.find(d => !excludeDirections.includes(d) && [3, 4].includes(chart[d])) || 'Center',
        star: chart['Center'],
        nature: 'neutral'
    };
}

// ==============================================
// VALIDATION
// ==============================================

function validateFlyingStars() {
    const tests = [];
    
    // Test: 2026 center = 1
    const stars2026 = calculateAnnualFlyingStars(2026, 3, 1);
    tests.push({
        name: 'Flying Star: 2026 Center = 1',
        pass: stars2026['Center'] === 1,
        expected: 1,
        actual: stars2026['Center']
    });
    
    // Test: 2026 Wu Huang = South
    let wuHuangDir = Object.keys(stars2026).find(k => stars2026[k] === 5);
    tests.push({
        name: 'Flying Star: 2026 五黃 = South',
        pass: wuHuangDir === 'S',
        expected: 'S',
        actual: wuHuangDir
    });
    
    // Test: 2026 (Horse year) Tai Sui = S
    const aff2026 = getAnnualAfflictions(2026, 3, 1);
    tests.push({
        name: 'Affliction: 2026 太歲 = South',
        pass: aff2026.taiSui.direction === 'S',
        expected: 'S',
        actual: aff2026.taiSui.direction
    });
    
    // Test: 2026 San Sha = North
    tests.push({
        name: 'Affliction: 2026 三煞 = North',
        pass: aff2026.sanSha.direction === 'N',
        expected: 'N',
        actual: aff2026.sanSha.direction
    });
    
    return tests;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateFlyingStarChart,
        calculateAnnualFlyingStars,
        calculateMonthlyFlyingStars,
        calculateDailyFlyingStars,
        calculateHourlyFlyingStars,
        getAllHourlyStars,
        getAnnualAfflictions,
        getSanShaFrame,
        getStarNature,
        findBestDirection,
        getAnnualCenterStar,
        validateFlyingStars
    };
}
/**
 * BaZi Calculator Core - Verification Module
 * Runtime integrity and accuracy checks
 * 
 * Version: 1.1.1
 * 
 * This module provides:
 * 1. Calculation accuracy verification against known reference data
 * 2. Runtime integrity checks on page load
 * 3. Visual verification badge for users
 * 
 * Reference Points (Immutable):
 * - December 17, 1923 = 甲子 (Jia Zi) Day Pillar
 * - 2017 Annual Flying Star Center = 1
 * - Kua formulas verified against traditional texts
 */

// ==============================================
// VERIFICATION TEST SUITE
// ==============================================

const VERIFICATION_TESTS = {
    // Day Pillar Tests - Historical Reference Points
    dayPillar: [
        { date: [1923, 12, 17], expected: { stem: 0, branch: 0 }, name: 'Reference Point (甲子)' },
        { date: [1955, 2, 24], expected: { stem: 2, branch: 4 }, name: 'Steve Jobs (丙辰)' },
        { date: [1955, 10, 28], expected: { stem: 8, branch: 10 }, name: 'Bill Gates (壬戌)' },
        { date: [1954, 4, 7], expected: { stem: 9, branch: 5 }, name: 'Jackie Chan (癸巳)' },
        { date: [2000, 1, 1], expected: { stem: 4, branch: 6 }, name: 'Y2K (戊午)' },
        { date: [2026, 1, 14], expected: { stem: 4, branch: 0 }, name: 'Current Test (戊子)' }
    ],
    
    // Kua Number Tests - Pre-2000 and Post-2000
    kuaNumber: [
        { args: [1960, 6, 15, 'male'], expected: 4, formula: 'Pre-2000 Male' },
        { args: [1960, 6, 15, 'female'], expected: 2, formula: 'Pre-2000 Female' },
        { args: [1985, 6, 15, 'male'], expected: 6, formula: 'Pre-2000 Male' },
        { args: [1985, 6, 15, 'female'], expected: 9, formula: 'Pre-2000 Female' },
        { args: [1950, 6, 15, 'male'], expected: 2, formula: 'Kua 5→2 Male' },
        { args: [1990, 6, 15, 'female'], expected: 8, formula: 'Kua 5→8 Female' },
        { args: [2000, 6, 15, 'male'], expected: 9, formula: 'Post-2000 Male' },
        { args: [2000, 6, 15, 'female'], expected: 6, formula: 'Post-2000 Female' },
        { args: [2012, 8, 31, 'male'], expected: 6, formula: 'Post-2000 Male' },
        { args: [1954, 4, 7, 'male'], expected: 1, formula: 'Jackie Chan' }
    ],
    
    // Flying Star Center Tests - 9-year cycle
    flyingStarCenter: [
        { year: 2017, expected: 1 },
        { year: 2018, expected: 9 },
        { year: 2019, expected: 8 },
        { year: 2024, expected: 3 },
        { year: 2025, expected: 2 },
        { year: 2026, expected: 1 }
    ],
    
    // Zi Hour Tests - Late Zi (23:00-23:59) handling
    ziHour: [
        { date: [2000, 1, 1, 23, 30], expected: { isLateZi: true, hourStem: 0 }, name: 'Late Zi Hour' },
        { date: [2000, 1, 1, 12, 0], expected: { isLateZi: false }, name: 'Normal Hour' }
    ]
};

// ==============================================
// VERIFICATION FUNCTIONS
// ==============================================

/**
 * Run all verification tests
 * @returns {Object} { passed, failed, total, details, allPassed }
 */
function runVerificationTests() {
    const results = {
        passed: 0,
        failed: 0,
        total: 0,
        details: [],
        timestamp: new Date().toISOString(),
        version: '1.1.1'
    };
    
    // Test Day Pillar calculations
    if (typeof calculateDayPillar === 'function') {
        VERIFICATION_TESTS.dayPillar.forEach(test => {
            results.total++;
            const result = calculateDayPillar(...test.date);
            const pass = result.stemIndex === test.expected.stem && 
                        result.branchIndex === test.expected.branch;
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Day Pillar',
                name: test.name,
                input: test.date.join('-'),
                expected: `Stem:${test.expected.stem} Branch:${test.expected.branch}`,
                actual: `Stem:${result.stemIndex} Branch:${result.branchIndex}`,
                passed: pass
            });
        });
    }
    
    // Test Kua Number calculations
    if (typeof calculateKuaNumber === 'function') {
        VERIFICATION_TESTS.kuaNumber.forEach(test => {
            results.total++;
            const result = calculateKuaNumber(...test.args);
            const pass = result === test.expected;
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Kua Number',
                name: `${test.args[0]} ${test.args[3]} (${test.formula})`,
                expected: test.expected,
                actual: result,
                passed: pass
            });
        });
    }
    
    // Test Flying Star Center
    if (typeof getAnnualCenterStar === 'function') {
        VERIFICATION_TESTS.flyingStarCenter.forEach(test => {
            results.total++;
            const result = getAnnualCenterStar(test.year);
            const pass = result === test.expected;
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Flying Star',
                name: `${test.year} Center Star`,
                expected: test.expected,
                actual: result,
                passed: pass
            });
        });
    }
    
    // Test Zi Hour handling
    if (typeof calculateBaZiChart === 'function') {
        VERIFICATION_TESTS.ziHour.forEach(test => {
            results.total++;
            const result = calculateBaZiChart(...test.date, 'male');
            let pass = result.isLateZiHour === test.expected.isLateZi;
            
            if (test.expected.hourStem !== undefined) {
                pass = pass && result.hour.stemIndex === test.expected.hourStem;
            }
            
            if (pass) {
                results.passed++;
            } else {
                results.failed++;
            }
            
            results.details.push({
                category: 'Zi Hour',
                name: test.name,
                expected: JSON.stringify(test.expected),
                actual: `isLateZi:${result.isLateZiHour}, hourStem:${result.hour.stemIndex}`,
                passed: pass
            });
        });
    }
    
    results.allPassed = results.failed === 0;
    return results;
}

/**
 * Quick verification check (returns boolean only)
 * @returns {boolean}
 */
function quickVerify() {
    const results = runVerificationTests();
    return results.allPassed;
}

/**
 * Create verification badge HTML
 * @param {Object} results - Verification results
 * @returns {string} HTML string
 */
function createVerificationBadge(results) {
    const status = results.allPassed ? 'verified' : 'warning';
    const icon = results.allPassed ? '✓' : '⚠';
    const color = results.allPassed ? '#4CAF50' : '#ff9800';
    const text = results.allPassed 
        ? `Verified (${results.passed}/${results.total})` 
        : `Warning: ${results.failed} test(s) failed`;
    
    return `
        <div class="bazi-verification-badge" style="
            display: inline-flex;
            align-items: center;
            gap: 5px;
            padding: 4px 10px;
            background: ${color}20;
            border: 1px solid ${color};
            border-radius: 15px;
            font-size: 0.75rem;
            color: ${color};
            cursor: pointer;
        " title="Click for details" onclick="window.showVerificationDetails && window.showVerificationDetails()">
            <span>${icon}</span>
            <span>${text}</span>
        </div>
    `;
}

/**
 * Show verification details in console and optional modal
 */
function showVerificationDetails() {
    const results = runVerificationTests();
    
    console.group('🔍 BaZi Calculator Verification Report');
    console.log(`Timestamp: ${results.timestamp}`);
    console.log(`Version: ${results.version}`);
    console.log(`Status: ${results.allPassed ? '✓ ALL PASSED' : '⚠ SOME FAILURES'}`);
    console.log(`Results: ${results.passed}/${results.total} passed`);
    
    if (results.failed > 0) {
        console.group('❌ Failed Tests');
        results.details.filter(d => !d.passed).forEach(d => {
            console.log(`${d.category} - ${d.name}`);
            console.log(`  Expected: ${d.expected}`);
            console.log(`  Actual: ${d.actual}`);
        });
        console.groupEnd();
    }
    
    console.group('📋 All Test Details');
    results.details.forEach(d => {
        console.log(`${d.passed ? '✓' : '✗'} [${d.category}] ${d.name}`);
    });
    console.groupEnd();
    
    console.groupEnd();
    
    return results;
}

/**
 * Initialize verification on page load
 * Adds verification badge to page and logs results
 */
function initVerification(options = {}) {
    const {
        containerSelector = null,
        showBadge = true,
        logToConsole = true,
        onComplete = null
    } = options;
    
    // Run verification
    const results = runVerificationTests();
    
    // Log to console
    if (logToConsole) {
        console.log(`🔍 BaZi Verification: ${results.allPassed ? '✓ PASSED' : '⚠ FAILED'} (${results.passed}/${results.total})`);
        if (!results.allPassed) {
            console.warn('Some verification tests failed. Check console for details.');
            showVerificationDetails();
        }
    }
    
    // Add badge to page
    if (showBadge && typeof document !== 'undefined') {
        const badge = createVerificationBadge(results);
        
        if (containerSelector) {
            const container = document.querySelector(containerSelector);
            if (container) {
                container.insertAdjacentHTML('beforeend', badge);
            }
        } else {
            // Look for common footer elements
            const footerSelectors = ['footer', '.footer', '.copyright-footer', '#footer'];
            for (const selector of footerSelectors) {
                const footer = document.querySelector(selector);
                if (footer) {
                    footer.insertAdjacentHTML('afterbegin', badge);
                    break;
                }
            }
        }
    }
    
    // Callback
    if (typeof onComplete === 'function') {
        onComplete(results);
    }
    
    // Make details function available globally
    if (typeof window !== 'undefined') {
        window.showVerificationDetails = showVerificationDetails;
        window.baziVerificationResults = results;
    }
    
    return results;
}

// ==============================================
// INTEGRITY CHECK (Hash-based)
// ==============================================

/**
 * Simple checksum for core functions
 * Used to detect if core calculation functions have been modified
 */
function calculateIntegrityChecksum() {
    const criticalFunctions = [
        typeof calculateDayPillar === 'function' ? calculateDayPillar.toString() : '',
        typeof calculateKuaNumber === 'function' ? calculateKuaNumber.toString() : '',
        typeof calculateBaZiChart === 'function' ? calculateBaZiChart.toString() : ''
    ].join('');
    
    // Simple hash
    let hash = 0;
    for (let i = 0; i < criticalFunctions.length; i++) {
        const char = criticalFunctions.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    
    return hash.toString(16);
}

// ==============================================
// AUTO-INITIALIZATION
// ==============================================

if (typeof window !== 'undefined') {
    // Auto-run verification when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => initVerification({ showBadge: true }), 100);
        });
    } else {
        setTimeout(() => initVerification({ showBadge: true }), 100);
    }
}

// ==============================================
// EXPORTS
// ==============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        VERIFICATION_TESTS,
        runVerificationTests,
        quickVerify,
        createVerificationBadge,
        showVerificationDetails,
        initVerification,
        calculateIntegrityChecksum
    };
}

console.log('✓ BaZi Verification Module loaded');
