import Script from 'next/script';

export default function Home() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="/" aria-label="Picksy home">
          <span className="brandmark">P</span><span>Picksy</span>
        </a>
        <nav className="nav">
          <button className="ghost" id="navCreate">Create poll</button>
          <button className="ghost" id="navMyPolls">My polls</button>
        </nav>
      </header>
      <main id="app" className="shell" />
      <footer className="footer">Picksy · Free online polls for quick group decisions.</footer>
      <Script src="/app.js" strategy="afterInteractive" />
      <Script src="/enhancements.js" strategy="afterInteractive" />
    </>
  );
}
