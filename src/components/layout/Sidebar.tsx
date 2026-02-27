import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <div className={styles.logoIcon}></div>
                <h1 className={styles.logoText}>Swachh-Ayush AI</h1>
            </div>
            <nav className={styles.nav}>
                <Link href="/" className={`${styles.navItem} ${styles.active}`}>
                    <span className={styles.icon}>📊</span> Dashboard
                </Link>
                <Link href="/heatmap" className={styles.navItem}>
                    <span className={styles.icon}>🗺️</span> City Heatmap
                </Link>
                <Link href="/vehicles" className={styles.navItem}>
                    <span className={styles.icon}>🚚</span> Vehicles
                </Link>
                <Link href="/health" className={styles.navItem}>
                    <span className={styles.icon}>🏥</span> Health Data
                </Link>
            </nav>
            <div className={styles.sidebarFooter}>
                <div className={styles.userInfo}>
                    <div className={styles.avatar}>CM</div>
                    <div className={styles.userDetails}>
                        <span className={styles.userName}>Command Center</span>
                        <span className={styles.userRole}>Administrator</span>
                    </div>
                </div>
            </div>
        </aside>
    );
}
