'use client';

import { useMemo, useRef, useState } from 'react';

const COLORS=['#6d5dfc','#ff7a90','#21b8a6','#ffb84d','#7d8cff','#d96dd8','#4da3ff','#7ac66a'];
function secureIndex(max:number){if(max<=1)return 0;const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]%max}

export default function WheelPage(){
  const [raw,setRaw]=useState('Alex\nJordan\nTaylor\nMorgan\nCasey\nRiley');
  const [rotation,setRotation]=useState(0);const [winner,setWinner]=useState('');const [history,setHistory]=useState<string[]>([]);const [spinning,setSpinning]=useState(false);const spinRef=useRef(0);
  const entries=useMemo(()=>raw.split(/\n|,/).map(x=>x.trim()).filter(Boolean).slice(0,100),[raw]);
  const gradient=useMemo(()=>entries.length?entries.map((_,i)=>`${COLORS[i%COLORS.length]} ${i*360/entries.length}deg ${(i+1)*360/entries.length}deg`).join(','):'#eee 0 360deg',[entries]);
  function spin(){if(spinning||entries.length<2)return;const idx=secureIndex(entries.length);const slice=360/entries.length;const target=360*6+(360-(idx*slice+slice/2));spinRef.current+=target;setRotation(spinRef.current);setSpinning(true);setWinner('');setTimeout(()=>{setWinner(entries[idx]);setHistory(h=>[entries[idx],...h].slice(0,12));setSpinning(false)},4200)}
  function removeWinner(){if(!winner)return;setRaw(entries.filter(x=>x!==winner).join('\n'));setWinner('')}
  function shuffle(){setRaw([...entries].sort(()=>secureIndex(3)-1).join('\n'));setWinner('')}
  return <main className="tool-shell"><header className="tool-top"><a href="/" className="brand"><span className="brandmark">P</span><span>Picksy</span></a><nav><a className="ghost" href="/giveaway">Giveaway picker</a><a className="ghost" href="/">Polls</a></nav></header>
    <section className="tool-hero compact"><span className="eyebrow">🎡 Spin Wheel</span><h1>Paste names. Spin. Pick fairly.</h1><p>No login required. Add up to 100 names or choices, then spin for a random winner.</p></section>
    <div className="tool-grid"><section className="panel tool-editor"><div className="row between"><h2>Entries</h2><span className="chip">{entries.length} entries</span></div><textarea className="entry-box" value={raw} onChange={e=>setRaw(e.target.value)} aria-label="Wheel entries"/><div className="row mobile-stack"><button className="secondary" onClick={shuffle}>Shuffle</button><button className="ghost" onClick={()=>{setRaw('');setWinner('')}}>Clear</button></div><p className="tiny">One entry per line, or separate with commas.</p></section>
      <section className="panel wheel-panel"><div className="wheel-wrap"><div className="pointer">▼</div><div className="wheel" style={{background:`conic-gradient(${gradient})`,transform:`rotate(${rotation}deg)`,transition:spinning?'transform 4.2s cubic-bezier(.16,.82,.18,1)':'none'}} aria-label="Random wheel">{entries.length>0&&<div className="wheel-center">P</div>}</div></div><button className="primary spin-btn" disabled={spinning||entries.length<2} onClick={spin}>{spinning?'Spinning…':'Spin the wheel'}</button>{winner&&<div className="winner-card"><span>🎉 Winner</span><strong>{winner}</strong><div className="row center"><button className="secondary" onClick={removeWinner}>Remove winner</button><button className="ghost" onClick={spin}>Spin again</button></div></div>}</section>
    </div>{history.length>0&&<section className="panel history"><h2>Recent winners</h2><div className="winner-chips">{history.map((x,i)=><span className="chip" key={i}>{i+1}. {x}</span>)}</div></section>}
  </main>
}