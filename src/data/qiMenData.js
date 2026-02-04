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

module.exports = {
  SOLAR_TERMS_DATA,
  YANG_DUN_STRUCTURES,
  YIN_DUN_STRUCTURES,
  DESTINY_DOOR_TABLES,
  EIGHT_DOORS
};
