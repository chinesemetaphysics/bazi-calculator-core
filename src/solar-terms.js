/**
 * BaZi Calculator - Solar Terms Astronomical Calculator
 * Calculates Solar Terms algorithmically using VSOP87 simplified formulas
 * Valid for years 1900-2100+ with high accuracy
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  SSOT (Single Source of Truth) for Solar Term Calculations      ║
 * ║  Version: 2.0.0                                                  ║
 * ║  All websites MUST use this file via core package               ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  v2.0.0: Fixed year boundary bug in findSolarLongitudeJD        ║
 * ║          Fixed date sorting bug in getSolarMonthForDate         ║
 * ║  v1.0.0: Initial VSOP87-based astronomical calculation          ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * This replaces the hardcoded SOLAR_TERMS lookup table with computed values.
 */

// ==============================================
// SOLAR TERMS DEFINITIONS (二十四節氣)
// ==============================================
const SOLAR_TERM_DATA = [
    // 節氣 (Jie) - Major Solar Terms (odd numbers, start of months)
    { index: 0, name: 'Li Chun', chinese: '立春', english: 'Beginning of Spring', longitude: 315 },
    { index: 2, name: 'Jing Zhe', chinese: '驚蟄', english: 'Awakening of Insects', longitude: 345 },
    { index: 4, name: 'Qing Ming', chinese: '清明', english: 'Clear and Bright', longitude: 15 },
    { index: 6, name: 'Li Xia', chinese: '立夏', english: 'Beginning of Summer', longitude: 45 },
    { index: 8, name: 'Mang Zhong', chinese: '芒種', english: 'Grain in Ear', longitude: 75 },
    { index: 10, name: 'Xiao Shu', chinese: '小暑', english: 'Minor Heat', longitude: 105 },
    { index: 12, name: 'Li Qiu', chinese: '立秋', english: 'Beginning of Autumn', longitude: 135 },
    { index: 14, name: 'Bai Lu', chinese: '白露', english: 'White Dew', longitude: 165 },
    { index: 16, name: 'Han Lu', chinese: '寒露', english: 'Cold Dew', longitude: 195 },
    { index: 18, name: 'Li Dong', chinese: '立冬', english: 'Beginning of Winter', longitude: 225 },
    { index: 20, name: 'Da Xue', chinese: '大雪', english: 'Major Snow', longitude: 255 },
    { index: 22, name: 'Xiao Han', chinese: '小寒', english: 'Minor Cold', longitude: 285 },
    // 中氣 (Qi) - Minor Solar Terms (even numbers)
    { index: 1, name: 'Yu Shui', chinese: '雨水', english: 'Rain Water', longitude: 330 },
    { index: 3, name: 'Chun Fen', chinese: '春分', english: 'Spring Equinox', longitude: 0 },
    { index: 5, name: 'Gu Yu', chinese: '穀雨', english: 'Grain Rain', longitude: 30 },
    { index: 7, name: 'Xiao Man', chinese: '小滿', english: 'Grain Full', longitude: 60 },
    { index: 9, name: 'Xia Zhi', chinese: '夏至', english: 'Summer Solstice', longitude: 90 },
    { index: 11, name: 'Da Shu', chinese: '大暑', english: 'Major Heat', longitude: 120 },
    { index: 13, name: 'Chu Shu', chinese: '處暑', english: 'End of Heat', longitude: 150 },
    { index: 15, name: 'Qiu Fen', chinese: '秋分', english: 'Autumn Equinox', longitude: 180 },
    { index: 17, name: 'Shuang Jiang', chinese: '霜降', english: 'Frost Descent', longitude: 210 },
    { index: 19, name: 'Xiao Xue', chinese: '小雪', english: 'Minor Snow', longitude: 240 },
    { index: 21, name: 'Dong Zhi', chinese: '冬至', english: 'Winter Solstice', longitude: 270 },
    { index: 23, name: 'Da Han', chinese: '大寒', english: 'Major Cold', longitude: 300 }
];

// Jie (節) terms that mark month boundaries for BaZi
// Index in SOLAR_TERM_DATA: 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22
const MONTH_BOUNDARY_TERMS = [
    { termIndex: 0, monthBranch: 2, name: 'Li Chun' },      // 立春 → 寅月 (Tiger)
    { termIndex: 2, monthBranch: 3, name: 'Jing Zhe' },     // 驚蟄 → 卯月 (Rabbit)
    { termIndex: 4, monthBranch: 4, name: 'Qing Ming' },    // 清明 → 辰月 (Dragon)
    { termIndex: 6, monthBranch: 5, name: 'Li Xia' },       // 立夏 → 巳月 (Snake)
    { termIndex: 8, monthBranch: 6, name: 'Mang Zhong' },   // 芒種 → 午月 (Horse)
    { termIndex: 10, monthBranch: 7, name: 'Xiao Shu' },    // 小暑 → 未月 (Goat)
    { termIndex: 12, monthBranch: 8, name: 'Li Qiu' },      // 立秋 → 申月 (Monkey)
    { termIndex: 14, monthBranch: 9, name: 'Bai Lu' },      // 白露 → 酉月 (Rooster)
    { termIndex: 16, monthBranch: 10, name: 'Han Lu' },     // 寒露 → 戌月 (Dog)
    { termIndex: 18, monthBranch: 11, name: 'Li Dong' },    // 立冬 → 亥月 (Pig)
    { termIndex: 20, monthBranch: 0, name: 'Da Xue' },      // 大雪 → 子月 (Rat)
    { termIndex: 22, monthBranch: 1, name: 'Xiao Han' }     // 小寒 → 丑月 (Ox)
];

// ==============================================
// JULIAN DAY CALCULATIONS
// ==============================================

/**
 * Convert Gregorian date to Julian Day Number
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day (can include decimal for time)
 * @returns {number} Julian Day Number
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
 * @param {number} JD - Julian Day Number
 * @returns {Object} { year, month, day, hour, minute }
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
    
    const day = B - D - Math.floor(30.6001 * E);
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;
    
    // Extract time from fractional day
    const dayFraction = F;
    const totalHours = dayFraction * 24;
    const hour = Math.floor(totalHours);
    const minute = Math.floor((totalHours - hour) * 60);
    
    return { 
        year, 
        month, 
        day: Math.floor(day), 
        hour, 
        minute,
        dayFraction: day - Math.floor(day)
    };
}

// ==============================================
// SOLAR LONGITUDE CALCULATION (VSOP87 Simplified)
// ==============================================

/**
 * Calculate apparent solar longitude for a given Julian Day
 * Based on simplified VSOP87 algorithm
 * Accuracy: ~0.01 degrees (sufficient for solar term calculation)
 * @param {number} JD - Julian Day Number
 * @returns {number} Solar longitude in degrees (0-360)
 */
function calculateSolarLongitude(JD) {
    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  FIXED: Corrected mean longitude coefficient                       ║
    // ║  Was: 360007.6982779 (WRONG - one extra zero!)                    ║
    // ║  Now: 36000.76983 (CORRECT)                                       ║
    // ╚════════════════════════════════════════════════════════════════════╝
    
    // Julian centuries from J2000.0 (Jan 1, 2000 12:00 TT)
    const T = (JD - 2451545.0) / 36525;
    const T2 = T * T;
    const T3 = T2 * T;
    
    // Mean longitude of the Sun (degrees)
    // L0 = 280.46646 + 36000.76983*T + 0.0003032*T²
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
    L0 = L0 % 360;
    if (L0 < 0) L0 += 360;
    
    // Mean anomaly of the Sun (degrees)
    // M = 357.52911 + 35999.05029*T - 0.0001537*T²
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
    
    // Apparent longitude (with nutation and aberration corrections)
    // Nutation: ~-0.00569° * sin(Ω)
    // Aberration: ~-0.00478°
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
 * ║  Previous bug: Autumn/winter longitudes would find prev year    ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * @param {number} year - Target Gregorian year
 * @param {number} targetLongitude - Solar longitude in degrees (0-360)
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

    // Get approximate month for this longitude (or estimate from longitude)
    let approxMonth = longitudeToMonth[targetLongitude];
    if (approxMonth === undefined) {
        // For non-standard longitudes, estimate from the value
        // Longitude 0° ~ Mar 20, increases ~30° per month
        if (targetLongitude <= 180) {
            approxMonth = Math.floor(3 + targetLongitude / 30) % 12 || 12;
        } else {
            approxMonth = Math.floor(3 + (targetLongitude - 360) / 30 + 12) % 12 || 12;
        }
    }
    
    // Start from the middle of the approximate month
    let JD = gregorianToJulianDay(year, approxMonth, 15);

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
    if (result.year !== year) {
        const yearDiff = year - result.year;
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

// ==============================================
// SOLAR TERM DATE CALCULATION
// ==============================================

/**
 * Calculate the date of a specific solar term for a given year
 * @param {number} year - Gregorian year
 * @param {number} termIndex - Solar term index (0-23)
 * @returns {Object} { year, month, day, hour, minute, term }
 */
function calculateSolarTermDate(year, termIndex) {
    const term = SOLAR_TERM_DATA.find(t => t.index === termIndex);
    if (!term) {
        throw new Error(`Invalid term index: ${termIndex}`);
    }
    
    // Adjust year for terms after winter solstice
    let calcYear = year;
    if (termIndex >= 22) {
        // Xiao Han and Da Han are in January of the following year
        // But we calculate them for the Chinese year that starts at Li Chun
    }
    
    const JD = findSolarLongitudeJD(calcYear, term.longitude);
    const date = julianDayToGregorian(JD);
    
    return {
        ...date,
        term: term,
        julianDay: JD
    };
}

/**
 * Get all 12 Jie (節) dates for a year (month boundary terms)
 * @param {number} year - Gregorian year
 * @returns {Array} Array of term dates with metadata
 */
function getYearSolarTerms(year) {
    const terms = [];
    
    // Calculate all 12 Jie terms
    for (let i = 0; i < 12; i++) {
        const termIndex = i * 2; // Jie terms are at even indices (0, 2, 4, ...)
        const date = calculateSolarTermDate(year, termIndex);
        terms.push({
            ...date,
            solarMonthIndex: i, // 0 = 寅月, 1 = 卯月, etc.
            monthBranch: (i + 2) % 12
        });
    }
    
    return terms;
}

/**
 * Get the Li Chun date for a specific year
 * @param {number} year - Gregorian year
 * @returns {Object} Date object for Li Chun
 */
function getLiChunDate(year) {
    return calculateSolarTermDate(year, 0);
}

/**
 * Find which solar month a given date falls into
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  FIXED v2.0.0: Sort terms by actual date (JD), not by index     ║
 * ║  Previous bug: Ox (Jan) at end of array but occurs before Sep   ║
 * ╚══════════════════════════════════════════════════════════════════╝
 * 
 * @param {number} year - Gregorian year
 * @param {number} month - Gregorian month (1-12)
 * @param {number} day - Day of month
 * @returns {Object} { solarMonthIndex, monthBranch, currentTerm, termDate }
 */
function getSolarMonthForDate(year, month, day) {
    // Get terms for current year and previous year
    const currentYearTerms = getYearSolarTerms(year);
    const prevYearTerms = getYearSolarTerms(year - 1);
    
    // Combine all terms (terms already contain their correct year from calculation)
    const allTerms = [
        ...prevYearTerms,
        ...currentYearTerms
    ];
    
    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  FIX: Sort terms by Julian Day (actual chronological order)       ║
    // ║  This ensures Jan (Ox) comes before Sep (Rooster) in the search   ║
    // ╚════════════════════════════════════════════════════════════════════╝
    allTerms.sort((a, b) => {
        const jdA = gregorianToJulianDay(a.year, a.month, a.day);
        const jdB = gregorianToJulianDay(b.year, b.month, b.day);
        return jdA - jdB;
    });
    
    // Convert target date to comparable value
    const targetJD = gregorianToJulianDay(year, month, day);
    
    // Find which term period the date falls into (search backwards through sorted list)
    for (let i = allTerms.length - 1; i >= 0; i--) {
        const term = allTerms[i];
        const termJD = gregorianToJulianDay(term.year, term.month, term.day);
        
        if (targetJD >= termJD) {
            return {
                solarMonthIndex: term.solarMonthIndex,
                monthBranch: term.monthBranch,
                currentTerm: term,
                termDate: { year: term.year, month: term.month, day: term.day }
            };
        }
    }
    
    // Fallback (shouldn't reach here)
    return {
        solarMonthIndex: 10, // 子月
        monthBranch: 0
    };
}

// ==============================================
// CACHE FOR PERFORMANCE
// ==============================================
const solarTermCache = new Map();

/**
 * Get cached solar terms for a year
 * @param {number} year 
 * @returns {Array}
 */
function getCachedSolarTerms(year) {
    if (!solarTermCache.has(year)) {
        solarTermCache.set(year, getYearSolarTerms(year));
    }
    return solarTermCache.get(year);
}

/**
 * Clear the cache (useful if memory is a concern)
 */
function clearSolarTermCache() {
    solarTermCache.clear();
}

// ==============================================
// LEGACY COMPATIBILITY - Generate lookup table format
// ==============================================

/**
 * Generate SOLAR_TERMS lookup table in the old format for backward compatibility
 * Format: { year: [[m,d], [m,d], ...12 entries...] }
 * @param {number} startYear 
 * @param {number} endYear 
 * @returns {Object}
 */
function generateSolarTermsTable(startYear, endYear) {
    const table = {};
    
    for (let year = startYear; year <= endYear; year++) {
        const terms = getCachedSolarTerms(year);
        table[year] = terms.map(t => [t.month, t.day]);
    }
    
    return table;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SOLAR_TERM_DATA,
        MONTH_BOUNDARY_TERMS,
        gregorianToJulianDay,
        julianDayToGregorian,
        calculateSolarLongitude,
        findSolarLongitudeJD,
        calculateSolarTermDate,
        getYearSolarTerms,
        getLiChunDate,
        getSolarMonthForDate,
        getCachedSolarTerms,
        clearSolarTermCache,
        generateSolarTermsTable
    };
}
