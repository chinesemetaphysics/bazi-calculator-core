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

module.exports = {
    HEAVENLY_STEMS,
    EARTHLY_BRANCHES,
    HIDDEN_STEMS,
    getHiddenStems,
    getHiddenStemsForChart
};
