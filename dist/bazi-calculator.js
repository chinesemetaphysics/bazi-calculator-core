/**
 * BaZi Calculator Core v3.7.0
 * https://github.com/chinesemetaphysics/bazi-calculator-core
 *
 * Core calculation engine for Four Pillars (BaZi) analysis
 * SSOT for TheArties applications
 * NEW in v3.7.0: Kua Number Verification System - Triple-method verification for accuracy
 * v3.5.0: 12 Officers (建除十二神) & 28 Mansions (二十八宿) - Date selection systems
 * v3.4.0: Qi Men Dun Jia (奇門遁甲) - Destiny Door timing analysis
 * v3.3.0: Use God (用神) calculation - the most important BaZi analysis
 */
(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS (Node.js)
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else {
        // Browser global
        global.BaZiCalculator = factory();
    }
})(typeof window !== 'undefined' ? window : this, function () {
    'use strict';

    // ============================================
    // CONSTANTS
    // ============================================
    /**
 * BaZi Layer 0 - Constants
 * Minimal constants required for Four Pillars calculation
 * SSOT for Heavenly Stems and Earthly Branches
 */

// Heavenly Stems (天干) - 10 stems
const HEAVENLY_STEMS = [
    { index: 0, chinese: '甲', pinyin: 'Jia', english: 'Yang Wood', element: 'wood', polarity: 'yang', number: 1 },
    { index: 1, chinese: '乙', pinyin: 'Yi', english: 'Yin Wood', element: 'wood', polarity: 'yin', number: 2 },
    { index: 2, chinese: '丙', pinyin: 'Bing', english: 'Yang Fire', element: 'fire', polarity: 'yang', number: 3 },
    { index: 3, chinese: '丁', pinyin: 'Ding', english: 'Yin Fire', element: 'fire', polarity: 'yin', number: 4 },
    { index: 4, chinese: '戊', pinyin: 'Wu', english: 'Yang Earth', element: 'earth', polarity: 'yang', number: 5 },
    { index: 5, chinese: '己', pinyin: 'Ji', english: 'Yin Earth', element: 'earth', polarity: 'yin', number: 6 },
    { index: 6, chinese: '庚', pinyin: 'Geng', english: 'Yang Metal', element: 'metal', polarity: 'yang', number: 7 },
    { index: 7, chinese: '辛', pinyin: 'Xin', english: 'Yin Metal', element: 'metal', polarity: 'yin', number: 8 },
    { index: 8, chinese: '壬', pinyin: 'Ren', english: 'Yang Water', element: 'water', polarity: 'yang', number: 9 },
    { index: 9, chinese: '癸', pinyin: 'Gui', english: 'Yin Water', element: 'water', polarity: 'yin', number: 10 }
];

// Earthly Branches (地支) - 12 branches / Chinese Zodiac
const EARTHLY_BRANCHES = [
    { index: 0, chinese: '子', pinyin: 'Zi', english: 'Rat', element: 'water', polarity: 'yang', hours: '23:00-00:59', hidden: ['癸'] },
    { index: 1, chinese: '丑', pinyin: 'Chou', english: 'Ox', element: 'earth', polarity: 'yin', hours: '01:00-02:59', hidden: ['己', '癸', '辛'] },
    { index: 2, chinese: '寅', pinyin: 'Yin', english: 'Tiger', element: 'wood', polarity: 'yang', hours: '03:00-04:59', hidden: ['甲', '丙', '戊'] },
    { index: 3, chinese: '卯', pinyin: 'Mao', english: 'Rabbit', element: 'wood', polarity: 'yin', hours: '05:00-06:59', hidden: ['乙'] },
    { index: 4, chinese: '辰', pinyin: 'Chen', english: 'Dragon', element: 'earth', polarity: 'yang', hours: '07:00-08:59', hidden: ['戊', '乙', '癸'] },
    { index: 5, chinese: '巳', pinyin: 'Si', english: 'Snake', element: 'fire', polarity: 'yin', hours: '09:00-10:59', hidden: ['丙', '庚', '戊'] },
    { index: 6, chinese: '午', pinyin: 'Wu', english: 'Horse', element: 'fire', polarity: 'yang', hours: '11:00-12:59', hidden: ['丁', '己'] },
    { index: 7, chinese: '未', pinyin: 'Wei', english: 'Goat', element: 'earth', polarity: 'yin', hours: '13:00-14:59', hidden: ['己', '丁', '乙'] },
    { index: 8, chinese: '申', pinyin: 'Shen', english: 'Monkey', element: 'metal', polarity: 'yang', hours: '15:00-16:59', hidden: ['庚', '壬', '戊'] },
    { index: 9, chinese: '酉', pinyin: 'You', english: 'Rooster', element: 'metal', polarity: 'yin', hours: '17:00-18:59', hidden: ['辛'] },
    { index: 10, chinese: '戌', pinyin: 'Xu', english: 'Dog', element: 'earth', polarity: 'yang', hours: '19:00-20:59', hidden: ['戊', '辛', '丁'] },
    { index: 11, chinese: '亥', pinyin: 'Hai', english: 'Pig', element: 'water', polarity: 'yin', hours: '21:00-22:59', hidden: ['壬', '甲'] }
];

// Hidden Stems in Earthly Branches (地支藏干)
// Each Earthly Branch contains hidden Heavenly Stems with strength percentages
// This is 70% of chart power for accurate element counting
const HIDDEN_STEMS = {
  // 子 Zi (Rat) - 100% Water
  0: [{ stem: 9, strength: 100 }], // 癸 Gui Water

  // 丑 Chou (Ox) - Earth primary
  1: [
    { stem: 5, strength: 60 },  // 己 Ji Earth (primary)
    { stem: 9, strength: 20 },  // 癸 Gui Water
    { stem: 7, strength: 20 }   // 辛 Xin Metal
  ],

  // 寅 Yin (Tiger) - Wood primary
  2: [
    { stem: 0, strength: 60 },  // 甲 Jia Wood (primary)
    { stem: 2, strength: 20 },  // 丙 Bing Fire
    { stem: 4, strength: 20 }   // 戊 Wu Earth
  ],

  // 卯 Mao (Rabbit) - 100% Wood
  3: [{ stem: 1, strength: 100 }], // 乙 Yi Wood

  // 辰 Chen (Dragon) - Earth primary
  4: [
    { stem: 4, strength: 60 },  // 戊 Wu Earth (primary)
    { stem: 1, strength: 20 },  // 乙 Yi Wood
    { stem: 9, strength: 20 }   // 癸 Gui Water
  ],

  // 巳 Si (Snake) - Fire primary
  5: [
    { stem: 2, strength: 60 },  // 丙 Bing Fire (primary)
    { stem: 4, strength: 20 },  // 戊 Wu Earth
    { stem: 6, strength: 20 }   // 庚 Geng Metal
  ],

  // 午 Wu (Horse) - Fire primary
  6: [
    { stem: 3, strength: 70 },  // 丁 Ding Fire (primary)
    { stem: 5, strength: 30 }   // 己 Ji Earth
  ],

  // 未 Wei (Goat) - Earth primary
  7: [
    { stem: 5, strength: 60 },  // 己 Ji Earth (primary)
    { stem: 3, strength: 20 },  // 丁 Ding Fire
    { stem: 1, strength: 20 }   // 乙 Yi Wood
  ],

  // 申 Shen (Monkey) - Metal primary
  8: [
    { stem: 6, strength: 60 },  // 庚 Geng Metal (primary)
    { stem: 8, strength: 20 },  // 壬 Ren Water
    { stem: 4, strength: 20 }   // 戊 Wu Earth
  ],

  // 酉 You (Rooster) - 100% Metal
  9: [{ stem: 7, strength: 100 }], // 辛 Xin Metal

  // 戌 Xu (Dog) - Earth primary
  10: [
    { stem: 4, strength: 60 },  // 戊 Wu Earth (primary)
    { stem: 7, strength: 20 },  // 辛 Xin Metal
    { stem: 3, strength: 20 }   // 丁 Ding Fire
  ],

  // 亥 Hai (Pig) - Water primary
  11: [
    { stem: 8, strength: 70 },  // 壬 Ren Water (primary)
    { stem: 0, strength: 30 }   // 甲 Jia Wood
  ]
};

/**
 * Get hidden stems for a specific branch
 * @param {number} branchIndex - Index of Earthly Branch (0-11)
 * @returns {Array} Array of hidden stem objects with stem index and strength
 */
function getHiddenStems(branchIndex) {
  return HIDDEN_STEMS[branchIndex] || [];
}

/**
 * Get hidden stems for all four pillars in a BaZi chart
 * @param {Object} chart - BaZi chart object with year, month, day, hour pillars
 * @returns {Object} Hidden stems for each pillar
 */
function getHiddenStemsForChart(chart) {
  const result = {
    year: getHiddenStems(chart.year.branch.index),
    month: getHiddenStems(chart.month.branch.index),
    day: getHiddenStems(chart.day.branch.index),
    hour: getHiddenStems(chart.hour.branch.index)
  };
  return result;
}

    // ============================================
    // TEN GODS & ELEMENT CYCLES
    // ============================================
    /**
 * Ten Gods Module
 * Ten Gods relationships and element cycle logic for BaZi analysis
 */

// Ten Gods (十神) - 10 fundamental relationships in BaZi
const TEN_GODS = {
  same_element_same_polarity: { chinese: '比肩', pinyin: 'Bi Jian', english: 'Friend', abbr: 'F', meaning: 'Peer support, competition, self-reliance' },
  same_element_diff_polarity: { chinese: '劫財', pinyin: 'Jie Cai', english: 'Rob Wealth', abbr: 'RW', meaning: 'Rivalry, loss of wealth, determination' },
  produces_me_same_polarity: { chinese: '偏印', pinyin: 'Pian Yin', english: 'Indirect Resource', abbr: 'IR', meaning: 'Unconventional learning, creativity, solitude' },
  produces_me_diff_polarity: { chinese: '正印', pinyin: 'Zheng Yin', english: 'Direct Resource', abbr: 'DR', meaning: 'Education, nurturing, mother figure' },
  i_produce_same_polarity: { chinese: '食神', pinyin: 'Shi Shen', english: 'Eating God', abbr: 'EG', meaning: 'Creativity, appetite, enjoyment, expression' },
  i_produce_diff_polarity: { chinese: '傷官', pinyin: 'Shang Guan', english: 'Hurting Officer', abbr: 'HO', meaning: 'Rebellion, talent, criticism, innovation' },
  controls_me_same_polarity: { chinese: '偏官', pinyin: 'Pian Guan', english: 'Seven Killings', abbr: '7K', meaning: 'Pressure, power, aggression, authority' },
  controls_me_diff_polarity: { chinese: '正官', pinyin: 'Zheng Guan', english: 'Direct Officer', abbr: 'DO', meaning: 'Status, discipline, husband figure' },
  i_control_same_polarity: { chinese: '偏財', pinyin: 'Pian Cai', english: 'Indirect Wealth', abbr: 'IW', meaning: 'Windfall, speculation, father figure' },
  i_control_diff_polarity: { chinese: '正財', pinyin: 'Zheng Cai', english: 'Direct Wealth', abbr: 'DW', meaning: 'Stable income, wife figure, savings' }
};

// Element Cycles - Fundamental Five Element relationships
const ELEMENT_CYCLES = {
  produces: { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' },
  controls: { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' },
  weakens: { wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal' },
  controlled_by: { wood: 'metal', fire: 'water', earth: 'wood', metal: 'fire', water: 'earth' }
};

/**
 * Calculate Ten God relationship between Day Master and another stem
 * @param {Object} dayStem - Day Master stem (must have element and polarity properties)
 * @param {Object} targetStem - Target stem to compare (must have element and polarity properties)
 * @returns {Object} Ten God object with chinese, pinyin, english, abbr, meaning
 */
function getTenGod(dayStem, targetStem) {
  const dayElement = dayStem.element;
  const targetElement = targetStem.element;
  const dayPolarity = dayStem.polarity;
  const targetPolarity = targetStem.polarity;
  const samePolarity = dayPolarity === targetPolarity;

  if (dayElement === targetElement) {
    return samePolarity ? TEN_GODS.same_element_same_polarity : TEN_GODS.same_element_diff_polarity;
  } else if (ELEMENT_CYCLES.produces[targetElement] === dayElement) {
    return samePolarity ? TEN_GODS.produces_me_same_polarity : TEN_GODS.produces_me_diff_polarity;
  } else if (ELEMENT_CYCLES.produces[dayElement] === targetElement) {
    return samePolarity ? TEN_GODS.i_produce_same_polarity : TEN_GODS.i_produce_diff_polarity;
  } else if (ELEMENT_CYCLES.controls[targetElement] === dayElement) {
    return samePolarity ? TEN_GODS.controls_me_same_polarity : TEN_GODS.controls_me_diff_polarity;
  } else if (ELEMENT_CYCLES.controls[dayElement] === targetElement) {
    return samePolarity ? TEN_GODS.i_control_same_polarity : TEN_GODS.i_control_diff_polarity;
  }
  return TEN_GODS.same_element_same_polarity;
}

/**
 * Describe relationship between an element and the Day Master's element
 * @param {string} myElement - Element to analyze
 * @param {string} dayElement - Day Master's element
 * @returns {string} Description of the relationship
 */
function getElementRelation(myElement, dayElement) {
  if (myElement === dayElement) return 'Same element day - Support for self, peer activities';
  if (ELEMENT_CYCLES.produces[dayElement] === myElement) return 'Day produces you - Resource & support energy';
  if (ELEMENT_CYCLES.produces[myElement] === dayElement) return 'You produce the day - Output & expression energy';
  if (ELEMENT_CYCLES.controls[dayElement] === myElement) return 'Day controls you - Authority & pressure energy';
  if (ELEMENT_CYCLES.controls[myElement] === dayElement) return 'You control the day - Wealth & opportunity energy';
  return 'Neutral relationship';
}

    // ============================================
    // BRANCH RELATIONS
    // ============================================
    /**
 * Branch Relations Module
 * Earthly Branch interactions (Harmonies, Clashes, Harms) for compatibility analysis
 */

// Six Harmonies (Liu He 六合) - Harmonic branch combinations
const SIX_HARMONIES = {
  '子': '丑', '丑': '子',
  '寅': '亥', '亥': '寅',
  '卯': '戌', '戌': '卯',
  '辰': '酉', '酉': '辰',
  '巳': '申', '申': '巳',
  '午': '未', '未': '午'
};

// Six Clashes (Liu Chong 六冲) - Conflicting branch combinations
const SIX_CLASHES = {
  '子': '午', '午': '子',
  '丑': '未', '未': '丑',
  '寅': '申', '申': '寅',
  '卯': '酉', '酉': '卯',
  '辰': '戌', '戌': '辰',
  '巳': '亥', '亥': '巳'
};

// Six Harms (Liu Hai 六害) - Harmful branch combinations
const SIX_HARMS = {
  '子': '未', '未': '子',
  '丑': '午', '午': '丑',
  '寅': '巳', '巳': '寅',
  '卯': '辰', '辰': '卯',
  '申': '亥', '亥': '申',
  '酉': '戌', '戌': '酉'
};

    // ============================================
    // NA YIN
    // ============================================
    /**
 * Na Yin Module
 * Na Yin (Sound Element) for 60 Jia Zi combinations
 */



// Na Yin (纳音) - 60 Jia Zi combinations with sound elements
const NAYIN = {
  '甲子': { element: 'metal', name: 'Gold in the Sea' }, '乙丑': { element: 'metal', name: 'Gold in the Sea' },
  '丙寅': { element: 'fire', name: 'Fire in the Furnace' }, '丁卯': { element: 'fire', name: 'Fire in the Furnace' },
  '戊辰': { element: 'wood', name: 'Wood of the Forest' }, '己巳': { element: 'wood', name: 'Wood of the Forest' },
  '庚午': { element: 'earth', name: 'Earth on the Road' }, '辛未': { element: 'earth', name: 'Earth on the Road' },
  '壬申': { element: 'metal', name: 'Sword Edge Metal' }, '癸酉': { element: 'metal', name: 'Sword Edge Metal' },
  '甲戌': { element: 'fire', name: 'Fire on the Mountain' }, '乙亥': { element: 'fire', name: 'Fire on the Mountain' },
  '丙子': { element: 'water', name: 'Stream Water' }, '丁丑': { element: 'water', name: 'Stream Water' },
  '戊寅': { element: 'earth', name: 'City Wall Earth' }, '己卯': { element: 'earth', name: 'City Wall Earth' },
  '庚辰': { element: 'metal', name: 'White Wax Metal' }, '辛巳': { element: 'metal', name: 'White Wax Metal' },
  '壬午': { element: 'wood', name: 'Willow Wood' }, '癸未': { element: 'wood', name: 'Willow Wood' },
  '甲申': { element: 'water', name: 'Spring Water' }, '乙酉': { element: 'water', name: 'Spring Water' },
  '丙戌': { element: 'earth', name: 'Roof Earth' }, '丁亥': { element: 'earth', name: 'Roof Earth' },
  '戊子': { element: 'fire', name: 'Thunderbolt Fire' }, '己丑': { element: 'fire', name: 'Thunderbolt Fire' },
  '庚寅': { element: 'wood', name: 'Pine & Cypress Wood' }, '辛卯': { element: 'wood', name: 'Pine & Cypress Wood' },
  '壬辰': { element: 'water', name: 'Long River Water' }, '癸巳': { element: 'water', name: 'Long River Water' },
  '甲午': { element: 'metal', name: 'Sand in Gold' }, '乙未': { element: 'metal', name: 'Sand in Gold' },
  '丙申': { element: 'fire', name: 'Fire at Mountain Foot' }, '丁酉': { element: 'fire', name: 'Fire at Mountain Foot' },
  '戊戌': { element: 'wood', name: 'Flat Land Wood' }, '己亥': { element: 'wood', name: 'Flat Land Wood' },
  '庚子': { element: 'earth', name: 'Earth on the Wall' }, '辛丑': { element: 'earth', name: 'Earth on the Wall' },
  '壬寅': { element: 'metal', name: 'Gold Foil Metal' }, '癸卯': { element: 'metal', name: 'Gold Foil Metal' },
  '甲辰': { element: 'fire', name: 'Lamp Fire' }, '乙巳': { element: 'fire', name: 'Lamp Fire' },
  '丙午': { element: 'water', name: 'Heavenly River Water' }, '丁未': { element: 'water', name: 'Heavenly River Water' },
  '戊申': { element: 'earth', name: 'Post Road Earth' }, '己酉': { element: 'earth', name: 'Post Road Earth' },
  '庚戌': { element: 'metal', name: 'Hairpin Metal' }, '辛亥': { element: 'metal', name: 'Hairpin Metal' },
  '壬子': { element: 'wood', name: 'Mulberry Wood' }, '癸丑': { element: 'wood', name: 'Mulberry Wood' },
  '甲寅': { element: 'water', name: 'Great Stream Water' }, '乙卯': { element: 'water', name: 'Great Stream Water' },
  '丙辰': { element: 'earth', name: 'Sand Earth' }, '丁巳': { element: 'earth', name: 'Sand Earth' },
  '戊午': { element: 'fire', name: 'Heavenly Fire' }, '己未': { element: 'fire', name: 'Heavenly Fire' },
  '庚申': { element: 'wood', name: 'Pomegranate Wood' }, '辛酉': { element: 'wood', name: 'Pomegranate Wood' },
  '壬戌': { element: 'water', name: 'Great Sea Water' }, '癸亥': { element: 'water', name: 'Great Sea Water' }
};

/**
 * Get Na Yin element and name for a stem-branch combination
 * @param {number|Object} stemIndex - Stem index (0-9) or stem object with chinese property
 * @param {number|Object} branchIndex - Branch index (0-11) or branch object with chinese property
 * @returns {Object} Na Yin object with element and name
 */
function getNaYin(stemIndex, branchIndex) {
  // Handle both index and object inputs
  const stem = typeof stemIndex === 'number' ? HEAVENLY_STEMS[stemIndex] : stemIndex;
  const branch = typeof branchIndex === 'number' ? EARTHLY_BRANCHES[branchIndex] : branchIndex;

  const key = stem.chinese + branch.chinese;
  return NAYIN[key] || { element: 'unknown', name: 'Unknown' };
}

    // ============================================
    // USE GOD
    // ============================================
    /**
 * Use God (用神) Module
 * Determines the balancing element for a BaZi chart
 * This is the MOST IMPORTANT analysis in BaZi - the Use God guides all life decisions
 */



/**
 * Seasonal Strength Table
 * Each element has different power levels in different months (branches)
 * Based on: 旺(Prosperous) 相(Growing) 休(Resting) 囚(Imprisoned) 死(Dead)
 */
const SEASONAL_STRENGTH = {
  wood: {
    // Spring (寅卯辰) - Prosperous (100)
    2: 100,  // 寅 Yin - Tiger
    3: 100,  // 卯 Mao - Rabbit
    4: 80,   // 辰 Chen - Dragon (transition to Earth)
    // Winter (亥子丑) - Growing (70)
    11: 70,  // 亥 Hai - Pig
    0: 70,   // 子 Zi - Rat
    1: 60,   // 丑 Chou - Ox (transition to Earth)
    // Summer (巳午未) - Resting (40)
    5: 40,   // 巳 Si - Snake
    6: 40,   // 午 Wu - Horse
    7: 30,   // 未 Wei - Goat (transition to Earth)
    // Autumn (申酉戌) - Imprisoned/Dead (10-20)
    8: 10,   // 申 Shen - Monkey
    9: 10,   // 酉 You - Rooster
    10: 20   // 戌 Xu - Dog (transition to Earth)
  },
  fire: {
    // Summer (巳午未) - Prosperous (100)
    5: 100,  // 巳 Si - Snake
    6: 100,  // 午 Wu - Horse
    7: 80,   // 未 Wei - Goat
    // Spring (寅卯辰) - Growing (70)
    2: 70,   // 寅 Yin - Tiger
    3: 70,   // 卯 Mao - Rabbit
    4: 60,   // 辰 Chen - Dragon
    // Autumn (申酉戌) - Resting (30-40)
    8: 30,   // 申 Shen - Monkey
    9: 30,   // 酉 You - Rooster
    10: 40,  // 戌 Xu - Dog
    // Winter (亥子丑) - Imprisoned/Dead (10)
    11: 10,  // 亥 Hai - Pig
    0: 10,   // 子 Zi - Rat
    1: 20    // 丑 Chou - Ox
  },
  earth: {
    // Earth is special - strongest in seasonal transitions (辰未戌丑)
    4: 100,  // 辰 Chen - Dragon (Spring→Summer)
    7: 100,  // 未 Wei - Goat (Summer→Autumn)
    10: 100, // 戌 Xu - Dog (Autumn→Winter)
    1: 100,  // 丑 Chou - Ox (Winter→Spring)
    // Summer (巳午) - Growing (70)
    5: 70,   // 巳 Si - Snake
    6: 70,   // 午 Wu - Horse
    // Autumn (申酉) - Resting (50)
    8: 50,   // 申 Shen - Monkey
    9: 50,   // 酉 You - Rooster
    // Spring (寅卯) - Imprisoned (30)
    2: 30,   // 寅 Yin - Tiger
    3: 30,   // 卯 Mao - Rabbit
    // Winter (亥子) - Dead (20)
    11: 20,  // 亥 Hai - Pig
    0: 20    // 子 Zi - Rat
  },
  metal: {
    // Autumn (申酉戌) - Prosperous (100)
    8: 100,  // 申 Shen - Monkey
    9: 100,  // 酉 You - Rooster
    10: 80,  // 戌 Xu - Dog
    // Earth months - Growing (60-70)
    4: 60,   // 辰 Chen - Dragon
    7: 60,   // 未 Wei - Goat
    1: 70,   // 丑 Chou - Ox
    // Winter (亥子) - Resting (40)
    11: 40,  // 亥 Hai - Pig
    0: 40,   // 子 Zi - Rat
    // Spring (寅卯) - Dead (10)
    2: 10,   // 寅 Yin - Tiger
    3: 10,   // 卯 Mao - Rabbit
    // Summer (巳午) - Imprisoned (20)
    5: 20,   // 巳 Si - Snake
    6: 20    // 午 Wu - Horse
  },
  water: {
    // Winter (亥子丑) - Prosperous (100)
    11: 100, // 亥 Hai - Pig
    0: 100,  // 子 Zi - Rat
    1: 80,   // 丑 Chou - Ox
    // Autumn (申酉戌) - Growing (70)
    8: 70,   // 申 Shen - Monkey
    9: 70,   // 酉 You - Rooster
    10: 60,  // 戌 Xu - Dog
    // Spring (寅卯辰) - Resting (40)
    2: 40,   // 寅 Yin - Tiger
    3: 40,   // 卯 Mao - Rabbit
    4: 30,   // 辰 Chen - Dragon
    // Summer (巳午未) - Imprisoned/Dead (10)
    5: 10,   // 巳 Si - Snake
    6: 10,   // 午 Wu - Horse
    7: 20    // 未 Wei - Goat
  }
};

/**
 * Get seasonal strength of an element in a specific month
 * @param {string} element - Element to check (wood/fire/earth/metal/water)
 * @param {number} monthBranch - Month branch index (0-11)
 * @returns {number} Strength score (0-100)
 */
function getSeasonalStrength(element, monthBranch) {
  return SEASONAL_STRENGTH[element][monthBranch] || 50;
}

/**
 * Calculate Day Master strength score
 * @param {Object} chart - Full chart object with all pillars
 * @returns {Object} { score: number (0-100), category: string, details: Object }
 */
function calculateDayMasterStrength(chart) {
  const dayMaster = chart.dayMaster || chart.day.stem;
  const dmElement = dayMaster.element;

  // Three factors determine Day Master strength:
  // 1. 得令 (De Ling) - Seasonal Timing (40% weight)
  // 2. 得地 (De Di) - Location/Roots in branches (30% weight)
  // 3. 得勢 (De Shi) - Support from other stems (30% weight)

  // === 1. SEASONAL STRENGTH (得令) - 40% ===
  const monthBranch = chart.month.branchIndex;
  const seasonalScore = getSeasonalStrength(dmElement, monthBranch);
  const seasonalWeight = seasonalScore * 0.4;

  // === 2. ROOTS IN BRANCHES (得地) - 30% ===
  // Check if Day Master has roots in earthly branches (including hidden stems)
  let rootCount = 0;
  let totalBranches = 0;

  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar]) {
      totalBranches++;
      const branch = chart[pillar].branch;

      // Check visible element
      if (branch.element === dmElement) {
        rootCount += 1.0; // Full root
      }

      // Check hidden stems
      if (branch.hidden) {
        branch.hidden.forEach((hiddenStem, index) => {
          const hiddenElement = HEAVENLY_STEMS.find(s => s.chinese === hiddenStem)?.element;
          if (hiddenElement === dmElement) {
            // Primary hidden stem = 0.6, secondary = 0.3, tertiary = 0.1
            const weight = index === 0 ? 0.6 : (index === 1 ? 0.3 : 0.1);
            rootCount += weight;
          }
        });
      }
    }
  });

  const rootPercentage = (rootCount / totalBranches) * 100;
  const rootWeight = rootPercentage * 0.3;

  // === 3. SUPPORT FROM STEMS (得勢) - 30% ===
  // Count stems that support Day Master (same element or produces Day Master)
  let supportCount = 0;
  let totalStems = 0;

  const elementCycles = {
    produces: { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' },
    produced_by: { fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal', wood: 'water' }
  };

  ['year', 'month', 'hour'].forEach(pillar => { // Exclude day stem (self)
    if (chart[pillar]) {
      totalStems++;
      const stemElement = chart[pillar].stem.element;

      if (stemElement === dmElement) {
        supportCount += 1.0; // Same element = full support
      } else if (elementCycles.produced_by[dmElement] === stemElement) {
        supportCount += 0.8; // Resource element = strong support
      }
    }
  });

  const supportPercentage = (supportCount / totalStems) * 100;
  const supportWeight = supportPercentage * 0.3;

  // === CALCULATE TOTAL STRENGTH ===
  const totalScore = seasonalWeight + rootWeight + supportWeight;

  // === CATEGORIZE STRENGTH ===
  let category;
  if (totalScore >= 75) {
    category = 'very-strong';
  } else if (totalScore >= 55) {
    category = 'strong';
  } else if (totalScore >= 35) {
    category = 'balanced';
  } else if (totalScore >= 20) {
    category = 'weak';
  } else {
    category = 'very-weak';
  }

  return {
    score: Math.round(totalScore),
    category: category,
    details: {
      seasonal: {
        score: seasonalScore,
        weighted: Math.round(seasonalWeight),
        description: `Day Master ${dmElement} born in ${EARTHLY_BRANCHES[monthBranch].chinese} month`
      },
      roots: {
        count: rootCount.toFixed(1),
        percentage: Math.round(rootPercentage),
        weighted: Math.round(rootWeight),
        description: `${rootCount.toFixed(1)} roots in 4 earthly branches`
      },
      support: {
        count: supportCount.toFixed(1),
        percentage: Math.round(supportPercentage),
        weighted: Math.round(supportWeight),
        description: `${supportCount.toFixed(1)} supporting stems out of 3`
      }
    }
  };
}

/**
 * Analyze elemental imbalances in the chart
 * @param {Object} chart - Full chart object
 * @returns {Object} { excessive: array, deficient: array, balanced: array }
 */
function analyzeImbalances(chart) {
  const elementCounts = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  // Count visible stems and branches
  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar]) {
      elementCounts[chart[pillar].stem.element]++;
      elementCounts[chart[pillar].branch.element]++;
    }
  });

  // Count hidden stems with reduced weight
  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar] && chart[pillar].branch.hidden) {
      chart[pillar].branch.hidden.forEach((hiddenStem, index) => {
        const hiddenElement = HEAVENLY_STEMS.find(s => s.chinese === hiddenStem)?.element;
        if (hiddenElement) {
          const weight = index === 0 ? 0.6 : (index === 1 ? 0.3 : 0.1);
          elementCounts[hiddenElement] += weight;
        }
      });
    }
  });

  // Categorize (out of 8 visible + ~4-6 hidden = ~12-14 total)
  const excessive = [];
  const deficient = [];
  const balanced = [];

  Object.entries(elementCounts).forEach(([element, count]) => {
    if (count >= 4) {
      excessive.push({ element, count: count.toFixed(1) });
    } else if (count <= 1) {
      deficient.push({ element, count: count.toFixed(1) });
    } else {
      balanced.push({ element, count: count.toFixed(1) });
    }
  });

  return { excessive, deficient, balanced, counts: elementCounts };
}

/**
 * Select the Use God (用神) for a BaZi chart
 * @param {Object} chart - Full chart object from calculateFullChart
 * @returns {Object} { useGod, avoidGod, reasoning, strength, alternativeUseGod }
 */
function selectUseGod(chart) {
  const dayMaster = chart.dayMaster || chart.day.stem;
  const dmElement = dayMaster.element;

  // Calculate Day Master strength
  const strength = calculateDayMasterStrength(chart);
  const imbalances = analyzeImbalances(chart);

  // Element production and control cycles
  const produces = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
  const producedBy = { fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal', wood: 'water' };
  const controls = { wood: 'earth', earth: 'water', water: 'fire', fire: 'metal', metal: 'wood' };
  const controlledBy = { earth: 'wood', water: 'earth', fire: 'water', metal: 'fire', wood: 'metal' };

  let useGod;
  let avoidGod;
  let reasoning;
  let alternativeUseGod;

  // === USE GOD SELECTION LOGIC ===

  if (strength.category === 'very-weak' || strength.category === 'weak') {
    // WEAK DAY MASTER: Need support and resources
    // Use God = Element that produces Day Master OR same element

    useGod = producedBy[dmElement];
    alternativeUseGod = dmElement;
    avoidGod = [controlledBy[dmElement], produces[dmElement]];

    reasoning = `Day Master ${dmElement.toUpperCase()} is ${strength.category} (${strength.score}/100). ` +
                `Needs nurturing and support. Use God is ${useGod.toUpperCase()} (Resource element that produces ${dmElement}). ` +
                `Alternative: ${dmElement.toUpperCase()} (same element for peer support). ` +
                `Avoid ${controlledBy[dmElement].toUpperCase()} (controls/pressures you) and ${produces[dmElement].toUpperCase()} (drains your energy).`;

  } else if (strength.category === 'very-strong' || strength.category === 'strong') {
    // STRONG DAY MASTER: Need drainage and control
    // Use God = Element that Day Master produces OR element that controls Day Master

    // Check if there are excessive elements to consider
    const hasExcessive = imbalances.excessive.length > 0;

    if (hasExcessive) {
      // If there's an excessive element, prioritize controlling it
      const excessiveElement = imbalances.excessive[0].element;

      if (excessiveElement === dmElement) {
        // Too much of Day Master itself
        useGod = produces[dmElement]; // Output/expression
        alternativeUseGod = controlledBy[dmElement]; // Control
      } else {
        // Excessive different element
        useGod = controls[excessiveElement]; // Control the excess
        alternativeUseGod = produces[dmElement]; // Drain Day Master
      }
    } else {
      // No major imbalances, use standard strong Day Master approach
      useGod = produces[dmElement]; // Output element (drains Day Master positively)
      alternativeUseGod = controlledBy[dmElement]; // Control element
    }

    avoidGod = [producedBy[dmElement], dmElement];

    reasoning = `Day Master ${dmElement.toUpperCase()} is ${strength.category} (${strength.score}/100). ` +
                `Has excess energy that needs expression or control. Use God is ${useGod.toUpperCase()} ` +
                `(${hasExcessive ? 'balances excessive elements and drains Day Master' : 'output element for creative expression'}). ` +
                `Alternative: ${alternativeUseGod.toUpperCase()}. ` +
                `Avoid ${producedBy[dmElement].toUpperCase()} and ${dmElement.toUpperCase()} (add more strength, causing imbalance).`;

  } else {
    // BALANCED DAY MASTER: Focus on what's missing or excessive

    if (imbalances.deficient.length > 0) {
      // Has deficient elements - enhance the most deficient
      useGod = imbalances.deficient[0].element;
      alternativeUseGod = producedBy[useGod]; // Element that produces the deficient one
      avoidGod = [controlledBy[useGod]];

      reasoning = `Day Master ${dmElement.toUpperCase()} is balanced (${strength.score}/100). ` +
                  `Chart is missing ${useGod.toUpperCase()} element. Use God is ${useGod.toUpperCase()} to fill the void. ` +
                  `Avoid ${controlledBy[useGod].toUpperCase()} (controls/suppresses Use God).`;

    } else if (imbalances.excessive.length > 0) {
      // Has excessive elements - control them
      const excessiveElement = imbalances.excessive[0].element;
      useGod = controlledBy[excessiveElement];
      alternativeUseGod = produces[excessiveElement]; // Drain the excess
      avoidGod = [producedBy[excessiveElement]];

      reasoning = `Day Master ${dmElement.toUpperCase()} is balanced (${strength.score}/100). ` +
                  `Chart has excessive ${excessiveElement.toUpperCase()}. Use God is ${useGod.toUpperCase()} ` +
                  `to control and harmonize. Avoid ${producedBy[excessiveElement].toUpperCase()} (adds more excess).`;

    } else {
      // Truly balanced - maintain the balance
      useGod = dmElement;
      alternativeUseGod = producedBy[dmElement];
      avoidGod = [controlledBy[dmElement]];

      reasoning = `Day Master ${dmElement.toUpperCase()} is balanced (${strength.score}/100). ` +
                  `Chart is harmonious. Use God is ${dmElement.toUpperCase()} (maintain balance with same element). ` +
                  `Avoid ${controlledBy[dmElement].toUpperCase()} (would disrupt harmony).`;
    }
  }

  return {
    useGod: useGod,
    avoidGod: Array.isArray(avoidGod) ? avoidGod : [avoidGod],
    alternativeUseGod: alternativeUseGod,
    reasoning: reasoning,
    strength: strength,
    imbalances: imbalances,
    dayMaster: {
      element: dmElement,
      chinese: dayMaster.chinese,
      english: dayMaster.english
    }
  };
}

    // ============================================
    // LUCK PILLARS
    // ============================================
    /**
 * Luck Pillars Module
 * Calculate 10-year Luck Cycles (大运 Da Yun) based on BaZi chart
 * SSOT for Luck Pillars calculation
 */





/**
 * Calculate Luck Pillars (大运 Da Yun) - 10-year cycles
 * @param {Object} chart - BaZi chart with year, month, day pillars and gender
 * @param {string} chart.gender - 'male' or 'female'
 * @param {Object} chart.year - Year pillar with stem property
 * @param {Object} chart.year.stem - Year stem with polarity property
 * @param {Object} chart.month - Month pillar with stem and branch properties
 * @param {Object} chart.month.stem - Month stem with chinese property
 * @param {Object} chart.month.branch - Month branch with chinese property
 * @param {Object} chart.day - Day pillar with stem property (Day Master)
 * @param {Object} chart.day.stem - Day Master stem
 * @param {number} [startAge=2] - Starting age for first luck pillar (default 2)
 * @returns {Object} Luck pillars data with pillars array, direction, and start age
 */
function calculateLuckPillars(chart, startAge = 2) {
  const gender = chart.gender;
  const yearStem = chart.year.stem;
  const monthStem = chart.month.stem;
  const monthBranch = chart.month.branch;
  const dayMaster = chart.day.stem;

  // Determine direction based on gender and year stem polarity
  // Yang year + Male OR Yin year + Female = Forward (順)
  // Yang year + Female OR Yin year + Male = Backward (逆)
  const isYangYear = yearStem.polarity === 'yang';
  const isMale = gender === 'male';
  const isForward = (isYangYear && isMale) || (!isYangYear && !isMale);

  // Generate 9 luck pillars (covering ages 2-92 by default)
  const pillars = [];
  let stemIdx = HEAVENLY_STEMS.findIndex(s => s.chinese === monthStem.chinese);
  let branchIdx = EARTHLY_BRANCHES.findIndex(b => b.chinese === monthBranch.chinese);

  for (let i = 0; i < 9; i++) {
    // Move forward or backward
    if (isForward) {
      stemIdx = (stemIdx + 1) % 10;
      branchIdx = (branchIdx + 1) % 12;
    } else {
      stemIdx = (stemIdx - 1 + 10) % 10;
      branchIdx = (branchIdx - 1 + 12) % 12;
    }

    const stem = HEAVENLY_STEMS[stemIdx];
    const branch = EARTHLY_BRANCHES[branchIdx];
    const age = startAge + (i * 10);

    pillars.push({
      startAge: age,
      endAge: age + 9,
      stem: stem,
      branch: branch,
      tenGod: getTenGod(dayMaster, stem),
      nayin: getNaYin(stem, branch)
    });
  }

  return { pillars, isForward, startAge };
}

    // ============================================
    // VOID STARS
    // ============================================
    /**
 * Void Stars / Empty Death (空亡)
 * 
 * Two branches in the chart that are "void" based on the Day Pillar.
 * These represent areas of life with reduced effectiveness.
 */

/**
 * Calculate Void Stars based on Day Stem and Day Branch
 * @param {number} dayStem - Day stem index (0-9)
 * @param {number} dayBranch - Day branch index (0-11)
 * @returns {Array<number>} Array of two void branch indices
 */
function getVoidStars(dayStem, dayBranch) {
  // Calculate 60 Jia Zi index
  const jiaZiIndex = (dayStem * 12 + dayBranch) % 60;
  
  // Each 10-day cycle has 2 void branches
  // The cycle starts at: floor(jiaZiIndex / 10) * 10
  // Void branches are at positions 10 and 11 of each cycle
  const cycleStart = Math.floor(jiaZiIndex / 10) * 10;
  
  // The two void branches for this cycle
  const voidBranches = [
    (cycleStart + 10) % 12,
    (cycleStart + 11) % 12
  ];
  
  return voidBranches;
}

/**
 * Check if a specific branch is void for the given day pillar
 * @param {number} dayStem - Day stem index
 * @param {number} dayBranch - Day branch index
 * @param {number} checkBranch - Branch to check
 * @returns {boolean} True if the branch is void
 */
function isVoidBranch(dayStem, dayBranch, checkBranch) {
  const voidBranches = getVoidStars(dayStem, dayBranch);
  return voidBranches.includes(checkBranch);
}

/**
 * Get void stars for all pillars in a chart
 * @param {Object} chart - Full BaZi chart
 * @returns {Object} Void star analysis for each pillar
 */
function analyzeVoidStarsInChart(chart) {
  const dayStem = chart.day.stem.index;
  const dayBranch = chart.day.branch.index;
  const voidBranches = getVoidStars(dayStem, dayBranch);
  
  return {
    voidBranches: voidBranches,
    year: { 
      isVoid: isVoidBranch(dayStem, dayBranch, chart.year.branch.index),
      impact: 'Ancestral support, early life, social image'
    },
    month: { 
      isVoid: isVoidBranch(dayStem, dayBranch, chart.month.branch.index),
      impact: 'Career, parents, authority figures'
    },
    day: { 
      isVoid: false, // Day pillar itself is never void
      impact: 'Self, marriage, spouse'
    },
    hour: { 
      isVoid: isVoidBranch(dayStem, dayBranch, chart.hour.branch.index),
      impact: 'Children, legacy, creativity, later life'
    }
  };
}

    // ============================================
    // SYMBOLIC STARS
    // ============================================
    /**
 * Symbolic Stars (Shen Sha 神煞)
 * Special stars that reveal hidden influences in the chart
 * Based on pillar combinations and relationships
 */



/**
 * Nobleman (Tian Yi 天乙貴人) lookup
 * Maps day stem to two noble branches
 * Based on traditional BaZi theory
 */
const NOBLEMAN = {
  '甲': ['丑', '未'],  // Jia: Ox, Goat
  '乙': ['子', '申'],  // Yi: Rat, Monkey
  '丙': ['亥', '酉'],  // Bing: Pig, Rooster
  '丁': ['亥', '酉'],  // Ding: Pig, Rooster
  '戊': ['丑', '未'],  // Wu: Ox, Goat
  '己': ['子', '申'],  // Ji: Rat, Monkey
  '庚': ['丑', '未'],  // Geng: Ox, Goat
  '辛': ['午', '寅'],  // Xin: Horse, Tiger
  '壬': ['卯', '巳'],  // Ren: Rabbit, Snake
  '癸': ['卯', '巳']   // Gui: Rabbit, Snake
};

/**
 * Peach Blossom (Tao Hua 桃花) lookup
 * Maps day branch to peach blossom branch
 * Indicates romantic attraction and social charm
 */
const PEACH_BLOSSOM = {
  '寅': '卯',  // Tiger → Rabbit
  '午': '卯',  // Horse → Rabbit
  '戌': '卯',  // Dog → Rabbit

  '申': '酉',  // Monkey → Rooster
  '子': '酉',  // Rat → Rooster
  '辰': '酉',  // Dragon → Rooster

  '亥': '子',  // Pig → Rat
  '卯': '子',  // Rabbit → Rat
  '未': '子',  // Goat → Rat

  '巳': '午',  // Snake → Horse
  '酉': '午',  // Rooster → Horse
  '丑': '午'   // Ox → Horse
};

/**
 * Sky Horse (Tian Ma 天馬) lookup
 * Maps day branch to sky horse branch
 * Indicates travel, movement, and restlessness
 */
const SKY_HORSE = {
  '寅': '申',  // Tiger → Monkey
  '午': '申',  // Horse → Monkey
  '戌': '申',  // Dog → Monkey

  '申': '寅',  // Monkey → Tiger
  '子': '寅',  // Rat → Tiger
  '辰': '寅',  // Dragon → Tiger

  '亥': '巳',  // Pig → Snake
  '卯': '巳',  // Rabbit → Snake
  '未': '巳',  // Goat → Snake

  '巳': '亥',  // Snake → Pig
  '酉': '亥',  // Rooster → Pig
  '丑': '亥'   // Ox → Pig
};

/**
 * Intelligence Star (Wen Chang 文昌) lookup
 * Maps day stem to intelligence star branch
 * Indicates literary talent, education, and wisdom
 */
const INTELLIGENCE_STAR = {
  '甲': '巳',  // Jia → Snake
  '乙': '午',  // Yi → Horse
  '丙': '申',  // Bing → Monkey
  '丁': '酉',  // Ding → Rooster
  '戊': '申',  // Wu → Monkey
  '己': '酉',  // Ji → Rooster
  '庚': '亥',  // Geng → Pig
  '辛': '子',  // Xin → Rat
  '壬': '寅',  // Ren → Tiger
  '癸': '卯'   // Gui → Rabbit
};

/**
 * Get Nobleman stars for a day stem
 * @param {string} dayStem - Day stem (Chinese character)
 * @returns {Array<string>} Array of two noble branches
 */
function getNoblepeople(dayStem) {
  return NOBLEMAN[dayStem] || [];
}

/**
 * Get Peach Blossom for a day branch
 * @param {string} dayBranch - Day branch (Chinese character)
 * @returns {string} Peach blossom branch
 */
function getPeachBlossom(dayBranch) {
  return PEACH_BLOSSOM[dayBranch] || '';
}

/**
 * Get Sky Horse for a day branch
 * @param {string} dayBranch - Day branch (Chinese character)
 * @returns {string} Sky horse branch
 */
function getSkyHorse(dayBranch) {
  return SKY_HORSE[dayBranch] || '';
}

/**
 * Get Intelligence Star for a day stem
 * @param {string} dayStem - Day stem (Chinese character)
 * @returns {string} Intelligence star branch
 */
function getIntelligenceStar(dayStem) {
  return INTELLIGENCE_STAR[dayStem] || '';
}

/**
 * Calculate Life Palace (Ming Gong 命宮)
 * Life palace branch calculated from month and hour branches
 * Represents the self and destiny
 *
 * Formula: Life Palace = (14 - Month Branch Index - Hour Branch Index) mod 12
 *
 * @param {string} monthBranch - Month branch (Chinese character)
 * @param {string} hourBranch - Hour branch (Chinese character)
 * @returns {string} Life palace branch
 */
function getLifePalace(monthBranch, hourBranch) {
  // Find indices by matching Chinese characters
  const monthIdx = EARTHLY_BRANCHES.findIndex(b => b.chinese === monthBranch);
  const hourIdx = EARTHLY_BRANCHES.findIndex(b => b.chinese === hourBranch);

  if (monthIdx === -1 || hourIdx === -1) {
    return '';
  }

  let lifePalaceIdx = (14 - monthIdx - hourIdx) % 12;
  if (lifePalaceIdx < 0) lifePalaceIdx += 12;

  return EARTHLY_BRANCHES[lifePalaceIdx].chinese;
}

    // ============================================
    // FENG SHUI
    // ============================================
    /**
 * Feng Shui Functions
 * Flying Stars, Ba Zhai (8 Mansions), Annual Afflictions
 */



/**
 * Calculate Kua Number (Life Gua) for Ba Zhai
 * @param {number} birthYear - Birth year
 * @param {string} gender - 'male' or 'female'
 * @returns {number} Kua number (1-9, excluding 5)
 */
function calculateKuaNumber(birthYear, gender) {
  const yearDigits = birthYear.toString().slice(-2);
  const sum = parseInt(yearDigits[0]) + parseInt(yearDigits[1]);
  
  let kua;
  if (gender === 'male') {
    kua = 11 - (sum % 10);
    if (kua === 5) kua = 2; // Male 5 becomes 2
  } else {
    kua = 4 + (sum % 10);
    if (kua > 9) kua -= 9;
    if (kua === 5) kua = 8; // Female 5 becomes 8
  }
  
  return kua;
}

/**
 * Get favorable directions for Kua number
 * @param {number} kua - Kua number (1-9)
 * @returns {Object} Favorable and unfavorable directions
 */
function getFavorableDirections(kua) {
  const directions = {
    1: { favorable: ['N', 'SE', 'E', 'S'], unfavorable: ['W', 'NE', 'NW', 'SW'] },
    2: { favorable: ['NE', 'W', 'NW', 'SW'], unfavorable: ['N', 'SE', 'E', 'S'] },
    3: { favorable: ['S', 'N', 'SE', 'E'], unfavorable: ['W', 'NE', 'NW', 'SW'] },
    4: { favorable: ['N', 'S', 'SE', 'E'], unfavorable: ['W', 'NE', 'NW', 'SW'] },
    6: { favorable: ['W', 'NE', 'SW', 'NW'], unfavorable: ['N', 'SE', 'E', 'S'] },
    7: { favorable: ['NW', 'W', 'SW', 'NE'], unfavorable: ['N', 'SE', 'E', 'S'] },
    8: { favorable: ['SW', 'NW', 'W', 'NE'], unfavorable: ['N', 'SE', 'E', 'S'] },
    9: { favorable: ['E', 'SE', 'S', 'N'], unfavorable: ['W', 'NE', 'NW', 'SW'] }
  };
  
  return directions[kua] || directions[1];
}

/**
 * Calculate Flying Star center number for a given year
 * @param {number} year - Year to calculate
 * @returns {number} Center star number (1-9)
 */
function calculateFlyingStarCenter(year) {
  // Period 9: 2024-2043, Period 8: 2004-2023, etc.
  const baseYear = 2024;
  const yearsFromBase = year - baseYear;
  
  // Flying star cycles: 9,8,7,6,5,4,3,2,1,9,8,7...
  let center = 9 - (yearsFromBase % 9);
  if (center <= 0) center += 9;
  
  return center;
}

/**
 * Get annual afflictions (Tai Sui, Wu Huang, San Sha)
 * @param {number} year - Year to check
 * @returns {Object} Affliction directions
 */
function getAnnualAfflictions(year) {
  const yearBranch = (year - 4) % 12;
  
  // Tai Sui (Grand Duke) - same direction as year branch
  const taiSuiDirections = ['N', 'NNE', 'ENE', 'E', 'ESE', 'SSE', 'S', 'SSW', 'WSW', 'W', 'WNW', 'NNW'];
  const taiSui = taiSuiDirections[yearBranch];
  
  // Sui Po (Year Breaker) - opposite of Tai Sui
  const suiPoIndex = (yearBranch + 6) % 12;
  const suiPo = taiSuiDirections[suiPoIndex];
  
  // San Sha (Three Killings)
  const sanShaMap = {
    0: 'S', 4: 'S', 8: 'S',   // Rat, Dragon, Monkey → South
    2: 'W', 6: 'W', 10: 'W',  // Tiger, Horse, Dog → West
    3: 'N', 7: 'N', 11: 'N',  // Rabbit, Goat, Pig → North
    1: 'E', 5: 'E', 9: 'E'    // Ox, Snake, Rooster → East
  };
  const sanSha = sanShaMap[yearBranch];
  
  // Wu Huang (5 Yellow) - Flying Star center
  const wuHuang = calculateFlyingStarCenter(year);
  
  return {
    taiSui,
    suiPo,
    sanSha,
    wuHuang: wuHuang === 5 ? 'Center' : null
  };
}

    // ============================================
    // SOLAR TERMS
    // ============================================
    /**
 * BaZi Layer 0 - Solar Terms Calculator
 * Astronomical calculation of solar longitude and Jie (節) terms
 * Based on VSOP87 simplified formulas
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  SSOT: This file should mirror core/src/solar-terms.js          ║
 * ║  Any fixes here must be propagated to core                      ║
 * ║  Version: 2.0.0 - Fixed year boundary bug                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/**
 * Convert Gregorian date to Julian Day Number
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

    return { year, month, day: Math.floor(day) };
}

/**
 * Calculate apparent solar longitude using VSOP87
 * @param {number} JD - Julian Day Number
 * @returns {number} Solar longitude in degrees (0-360)
 */
function calculateSolarLongitude(JD) {
    // Julian centuries from J2000.0
    const T = (JD - 2451545.0) / 36525;
    const T2 = T * T;

    // Mean longitude of the Sun (degrees)
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
    L0 = L0 % 360;
    if (L0 < 0) L0 += 360;

    // Mean anomaly of the Sun (degrees)
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

    // Apparent longitude (with nutation and aberration)
    let apparentLong = sunLong - 0.00569 - 0.00478 * Math.sin(OmegaRad);

    // Normalize to 0-360
    apparentLong = apparentLong % 360;
    if (apparentLong < 0) apparentLong += 360;

    return apparentLong;
}

/**
 * Find the exact Julian Day when the Sun reaches a specific longitude
 * Uses Newton-Raphson iteration with proper year targeting
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FIXED v2.0.0: Properly calculates initial estimate based on    ║
 * ║  the approximate month when each longitude occurs               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * @param {number} year - Target Gregorian year
 * @param {number} targetLongitude - Solar longitude in degrees
 * @returns {number} Julian Day Number
 */
function findSolarLongitudeJD(year, targetLongitude) {
    const avgDailyMotion = 360 / 365.25; // ~0.9856 degrees per day

    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  FIX: Map each solar longitude to its approximate month           ║
    // ║  This ensures we start searching in the correct part of the year  ║
    // ╚════════════════════════════════════════════════════════════════════╝
    
    // Approximate month for each Jie term longitude:
    // 315° = Feb (Li Chun), 345° = Mar, 15° = Apr, 45° = May, 75° = Jun,
    // 105° = Jul, 135° = Aug, 165° = Sep, 195° = Oct, 225° = Nov, 255° = Dec, 285° = Jan
    const longitudeToMonth = {
        315: 2,   // Li Chun ~ Feb 4
        345: 3,   // Jing Zhe ~ Mar 6
        15: 4,    // Qing Ming ~ Apr 5
        45: 5,    // Li Xia ~ May 6
        75: 6,    // Mang Zhong ~ Jun 6
        105: 7,   // Xiao Shu ~ Jul 7
        135: 8,   // Li Qiu ~ Aug 8
        165: 9,   // Bai Lu ~ Sep 8
        195: 10,  // Han Lu ~ Oct 8
        225: 11,  // Li Dong ~ Nov 7
        255: 12,  // Da Xue ~ Dec 7
        285: 1    // Xiao Han ~ Jan 6
    };

    // Get approximate month for this longitude
    const approxMonth = longitudeToMonth[targetLongitude];
    let searchYear = year;
    
    // For January term (Xiao Han, 285°), it occurs in the NEXT Gregorian year
    // relative to the Chinese year that starts at Li Chun
    // But for getYearSolarTerms(year), we want Jan of THAT year
    // No adjustment needed - searchYear stays as year
    
    // Start from the middle of the approximate month
    let JD = gregorianToJulianDay(searchYear, approxMonth, 15);

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

    // Verify result is in the expected year (within reasonable bounds)
    const result = julianDayToGregorian(JD);
    
    // If we somehow got the wrong year, adjust and re-search
    if (result.year !== searchYear) {
        // This shouldn't happen with the fixed initial estimate, but safety check
        const yearDiff = searchYear - result.year;
        JD += yearDiff * 365.25;
        
        // Re-iterate to refine
        for (let i = 0; i < 20; i++) {
            const currentLong = calculateSolarLongitude(JD);
            let diff = targetLongitude - currentLong;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            if (Math.abs(diff) < 0.00001) break;
            JD += diff / avgDailyMotion;
        }
    }

    return JD;
}

/**
 * Calculate Li Chun date for a given year
 * Li Chun = Solar Longitude 315°
 * @param {number} year - Gregorian year
 * @returns {Object} { year, month, day }
 */
function getLiChunDate(year) {
    const JD = findSolarLongitudeJD(year, 315);
    return julianDayToGregorian(JD);
}

/**
 * Get all 12 solar month boundaries (Jie terms) for a Gregorian year
 * Returns the Jie terms that occur within the given Gregorian year
 * 
 * Solar months and their starting Jie terms:
 * - 寅月 (Tiger): Li Chun 立春 315° ~ Feb
 * - 卯月 (Rabbit): Jing Zhe 驚蟄 345° ~ Mar
 * - 辰月 (Dragon): Qing Ming 清明 15° ~ Apr
 * - 巳月 (Snake): Li Xia 立夏 45° ~ May
 * - 午月 (Horse): Mang Zhong 芒種 75° ~ Jun
 * - 未月 (Goat): Xiao Shu 小暑 105° ~ Jul
 * - 申月 (Monkey): Li Qiu 立秋 135° ~ Aug
 * - 酉月 (Rooster): Bai Lu 白露 165° ~ Sep
 * - 戌月 (Dog): Han Lu 寒露 195° ~ Oct
 * - 亥月 (Pig): Li Dong 立冬 225° ~ Nov
 * - 子月 (Rat): Da Xue 大雪 255° ~ Dec
 * - 丑月 (Ox): Xiao Han 小寒 285° ~ Jan (next year)
 */
function getYearSolarTerms(year) {
    const jieTermLongitudes = [315, 345, 15, 45, 75, 105, 135, 165, 195, 225, 255, 285];
    const terms = [];

    for (let i = 0; i < 12; i++) {
        const longitude = jieTermLongitudes[i];
        const JD = findSolarLongitudeJD(year, longitude);
        const date = julianDayToGregorian(JD);

        terms.push({
            ...date,
            solarMonthIndex: i, // 0 = 寅月 (Tiger), 1 = 卯月 (Rabbit), etc.
            monthBranch: (i + 2) % 12,
            longitude
        });
    }

    return terms;
}

/**
 * Find which solar month a given date falls into
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} { solarMonthIndex, monthBranch }
 */
function getSolarMonthForDate(year, month, day) {
    // Get terms for current year and previous year
    const currentYearTerms = getYearSolarTerms(year);
    const prevYearTerms = getYearSolarTerms(year - 1);

    // Create timeline of all relevant terms, sorted by date
    const allTerms = [
        ...prevYearTerms,
        ...currentYearTerms
    ].sort((a, b) => {
        const jdA = gregorianToJulianDay(a.year, a.month, a.day);
        const jdB = gregorianToJulianDay(b.year, b.month, b.day);
        return jdA - jdB;
    });

    // Convert target date to Julian Day
    const targetJD = gregorianToJulianDay(year, month, day);

    // Find which term period the date falls into (search backwards)
    for (let i = allTerms.length - 1; i >= 0; i--) {
        const term = allTerms[i];
        const termJD = gregorianToJulianDay(term.year, term.month, term.day);

        if (targetJD >= termJD) {
            return {
                solarMonthIndex: term.solarMonthIndex,
                monthBranch: term.monthBranch
            };
        }
    }

    // Fallback (shouldn't reach here)
    return {
        solarMonthIndex: 10,
        monthBranch: 0
    };
}

    // ============================================
    // DAY PILLAR
    // ============================================
    /**
 * BaZi Layer 0 - Day Pillar Calculator
 * Uses reference point: December 17, 1923 = 甲子 (Jia Zi, index 0)
 * VERIFIED against historical figures
 */

/**
 * Calculate Day Pillar from UTC date
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} { stemIndex, branchIndex }
 */
function calculateDayPillar(year, month, day) {
    // Reference: December 17, 1923 = 甲子 (Jia Zi, index 0)
    const refDate = Date.UTC(1923, 11, 17);
    const targetDate = Date.UTC(year, month - 1, day);

    const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
    const jiaziIndex = ((daysDiff % 60) + 60) % 60;

    return {
        stemIndex: jiaziIndex % 10,
        branchIndex: jiaziIndex % 12
    };
}

    // ============================================
    // YEAR PILLAR
    // ============================================
    /**
 * BaZi Layer 0 - Year Pillar Calculator
 * Year boundary = Li Chun (立春) at solar longitude 315°
 * RULE: If birth is before Li Chun, use previous year
 */



/**
 * Calculate Year Pillar
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} { stemIndex, branchIndex, adjustedYear }
 */
function calculateYearPillar(year, month, day) {
    // Get Li Chun date for the year
    const liChun = getLiChunDate(year);

    // Determine adjusted year based on Li Chun boundary
    let adjustedYear = year;
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) {
        adjustedYear = year - 1;
    }

    // Calculate stem and branch indices
    // Formula based on year 4 CE = 甲子 (stem 0, branch 0)
    const stemIndex = ((adjustedYear - 4) % 10 + 10) % 10;
    const branchIndex = ((adjustedYear - 4) % 12 + 12) % 12;

    return {
        stemIndex,
        branchIndex,
        adjustedYear
    };
}

    // ============================================
    // MONTH PILLAR
    // ============================================
    /**
 * BaZi Layer 0 - Month Pillar Calculator
 * Solar month boundaries determined by Jie (節) terms
 * Month stem calculated from year stem using fixed formula
 */



/**
 * Calculate Month Pillar
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @param {number} yearStemIndex - Year pillar stem index (0-9)
 * @returns {Object} { stemIndex, branchIndex, solarMonthIndex }
 */
function calculateMonthPillar(year, month, day, yearStemIndex) {
    // Get solar month from astronomical calculation
    const solarMonth = getSolarMonthForDate(year, month, day);
    const solarMonthIndex = solarMonth.solarMonthIndex;
    const monthBranchIndex = solarMonth.monthBranch;

    // Calculate month stem using year stem
    // Formula: Month stem base depends on year stem
    const stemBaseMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
    const monthStemBase = stemBaseMap[yearStemIndex];
    const monthStemIndex = (monthStemBase + solarMonthIndex) % 10;

    return {
        stemIndex: monthStemIndex,
        branchIndex: monthBranchIndex,
        solarMonthIndex
    };
}

    // ============================================
    // HOUR PILLAR
    // ============================================
    /**
 * BaZi Layer 0 - Hour Pillar Calculator
 * Hour branch determined by time of day (2-hour periods)
 * Hour stem calculated from day stem using fixed formula
 */

/**
 * Calculate Hour Pillar
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @param {number} dayStemIndex - Day pillar stem index (0-9)
 * @returns {Object} { stemIndex, branchIndex }
 */
function calculateHourPillar(hour, minute, dayStemIndex) {
    const totalMinutes = hour * 60 + minute;

    // Determine hour branch based on time
    let hourBranchIndex;
    if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) hourBranchIndex = 0;   // 子 Rat (23:00-01:00)
    else if (totalMinutes < 3 * 60) hourBranchIndex = 1;   // 丑 Ox (01:00-03:00)
    else if (totalMinutes < 5 * 60) hourBranchIndex = 2;   // 寅 Tiger (03:00-05:00)
    else if (totalMinutes < 7 * 60) hourBranchIndex = 3;   // 卯 Rabbit (05:00-07:00)
    else if (totalMinutes < 9 * 60) hourBranchIndex = 4;   // 辰 Dragon (07:00-09:00)
    else if (totalMinutes < 11 * 60) hourBranchIndex = 5;  // 巳 Snake (09:00-11:00)
    else if (totalMinutes < 13 * 60) hourBranchIndex = 6;  // 午 Horse (11:00-13:00)
    else if (totalMinutes < 15 * 60) hourBranchIndex = 7;  // 未 Goat (13:00-15:00)
    else if (totalMinutes < 17 * 60) hourBranchIndex = 8;  // 申 Monkey (15:00-17:00)
    else if (totalMinutes < 19 * 60) hourBranchIndex = 9;  // 酉 Rooster (17:00-19:00)
    else if (totalMinutes < 21 * 60) hourBranchIndex = 10; // 戌 Dog (19:00-21:00)
    else hourBranchIndex = 11;                             // 亥 Pig (21:00-23:00)

    // Calculate hour stem from day stem
    const stemBaseMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
    const hourStemBase = stemBaseMap[dayStemIndex];
    const hourStemIndex = (hourStemBase + hourBranchIndex) % 10;

    return {
        stemIndex: hourStemIndex,
        branchIndex: hourBranchIndex
    };
}

    // ============================================
    // FORMATTERS
    // ============================================
    /**
 * BaZi Layer 0 - Formatters
 * Convert stem/branch indices to readable pillar names
 * Output format: "Yang-Wood Rat", "Yin-Fire Rabbit", etc.
 */



/**
 * Format a pillar as "Stem Branch" (e.g., "Yang-Wood Rat")
 * @param {number} stemIndex - Stem index (0-9)
 * @param {number} branchIndex - Branch index (0-11)
 * @returns {string} Formatted pillar name
 */
function formatPillar(stemIndex, branchIndex) {
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];

    if (!stem || !branch) {
        throw new Error(`Invalid indices: stem=${stemIndex}, branch=${branchIndex}`);
    }

    return `${stem.english} ${branch.english}`;
}

/**
 * Format Chinese pillar (e.g., "甲子")
 * @param {number} stemIndex - Stem index (0-9)
 * @param {number} branchIndex - Branch index (0-11)
 * @returns {string} Chinese pillar
 */
function formatChinesePillar(stemIndex, branchIndex) {
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];

    if (!stem || !branch) {
        throw new Error(`Invalid indices: stem=${stemIndex}, branch=${branchIndex}`);
    }

    return `${stem.chinese}${branch.chinese}`;
}

    // ============================================
    // CHART ANALYSIS
    // ============================================
    /**
 * Chart Analysis Module
 * High-level chart calculation and element analysis functions
 */









/**
 * Calculate Life Gua for Ba Zhai (Eight Mansions)
 * @param {number} year - Birth year
 * @param {string} gender - 'male' or 'female'
 * @param {number} month - Birth month (1-12)
 * @param {number} day - Birth day
 * @returns {number} Life Gua number (1-9, excluding 5)
 */
function getLifeGua(year, gender, month = 6, day = 15) {
  let calcYear = year;

  // Li Chun adjustment - Chinese year starts around Feb 4, not Jan 1
  const liChun = getLiChunDate(year);
  const liChunMonth = liChun.month; // Already in 1-12 format
  const liChunDay = liChun.day;

  if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
    calcYear = year - 1;
  }

  // Take last two digits and sum to single digit
  const lastTwo = calcYear % 100;
  let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
  while (digitSum > 9) {
    digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
  }

  let gua;
  const isMale = gender === 'male';

  // Apply correct formulas based on era
  if (calcYear >= 2000) {
    // Post-2000 formula
    if (isMale) {
      gua = 9 - digitSum;
      if (gua <= 0) gua += 9;
    } else {
      gua = digitSum + 6;
      if (gua > 9) gua -= 9;
    }
  } else {
    // Pre-2000 formula
    if (isMale) {
      gua = 10 - digitSum;
      if (gua <= 0) gua += 9;
      if (gua > 9) gua -= 9;
    } else {
      gua = digitSum + 5;
      if (gua > 9) gua -= 9;
    }
  }

  // Kua 5 doesn't exist in Eight Mansions
  if (gua === 5) {
    gua = isMale ? 2 : 8;
  }

  return gua;
}

/**
 * Get favorable directions based on Life Gua
 * @param {number} gua - Life Gua number (1-9)
 * @returns {Object} Object with 8 directional attributes
 */
function getFavorableDirections(gua) {
  const eastGroup = [1, 3, 4, 9];
  const isEast = eastGroup.includes(gua);

  if (isEast) {
    return {
      shengQi: 'Southeast', tianYi: 'East', yanNian: 'South', fuWei: 'North',
      huoHai: 'Northeast', wuGui: 'Northwest', liuSha: 'Southwest', jueming: 'West'
    };
  } else {
    return {
      shengQi: 'Northeast', tianYi: 'West', yanNian: 'Northwest', fuWei: 'Southwest',
      huoHai: 'East', wuGui: 'Southeast', liuSha: 'North', jueming: 'South'
    };
  }
}

/**
 * Calculate element count in a Four Pillars chart
 * @param {Object} chart - Chart object with year, month, day, hour pillars
 * @returns {Object} Element counts (wood, fire, earth, metal, water)
 */
function getElementCount(chart) {
  const count = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar]) {
      count[chart[pillar].stem.element]++;
      count[chart[pillar].branch.element]++;
    }
  });

  return count;
}

/**
 * Determine favorable and unfavorable elements based on Day Master
 * @param {Object} chart - Chart object with dayMaster property
 * @returns {Object} Object with favorable and unfavorable element arrays
 */
function getFavorableElements(chart) {
  const dm = chart.dayMaster;
  const dmElement = dm.element;

  // Production cycle
  const produces = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
  const producedBy = { wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal' };
  const controls = { wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire' };
  const controlledBy = { wood: 'metal', fire: 'water', earth: 'wood', metal: 'fire', water: 'earth' };

  // Simple logic: Resource and Same element are generally favorable
  // What DM controls (Wealth) can be good if DM is strong
  // What controls DM is challenging

  return {
    favorable: [producedBy[dmElement], dmElement], // Resource + Same
    unfavorable: [controlledBy[dmElement], produces[dmElement]] // What controls + What drains
  };
}

/**
 * Calculate complete Four Pillars chart with analysis
 * @param {number} year - Birth year
 * @param {number} month - Birth month (1-12)
 * @param {number} day - Birth day
 * @param {number} hour - Birth hour (0-23)
 * @param {number} minute - Birth minute (0-59)
 * @param {string} gender - 'male' or 'female'
 * @returns {Object} Complete chart with all pillars and analysis
 */
function calculateFullChart(year, month, day, hour, minute, gender) {
  // Calculate pillar indices using core functions
  const yearPillarData = calculateYearPillar(year, month, day);
  const monthPillarData = calculateMonthPillar(year, month, day, yearPillarData.stemIndex);
  const dayPillarData = calculateDayPillar(year, month, day);

  // Handle late Zi hour (23:00-23:59) - use NEXT day's stem
  const isLateZiHour = hour >= 23;
  let dayStemForHour = dayPillarData.stemIndex;

  if (isLateZiHour) {
    // Calculate next day's pillar to get correct stem
    const nextDate = new Date(year, month - 1, day + 1);
    const nextDayPillar = calculateDayPillar(
      nextDate.getFullYear(),
      nextDate.getMonth() + 1,
      nextDate.getDate()
    );
    dayStemForHour = nextDayPillar.stemIndex;
  }

  const hourPillarData = calculateHourPillar(hour, minute, dayStemForHour);

  // Format pillars with full stem/branch objects
  const yearPillar = {
    stem: HEAVENLY_STEMS[yearPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[yearPillarData.branchIndex],
    palace: 'Parents',
    stemIndex: yearPillarData.stemIndex,
    branchIndex: yearPillarData.branchIndex
  };

  const monthPillar = {
    stem: HEAVENLY_STEMS[monthPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[monthPillarData.branchIndex],
    palace: 'Siblings/Career',
    stemIndex: monthPillarData.stemIndex,
    branchIndex: monthPillarData.branchIndex
  };

  const dayPillar = {
    stem: HEAVENLY_STEMS[dayPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[dayPillarData.branchIndex],
    palace: 'Self/Spouse',
    stemIndex: dayPillarData.stemIndex,
    branchIndex: dayPillarData.branchIndex
  };

  const hourPillar = {
    stem: HEAVENLY_STEMS[hourPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[hourPillarData.branchIndex],
    palace: 'Children',
    stemIndex: hourPillarData.stemIndex,
    branchIndex: hourPillarData.branchIndex,
    isLateZiHour: isLateZiHour
  };

  const chart = {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    dayMaster: dayPillar.stem,
    gender: gender,
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    birthHour: hour,
    birthMinute: minute,
    lifeGua: getLifeGua(year, gender, month, day),
    elementCount: null,
    isLateZiHour: hourPillar.isLateZiHour || false,
    nayin: {
      year: getNaYin(yearPillarData.stemIndex, yearPillarData.branchIndex),
      month: getNaYin(monthPillarData.stemIndex, monthPillarData.branchIndex),
      day: getNaYin(dayPillarData.stemIndex, dayPillarData.branchIndex),
      hour: getNaYin(hourPillarData.stemIndex, hourPillarData.branchIndex)
    }
  };

  chart.elementCount = getElementCount(chart);
  chart.favorableDirections = getFavorableDirections(chart.lifeGua);

  return chart;
}

    // ============================================
    // QI MEN DUN JIA DATA
    // ============================================
    /**
 * Qi Men Dun Jia Data
 * Based on Joey Yap's Qi Men Dun Jia Destiny Analysis
 *
 * Qi Men Structure determination based on Solar Terms
 * Yang Dun: Winter Solstice to Summer Solstice (structures 1-9)
 * Yin Dun: Summer Solstice to Winter Solstice (structures 9-1)
 */

// Solar Terms Data for Qi Men calculations
// Each year contains all 24 solar terms with their dates
const SOLAR_TERMS_DATA = {
  2024: [
    { name: '小寒', english: 'Minor Cold', date: '01-06' },
    { name: '大寒', english: 'Major Cold', date: '01-20' },
    { name: '立春', english: 'Start of Spring', date: '02-04' },
    { name: '雨水', english: 'Rain Water', date: '02-19' },
    { name: '驚蟄', english: 'Awakening of Insects', date: '03-05' },
    { name: '春分', english: 'Spring Equinox', date: '03-20' },
    { name: '清明', english: 'Clear and Bright', date: '04-04' },
    { name: '穀雨', english: 'Grain Rain', date: '04-19' },
    { name: '立夏', english: 'Start of Summer', date: '05-05' },
    { name: '小滿', english: 'Grain Buds', date: '05-20' },
    { name: '芒種', english: 'Grain in Ear', date: '06-05' },
    { name: '夏至', english: 'Summer Solstice', date: '06-21' },
    { name: '小暑', english: 'Minor Heat', date: '07-06' },
    { name: '大暑', english: 'Major Heat', date: '07-22' },
    { name: '立秋', english: 'Start of Autumn', date: '08-07' },
    { name: '處暑', english: 'End of Heat', date: '08-22' },
    { name: '白露', english: 'White Dew', date: '09-07' },
    { name: '秋分', english: 'Autumn Equinox', date: '09-22' },
    { name: '寒露', english: 'Cold Dew', date: '10-08' },
    { name: '霜降', english: 'Frost Descent', date: '10-23' },
    { name: '立冬', english: 'Start of Winter', date: '11-07' },
    { name: '小雪', english: 'Minor Snow', date: '11-22' },
    { name: '大雪', english: 'Major Snow', date: '12-06' },
    { name: '冬至', english: 'Winter Solstice', date: '12-21' }
  ],
  2025: [
    { name: '小寒', english: 'Minor Cold', date: '01-05' },
    { name: '大寒', english: 'Major Cold', date: '01-20' },
    { name: '立春', english: 'Start of Spring', date: '02-03' },
    { name: '雨水', english: 'Rain Water', date: '02-18' },
    { name: '驚蟄', english: 'Awakening of Insects', date: '03-05' },
    { name: '春分', english: 'Spring Equinox', date: '03-20' },
    { name: '清明', english: 'Clear and Bright', date: '04-04' },
    { name: '穀雨', english: 'Grain Rain', date: '04-20' },
    { name: '立夏', english: 'Start of Summer', date: '05-05' },
    { name: '小滿', english: 'Grain Buds', date: '05-21' },
    { name: '芒種', english: 'Grain in Ear', date: '06-05' },
    { name: '夏至', english: 'Summer Solstice', date: '06-21' },
    { name: '小暑', english: 'Minor Heat', date: '07-07' },
    { name: '大暑', english: 'Major Heat', date: '07-22' },
    { name: '立秋', english: 'Start of Autumn', date: '08-07' },
    { name: '處暑', english: 'End of Heat', date: '08-23' },
    { name: '白露', english: 'White Dew', date: '09-07' },
    { name: '秋分', english: 'Autumn Equinox', date: '09-23' },
    { name: '寒露', english: 'Cold Dew', date: '10-08' },
    { name: '霜降', english: 'Frost Descent', date: '10-23' },
    { name: '立冬', english: 'Start of Winter', date: '11-07' },
    { name: '小雪', english: 'Minor Snow', date: '11-22' },
    { name: '大雪', english: 'Major Snow', date: '12-07' },
    { name: '冬至', english: 'Winter Solstice', date: '12-21' }
  ]
};

// Yang Dun Structure patterns for each Solar Term and Yuan (Upper/Middle/Lower)
// Winter Solstice to Summer Solstice
const YANG_DUN_STRUCTURES = {
  '冬至': [1, 7, 4], '小寒': [2, 8, 5], '大寒': [3, 9, 6],
  '立春': [8, 5, 2], '雨水': [9, 6, 3], '驚蟄': [1, 7, 4],
  '春分': [3, 9, 6], '清明': [4, 1, 7], '穀雨': [5, 2, 8],
  '立夏': [4, 1, 7], '小滿': [5, 2, 8], '芒種': [6, 3, 9]
};

// Yin Dun Structure patterns for each Solar Term and Yuan (Upper/Middle/Lower)
// Summer Solstice to Winter Solstice
const YIN_DUN_STRUCTURES = {
  '夏至': [9, 3, 6], '小暑': [8, 2, 5], '大暑': [7, 1, 4],
  '立秋': [2, 5, 8], '處暑': [1, 4, 7], '白露': [9, 3, 6],
  '秋分': [7, 1, 4], '寒露': [6, 9, 3], '霜降': [5, 8, 2],
  '立冬': [6, 9, 3], '小雪': [5, 8, 2], '大雪': [4, 7, 1]
};

// Destiny Door Lookup Tables based on Structure + Life Stem Pair + Hour
// Life Stem pairs: 甲己(0), 乙庚(1), 丙辛(2), 丁壬(3), 戊癸(4)
// Hour index: 子(0) to 亥(11)
// Door values: 休生傷杜景死驚開
const DESTINY_DOOR_TABLES = {
  // Yang 1 Structure - from Joey Yap reference page 24
  'Y1': {
    // [甲己, 乙庚, 丙辛, 丁壬, 戊癸] for each hour
    0:  ['休', '傷', '死', '死', '休'], // 子 hour
    1:  ['開', '生', '景', '景', '杜'], // 丑 hour
    2:  ['開', '生', '景', '景', '杜'], // 寅 hour
    3:  ['杜', '死', '休', '休', '生'], // 卯 hour
    4:  ['杜', '死', '休', '休', '杜'], // 辰 hour
    5:  ['驚', '休', '杜', '杜', '生'], // 巳 hour
    6:  ['景', '驚', '生', '生', '開'], // 午 hour
    7:  ['傷', '景', '開', '開', '景'], // 未 hour
    8:  ['生', '杜', '驚', '驚', '傷'], // 申 hour
    9:  ['開', '生', '景', '景', '杜'], // 酉 hour
    10: ['休', '傷', '死', '死', '驚'], // 戌 hour
    11: ['傷', '景', '開', '開', '生']  // 亥 hour
  },
  // Yang 2 Structure
  'Y2': {
    0:  ['傷', '死', '休', '休', '杜'],
    1:  ['生', '驚', '杜', '杜', '景'],
    2:  ['生', '驚', '杜', '杜', '景'],
    3:  ['死', '休', '傷', '傷', '開'],
    4:  ['死', '休', '傷', '傷', '驚'],
    5:  ['休', '杜', '驚', '驚', '開'],
    6:  ['驚', '生', '景', '景', '死'],
    7:  ['景', '開', '生', '生', '休'],
    8:  ['杜', '傷', '開', '開', '景'],
    9:  ['生', '驚', '杜', '杜', '傷'],
    10: ['傷', '死', '休', '休', '開'],
    11: ['景', '開', '生', '生', '開']
  },
  // Yang 3 Structure
  'Y3': {
    0:  ['死', '休', '傷', '傷', '驚'],
    1:  ['驚', '杜', '死', '死', '休'],
    2:  ['驚', '杜', '死', '死', '休'],
    3:  ['休', '傷', '死', '死', '生'],
    4:  ['休', '傷', '死', '死', '杜'],
    5:  ['杜', '驚', '休', '休', '生'],
    6:  ['生', '景', '杜', '杜', '傷'],
    7:  ['開', '生', '驚', '驚', '杜'],
    8:  ['傷', '開', '景', '景', '休'],
    9:  ['驚', '杜', '死', '死', '開'],
    10: ['死', '休', '傷', '傷', '生'],
    11: ['開', '生', '驚', '驚', '生']
  },
  // Yang 4 Structure
  'Y4': {
    0:  ['休', '傷', '死', '死', '開'],
    1:  ['杜', '死', '休', '休', '杜'],
    2:  ['杜', '死', '休', '休', '杜'],
    3:  ['傷', '死', '休', '休', '景'],
    4:  ['傷', '驚', '杜', '杜', '死'],
    5:  ['驚', '休', '傷', '傷', '景'],
    6:  ['景', '杜', '驚', '驚', '開'],
    7:  ['生', '驚', '生', '生', '死'],
    8:  ['開', '生', '開', '開', '杜'],
    9:  ['杜', '死', '休', '休', '生'],
    10: ['休', '傷', '死', '死', '景'],
    11: ['生', '驚', '生', '生', '驚']
  },
  // Yang 5 Structure
  'Y5': {
    0:  ['死', '驚', '景', '開', '死'],
    1:  ['生', '傷', '休', '杜', '開'],
    2:  ['生', '傷', '休', '杜', '杜'],
    3:  ['生', '傷', '休', '死', '死'],
    4:  ['驚', '開', '死', '開', '驚'],
    5:  ['景', '死', '杜', '生', '景'],
    6:  ['驚', '開', '死', '傷', '傷'],
    7:  ['景', '死', '杜', '景', '生'],
    8:  ['驚', '開', '死', '杜', '景'],
    9:  ['休', '生', '景', '死', '傷'],
    10: ['死', '驚', '景', '生', '死'],
    11: ['傷', '杜', '生', '休', '驚']
  },
  // Yang 6 Structure
  'Y6': {
    0:  ['開', '生', '景', '驚', '休'],
    1:  ['杜', '休', '死', '傷', '景'],
    2:  ['杜', '休', '死', '傷', '景'],
    3:  ['杜', '休', '死', '傷', '開'],
    4:  ['開', '死', '休', '驚', '死'],
    5:  ['死', '杜', '驚', '景', '休'],
    6:  ['開', '死', '休', '開', '開'],
    7:  ['死', '杜', '驚', '死', '杜'],
    8:  ['開', '死', '休', '生', '死'],
    9:  ['傷', '驚', '杜', '休', '休'],
    10: ['開', '生', '景', '景', '杜'],
    11: ['休', '傷', '生', '杜', '傷']
  },
  // Yang 7 Structure
  'Y7': {
    0:  ['生', '景', '驚', '開', '杜'],
    1:  ['休', '死', '傷', '杜', '休'],
    2:  ['休', '死', '傷', '杜', '休'],
    3:  ['休', '死', '傷', '杜', '景'],
    4:  ['死', '休', '驚', '死', '杜'],
    5:  ['杜', '驚', '景', '生', '杜'],
    6:  ['死', '休', '開', '傷', '景'],
    7:  ['杜', '驚', '死', '景', '死'],
    8:  ['死', '休', '生', '休', '杜'],
    9:  ['驚', '杜', '休', '開', '傷'],
    10: ['生', '景', '景', '驚', '死'],
    11: ['傷', '生', '杜', '死', '休']
  },
  // Yang 8 Structure
  'Y8': {
    0:  ['景', '驚', '開', '生', '死'],
    1:  ['死', '傷', '杜', '休', '杜'],
    2:  ['死', '傷', '杜', '休', '杜'],
    3:  ['死', '傷', '杜', '休', '休'],
    4:  ['休', '驚', '死', '杜', '死'],
    5:  ['驚', '景', '生', '死', '死'],
    6:  ['休', '開', '傷', '驚', '休'],
    7:  ['驚', '死', '景', '生', '杜'],
    8:  ['休', '生', '休', '開', '死'],
    9:  ['杜', '休', '開', '傷', '休'],
    10: ['景', '景', '驚', '生', '杜'],
    11: ['生', '杜', '死', '休', '杜']
  },
  // Yang 9 Structure
  'Y9': {
    0:  ['驚', '開', '生', '景', '杜'],
    1:  ['傷', '杜', '休', '死', '死'],
    2:  ['傷', '杜', '休', '死', '死'],
    3:  ['傷', '杜', '休', '死', '杜'],
    4:  ['驚', '死', '杜', '休', '杜'],
    5:  ['景', '生', '死', '杜', '死'],
    6:  ['開', '傷', '驚', '休', '杜'],
    7:  ['死', '景', '生', '驚', '死'],
    8:  ['生', '休', '開', '傷', '杜'],
    9:  ['休', '開', '傷', '驚', '杜'],
    10: ['景', '驚', '生', '景', '死'],
    11: ['杜', '死', '休', '開', '死']
  },
  // Yin 1 Structure
  'N1': {
    0:  ['開', '傷', '休', '休', '杜'],
    1:  ['休', '生', '景', '景', '生'],
    2:  ['休', '生', '景', '景', '生'],
    3:  ['驚', '死', '開', '開', '死'],
    4:  ['驚', '死', '開', '開', '傷'],
    5:  ['傷', '杜', '生', '生', '死'],
    6:  ['杜', '驚', '死', '死', '休'],
    7:  ['死', '景', '休', '休', '景'],
    8:  ['景', '開', '杜', '杜', '開'],
    9:  ['休', '生', '景', '景', '死'],
    10: ['開', '傷', '休', '休', '杜'],
    11: ['死', '景', '休', '休', '開']
  },
  // Yin 2 Structure
  'N2': {
    0:  ['傷', '休', '杜', '杜', '生'],
    1:  ['生', '景', '驚', '驚', '開'],
    2:  ['生', '景', '驚', '驚', '開'],
    3:  ['死', '開', '傷', '傷', '杜'],
    4:  ['死', '開', '傷', '傷', '休'],
    5:  ['杜', '生', '死', '死', '杜'],
    6:  ['驚', '死', '休', '休', '景'],
    7:  ['景', '休', '杜', '杜', '死'],
    8:  ['開', '杜', '驚', '驚', '生'],
    9:  ['生', '景', '驚', '驚', '杜'],
    10: ['傷', '休', '杜', '杜', '生'],
    11: ['景', '休', '杜', '杜', '生']
  },
  // Yin 3 Structure
  'N3': {
    0:  ['休', '杜', '驚', '驚', '開'],
    1:  ['景', '驚', '生', '生', '生'],
    2:  ['景', '驚', '生', '生', '生'],
    3:  ['開', '傷', '死', '死', '休'],
    4:  ['開', '傷', '死', '死', '景'],
    5:  ['生', '死', '休', '休', '休'],
    6:  ['死', '休', '杜', '杜', '死'],
    7:  ['休', '杜', '驚', '驚', '杜'],
    8:  ['杜', '驚', '景', '景', '傷'],
    9:  ['景', '驚', '生', '生', '休'],
    10: ['休', '杜', '驚', '驚', '開'],
    11: ['休', '杜', '驚', '驚', '傷']
  },
  // Yin 4 Structure
  'N4': {
    0:  ['杜', '驚', '生', '生', '生'],
    1:  ['驚', '生', '開', '開', '傷'],
    2:  ['驚', '生', '開', '開', '傷'],
    3:  ['傷', '死', '休', '休', '景'],
    4:  ['傷', '死', '休', '休', '死'],
    5:  ['死', '休', '杜', '杜', '景'],
    6:  ['休', '杜', '驚', '驚', '杜'],
    7:  ['杜', '驚', '生', '生', '休'],
    8:  ['驚', '景', '死', '死', '開'],
    9:  ['驚', '生', '開', '開', '景'],
    10: ['杜', '驚', '生', '生', '生'],
    11: ['杜', '驚', '生', '生', '開']
  },
  // Yin 5 Structure
  'N5': {
    0:  ['驚', '生', '開', '開', '傷'],
    1:  ['生', '開', '傷', '傷', '開'],
    2:  ['生', '開', '傷', '傷', '開'],
    3:  ['死', '休', '杜', '杜', '死'],
    4:  ['死', '休', '杜', '杜', '杜'],
    5:  ['休', '杜', '驚', '驚', '死'],
    6:  ['杜', '驚', '生', '生', '休'],
    7:  ['驚', '生', '開', '開', '景'],
    8:  ['景', '死', '休', '休', '生'],
    9:  ['生', '開', '傷', '傷', '死'],
    10: ['驚', '生', '開', '開', '傷'],
    11: ['驚', '生', '開', '開', '生']
  },
  // Yin 6 Structure
  'N6': {
    0:  ['生', '開', '傷', '傷', '開'],
    1:  ['開', '傷', '死', '死', '生'],
    2:  ['開', '傷', '死', '死', '生'],
    3:  ['休', '杜', '驚', '驚', '杜'],
    4:  ['休', '杜', '驚', '驚', '休'],
    5:  ['杜', '驚', '生', '生', '杜'],
    6:  ['驚', '生', '開', '開', '景'],
    7:  ['生', '開', '傷', '傷', '死'],
    8:  ['死', '休', '杜', '杜', '傷'],
    9:  ['開', '傷', '死', '死', '杜'],
    10: ['生', '開', '傷', '傷', '開'],
    11: ['生', '開', '傷', '傷', '傷']
  },
  // Yin 7 Structure
  'N7': {
    0:  ['開', '傷', '死', '死', '生'],
    1:  ['傷', '死', '休', '休', '傷'],
    2:  ['傷', '死', '休', '休', '傷'],
    3:  ['杜', '驚', '生', '生', '休'],
    4:  ['杜', '驚', '生', '生', '景'],
    5:  ['驚', '生', '開', '開', '休'],
    6:  ['生', '開', '傷', '傷', '死'],
    7:  ['開', '傷', '死', '死', '杜'],
    8:  ['休', '杜', '驚', '驚', '開'],
    9:  ['傷', '死', '休', '休', '休'],
    10: ['開', '傷', '死', '死', '生'],
    11: ['開', '傷', '死', '死', '開']
  },
  // Yin 8 Structure
  'N8': {
    0:  ['傷', '死', '休', '休', '傷'],
    1:  ['死', '休', '杜', '杜', '死'],
    2:  ['死', '休', '杜', '杜', '死'],
    3:  ['驚', '生', '開', '開', '景'],
    4:  ['驚', '生', '開', '開', '死'],
    5:  ['生', '開', '傷', '傷', '景'],
    6:  ['開', '傷', '死', '死', '杜'],
    7:  ['傷', '死', '休', '休', '休'],
    8:  ['杜', '驚', '生', '生', '生'],
    9:  ['死', '休', '杜', '杜', '景'],
    10: ['傷', '死', '休', '休', '傷'],
    11: ['傷', '死', '休', '休', '生']
  },
  // Yin 9 Structure
  'N9': {
    0:  ['死', '休', '杜', '杜', '死'],
    1:  ['休', '杜', '驚', '驚', '休'],
    2:  ['休', '杜', '驚', '驚', '休'],
    3:  ['生', '開', '傷', '傷', '死'],
    4:  ['生', '開', '傷', '傷', '杜'],
    5:  ['開', '傷', '死', '死', '死'],
    6:  ['傷', '死', '休', '休', '休'],
    7:  ['死', '休', '杜', '杜', '景'],
    8:  ['驚', '生', '開', '開', '傷'],
    9:  ['休', '杜', '驚', '驚', '死'],
    10: ['死', '休', '杜', '杜', '死'],
    11: ['死', '休', '杜', '杜', '傷']
  }
};

// Eight Doors meanings
const EIGHT_DOORS = {
  '休': { pinyin: 'Xiu', english: 'Rest', rating: 'Auspicious', meaning: 'Rest, recuperation, receiving salary. Good for meetings and negotiations.' },
  '生': { pinyin: 'Sheng', english: 'Life', rating: 'Excellent', meaning: 'Growth, prosperity, new beginnings. Excellent for starting business.' },
  '傷': { pinyin: 'Shang', english: 'Harm', rating: 'Inauspicious', meaning: 'Injury, accidents, surgery. Avoid important activities.' },
  '杜': { pinyin: 'Du', english: 'Delusion', rating: 'Neutral', meaning: 'Hiding, secrecy, defense. Good for avoiding trouble.' },
  '景': { pinyin: 'Jing', english: 'Scenery', rating: 'Neutral', meaning: 'Beauty, fame, documents. Good for publicity.' },
  '死': { pinyin: 'Si', english: 'Death', rating: 'Very Inauspicious', meaning: 'Endings, stagnation, burial matters. Avoid all important activities.' },
  '驚': { pinyin: 'Jing', english: 'Fear', rating: 'Inauspicious', meaning: 'Shock, legal matters, disputes. Be cautious.' },
  '開': { pinyin: 'Kai', english: 'Open', rating: 'Excellent', meaning: 'Opening, opportunities, success. Excellent for all activities.' }
};

    // ============================================
    // QI MEN DUN JIA
    // ============================================
    /**
 * Qi Men Dun Jia (奇門遁甲) Functions
 * Based on Joey Yap's Qi Men Dun Jia Destiny Analysis
 *
 * Qi Men Dun Jia is an ancient Chinese divination technique used to select
 * auspicious timing and directions for important activities.
 */



/**
 * Helper: Convert SOLAR_TERMS_DATA to array format for a year
 * @param {number} year - The year to get solar terms for
 * @returns {Array} Array of solar term objects with date information
 */
function getSolarTermsForYear(year) {
  const data = SOLAR_TERMS_DATA[year] || SOLAR_TERMS_DATA[2025]; // Fallback to 2025
  return data.map(term => {
    const [month, day] = term.date.split('-').map(Number);
    return {
      name: term.name,
      english: term.english,
      year: year,
      month: month,
      day: day
    };
  });
}

/**
 * Get Solar Term for a given date (enhanced version)
 * Determines which solar term a date falls within and the day number within that term
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} { term: solar term name, dayInTerm: day number within term }
 */
function getSolarTermForDate(year, month, day) {
  // Find which solar term the date falls in
  const terms = getSolarTermsForYear(year);
  let currentTerm = null;
  let dayInTerm = 0;

  const targetDate = new Date(year, month - 1, day);

  for (let i = 0; i < terms.length; i++) {
    const termDate = new Date(terms[i].year, terms[i].month - 1, terms[i].day);
    const nextTermDate = i < terms.length - 1
      ? new Date(terms[i + 1].year, terms[i + 1].month - 1, terms[i + 1].day)
      : new Date(year + 1, 0, 6); // Approximate next year's first term

    if (targetDate >= termDate && targetDate < nextTermDate) {
      currentTerm = terms[i];
      dayInTerm = Math.floor((targetDate - termDate) / (24 * 60 * 60 * 1000)) + 1;
      break;
    }
  }

  // If not found, check previous year's last term
  if (!currentTerm) {
    const prevYearTerms = getSolarTermsForYear(year - 1);
    const lastTerm = prevYearTerms[prevYearTerms.length - 1];
    const termDate = new Date(lastTerm.year, lastTerm.month - 1, lastTerm.day);
    dayInTerm = Math.floor((targetDate - termDate) / (24 * 60 * 60 * 1000)) + 1;
    currentTerm = lastTerm;
  }

  return {
    term: currentTerm ? currentTerm.name : '冬至',
    dayInTerm: dayInTerm
  };
}

/**
 * Calculate Qi Men Structure Number
 * Determines which of the 9 Yang Dun or 9 Yin Dun structures applies to a given date
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} { type: 'Yang' or 'Yin', number: 1-9, key: structure key, term: solar term, yuan: 0-2 }
 */
function getQiMenStructure(year, month, day) {
  // Get Solar Term for the date
  const solarTermInfo = getSolarTermForDate(year, month, day);
  const termName = solarTermInfo.term;
  const dayInTerm = solarTermInfo.dayInTerm;

  // Determine Yuan (Upper=0, Middle=1, Lower=2) based on day within term
  // Each Yuan is roughly 5 days
  let yuan;
  if (dayInTerm <= 5) yuan = 0;      // Upper Yuan (上元)
  else if (dayInTerm <= 10) yuan = 1; // Middle Yuan (中元)
  else yuan = 2;                      // Lower Yuan (下元)

  // Determine if Yang Dun or Yin Dun
  const isYangDun = YANG_DUN_STRUCTURES.hasOwnProperty(termName);

  let structureNum;
  if (isYangDun) {
    structureNum = YANG_DUN_STRUCTURES[termName][yuan];
    return { type: 'Yang', number: structureNum, key: 'Y' + structureNum, term: termName, yuan: yuan };
  } else {
    structureNum = YIN_DUN_STRUCTURES[termName][yuan];
    return { type: 'Yin', number: structureNum, key: 'N' + structureNum, term: termName, yuan: yuan };
  }
}

/**
 * Get Life Stem pair index (for lookup table)
 * Maps the 10 Heavenly Stems into 5 pairs
 * @param {string} stemChinese - Chinese character for the stem (甲-癸)
 * @returns {number} Pair index 0-4: 甲己(0), 乙庚(1), 丙辛(2), 丁壬(3), 戊癸(4)
 */
function getLifeStemPairIndex(stemChinese) {
  const pairs = {
    '甲': 0, '己': 0,
    '乙': 1, '庚': 1,
    '丙': 2, '辛': 2,
    '丁': 3, '壬': 3,
    '戊': 4, '癸': 4
  };
  return pairs[stemChinese] !== undefined ? pairs[stemChinese] : 0;
}

/**
 * Calculate Destiny Door using proper Qi Men method
 * The Destiny Door indicates the fortune/energy for a specific hour on a given day
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @param {number} hour - Hour (0-23)
 * @param {string} dayStemChinese - Chinese character for day stem (甲-癸)
 * @returns {Object} { door: Chinese door character, structure: Qi Men structure info, doorInfo: door meaning }
 */
function calculateDestinyDoor(year, month, day, hour, dayStemChinese) {
  // 1. Get the Qi Men Structure
  const structure = getQiMenStructure(year, month, day);

  // 2. Get Life Stem pair index
  const stemPairIndex = getLifeStemPairIndex(dayStemChinese);

  // 3. Get Hour Branch index (0-11)
  const hourBranchIndex = Math.floor(((hour + 1) % 24) / 2);

  // 4. Look up Destiny Door from table
  const lookupTable = DESTINY_DOOR_TABLES[structure.key];
  if (!lookupTable) {
    console.error('Qi Men lookup table not found for structure:', structure.key);
    return {
      door: '休',
      structure: structure,
      doorInfo: EIGHT_DOORS['休']
    }; // Default fallback
  }

  const doorChinese = lookupTable[hourBranchIndex][stemPairIndex];

  return {
    door: doorChinese,
    structure: structure,
    doorInfo: EIGHT_DOORS[doorChinese] || {}
  };
}

    // ============================================
    // TIMING SYSTEMS DATA
    // ============================================
    /**
 * Timing Systems Data
 * 12 Day Officers (建除十二神) and 28 Lunar Mansions (二十八宿)
 * Traditional Chinese timing selection systems
 */

// 12 Day Officers (建除十二神)
// Used for selecting auspicious days for various activities
const TWELVE_OFFICERS = [
  { chinese: '建', pinyin: 'Jian', english: 'Establish', quality: 'auspicious',
    meaning: 'Day of establishing and initiating',
    good: 'Starting projects, opening businesses, making plans, taking initiative',
    avoid: 'Demolition, ending things, funerals' },
  { chinese: '除', pinyin: 'Chu', english: 'Remove', quality: 'auspicious',
    meaning: 'Day of removal and cleansing',
    good: 'Cleaning, medical treatment, removing obstacles, pest control, haircuts',
    avoid: 'Weddings, celebrations, starting long-term projects' },
  { chinese: '滿', pinyin: 'Man', english: 'Full', quality: 'auspicious',
    meaning: 'Day of fullness and abundance',
    good: 'Celebrations, receiving, harvesting, completing projects',
    avoid: 'Medical procedures, acupuncture' },
  { chinese: '平', pinyin: 'Ping', english: 'Balance', quality: 'neutral',
    meaning: 'Day of balance and equality',
    good: 'Routine matters, negotiations, mediation, paving roads',
    avoid: 'Major decisions, big purchases' },
  { chinese: '定', pinyin: 'Ding', english: 'Stable', quality: 'auspicious',
    meaning: 'Day of stability and settlement',
    good: 'Signing contracts, commitments, buying property, engagement',
    avoid: 'Travel, moving, litigation' },
  { chinese: '執', pinyin: 'Zhi', english: 'Execute', quality: 'neutral',
    meaning: 'Day of execution and holding',
    good: 'Legal matters, collecting debts, building, buying animals',
    avoid: 'Moving, travel, major changes' },
  { chinese: '破', pinyin: 'Po', english: 'Destroy', quality: 'inauspicious',
    meaning: 'Day of breaking and destruction',
    good: 'Demolition, breaking bad habits, ending harmful relationships',
    avoid: 'Weddings, contracts, starting anything new, celebrations' },
  { chinese: '危', pinyin: 'Wei', english: 'Danger', quality: 'inauspicious',
    meaning: 'Day of danger and risk',
    good: 'Climbing, risky activities only if necessary',
    avoid: 'Travel, water activities, major decisions, medical procedures' },
  { chinese: '成', pinyin: 'Cheng', english: 'Success', quality: 'auspicious',
    meaning: 'Day of accomplishment and success',
    good: 'Completing projects, celebrations, weddings, opening businesses',
    avoid: 'Litigation, demanding debts' },
  { chinese: '收', pinyin: 'Shou', english: 'Receive', quality: 'auspicious',
    meaning: 'Day of receiving and gathering',
    good: 'Collecting debts, harvesting, storing, receiving payments',
    avoid: 'Funerals, medical procedures' },
  { chinese: '開', pinyin: 'Kai', english: 'Open', quality: 'auspicious',
    meaning: 'Day of opening and beginning',
    good: 'Grand openings, starting jobs, moving in, weddings, travel',
    avoid: 'Funerals, burying' },
  { chinese: '閉', pinyin: 'Bi', english: 'Close', quality: 'inauspicious',
    meaning: 'Day of closing and ending',
    good: 'Funerals, filling holes, building walls, closing deals',
    avoid: 'Opening new ventures, starting projects, medical treatment' }
];

// 28 Lunar Mansions (二十八宿)
// Traditional Chinese asterisms used for timing and fortune telling
const TWENTY_EIGHT_MANSIONS = [
  { chinese: '角', pinyin: 'Jiao', english: 'Horn', animal: 'Dragon', element: 'wood', quality: 'auspicious' },
  { chinese: '亢', pinyin: 'Kang', english: 'Neck', animal: 'Dragon', element: 'metal', quality: 'inauspicious' },
  { chinese: '氐', pinyin: 'Di', english: 'Root', animal: 'Badger', element: 'earth', quality: 'auspicious' },
  { chinese: '房', pinyin: 'Fang', english: 'Room', animal: 'Rabbit', element: 'sun', quality: 'auspicious' },
  { chinese: '心', pinyin: 'Xin', english: 'Heart', animal: 'Fox', element: 'moon', quality: 'inauspicious' },
  { chinese: '尾', pinyin: 'Wei', english: 'Tail', animal: 'Tiger', element: 'fire', quality: 'auspicious' },
  { chinese: '箕', pinyin: 'Ji', english: 'Basket', animal: 'Leopard', element: 'water', quality: 'auspicious' },
  { chinese: '斗', pinyin: 'Dou', english: 'Dipper', animal: 'Unicorn', element: 'wood', quality: 'auspicious' },
  { chinese: '牛', pinyin: 'Niu', english: 'Ox', animal: 'Ox', element: 'metal', quality: 'inauspicious' },
  { chinese: '女', pinyin: 'Nu', english: 'Girl', animal: 'Bat', element: 'earth', quality: 'inauspicious' },
  { chinese: '虛', pinyin: 'Xu', english: 'Emptiness', animal: 'Rat', element: 'sun', quality: 'inauspicious' },
  { chinese: '危', pinyin: 'Wei', english: 'Rooftop', animal: 'Swallow', element: 'moon', quality: 'inauspicious' },
  { chinese: '室', pinyin: 'Shi', english: 'House', animal: 'Pig', element: 'fire', quality: 'auspicious' },
  { chinese: '壁', pinyin: 'Bi', english: 'Wall', animal: 'Porcupine', element: 'water', quality: 'auspicious' },
  { chinese: '奎', pinyin: 'Kui', english: 'Legs', animal: 'Wolf', element: 'wood', quality: 'auspicious' },
  { chinese: '婁', pinyin: 'Lou', english: 'Bond', animal: 'Dog', element: 'metal', quality: 'auspicious' },
  { chinese: '胃', pinyin: 'Wei', english: 'Stomach', animal: 'Pheasant', element: 'earth', quality: 'auspicious' },
  { chinese: '昴', pinyin: 'Mao', english: 'Hairy Head', animal: 'Rooster', element: 'sun', quality: 'inauspicious' },
  { chinese: '畢', pinyin: 'Bi', english: 'Net', animal: 'Crow', element: 'moon', quality: 'auspicious' },
  { chinese: '觜', pinyin: 'Zi', english: 'Turtle Beak', animal: 'Monkey', element: 'fire', quality: 'inauspicious' },
  { chinese: '參', pinyin: 'Shen', english: 'Three Stars', animal: 'Ape', element: 'water', quality: 'auspicious' },
  { chinese: '井', pinyin: 'Jing', english: 'Well', animal: 'Tapir', element: 'wood', quality: 'auspicious' },
  { chinese: '鬼', pinyin: 'Gui', english: 'Ghost', animal: 'Sheep', element: 'metal', quality: 'inauspicious' },
  { chinese: '柳', pinyin: 'Liu', english: 'Willow', animal: 'Deer', element: 'earth', quality: 'inauspicious' },
  { chinese: '星', pinyin: 'Xing', english: 'Star', animal: 'Horse', element: 'sun', quality: 'inauspicious' },
  { chinese: '張', pinyin: 'Zhang', english: 'Extended Net', animal: 'Stag', element: 'moon', quality: 'auspicious' },
  { chinese: '翼', pinyin: 'Yi', english: 'Wings', animal: 'Snake', element: 'fire', quality: 'inauspicious' },
  { chinese: '軫', pinyin: 'Zhen', english: 'Chariot', animal: 'Earthworm', element: 'water', quality: 'auspicious' }
];

    // ============================================
    // TIMING SYSTEMS
    // ============================================
    /**
 * Timing Systems Functions
 * 12 Day Officers (建除十二神) and 28 Lunar Mansions (二十八宿)
 *
 * Traditional Chinese date selection systems for determining
 * auspicious and inauspicious days for various activities.
 */






/**
 * Get the Day Officer for a specific date
 * The 12 Officers cycle based on the relationship between month and day branches
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} Officer object with chinese, pinyin, english, quality, meaning, good, avoid
 */
function getTodayOfficer(year, month, day) {
  // Calculate based on lunar month and day relationship
  // Simplified calculation - starts from 建 on 寅 month 寅 day
  const dayPillar = calculateDayPillar(year, month, day);
  const monthPillar = calculateMonthPillar(year, month, day, dayPillar.stemIndex);

  const monthIdx = monthPillar.branchIndex;
  const dayIdx = dayPillar.branchIndex;

  // Officer index = (dayIdx - monthIdx + 12) % 12
  const officerIdx = (dayIdx - monthIdx + 12) % 12;
  return TWELVE_OFFICERS[officerIdx];
}

/**
 * Get the Lunar Mansion for a specific date
 * The 28 Mansions cycle every 28 days
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} Mansion object with chinese, pinyin, english, animal, element, quality
 */
function getTodayMansion(year, month, day) {
  // Mansions cycle every 28 days
  // Reference: Jan 1, 2000 was mansion index 0 (角)
  const refDate = Date.UTC(2000, 0, 1);
  const targetDate = Date.UTC(year, month - 1, day);
  const daysDiff = Math.floor((targetDate - refDate) / (24 * 60 * 60 * 1000));
  const mansionIdx = ((daysDiff % 28) + 28) % 28;
  return TWENTY_EIGHT_MANSIONS[mansionIdx];
}

/**
 * Get hour rating based on element relationships
 * Rates how favorable an hour is based on its earthly branch element
 * and the relationship to the day master element
 * @param {Object} chart - BaZi chart object with dayMaster
 * @param {number} hourIndex - Hour branch index (0-11)
 * @returns {number} Rating from 1-5 (5 = excellent, 1 = poor)
 */
function getHourRating(chart, hourIndex) {
  if (!chart || !chart.dayMaster) return 3;

  const dmElement = chart.dayMaster.element;
  const hourBranch = EARTHLY_BRANCHES[hourIndex];
  if (!hourBranch) return 3;

  const hourElement = hourBranch.element;

  // Import element cycles from constants
  

  // Hour produces Day Master (resource/support) = 5
  if (ELEMENT_CYCLES.produces[hourElement] === dmElement) return 5;

  // Same element = 4
  if (dmElement === hourElement) return 4;

  // Day Master controls hour (output/expression) = 4
  if (ELEMENT_CYCLES.controls[dmElement] === hourElement) return 4;

  // Day Master produces hour (drain) = 3
  if (ELEMENT_CYCLES.produces[dmElement] === hourElement) return 3;

  // Hour controls Day Master (pressure/challenge) = 2
  if (ELEMENT_CYCLES.controls[hourElement] === dmElement) return 2;

  return 3;
}

/**
 * Get favorable direction for an hour
 * Recommends a direction to face based on the chart's favorable directions
 * @param {Object} chart - BaZi chart object with favorableDirections
 * @param {number} hourIndex - Hour branch index (0-11)
 * @returns {string} Direction recommendation (e.g., "Face North")
 */
function getHourDirection(chart, hourIndex) {
  if (!chart || !chart.favorableDirections) {
    return 'Calculate chart first';
  }

  const dirs = chart.favorableDirections;
  const recommendations = [
    dirs.shengQi,
    dirs.tianYi,
    dirs.yanNian,
    dirs.fuWei
  ];

  return `Face ${recommendations[hourIndex % 4]}`;
}

    // ============================================
    // KUA VERIFICATION (v3.7.0)
    // ============================================
    /**
 * Kua Number Verification Module
 * Implements triple-method verification for highest accuracy
 *
 * Three calculation methods:
 * - Method A (Simple): Traditional formula without era handling
 * - Method B (Era-Aware): Correct formula with pre-2000/post-2000 differentiation
 * - Method C (Lookup): Reference table with authoritative values
 */



/**
 * Method A: Simple Traditional Formula
 * Does not handle era boundaries correctly
 * Included for verification/comparison only
 */
function calculateKuaSimple(birthYear, gender) {
    const yearDigits = birthYear.toString().slice(-2);
    const sum = parseInt(yearDigits[0]) + parseInt(yearDigits[1]);

    let kua;
    if (gender === 'male') {
        kua = 11 - (sum % 10);
        if (kua === 5) kua = 2;
        if (kua > 9) kua -= 9;
    } else {
        kua = 4 + (sum % 10);
        if (kua > 9) kua -= 9;
        if (kua === 5) kua = 8;
    }

    return {
        kua,
        method: 'simple',
        formula: 'Traditional (no era handling)',
        reliable: birthYear < 2000
    };
}

/**
 * Method B: Era-Aware Formula (Recommended)
 * Handles pre-2000 and post-2000 births correctly
 * Includes Li Chun adjustment
 */
function calculateKuaEraAware(birthYear, gender, birthMonth = 6, birthDay = 15) {
    let calcYear = birthYear;

    // Li Chun adjustment - Chinese year starts around Feb 4, not Jan 1
    const liChun = getLiChunDate(birthYear);
    const liChunMonth = liChun.month;
    const liChunDay = liChun.day;

    if (birthMonth < liChunMonth || (birthMonth === liChunMonth && birthDay < liChunDay)) {
        calcYear = birthYear - 1;
    }

    // Take last two digits and sum to single digit
    const lastTwo = calcYear % 100;
    let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
    while (digitSum > 9) {
        digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
    }

    let kua;
    const isMale = gender === 'male';

    // Apply correct formulas based on era
    if (calcYear >= 2000) {
        // Post-2000 formula
        if (isMale) {
            kua = 9 - digitSum;
            if (kua <= 0) kua += 9;
        } else {
            kua = digitSum + 6;
            if (kua > 9) kua -= 9;
        }
    } else if (calcYear >= 1900) {
        // Pre-2000 formula (20th century)
        if (isMale) {
            kua = 10 - digitSum;
            if (kua <= 0) kua += 9;
            if (kua > 9) kua -= 9;
        } else {
            kua = digitSum + 5;
            if (kua > 9) kua -= 9;
        }
    } else {
        // Pre-1900 formula (19th century)
        if (isMale) {
            kua = 11 - digitSum;
            if (kua > 9) kua -= 9;
        } else {
            kua = digitSum + 4;
            if (kua > 9) kua -= 9;
        }
    }

    // Kua 5 doesn't exist in Eight Mansions
    if (kua === 5) {
        kua = isMale ? 2 : 8;
    }

    return {
        kua,
        method: 'era-aware',
        formula: calcYear >= 2000 ? 'Post-2000' : calcYear >= 1900 ? 'Pre-2000' : 'Pre-1900',
        adjustedYear: calcYear,
        liChunAdjusted: calcYear !== birthYear,
        reliable: true
    };
}

/**
 * Method C: Lookup Table
 * Pre-computed authoritative reference values
 * Most reliable for years in table
 */
function calculateKuaLookup(birthYear, gender) {
    // Comprehensive lookup table for years 1930-2040
    // Computed using era-aware formula with Li Chun adjustment
    const MALE_KUA = {
        1930: 8, 1931: 7, 1932: 6, 1933: 5, 1934: 4, 1935: 3, 1936: 2, 1937: 1, 1938: 9, 1939: 8,
        1940: 7, 1941: 6, 1942: 5, 1943: 4, 1944: 3, 1945: 2, 1946: 1, 1947: 9, 1948: 8, 1949: 7,
        1950: 6, 1951: 5, 1952: 4, 1953: 3, 1954: 2, 1955: 1, 1956: 9, 1957: 8, 1958: 7, 1959: 6,
        1960: 5, 1961: 4, 1962: 3, 1963: 2, 1964: 1, 1965: 9, 1966: 8, 1967: 7, 1968: 6, 1969: 5,
        1970: 4, 1971: 3, 1972: 2, 1973: 1, 1974: 9, 1975: 8, 1976: 7, 1977: 6, 1978: 5, 1979: 4,
        1980: 3, 1981: 2, 1982: 1, 1983: 9, 1984: 8, 1985: 7, 1986: 6, 1987: 5, 1988: 4, 1989: 3,
        1990: 2, 1991: 1, 1992: 9, 1993: 8, 1994: 7, 1995: 6, 1996: 5, 1997: 4, 1998: 3, 1999: 2,
        2000: 9, 2001: 8, 2002: 7, 2003: 6, 2004: 5, 2005: 4, 2006: 3, 2007: 2, 2008: 1, 2009: 9,
        2010: 8, 2011: 7, 2012: 6, 2013: 5, 2014: 4, 2015: 3, 2016: 2, 2017: 1, 2018: 9, 2019: 8,
        2020: 7, 2021: 6, 2022: 5, 2023: 4, 2024: 3, 2025: 2, 2026: 1, 2027: 9, 2028: 8, 2029: 7,
        2030: 6, 2031: 5, 2032: 4, 2033: 3, 2034: 2, 2035: 1, 2036: 9, 2037: 8, 2038: 7, 2039: 6,
        2040: 5
    };

    const FEMALE_KUA = {
        1930: 1, 1931: 2, 1932: 3, 1933: 4, 1934: 6, 1935: 7, 1936: 8, 1937: 9, 1938: 1, 1939: 2,
        1940: 3, 1941: 4, 1942: 6, 1943: 7, 1944: 8, 1945: 9, 1946: 1, 1947: 2, 1948: 3, 1949: 4,
        1950: 6, 1951: 7, 1952: 8, 1953: 9, 1954: 1, 1955: 2, 1956: 3, 1957: 4, 1958: 6, 1959: 7,
        1960: 8, 1961: 9, 1962: 1, 1963: 2, 1964: 3, 1965: 4, 1966: 6, 1967: 7, 1968: 8, 1969: 9,
        1970: 1, 1971: 2, 1972: 3, 1973: 4, 1974: 6, 1975: 7, 1976: 8, 1977: 9, 1978: 1, 1979: 2,
        1980: 3, 1981: 4, 1982: 6, 1983: 7, 1984: 8, 1985: 9, 1986: 1, 1987: 2, 1988: 3, 1989: 4,
        1990: 6, 1991: 7, 1992: 8, 1993: 9, 1994: 1, 1995: 2, 1996: 3, 1997: 4, 1998: 6, 1999: 7,
        2000: 6, 2001: 7, 2002: 8, 2003: 9, 2004: 1, 2005: 2, 2006: 3, 2007: 4, 2008: 6, 2009: 7,
        2010: 8, 2011: 9, 2012: 1, 2013: 2, 2014: 3, 2015: 4, 2016: 6, 2017: 7, 2018: 8, 2019: 9,
        2020: 1, 2021: 2, 2022: 3, 2023: 4, 2024: 6, 2025: 7, 2026: 8, 2027: 9, 2028: 1, 2029: 2,
        2030: 3, 2031: 4, 2032: 6, 2033: 7, 2034: 8, 2035: 9, 2036: 1, 2037: 2, 2038: 3, 2039: 4,
        2040: 6
    };

    const table = gender === 'male' ? MALE_KUA : FEMALE_KUA;
    const kua = table[birthYear];

    if (kua === undefined) {
        return {
            kua: null,
            method: 'lookup',
            formula: 'Year not in reference table',
            reliable: false
        };
    }

    return {
        kua,
        method: 'lookup',
        formula: 'Reference Table',
        reliable: true
    };
}

/**
 * Master verification function
 * Calls all three methods and determines confidence level
 */
function verifyKuaNumber(birthYear, gender, birthMonth = 6, birthDay = 15) {
    // Validate inputs
    if (!birthYear || !gender) {
        return {
            kuaNumber: null,
            confidence: 'low',
            verified: false,
            error: 'Invalid input: birthYear and gender are required'
        };
    }

    if (gender !== 'male' && gender !== 'female') {
        return {
            kuaNumber: null,
            confidence: 'low',
            verified: false,
            error: 'Invalid gender: must be "male" or "female"'
        };
    }

    // Calculate using all three methods
    const resultA = calculateKuaSimple(birthYear, gender);
    const resultB = calculateKuaEraAware(birthYear, gender, birthMonth, birthDay);
    const resultC = calculateKuaLookup(birthYear, gender);

    // Determine confidence based on agreement
    const validResults = [resultA, resultB, resultC].filter(r => r.kua !== null);
    const kuaValues = validResults.map(r => r.kua);

    // Count occurrences
    const frequency = {};
    kuaValues.forEach(kua => {
        frequency[kua] = (frequency[kua] || 0) + 1;
    });

    const maxFreq = Math.max(...Object.values(frequency));
    const mostCommon = Object.keys(frequency)
        .filter(k => frequency[k] === maxFreq)
        .map(Number);

    let confidence = 'low';
    let finalKua = resultB.kua; // Default to era-aware (most trusted)
    let discrepancy = null;
    let verified = false;

    if (maxFreq === 3 && mostCommon.length === 1) {
        // All three methods agree
        confidence = 'high';
        finalKua = mostCommon[0];
        verified = true;
    } else if (maxFreq === 2 && mostCommon.length === 1) {
        // Two out of three agree
        confidence = 'medium';
        finalKua = mostCommon[0];
        verified = true;

        discrepancy = {
            methodA: resultA.kua,
            methodB: resultB.kua,
            methodC: resultC.kua,
            reason: birthYear >= 2000
                ? 'Era boundary - post-2000 birth year'
                : 'Minor calculation variance between methods'
        };
    } else {
        // No clear agreement
        confidence = 'low';
        finalKua = resultB.kua; // Trust era-aware method
        verified = false;

        discrepancy = {
            methodA: resultA.kua,
            methodB: resultB.kua,
            methodC: resultC.kua,
            reason: 'All methods disagree - requires manual review'
        };
    }

    // Collect warnings
    const warnings = [];

    if (birthYear >= 2000) {
        warnings.push('Post-2000 birth: Era-specific formula applied');
    }

    if (birthMonth <= 2) {
        warnings.push('Born Jan/Feb: Li Chun boundary may affect calculation');
    }

    if (resultB.liChunAdjusted) {
        warnings.push(`Year adjusted to ${resultB.adjustedYear} due to Li Chun`);
    }

    if (!resultC.reliable) {
        warnings.push('Year outside reference table range');
    }

    return {
        kuaNumber: finalKua,
        confidence,
        verified,
        methods: {
            simple: resultA,
            eraAware: resultB,
            lookup: resultC
        },
        discrepancy,
        warnings,
        timestamp: new Date().toISOString()
    };
}

    // ============================================
    // MAIN CALCULATOR
    // ============================================
    /**
 * BaZi Layer 0 - Main Orchestrator
 * Pure calculation engine for Four Pillars
 * SSOT for all BaZi calculations
 */
















/**
 * Parse timezone offset string to minutes
 * @param {string} timezone - Timezone string like "+08:00" or "-05:00"
 * @returns {number} Offset in minutes
 */
function parseTimezoneOffset(timezone) {
    if (!timezone) return 0;

    const match = timezone.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!match) return 0;

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);

    return sign * (hours * 60 + minutes);
}

/**
 * Convert birth time to UTC for calculation
 * @param {Object} birth - Birth data with timezone
 * @returns {Object} UTC normalized birth data
 */
function normalizeToUTC(birth) {
    const { year, month, day, hour, minute, timezone } = birth;

    // Parse timezone offset
    const offsetMinutes = parseTimezoneOffset(timezone);

    // Create a date in the local timezone
    const localDate = new Date(year, month - 1, day, hour, minute);

    // Subtract the offset to get UTC
    const utcDate = new Date(localDate.getTime() - offsetMinutes * 60 * 1000);

    return {
        year: utcDate.getFullYear(),
        month: utcDate.getMonth() + 1,
        day: utcDate.getDate(),
        hour: utcDate.getHours(),
        minute: utcDate.getMinutes()
    };
}

/**
 * Calculate Four Pillars (BaZi Chart)
 * @param {Object} birth - Birth data: { year, month, day, hour, minute, timezone }
 * @returns {Object} Four Pillars with formatted names
 */
function calculateBaZi(birth) {
    // BaZi uses LOCAL solar time, not UTC
    // Solar terms (Li Chun, etc.) occur at specific moments, but the
    // day/hour pillars are based on local observation
    const { year, month, day, hour, minute } = birth;

    // Calculate all pillars using local time
    const dayPillar = calculateDayPillar(year, month, day);
    const yearPillar = calculateYearPillar(year, month, day);
    const monthPillar = calculateMonthPillar(year, month, day, yearPillar.stemIndex);
    const hourPillar = calculateHourPillar(hour, minute, dayPillar.stemIndex);

    // Format output
    return {
        year_pillar: formatPillar(yearPillar.stemIndex, yearPillar.branchIndex),
        month_pillar: formatPillar(monthPillar.stemIndex, monthPillar.branchIndex),
        day_pillar: formatPillar(dayPillar.stemIndex, dayPillar.branchIndex),
        hour_pillar: formatPillar(hourPillar.stemIndex, hourPillar.branchIndex),

        // Include indices and Chinese for debugging/verification
        _debug: {
            year: {
                stem: yearPillar.stemIndex,
                branch: yearPillar.branchIndex,
                chinese: formatChinesePillar(yearPillar.stemIndex, yearPillar.branchIndex),
                adjustedYear: yearPillar.adjustedYear
            },
            month: {
                stem: monthPillar.stemIndex,
                branch: monthPillar.branchIndex,
                chinese: formatChinesePillar(monthPillar.stemIndex, monthPillar.branchIndex)
            },
            day: {
                stem: dayPillar.stemIndex,
                branch: dayPillar.branchIndex,
                chinese: formatChinesePillar(dayPillar.stemIndex, dayPillar.branchIndex)
            },
            hour: {
                stem: hourPillar.stemIndex,
                branch: hourPillar.branchIndex,
                chinese: formatChinesePillar(hourPillar.stemIndex, hourPillar.branchIndex)
            },
            input: { year, month, day, hour, minute }
        }
    };
}

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        // Main calculation functions
        calculateBaZi: calculateBaZi,
        calculateFullChart: calculateFullChart,

        // Individual pillar functions
        calculateYearPillar: calculateYearPillar,
        calculateMonthPillar: calculateMonthPillar,
        calculateDayPillar: calculateDayPillar,
        calculateHourPillar: calculateHourPillar,

        // Solar terms
        getSolarTerms: getYearSolarTerms,
        getYearSolarTerms: getYearSolarTerms,
        findLiChun: findSolarLongitudeJD,
        getLiChunDate: getLiChunDate,

        // Formatters
        formatPillar: formatPillar,
        formatChinesePillar: formatChinesePillar,

        // Constants - Core
        HEAVENLY_STEMS: HEAVENLY_STEMS,
        EARTHLY_BRANCHES: EARTHLY_BRANCHES,

        // Constants - Ten Gods & Elements
        TEN_GODS: TEN_GODS,
        ELEMENT_CYCLES: ELEMENT_CYCLES,

        // Constants - Branch Relations
        SIX_HARMONIES: SIX_HARMONIES,
        SIX_CLASHES: SIX_CLASHES,
        SIX_HARMS: SIX_HARMS,

        // Constants - Na Yin
        NAYIN: NAYIN,

        // Constants - Use God
        SEASONAL_STRENGTH: SEASONAL_STRENGTH,

        // Analysis Functions
        getTenGod: getTenGod,
        getElementRelation: getElementRelation,
        getNaYin: getNaYin,
        getElementCount: getElementCount,
        getFavorableElements: getFavorableElements,
        getLifeGua: getLifeGua,
        getFavorableDirections: getFavorableDirections,

        // Luck Pillars
        calculateLuckPillars: calculateLuckPillars,

        // Use God Functions (v3.3.0)
        selectUseGod: selectUseGod,
        calculateDayMasterStrength: calculateDayMasterStrength,
        getSeasonalStrength: getSeasonalStrength,
        analyzeImbalances: analyzeImbalances,
        HIDDEN_STEMS: HIDDEN_STEMS,
        getHiddenStems: getHiddenStems,
        getHiddenStemsForChart: getHiddenStemsForChart,

        // Void Stars (v3.3.0)
        getVoidStars: getVoidStars,
        isVoidBranch: isVoidBranch,
        analyzeVoidStarsInChart: analyzeVoidStarsInChart,

        // Symbolic Stars (v3.3.0)
        getNoblepeople: getNoblepeople,
        getPeachBlossom: getPeachBlossom,
        getSkyHorse: getSkyHorse,
        getIntelligenceStar: getIntelligenceStar,
        getLifePalace: getLifePalace,

        // Feng Shui (v3.3.0)
        calculateKuaNumber: calculateKuaNumber,
        getFavorableDirections: getFavorableDirections,
        calculateFlyingStarCenter: calculateFlyingStarCenter,
        getAnnualAfflictions: getAnnualAfflictions,

        // Kua Verification (v3.7.0)
        verifyKuaNumber: verifyKuaNumber,
        calculateKuaSimple: calculateKuaSimple,
        calculateKuaEraAware: calculateKuaEraAware,
        calculateKuaLookup: calculateKuaLookup,

        // Qi Men Dun Jia (v3.4.0)
        getSolarTermsForYear: getSolarTermsForYear,
        getSolarTermForDate: getSolarTermForDate,
        getQiMenStructure: getQiMenStructure,
        getLifeStemPairIndex: getLifeStemPairIndex,
        calculateDestinyDoor: calculateDestinyDoor,
        EIGHT_DOORS: EIGHT_DOORS,

        // Timing Systems (v3.5.0)
        getTodayOfficer: getTodayOfficer,
        getTodayMansion: getTodayMansion,
        getHourRating: getHourRating,
        getHourDirection: getHourDirection,
        TWELVE_OFFICERS: TWELVE_OFFICERS,
        TWENTY_EIGHT_MANSIONS: TWENTY_EIGHT_MANSIONS,

        // Version
        version: '3.7.0'
    };
});
