'use client';

import { useMemo, useState } from 'react';

function secureIndex(max:number){if(max<=1)return 0;const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%max}
function encode(v:unknown){return btoa(unescape(encodeURIComponent(JSON.stringify(v))))}
function drawId(){const a=new Uint32Array(2);crypto.getRandomValues(a);return `DRW-${a[0].toString(36).slice(-4)}${a[1].toString(36).slice(-4)}`.toUpperCase()}

export default function GiveawayPage(){
  const [title,setTitle]=useState('');const [prize,setPrize]=useState('');const [raw,setRaw]=useState('');const [count,setCount]=useState(1);const [winners,setWinners]=useState<string[]>([]);const [recordUrl,setRecordUrl]=useState('');
  const parsed=useMemo(()=>raw.split(/\n|,/).map(x=>x.trim()).filter(Boolean).slice(0,5000),[raw]);
  const unique=useMemo(()=>Array.from(new Map(parsed.map(x=>[x.toLowerCase(),x])).values()),[parsed]);
  const duplicates=parsed.length-unique.length;
  function draw(){if(unique.length<2)return;const pool=[...unique],out:string[]=[];const n=Math.max(1,Math.min(count,Math.min(10,pool.length)));for(let i=0;i<n;i++){const idx=secureIndex(pool.length);out.push(pool.splice(idx,1)[0])}setWinners(out);const record={id:drawId(),title:title.trim()||'Picksy Giveaway',prize:prize.trim(),entrants:unique.length,winners:out,drawnAt:new Date().toISOString(),method:'Browser cryptographic random selection'};setRecordUrl(`${location.origin}/verify?d=${encodeURIComponent(encode(record))}`)}
  async function copyRecord(){if(!recordUrl)return;try{await navigator.clipboard.writeText(recordUrl)}catch{} }
  return <main className="tool-shell"><header className="tool-top"><a href="/" className="brand"><span className="brandmark">P</span><span>Picksy</span></a><nav><a className="ghost" href="/wheel">Spin wheel</a><a className="ghost" href="/">Polls</a></nav></header>
    <section className="tool-hero compact"><span className="eyebrow">🏆 Giveaway Picker</span><h1>Clean entries. Draw winners. Share the result.</h1><p>Paste your entrant list, automatically remove duplicates, and create a shareable draw record.</p></section>
    <div className="tool-grid giveaway-grid"><section className="panel tool-editor"><div className="field"><label>Giveaway name <span className="muted">(optional)</span></label><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Summer giveaway"/></div><div className="field"><label>Prize <span className="muted">(optional)</span></label><input value={prize} onChange={e=>setPrize(e.target.value)} placeholder="$100 gift card"/></div><div className="field"><label>Entrants</label><textarea className="entry-box" value={raw} onChange={e=>setRaw(e.target.value)} placeholder={'@alex\n@jordan\n@taylor'}/></div><div className="entry-stats"><span><strong>{parsed.length}</strong> submitted</span><span><strong>{unique.length}</strong> eligible</span><span><strong>{duplicates}</strong> duplicates removed</span></div><div className="field"><label>Number of winners</label><input type="number" min={1} max={10} value={count} onChange={e=>setCount(Number(e.target.value)||1)}/></div></section>
      <section className="panel draw-panel"><div className="draw-orb">🏆</div><h2>Ready to draw?</h2><p className="muted">Picksy selects winners without replacement using browser cryptographic randomness.</p><button className="primary spin-btn" disabled={unique.length<2} onClick={draw}>Draw winner{count>1?'s':''}</button>{unique.length<2&&<div className="notice">Add at least two unique entrants.</div>}{winners.length>0&&<div className="winner-card"><span>🎉 Winner{winners.length>1?'s':''}</span>{winners.map((w,i)=><strong key={w}>{i+1}. {w}</strong>)}{prize&&<p>{prize}</p>}<div className="row center"><a className="secondary" href={recordUrl}>View draw record</a><button className="ghost" onClick={copyRecord}>Copy result link</button></div></div>}</section>
    </div><section className="trust-strip"><div>✓ Duplicate removal</div><div>✓ No entrant account</div><div>✓ Multiple winners</div><div>✓ Shareable draw record</div></section>
  </main>
}