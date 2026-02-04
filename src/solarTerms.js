/**
 * BaZi Layer 0 - Solar Terms Calculator
 * Astronomical calculation of solar longitude and Jie (節) terms
 * Based on VSOP87 simplified formulas
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  SSOT: This file should mirror core/src/solar-terms.js          ║
 * ║  Any fixes here must be propagated to core                      ║
 * ║  Version: 2.0.0 - Fixed year boundary bug                       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

/**
 * Convert Gregorian date to Julian Day Number
 */
function gregorianToJulianDay(year, month, day) {
    if (month <= 2) {
        year -= 1;
        month += 12;
    }

    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);

    return Math.floor(365.25 * (year + 4716)) +
           Math.floor(30.6001 * (month + 1)) +
           day + B - 1524.5;
}

/**
 * Convert Julian Day Number to Gregorian date
 */
function julianDayToGregorian(JD) {
    const Z = Math.floor(JD + 0.5);
    const F = JD + 0.5 - Z;

    let A;
    if (Z < 2299161) {
        A = Z;
    } else {
        const alpha = Math.floor((Z - 1867216.25) / 36524.25);
        A = Z + 1 + alpha - Math.floor(alpha / 4);
    }

    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);

    const dayWithFraction = B - D - Math.floor(30.6001 * E);
    const day = Math.floor(dayWithFraction);
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;

    // Extract hour and minute from the fractional part of the day
    const dayFraction = dayWithFraction - day;
    const totalMinutes = dayFraction * 24 * 60;
    const hour = Math.floor(totalMinutes / 60);
    const minute = Math.floor(totalMinutes % 60);

    return { year, month, day, hour, minute };
}

/**
 * Calculate apparent solar longitude using VSOP87
 * @param {number} JD - Julian Day Number
 * @returns {number} Solar longitude in degrees (0-360)
 */
function calculateSolarLongitude(JD) {
    // Julian centuries from J2000.0
    const T = (JD - 2451545.0) / 36525;
    const T2 = T * T;

    // Mean longitude of the Sun (degrees)
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
    L0 = L0 % 360;
    if (L0 < 0) L0 += 360;

    // Mean anomaly of the Sun (degrees)
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T2;
    M = M % 360;
    if (M < 0) M += 360;
    const Mrad = M * Math.PI / 180;

    // Equation of center (degrees)
    const C = (1.914602 - 0.004817 * T - 0.000014 * T2) * Math.sin(Mrad)
            + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad)
            + 0.000289 * Math.sin(3 * Mrad);

    // Sun's true longitude
    let sunLong = L0 + C;

    // Mean longitude of ascending node of Moon (for nutation)
    let Omega = 125.04 - 1934.136 * T;
    const OmegaRad = (Omega % 360) * Math.PI / 180;

    // Apparent longitude (with nutation and aberration)
    let apparentLong = sunLong - 0.00569 - 0.00478 * Math.sin(OmegaRad);

    // Normalize to 0-360
    apparentLong = apparentLong % 360;
    if (apparentLong < 0) apparentLong += 360;

    return apparentLong;
}

/**
 * Find the exact Julian Day when the Sun reaches a specific longitude
 * Uses Newton-Raphson iteration with proper year targeting
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FIXED v2.0.0: Properly calculates initial estimate based on    ║
 * ║  the approximate month when each longitude occurs               ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * @param {number} year - Target Gregorian year
 * @param {number} targetLongitude - Solar longitude in degrees
 * @returns {number} Julian Day Number
 */
function findSolarLongitudeJD(year, targetLongitude) {
    const avgDailyMotion = 360 / 365.25; // ~0.9856 degrees per day

    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  FIX: Map each solar longitude to its approximate month           ║
    // ║  This ensures we start searching in the correct part of the year  ║
    // ╚════════════════════════════════════════════════════════════════════╝
    
    // Approximate month for each Jie term longitude:
    // 315° = Feb (Li Chun), 345° = Mar, 15° = Apr, 45° = May, 75° = Jun,
    // 105° = Jul, 135° = Aug, 165° = Sep, 195° = Oct, 225° = Nov, 255° = Dec, 285° = Jan
    const longitudeToMonth = {
        315: 2,   // Li Chun ~ Feb 4
        345: 3,   // Jing Zhe ~ Mar 6
        15: 4,    // Qing Ming ~ Apr 5
        45: 5,    // Li Xia ~ May 6
        75: 6,    // Mang Zhong ~ Jun 6
        105: 7,   // Xiao Shu ~ Jul 7
        135: 8,   // Li Qiu ~ Aug 8
        165: 9,   // Bai Lu ~ Sep 8
        195: 10,  // Han Lu ~ Oct 8
        225: 11,  // Li Dong ~ Nov 7
        255: 12,  // Da Xue ~ Dec 7
        285: 1    // Xiao Han ~ Jan 6
    };

    // Get approximate month for this longitude
    const approxMonth = longitudeToMonth[targetLongitude];
    let searchYear = year;
    
    // For January term (Xiao Han, 285°), it occurs in the NEXT Gregorian year
    // relative to the Chinese year that starts at Li Chun
    // But for getYearSolarTerms(year), we want Jan of THAT year
    // No adjustment needed - searchYear stays as year
    
    // Start from the middle of the approximate month
    let JD = gregorianToJulianDay(searchYear, approxMonth, 15);

    // Newton-Raphson iteration for precision
    for (let i = 0; i < 50; i++) {
        const currentLong = calculateSolarLongitude(JD);
        let diff = targetLongitude - currentLong;

        // Handle wrap-around at 0/360 boundary
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;

        // Check convergence (< 0.00001° is ~1 second accuracy)
        if (Math.abs(diff) < 0.00001) break;

        // Adjust JD based on how far off we are
        JD += diff / avgDailyMotion;
    }

    // Verify result is in the expected year (within reasonable bounds)
    const result = julianDayToGregorian(JD);
    
    // If we somehow got the wrong year, adjust and re-search
    if (result.year !== searchYear) {
        // This shouldn't happen with the fixed initial estimate, but safety check
        const yearDiff = searchYear - result.year;
        JD += yearDiff * 365.25;
        
        // Re-iterate to refine
        for (let i = 0; i < 20; i++) {
            const currentLong = calculateSolarLongitude(JD);
            let diff = targetLongitude - currentLong;
            if (diff > 180) diff -= 360;
            if (diff < -180) diff += 360;
            if (Math.abs(diff) < 0.00001) break;
            JD += diff / avgDailyMotion;
        }
    }

    return JD;
}

/**
 * Calculate Li Chun date for a given year
 * Li Chun = Solar Longitude 315°
 * @param {number} year - Gregorian year
 * @returns {Object} { year, month, day }
 */
function getLiChunDate(year) {
    const JD = findSolarLongitudeJD(year, 315);
    return julianDayToGregorian(JD);
}

/**
 * Get all 12 solar month boundaries (Jie terms) for a Gregorian year
 * Returns the Jie terms that occur within the given Gregorian year
 * 
 * Solar months and their starting Jie terms:
 * - 寅月 (Tiger): Li Chun 立春 315° ~ Feb
 * - 卯月 (Rabbit): Jing Zhe 驚蟄 345° ~ Mar
 * - 辰月 (Dragon): Qing Ming 清明 15° ~ Apr
 * - 巳月 (Snake): Li Xia 立夏 45° ~ May
 * - 午月 (Horse): Mang Zhong 芒種 75° ~ Jun
 * - 未月 (Goat): Xiao Shu 小暑 105° ~ Jul
 * - 申月 (Monkey): Li Qiu 立秋 135° ~ Aug
 * - 酉月 (Rooster): Bai Lu 白露 165° ~ Sep
 * - 戌月 (Dog): Han Lu 寒露 195° ~ Oct
 * - 亥月 (Pig): Li Dong 立冬 225° ~ Nov
 * - 子月 (Rat): Da Xue 大雪 255° ~ Dec
 * - 丑月 (Ox): Xiao Han 小寒 285° ~ Jan (next year)
 */
function getYearSolarTerms(year) {
    const jieTermLongitudes = [315, 345, 15, 45, 75, 105, 135, 165, 195, 225, 255, 285];
    const terms = [];

    for (let i = 0; i < 12; i++) {
        const longitude = jieTermLongitudes[i];
        const JD = findSolarLongitudeJD(year, longitude);
        const date = julianDayToGregorian(JD);

        terms.push({
            ...date,
            solarMonthIndex: i, // 0 = 寅月 (Tiger), 1 = 卯月 (Rabbit), etc.
            monthBranch: (i + 2) % 12,
            longitude
        });
    }

    return terms;
}

/**
 * Find which solar month a given date falls into
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @param {number} hour - Hour (0-23), default 0
 * @param {number} minute - Minute (0-59), default 0
 * @returns {Object} { solarMonthIndex, monthBranch }
 */
function getSolarMonthForDate(year, month, day, hour = 0, minute = 0) {
    // Get terms for current year and previous year
    const currentYearTerms = getYearSolarTerms(year);
    const prevYearTerms = getYearSolarTerms(year - 1);

    // Create timeline of all relevant terms, sorted by date
    const allTerms = [
        ...prevYearTerms,
        ...currentYearTerms
    ].sort((a, b) => {
        // Include time-of-day in Julian Day calculation for precise comparison
        const jdA = gregorianToJulianDay(a.year, a.month, a.day) + (a.hour * 60 + a.minute) / 1440;
        const jdB = gregorianToJulianDay(b.year, b.month, b.day) + (b.hour * 60 + b.minute) / 1440;
        return jdA - jdB;
    });

    // Convert target datetime to Julian Day with time precision
    // 1440 = minutes in a day (24 * 60)
    const targetJD = gregorianToJulianDay(year, month, day) + (hour * 60 + minute) / 1440;

    // Find which term period the date falls into (search backwards)
    for (let i = allTerms.length - 1; i >= 0; i--) {
        const term = allTerms[i];
        // Include time-of-day precision for term boundary
        const termJD = gregorianToJulianDay(term.year, term.month, term.day) +
                       (term.hour * 60 + term.minute) / 1440;

        if (targetJD >= termJD) {
            return {
                solarMonthIndex: term.solarMonthIndex,
                monthBranch: term.monthBranch
            };
        }
    }

    // Fallback (shouldn't reach here)
    return {
        solarMonthIndex: 10,
        monthBranch: 0
    };
}

module.exports = {
    getLiChunDate,
    getYearSolarTerms,
    getSolarMonthForDate,
    gregorianToJulianDay,
    julianDayToGregorian,
    calculateSolarLongitude,
    findSolarLongitudeJD
};
