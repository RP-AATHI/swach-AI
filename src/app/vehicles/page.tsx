import styles from './page.module.css';
import VehicleList from '@/components/dashboard/VehicleList';

export default function VehiclesPage() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>Vehicle Compliance Tracker</h1>
                <p className={styles.subtitle}>Monitor the real-time status and route compliance of all waste collection vehicles.</p>
            </div>

            <div className={styles.listWrapper}>
                <VehicleList />
            </div>
        </div>
    );
}
