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

module.exports = {
    calculateHourPillar
};
