import styles from './CorrelationChart.module.css';

export default function CorrelationChart() {
    // Using a simplified CSS-based bar chart view for the MVP
    const dataPoints = [
        { day: 'Mon', waste: 40, fever: 20 },
        { day: 'Tue', waste: 55, fever: 30 },
        { day: 'Wed', waste: 90, fever: 45 },
        { day: 'Thu', waste: 100, fever: 80 }, // Correlation spike
        { day: 'Fri', waste: 30, fever: 95 }, // Action taken, fever lagging indicator
        { day: 'Sat', waste: 20, fever: 60 },
        { day: 'Sun', waste: 15, fever: 30 },
    ];

    return (
        <div className={styles.chartContainer}>
            <div className={styles.barsArea}>
                {dataPoints.map((point) => (
                    <div key={point.day} className={styles.barGroup}>
                        <div className={styles.bars}>
                            <div
                                className={styles.wasteBar}
                                style={{ height: `${point.waste}%` }}
                                title={`Waste Level: ${point.waste}`}
                            ></div>
                            <div
                                className={styles.feverBar}
                                style={{ height: `${point.fever}%` }}
                                title={`Fever Cases: ${point.fever}`}
                            ></div>
                        </div>
                        <span className={styles.dayLabel}>{point.day}</span>
                    </div>
                ))}
            </div>
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={`${styles.swatch} ${styles.swatchWaste}`}></div>
                    <span>Uncollected Waste Volume</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.swatch} ${styles.swatchFever}`}></div>
                    <span>Local Fever Reports</span>
                </div>
            </div>
        </div>
    );
}
