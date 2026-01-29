// BaZi Calculator Core Override
// Fixes Zi Hour calculation issues

(function() {
    // Only run if the original calculator is loaded
    if (typeof calculateHourPillar !== 'function') {
        console.error('Original calculator not found. Cannot apply override.');
        return;
    }

    // Store original function
    const originalCalculateHourPillar = calculateHourPillar;

    // Enhanced function to handle Zi Hour more precisely
    function enhancedCalculateHourPillar(hour, minute, dayStemIndex, isLateZiHour = false) {
        const totalMinutes = hour * 60 + minute;
        let hourBranchIndex;
        let definedIsLateZiHour = false;

        // Precise Zi Hour (子時) handling
        if (totalMinutes >= 23 * 60 || totalMinutes < 1 * 60) {
            hourBranchIndex = 0;  // Always Zi Branch
            definedIsLateZiHour = totalMinutes >= 0 * 60 && totalMinutes < 1 * 60;
        }
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
            timeRange: timeRanges[hourBranchIndex],
            // Explicitly set isLateZiHour for the Zi hour (branch index 0)
            ...(hourBranchIndex === 0 ? { 
                isLateZiHour: definedIsLateZiHour 
            } : {})
        };
    }

    // Replace original function
    calculateHourPillar = enhancedCalculateHourPillar;

    // Optional: Log that override is active
    console.log('🕰️ BaZi Hour Pillar Override Activated (v1.1)');
})();