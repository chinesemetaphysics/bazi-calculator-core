/**
 * BaZi Layer 0 - Constants
 * Minimal constants required for Four Pillars calculation
 * SSOT for Heavenly Stems and Earthly Branches
 */

// Heavenly Stems (天干) - 10 stems
const HEAVENLY_STEMS = [
    { index: 0, chinese: '甲', english: 'Yang-Wood', element: 'wood', polarity: 'yang' },
    { index: 1, chinese: '乙', english: 'Yin-Wood', element: 'wood', polarity: 'yin' },
    { index: 2, chinese: '丙', english: 'Yang-Fire', element: 'fire', polarity: 'yang' },
    { index: 3, chinese: '丁', english: 'Yin-Fire', element: 'fire', polarity: 'yin' },
    { index: 4, chinese: '戊', english: 'Yang-Earth', element: 'earth', polarity: 'yang' },
    { index: 5, chinese: '己', english: 'Yin-Earth', element: 'earth', polarity: 'yin' },
    { index: 6, chinese: '庚', english: 'Yang-Metal', element: 'metal', polarity: 'yang' },
    { index: 7, chinese: '辛', english: 'Yin-Metal', element: 'metal', polarity: 'yin' },
    { index: 8, chinese: '壬', english: 'Yang-Water', element: 'water', polarity: 'yang' },
    { index: 9, chinese: '癸', english: 'Yin-Water', element: 'water', polarity: 'yin' }
];

// Earthly Branches (地支) - 12 branches / Chinese Zodiac
const EARTHLY_BRANCHES = [
    { index: 0, chinese: '子', english: 'Rat', element: 'water', polarity: 'yang' },
    { index: 1, chinese: '丑', english: 'Ox', element: 'earth', polarity: 'yin' },
    { index: 2, chinese: '寅', english: 'Tiger', element: 'wood', polarity: 'yang' },
    { index: 3, chinese: '卯', english: 'Rabbit', element: 'wood', polarity: 'yin' },
    { index: 4, chinese: '辰', english: 'Dragon', element: 'earth', polarity: 'yang' },
    { index: 5, chinese: '巳', english: 'Snake', element: 'fire', polarity: 'yin' },
    { index: 6, chinese: '午', english: 'Horse', element: 'fire', polarity: 'yang' },
    { index: 7, chinese: '未', english: 'Goat', element: 'earth', polarity: 'yin' },
    { index: 8, chinese: '申', english: 'Monkey', element: 'metal', polarity: 'yang' },
    { index: 9, chinese: '酉', english: 'Rooster', element: 'metal', polarity: 'yin' },
    { index: 10, chinese: '戌', english: 'Dog', element: 'earth', polarity: 'yang' },
    { index: 11, chinese: '亥', english: 'Pig', element: 'water', polarity: 'yin' }
];

module.exports = {
    HEAVENLY_STEMS,
    EARTHLY_BRANCHES
};
