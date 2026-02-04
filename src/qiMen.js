/**
 * Qi Men Dun Jia (奇門遁甲) Functions
 * Based on Joey Yap's Qi Men Dun Jia Destiny Analysis
 *
 * Qi Men Dun Jia is an ancient Chinese divination technique used to select
 * auspicious timing and directions for important activities.
 */

const {
  SOLAR_TERMS_DATA,
  YANG_DUN_STRUCTURES,
  YIN_DUN_STRUCTURES,
  DESTINY_DOOR_TABLES,
  EIGHT_DOORS
} = require('./data/qiMenData');

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

module.exports = {
  getSolarTermsForYear,
  getSolarTermForDate,
  getQiMenStructure,
  getLifeStemPairIndex,
  calculateDestinyDoor,
  EIGHT_DOORS
};
