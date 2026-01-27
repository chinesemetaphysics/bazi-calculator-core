# Bug Report: Zi Hour Calculation Test Failures

## Description
Validation tests for Zi Hour calculations are failing, specifically in late and normal hour scenarios.

## Test Failures

### 1. Late Zi Hour Test
- **Expected:** 
  ```json
  {
    "isLateZi": true,
    "hourStem": 0
  }
  ```
- **Actual:** 
  ```json
  {
    "isLateZi": undefined,
    "hourStem": 8
  }
  ```

### 2. Normal Hour Test
- **Expected:** 
  ```json
  {
    "isLateZi": false
  }
  ```
- **Actual:** 
  ```json
  {
    "isLateZi": undefined,
    "hourStem": 4
  }
  ```

## Potential Issues
1. `isLateZiHour` is not being set correctly
2. Hour stem calculation might be incorrect for edge cases

## Recommended Fix
Modify hour pillar calculation to:
- Always set `isLateZiHour` explicitly
- Ensure correct stem calculation for 23:00-01:00 range
- Add comprehensive test cases covering all hour scenarios

## Impact
These failures could lead to incorrect BaZi chart generation, especially for births near midnight.

## Proposed Solution
1. Update validation to explicitly check `isLateZiHour`
2. Modify calculation logic to handle late Zi hour correctly
3. Add more granular hour pillar tests

## Additional Context
- Library Version: v2.0.0
- Detected in: Daily Compass BaZi Calculator
- Test environment: Browser-based calculation