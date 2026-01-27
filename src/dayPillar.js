/**
 * BaZi Layer 0 - Day Pillar Calculator
 * Uses reference point: December 17, 1923 = 甲子 (Jia Zi, index 0)
 * VERIFIED against historical figures
 */

/**
 * Calculate Day Pillar from UTC date
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @returns {Object} { stemIndex, branchIndex }
 */
function calculateDayPillar(year, month, day) {
    // Reference: December 17, 1923 = 甲子 (Jia Zi, index 0)
    const refDate = Date.UTC(1923, 11, 17);
    const targetDate = Date.UTC(year, month - 1, day);

    const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
    const jiaziIndex = ((daysDiff % 60) + 60) % 60;

    return {
        stemIndex: jiaziIndex % 10,
        branchIndex: jiaziIndex % 12
    };
}

module.exports = {
    calculateDayPillar
};
