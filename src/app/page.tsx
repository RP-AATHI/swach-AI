import styles from "./page.module.css";
import Heatmap from "@/components/dashboard/Heatmap";
import Timeline from "@/components/dashboard/Timeline";
import CorrelationChart from "@/components/dashboard/CorrelationChart";
import VehicleList from "@/components/dashboard/VehicleList";
import Image from "next/image";

export default function Home() {
  return (
    <div className={styles.dashboardContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroGlow}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroTag}>Municipal Intelligence Platform</div>
          <h1 className={styles.heroTitle}>Swachh-Ayush AI</h1>
          <p className={styles.heroSubtitle}>Predict. Prevent. Protect.</p>
          <p className={styles.heroDescription}>
            Transforming city data into public health immunity. Our AI engine correlates missed waste collections with early health signals to predict and automatically trigger preventive actions against disease outbreaks before they occur.
          </p>
        </div>
        <div className={styles.heroImageContainer}>
          <Image
            src="/hero-bg.png"
            alt="Swachh-Ayush AI Smart City Dashboard"
            fill
            priority
            className={styles.heroImage}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

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
