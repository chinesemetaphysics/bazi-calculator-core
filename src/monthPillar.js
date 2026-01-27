/**
 * BaZi Layer 0 - Month Pillar Calculator
 * Solar month boundaries determined by Jie (節) terms
 * Month stem calculated from year stem using fixed formula
 */

const { getSolarMonthForDate } = require('./solarTerms');

/**
 * Calculate Month Pillar
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @param {number} yearStemIndex - Year pillar stem index (0-9)
 * @returns {Object} { stemIndex, branchIndex, solarMonthIndex }
 */
function calculateMonthPillar(year, month, day, yearStemIndex) {
    // Get solar month from astronomical calculation
    const solarMonth = getSolarMonthForDate(year, month, day);
    const solarMonthIndex = solarMonth.solarMonthIndex;
    const monthBranchIndex = solarMonth.monthBranch;

    // Calculate month stem using year stem
    // Formula: Month stem base depends on year stem
    const stemBaseMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
    const monthStemBase = stemBaseMap[yearStemIndex];
    const monthStemIndex = (monthStemBase + solarMonthIndex) % 10;

    return {
        stemIndex: monthStemIndex,
        branchIndex: monthBranchIndex,
        solarMonthIndex
    };
}

module.exports = {
    calculateMonthPillar
};
