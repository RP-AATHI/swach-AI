'use client';
import { useState, useEffect } from 'react';
import styles from './CorrelationChart.module.css';

interface HealthData {
    correlationConfidence: number;
    message: string;
}

export default function CorrelationChart() {
    const [healthData, setHealthData] = useState<HealthData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchHealthData() {
            try {
                const res = await fetch('/api/health');
                const data = await res.json();
                setHealthData(data);
            } catch (error) {
                console.error("Error fetching health data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchHealthData();
    }, []);

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

            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '8px', borderLeft: '4px solid var(--primary-light)' }}>
                <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>🧠</span> AI Correlation Analysis
                    {healthData?.correlationConfidence && (
                        <span style={{ fontSize: '0.8em', background: 'var(--primary)', color: '#fff', padding: '2px 8px', borderRadius: '12px' }}>
                            {healthData.correlationConfidence}% Confidence
                        </span>
                    )}
                </h4>
                {loading ? (
                    <p style={{ margin: 0, fontStyle: 'italic', color: 'var(--text-muted)' }}>Gemini AI is analyzing recent health trends...</p>
                ) : (
                    <p style={{ margin: 0, lineHeight: 1.5 }}>{healthData?.message || "Analysis currently unavailable."}</p>
                )}
            </div>
        </div>
    );
}
