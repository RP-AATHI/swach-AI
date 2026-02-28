'use client';
import { useState, useEffect } from 'react';
import styles from './Timeline.module.css';

interface AlertData {
    id: string;
    timestamp: string;
    type: string;
    message: string;
    actionRecommended: string;
    status: string;
}

export default function Timeline() {
    const [alerts, setAlerts] = useState<AlertData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAlerts() {
            try {
                const res = await fetch('/api/alerts');
                const data = await res.json();
                setAlerts(data);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAlerts();
    }, []);

    // Helper to format ISO strings
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.timelineContainer}>
            {loading ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p style={{ fontStyle: 'italic' }}>AI is analyzing city data for risk alerts...</p>
                </div>
            ) : alerts.length > 0 ? (
                alerts.map((alert, index) => (
                    <div key={alert.id} className={styles.timelineItem}>
                        <div className={`${styles.timelineDot} ${alert.type === 'CRITICAL' ? styles.alert : styles.warning}`}></div>
                        {index !== alerts.length - 1 && <div className={styles.timelineLine}></div>}
                        <div className={styles.timelineContent}>
                            <span className={styles.time}>{formatTime(alert.timestamp)}</span>
                            <h4 style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: alert.type === 'CRITICAL' ? 'var(--alert)' : 'var(--warning)' }}>
                                {alert.type} Alert
                            </h4>
                            <p className={styles.eventText}>{alert.message}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                                <strong>Action:</strong> {alert.actionRecommended}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No active alerts detected.</p>
                </div>
            )}

            <div className={styles.footerNote}>Analytics powered by Gemini AI</div>
        </div>
    );
}
