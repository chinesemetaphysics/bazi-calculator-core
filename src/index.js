/**
 * BaZi Layer 0 - Main Orchestrator
 * Pure calculation engine for Four Pillars
 * SSOT for all BaZi calculations
 */

const { calculateYearPillar } = require('./yearPillar');
const { calculateMonthPillar } = require('./monthPillar');
const { calculateDayPillar } = require('./dayPillar');
const { calculateHourPillar } = require('./hourPillar');
const { formatPillar, formatChinesePillar } = require('./formatters');
const { calculateLuckPillars } = require('./luckPillars');
const { HIDDEN_STEMS, getHiddenStems, getHiddenStemsForChart } = require('./constants');
const { selectUseGod, calculateDayMasterStrength, getSeasonalStrength, analyzeImbalances, SEASONAL_STRENGTH } = require('./useGod');
const { getVoidStars, isVoidBranch, analyzeVoidStarsInChart } = require('./voidStars');

/**
 * Parse timezone offset string to minutes
 * @param {string} timezone - Timezone string like "+08:00" or "-05:00"
 * @returns {number} Offset in minutes
 */
function parseTimezoneOffset(timezone) {
    if (!timezone) return 0;

    const match = timezone.match(/^([+-])(\d{2}):(\d{2})$/);
    if (!match) return 0;

    const sign = match[1] === '+' ? 1 : -1;
    const hours = parseInt(match[2], 10);
    const minutes = parseInt(match[3], 10);

    return sign * (hours * 60 + minutes);
}

/**
 * Convert birth time to UTC for calculation
 * @param {Object} birth - Birth data with timezone
 * @returns {Object} UTC normalized birth data
 */
function normalizeToUTC(birth) {
    const { year, month, day, hour, minute, timezone } = birth;

    // Parse timezone offset
    const offsetMinutes = parseTimezoneOffset(timezone);

    // Create a date in the local timezone
    const localDate = new Date(year, month - 1, day, hour, minute);

    // Subtract the offset to get UTC
    const utcDate = new Date(localDate.getTime() - offsetMinutes * 60 * 1000);

    return {
        year: utcDate.getFullYear(),
        month: utcDate.getMonth() + 1,
        day: utcDate.getDate(),
        hour: utcDate.getHours(),
        minute: utcDate.getMinutes()
    };
}

/**
 * Calculate Four Pillars (BaZi Chart)
 * @param {Object} birth - Birth data: { year, month, day, hour, minute, timezone }
 * @returns {Object} Four Pillars with formatted names
 */
function calculateBaZi(birth) {
    // BaZi uses LOCAL solar time, not UTC
    // Solar terms (Li Chun, etc.) occur at specific moments, but the
    // day/hour pillars are based on local observation
    const { year, month, day, hour, minute } = birth;

    // Calculate all pillars using local time
    const dayPillar = calculateDayPillar(year, month, day);
    const yearPillar = calculateYearPillar(year, month, day);
    const monthPillar = calculateMonthPillar(year, month, day, yearPillar.stemIndex);
    const hourPillar = calculateHourPillar(hour, minute, dayPillar.stemIndex);

    // Format output
    return {
        year_pillar: formatPillar(yearPillar.stemIndex, yearPillar.branchIndex),
        month_pillar: formatPillar(monthPillar.stemIndex, monthPillar.branchIndex),
        day_pillar: formatPillar(dayPillar.stemIndex, dayPillar.branchIndex),
        hour_pillar: formatPillar(hourPillar.stemIndex, hourPillar.branchIndex),

        // Include indices and Chinese for debugging/verification
        _debug: {
            year: {
                stem: yearPillar.stemIndex,
                branch: yearPillar.branchIndex,
                chinese: formatChinesePillar(yearPillar.stemIndex, yearPillar.branchIndex),
                adjustedYear: yearPillar.adjustedYear
            },
            month: {
                stem: monthPillar.stemIndex,
                branch: monthPillar.branchIndex,
                chinese: formatChinesePillar(monthPillar.stemIndex, monthPillar.branchIndex)
            },
            day: {
                stem: dayPillar.stemIndex,
                branch: dayPillar.branchIndex,
                chinese: formatChinesePillar(dayPillar.stemIndex, dayPillar.branchIndex)
            },
            hour: {
                stem: hourPillar.stemIndex,
                branch: hourPillar.branchIndex,
                chinese: formatChinesePillar(hourPillar.stemIndex, hourPillar.branchIndex)
            },
            input: { year, month, day, hour, minute }
        }
    };
}

module.exports = {
    calculateBaZi,
    calculateLuckPillars,
    HIDDEN_STEMS,
    getHiddenStems,
    getHiddenStemsForChart,
    selectUseGod,
    calculateDayMasterStrength,
    getSeasonalStrength,
    analyzeImbalances,
    SEASONAL_STRENGTH,
    getVoidStars,
    isVoidBranch,
    analyzeVoidStarsInChart
};
