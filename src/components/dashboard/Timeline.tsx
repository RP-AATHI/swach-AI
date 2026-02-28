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
    const [actionState, setActionState] = useState<Record<string, 'idle' | 'loading' | 'success'>>({});
    const [emailLinks, setEmailLinks] = useState<Record<string, string>>({});

    useEffect(() => {
        async function fetchAlerts() {
            try {
                const res = await fetch('/api/alerts');
                const data = await res.json();
                setAlerts(data);

                const initialStates: Record<string, 'idle'> = {};
                if (Array.isArray(data)) {
                    data.forEach(a => initialStates[a.id] = 'idle');
                }
                setActionState(initialStates);
            } catch (error) {
                console.error("Error fetching alerts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAlerts();
    }, []);

    const handleTriggerAction = async (alert: AlertData) => {
        setActionState(prev => ({ ...prev, [alert.id]: 'loading' }));
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(alert)
            });

            if (res.ok) {
                const data = await res.json();
                setEmailLinks(prev => ({ ...prev, [alert.id]: data.previewUrl }));
                setActionState(prev => ({ ...prev, [alert.id]: 'success' }));
            } else {
                setActionState(prev => ({ ...prev, [alert.id]: 'idle' }));
            }
        } catch (error) {
            console.error("Failed to trigger action:", error);
            setActionState(prev => ({ ...prev, [alert.id]: 'idle' }));
        }
    };

    // Helper to format ISO strings
    const formatTime = (isoString: string) => {
        const date = new Date(isoString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className={styles.timelineContainer}>
            {loading ? (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p style={{ fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem' }}>⚙️</span> AI is analyzing city data for risk alerts...
                    </p>
                </div>
            ) : alerts.length > 0 ? (
                alerts.map((alert, index) => (
                    <div key={alert.id} className={styles.timelineItem}>
                        <div className={`${styles.timelineDot} ${alert.type === 'CRITICAL' ? styles.alert : styles.warning}`}></div>
                        {index !== alerts.length - 1 && <div className={styles.timelineLine}></div>}
                        <div className={styles.timelineContent}>
                            <span className={styles.time}>{formatTime(alert.timestamp)}</span>
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '0.95rem', color: alert.type === 'CRITICAL' ? 'var(--alert-light)' : 'var(--warning-light)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                                {alert.type === 'CRITICAL' ? '🚨' : '⚠️'} {alert.type} Alert
                            </h4>
                            <p className={styles.eventText}>{alert.message}</p>

                            <div style={{ marginTop: '12px', padding: '12px', background: 'var(--bg-panel)', borderRadius: 'var(--radius-sm)', borderLeft: `3px solid ${alert.type === 'CRITICAL' ? 'var(--alert)' : 'var(--warning)'}`, boxShadow: 'var(--shadow-panel)' }}>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 8px 0' }}>
                                    <strong>AI Recommended Action:</strong><br />
                                    {alert.actionRecommended}
                                </p>

                                <button
                                    className={`${styles.actionButton} ${actionState[alert.id] === 'loading' ? styles.loading : ''} ${actionState[alert.id] === 'success' ? styles.success : ''}`}
                                    onClick={() => handleTriggerAction(alert)}
                                    disabled={actionState[alert.id] !== 'idle'}
                                >
                                    {actionState[alert.id] === 'idle' && '⚡ Trigger Action'}
                                    {actionState[alert.id] === 'loading' && '⏳ Dispatching Team...'}
                                    {actionState[alert.id] === 'success' && '✅ Alert Email Dispatched'}
                                </button>

                                {actionState[alert.id] === 'success' && emailLinks[alert.id] && (
                                    <div style={{ marginTop: '8px', fontSize: '0.8rem', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        Check Logs: <a href={emailLinks[alert.id]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline', color: 'inherit' }}>View Ethereal Preview URL</a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <p>No active alerts detected.</p>
                </div>
            )}

            <div className={styles.footerNote} style={{ color: 'var(--text-muted)' }}>Analytics powered by Gemini AI</div>
        </div>
    );
}
