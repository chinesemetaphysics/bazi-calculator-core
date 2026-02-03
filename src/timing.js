/**
 * Timing Systems Functions
 * 12 Day Officers (建除十二神) and 28 Lunar Mansions (二十八宿)
 *
 * Traditional Chinese date selection systems for determining
 * auspicious and inauspicious days for various activities.
 */

const { TWELVE_OFFICERS, TWENTY_EIGHT_MANSIONS } = require('./data/timingData');
const { calculateMonthPillar } = require('./monthPillar');
const { calculateDayPillar } = require('./dayPillar');
const { EARTHLY_BRANCHES } = require('./constants');

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
  const { ELEMENT_CYCLES } = require('./constants');

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

module.exports = {
  getTodayOfficer,
  getTodayMansion,
  getHourRating,
  getHourDirection,
  TWELVE_OFFICERS,
  TWENTY_EIGHT_MANSIONS
};
