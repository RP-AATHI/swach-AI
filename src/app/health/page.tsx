import styles from './page.module.css';
import CorrelationChart from '@/components/dashboard/CorrelationChart';

export default function HealthPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Health vs. Waste Correlation</h1>
                <p className={styles.subtitle}>Analyze the correlation between missed waste collection and rising local fever cases.</p>
            </div>

            <div className={styles.chartWrapper}>
                <CorrelationChart />
            </div>
        </div>
    );
}
