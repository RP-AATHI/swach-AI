import styles from './Topbar.module.css';

export default function Topbar() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className={styles.topbar}>
            <div className={styles.leftSection}>
                <h2 className={styles.pageTitle}>Dashboard</h2>
                <span className={styles.date}>{currentDate}</span>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.searchBar}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input type="text" placeholder="Search wards, streets..." className={styles.searchInput} />
                </div>

                <div className={styles.alertIndicator}>
                    <span className={styles.bellIcon}>🔔</span>
                    <span className={styles.badge}>2</span>
                </div>

                <button className={styles.actionBtn}>
                    Generate Report
                </button>
            </div>
        </header>
    );
}
