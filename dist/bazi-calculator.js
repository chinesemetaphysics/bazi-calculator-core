/**
 * BaZi Calculator Core v3.6.0
 * https://github.com/chinesemetaphysics/bazi-calculator-core
 *
 * Core calculation engine for Four Pillars (BaZi) analysis
 * SSOT for TheArties applications
 */
(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        // CommonJS (Node.js)
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD
        define([], factory);
    } else {
        // Browser global
        global.BaZiCalculator = factory();
    }
})(typeof window !== 'undefined' ? window : this, function () {
    'use strict';

    // ============================================
    // CONSTANTS
    // ============================================
    /**
 * BaZi Layer 0 - Constants
 * Minimal constants required for Four Pillars calculation
 * SSOT for Heavenly Stems and Earthly Branches
 */

// Heavenly Stems (天干) - 10 stems
const HEAVENLY_STEMS = [
    { index: 0, chinese: '甲', english: 'Yang-Wood', element: 'wood', polarity: 'yang' },
    { index: 1, chinese: '乙', english: 'Yin-Wood', element: 'wood', polarity: 'yin' },
    { index: 2, chinese: '丙', english: 'Yang-Fire', element: 'fire', polarity: 'yang' },
    { index: 3, chinese: '丁', english: 'Yin-Fire', element: 'fire', polarity: 'yin' },
    { index: 4, chinese: '戊', english: 'Yang-Earth', element: 'earth', polarity: 'yang' },
    { index: 5, chinese: '己', english: 'Yin-Earth', element: 'earth', polarity: 'yin' },
    { index: 6, chinese: '庚', english: 'Yang-Metal', element: 'metal', polarity: 'yang' },
    { index: 7, chinese: '辛', english: 'Yin-Metal', element: 'metal', polarity: 'yin' },
    { index: 8, chinese: '壬', english: 'Yang-Water', element: 'water', polarity: 'yang' },
    { index: 9, chinese: '癸', english: 'Yin-Water', element: 'water', polarity: 'yin' }
];

// Earthly Branches (地支) - 12 branches / Chinese Zodiac
const EARTHLY_BRANCHES = [
    { index: 0, chinese: '子', english: 'Rat', element: 'water', polarity: 'yang' },
    { index: 1, chinese: '丑', english: 'Ox', element: 'earth', polarity: 'yin' },
    { index: 2, chinese: '寅', english: 'Tiger', element: 'wood', polarity: 'yang' },
    { index: 3, chinese: '卯', english: 'Rabbit', element: 'wood', polarity: 'yin' },
    { index: 4, chinese: '辰', english: 'Dragon', element: 'earth', polarity: 'yang' },
    { index: 5, chinese: '巳', english: 'Snake', element: 'fire', polarity: 'yin' },
    { index: 6, chinese: '午', english: 'Horse', element: 'fire', polarity: 'yang' },
    { index: 7, chinese: '未', english: 'Goat', element: 'earth', polarity: 'yin' },
    { index: 8, chinese: '申', english: 'Monkey', element: 'metal', polarity: 'yang' },
    { index: 9, chinese: '酉', english: 'Rooster', element: 'metal', polarity: 'yin' },
    { index: 10, chinese: '戌', english: 'Dog', element: 'earth', polarity: 'yang' },
    { index: 11, chinese: '亥', english: 'Pig', element: 'water', polarity: 'yin' }
];

    // ============================================
    // SOLAR TERMS
    // ============================================
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

    // ============================================
    // DAY PILLAR
    // ============================================
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

    // ============================================
    // YEAR PILLAR
    // ============================================
    /**
 * BaZi Layer 0 - Year Pillar Calculator
 * Year boundary = Li Chun (立春) at solar longitude 315°
 * RULE: If birth is before Li Chun, use previous year
 */



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

    // ============================================
    // MONTH PILLAR
    // ============================================
    /**
 * BaZi Layer 0 - Month Pillar Calculator
 * Solar month boundaries determined by Jie (節) terms
 * Month stem calculated from year stem using fixed formula
 */



/**
 * Calculate Month Pillar
 * @param {number} year - Gregorian year
 * @param {number} month - Month (1-12)
 * @param {number} day - Day
 * @param {number} yearStemIndex - Year pillar stem index (0-9)
 * @param {number} hour - Hour (0-23), default 0
 * @param {number} minute - Minute (0-59), default 0
 * @returns {Object} { stemIndex, branchIndex, solarMonthIndex }
 */
function calculateMonthPillar(year, month, day, yearStemIndex, hour = 0, minute = 0) {
    // Get solar month from astronomical calculation with time-of-day precision
    const solarMonth = getSolarMonthForDate(year, month, day, hour, minute);
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

    // ============================================
    // HOUR PILLAR
    // ============================================
    /**
 * BaZi Layer 0 - Hour Pillar Calculator
 * Hour branch determined by time of day (2-hour periods)
 * Hour stem calculated from day stem using fixed formula
 */

/**
 * Calculate Hour Pillar from time and day stem.
 *
 * IMPORTANT: For late Zi hour (23:00-23:59), the CALLER must pass
 * the NEXT day's stem as dayStemIndex, not the current day's stem.
 * This is the traditional rule where the day changes at 23:00.
 *
 * Example:
 *   Birth: 2025-02-03 23:30
 *   Day pillar for 2025-02-03 → Jia Zi (stem index 0)
 *   Day pillar for 2025-02-04 → Yi Chou (stem index 1)
 *   For hour pillar calculation: Pass stem index 1 (next day's stem)
 *
 * The function itself treats 23:00-23:59 and 00:00-00:59 uniformly
 * as Zi hour (branch 0). The distinction between "late Zi" and "early Zi"
 * must be handled by the caller through the dayStemIndex parameter.
 *
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @param {number} dayStemIndex - Day pillar stem index (0-9), use NEXT day's stem for 23:00-23:59
 * @returns {Object} { stemIndex, branchIndex }
 */
function calculateHourPillar(hour, minute, dayStemIndex) {
    const totalMinutes = hour * 60 + minute;

    // Determine hour branch based on time
    let hourBranchIndex;
    if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) hourBranchIndex = 0;   // 子 Rat (23:00-01:00)
    else if (totalMinutes < 3 * 60) hourBranchIndex = 1;   // 丑 Ox (01:00-03:00)
    else if (totalMinutes < 5 * 60) hourBranchIndex = 2;   // 寅 Tiger (03:00-05:00)
    else if (totalMinutes < 7 * 60) hourBranchIndex = 3;   // 卯 Rabbit (05:00-07:00)
    else if (totalMinutes < 9 * 60) hourBranchIndex = 4;   // 辰 Dragon (07:00-09:00)
    else if (totalMinutes < 11 * 60) hourBranchIndex = 5;  // 巳 Snake (09:00-11:00)
    else if (totalMinutes < 13 * 60) hourBranchIndex = 6;  // 午 Horse (11:00-13:00)
    else if (totalMinutes < 15 * 60) hourBranchIndex = 7;  // 未 Goat (13:00-15:00)
    else if (totalMinutes < 17 * 60) hourBranchIndex = 8;  // 申 Monkey (15:00-17:00)
    else if (totalMinutes < 19 * 60) hourBranchIndex = 9;  // 酉 Rooster (17:00-19:00)
    else if (totalMinutes < 21 * 60) hourBranchIndex = 10; // 戌 Dog (19:00-21:00)
    else hourBranchIndex = 11;                             // 亥 Pig (21:00-23:00)

    // Calculate hour stem from day stem
    const stemBaseMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
    const hourStemBase = stemBaseMap[dayStemIndex];
    const hourStemIndex = (hourStemBase + hourBranchIndex) % 10;

    return {
        stemIndex: hourStemIndex,
        branchIndex: hourBranchIndex
    };
}

    // ============================================
    // FORMATTERS
    // ============================================
    /**
 * BaZi Layer 0 - Formatters
 * Convert stem/branch indices to readable pillar names
 * Output format: "Yang-Wood Rat", "Yin-Fire Rabbit", etc.
 */



/**
 * Format a pillar as "Stem Branch" (e.g., "Yang-Wood Rat")
 * @param {number} stemIndex - Stem index (0-9)
 * @param {number} branchIndex - Branch index (0-11)
 * @returns {string} Formatted pillar name
 */
function formatPillar(stemIndex, branchIndex) {
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];

    if (!stem || !branch) {
        throw new Error(`Invalid indices: stem=${stemIndex}, branch=${branchIndex}`);
    }

    return `${stem.english} ${branch.english}`;
}

/**
 * Format Chinese pillar (e.g., "甲子")
 * @param {number} stemIndex - Stem index (0-9)
 * @param {number} branchIndex - Branch index (0-11)
 * @returns {string} Chinese pillar
 */
function formatChinesePillar(stemIndex, branchIndex) {
    const stem = HEAVENLY_STEMS[stemIndex];
    const branch = EARTHLY_BRANCHES[branchIndex];

    if (!stem || !branch) {
        throw new Error(`Invalid indices: stem=${stemIndex}, branch=${branchIndex}`);
    }

    return `${stem.chinese}${branch.chinese}`;
}

    // ============================================
    // MAIN CALCULATOR
    // ============================================
    /**
 * BaZi Layer 0 - Main Orchestrator
 * Pure calculation engine for Four Pillars
 * SSOT for all BaZi calculations
 */







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

    // Apply timezone normalization if provided
    // This converts the input time to UTC, which can then be adjusted for local solar time
    let calcTime = { year: birth.year, month: birth.month, day: birth.day, hour: birth.hour, minute: birth.minute };
    if (birth.timezone) {
        calcTime = normalizeToUTC(birth);
    }

    const { year, month, day, hour, minute } = calcTime;

    // Calculate all pillars using normalized time with hour-minute precision
    const dayPillar = calculateDayPillar(year, month, day);
    const yearPillar = calculateYearPillar(year, month, day);
    const monthPillar = calculateMonthPillar(year, month, day, yearPillar.stemIndex, hour, minute);
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

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        // Main calculation function
        calculateBaZi: calculateBaZi,
        
        // Individual pillar functions
        calculateYearPillar: calculateYearPillar,
        calculateMonthPillar: calculateMonthPillar,
        calculateDayPillar: calculateDayPillar,
        calculateHourPillar: calculateHourPillar,
        
        // Solar terms
        getYearSolarTerms: getYearSolarTerms,
        getLiChunDate: getLiChunDate,
        getSolarMonthForDate: getSolarMonthForDate,
        
        // Formatters
        formatPillar: formatPillar,
        formatChinesePillar: formatChinesePillar,
        
        // Constants
        HEAVENLY_STEMS: HEAVENLY_STEMS,
        EARTHLY_BRANCHES: EARTHLY_BRANCHES,
        
        // Version
        version: '3.6.0'
    };
});
