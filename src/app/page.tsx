import styles from "./page.module.css";
import Heatmap from "@/components/dashboard/Heatmap";
import Timeline from "@/components/dashboard/Timeline";
import CorrelationChart from "@/components/dashboard/CorrelationChart";
import VehicleList from "@/components/dashboard/VehicleList";

export default function Home() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.red}`}>
          <div className={styles.statTitle}>
            Active Red Zones <span title="Critical">⚠️</span>
          </div>
          <div className={styles.statValue}>14</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>↑ 3 from yesterday</div>
        </div>

        <div className={`${styles.statCard} ${styles.teal}`}>
          <div className={styles.statTitle}>
            Route Compliance <span>📍</span>
          </div>
          <div className={styles.statValue}>92%</div>
          <div className={`${styles.statTrend} ${styles.trendDown}`}>↓ 2% from yesterday</div>
        </div>

        <div className={`${styles.statCard} ${styles.red}`}>
          <div className={styles.statTitle}>
            Outbreak Risk Score <span>🏥</span>
          </div>
          <div className={styles.statValue}>84/100</div>
          <div className={`${styles.statTrend} ${styles.trendUp}`}>Critical in Ward 7</div>
        </div>

        <div className={`${styles.statCard} ${styles.teal}`}>
          <div className={styles.statTitle}>
            Actions Triggered <span>⚡</span>
          </div>
          <div className={styles.statValue}>28</div>
          <div className={`${styles.statTrend} ${styles.trendDown}`}>All SLAs met</div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.gridItem}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>City Heatmap: Red Zones</h3>
          </div>
          <Heatmap />
        </div>

        <div className={styles.gridItem}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>Outbreak Risk Timeline</h3>
          </div>
          <Timeline />
        </div>
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.gridItem}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>Health vs. Waste Correlation</h3>
          </div>
          <CorrelationChart />
        </div>

        <div className={styles.gridItem}>
          <div className={styles.itemHeader}>
            <h3 className={styles.itemTitle}>Vehicle Compliance Tracker</h3>
          </div>
          <VehicleList />
        </div>
      </div>
    </div>
  );
}
