import styles from './page.module.css';
import Heatmap from '@/components/dashboard/Heatmap';

export default function HeatmapPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>City Heatmap</h1>
                <p className={styles.subtitle}>Real-time monitoring of disease outbreak risk across all city wards.</p>
            </div>

            <div className={styles.heatmapWrapper}>
                <Heatmap />
            </div>
        </div>
    );
}
