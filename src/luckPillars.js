/**
 * Luck Pillars Module
 * Calculate 10-year Luck Cycles (大运 Da Yun) based on BaZi chart
 * SSOT for Luck Pillars calculation
 */

const { HEAVENLY_STEMS, EARTHLY_BRANCHES } = require('./constants');
const { getTenGod } = require('./tenGods');
const { getNaYin } = require('./nayin');

/**
 * Calculate Luck Pillars (大运 Da Yun) - 10-year cycles
 * @param {Object} chart - BaZi chart with year, month, day pillars and gender
 * @param {string} chart.gender - 'male' or 'female'
 * @param {Object} chart.year - Year pillar with stem property
 * @param {Object} chart.year.stem - Year stem with polarity property
 * @param {Object} chart.month - Month pillar with stem and branch properties
 * @param {Object} chart.month.stem - Month stem with chinese property
 * @param {Object} chart.month.branch - Month branch with chinese property
 * @param {Object} chart.day - Day pillar with stem property (Day Master)
 * @param {Object} chart.day.stem - Day Master stem
 * @param {number} [startAge=2] - Starting age for first luck pillar (default 2)
 * @returns {Object} Luck pillars data with pillars array, direction, and start age
 */
function calculateLuckPillars(chart, startAge = 2) {
  const gender = chart.gender;
  const yearStem = chart.year.stem;
  const monthStem = chart.month.stem;
  const monthBranch = chart.month.branch;
  const dayMaster = chart.day.stem;

  // Determine direction based on gender and year stem polarity
  // Yang year + Male OR Yin year + Female = Forward (順)
  // Yang year + Female OR Yin year + Male = Backward (逆)
  const isYangYear = yearStem.polarity === 'yang';
  const isMale = gender === 'male';
  const isForward = (isYangYear && isMale) || (!isYangYear && !isMale);

  // Generate 9 luck pillars (covering ages 2-92 by default)
  const pillars = [];
  let stemIdx = HEAVENLY_STEMS.findIndex(s => s.chinese === monthStem.chinese);
  let branchIdx = EARTHLY_BRANCHES.findIndex(b => b.chinese === monthBranch.chinese);

  for (let i = 0; i < 9; i++) {
    // Move forward or backward
    if (isForward) {
      stemIdx = (stemIdx + 1) % 10;
      branchIdx = (branchIdx + 1) % 12;
    } else {
      stemIdx = (stemIdx - 1 + 10) % 10;
      branchIdx = (branchIdx - 1 + 12) % 12;
    }

    const stem = HEAVENLY_STEMS[stemIdx];
    const branch = EARTHLY_BRANCHES[branchIdx];
    const age = startAge + (i * 10);

    pillars.push({
      startAge: age,
      endAge: age + 9,
      stem: stem,
      branch: branch,
      tenGod: getTenGod(dayMaster, stem),
      nayin: getNaYin(stem, branch)
    });
  }

  return { pillars, isForward, startAge };
}

module.exports = {
  calculateLuckPillars
};
