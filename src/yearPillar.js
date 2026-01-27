/**
 * BaZi Layer 0 - Year Pillar Calculator
 * Year boundary = Li Chun (立春) at solar longitude 315°
 * RULE: If birth is before Li Chun, use previous year
 */

const { getLiChunDate } = require('./solarTerms');

/**
 * Calculate Year Pillar
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} { stemIndex, branchIndex, adjustedYear }
 */
function calculateYearPillar(year, month, day) {
    // Get Li Chun date for the year
    const liChun = getLiChunDate(year);

    // Determine adjusted year based on Li Chun boundary
    let adjustedYear = year;
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) {
        adjustedYear = year - 1;
    }

    // Calculate stem and branch indices
    // Formula based on year 4 CE = 甲子 (stem 0, branch 0)
    const stemIndex = ((adjustedYear - 4) % 10 + 10) % 10;
    const branchIndex = ((adjustedYear - 4) % 12 + 12) % 12;

    return {
        stemIndex,
        branchIndex,
        adjustedYear
    };
}

module.exports = {
    calculateYearPillar
};
