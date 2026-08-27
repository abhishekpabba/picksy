import Script from 'next/script';

const pollTools=[
  ['/image-poll','🖼️','Image Poll','Compare photos, AI images and designs'],
  ['/multiple-choice-poll','📊','Multiple Choice Poll','Ask a question and collect votes'],
  ['/ranking-poll','🏆','Ranking Poll','Rank choices from favorite to least favorite'],
  ['/rating-poll','⭐','Rating Poll','Collect quick 1–5 star ratings'],
  ['/date-poll','📅','Date Poll','Find the best day or time for everyone'],
  ['/potluck-poll','🍴','Potluck Planner','Let guests claim what they are bringing'],
  ['/feedback-poll','💬','Feedback Poll','Collect votes plus written reasons'],
  ['/yes-no-poll','👍','Yes / No Poll','Run a fast binary vote']
];

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
      <section aria-label="Picksy poll tools" style={{maxWidth:1080,margin:'0 auto 30px',padding:'0 22px'}}>
        <h2 className="section-title">Explore free online poll tools</h2>
        <p className="muted">Choose the poll format that fits your decision.</p>
        <div className="home-tool-strip" style={{padding:0,maxWidth:'none'}}>
          {pollTools.map(([href,icon,name,desc])=><a href={href} key={href}><span>{icon}</span><strong>{name}</strong><small>{desc}</small></a>)}
        </div>
      </section>
      <footer className="footer">Picksy · Poll it. Spin it. Pick a winner.</footer>
      <Script src="/app.js" strategy="afterInteractive" />
      <Script src="/enhancements.js" strategy="afterInteractive" />
    </>
  );
}
