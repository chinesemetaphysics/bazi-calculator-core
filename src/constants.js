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
