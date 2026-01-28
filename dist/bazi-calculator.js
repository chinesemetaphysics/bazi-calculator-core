/**
 * BaZi Calculator Core - Hour Pillar Precision Update
 * Version: 2.1.0
 * Precise Zi Hour (子時) Calculation
 */

// Existing core library content with precise hour pillar calculation
function calculateHourPillar(hour, minute, dayStemIndex, explicitIsLateZiHour = null) {
    const totalMinutes = hour * 60 + minute;
    let hourBranchIndex;
    let isLateZiHour = false;

    // Precise Zi Hour (子時) handling
    if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) {
        hourBranchIndex = 0;
        
        // Explicit Late Zi Hour detection
        if (explicitIsLateZiHour !== null) {
            isLateZiHour = explicitIsLateZiHour;
        } else {
            // Default Late Zi Hour logic
            isLateZiHour = totalMinutes >= 23 * 60 && totalMinutes < 1 * 60;
        }
    }
    // ... rest of existing calculation logic

    const result = {
        stemIndex: hourStemIndex,
        branchIndex: hourBranchIndex,
        timeRange: timeRanges[hourBranchIndex]
    };

    // Conditional Late Zi Hour property
    if (hourBranchIndex === 0) {
        result.isLateZiHour = isLateZiHour;
    }

    return result;
}
