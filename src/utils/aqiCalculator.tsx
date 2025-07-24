export const calculateAQI = (pm25: number, pm10: number): number => {
    // Define breakpoints for PM2.5
    const pm25Breakpoints = [
        { low: 0, high: 30, aqiLow: 0, aqiHigh: 50 },
        { low: 31, high: 60, aqiLow: 51, aqiHigh: 100 },
        { low: 61, high: 90, aqiLow: 101, aqiHigh: 200 },
        { low: 91, high: 120, aqiLow: 201, aqiHigh: 300 },
        { low: 121, high: 250, aqiLow: 301, aqiHigh: 400 },
        { low: 251, high: Infinity, aqiLow: 401, aqiHigh: 500 },
    ];

    // Define breakpoints for PM10
    const pm10Breakpoints = [
        { low: 0, high: 50, aqiLow: 0, aqiHigh: 50 },
        { low: 51, high: 100, aqiLow: 51, aqiHigh: 100 },
        { low: 101, high: 250, aqiLow: 101, aqiHigh: 200 },
        { low: 251, high: 350, aqiLow: 201, aqiHigh: 300 },
        { low: 351, high: 430, aqiLow: 301, aqiHigh: 400 },
        { low: 431, high: Infinity, aqiLow: 401, aqiHigh: 500 },
    ];

    // Helper function to calculate Sub-Index
    const calculateSubIndex = (value: number, breakpoints: any[]) => {
        for (const point of breakpoints) {
            if (value >= point.low && value <= point.high) {
                return (
                    ((value - point.low) / (point.high - point.low)) *
                    (point.aqiHigh - point.aqiLow) +
                    point.aqiLow
                );
            }
        }
        return 0;
    };

    // Calculate Sub-Indices for PM2.5 and PM10
    const pm25SubIndex = calculateSubIndex(pm25, pm25Breakpoints);
    const pm10SubIndex = calculateSubIndex(pm10, pm10Breakpoints);

    // Final AQI is the maximum of both Sub-Indices
    return Math.round(Math.max(pm25SubIndex, pm10SubIndex));
};
