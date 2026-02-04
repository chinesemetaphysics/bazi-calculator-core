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

module.exports = {
  SIX_HARMONIES,
  SIX_CLASHES,
  SIX_HARMS
};
