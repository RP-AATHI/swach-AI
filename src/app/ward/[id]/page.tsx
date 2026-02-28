export default async function WardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div style={{ padding: '2rem', color: 'var(--foreground)' }}>
            <h1>Analysis for Ward {id}</h1>
            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>
                This is a placeholder page reached via the Swachh-Ayush AI Topbar search dropdown.
                In a full application, this page would load dynamic analytics for Ward {id}.
            </p>
            <a
                href="/"
                style={{
                    display: 'inline-block',
                    marginTop: '2rem',
                    padding: '0.75rem 1.5rem',
                    background: 'var(--teal-primary)',
                    color: 'white',
                    borderRadius: 'var(--radius-md)',
                    textDecoration: 'none'
                }}
            >
                ← Back to Global Dashboard
            </a>
        </div>
    );
}
