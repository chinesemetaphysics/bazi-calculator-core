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

module.exports = {
    HEAVENLY_STEMS,
    EARTHLY_BRANCHES
};
