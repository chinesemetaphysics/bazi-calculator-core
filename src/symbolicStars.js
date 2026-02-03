/**
 * Symbolic Stars (Shen Sha 神煞)
 * Special stars that reveal hidden influences in the chart
 * Based on pillar combinations and relationships
 */

const { HEAVENLY_STEMS, EARTHLY_BRANCHES } = require('./constants');

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

module.exports = {
  getNoblepeople,
  getPeachBlossom,
  getSkyHorse,
  getIntelligenceStar,
  getLifePalace,
  NOBLEMAN,
  PEACH_BLOSSOM,
  SKY_HORSE,
  INTELLIGENCE_STAR
};
