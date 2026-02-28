'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Topbar.module.css';

export default function Topbar() {
    const [isAlertMenuOpen, setIsAlertMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const router = useRouter();

    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const handleGenerateReport = () => {
        // Trigger the browser's native print-to-PDF dialog
        if (typeof window !== 'undefined') {
            window.print();
        }
    };

    const handleSearchNavigate = (route: string) => {
        setIsSearchFocused(false);
        setSearchQuery("");
        router.push(route);
    };

    return (
        <header className={styles.topbar}>
            <div className={styles.leftSection}>
                <h2 className={styles.pageTitle}>Dashboard</h2>
                <span className={styles.date}>{currentDate}</span>
            </div>

            <div className={styles.rightSection}>
                <div className={styles.searchWrapper}>
                    <div className={styles.searchBar}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            placeholder="Search wards, streets..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                        />
                    </div>

                    {isSearchFocused && searchQuery.length > 0 && (
                        <div className={styles.searchDropdown}>
                            <div className={styles.searchResultItem} onMouseDown={() => handleSearchNavigate('/ward/7')}>
                                Ward 7 (Critical Risk)
                            </div>
                            <div className={styles.searchResultItem} onMouseDown={() => handleSearchNavigate('/ward/12')}>
                                Ward 12 (Moderate Risk)
                            </div>
                            <div className={styles.searchResultItem} onMouseDown={() => handleSearchNavigate('/depot/main')}>
                                Main Street Depot
                            </div>
                        </div>
                    )}
                </div>

                <div
                    className={styles.alertIndicator}
                    onClick={() => setIsAlertMenuOpen(!isAlertMenuOpen)}
                >
                    <span className={styles.bellIcon}>🔔</span>
                    <span className={styles.badge}>2</span>

                    {/* Alert Dropdown Menu */}
                    {isAlertMenuOpen && (
                        <div className={styles.dropdownMenu} onClick={(e) => e.stopPropagation()}>
                            <div className={styles.dropdownHeader}>Recent Alerts</div>
                            <div className={styles.dropdownList}>
                                <div className={styles.dropdownItem}>
                                    <span className={styles.dropdownItemTitle} style={{ color: 'var(--alert-light)' }}>Critical: Ward 7 Outbreak</span>
                                    <span className={styles.dropdownItemText}>High correlation between missed waste and new fever cases detected.</span>
                                    <span className={styles.dropdownItemTime}>10 minutes ago</span>
                                </div>
                                <div className={styles.dropdownItem}>
                                    <span className={styles.dropdownItemTitle} style={{ color: 'var(--warning-light)' }}>Warning: Route Deviation</span>
                                    <span className={styles.dropdownItemText}>Vehicle DL-1M-4302 skipped 3 scheduled streets.</span>
                                    <span className={styles.dropdownItemTime}>1 hour ago</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <button className={styles.actionBtn} onClick={handleGenerateReport}>
                    Generate Report
                </button>
            </div>
        </header>
    );
}
