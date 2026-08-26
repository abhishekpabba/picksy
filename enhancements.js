(()=>{
const qs=(s,r=document)=>r.querySelector(s), qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const templates=[
 ['🎨','Choose a design','image','Which design do you like best?'],
 ['🤖','Compare AI images','image','Which AI image should I use?'],
 ['🍴','Plan a potluck','potluck','What is everyone bringing?'],
 ['📅','Choose a date','date','Which date works best?'],
 ['💡','Rank ideas','rank','Rank these ideas from best to worst'],
 ['⭐','Rate an idea','rate','How would you rate this idea?'],
 ['💬','Get feedback','feedback','Which option do you prefer and why?'],
 ['👍','Quick yes / no','yesno','Should we do this?']
];
function removeAds(){qsa('.ad').forEach(x=>x.remove())}
function addHomeContent(){
 const hero=qs('.hero'); if(!hero||qs('#picksyEnhancements'))return;
 const section=document.createElement('section'); section.id='picksyEnhancements';
 section.innerHTML=`<div class="spacer"></div><div class="row between"><div><h2 class="section-title">Start with a popular poll</h2><div class="muted">Ready-made ideas for fast decisions.</div></div></div><div class="grid">${templates.map(([i,n,t,q])=>`<button class="type-card quick-template" data-type="${t}" data-question="${esc(q)}"><div class="icon">${i}</div><h3>${n}</h3><p>${esc(q)}</p></button>`).join('')}</div><div class="spacer"></div><section class="panel noshadow"><span class="eyebrow">Free online poll maker</span><h2>Create, share and understand polls in seconds</h2><p class="muted">Picksy combines visual voting with the most useful parts of modern poll and survey tools: image choices, rankings, ratings, scheduling, anonymous participation, QR sharing and clear results — without making voters create an account.</p><div class="grid"><div><h3>⚡ Fast to create</h3><p class="muted">Start from a poll type or ready-made template and launch in seconds.</p></div><div><h3>📱 Easy to share</h3><p class="muted">Use a direct link or QR code on any phone, tablet or computer.</p></div><div><h3>📊 Clear results</h3><p class="muted">See vote counts, percentages, rankings and summaries at a glance.</p></div><div><h3>🖼️ Built for visual decisions</h3><p class="muted">Compare AI images, logos, designs, products, invitations and creative concepts.</p></div></div></section>`;
 hero.parentNode.insertBefore(section,hero.nextSibling);
 qsa('.quick-template',section).forEach(b=>b.onclick=()=>{const base=qs(`[data-create="${b.dataset.type}"]`);if(base){base.click();setTimeout(()=>{const title=qs('#title');if(title){title.value=b.dataset.question;title.dispatchEvent(new Event('input',{bubbles:true}))}},30)}});
}
function currentPoll(){const title=qs('.poll-head h1')?.textContent?.trim();if(!title)return null;try{return (JSON.parse(localStorage.getItem('picksy.polls')||'[]')).find(p=>p.title===title)||null}catch{return null}}
function addResultTools(){
 const share=qs('.sharebox'); if(!share||qs('#resultTools'))return; const p=currentPoll();
 const box=document.createElement('div');box.id='resultTools';box.className='row wrap';box.style.marginTop='10px';
 box.innerHTML=`<button class="secondary" id="shareWhatsApp">Share on WhatsApp</button><button class="secondary" id="shareEmail">Share by email</button><button class="ghost" id="exportCsv">Export CSV</button><button class="ghost" id="embedPoll">Embed poll</button>`;
 share.after(box);
 const url=qs('#shareUrl')?.value||location.href,title=qs('.poll-head h1')?.textContent||'Picksy poll';
 qs('#shareWhatsApp').onclick=()=>window.open(`https://wa.me/?text=${encodeURIComponent(title+' '+url)}`,'_blank','noopener');
 qs('#shareEmail').onclick=()=>location.href=`mailto:?subject=${encodeURIComponent('Vote: '+title)}&body=${encodeURIComponent('I’d like your vote: '+url)}`;
 qs('#exportCsv').onclick=()=>{if(!p)return alert('Export is available for polls created on this browser.');let rows=['poll,option,votes'];const counts={};(p.options||[]).forEach(o=>counts[o.id]=0);(p.votes||[]).forEach(v=>{if(v.optionId in counts)counts[v.optionId]++});(p.options||[]).forEach(o=>rows.push([p.title,o.label,counts[o.id]||0].map(v=>'"'+String(v??'').replaceAll('"','""')+'"').join(',')));const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.join('\n')],{type:'text/csv'}));a.download='picksy-results.csv';a.click();URL.revokeObjectURL(a.href)};
 qs('#embedPoll').onclick=async()=>{const code=`<iframe src="${url}" title="${esc(title)}" width="100%" height="650" style="border:0;border-radius:16px" loading="lazy"></iframe>`;try{await navigator.clipboard.writeText(code);qs('#embedPoll').textContent='Embed code copied!'}catch{prompt('Copy this embed code:',code)}};
}
function addCreateTips(){const panel=qs('.poll-wrap .panel');if(!panel||!qs('#publish')||qs('#creatorTips'))return;const n=document.createElement('div');n.id='creatorTips';n.className='notice';n.innerHTML='<strong>Tip:</strong> Keep the question short and options distinct. Preview before sharing for better response quality.';qs('#publish').parentElement.before(n)}
const observer=new MutationObserver(()=>{removeAds();addHomeContent();addResultTools();addCreateTips()});observer.observe(document.documentElement,{subtree:true,childList:true});
removeAds();addHomeContent();
})();