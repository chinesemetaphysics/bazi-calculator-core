/**
 * Feng Shui Functions
 * Flying Stars, Ba Zhai (8 Mansions), Annual Afflictions
 */

const { EARTHLY_BRANCHES } = require('./constants');

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

module.exports = {
  calculateKuaNumber,
  getFavorableDirections,
  calculateFlyingStarCenter,
  getAnnualAfflictions
};
