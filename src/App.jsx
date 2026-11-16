import {useEffect,useRef,useState} from "react";
import {Routes,Route,NavLink,Link,useLocation} from "react-router-dom";
import {motion,useScroll,useSpring} from "framer-motion";
import {IMG,TECH,QUAL,COURSES,PROJECTS,WHY,JOURNEY,FAQ,SERVICES,WORKFLOW,EMAIL,wa} from "./data.js";
import {submitLead} from "./api.js";

const Logo=({big})=><span className={"logo"+(big?" big":"")}>{"TAL ACADEMY".split("").map((c,i)=><i key={i} style={{animationDelay:i*60+"ms"}}>{c===" "?"\u00A0":c}</i>)}</span>;
const R=({children,d=0,c="",x=0})=><motion.div className={c} initial={{opacity:0,y:40,x}} whileInView={{opacity:1,y:0,x:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:.7,delay:d/1000,ease:[.22,1,.36,1]}}>{children}</motion.div>;
function Count({to,suf="+"}){const r=useRef(),[n,s]=useState(0);
 useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(!e.isIntersecting)return;o.disconnect();let t0;const f=t=>{t0??=t;const p=Math.min((t-t0)/1500,1);s(Math.round(to*(1-Math.pow(1-p,3))));p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)});o.observe(r.current);return()=>o.disconnect()},[to]);
 return <b ref={r}>{n}{suf}</b>}
const Img=({src,alt,c=""})=><div className={"img "+c}><img src={src} alt={alt} loading="lazy"/></div>;
const Head=({k,t,p})=><R c="head"><p className="kick">{k}</p><h2>{t}</h2>{p&&<p className="sub">{p}</p>}</R>;
const Hero=({k,t,p})=><section className="phero"><div className="grid-bg"/><motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}><p className="kick">{k}</p><h1>{t}</h1><p>{p}</p></motion.div></section>;
const Chat=({t,children,c="btn"})=><a className={c} href={wa(t)} target="_blank" rel="noreferrer">{children}</a>;
const Marq=({items})=><div className="marq"><div>{[0,1].map(k=><span key={k}>{items.map(x=><em key={x}>{x}<b>✦</b></em>)}</span>)}</div></div>;

function Lead({course="",title="Get free career counselling",dark}){
 const [f,setF]=useState({name:"",phone:"",qual:QUAL[0],course:course||COURSES[0].name,mode:"Classroom",msg:""}),[ok,setOk]=useState(false);
 useEffect(()=>{course&&setF(x=>({...x,course}))},[course]);
 const ch=e=>setF({...f,[e.target.name]:e.target.value});
 return <form className={"lead"+(dark?" dk":"")} onSubmit={async e=>{e.preventDefault();setOk(await submitLead(f))}}>
  <h3>{title}</h3><div className="two-f"><input name="name" placeholder="Full name" required value={f.name} onChange={ch}/><input name="phone" placeholder="WhatsApp number" required pattern="[0-9+ ]{10,15}" value={f.phone} onChange={ch}/></div>
  <div className="two-f"><select name="qual" value={f.qual} onChange={ch}>{QUAL.map(x=><option key={x}>{x}</option>)}</select><select name="mode" value={f.mode} onChange={ch}>{["Classroom","Online"].map(x=><option key={x}>{x}</option>)}</select></div>
  <select name="course" value={f.course} onChange={ch}>{COURSES.map(c=><option key={c.id}>{c.name}</option>)}</select>
  <button className={"btn"+(dark?" inv":"")}>Send enquiry on WhatsApp →</button>{ok&&<p className="ok">Opening WhatsApp… we'll reply shortly ✓</p>}</form>}

const Code=()=><div className="code"><div className="dots"><i/><i/><i/><span>training.config.ts</span></div>
 {["const student = {","  skills: ['React','Node','AI'],","  project: 'Live build',","  mentor: 'Industry dev',","};","","await student.learn();","deploy(student.project); ✓"].map((l,i)=><pre key={i} style={{animationDelay:.8+i*.35+"s"}}>{l||" "}</pre>)}</div>;

function Home(){const tot=COURSES.reduce((a,c)=>a+c.modules.length,0);return <>
 <section className="hero"><div className="grid-bg"/><div className="glow"/>
  <div className="hero-t"><motion.p className="kick" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:.2}}>IT Industrial Training · Live Projects · Careers</motion.p>
  <h1>{["Learn the tech","companies actually","hire for."].map((l,i)=><span key={i} className="line"><span style={{animationDelay:.3+i*.18+"s"}}>{l}</span></span>)}</h1>
  <p className="lead">Industry-led training in React, Next.js, Node.js, Laravel, mobile apps and AI. Build real projects and get ready for your first tech job.</p>
  <div className="row"><Link className="btn" to="/trainings">View full syllabus →</Link><Chat c="btn ghost" t="Hi TAL Academy, I want counselling for training.">Talk on WhatsApp</Chat></div></div>
  <Code/></section>
 <Marq items={TECH}/>
 <section className="stats">{[[COURSES.length,"Training tracks"],[tot,"Practical modules"],[TECH.length,"Modern technologies"],[PROJECTS.length,"Live projects"]].map(([n,l],i)=><R key={l} d={i*100}><Count to={n}/><span>{l}</span></R>)}</section>
 <section className="sec two"><R><Img src={IMG.hero} alt="Learn by coding"/></R><R d={150}><p className="kick">Hands-on from day one</p><h2>Write real code, ship real projects</h2><p>Live sessions, weekly reviews and a final demo day — all inside a professional development workflow.</p><Link className="btn" to="/trainings">See all modules →</Link></R></section>
 <section className="sec"><Head k="Why TAL Academy" t="Training built around real work" p="Not just theory. You learn the way professional teams build software."/>
  <div className="bento">{WHY.map(([t,d],i)=><R key={t} d={i*80} c={"card"+(i===0?" wide":"")}><span className="num">0{i+1}</span><h3>{t}</h3><p>{d}</p></R>)}</div></section>
 <section className="sec dark"><div className="in"><Head k="Programmes" t="Pick your track" p="Each track has 6 hands-on modules and ends with a project you can show employers."/>
  <div className="grid3">{COURSES.map((c,i)=><R key={c.id} d={i*70}><Link to={"/trainings#"+c.id} className="card ln"><span className="num">{c.modules.length} modules</span><h3>{c.name}</h3><div className="chips">{c.tools.slice(0,4).map(t=><em key={t}>{t}</em>)}</div><span className="arr">Explore →</span></Link></R>)}</div></div></section>
 <section className="sec"><Head k="Your path" t="From first message to certificate"/><div className="steps">{JOURNEY.map(([t,d],i)=><R key={t} d={i*90} c="step"><b>0{i+1}</b><h4>{t}</h4><p>{d}</p></R>)}</div></section>
 <section className="sec dark"><div className="in two"><R><Img src={IMG.lab} alt="Training lab"/></R><R d={150}><Lead dark/></R></div></section></>}

function About(){return <><Hero k="About Us" t="We train developers the industry way" p="TAL Academy turns learners into confident, job-ready developers through real projects."/>
 <section className="sec two"><R><Img src={IMG.team} alt="Team"/></R><R d={150}><h2>Built by developers, for learners</h2><p>Our mentors build websites, apps and business software every day. That experience goes straight into the classroom — real workflows, real code reviews, real deployments.</p><p>Students leave with a working project, a GitHub portfolio and the confidence to explain what they built.</p><Chat t="Hi TAL Academy, I'd like to know more.">Talk to our team</Chat></R></section>
 <section className="sec dark"><div className="in"><Head k="How we teach" t="The project lifecycle, every time"/><div className="flow">{WORKFLOW.map((w,i)=><R key={w} d={i*80} c="fl"><b>{i+1}</b>{w}</R>)}</div></div></section>
 <section className="sec"><Head k="Our approach" t="What makes us different"/><div className="grid3">{[["Learn by building","Assignments and milestone reviews lead to a final demo."],["Right level, right group","We assess skills and group students by learning needs."],["Honest guidance","Clear expectations, transparent terms and no false promises."]].map(([t,d],i)=><R key={t} d={i*100} c="card"><h3>{t}</h3><p>{d}</p></R>)}</div></section></>}

function Trainings(){const {hash}=useLocation();const [id,setId]=useState(hash.slice(1)||COURSES[0].id),[o,setO]=useState(0);
 useEffect(()=>{hash&&COURSES.some(c=>c.id===hash.slice(1))&&setId(hash.slice(1))},[hash]);const c=COURSES.find(x=>x.id===id);
 return <><Hero k="Trainings" t="Full training modules" p="Seven tracks. Modern technologies. One project that proves your skills."/>
 <section className="sec"><div className="tabs">{COURSES.map(x=><button key={x.id} className={x.id===id?"on":""} onClick={()=>setId(x.id)}>{x.name}</button>)}</div>
  <motion.div key={id} className="course" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
   <div className="cinfo"><Img src={IMG.code} alt={c.name}/><p className="kick">{c.level}</p><h2>{c.name}</h2><div className="chips">{c.tools.map(t=><em key={t}>{t}</em>)}</div><div className="build"><span>You will build</span>{c.build}</div>
    <Chat t={`Hi, I want the syllabus and details for ${c.name}.`}>Get syllabus on WhatsApp</Chat></div>
   <ol className="mods">{c.modules.map(([t,d],i)=><li key={t} className={o===i?"open":""} onClick={()=>setO(i)}><b>Module {i+1}</b><h4>{t}</h4><p>{d}</p></li>)}</ol></motion.div></section>
 <section className="sec dark"><div className="in"><Head k="Live projects" t="Graduate with a portfolio"/><div className="grid3">{PROJECTS.map(([a,b],i)=><R key={a} d={i*80} c="card"><span className="num">Project 0{i+1}</span><h3>{a}</h3><p>{b}</p></R>)}</div></div></section>
 <section className="sec"><Head k="Career support" t="More than classes" p="Resume building · GitHub profile · Mock interviews · Internship & career guidance"/>
  <div className="two"><div>{FAQ.map(([q,a],i)=><div key={q} className={"faq"+(o===100+i?" open":"")}><button onClick={()=>setO(o===100+i?-1:100+i)}>{q}<span>{o===100+i?"−":"+"}</span></button><div><p>{a}</p></div></div>)}</div><R><Lead course={c.name} title={`Enquire about ${c.name}`}/></R></div></section></>}

function Services(){return <><Hero k="Services" t="Software that grows your business" p="Websites, apps, custom software and AI — built by the same team that trains."/>
 <section className="sec"><div className="grid3">{SERVICES.map(([t,d,l],i)=><R key={t} d={i*90} c="card big"><span className="num">0{i+1}</span><h3>{t}</h3><p>{d}</p><div className="chips">{l.map(x=><em key={x}>{x}</em>)}</div><Chat c="arr" t={`Hi, I need a quote for ${t}.`}>Get a quote →</Chat></R>)}</div></section>
 <Marq items={TECH}/>
 <section className="sec dark"><div className="in"><Head k="Our process" t="From idea to launch"/><div className="flow">{WORKFLOW.map((w,i)=><R key={w} d={i*80} c="fl"><b>{i+1}</b>{w}</R>)}</div></div></section>
 <section className="cta"><R><h2>Have a project in mind?</h2><Chat c="btn inv" t="Hi TAL Academy, I have a project.">Start on WhatsApp</Chat></R></section></>}

function Contact(){return <><Hero k="Contact Us" t="Let's talk" p="Training enquiry or project — we reply on WhatsApp."/>
 <section className="sec two"><R><Lead title="Send us your enquiry"/></R><R d={150}><Img src={IMG.desk} alt="Workspace"/><p className="info">✉ {EMAIL}<br/>💬 WhatsApp — tap the green button</p></R></section></>}

export default function App(){const [load,setLoad]=useState(true),[m,setM]=useState(false),{pathname}=useLocation();
 const {scrollYProgress}=useScroll(),sx=useSpring(scrollYProgress,{stiffness:120,damping:25});
 useEffect(()=>{const t=setTimeout(()=>setLoad(false),1800);return()=>clearTimeout(t)},[]);
 useEffect(()=>{window.scrollTo(0,0);setM(false)},[pathname]);
 useEffect(()=>{const f=e=>{const c=e.target.closest?.(".card");if(c){const r=c.getBoundingClientRect();c.style.setProperty("--x",e.clientX-r.left+"px");c.style.setProperty("--y",e.clientY-r.top+"px")}};document.addEventListener("pointermove",f);return()=>document.removeEventListener("pointermove",f)},[]);
 return <>{load&&<div className="pre"><Logo big/></div>}<motion.div className="bar" style={{scaleX:sx}}/>
 <header><Link to="/"><Logo/></Link><button className="burger" onClick={()=>setM(!m)} aria-label="Menu">☰</button>
  <nav className={m?"open":""}>{[["/","Home"],["/about","About Us"],["/trainings","Trainings"],["/services","Services"],["/contact","Contact Us"]].map(([p,n])=><NavLink key={p} to={p} end>{n}</NavLink>)}<Chat c="navbtn" t="Hi TAL Academy!">Enquire</Chat></nav></header>
 <motion.main key={pathname} initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.5}}><Routes><Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/trainings" element={<Trainings/>}/><Route path="/services" element={<Services/>}/><Route path="/contact" element={<Contact/>}/></Routes></motion.main>
 <footer><Logo/><p>IT Industrial Training · Live Projects · Software Services</p><small>© {new Date().getFullYear()} TAL Academy</small></footer>
 <a className="wa" href={wa("Hi TAL Academy!")} target="_blank" rel="noreferrer" aria-label="WhatsApp"><span>Chat with us</span><svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 3a13 13 0 0 0-11 19.8L3 29l6.4-2A13 13 0 1 0 16 3zm0 23.7c-2 0-3.900-.6-5.500-1.600l-.4-.2-3.800 1.200 1.200-3.700-.3-.4A10.700 10.700 0 1 1 16 26.700zm5.900-8c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.5c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1 1-1 2.400s1 2.800 1.200 3c.1.200 2 3 4.800 4.200 1.800.8 2.500.8 3.400.7.500-.1 1.700-.7 1.900-1.300.2-.7.200-1.200.2-1.300-.1-.2-.3-.3-.6-.4z"/></svg></a></>}
