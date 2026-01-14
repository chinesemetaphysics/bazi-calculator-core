/**
 * BaZi Calculator - Flying Stars Calculator (飛星)
 * Calculates Annual, Monthly, Daily, and Hourly Flying Stars
 * 
 * Flying Star Feng Shui (玄空飛星) uses the Lo Shu magic square
 * with stars "flying" according to specific patterns.
 * 
 * Version: 9.0 - Algorithmic Edition
 */

// ==============================================
// LO SHU CONFIGURATION
// ==============================================

const LOSHU_POSITIONS = ['SE', 'S', 'SW', 'E', 'Center', 'W', 'NE', 'N', 'NW'];
const LOSHU_BASE = [4, 9, 2, 3, 5, 7, 8, 1, 6];

// Flying sequence (forward): Center → NW → W → NE → S → N → SW → E → SE
const FORWARD_SEQUENCE = [4, 8, 7, 6, 1, 0, 2, 3, 5];
// Flying sequence (reverse): Center → SE → E → SW → N → S → NE → W → NW
const REVERSE_SEQUENCE = [4, 5, 3, 2, 0, 1, 6, 7, 8];

// ==============================================
// FLYING STAR CHART GENERATION
// ==============================================

/**
 * Generate Flying Star chart from center star
 * Uses Lo Shu transformation formula
 * @param {number} centerStar - Center star (1-9)
 * @returns {Object} Direction -> Star number mapping
 */
function generateFlyingStarChart(centerStar) {
    const chart = {};
    
    // Calculate offset from base Lo Shu (center = 5)
    const offset = centerStar - 5;
    
    // Apply offset to each position
    for (let i = 0; i < 9; i++) {
        const position = LOSHU_POSITIONS[i];
        let starValue = LOSHU_BASE[i] + offset;
        
        // Wrap around 1-9 (not 0-8)
        while (starValue < 1) starValue += 9;
        while (starValue > 9) starValue -= 9;
        
        chart[position] = starValue;
    }
    
    return chart;
}

// ==============================================
// ANNUAL FLYING STARS
// ==============================================

/**
 * Calculate Annual Flying Star Chart
 * 
 * The annual center star follows a 9-year descending cycle:
 * - Period 8 (2004-2023): Star 8 is most auspicious
 * - Period 9 (2024-2043): Star 9 becomes most auspicious
 * 
 * Reference: 2017 Center = 1, 2018 = 9, 2019 = 8, ... 2026 = 1
 * Formula: Center = (1 - (year - 2017)) mod 9, where 0 → 9
 * 
 * @param {number} year - Gregorian year
 * @param {number} month - Month (for Li Chun adjustment)
 * @param {number} day - Day (for Li Chun adjustment)
 * @returns {Object} Flying star chart
 */
function calculateAnnualFlyingStars(year, month, day) {
    // Adjust for Li Chun (Chinese new year ~Feb 4)
    let fsYear = year;
    
    // Get Li Chun date
    let liChunMonth = 2, liChunDay = 4;
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            liChunMonth = liChun.month;
            liChunDay = liChun.day;
        } catch (e) {}
    }
    
    if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
        fsYear = year - 1;
    }
    
    // Calculate center star using 9-year descending cycle
    // 2017 = 1, 2018 = 9, 2019 = 8, etc.
    const diff = fsYear - 2017;
    let centerStar = ((1 - diff) % 9 + 9) % 9;
    if (centerStar === 0) centerStar = 9;
    
    return generateFlyingStarChart(centerStar);
}

/**
 * Get the annual center star for a year
 * @param {number} year 
 * @returns {number} Center star (1-9)
 */
function getAnnualCenterStar(year) {
    const diff = year - 2017;
    let centerStar = ((1 - diff) % 9 + 9) % 9;
    return centerStar === 0 ? 9 : centerStar;
}

// ==============================================
// MONTHLY FLYING STARS
// ==============================================

/**
 * Calculate Monthly Flying Star Chart
 * 
 * Monthly stars follow a pattern based on the year's center star:
 * - Years with center 1, 4, 7: February (寅月) starts with 8
 * - Years with center 2, 5, 8: February (寅月) starts with 5
 * - Years with center 3, 6, 9: February (寅月) starts with 2
 * 
 * Each subsequent month descends by 1 (Yang year) or ascends (Yin)
 * 
 * @param {number} year - Gregorian year
 * @param {number} month - Gregorian month (1-12)
 * @param {number} day - Day
 * @returns {Object} Flying star chart
 */
function calculateMonthlyFlyingStars(year, month, day) {
    // Get annual center star
    const annualCenter = getAnnualCenterStar(year);
    
    // Determine monthly starting star based on annual center
    let monthlyStartStar;
    if ([1, 4, 7].includes(annualCenter)) {
        monthlyStartStar = 8;
    } else if ([2, 5, 8].includes(annualCenter)) {
        monthlyStartStar = 5;
    } else {
        monthlyStartStar = 2;
    }
    
    // Get solar month index
    let solarMonthIndex = 0;
    if (typeof getSolarMonthForDate === 'function') {
        const solarInfo = getSolarMonthForDate(year, month, day);
        solarMonthIndex = solarInfo.solarMonthIndex;
    } else {
        // Approximate
        solarMonthIndex = (month + 9) % 12; // Convert to 寅月 = 0
    }
    
    // Calculate center star (descending each month)
    let monthlyCenterStar = monthlyStartStar - solarMonthIndex;
    while (monthlyCenterStar < 1) monthlyCenterStar += 9;
    
    return generateFlyingStarChart(monthlyCenterStar);
}

// ==============================================
// DAILY FLYING STARS
// ==============================================

/**
 * Calculate Daily Flying Star Chart
 * 
 * Daily stars are based on the 60 Jiazi cycle divided into three Yuan:
 * - Upper Yuan (上元): Jiazi 1-20, descending from star 1
 * - Middle Yuan (中元): Jiazi 21-40, descending from star 4 (or 7)
 * - Lower Yuan (下元): Jiazi 41-60, descending from star 7 (or 4)
 * 
 * Yang days use forward flight, Yin days use reverse flight.
 * 
 * @param {number} year - Year
 * @param {number} month - Month
 * @param {number} day - Day
 * @returns {Object} Flying star chart with metadata
 */
function calculateDailyFlyingStars(year, month, day) {
    // Get day pillar to determine Jiazi index
    let jiaziIndex = 0;
    if (typeof calculateDayPillar === 'function') {
        const dayPillar = calculateDayPillar(year, month, day);
        jiaziIndex = dayPillar.jiaziIndex;
    } else {
        // Calculate directly
        const refDate = Date.UTC(1923, 11, 17);
        const targetDate = Date.UTC(year, month - 1, day);
        const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
        jiaziIndex = ((daysDiff % 60) + 60) % 60;
    }
    
    // Determine Yuan and calculate daily center star
    // Traditional method: 9-day cycles within each 20-day Yuan
    let centerStar;
    const yuanPosition = jiaziIndex % 60;
    const cycleInYuan = yuanPosition % 9; // Position within 9-day cycle
    
    if (yuanPosition < 20) {
        // Upper Yuan - starts at 1, descends (1, 9, 8, 7, 6, 5, 4, 3, 2)
        centerStar = ((1 - cycleInYuan) % 9 + 9) % 9;
        if (centerStar === 0) centerStar = 9;
    } else if (yuanPosition < 40) {
        // Middle Yuan - starts at 4, descends (4, 3, 2, 1, 9, 8, 7, 6, 5)
        centerStar = ((4 - cycleInYuan) % 9 + 9) % 9;
        if (centerStar === 0) centerStar = 9;
    } else {
        // Lower Yuan - starts at 7, descends (7, 6, 5, 4, 3, 2, 1, 9, 8)
        centerStar = ((7 - cycleInYuan) % 9 + 9) % 9;
        if (centerStar === 0) centerStar = 9;
    }
    
    const chart = generateFlyingStarChart(centerStar);
    
    return {
        chart,
        centerStar,
        jiaziIndex,
        yuan: yuanPosition < 20 ? 'Upper' : yuanPosition < 40 ? 'Middle' : 'Lower'
    };
}

// ==============================================
// HOURLY FLYING STARS
// ==============================================

/**
 * Calculate Hourly Flying Star Chart
 * 
 * Hourly stars are based on the daily center star and shift each Chinese hour.
 * Yang days (odd stem index) use forward flight.
 * Yin days (even stem index) use reverse flight.
 * 
 * @param {number} year - Year
 * @param {number} month - Month
 * @param {number} day - Day
 * @param {number} hour - Hour (0-23)
 * @param {number} minute - Minute (0-59)
 * @returns {Object} Hourly flying star data
 */
function calculateHourlyFlyingStars(year, month, day, hour, minute) {
    // Get daily flying star data
    const dailyData = calculateDailyFlyingStars(year, month, day);
    const dailyCenter = dailyData.centerStar;
    
    // Get day stem to determine Yang/Yin
    let dayStemIndex = 0;
    if (typeof calculateDayPillar === 'function') {
        const dayPillar = calculateDayPillar(year, month, day);
        dayStemIndex = dayPillar.stemIndex;
    } else {
        dayStemIndex = dailyData.jiaziIndex % 10;
    }
    
    // Determine Chinese hour index (0-11)
    const totalMinutes = hour * 60 + minute;
    let hourBranchIndex;
    
    if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) hourBranchIndex = 0;      // 子
    else if (totalMinutes < 3 * 60) hourBranchIndex = 1;   // 丑
    else if (totalMinutes < 5 * 60) hourBranchIndex = 2;   // 寅
    else if (totalMinutes < 7 * 60) hourBranchIndex = 3;   // 卯
    else if (totalMinutes < 9 * 60) hourBranchIndex = 4;   // 辰
    else if (totalMinutes < 11 * 60) hourBranchIndex = 5;  // 巳
    else if (totalMinutes < 13 * 60) hourBranchIndex = 6;  // 午
    else if (totalMinutes < 15 * 60) hourBranchIndex = 7;  // 未
    else if (totalMinutes < 17 * 60) hourBranchIndex = 8;  // 申
    else if (totalMinutes < 19 * 60) hourBranchIndex = 9;  // 酉
    else if (totalMinutes < 21 * 60) hourBranchIndex = 10; // 戌
    else hourBranchIndex = 11; // 亥
    
    // Yang/Yin day determines flight direction
    const isYangDay = dayStemIndex % 2 === 0; // 甲丙戊庚壬 = Yang
    
    // Calculate hourly center star
    let hourlyCenterStar;
    if (isYangDay) {
        // Forward flight
        hourlyCenterStar = dailyCenter + hourBranchIndex;
    } else {
        // Reverse flight
        hourlyCenterStar = dailyCenter - hourBranchIndex;
    }
    
    // Normalize to 1-9
    hourlyCenterStar = ((hourlyCenterStar - 1) % 9 + 9) % 9 + 1;
    
    const chart = generateFlyingStarChart(hourlyCenterStar);
    
    // Hour data
    const HOUR_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const HOUR_PINYIN = ['Zǐ', 'Chǒu', 'Yín', 'Mǎo', 'Chén', 'Sì', 'Wǔ', 'Wèi', 'Shēn', 'Yǒu', 'Xū', 'Hài'];
    const TIME_RANGES = [
        '23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00',
        '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00',
        '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'
    ];
    
    return {
        chart,
        centerStar: hourlyCenterStar,
        hourBranchIndex,
        hourName: HOUR_NAMES[hourBranchIndex],
        hourPinyin: HOUR_PINYIN[hourBranchIndex],
        timeRange: TIME_RANGES[hourBranchIndex],
        isYangDay,
        flightDirection: isYangDay ? 'Forward (順飛)' : 'Reverse (逆飛)'
    };
}

/**
 * Get all 12 hourly flying star charts for a day
 * @param {number} year 
 * @param {number} month 
 * @param {number} day 
 * @returns {Array} Array of hourly data
 */
function getAllHourlyStars(year, month, day) {
    const hours = [];
    const testHours = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];
    
    for (let i = 0; i < 12; i++) {
        const hourData = calculateHourlyFlyingStars(year, month, day, testHours[i], 0);
        hours.push({
            ...hourData,
            index: i
        });
    }
    
    return hours;
}

// ==============================================
// ANNUAL AFFLICTIONS
// ==============================================

/**
 * Calculate Annual Afflictions based on the year branch
 * 
 * Afflictions:
 * - Tai Sui (太歲): Grand Duke Jupiter - do not face/disturb
 * - Sui Po (歲破): Year Breaker - opposite of Tai Sui
 * - Wu Huang (五黃): Five Yellow - from flying stars
 * - San Sha (三煞): Three Killings - based on year element frame
 * 
 * @param {number} year - Gregorian year
 * @param {number} month - Month
 * @param {number} day - Day
 * @returns {Object} Affliction locations
 */
function getAnnualAfflictions(year, month, day) {
    // Adjust for Li Chun
    let affYear = year;
    let liChunMonth = 2, liChunDay = 4;
    if (typeof getLiChunDate === 'function') {
        try {
            const liChun = getLiChunDate(year);
            liChunMonth = liChun.month;
            liChunDay = liChun.day;
        } catch (e) {}
    }
    
    if (month < liChunMonth || (month === liChunMonth && day < liChunDay)) {
        affYear = year - 1;
    }
    
    // Year branch index
    const branchIndex = ((affYear - 4) % 12 + 12) % 12;
    
    // Tai Sui directions by branch
    const TAI_SUI_DIRECTIONS = {
        0: 'N',   // Rat
        1: 'NE',  // Ox (shared with Tiger)
        2: 'NE',  // Tiger
        3: 'E',   // Rabbit
        4: 'SE',  // Dragon (shared with Snake)
        5: 'SE',  // Snake
        6: 'S',   // Horse
        7: 'SW',  // Goat (shared with Monkey)
        8: 'SW',  // Monkey
        9: 'W',   // Rooster
        10: 'NW', // Dog (shared with Pig)
        11: 'NW'  // Pig
    };
    
    // San Sha based on year element frame
    // Fire frame (Yin-Wu-Xu: Tiger-Horse-Dog): N
    // Wood frame (Hai-Mao-Wei: Pig-Rabbit-Goat): W
    // Water frame (Shen-Zi-Chen: Monkey-Rat-Dragon): S
    // Metal frame (Si-You-Chou: Snake-Rooster-Ox): E
    const SAN_SHA_MAP = {
        0: 'S',   // Rat - Water frame
        1: 'E',   // Ox - Metal frame
        2: 'N',   // Tiger - Fire frame
        3: 'W',   // Rabbit - Wood frame
        4: 'S',   // Dragon - Water frame
        5: 'E',   // Snake - Metal frame
        6: 'N',   // Horse - Fire frame
        7: 'W',   // Goat - Wood frame
        8: 'S',   // Monkey - Water frame
        9: 'E',   // Rooster - Metal frame
        10: 'N',  // Dog - Fire frame
        11: 'W'   // Pig - Wood frame
    };
    
    const OPPOSITE = {
        'N': 'S', 'S': 'N', 'E': 'W', 'W': 'E',
        'NE': 'SW', 'SW': 'NE', 'NW': 'SE', 'SE': 'NW'
    };
    
    const taiSuiDir = TAI_SUI_DIRECTIONS[branchIndex];
    const suiPoDir = OPPOSITE[taiSuiDir];
    const sanShaDir = SAN_SHA_MAP[branchIndex];
    
    // Wu Huang from annual flying stars
    const annualStars = calculateAnnualFlyingStars(year, month, day);
    let wuHuangDir = 'Center';
    for (let dir in annualStars) {
        if (annualStars[dir] === 5) {
            wuHuangDir = dir;
            break;
        }
    }
    
    // Animal names
    const ANIMALS = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
                     'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
    
    return {
        taiSui: {
            direction: taiSuiDir,
            icon: '⚠️',
            name: 'Tai Sui',
            chinese: '太歲',
            description: 'Grand Duke Jupiter - Do not face or disturb'
        },
        suiPo: {
            direction: suiPoDir,
            icon: '🔄',
            name: 'Sui Po',
            chinese: '歲破',
            description: 'Year Breaker - Avoid major renovations'
        },
        wuHuang: {
            direction: wuHuangDir,
            icon: '🚫',
            name: 'Wu Huang',
            chinese: '五黃',
            description: 'Five Yellow - Most malevolent, requires metal cure'
        },
        sanSha: {
            direction: sanShaDir,
            icon: '⛔',
            name: 'San Sha',
            chinese: '三煞',
            description: 'Three Killings - Never sit with back to this direction',
            frame: getSanShaFrame(sanShaDir)
        },
        yearAnimal: ANIMALS[branchIndex],
        yearBranch: branchIndex
    };
}

/**
 * Get San Sha extended frame (affects 3 mountains)
 * @param {string} mainDir - Main direction
 * @returns {Array} All affected directions
 */
function getSanShaFrame(mainDir) {
    const frames = {
        'N': ['N', 'NE', 'NW'],
        'S': ['S', 'SE', 'SW'],
        'E': ['E', 'NE', 'SE'],
        'W': ['W', 'NW', 'SW']
    };
    return frames[mainDir] || [mainDir];
}

// ==============================================
// STAR ANALYSIS HELPERS
// ==============================================

/**
 * Get star nature classification
 * @param {number} star - Star number (1-9)
 * @returns {string} 'auspicious', 'inauspicious', or 'neutral'
 */
function getStarNature(star) {
    const auspicious = [1, 6, 8, 9];
    const inauspicious = [2, 5, 7];
    const neutral = [3, 4];
    
    if (auspicious.includes(star)) return 'auspicious';
    if (inauspicious.includes(star)) return 'inauspicious';
    return 'neutral';
}

/**
 * Find best direction for a given chart
 * @param {Object} chart - Flying star chart
 * @param {Array} excludeDirections - Directions to exclude (afflicted)
 * @returns {Object} Best direction data
 */
function findBestDirection(chart, excludeDirections = []) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const auspiciousStars = [8, 9, 1, 6]; // In order of current period importance
    
    for (let star of auspiciousStars) {
        for (let dir of directions) {
            if (chart[dir] === star && !excludeDirections.includes(dir)) {
                return {
                    direction: dir,
                    star: star,
                    nature: 'auspicious'
                };
            }
        }
    }
    
    // If no auspicious found, return least harmful
    return {
        direction: directions.find(d => !excludeDirections.includes(d) && [3, 4].includes(chart[d])) || 'Center',
        star: chart['Center'],
        nature: 'neutral'
    };
}

// ==============================================
// VALIDATION
// ==============================================

function validateFlyingStars() {
    const tests = [];
    
    // Test: 2026 center = 1
    const stars2026 = calculateAnnualFlyingStars(2026, 3, 1);
    tests.push({
        name: 'Flying Star: 2026 Center = 1',
        pass: stars2026['Center'] === 1,
        expected: 1,
        actual: stars2026['Center']
    });
    
    // Test: 2026 Wu Huang = South
    let wuHuangDir = Object.keys(stars2026).find(k => stars2026[k] === 5);
    tests.push({
        name: 'Flying Star: 2026 五黃 = South',
        pass: wuHuangDir === 'S',
        expected: 'S',
        actual: wuHuangDir
    });
    
    // Test: 2026 (Horse year) Tai Sui = S
    const aff2026 = getAnnualAfflictions(2026, 3, 1);
    tests.push({
        name: 'Affliction: 2026 太歲 = South',
        pass: aff2026.taiSui.direction === 'S',
        expected: 'S',
        actual: aff2026.taiSui.direction
    });
    
    // Test: 2026 San Sha = North
    tests.push({
        name: 'Affliction: 2026 三煞 = North',
        pass: aff2026.sanSha.direction === 'N',
        expected: 'N',
        actual: aff2026.sanSha.direction
    });
    
    return tests;
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        generateFlyingStarChart,
        calculateAnnualFlyingStars,
        calculateMonthlyFlyingStars,
        calculateDailyFlyingStars,
        calculateHourlyFlyingStars,
        getAllHourlyStars,
        getAnnualAfflictions,
        getSanShaFrame,
        getStarNature,
        findBestDirection,
        getAnnualCenterStar,
        validateFlyingStars
    };
}
