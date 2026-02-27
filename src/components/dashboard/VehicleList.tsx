import styles from './VehicleList.module.css';

const MOCK_VEHICLES = [
    { id: 'TRK-042', ward: 7, status: 'deviated', driver: 'Raj K.', compliance: '68%' },
    { id: 'TRK-105', ward: 12, status: 'active', driver: 'Suresh M.', compliance: '98%' },
    { id: 'TRK-018', ward: 3, status: 'active', driver: 'Amit p.', compliance: '100%' },
    { id: 'TRK-221', ward: 8, status: 'delayed', driver: 'Vijay S.', compliance: '85%' },
    { id: 'TRK-099', ward: 15, status: 'active', driver: 'Raju T.', compliance: '95%' },
];

export default function VehicleList() {
    return (
        <div className={styles.listContainer}>
            <table className={styles.vehicleTable}>
                <thead>
                    <tr>
                        <th>Vehicle ID</th>
                        <th>Ward</th>
                        <th>Driver</th>
                        <th>Compliance</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {MOCK_VEHICLES.map((v) => (
                        <tr key={v.id}>
                            <td className={styles.idCell}>{v.id}</td>
                            <td>Ward {v.ward}</td>
                            <td className={styles.driverCell}>{v.driver}</td>
                            <td>
                                <div className={styles.complianceBar}>
                                    <div
                                        className={styles.complianceFill}
                                        style={{ width: v.compliance, backgroundColor: parseInt(v.compliance) < 80 ? 'var(--red-critical)' : 'var(--teal-primary)' }}
                                    ></div>
                                </div>
                                <span className={styles.complianceText}>{v.compliance}</span>
                            </td>
                            <td>
                                <span className={`${styles.statusBadge} ${styles[v.status]}`}>
                                    {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
