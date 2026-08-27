import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

const BASE='https://picksy-topaz.vercel.app';

const TOOLS={
  'image-poll':{
    icon:'🖼️',name:'Image Poll',title:'Free Image Poll Maker – Compare Images & Vote | Picksy',
    description:'Create a free image poll to compare 2–6 photos, AI images, designs or product options. Share one link and let people vote for their favorite.',
    keywords:['image poll','image voting','photo poll','compare images','AI image poll','A/B image poll','vote on images'],
    heading:'Create a free image poll',sub:'Upload 2–6 images, share one link and see which option people prefer.',
    createLabel:'Create an image poll',type:'image',
    bullets:['Compare AI-generated images, logos, designs or photos','Optional labels and voter comments','No voter account required','Instant vote results']
  },
  'multiple-choice-poll':{
    icon:'📊',name:'Multiple Choice Poll',title:'Free Multiple Choice Poll Maker – Online Voting | Picksy',
    description:'Create a free multiple choice poll online. Ask a question, add answer options, share the link and collect votes without requiring voter accounts.',
    keywords:['multiple choice poll','online poll maker','free poll maker','create a poll','online voting','question poll'],
    heading:'Create a multiple choice poll',sub:'Ask a question, add choices and get a clear group decision.',
    createLabel:'Create a multiple choice poll',type:'choice',
    bullets:['Flexible answer options','Shareable poll link','No voter login required','Simple real-time results']
  },
  'ranking-poll':{
    icon:'🏆',name:'Ranking Poll',title:'Free Ranking Poll Maker – Rank Choices Online | Picksy',
    description:'Create a free ranking poll and let people order choices from favorite to least favorite. Great for ideas, names, priorities, restaurants and group decisions.',
    keywords:['ranking poll','rank choices','ranked choice poll','preference ranking','idea ranking tool','online ranking poll'],
    heading:'Create a ranking poll',sub:'Let everyone rank the options instead of choosing only one.',
    createLabel:'Create a ranking poll',type:'rank',
    bullets:['Rank choices from best to worst','Useful for priorities and group preferences','No voter account required','Weighted ranking results']
  },
  'rating-poll':{
    icon:'⭐',name:'Rating Poll',title:'Free 1–5 Star Rating Poll Maker | Picksy',
    description:'Create a quick 1–5 star rating poll and collect feedback with a shareable link. Free, simple and no voter account required.',
    keywords:['rating poll','star rating poll','1 to 5 rating','online rating tool','feedback rating poll'],
    heading:'Create a 1–5 star rating poll',sub:'Collect quick ratings and see the average score instantly.',
    createLabel:'Create a rating poll',type:'rate',
    bullets:['Simple 1–5 star voting','Average rating summary','Fast feedback collection','No voter login required']
  },
  'date-poll':{
    icon:'📅',name:'Date Poll',title:'Free Date Poll – Find the Best Date for Everyone | Picksy',
    description:'Create a free date poll to find the best day or time for a meeting, dinner, party or event. Add options, share the link and collect votes.',
    keywords:['date poll','pick a date poll','meeting date poll','schedule poll','best date finder','event date voting'],
    heading:'Find the best date for the group',sub:'Add possible dates or times and let everyone vote on what works best.',
    createLabel:'Create a date poll',type:'date',
    bullets:['Compare multiple dates or times','Works for meetings, events and parties','Share one simple link','No voter account required']
  },
  'potluck-poll':{
    icon:'🍴',name:'Potluck Planner',title:'Free Potluck Sign Up & Poll – Who’s Bringing What? | Picksy',
    description:'Plan a potluck online with a free shareable sign-up poll. Guests choose a category, add their name and say what dish they are bringing.',
    keywords:['potluck sign up','potluck planner','potluck poll','who is bringing what','potluck signup sheet','online potluck list'],
    heading:'Plan a potluck without the group chat chaos',sub:'Let guests claim a category and tell everyone what they are bringing.',
    createLabel:'Create a potluck poll',type:'potluck',
    bullets:['Guests add their name and dish','Track appetizers, mains, sides, desserts and drinks','Shareable online sign-up','No account required for guests']
  },
  'feedback-poll':{
    icon:'💬',name:'Feedback Poll',title:'Free Feedback Poll – Vote & Collect Written Reasons | Picksy',
    description:'Create a free feedback poll where people vote and optionally explain why. Useful for design reviews, ideas, products and team decisions.',
    keywords:['feedback poll','collect feedback','vote with comments','design feedback poll','online feedback tool'],
    heading:'Collect votes and the reason behind them',sub:'Get a clear choice plus optional written feedback from voters.',
    createLabel:'Create a feedback poll',type:'feedback',
    bullets:['Vote plus optional written reason','Great for designs, ideas and products','Shareable poll link','No voter account required']
  },
  'yes-no-poll':{
    icon:'👍',name:'Yes / No Poll',title:'Free Yes or No Poll Maker – Quick Online Vote | Picksy',
    description:'Create a free yes or no poll in seconds. Ask a simple question, share the link and get instant binary voting results.',
    keywords:['yes no poll','yes or no poll','binary poll','quick poll','simple online poll','yes no voting'],
    heading:'Create a quick yes or no poll',sub:'Perfect when the decision only needs a simple yes or no.',
    createLabel:'Create a yes / no poll',type:'yesno',
    bullets:['Instant yes/no choices','Fast group decisions','Simple shareable link','No voter account required']
  }
} as const;

type ToolSlug=keyof typeof TOOLS;

export function generateStaticParams(){return Object.keys(TOOLS).map(slug=>({slug}));}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;const tool=TOOLS[slug as ToolSlug];if(!tool)return {};
  const url=`${BASE}/${slug}`;
  return {
    title:tool.title,
    description:tool.description,
    keywords:[...tool.keywords],
    alternates:{canonical:url},
    openGraph:{title:tool.title,description:tool.description,url,type:'website',siteName:'Picksy'},
    twitter:{card:'summary_large_image',title:tool.title,description:tool.description}
  };
}

export default async function ToolLandingPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;const tool=TOOLS[slug as ToolSlug];if(!tool)notFound();
  const url=`${BASE}/${slug}`;
  const schema={
    '@context':'https://schema.org','@type':'WebApplication',name:`Picksy ${tool.name}`,url,
    applicationCategory:'UtilitiesApplication',operatingSystem:'Any',description:tool.description,
    offers:{'@type':'Offer',price:'0',priceCurrency:'USD'},featureList:tool.bullets
  };
  return <main className="tool-shell">
    <header className="tool-top"><a href="/" className="brand"><span className="brandmark">P</span><span>Picksy</span></a><nav><a className="ghost" href="/wheel">Spin wheel</a><a className="ghost" href="/giveaway">Giveaway picker</a></nav></header>
    <section className="tool-hero compact"><span className="eyebrow">{tool.icon} {tool.name}</span><h1>{tool.heading}</h1><p>{tool.sub}</p><div className="actions" style={{marginTop:22}}><a className="primary" href={`/?create=${tool.type}`}>{tool.createLabel}</a></div></section>
    <section className="panel seo-tool-copy" style={{maxWidth:820,margin:'0 auto'}}><h2>Free, simple and made for quick decisions</h2><p>{tool.description}</p><div className="trust-strip">{tool.bullets.map(x=><div key={x}>✓ {x}</div>)}</div><h2>How it works</h2><p>Create your poll, add the choices you want people to consider, then share the poll with friends, customers, coworkers or your group. Picksy keeps the voting experience lightweight so people can respond without creating an account.</p><div className="actions" style={{justifyContent:'flex-start'}}><a className="secondary" href={`/?create=${tool.type}`}>Start this poll</a><a className="ghost" href="/">See all poll types</a></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}} />
  </main>;
}
