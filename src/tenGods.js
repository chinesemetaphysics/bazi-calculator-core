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

module.exports = {
  TEN_GODS,
  ELEMENT_CYCLES,
  getTenGod,
  getElementRelation
};
