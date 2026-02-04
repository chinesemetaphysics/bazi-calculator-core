/**
 * Chart Analysis Module
 * High-level chart calculation and element analysis functions
 */

const { calculateYearPillar } = require('./yearPillar');
const { calculateMonthPillar } = require('./monthPillar');
const { calculateDayPillar } = require('./dayPillar');
const { calculateHourPillar } = require('./hourPillar');
const { getLiChunDate } = require('./solarTerms');
const { getNaYin } = require('./nayin');
const { HEAVENLY_STEMS, EARTHLY_BRANCHES } = require('./constants');

/**
 * Calculate Life Gua for Ba Zhai (Eight Mansions)
 * @param {number} year - Birth year
 * @param {string} gender - 'male' or 'female'
 * @param {number} month - Birth month (1-12)
 * @param {number} day - Birth day
 * @returns {number} Life Gua number (1-9, excluding 5)
 */
function getLifeGua(year, gender, month = 6, day = 15) {
  let calcYear = year;

  // Li Chun adjustment - Chinese year starts around Feb 4, not Jan 1
  const liChun = getLiChunDate(year);
  const liChunMonth = liChun.month; // Already in 1-12 format
  const liChunDay = liChun.day;

  if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
    calcYear = year - 1;
  }

  // Take last two digits and sum to single digit
  const lastTwo = calcYear % 100;
  let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
  while (digitSum > 9) {
    digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
  }

  let gua;
  const isMale = gender === 'male';

  // Apply correct formulas based on era
  if (calcYear >= 2000) {
    // Post-2000 formula
    if (isMale) {
      gua = 9 - digitSum;
      if (gua <= 0) gua += 9;
    } else {
      gua = digitSum + 6;
      if (gua > 9) gua -= 9;
    }
  } else {
    // Pre-2000 formula
    if (isMale) {
      gua = 10 - digitSum;
      if (gua <= 0) gua += 9;
      if (gua > 9) gua -= 9;
    } else {
      gua = digitSum + 5;
      if (gua > 9) gua -= 9;
    }
  }

  // Kua 5 doesn't exist in Eight Mansions
  if (gua === 5) {
    gua = isMale ? 2 : 8;
  }

  return gua;
}

/**
 * Get favorable directions based on Life Gua
 * @param {number} gua - Life Gua number (1-9)
 * @returns {Object} Object with 8 directional attributes
 */
function getFavorableDirections(gua) {
  const eastGroup = [1, 3, 4, 9];
  const isEast = eastGroup.includes(gua);

  if (isEast) {
    return {
      shengQi: 'Southeast', tianYi: 'East', yanNian: 'South', fuWei: 'North',
      huoHai: 'Northeast', wuGui: 'Northwest', liuSha: 'Southwest', jueming: 'West'
    };
  } else {
    return {
      shengQi: 'Northeast', tianYi: 'West', yanNian: 'Northwest', fuWei: 'Southwest',
      huoHai: 'East', wuGui: 'Southeast', liuSha: 'North', jueming: 'South'
    };
  }
}

/**
 * Calculate element count in a Four Pillars chart
 * @param {Object} chart - Chart object with year, month, day, hour pillars
 * @returns {Object} Element counts (wood, fire, earth, metal, water)
 */
function getElementCount(chart) {
  const count = { wood: 0, fire: 0, earth: 0, metal: 0, water: 0 };

  ['year', 'month', 'day', 'hour'].forEach(pillar => {
    if (chart[pillar]) {
      count[chart[pillar].stem.element]++;
      count[chart[pillar].branch.element]++;
    }
  });

  return count;
}

/**
 * Determine favorable and unfavorable elements based on Day Master
 * @param {Object} chart - Chart object with dayMaster property
 * @returns {Object} Object with favorable and unfavorable element arrays
 */
function getFavorableElements(chart) {
  const dm = chart.dayMaster;
  const dmElement = dm.element;

  // Production cycle
  const produces = { wood: 'fire', fire: 'earth', earth: 'metal', metal: 'water', water: 'wood' };
  const producedBy = { wood: 'water', fire: 'wood', earth: 'fire', metal: 'earth', water: 'metal' };
  const controls = { wood: 'earth', fire: 'metal', earth: 'water', metal: 'wood', water: 'fire' };
  const controlledBy = { wood: 'metal', fire: 'water', earth: 'wood', metal: 'fire', water: 'earth' };

  // Simple logic: Resource and Same element are generally favorable
  // What DM controls (Wealth) can be good if DM is strong
  // What controls DM is challenging

  return {
    favorable: [producedBy[dmElement], dmElement], // Resource + Same
    unfavorable: [controlledBy[dmElement], produces[dmElement]] // What controls + What drains
  };
}

/**
 * Calculate complete Four Pillars chart with analysis
 * @param {number} year - Birth year
 * @param {number} month - Birth month (1-12)
 * @param {number} day - Birth day
 * @param {number} hour - Birth hour (0-23)
 * @param {number} minute - Birth minute (0-59)
 * @param {string} gender - 'male' or 'female'
 * @returns {Object} Complete chart with all pillars and analysis
 */
function calculateFullChart(year, month, day, hour, minute, gender) {
  // Calculate pillar indices using core functions
  const yearPillarData = calculateYearPillar(year, month, day);
  const monthPillarData = calculateMonthPillar(year, month, day, yearPillarData.stemIndex);
  const dayPillarData = calculateDayPillar(year, month, day);

  // Handle late Zi hour (23:00-23:59) - use NEXT day's stem
  const isLateZiHour = hour >= 23;
  let dayStemForHour = dayPillarData.stemIndex;

  if (isLateZiHour) {
    // Calculate next day's pillar to get correct stem
    const nextDate = new Date(year, month - 1, day + 1);
    const nextDayPillar = calculateDayPillar(
      nextDate.getFullYear(),
      nextDate.getMonth() + 1,
      nextDate.getDate()
    );
    dayStemForHour = nextDayPillar.stemIndex;
  }

  const hourPillarData = calculateHourPillar(hour, minute, dayStemForHour);

  // Format pillars with full stem/branch objects
  const yearPillar = {
    stem: HEAVENLY_STEMS[yearPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[yearPillarData.branchIndex],
    palace: 'Parents',
    stemIndex: yearPillarData.stemIndex,
    branchIndex: yearPillarData.branchIndex
  };

  const monthPillar = {
    stem: HEAVENLY_STEMS[monthPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[monthPillarData.branchIndex],
    palace: 'Siblings/Career',
    stemIndex: monthPillarData.stemIndex,
    branchIndex: monthPillarData.branchIndex
  };

  const dayPillar = {
    stem: HEAVENLY_STEMS[dayPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[dayPillarData.branchIndex],
    palace: 'Self/Spouse',
    stemIndex: dayPillarData.stemIndex,
    branchIndex: dayPillarData.branchIndex
  };

  const hourPillar = {
    stem: HEAVENLY_STEMS[hourPillarData.stemIndex],
    branch: EARTHLY_BRANCHES[hourPillarData.branchIndex],
    palace: 'Children',
    stemIndex: hourPillarData.stemIndex,
    branchIndex: hourPillarData.branchIndex,
    isLateZiHour: isLateZiHour
  };

  const chart = {
    year: yearPillar,
    month: monthPillar,
    day: dayPillar,
    hour: hourPillar,
    dayMaster: dayPillar.stem,
    gender: gender,
    birthYear: year,
    birthMonth: month,
    birthDay: day,
    birthHour: hour,
    birthMinute: minute,
    lifeGua: getLifeGua(year, gender, month, day),
    elementCount: null,
    isLateZiHour: hourPillar.isLateZiHour || false,
    nayin: {
      year: getNaYin(yearPillarData.stemIndex, yearPillarData.branchIndex),
      month: getNaYin(monthPillarData.stemIndex, monthPillarData.branchIndex),
      day: getNaYin(dayPillarData.stemIndex, dayPillarData.branchIndex),
      hour: getNaYin(hourPillarData.stemIndex, hourPillarData.branchIndex)
    }
  };

  chart.elementCount = getElementCount(chart);
  chart.favorableDirections = getFavorableDirections(chart.lifeGua);

  return chart;
}

module.exports = {
  calculateFullChart,
  getElementCount,
  getFavorableElements,
  getLifeGua,
  getFavorableDirections
};
