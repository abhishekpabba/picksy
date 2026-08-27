import Script from 'next/script';

export default function Home() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="/" aria-label="Picksy home">
          <span className="brandmark">P</span><span>Picksy</span>
        </a>
        <nav className="nav">
          <a className="ghost" href="/wheel">🎡 Spin wheel</a>
          <a className="ghost" href="/giveaway">🏆 Giveaway</a>
          <button className="ghost" id="navCreate">Create poll</button>
          <button className="ghost" id="navMyPolls">My polls</button>
        </nav>
      </header>
      <div className="home-tool-strip">
        <a href="/wheel"><span>🎡</span><strong>Spin a Wheel</strong><small>Randomly pick a name or choice</small></a>
        <a href="/giveaway"><span>🏆</span><strong>Giveaway Winner</strong><small>Deduplicate entries and draw winners</small></a>
      </div>
      <main id="app" className="shell" />
      <footer className="footer">Picksy · Poll it. Spin it. Pick a winner.</footer>
      <Script src="/app.js" strategy="afterInteractive" />
      <Script src="/enhancements.js" strategy="afterInteractive" />
    </>
  );
}
