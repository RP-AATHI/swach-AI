import styles from './Heatmap.module.css';

// Mock Data representing different city wards/sectors
const MOCK_WARDS = Array.from({ length: 48 }, (_, i) => {
    const riskScore = Math.random() * 100;
    let status = 'normal';
    if (riskScore > 85) status = 'critical';
    else if (riskScore > 60) status = 'warning';

    return { id: i + 1, status, score: Math.round(riskScore) };
});

export default function Heatmap() {
    return (
        <div className={styles.heatmapContainer}>
            <div className={styles.mapGrid}>
                {MOCK_WARDS.map((ward) => (
                    <div
                        key={ward.id}
                        className={`${styles.wardCell} ${styles[ward.status]}`}
                        title={`Ward ${ward.id} - Risk Score: ${ward.score}`}
                    >
                        <span className={styles.wardId}>{ward.id}</span>
                        {ward.status === 'critical' && <span className={styles.pulse}></span>}
                    </div>
                ))}
            </div>
            <div className={styles.legend}>
                <div className={styles.legendItem}>
                    <div className={`${styles.swatch} ${styles.normal}`}></div>
                    <span>Normal</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.swatch} ${styles.warning}`}></div>
                    <span>Elevated Risk</span>
                </div>
                <div className={styles.legendItem}>
                    <div className={`${styles.swatch} ${styles.critical}`}></div>
                    <span className={styles.criticalText}>Red Zone (Critical)</span>
                </div>
            </div>
        </div>
    );
}
