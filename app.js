import {documentOf,index,search,dates,html,brief,calendar,askModel} from './core.js';
const $=id=>document.getElementById(id);
let docs=[], hits=[], activeQuery='', mode='Deterministic literal search', events=[];
const status=(text,error=false)=>{ $('status').textContent=text; $('status').className=error?'error':''; };
function renderLibrary(){
 $('source-list').innerHTML=docs.map((d,i)=>`<div class="source"><span class="sid">S${i+1}</span><div><strong>${html(d.title)}</strong><p>${d.text.split('\n').length} lines · ${d.text.length.toLocaleString()} characters</p><span class="synthetic">${d.synthetic?'SYNTHETIC EXAMPLE':'USER SOURCE · UNVERIFIED'}</span></div></div>`).join('')||'<p class="hint">Your library is empty. Add a source or try the synthetic example.</p>';
 events=dates(index(docs));
 $('dates').innerHTML=events.map((e,i)=>`<div class="date-item"><label><input type="checkbox" data-event="${i}"><span><time>${e.date}</time>${html(e.kind)}</span></label><p>${html(e.quote)}</p><small>${e.id} ${e.synthetic?'· SYNTHETIC':''}</small></div>`).join('')||'<p class="hint">No valid YYYY-MM-DD dates found.</p>';
}
function renderHits(){
 $('mode').textContent=mode.startsWith('Deterministic')?'DETERMINISTIC · NO AI':'ACTUAL MODEL · VALIDATED';
 $('results').innerHTML=hits.map(r=>`<article class="claim"><span class="locator">${r.id} · ${html(r.title)}</span> <span class="synthetic">${r.synthetic?'SYNTHETIC':''}</span><blockquote>${html(r.quote)}</blockquote><details><summary>Inspect original source · line ${r.line}</summary><pre>${html(docs[Number(r.source.slice(1))-1].text.split('\n').map((s,i)=>`${i+1}  ${s}`).join('\n'))}</pre></details></article>`).join('')||'<div class="empty"><strong>No supporting excerpt found.</strong><p>Try words used in your sources, or add evidence.<br>No answer has been inferred.</p></div>';
}
function run(){try{activeQuery=$('query').value.trim(); mode='Deterministic literal search';hits=search(index(docs),activeQuery);renderHits(); status(`${hits.length} matching excerpts · all query words required · maximum 30 results. Source statements, not verified facts.`);}catch(e){status(e.message,true);}}
$('search-form').onsubmit=e=>{e.preventDefault();run();};
document.querySelectorAll('[data-query]').forEach(b=>b.onclick=()=>{$('query').value=b.dataset.query;run();});
$('add-form').onsubmit=e=>{e.preventDefault();try{if(docs.length>=12)throw Error('Source limit reached. Clear the library to start again.');docs.push(documentOf($('title').value,$('source-text').value,$('synthetic').checked));$('add-form').reset();renderLibrary();run();}catch(e){status(e.message,true);}};
$('upload').onchange=async()=>{try{const file=$('upload').files[0];if(!file)return;if(file.size>400000||!file.name.toLowerCase().endsWith('.txt'))throw Error('Choose a .txt file smaller than 400 KB.');const text=await file.text();documentOf(file.name,text);$('source-text').value=text;$('title').value=file.name;status('File read locally. Confirm permission, then add it to the library.');}catch(e){$('upload').value='';status(e.message,true);}};
$('clear').onclick=()=>{docs=[];hits=[];renderLibrary();run();};
async function examples(){try{const response=await fetch('./fixtures/synthetic.json');if(!response.ok)throw Error('Example could not be loaded.');docs=(await response.json()).map(d=>documentOf(d.title,d.text,true));renderLibrary();run();}catch(e){status(e.message,true);}}
$('example').onclick=examples;
function download(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
$('brief').onclick=()=>download('agrievidence-brief.md',brief(docs,hits,activeQuery,mode),'text/markdown;charset=utf-8');
$('ics').onclick=()=>{const selected=[...document.querySelectorAll('[data-event]:checked')].map(c=>events[Number(c.dataset.event)]);if(!selected.length){status('Select at least one reviewed date before exporting.',true);return;}download('agrievidence-dates.ics',calendar(selected),'text/calendar;charset=utf-8');status(`Exported ${selected.length} all-day date reminders. Verify against original sources.`);};
let revision=0; // Reject stale model responses if the library/query changes mid-request.
$('add-form').addEventListener('submit',()=>revision++);$('clear').addEventListener('click',()=>revision++);$('example').addEventListener('click',()=>revision++);$('query').addEventListener('input',()=>revision++);$('search-form').addEventListener('submit',()=>revision++);document.querySelectorAll('[data-query]').forEach(b=>b.addEventListener('click',()=>revision++));
$('model-run').onclick=async()=>{const rev=revision, query=$('query').value.trim();$('model-run').disabled=true;status('Contacting your local Ollama model… (45 second timeout)');try{const result=await askModel(index(docs),query,$('model-name').value);if(rev!==revision)throw Error('Library or query changed. Discarded stale model output.');hits=result;activeQuery=query;mode=`Actual local model: ${$('model-name').value}`;renderHits();status(`${hits.length} exact citations validated. Model relevance and source truth still require human review.`);}catch(e){status(e.message+' Existing evidence remains available.',true);}finally{$('model-run').disabled=false;}};
examples();
