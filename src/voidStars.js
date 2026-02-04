/**
 * Void Stars / Empty Death (空亡)
 * 
 * Two branches in the chart that are "void" based on the Day Pillar.
 * These represent areas of life with reduced effectiveness.
 */

/**
 * Calculate Void Stars based on Day Stem and Day Branch
 * @param {number} dayStem - Day stem index (0-9)
 * @param {number} dayBranch - Day branch index (0-11)
 * @returns {Array<number>} Array of two void branch indices
 */
function getVoidStars(dayStem, dayBranch) {
  // Calculate 60 Jia Zi index
  const jiaZiIndex = (dayStem * 12 + dayBranch) % 60;
  
  // Each 10-day cycle has 2 void branches
  // The cycle starts at: floor(jiaZiIndex / 10) * 10
  // Void branches are at positions 10 and 11 of each cycle
  const cycleStart = Math.floor(jiaZiIndex / 10) * 10;
  
  // The two void branches for this cycle
  const voidBranches = [
    (cycleStart + 10) % 12,
    (cycleStart + 11) % 12
  ];
  
  return voidBranches;
}

/**
 * Check if a specific branch is void for the given day pillar
 * @param {number} dayStem - Day stem index
 * @param {number} dayBranch - Day branch index
 * @param {number} checkBranch - Branch to check
 * @returns {boolean} True if the branch is void
 */
function isVoidBranch(dayStem, dayBranch, checkBranch) {
  const voidBranches = getVoidStars(dayStem, dayBranch);
  return voidBranches.includes(checkBranch);
}

/**
 * Get void stars for all pillars in a chart
 * @param {Object} chart - Full BaZi chart
 * @returns {Object} Void star analysis for each pillar
 */
function analyzeVoidStarsInChart(chart) {
  const dayStem = chart.day.stem.index;
  const dayBranch = chart.day.branch.index;
  const voidBranches = getVoidStars(dayStem, dayBranch);
  
  return {
    voidBranches: voidBranches,
    year: { 
      isVoid: isVoidBranch(dayStem, dayBranch, chart.year.branch.index),
      impact: 'Ancestral support, early life, social image'
    },
    month: { 
      isVoid: isVoidBranch(dayStem, dayBranch, chart.month.branch.index),
      impact: 'Career, parents, authority figures'
    },
    day: { 
      isVoid: false, // Day pillar itself is never void
      impact: 'Self, marriage, spouse'
    },
    hour: { 
      isVoid: isVoidBranch(dayStem, dayBranch, chart.hour.branch.index),
      impact: 'Children, legacy, creativity, later life'
    }
  };
}

module.exports = {
  getVoidStars,
  isVoidBranch,
  analyzeVoidStarsInChart
};
