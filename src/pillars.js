/**
 * BaZi Calculator - Four Pillars Calculator
 * Contains all pillar calculation functions with verified algorithms
 * 
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  Version: 9.0.1 - KUA FORMULA FIXED                             ║
 * ╠══════════════════════════════════════════════════════════════════╣
 * ║  REFERENCE POINTS - DO NOT MODIFY:                              ║
 * ║  - December 17, 1923 = 甲子 (Jia Zi) Day Pillar                 ║
 * ║  - Validated against historical figures (Jobs, Gates, etc.)       ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// ==============================================
// DAY PILLAR CALCULATION
// ==============================================

/**
 * Calculate Day Pillar using the verified reference point
 * December 17, 1923 = 甲子 (Jia Zi, index 0)
 */
function calculateDayPillar(year, month, day) {
    const refDate = Date.UTC(1923, 11, 17);
    const targetDate = Date.UTC(year, month - 1, day);
    const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
    const jiaziIndex = ((daysDiff % 60) + 60) % 60;

    return {
        stemIndex: jiaziIndex % 10,
        branchIndex: jiaziIndex % 12,
        jiaziIndex: jiaziIndex
    };
}

// ==============================================
// YEAR PILLAR CALCULATION
// ==============================================

function calculateYearPillar(year, month, day, liChunDate = null) {
    let liChun = liChunDate;
    if (!liChun && typeof getLiChunDate === 'function') {
        const liChunData = getLiChunDate(year);
        liChun = { month: liChunData.month, day: liChunData.day };
    }
    if (!liChun) {
        liChun = { month: 2, day: 4 };
    }

    let adjustedYear = year;
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) {
        adjustedYear = year - 1;
    }

    const stemIndex = ((adjustedYear - 4) % 10 + 10) % 10;
    const branchIndex = ((adjustedYear - 4) % 12 + 12) % 12;

    return { stemIndex, branchIndex, adjustedYear, chineseYear: adjustedYear };
}

// ==============================================
// MONTH PILLAR CALCULATION
// ==============================================

function fallbackSolarMonth(year, month, day) {
    const jieApprox = [
        [2, 4], [3, 6], [4, 5], [5, 6], [6, 6], [7, 7],
        [8, 8], [9, 8], [10, 8], [11, 7], [12, 7], [1, 6]
    ];

    let solarMonthIndex = 11;

    if (month === 1) {
        solarMonthIndex = day >= jieApprox[11][1] ? 11 : 10;
    } else if (month === 2) {
        solarMonthIndex = day >= jieApprox[0][1] ? 0 : 11;
    } else {
        for (let i = 1; i < 11; i++) {
            if (month === jieApprox[i][0]) {
                solarMonthIndex = day >= jieApprox[i][1] ? i : i - 1;
                break;
            } else if (month > jieApprox[i][0] && month < jieApprox[i + 1][0]) {
                solarMonthIndex = i;
                break;
            }
        }
    }

    return { solarMonthIndex, monthBranch: (solarMonthIndex + 2) % 12 };
}

function getSolarMonthName(index) {
    const names = [
        '寅月 (Tiger)', '卯月 (Rabbit)', '辰月 (Dragon)', '巳月 (Snake)',
        '午月 (Horse)', '未月 (Goat)', '申月 (Monkey)', '酉月 (Rooster)',
        '戌月 (Dog)', '亥月 (Pig)', '子月 (Rat)', '丑月 (Ox)'
    ];
    return names[index] || '';
}

function calculateMonthPillar(year, month, day, yearStemIndex, solarMonthInfo = null) {
    let solarMonth = solarMonthInfo;
    if (!solarMonth && typeof getSolarMonthForDate === 'function') {
        solarMonth = getSolarMonthForDate(year, month, day);
    }
    if (!solarMonth) {
        solarMonth = fallbackSolarMonth(year, month, day);
    }

    const solarMonthIndex = solarMonth.solarMonthIndex;
    const monthBranchIndex = (solarMonthIndex + 2) % 12;
    const stemBaseMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
    const monthStemBase = stemBaseMap[yearStemIndex];
    const monthStemIndex = (monthStemBase + solarMonthIndex) % 10;

    return {
        stemIndex: monthStemIndex,
        branchIndex: monthBranchIndex,
        solarMonthIndex,
        solarMonthName: getSolarMonthName(solarMonthIndex)
    };
}

// ==============================================
// HOUR PILLAR CALCULATION
// ==============================================

function calculateHourPillar(hour, minute, dayStemIndex) {
    const totalMinutes = hour * 60 + minute;
    let hourBranchIndex;

    if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) hourBranchIndex = 0;
    else if (totalMinutes < 3 * 60) hourBranchIndex = 1;
    else if (totalMinutes < 5 * 60) hourBranchIndex = 2;
    else if (totalMinutes < 7 * 60) hourBranchIndex = 3;
    else if (totalMinutes < 9 * 60) hourBranchIndex = 4;
    else if (totalMinutes < 11 * 60) hourBranchIndex = 5;
    else if (totalMinutes < 13 * 60) hourBranchIndex = 6;
    else if (totalMinutes < 15 * 60) hourBranchIndex = 7;
    else if (totalMinutes < 17 * 60) hourBranchIndex = 8;
    else if (totalMinutes < 19 * 60) hourBranchIndex = 9;
    else if (totalMinutes < 21 * 60) hourBranchIndex = 10;
    else hourBranchIndex = 11;

    const stemBaseMap = [0, 2, 4, 6, 8, 0, 2, 4, 6, 8];
    const hourStemBase = stemBaseMap[dayStemIndex];
    const hourStemIndex = (hourStemBase + hourBranchIndex) % 10;

    const timeRanges = [
        '23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
        '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
        '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
    ];

    return {
        stemIndex: hourStemIndex,
        branchIndex: hourBranchIndex,
        timeRange: timeRanges[hourBranchIndex]
    };
}

// ==============================================
// KUA NUMBER CALCULATION
// ==============================================
// ╔════════════════════════════════════════════════════════════════════╗
// ║  ⚠️ PROTECTED - DO NOT MODIFY WITHOUT RUNNING VALIDATION TESTS    ║
// ║  Fixed v9.0.1 - Verified Kua formulas                             ║
// ║                                                                    ║
// ║  CORRECT FORMULAS:                                                 ║
// ║  • Pre-2000 Male:   10 - digit_sum                                ║
// ║  • Pre-2000 Female: digit_sum + 5                                 ║
// ║  • Post-2000 Male:  9 - digit_sum (if ≤0, add 9)                  ║
// ║  • Post-2000 Female: digit_sum + 6                                ║
// ║  • Kua 5: Males → 2, Females → 8                                  ║
// ╚════════════════════════════════════════════════════════════════════╝

function calculateKuaNumber(year, month, day, gender) {
    let calcYear = year;

    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  Li Chun (立春) is around February 3-5 each year                   ║
    // ║  Use getLiChunDate() for accurate date, fallback to Feb 4         ║
    // ╚════════════════════════════════════════════════════════════════════╝
    let liChunMonth = 2;
    let liChunDay = 4;

    // Get accurate Li Chun date if available
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            // Sanity check: Li Chun should always be in February
            if (liChun.month === 2 && liChun.day >= 3 && liChun.day <= 5) {
                liChunMonth = liChun.month;
                liChunDay = liChun.day;
            }
        } catch (e) {
            // Use default Feb 4
        }
    }

    // Chinese year starts at Li Chun, not Jan 1
    // If birth is before Li Chun, use previous year for Kua calculation
    if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
        calcYear = year - 1;
    }

    // Step 1: Take last two digits of the year
    const lastTwo = calcYear % 100;

    // Step 2: Sum digits until single digit (1-9)
    let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
    while (digitSum > 9) {
        digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
    }

    let kua;
    const isMale = gender === 'male';

    // Step 3: Apply gender and era-specific formula
    // ╔════════════════════════════════════════════════════════════════════╗
    // ║  VERIFIED FORMULAS:                                               ║
    // ║  Pre-2000 Male:   10 - digit_sum                                  ║
    // ║  Pre-2000 Female: digit_sum + 5                                   ║
    // ║  Post-2000 Male:  9 - digit_sum                                   ║
    // ║  Post-2000 Female: digit_sum + 6                                  ║
    // ╚════════════════════════════════════════════════════════════════════╝
    if (calcYear >= 2000) {
        // Post-2000 formula
        if (isMale) {
            kua = 9 - digitSum;
            if (kua <= 0) kua += 9;
        } else {
            kua = digitSum + 6;
            if (kua > 9) kua -= 9;
        }
    } else {
        // Pre-2000 formula
        if (isMale) {
            kua = 10 - digitSum;
            if (kua <= 0) kua += 9;
            if (kua > 9) kua -= 9;
        } else {
            kua = digitSum + 5;
            if (kua > 9) kua -= 9;
        }
    }

    // Step 4: Kua 5 does not exist in Eight Mansions
    if (kua === 5) kua = isMale ? 2 : 8;

    return kua;
}

// ==============================================
// COMPLETE BAZI CHART
// ==============================================

function calculateBaZiChart(year, month, day, hour = 12, minute = 0, gender = 'male') {
    let liChunDate = null;
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            liChunDate = { month: liChun.month, day: liChun.day };
        } catch (e) { }
    }

    const yearPillar = calculateYearPillar(year, month, day, liChunDate);
    const monthPillar = calculateMonthPillar(year, month, day, yearPillar.stemIndex);
    const dayPillar = calculateDayPillar(year, month, day);
    const hourPillar = calculateHourPillar(hour, minute, dayPillar.stemIndex);
    const kuaNumber = calculateKuaNumber(year, month, day, gender);

    return {
        year: yearPillar,
        month: monthPillar,
        day: dayPillar,
        hour: hourPillar,
        dayMaster: dayPillar.stemIndex,
        kuaNumber,
        gender,
        birthInfo: { year, month, day, hour, minute, chineseYear: yearPillar.adjustedYear }
    };
}

// ==============================================
// VALIDATION
// ==============================================

function validateCalculations() {
    const tests = [];

    // Day Pillar Tests
    const ref1 = calculateDayPillar(1923, 12, 17);
    tests.push({
        name: 'Day: Dec 17, 1923 = 甲子',
        pass: ref1.stemIndex === 0 && ref1.branchIndex === 0,
        expected: '甲子', actual: `Stem:${ref1.stemIndex} Branch:${ref1.branchIndex}`
    });

    const ref2 = calculateDayPillar(1954, 4, 7);
    tests.push({
        name: 'Day: Apr 7, 1954 = 癸巳 (Famous Actor)',
        pass: ref2.stemIndex === 9 && ref2.branchIndex === 5,
        expected: '癸巳', actual: `Stem:${ref2.stemIndex} Branch:${ref2.branchIndex}`
    });

    // Steve Jobs: Feb 24, 1955 = 丙辰 (Bing Chen) - Yang Fire Day Master
    const refJobs = calculateDayPillar(1955, 2, 24);
    tests.push({
        name: 'Day: Feb 24, 1955 = 丙辰 (Steve Jobs)',
        pass: refJobs.stemIndex === 2 && refJobs.branchIndex === 4,
        expected: '丙辰', actual: `Stem:${refJobs.stemIndex} Branch:${refJobs.branchIndex}`
    });

    // Bill Gates: Oct 28, 1955 = 壬戌 (Ren Xu) - Yang Water Day Master
    const refGates = calculateDayPillar(1955, 10, 28);
    tests.push({
        name: 'Day: Oct 28, 1955 = 壬戌 (Bill Gates)',
        pass: refGates.stemIndex === 8 && refGates.branchIndex === 10,
        expected: '壬戌', actual: `Stem:${refGates.stemIndex} Branch:${refGates.branchIndex}`
    });

    // ═══════════════════════════════════════════════════════════════
    // KUA TESTS - MALE (Pre-2000): Formula = 10 - digit_sum
    // ═══════════════════════════════════════════════════════════════
    tests.push({
        name: 'Kua: 1960 Male = 4 ★PRIMARY TEST★',
        pass: calculateKuaNumber(1960, 6, 15, 'male') === 4,
        expected: 4, actual: calculateKuaNumber(1960, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 1954 Male = 1 (Jackie Chan)',
        pass: calculateKuaNumber(1954, 4, 7, 'male') === 1,
        expected: 1, actual: calculateKuaNumber(1954, 4, 7, 'male')
    });

    tests.push({
        name: 'Kua: 1879 Male = 3 (Historical Figure)',
        pass: calculateKuaNumber(1879, 3, 14, 'male') === 3,
        expected: 3, actual: calculateKuaNumber(1879, 3, 14, 'male')
    });

    tests.push({
        name: 'Kua: 1974 Male = 8',
        pass: calculateKuaNumber(1974, 6, 15, 'male') === 8,
        expected: 8, actual: calculateKuaNumber(1974, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 1985 Male = 6',
        pass: calculateKuaNumber(1985, 6, 15, 'male') === 6,
        expected: 6, actual: calculateKuaNumber(1985, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 1950 Male = 2 (5→2)',
        pass: calculateKuaNumber(1950, 6, 15, 'male') === 2,
        expected: 2, actual: calculateKuaNumber(1950, 6, 15, 'male')
    });

    // ═══════════════════════════════════════════════════════════════
    // KUA TESTS - FEMALE (Pre-2000): Formula = digit_sum + 5
    // ═══════════════════════════════════════════════════════════════
    tests.push({
        name: 'Kua: 1960 Female = 2',
        pass: calculateKuaNumber(1960, 6, 15, 'female') === 2,
        expected: 2, actual: calculateKuaNumber(1960, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 1985 Female = 9',
        pass: calculateKuaNumber(1985, 6, 15, 'female') === 9,
        expected: 9, actual: calculateKuaNumber(1985, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 1990 Female = 8 (5→8)',
        pass: calculateKuaNumber(1990, 6, 15, 'female') === 8,
        expected: 8, actual: calculateKuaNumber(1990, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 1969 Female = 2',
        pass: calculateKuaNumber(1969, 6, 15, 'female') === 2,
        expected: 2, actual: calculateKuaNumber(1969, 6, 15, 'female')
    });

    // ═══════════════════════════════════════════════════════════════
    // KUA TESTS - POST-2000
    // ═══════════════════════════════════════════════════════════════
    tests.push({
        name: 'Kua: 2012 Male = 6',
        pass: calculateKuaNumber(2012, 8, 31, 'male') === 6,
        expected: 6, actual: calculateKuaNumber(2012, 8, 31, 'male')
    });

    tests.push({
        name: 'Kua: 2000 Male = 9',
        pass: calculateKuaNumber(2000, 6, 15, 'male') === 9,
        expected: 9, actual: calculateKuaNumber(2000, 6, 15, 'male')
    });

    tests.push({
        name: 'Kua: 2003 Female = 9',
        pass: calculateKuaNumber(2003, 6, 15, 'female') === 9,
        expected: 9, actual: calculateKuaNumber(2003, 6, 15, 'female')
    });

    tests.push({
        name: 'Kua: 2000 Female = 6',
        pass: calculateKuaNumber(2000, 6, 15, 'female') === 6,
        expected: 6, actual: calculateKuaNumber(2000, 6, 15, 'female')
    });

    return tests;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateDayPillar, calculateYearPillar, calculateMonthPillar,
        calculateHourPillar, calculateKuaNumber, calculateBaZiChart,
        validateCalculations, fallbackSolarMonth, getSolarMonthName
    };
}
