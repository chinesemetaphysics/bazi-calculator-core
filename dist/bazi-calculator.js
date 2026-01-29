/**
 * BaZi Calculator Core v3.0.1
 * https://github.com/chinesemetaphysics/bazi-calculator-core
 *
 * Complete SSOT for Chinese Metaphysics calculations
 * Includes: Four Pillars, Kua Number, Flying Stars (Annual, Daily, Hourly), Afflictions, Direction Analysis
 */

// ==============================================
// CONSTANTS
// ==============================================

const HEAVENLY_STEMS = [
    { index: 0, chinese: '甲', pinyin: 'Jiǎ', english: 'Yang Wood', element: 'wood', polarity: 'yang' },
    { index: 1, chinese: '乙', pinyin: 'Yǐ', english: 'Yin Wood', element: 'wood', polarity: 'yin' },
    { index: 2, chinese: '丙', pinyin: 'Bǐng', english: 'Yang Fire', element: 'fire', polarity: 'yang' },
    { index: 3, chinese: '丁', pinyin: 'Dīng', english: 'Yin Fire', element: 'fire', polarity: 'yin' },
    { index: 4, chinese: '戊', pinyin: 'Wù', english: 'Yang Earth', element: 'earth', polarity: 'yang' },
    { index: 5, chinese: '己', pinyin: 'Jǐ', english: 'Yin Earth', element: 'earth', polarity: 'yin' },
    { index: 6, chinese: '庚', pinyin: 'Gēng', english: 'Yang Metal', element: 'metal', polarity: 'yang' },
    { index: 7, chinese: '辛', pinyin: 'Xīn', english: 'Yin Metal', element: 'metal', polarity: 'yin' },
    { index: 8, chinese: '壬', pinyin: 'Rén', english: 'Yang Water', element: 'water', polarity: 'yang' },
    { index: 9, chinese: '癸', pinyin: 'Guǐ', english: 'Yin Water', element: 'water', polarity: 'yin' }
];

const EARTHLY_BRANCHES = [
    { index: 0, chinese: '子', pinyin: 'Zǐ', animal: 'Rat', element: 'water', polarity: 'yang', hours: '23:00-01:00', direction: 'N', hiddenStems: ['癸'] },
    { index: 1, chinese: '丑', pinyin: 'Chǒu', animal: 'Ox', element: 'earth', polarity: 'yin', hours: '01:00-03:00', direction: 'NE', hiddenStems: ['己', '癸', '辛'] },
    { index: 2, chinese: '寅', pinyin: 'Yín', animal: 'Tiger', element: 'wood', polarity: 'yang', hours: '03:00-05:00', direction: 'NE', hiddenStems: ['甲', '丙', '戊'] },
    { index: 3, chinese: '卯', pinyin: 'Mǎo', animal: 'Rabbit', element: 'wood', polarity: 'yin', hours: '05:00-07:00', direction: 'E', hiddenStems: ['乙'] },
    { index: 4, chinese: '辰', pinyin: 'Chén', animal: 'Dragon', element: 'earth', polarity: 'yang', hours: '07:00-09:00', direction: 'SE', hiddenStems: ['戊', '乙', '癸'] },
    { index: 5, chinese: '巳', pinyin: 'Sì', animal: 'Snake', element: 'fire', polarity: 'yin', hours: '09:00-11:00', direction: 'SE', hiddenStems: ['丙', '戊', '庚'] },
    { index: 6, chinese: '午', pinyin: 'Wǔ', animal: 'Horse', element: 'fire', polarity: 'yang', hours: '11:00-13:00', direction: 'S', hiddenStems: ['丁', '己'] },
    { index: 7, chinese: '未', pinyin: 'Wèi', animal: 'Goat', element: 'earth', polarity: 'yin', hours: '13:00-15:00', direction: 'SW', hiddenStems: ['己', '丁', '乙'] },
    { index: 8, chinese: '申', pinyin: 'Shēn', animal: 'Monkey', element: 'metal', polarity: 'yang', hours: '15:00-17:00', direction: 'SW', hiddenStems: ['庚', '壬', '戊'] },
    { index: 9, chinese: '酉', pinyin: 'Yǒu', animal: 'Rooster', element: 'metal', polarity: 'yin', hours: '17:00-19:00', direction: 'W', hiddenStems: ['辛'] },
    { index: 10, chinese: '戌', pinyin: 'Xū', animal: 'Dog', element: 'earth', polarity: 'yang', hours: '19:00-21:00', direction: 'NW', hiddenStems: ['戊', '辛', '丁'] },
    { index: 11, chinese: '亥', pinyin: 'Hài', animal: 'Pig', element: 'water', polarity: 'yin', hours: '21:00-23:00', direction: 'NW', hiddenStems: ['壬', '甲'] }
];

const FIVE_ELEMENTS = {
    wood: { chinese: '木', english: 'Wood', color: '#22c55e', produces: 'fire', controls: 'earth', weakens: 'water', controlledBy: 'metal' },
    fire: { chinese: '火', english: 'Fire', color: '#ef4444', produces: 'earth', controls: 'metal', weakens: 'wood', controlledBy: 'water' },
    earth: { chinese: '土', english: 'Earth', color: '#eab308', produces: 'metal', controls: 'water', weakens: 'fire', controlledBy: 'wood' },
    metal: { chinese: '金', english: 'Metal', color: '#94a3b8', produces: 'water', controls: 'wood', weakens: 'earth', controlledBy: 'fire' },
    water: { chinese: '水', english: 'Water', color: '#3b82f6', produces: 'wood', controls: 'fire', weakens: 'metal', controlledBy: 'earth' }
};

const FLYING_STARS = {
    1: { name: 'White', chinese: '一白', chineseName: '貪狼', english: 'Greedy Wolf', element: 'water', nature: 'auspicious', meaning: 'Career, Wisdom, Nobility' },
    2: { name: 'Black', chinese: '二黑', chineseName: '巨門', english: 'Giant Gate', element: 'earth', nature: 'inauspicious', meaning: 'Sickness, Illness' },
    3: { name: 'Jade', chinese: '三碧', chineseName: '祿存', english: 'Salary Preserved', element: 'wood', nature: 'neutral', meaning: 'Arguments, Legal Issues' },
    4: { name: 'Green', chinese: '四綠', chineseName: '文曲', english: 'Literary Arts', element: 'wood', nature: 'neutral', meaning: 'Romance, Academic Success' },
    5: { name: 'Yellow', chinese: '五黃', chineseName: '廉貞', english: 'Incorruptible', element: 'earth', nature: 'inauspicious', meaning: 'Misfortune - MOST MALEVOLENT' },
    6: { name: 'White', chinese: '六白', chineseName: '武曲', english: 'Military Arts', element: 'metal', nature: 'auspicious', meaning: 'Authority, Mentor Luck' },
    7: { name: 'Red', chinese: '七赤', chineseName: '破軍', english: 'Army Breaker', element: 'metal', nature: 'inauspicious', meaning: 'Robbery, Injury, Betrayal' },
    8: { name: 'White', chinese: '八白', chineseName: '左輔', english: 'Left Assistant', element: 'earth', nature: 'auspicious', meaning: 'Wealth, Prosperity' },
    9: { name: 'Purple', chinese: '九紫', chineseName: '右弼', english: 'Right Assistant', element: 'fire', nature: 'auspicious', meaning: 'Celebration, Recognition' }
};

const LOSHU_POSITIONS = ['SE', 'S', 'SW', 'E', 'Center', 'W', 'NE', 'N', 'NW'];
const LOSHU_BASE = [4, 9, 2, 3, 5, 7, 8, 1, 6];

const DIRECTION_ELEMENTS = {
    'N': 'water', 'S': 'fire', 'E': 'wood', 'W': 'metal',
    'NE': 'earth', 'NW': 'metal', 'SE': 'wood', 'SW': 'earth', 'Center': 'earth'
};

const DIRECTION_NAMES = {
    'N': { english: 'North', chinese: '北' },
    'S': { english: 'South', chinese: '南' },
    'E': { english: 'East', chinese: '東' },
    'W': { english: 'West', chinese: '西' },
    'NE': { english: 'Northeast', chinese: '東北' },
    'NW': { english: 'Northwest', chinese: '西北' },
    'SE': { english: 'Southeast', chinese: '東南' },
    'SW': { english: 'Southwest', chinese: '西南' },
    'Center': { english: 'Center', chinese: '中' }
};

const EIGHT_MANSIONS = {
    1: { group: 'East', favorable: { 'SE': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'E': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'S': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'N': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'W': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'NE': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'NW': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'SW': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } },
    2: { group: 'West', favorable: { 'NE': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'W': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'NW': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'SW': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'E': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'SE': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'S': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'N': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } },
    3: { group: 'East', favorable: { 'S': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'N': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'SE': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'E': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'SW': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'NW': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'NE': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'W': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } },
    4: { group: 'East', favorable: { 'N': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'S': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'E': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'SE': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'NW': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'SW': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'W': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'NE': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } },
    6: { group: 'West', favorable: { 'W': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'NE': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'SW': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'NW': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'SE': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'E': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'N': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'S': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } },
    7: { group: 'West', favorable: { 'NW': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'SW': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'NE': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'W': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'S': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'N': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'E': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'SE': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } },
    8: { group: 'West', favorable: { 'SW': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'NW': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'W': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'NE': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'N': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'S': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'SE': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'E': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } },
    9: { group: 'East', favorable: { 'E': { name: 'Sheng Qi', chinese: '生氣', meaning: 'Generating Breath', rank: 1 }, 'SE': { name: 'Tian Yi', chinese: '天醫', meaning: 'Heavenly Doctor', rank: 2 }, 'N': { name: 'Yan Nian', chinese: '延年', meaning: 'Longevity', rank: 3 }, 'S': { name: 'Fu Wei', chinese: '伏位', meaning: 'Stability', rank: 4 } }, unfavorable: { 'NE': { name: 'Huo Hai', chinese: '禍害', meaning: 'Mishap', rank: 5 }, 'W': { name: 'Wu Gui', chinese: '五鬼', meaning: 'Five Ghosts', rank: 6 }, 'SW': { name: 'Liu Sha', chinese: '六煞', meaning: 'Six Killings', rank: 7 }, 'NW': { name: 'Jue Ming', chinese: '絕命', meaning: 'Total Loss', rank: 8 } } }
};

// ==============================================
// SOLAR TERMS CALCULATION
// ==============================================

function gregorianToJulianDay(year, month, day) {
    if (month <= 2) { year -= 1; month += 12; }
    const A = Math.floor(year / 100);
    const B = 2 - A + Math.floor(A / 4);
    return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}

function julianDayToGregorian(JD) {
    const Z = Math.floor(JD + 0.5);
    const F = JD + 0.5 - Z;
    let A = Z < 2299161 ? Z : Z + 1 + Math.floor((Z - 1867216.25) / 36524.25) - Math.floor(Math.floor((Z - 1867216.25) / 36524.25) / 4);
    const B = A + 1524;
    const C = Math.floor((B - 122.1) / 365.25);
    const D = Math.floor(365.25 * C);
    const E = Math.floor((B - D) / 30.6001);
    const day = B - D - Math.floor(30.6001 * E);
    const month = E < 14 ? E - 1 : E - 13;
    const year = month > 2 ? C - 4716 : C - 4715;
    return { year, month, day: Math.floor(day) };
}

function calculateSolarLongitude(JD) {
    const T = (JD - 2451545.0) / 36525;
    const T2 = T * T;
    let L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T2;
    L0 = ((L0 % 360) + 360) % 360;
    let M = 357.52911 + 35999.05029 * T - 0.0001537 * T2;
    M = ((M % 360) + 360) % 360;
    const Mrad = M * Math.PI / 180;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T2) * Math.sin(Mrad) + (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) + 0.000289 * Math.sin(3 * Mrad);
    let sunLong = L0 + C;
    const Omega = 125.04 - 1934.136 * T;
    let apparentLong = sunLong - 0.00569 - 0.00478 * Math.sin((Omega % 360) * Math.PI / 180);
    return ((apparentLong % 360) + 360) % 360;
}

function findSolarLongitudeJD(year, targetLongitude) {
    const avgDailyMotion = 360 / 365.25;
    let daysFromEquinox = targetLongitude <= 180 ? targetLongitude / avgDailyMotion : (targetLongitude - 360) / avgDailyMotion;
    let JD = gregorianToJulianDay(year, 1, 1) + 79 + daysFromEquinox - 1;
    for (let i = 0; i < 50; i++) {
        const currentLong = calculateSolarLongitude(JD);
        let diff = targetLongitude - currentLong;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        if (Math.abs(diff) < 0.00001) break;
        JD += diff / avgDailyMotion;
    }
    return JD;
}

function getLiChunDate(year) {
    const JD = findSolarLongitudeJD(year, 315);
    return julianDayToGregorian(JD);
}

function getYearSolarTerms(year) {
    const jieTermLongitudes = [315, 345, 15, 45, 75, 105, 135, 165, 195, 225, 255, 285];
    return jieTermLongitudes.map((longitude, i) => {
        const JD = findSolarLongitudeJD(year, longitude);
        const date = julianDayToGregorian(JD);
        return { ...date, solarMonthIndex: i, monthBranch: (i + 2) % 12, longitude };
    });
}

function getSolarMonthForDate(year, month, day) {
    const currentYearTerms = getYearSolarTerms(year);
    const prevYearTerms = getYearSolarTerms(year - 1);
    const allTerms = [...prevYearTerms, ...currentYearTerms].sort((a, b) => gregorianToJulianDay(a.year, a.month, a.day) - gregorianToJulianDay(b.year, b.month, b.day));
    const targetJD = gregorianToJulianDay(year, month, day);
    for (let i = allTerms.length - 1; i >= 0; i--) {
        if (targetJD >= gregorianToJulianDay(allTerms[i].year, allTerms[i].month, allTerms[i].day)) {
            return { solarMonthIndex: allTerms[i].solarMonthIndex, monthBranch: allTerms[i].monthBranch };
        }
    }
    return { solarMonthIndex: 10, monthBranch: 0 };
}

// ==============================================
// PILLAR CALCULATIONS
// ==============================================

function calculateDayPillar(year, month, day) {
    const refDate = Date.UTC(1923, 11, 17);
    const targetDate = Date.UTC(year, month - 1, day);
    const daysDiff = Math.floor((targetDate - refDate) / (1000 * 60 * 60 * 24));
    const jiaziIndex = ((daysDiff % 60) + 60) % 60;
    return { stemIndex: jiaziIndex % 10, branchIndex: jiaziIndex % 12, jiaziIndex };
}

function calculateYearPillar(year, month, day) {
    const liChun = getLiChunDate(year);
    let adjustedYear = year;
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) adjustedYear = year - 1;
    return { stemIndex: ((adjustedYear - 4) % 10 + 10) % 10, branchIndex: ((adjustedYear - 4) % 12 + 12) % 12, adjustedYear };
}

function calculateMonthPillar(year, month, day, yearStemIndex) {
    const solarMonth = getSolarMonthForDate(year, month, day);
    const stemBaseMap = [2, 4, 6, 8, 0, 2, 4, 6, 8, 0];
    return { stemIndex: (stemBaseMap[yearStemIndex] + solarMonth.solarMonthIndex) % 10, branchIndex: (solarMonth.solarMonthIndex + 2) % 12, solarMonthIndex: solarMonth.solarMonthIndex };
}

function calculateHourPillar(hour, minute, dayStemIndex) {
    const totalMinutes = hour * 60 + minute;
    let hourBranchIndex;
    const isLateZiHour = totalMinutes >= 23 * 60;
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
    return { stemIndex: (stemBaseMap[dayStemIndex] + hourBranchIndex) % 10, branchIndex: hourBranchIndex, isLateZiHour, timeRange: ['23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00', '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'][hourBranchIndex] };
}

function calculateKuaNumber(year, month, day, gender) {
    const liChun = getLiChunDate(year);
    let calcYear = year;
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) calcYear = year - 1;
    const lastTwo = calcYear % 100;
    let digitSum = Math.floor(lastTwo / 10) + (lastTwo % 10);
    while (digitSum > 9) digitSum = Math.floor(digitSum / 10) + (digitSum % 10);
    const isMale = gender === 'male';
    let kua;
    if (calcYear >= 2000) {
        kua = isMale ? (9 - digitSum <= 0 ? 9 - digitSum + 9 : 9 - digitSum) : (digitSum + 6 > 9 ? digitSum + 6 - 9 : digitSum + 6);
    } else {
        kua = isMale ? (10 - digitSum <= 0 ? 10 - digitSum + 9 : 10 - digitSum > 9 ? 10 - digitSum - 9 : 10 - digitSum) : (digitSum + 5 > 9 ? digitSum + 5 - 9 : digitSum + 5);
    }
    if (kua === 5) kua = isMale ? 2 : 8;
    return kua;
}

function calculateBaZiChart(year, month, day, hour = 12, minute = 0, gender = 'male') {
    const yearPillar = calculateYearPillar(year, month, day);
    const monthPillar = calculateMonthPillar(year, month, day, yearPillar.stemIndex);
    const dayPillar = calculateDayPillar(year, month, day);
    const isLateZiHour = hour >= 23;
    let hourDayStemIndex = dayPillar.stemIndex;
    if (isLateZiHour) {
        const nextDay = new Date(year, month - 1, day + 1);
        hourDayStemIndex = calculateDayPillar(nextDay.getFullYear(), nextDay.getMonth() + 1, nextDay.getDate()).stemIndex;
    }
    const hourPillar = calculateHourPillar(hour, minute, hourDayStemIndex);
    return { year: yearPillar, month: monthPillar, day: dayPillar, hour: hourPillar, dayMaster: dayPillar.stemIndex, kuaNumber: calculateKuaNumber(year, month, day, gender), gender, birthInfo: { year, month, day, hour, minute }, isLateZiHour };
}

// ==============================================
// FLYING STARS
// ==============================================

function generateFlyingStarChart(centerStar) {
    const chart = {};
    const offset = centerStar - 5;
    for (let i = 0; i < 9; i++) {
        let starValue = LOSHU_BASE[i] + offset;
        while (starValue < 1) starValue += 9;
        while (starValue > 9) starValue -= 9;
        chart[LOSHU_POSITIONS[i]] = starValue;
    }
    return chart;
}

function getAnnualCenterStar(year) {
    const diff = year - 2017;
    let centerStar = ((1 - diff) % 9 + 9) % 9;
    return centerStar === 0 ? 9 : centerStar;
}

function calculateAnnualFlyingStars(year, month, day) {
    let fsYear = year;
    const liChun = getLiChunDate(year);
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) fsYear = year - 1;
    return generateFlyingStarChart(getAnnualCenterStar(fsYear));
}

function calculateDailyFlyingStars(year, month, day) {
    const dayPillar = calculateDayPillar(year, month, day);
    const jiaziIndex = dayPillar.jiaziIndex;
    const isYangDay = dayPillar.stemIndex % 2 === 0;
    const yuanPosition = jiaziIndex % 60;
    const cycleInYuan = yuanPosition % 9;
    let centerStar;
    if (yuanPosition < 20) centerStar = ((1 - cycleInYuan) % 9 + 9) % 9 || 9;
    else if (yuanPosition < 40) centerStar = ((4 - cycleInYuan) % 9 + 9) % 9 || 9;
    else centerStar = ((7 - cycleInYuan) % 9 + 9) % 9 || 9;
    return { chart: generateFlyingStarChart(centerStar), centerStar, jiaziIndex, isYangDay, yuan: yuanPosition < 20 ? 'Upper' : yuanPosition < 40 ? 'Middle' : 'Lower' };
}

function calculateHourlyFlyingStars(year, month, day, hour, minute) {
    const dailyData = calculateDailyFlyingStars(year, month, day);
    const dailyCenter = dailyData.centerStar;
    const isYangDay = dailyData.isYangDay;
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
    let hourlyCenterStar = isYangDay ? dailyCenter + hourBranchIndex : dailyCenter - hourBranchIndex;
    hourlyCenterStar = ((hourlyCenterStar - 1) % 9 + 9) % 9 + 1;
    const HOUR_NAMES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    const TIME_RANGES = ['23:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00', '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00'];
    return { chart: generateFlyingStarChart(hourlyCenterStar), centerStar: hourlyCenterStar, hourBranchIndex, hourName: HOUR_NAMES[hourBranchIndex], timeRange: TIME_RANGES[hourBranchIndex], isYangDay };
}

// ==============================================
// AFFLICTIONS
// ==============================================

function getSanShaFrame(mainDir) {
    const frames = { 'N': ['N', 'NE', 'NW'], 'S': ['S', 'SE', 'SW'], 'E': ['E', 'NE', 'SE'], 'W': ['W', 'NW', 'SW'] };
    return frames[mainDir] || [mainDir];
}

function getAnnualAfflictions(year, month, day) {
    let affYear = year;
    const liChun = getLiChunDate(year);
    if (month < liChun.month || (month === liChun.month && day < liChun.day)) affYear = year - 1;
    const branchIndex = ((affYear - 4) % 12 + 12) % 12;
    const TAI_SUI_DIRECTIONS = { 0: 'N', 1: 'NE', 2: 'NE', 3: 'E', 4: 'SE', 5: 'SE', 6: 'S', 7: 'SW', 8: 'SW', 9: 'W', 10: 'NW', 11: 'NW' };
    const SAN_SHA_MAP = { 0: 'S', 1: 'E', 2: 'N', 3: 'W', 4: 'S', 5: 'E', 6: 'N', 7: 'W', 8: 'S', 9: 'E', 10: 'N', 11: 'W' };
    const OPPOSITE = { 'N': 'S', 'S': 'N', 'E': 'W', 'W': 'E', 'NE': 'SW', 'SW': 'NE', 'NW': 'SE', 'SE': 'NW' };
    const taiSuiDir = TAI_SUI_DIRECTIONS[branchIndex];
    const annualStars = calculateAnnualFlyingStars(year, month, day);
    let wuHuangDir = 'Center';
    for (let dir in annualStars) { if (annualStars[dir] === 5) { wuHuangDir = dir; break; } }
    return {
        taiSui: { direction: taiSuiDir, name: 'Tai Sui', chinese: '太歲', description: 'Grand Duke Jupiter' },
        suiPo: { direction: OPPOSITE[taiSuiDir], name: 'Sui Po', chinese: '歲破', description: 'Year Breaker' },
        wuHuang: { direction: wuHuangDir, name: 'Wu Huang', chinese: '五黃', description: 'Five Yellow' },
        sanSha: { direction: SAN_SHA_MAP[branchIndex], name: 'San Sha', chinese: '三煞', description: 'Three Killings', frame: getSanShaFrame(SAN_SHA_MAP[branchIndex]) },
        yearAnimal: EARTHLY_BRANCHES[branchIndex].animal, yearBranch: branchIndex
    };
}

// ==============================================
// DIRECTION ANALYSIS
// ==============================================

function calculateDirectionScore(direction, kuaNumber, annualStars, dailyStars, afflictions, dayMasterElement, gender) {
    let score = 0, hasBlockingAffliction = false;
    const mansions = EIGHT_MANSIONS[kuaNumber] || EIGHT_MANSIONS[gender === 'male' ? 2 : 8];
    let kuaRating = 'neutral', kuaInfo = null;
    if (mansions.favorable[direction]) { kuaInfo = mansions.favorable[direction]; kuaRating = 'auspicious'; score += 2; }
    else if (mansions.unfavorable[direction]) { kuaInfo = mansions.unfavorable[direction]; kuaRating = 'inauspicious'; score -= 2; }
    const annualStar = annualStars[direction], annualStarInfo = FLYING_STARS[annualStar];
    if (annualStarInfo.nature === 'auspicious') score += 2;
    else if (annualStarInfo.nature === 'inauspicious') score -= 2;
    else score += 1;
    const dailyStar = dailyStars[direction], dailyStarInfo = FLYING_STARS[dailyStar];
    if (dailyStarInfo.nature === 'auspicious') score += 2;
    else if (dailyStarInfo.nature === 'inauspicious') score -= 2;
    else score += 1;
    let afflictionList = [];
    if (afflictions.taiSui.direction === direction) { score -= 3; hasBlockingAffliction = true; afflictionList.push({ icon: '⚠️', name: 'Tai Sui' }); }
    if (afflictions.wuHuang.direction === direction) { score -= 3; hasBlockingAffliction = true; afflictionList.push({ icon: '🚫', name: 'Wu Huang' }); }
    if (getSanShaFrame(afflictions.sanSha.direction).includes(direction)) { score -= 3; hasBlockingAffliction = true; afflictionList.push({ icon: '⛔', name: 'San Sha' }); }
    if (afflictions.suiPo.direction === direction) { score -= 2; afflictionList.push({ icon: '🔄', name: 'Sui Po' }); }
    return { direction, score, kuaInfo, kuaRating, annualStar, annualRating: annualStarInfo.nature, dailyStar, dailyRating: dailyStarInfo.nature, afflictions: afflictionList, hasBlockingAffliction, directionElement: DIRECTION_ELEMENTS[direction] };
}

function analyzeAllDirections(kuaNumber, annualStars, dailyStars, afflictions, dayMasterElement, gender) {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const results = directions.map(dir => calculateDirectionScore(dir, kuaNumber, annualStars, dailyStars, afflictions, dayMasterElement, gender));
    results.sort((a, b) => a.hasBlockingAffliction !== b.hasBlockingAffliction ? (a.hasBlockingAffliction ? 1 : -1) : b.score - a.score);
    return results;
}

// ==============================================
// VALIDATION
// ==============================================

function runValidation() {
    const tests = [];
    // Day Pillar Tests
    const dp1 = calculateDayPillar(1923, 12, 17);
    tests.push({ name: 'Day: Dec 17, 1923 = 甲子', pass: dp1.stemIndex === 0 && dp1.branchIndex === 0 });
    const dp2 = calculateDayPillar(1955, 2, 24);
    tests.push({ name: 'Day: Feb 24, 1955 = 丙辰 (Steve Jobs)', pass: dp2.stemIndex === 2 && dp2.branchIndex === 4 });
    const dp3 = calculateDayPillar(1955, 10, 28);
    tests.push({ name: 'Day: Oct 28, 1955 = 壬戌 (Bill Gates)', pass: dp3.stemIndex === 8 && dp3.branchIndex === 10 });
    // Kua Tests
    tests.push({ name: 'Kua: 1960 Male = 4', pass: calculateKuaNumber(1960, 6, 15, 'male') === 4 });
    tests.push({ name: 'Kua: 1985 Male = 6', pass: calculateKuaNumber(1985, 6, 15, 'male') === 6 });
    tests.push({ name: 'Kua: 1950 Male = 2 (5→2)', pass: calculateKuaNumber(1950, 6, 15, 'male') === 2 });
    tests.push({ name: 'Kua: 2000 Male = 9', pass: calculateKuaNumber(2000, 6, 15, 'male') === 9 });
    tests.push({ name: 'Kua: 2000 Female = 6', pass: calculateKuaNumber(2000, 6, 15, 'female') === 6 });
    // Flying Star Tests
    const fs2026 = calculateAnnualFlyingStars(2026, 3, 1);
    tests.push({ name: 'Flying Star: 2026 Center = 1', pass: fs2026['Center'] === 1 });
    // Zi Hour Test
    const ziChart = calculateBaZiChart(2000, 1, 1, 23, 30, 'male');
    tests.push({ name: 'Zi Hour: Jan 1, 2000 23:30 = late Zi', pass: ziChart.isLateZiHour === true && ziChart.hour.stemIndex === 0 });
    const passed = tests.filter(t => t.pass).length;
    console.log(`Validation: ${passed}/${tests.length} tests passed`);
    tests.filter(t => !t.pass).forEach(t => console.warn('FAILED:', t.name));
    return tests;
}

// Run validation on load
if (typeof window !== 'undefined') setTimeout(runValidation, 100);
