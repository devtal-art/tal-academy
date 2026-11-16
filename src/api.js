import {wa} from "./data.js";
// STAGE 1: lead opens WhatsApp. STAGE 2: replace body with fetch("/api/leads",{method:"POST",body:JSON.stringify(l)})
export async function submitLead(l){
  const t=`Hi TAL Academy!\nName: ${l.name}\nPhone: ${l.phone}\nQualification: ${l.qual}\nCourse: ${l.course}\nMode: ${l.mode}${l.msg?"\nMessage: "+l.msg:""}`;
  window.open(wa(t),"_blank");return true}
