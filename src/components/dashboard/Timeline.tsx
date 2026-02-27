import styles from './Timeline.module.css';

const MOCK_EVENTS = [
    { id: 1, time: '08:00 AM', event: 'Truck 4 missed Ward 7 route', type: 'waste' },
    { id: 2, time: '10:30 AM', event: '3 unusual fever cases reported at City Clinic', type: 'health' },
    { id: 3, time: '11:45 AM', event: 'AI Correlation flagged Ward 7 as Red Zone', type: 'alert' },
    { id: 4, time: '01:00 PM', event: 'Auto-dispatch Vector Control Team', type: 'action' },
];

export default function Timeline() {
    return (
        <div className={styles.timelineContainer}>
            {MOCK_EVENTS.map((item, index) => (
                <div key={item.id} className={styles.timelineItem}>
                    <div className={`${styles.timelineDot} ${styles[item.type]}`}></div>
                    {index !== MOCK_EVENTS.length - 1 && <div className={styles.timelineLine}></div>}
                    <div className={styles.timelineContent}>
                        <span className={styles.time}>{item.time}</span>
                        <p className={styles.eventText}>{item.event}</p>
                    </div>
                </div>
            ))}
            <div className={styles.footerNote}>SLA for next auto-action: 2h 15m</div>
        </div>
    );
}
