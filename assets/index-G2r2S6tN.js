(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const ss=600,_h=["A+","A-","B+","B-","AB+","AB-","O+","O-"],vn={complete:{name:"Complete Routine",short:"Complete",price:79,description:"Checks the patient’s blood group and antibodies, plus one selected donor unit."},type:{name:"Type and Screen",short:"Type and Screen",price:59,description:"Checks the patient’s blood group and looks for antibodies that may affect donor matching."},match:{name:"Match Only",short:"Match Only",price:49,description:"Checks one additional donor unit using valid earlier patient test results."}},js=[{id:"DU-7001",group:"A+",antigens:["A","D"],label:"A positive, K negative"},{id:"DU-7002",group:"B+",antigens:["B","D"],label:"B positive, K negative"},{id:"DU-7003",group:"A+",antigens:["A","D","K"],label:"A positive, K positive"},{id:"DU-7004",group:"O-",antigens:[],label:"O negative, K negative"},{id:"DU-7005",group:"A-",antigens:["A"],label:"A negative, K negative"},{id:"DU-7006",group:"B-",antigens:["B"],label:"B negative, K negative"},{id:"DU-7007",group:"AB+",antigens:["A","B","D"],label:"AB positive, K negative"},{id:"DU-7008",group:"AB-",antigens:["A","B"],label:"AB negative, K negative"},{id:"DU-7009",group:"O+",antigens:["D"],label:"O positive, K negative"}],Ji=[{id:"routine",title:"Routine test",subtitle:"Run the required checks, then review the results before approval.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Routine"},{id:"abo",title:"Donor blood group does not match",subtitle:"The patient sample reacts with cells from a donor with the wrong blood group.",group:"A+",donor:"DU-7002",screen:"negative",kind:"Investigation"},{id:"antibody",title:"Same blood group, donor reaction",subtitle:"Matching blood-group labels can still lead to a reaction with the selected donor.",group:"A+",donor:"DU-7003",screen:"positive",kind:"Investigation",antibody:"K"},{id:"screen",title:"Antibody check finds a reaction",subtitle:"The antibody check finds a reaction that needs further laboratory investigation.",group:"A+",donor:"DU-7001",screen:"positive",kind:"Investigation",antibody:"K"},{id:"weak",title:"Weak reaction",subtitle:"A weak reaction needs review before the result can be approved.",group:"O+",donor:"DU-7009",screen:"weak",kind:"Investigation",antibody:"K"},{id:"equivocal",title:"Unclear reaction image",subtitle:"The camera image is unclear. The test cannot be called positive or negative.",group:"B+",donor:"DU-7002",screen:"equivocal",kind:"Investigation"},{id:"mismatch",title:"Sample ID does not match",subtitle:"The sample barcode does not match the selected patient and test order.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Identification",faults:["wrong-patient"]},{id:"qc",title:"Quality check failed",subtitle:"A required quality check fails, so the test result cannot be approved.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Quality control",faults:["control"]},{id:"urgent",title:"Urgent request",subtitle:"An urgent request starts in an available bay while other tests continue.",group:"O-",donor:"DU-7004",screen:"negative",kind:"Urgent"},{id:"massive",title:"Major bleeding emergency",subtitle:"The hospital’s emergency blood-release process continues while testing runs.",group:"O-",donor:"DU-7004",screen:"negative",kind:"Emergency"},{id:"volume",title:"Several samples at once",subtitle:"Different samples can run at the same time in separate bays.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Workload"},{id:"network",title:"Connection lost",subtitle:"The result stays on the machine while it waits for the hospital connection.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Communication",disconnected:!0},{id:"mechanical",title:"One test bay is unavailable",subtitle:"One bay is unavailable. Other bays may continue if the shared systems pass their checks.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Instrument",unavailableBays:[1]},{id:"expired",title:"Expired test kit",subtitle:"The test kit has expired and must be replaced.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Preflight",faults:["expired"]},{id:"insufficient",title:"Not enough sample",subtitle:"There is not enough sample to complete the required tests and quality checks.",group:"A+",donor:"DU-7001",screen:"negative",kind:"Preflight",faults:["insufficient"]}],Mi=[{time:0,label:"Verify & load",description:"Match patient, specimen and order; identify the cartridge and donor unit."},{time:45,label:"Sample routing",description:"Meter patient red cells and plasma into their separate test pathways."},{time:135,label:"Reagent delivery",description:"Deliver the assay-specific reagents and reference red cells."},{time:240,label:"Controlled reactions",description:"Maintain the proposed assay conditions and observe reaction development."},{time:420,label:"Optical imaging",description:"Illuminate each chamber and compare its image with the reference patterns."},{time:510,label:"Interpret & check",description:"Reconcile grouping, screening, donor-specific findings and required QC."},{time:600,label:"Qualified review",description:"A qualified laboratory reviewer evaluates the evidence before authorisation."}],Za=[{id:"wrong-patient",name:"Patient and sample IDs do not match",detail:"The sample belongs to a different patient. Correct the identification before testing."},{id:"expired",name:"Expired test kit",detail:"The cartridge has expired. Replace it before testing."},{id:"optical",name:"Camera view blocked",detail:"The camera cannot read the test area clearly. Check the camera path and repeat the test."},{id:"bubble",name:"Air bubble",detail:"A bubble interrupts chamber filling and optical interpretation. Replace or repeat."},{id:"control",name:"Quality check failed",detail:"The required positive quality check did not react as expected. The test result is invalid."},{id:"insufficient",name:"Not enough sample",detail:"There is not enough sample to fill the required test areas."},{id:"temperature",name:"Test temperature or timing out of range",detail:"The test temperature or timing is outside its accepted range."},{id:"maintenance",name:"Machine service due",detail:"The machine needs its required service checks before testing."},{id:"discrepancy",name:"Blood group checks disagree",detail:"The blood group checks do not agree. Further laboratory investigation is needed."},{id:"cartridge",name:"Test kit ID does not match",detail:"The test kit ID does not match the selected test order."}],yh=new Set(["wrong-patient","expired","insufficient","maintenance","cartridge"]),Rc={urgent:0,routine:1,special:2,review:3},Ja={A:["A"],B:["B"],AB:["A","B"],O:[]},Wt=(n,e)=>n.faults.includes(e),Qa=n=>String(n).replace(/[+−-]/g,""),kr=n=>String(n).endsWith("+"),bh=n=>String(n).replace("−","-"),id=n=>js.find(e=>e.id===n.donorId),Ko=n=>!Wt(n,"wrong-patient")&&n.patient.specimenValid&&n.patient.specimen===n.patient.expectedSpecimen&&n.patient.specimenPatientId===n.patient.id,Or=n=>n.patient.validPrior&&n.patient.priorWorkup?.group===n.patient.group&&n.patient.priorWorkup?.screen==="negative",ni=n=>n.elapsed>=ss,tt=(n,e)=>{n.audit.push({time:n.queueClock,elapsed:n.elapsed,event:e}),n.audit.length>500&&n.audit.shift()},xh=n=>`T+${String(Math.floor(n.queueClock/60)).padStart(2,"0")}:${String(Math.floor(n.queueClock%60)).padStart(2,"0")}`;function eo(n="routine"){const e=Ji.find(i=>i.id===n)||Ji[0],t=Ji.indexOf(e);return{scenarioId:e.id,patient:{id:`PT-${1042+t}`,specimen:e.id==="mismatch"?"SP-2099 / PT-9999":`SP-${2042+t}`,order:`OR-${3042+t}`,group:e.group,expectedSpecimen:`SP-${2042+t}`,specimenPatientId:e.id==="mismatch"?"PT-9999":`PT-${1042+t}`,history:e.antibody?`Known anti-${e.antibody} history`:"No known antibody history",antibodies:e.antibody?[e.antibody]:[],validPrior:e.screen==="negative",priorWorkup:e.screen==="negative"?{group:e.group,screen:"negative",recordId:`PRIOR-${1042+t}`,reviewer:"LAB-PRIOR-DEMO",time:0}:null,specimenValid:!0},donorId:e.donor,cartridge:"complete",config:2,elapsed:0,running:!1,status:(e.faults?.includes("wrong-patient"),"Awaiting testing"),verified:!1,faults:[...e.faults||[]],screen:e.screen,network:!e.disconnected,authorised:!1,handedOver:!1,reviewer:"",reviewNote:"",requiresRepeat:!1,manualHold:!1,bay:null,cycleSeconds:ss,queueClock:0,queueRunning:!1,sequence:0,queue:[],jobs:[],unavailableBays:[...e.unavailableBays||[]],emergencyRelease:e.id==="massive"?"Authorised emergency release proceeds independently. Do not wait for this test to finish.":"",audit:[{time:0,elapsed:0,event:`Case selected: ${e.title}.`}]}}function nr(n,e=""){n.elapsed=0,n.running=!1,n.status="Awaiting testing",n.authorised=!1,n.handedOver=!1,n.reviewer="",n.reviewNote="",n.requiresRepeat=!1,n.manualHold=!1,n.bay=null,e&&tt(n,e)}function Cc(n){n.authorised=!1,n.handedOver=!1,n.reviewer=""}function Zo(n){if(n.cartridge==="type")return{matched:!0,reactive:!1,reason:""};const e=id(n);if(!e)return{matched:!1,reactive:!1,reason:"Identify a donor unit for the requested crossmatch."};const t=Qa(n.patient.group),i=Ja[t]||[],r=(Ja[Qa(e.group)]||[]).some(l=>!i.includes(l)),o=n.patient.antibodies.some(l=>e.antigens.includes(l)),a=!kr(n.patient.group)&&kr(e.group);return{matched:!(r||o||a),reactive:r||o,reason:r?"Recipient ABO antibodies react with the selected donor red cells.":o?"The donor expresses an antigen targeted by the recipient’s known antibody.":a?"The RhD-positive donor does not meet the routine RhD-negative selection pathway.":""}}function sd(n){if(n.manualHold)return"A qualified review hold requires documented investigation and repeat testing.";const e=Zo(n);return n.cartridge==="match"&&!Or(n)?"Match Only requires a valid prior patient workup.":n.screen!=="negative"||n.patient.antibodies.length?"Further antibody investigation required":e.matched?"":e.reason}function Sh(n){ni(n)&&(n.running=!1,n.faults.length||n.requiresRepeat?n.status=Wt(n,"wrong-patient")||Wt(n,"discrepancy")?"Hold / investigate":"Invalid QC":sd(n)?n.status="Hold / investigate":n.handedOver?n.status="Completed handover":n.authorised?n.status=n.network?"Authorised":"Transfer pending":n.status="Ready for review")}function Ks(n){return ni(n)&&n.verified&&Ko(n)&&!n.running&&!n.faults.length&&!n.requiresRepeat&&!sd(n)&&!n.handedOver}function Hn(n){let e=0;return Mi.forEach((t,i)=>{n.elapsed>=t.time&&(e=i)}),e}function rs(n){const e=Qa(n.patient.group),t=Ja[e]||[],i=Zo(n),s=Wt(n,"optical")||Wt(n,"bubble"),r=(a,l,c,d,h,m,p,v)=>({id:a,name:l,input:c,reagent:d,positive:s?null:h,expectedPositive:h,grade:s?"Uninterpretable":v||(h===!0?"3+":h===!1?"0":"?"),interpretation:s?"Unable to interpret. Repeat or investigate.":p,kind:m,ready:n.elapsed>=(m==="typing"?420:510)}),o=[];if(n.cartridge!=="match"){o.push(r("anti-a","Forward ABO: Anti-A","Patient red cells","Anti-A",t.includes("A"),"typing",t.includes("A")?"A antigen detected":"No A-antigen reaction")),o.push(r("anti-b","Forward ABO: Anti-B","Patient red cells","Anti-B",t.includes("B"),"typing",t.includes("B")?"B antigen detected":"No B-antigen reaction")),o.push(r("anti-d","RhD typing: Anti-D","Patient red cells","Anti-D with appropriate controls",kr(n.patient.group),"typing",kr(n.patient.group)?"RhD-positive pattern":"RhD-negative pattern"));const a=!t.includes("A"),l=!t.includes("B");o.push({...r("reverse-a1","Reverse ABO: A1 cells","Patient plasma","Known reagent A1 red cells",Wt(n,"discrepancy")?!a:a,"typing",Wt(n,"discrepancy")?"Forward/reverse ABO discrepancy":a?"Expected anti-A reaction":"No expected ABO reactivity"),expectedPositive:a}),o.push(r("reverse-b","Reverse ABO: B cells","Patient plasma","Known reagent B red cells",l,"typing",l?"Expected anti-B reaction":"No expected ABO reactivity"));const c=n.screen;o.push(r("screen-i","Antibody screen: Cell I","Patient plasma","Selected reagent screening red cells, K positive",c==="negative"?!1:c==="equivocal"?null:!0,"screen",c==="negative"?"No screening reactivity detected":c==="equivocal"?"Unresolved reaction. Further investigation required.":"Further antibody investigation required",c==="weak"?"w+":c==="equivocal"?"?":void 0)),o.push(r("screen-ii","Antibody screen: Cell II","Patient plasma","Selected reagent screening red cells, K negative",!1,"screen","No reactivity detected with this screening cell")),o.push(r("screen-iii","Antibody screen: Cell III","Patient plasma","Selected complementary screening red cells, K positive",c==="positive","screen",c==="positive"?"Screening reactivity supports further antibody investigation":"No reactivity detected with this screening cell"))}return n.cartridge!=="type"&&o.push(r("crossmatch","Donor-specific crossmatch","Patient plasma",`Identified donor red cells: ${n.donorId||"not selected"}`,n.donorId?i.reactive:null,"crossmatch",n.donorId?i.reactive?"Reactive crossmatch. Hold donor unit and investigate.":n.screen==="equivocal"?"Crossmatch image nonreactive; unresolved screen still blocks authorisation.":"No reactivity detected. Other checks and qualified review remain required.":"Identify the donor sample before testing.")),o.push({...r("positive-control","Positive control","Method-specific reference material","Known positive reference",!Wt(n,"control"),"control",Wt(n,"control")?"Failed positive control. Result invalid.":"Expected positive control reaction observed"),expectedPositive:!0}),o.push(r("negative-control","Negative control","Method-specific reference material","Known negative reference",!1,"control","Expected negative control reaction observed")),o}function jr(n){const e=ni(n),t=(s,r,o,a,l=!1)=>({id:s,name:r,status:o.some(c=>Wt(n,c))?"fail":l&&!e?"pending":"pass",detail:a}),i=Zo(n);return[{id:"identity",name:"Patient, specimen & order",status:Ko(n)?n.verified?"pass":"pending":"fail",detail:Wt(n,"wrong-patient")?"Specimen belongs to a different patient. Testing is blocked.":n.verified?`${n.patient.id}, ${n.patient.specimen} and ${n.patient.order} agree.`:"Verify the three linked identifiers before testing."},t("cartridge","Cartridge identity",["cartridge"],"The cartridge type and identifier match the test order."),t("reagent","Reagent lot & expiry",["expired"],"Reagent lot and expiry are checked before loading."),t("controls","Positive & negative controls",["control"],Wt(n,"control")?"The positive control failed. Authorisation is blocked.":"Both method-specific reference patterns must agree with expectations.",!0),t("abo","ABO/RhD reconciliation",["discrepancy"],n.cartridge==="match"?"Match Only requires a valid prior blood-group result.":"Forward and reverse grouping must agree; special RhD results require investigation.",!0),{id:"screen",name:"Screen & weak-reaction review",status:n.screen==="negative"&&!n.patient.antibodies.length?e?"pass":"pending":"fail",detail:n.screen==="negative"&&!n.patient.antibodies.length?"No unexpected reactivity detected with the screening panel.":"A reactive, weak or unresolved screen, or known antibody history, requires specialist investigation."},t("optics","Optical calibration",["optical"],"Reference illumination and camera pattern must be interpretable.",!0),t("fluidics","Chamber fill & isolation",["bubble","insufficient"],"Check metered filling, channel isolation, leakage and bubbles.",!0),t("conditions","Assay conditions",["temperature"],"Temperature and timing are relative to the proposed method, not a universal clinical limit.",!0),t("maintenance","Maintenance & traceability",["maintenance"],"Instrument, reagent, cartridge and event records are retained locally."),{id:"donor",name:n.cartridge==="type"?"Donor crossmatch scope":"Donor selection & history",status:n.cartridge==="type"?"pass":!i.matched||n.cartridge==="match"&&!Or(n)?"fail":e?"pass":"pending",detail:n.cartridge==="type"?"Not requested. No donor-specific result is produced.":i.reason||(n.cartridge==="match"&&!Or(n)?"A valid prior patient workup is required.":"Unit identity, ABO/RhD selection and relevant antibody history checked.")},{id:"review",name:"Qualified authorisation",status:n.authorised?"pass":"pending",detail:n.authorised?`Reviewing operator: ${n.reviewer}.`:"A completed analytical cycle does not automatically authorise a result."},{id:"network",name:"Hospital result transfer",status:n.network?"pass":"pending",detail:n.network?n.authorised?"The authorised result is available for handover.":"Connection available. No unauthorised result is transmitted.":"Transfer pending. No receipt by the ward is assumed."},...n.requiresRepeat?[{id:"repeat",name:"Repeat required",status:"fail",detail:"A fault affected this run. Clearing the fault cannot validate the old result; repeat testing is required."}]:[]]}function Mh(n){const e=String(n||"Routine").toLowerCase();return e.startsWith("urgent")?"urgent":e.startsWith("special")?"special":e.startsWith("await")||e==="review"?"review":"routine"}function Os(n){if(!n.queueRunning)return;const e=new Set(n.jobs.filter(t=>t.status==="Testing").map(t=>t.bay));n.bay!==null&&!ni(n)&&e.add(n.bay),n.queue.sort((t,i)=>Rc[t.priorityKey]-Rc[i.priorityKey]||t.sequence-i.sequence);for(let t=1;t<=n.config&&n.queue.length;t++){if(e.has(t)||n.unavailableBays.includes(t))continue;const i=n.queue.shift();i.bay=t,i.startedAt=n.queueClock,i.status="Testing",n.jobs.push(i),e.add(t),tt(n,`${i.id} assigned to bay ${t} (${i.priority}).`)}n.queue.forEach((t,i)=>{t.position=i+1})}function wh(n,e,t){e=Math.min(48,Math.max(1,Math.floor(Number(e)||1)));const i=Mh(t),s={urgent:"Urgent",routine:"Routine",special:"Special investigation",review:"Awaiting review"}[i];for(let r=0;r<e;r++){const o=++n.sequence,a={id:`Q-${String(o).padStart(4,"0")}`,sample:`SP-Q${String(o).padStart(4,"0")}`,priority:s,priorityKey:i,sequence:o,bay:null,elapsed:0,status:i==="review"?"Ready for review":"Awaiting testing",cartridge:n.cartridge,duration:ss,queuedAt:n.queueClock,startedAt:null,completedAt:null};i==="review"?n.jobs.push(a):n.queue.push(a)}i!=="review"&&(n.queueRunning=!0),tt(n,`${e} ${s.toLowerCase()} request${e===1?"":"s"} added.`),Os(n)}function da(n,e){const t=Math.max(0,Math.min(86400,Number(e)||0));if(!n.running&&!n.queueRunning)return;let i=t;for(;i>0;){Os(n);const s=n.queueRunning?n.jobs.filter(l=>l.status==="Testing"):[];if(!(n.running||s.length>0)){n.queueRunning=!1;break}const o=s.map(l=>l.duration-l.elapsed);n.running&&o.push(ss-n.elapsed);const a=Math.min(i,...o.filter(l=>l>0));if(!Number.isFinite(a)||a<=0)break;if(n.queueClock+=a,n.running){const l=Hn(n);n.elapsed=Math.min(ss,n.elapsed+a);const c=Hn(n);l!==c&&tt(n,`Analytical stage: ${Mi[c].label}.`),ni(n)&&(Sh(n),tt(n,`Analytical cycle complete: ${n.status}. No automatic release.`))}for(const l of s)l.elapsed=Math.min(l.duration,l.elapsed+a),l.elapsed>=l.duration&&(l.status=l.priorityKey==="special"?"Hold / investigate":"Ready for review",l.completedAt=n.queueClock,tt(n,`${l.id} completed in bay ${l.bay}; ${l.status.toLowerCase()}.`));i-=a,Os(n),!n.queue.length&&!n.jobs.some(l=>l.status==="Testing")&&(n.queueRunning=!1)}}function jt(n,e={}){switch(e.type){case"scenario":{const t=eo(e.id);Object.keys(n).forEach(i=>delete n[i]),Object.assign(n,t);break}case"reset":{const t=eo(n.scenarioId);t.config=n.config,Object.keys(n).forEach(i=>delete n[i]),Object.assign(n,t);break}case"donor":{if(e.id!==null&&e.id!==""&&!js.some(t=>t.id===e.id))break;n.donorId!==e.id&&(n.donorId=e.id||"",nr(n,"Donor changed. Previous donor-specific evidence invalidated."));break}case"group":{const t=bh(e.value);if(!_h.includes(t)||n.patient.group===t)break;n.patient.group=t,n.patient.validPrior=!1,n.patient.priorWorkup=null,n.verified=!1,nr(n,`Patient group updated to ${t}. Previous test results invalidated.`);break}case"cartridge":{if(!vn[e.value]||n.cartridge===e.value)break;n.cartridge=e.value,nr(n,`Cartridge scope changed to ${vn[n.cartridge].name}.`);break}case"config":{const t=Number(e.value);if(![2,4,8,16].includes(t)||t===n.config)break;if(n.jobs.filter(s=>s.status==="Testing"&&s.bay>t).length||n.running&&n.bay>t){tt(n,"Configuration change blocked: complete active tests in the bays being removed first.");break}n.config=t,tt(n,`Configuration set to ${t} independent bays${t===16?" across two eight-bay units":""}.`),Os(n);break}case"verify":{Ko(n)?(n.verified=!0,tt(n,"Patient, specimen and order identifiers verified."),n.elapsed||(n.status="Awaiting testing")):(n.verified=!1,n.status="Hold / investigate",tt(n,"Identification mismatch detected. Specimen cannot be verified."));break}case"start":{if(n.running||ni(n))break;if(n.requiresRepeat||n.manualHold){tt(n,"Start blocked: resolve the failed check and request a new test.");break}if(!n.verified){tt(n,"Start blocked: verify the patient, specimen and order first.");break}if(n.faults.filter(r=>yh.has(r)).length){n.status=Wt(n,"wrong-patient")?"Hold / investigate":"Invalid QC",tt(n,"Start blocked. A required pre-test check failed. Review the flagged quality controls.");break}if(n.cartridge==="match"&&!Or(n)){n.status="Hold / investigate",tt(n,"Match Only blocked: a valid prior workup is required.");break}if(n.cartridge!=="type"&&!id(n)){tt(n,"Start blocked: select and identify the donor unit for this crossmatch.");break}const i=new Set(n.jobs.filter(r=>r.status==="Testing").map(r=>r.bay)),s=Array.from({length:n.config},(r,o)=>o+1).find(r=>!i.has(r)&&!n.unavailableBays.includes(r));if(!s&&!n.bay){tt(n,"Start pending: all appropriate bays are occupied. Complete a queued run first.");break}n.bay=n.bay||s,n.running=!0,n.status="Testing",tt(n,`${n.elapsed?"Resumed":"Started"} ${vn[n.cartridge].name} in bay ${n.bay}.`);break}case"pause":{n.running=!1,n.status==="Testing"&&tt(n,"Analysis paused. Other bays continue independently.");break}case"tick":da(n,e.seconds);break;case"step":{if(!n.running&&!ni(n)&&jt(n,{type:"start"}),n.running){const t=Mi.find(i=>i.time>n.elapsed)?.time||ss;da(n,t-n.elapsed),n.running=!1,ni(n)||tt(n,"Stepped to next analytical stage and paused.")}else n.jobs.some(t=>t.status==="Testing")&&da(n,60);break}case"repeat":{nr(n,"Repeat requested. Previous analytical evidence retained in the audit trail; a new run is required.");break}case"fault":{const t=e.id;if(!Za.some(r=>r.id===t))break;const i=Wt(n,t),s=e.enabled===void 0?!i:!!e.enabled;if(s===i)break;s?n.faults.push(t):n.faults=n.faults.filter(r=>r!==t),t==="wrong-patient"&&(n.verified=!1,n.patient.specimen=s?"SP-FOREIGN / PT-9999":n.patient.expectedSpecimen,n.patient.specimenPatientId=s?"PT-9999":n.patient.id,s||tt(n,"Correct specimen retrieved and linked to the patient order. Verify the identifiers again.")),n.elapsed>0&&(n.requiresRepeat=!0,n.running=!1,Cc(n),n.status=t==="wrong-patient"||t==="discrepancy"?"Hold / investigate":"Invalid QC"),!s&&!n.elapsed&&(n.status="Awaiting testing"),tt(n,`${s?"Introduced":"Resolved"} fault: ${Za.find(r=>r.id===t).name}.${n.requiresRepeat?" Repeat testing required.":""}`);break}case"network":{const t=!!e.connected;if(t===n.network)break;n.network=t,t?n.authorised&&(n.status="Authorised"):(n.handedOver=!1,n.authorised&&(n.status="Transfer pending")),tt(n,t?"Hospital connection restored. Pending authorised evidence is available for recorded handover.":"Hospital network disconnected. Local evidence retained; transfer pending.");break}case"review":{const t=String(e.decision||"").toLowerCase(),i=String(e.operator||"").trim(),s=String(e.note||"").trim();if(t==="authorise"||t==="authorize"){if(!i){tt(n,"Authorisation blocked: enter the qualified reviewer’s ID.");break}if(!Ks(n)){tt(n,"Authorisation blocked. Resolve the outstanding results, quality controls, identification or prior-workup checks.");break}n.authorised=!0,n.reviewer=i,n.reviewNote=s,n.cartridge!=="match"&&(n.patient.validPrior=!0,n.patient.priorWorkup={group:n.patient.group,screen:"negative",recordId:`HX-${n.patient.id}-${Math.floor(n.queueClock)}`,reviewer:i,time:n.queueClock},tt(n,"Reviewed grouping and screening saved for an appropriate subsequent Match Only request.")),n.status=n.network?"Authorised":"Transfer pending",tt(n,`Result authorised by ${i}${s?`: ${s}`:"."}`),tt(n,n.network?"Authorised result transferred to the hospital record. Physical collection remains a separate step.":"Transfer pending. No hospital receipt has been recorded.")}else t==="hold"?(Cc(n),n.running=!1,n.manualHold=!0,n.status="Hold / investigate",n.reviewer=i,n.reviewNote=s,tt(n,`Donor unit held for investigation${i?` by ${i}`:""}${s?`: ${s}`:"."}`)):t==="repeat"?jt(n,{type:"repeat"}):t==="acknowledge"?tt(n,`Pending finding acknowledged${i?` by ${i}`:""}${s?`: ${s}`:"."}`):(t==="observation"||t==="note")&&s&&(n.reviewNote=s,tt(n,`Review observation${i?` (${i})`:""}: ${s}`));break}case"handover":{if(!n.authorised||!n.network||n.faults.length||n.requiresRepeat){tt(n,"Handover blocked: an eligible authorised result and confirmed connection are required.");break}n.handedOver=!0,n.status="Completed handover",tt(n,`Laboratory-to-ward handover acknowledged at ${xh(n)}. Physical collection and bedside checks remain separate.`);break}case"queue-play":{n.queueRunning=e.running===void 0?!n.queueRunning:!!e.running,tt(n,n.queueRunning?"Workload processing resumed.":"Workload processing paused."),Os(n);break}case"clear-queue":{n.queue=[],n.jobs=[],n.queueRunning=!1,tt(n,"Queued requests cleared. The current patient record is retained.");break}case"enqueue":wh(n,e.count,e.priority);break}return n}const Eh=["Identify the cartridge and prepare the sample.","Route red cells and plasma into separate test pathways.","Meter the reagents into the reaction chambers.","Observe the controlled reactions inside the cartridge.","Capture and inspect the chamber images.","Reconcile the reaction evidence and required checks.","Review the completed record before authorisation."],ha=["Checking the loaded kit","Moving the samples","Adding test materials","Waiting for reactions","Reading the camera images","Checking the results","Ready for review"],Pc=["The machine checks the loaded kit and starts the test.","The prepared samples move into separate test areas.","The kit releases the materials needed for each check.","The machine maintains the test conditions while reactions develop.","The camera reads the reaction pattern in each test area.","The software checks the images and required quality checks.","Review the results before approving the record."];function as(n,{explanationMode:e=!1}={}){const t=!!n?.ready,i=/weak|w\+|1\+/.test(String(n?.grade||"").toLowerCase()),s=t?n.positive===null?"Image unclear":i?"Weak reaction":n.positive?"Reaction found":"No reaction found":"Not read yet";if(e)return{title:n?.name||"Reaction evidence",input:n?.input||"",reagent:n?.reagent||"",observation:t?n.positive===null?"Unable to interpret":i?"Weak reactivity":n.positive?"Reactive":"Nonreactive":"Awaiting optical readout",meaning:t?n?.interpretation||"":"This reaction chamber has not reached its optical readout."};const r={"anti-a":"Blood group check: A","anti-b":"Blood group check: B","anti-d":"Blood group check: Rh","reverse-a1":"Blood group double-check: A cells","reverse-b":"Blood group double-check: B cells","screen-i":"Antibody check 1","screen-ii":"Antibody check 2","screen-iii":"Antibody check 3",crossmatch:"Selected donor check","positive-control":"Positive quality check","negative-control":"Negative quality check"},o={"anti-a":"A blood-group test material","anti-b":"B blood-group test material","anti-d":"Rh blood-group test material","reverse-a1":"Known A red cells","reverse-b":"Known B red cells","screen-i":"Prepared test cells","screen-ii":"Prepared test cells","screen-iii":"Prepared test cells",crossmatch:"Red cells from the selected donor","positive-control":"Quality-check material","negative-control":"Quality-check material"};let a;return t?n.positive===null?a="The image cannot be read clearly. Review the cause and repeat the check as required.":i?a="A weak reaction was found. This needs laboratory review.":n.kind==="typing"?a=n.positive?"A reaction was found in this blood-group check. The full set of checks determines the blood group.":"No reaction was found in this test area. The full set of checks determines the blood group.":n.kind==="control"?a=n.positive===n.expectedPositive?"This quality check produced the expected result.":"This quality check did not produce the expected result. The test cannot be approved.":n.kind==="crossmatch"?a=n.positive?"The patient’s plasma reacted with cells from this donor. The donor unit must be held for investigation.":"No reaction was found against this donor in this check. Other checks and laboratory approval are still required.":a=n.positive?"A reaction was found. The laboratory needs to investigate before approving the result.":"No reaction was found in this test area. Other checks and laboratory approval are still required.":a="This test area has not been read yet.",{title:r[n?.id]||"Test area",input:n?.kind==="control"?"Quality-check material":n?.input||"",reagent:o[n?.id]||"Test material",observation:s,meaning:a}}function Fs(n,{explanationMode:e=!1}={}){if(e)return{name:n.name,detail:n.detail,status:n.status};const t={identity:"Patient and sample IDs",cartridge:"Test kit ID",reagent:"Test kit expiry",controls:"Required quality checks",abo:"Blood group checks",screen:"Antibody check",optics:"Camera check",fluidics:"Sample flow check",conditions:"Test conditions",maintenance:"Machine service and records",donor:"Donor selection and earlier results",review:"Laboratory approval",network:"Hospital connection",repeat:"New test needed"},i={identity:["The patient, sample and test order IDs agree.","The sample does not match this patient or test order. Correct the IDs before continuing.","Confirm the patient, sample and test order IDs before testing."],cartridge:["The test kit matches the selected test.","The test kit ID does not match the selected test order.","The test kit ID has not been checked yet."],reagent:["The test kit lot and expiry have been checked.","This test kit has expired. Use a new kit.","The test kit expiry has not been checked yet."],controls:["The required quality checks produced the expected results.","A required quality check failed. The test result cannot be approved.","The required quality checks are not finished yet."],abo:["The required blood-group results have been checked.","The blood group checks do not agree. Further laboratory review is needed.","The required blood-group results are still being checked."],screen:["The required antibody results have been checked.","The antibody check or earlier antibody history needs further laboratory investigation.","The required antibody results are still being reviewed."],optics:["The camera check passed.","The camera cannot read the test area clearly. Check the camera path before repeating the test.","The camera image is still being checked."],fluidics:["The sample flow check passed.","The test areas did not fill correctly, or an air bubble interfered. Review the flow check before repeating.","The machine is checking that the sample reaches the required test areas."],conditions:["The test conditions passed the required checks.","The test temperature or timing was outside its accepted range.","The machine is checking the test conditions."],maintenance:["Machine checks and test records are up to date.","Complete the required machine service checks before testing.","The machine service checks are pending."],donor:["The donor selection and required earlier results have been checked.","The donor selection or earlier patient test results need review.","The donor selection and required earlier results are still being checked."],review:["The laboratory reviewer has approved the result.","The result cannot be approved.","A laboratory reviewer must approve the completed result."],network:["The hospital connection is available. Only approved results can be sent.","The hospital connection needs attention. No transfer is confirmed.","The hospital connection is unavailable. No transfer is confirmed."],repeat:["A new test can be prepared.","A fault affected this test. Correct the cause and use a fresh kit. Clearing a fault does not restore the old result.","A new test is required."]},s=n.status==="pass"?0:n.status==="fail"?1:2,r=n.id==="donor"&&/Not requested/.test(n.detail||"");return{name:r?"Donor check":t[n.id]||n.name,detail:r?"This kit does not include a donor check.":i[n.id]?.[s]||n.detail,status:n.status}}function Kr(n,{sampleLoaded:e=!1,inserted:t=!1,inserting:i=!1,explanationMode:s=!1}={}){const r=(D,y)=>s?y:D,o=n.elapsed>=600,l=jr(n).filter(D=>["identity","cartridge","reagent","controls","abo","optics","fluidics","conditions","maintenance","repeat"].includes(D.id)),c=l.some(D=>D.status==="fail")||n.faults.length>0||n.requiresRepeat,d=n.patient.priorWorkup,h=!!n.patient.validPrior&&d?.group===n.patient.group&&d?.screen==="negative",m=n.cartridge==="match"&&!h,v=rs(n).find(D=>D.kind==="crossmatch"),g=o&&!c&&n.verified&&n.cartridge!=="match",f={group:n.cartridge==="match"&&h?`${d.group} (prior record)`:g?n.patient.group:c&&o?"Not reported":"Awaiting result",screen:n.cartridge==="match"?h?"Negative (prior record)":"Prior workup required":o?c?"Invalid result":{negative:"No reactivity detected",positive:"Reactive",weak:"Weak reaction",equivocal:"Unable to interpret"}[n.screen]||"Unable to interpret":"Awaiting result",crossmatch:n.cartridge==="type"?"Not requested":o?c?"Invalid result":v?.positive===!0?"Reactive":v?.positive===!1?"No reactivity detected":"Unable to interpret":"Awaiting result",eligible:Ks(n)},u=Math.max(0,Math.min(1,Number(n.elapsed||0)/600)),E=(D,y,b,L,k,H,X,q,$="neutral")=>({phase:D,title:y,instruction:b,actionLabel:L,action:k,machine:{title:H,status:X,lines:q.filter(Boolean).map(String).slice(0,3),progress:u,tone:$},result:f}),w=n.patient.id,x=vn[n.cartridge]?.name||"Cartridge",C=s?n.cartridge==="match"?"Prior screen: negative":n.screen==="negative"?"Screen: nonreactive":n.screen==="weak"?"Screen: weak reaction":n.screen==="equivocal"?"Screen: unresolved":"Screen: reactive":n.cartridge==="match"?"Earlier antibody check: no reaction":n.screen==="negative"?"Antibody check: no reaction":n.screen==="weak"?"Antibody check: weak reaction":n.screen==="equivocal"?"Antibody check: unclear":"Antibody check: reaction found",R=s?n.cartridge==="type"?"Crossmatch not requested":f.crossmatch==="No reactivity detected"?"Crossmatch: nonreactive":f.crossmatch==="Reactive"?"Crossmatch: reactive":"Crossmatch: unresolved":n.cartridge==="type"?"No donor check requested":f.crossmatch==="No reactivity detected"?"Donor check: no reaction":f.crossmatch==="Reactive"?"Donor check: reaction found":"Donor check: unclear",P=f.group==="Awaiting result"||f.group==="Not reported"?"":`${s?"Group":"Blood group"}: ${s?f.group:f.group.replace("(prior record)","(earlier result)")}`;if(c){const D=l.find(k=>k.status==="fail"),y=D?.id==="identity",b=y?"Hold and investigate":"Invalid result",L=n.requiresRepeat?"Resolve the failed check, then request a fresh test. Clearing a fault does not validate the old record.":D?Fs(D,{explanationMode:s}).detail:"Resolve the required quality checks before continuing.";return E("blocked",b,L,"Review checks","review",b,y?"Identification blocked":r("Quality check failed","QC blocked"),[w,D?Fs(D,{explanationMode:s}).name:"Required check failed",n.requiresRepeat?"Fresh test required":"Testing cannot continue"],"danger")}if(m)return E("blocked",r("Earlier test results needed","Prior workup required"),r("This kit checks one donor unit. It needs valid earlier blood-group and antibody results approved by laboratory staff.","Match Only requires a valid reviewed group and antibody screen. Complete the appropriate patient workup first."),r("Review earlier results","Review prior workup"),"review","Hold and investigate",r("Earlier results missing","Prior workup missing"),[w,"Match Only",r("Approved earlier results needed","Reviewed workup required")],"warning");if(n.manualHold||/Hold|Invalid/i.test(n.status)||o&&!n.authorised&&!f.eligible){const D=n.manualHold?"A reviewer has held this record. Complete the investigation and request a fresh test.":n.screen!=="negative"||n.patient.antibodies?.length?r("The antibody check or earlier history needs further antibody investigation. Matching blood-group labels do not resolve this finding.","Further antibody investigation is required. A matching blood-group label does not resolve this finding."):r("Review the selected donor, test results and required checks before continuing.","Review donor selection, reaction evidence and required checks before proceeding.");return E("blocked","Hold and investigate",D,"Review findings","review","Hold and investigate",r("Approval blocked","Authorisation blocked"),[w,P,o?R:"Investigation required"],"danger")}if(n.handedOver)return E("handover","Handover recorded","The ward acknowledgement is recorded. Physical collection and bedside checks remain separate.","Start new test","reset","Handover recorded","Record complete",[w,P,"Ward acknowledgement recorded"],"success");if(n.authorised)return E("authorised",r("Approved","Authorised"),n.network?r("The result is approved. Record the ward acknowledgement when handover is confirmed.","The result is authorised. Record the ward acknowledgement when the handover is confirmed."):r("The approved result stays on this machine. Restore the connection before recording ward handover.","The authorised record is retained locally. Restore the connection before recording ward handover."),n.network?"Record handover":"Review pending transfer","review",r("Approved","Authorised"),n.network?"Ready for handover":"Transfer pending",[w,P,n.network?r("Laboratory approval recorded","Qualified review recorded"):"Local record retained"],n.network?"success":"warning");if(o)return E("review","Review required",r("Review the results and required quality checks. A trained laboratory reviewer must approve the result.","Inspect the reaction evidence and required checks. A qualified reviewer must authorise the result."),"Review result","review","Review required","Analysis complete",[P,C,R],"warning");if(n.running){const D=Hn(n);return E("running","Analysing sample",(s?Eh:Pc)[D]||Pc[0],"Pause analysis","resume","Analysing sample",(s?Mi[D]?.label:ha[D])||"Analysis in progress",[w,x,s?Mi[D]?.label:ha[D]],"active")}return n.elapsed>0?E("paused","Analysis paused","The cartridge remains in its bay. Resume to continue the current test.","Resume analysis","resume","Analysis paused","Cartridge retained",[w,x,s?Mi[Hn(n)]?.label:ha[Hn(n)]],"warning"):!e||!n.verified?E("sample","Ready to load",e?"Confirm that patient, specimen and order identifiers agree before inserting a cartridge.":"Load the identified patient sample to begin.",e?"Verify sample":"Load sample","load","Ready to load",e?"Identity verification required":"Awaiting patient sample",[e?w:"Load the patient sample",e?"Confirm linked identifiers":"No test has started"],"neutral"):i?E("insert","Inserting cartridge","The cartridge is entering the selected bay.","Inserting cartridge","insert","Sample identified","Cartridge entering bay",[w,x,"Seating and locking"],"active"):t?E("ready","Cartridge seated","The specimen is identified and the cartridge is locked in place. Run the test to begin analysis.","Run test","start","Cartridge seated","Ready to analyse",[w,x,"Bay ready"],"neutral"):E("insert","Sample identified","Insert the selected cartridge into the testing bay.","Insert cartridge","insert","Sample identified","Awaiting cartridge",[w,x,"Identity checks passed"],"neutral")}const rd=[2,4,8,16],ad=[{id:"patient-cells",key:"patientCells",label:"Patient red cells",source:"Identified recipient specimen",description:"Load the patient’s prepared red-cell sample. It is used to check the blood group."},{id:"patient-plasma",key:"patientPlasma",label:"Patient plasma",source:"Identified recipient specimen",description:"Load the patient’s prepared plasma, the liquid part of the sample. It is used for the required blood-group, antibody and donor checks."},{id:"donor-cells",key:"donorCells",label:"Donor red cells",source:"Identified donor-unit segment",description:"Load prepared red cells from the selected donor unit. These are tested with the patient’s plasma."}],Ht=()=>({ok:!0}),nt=n=>({ok:!1,reason:n}),ua=n=>structuredClone(n),od=()=>({patientCells:!1,patientPlasma:!1,donorCells:!1,inserted:!1,insertionProgress:0,inserting:!1}),cd=n=>["patientCells","patientPlasma","donorCells"].some(e=>n.loading[e]),ld=n=>{const e=n.patient.priorWorkup,t=e?.patientId?e.patientId===n.patient.id:e?.recordId?.startsWith(`HX-${n.patient.id}-`);return!!n.patient.validPrior&&!!t&&e?.group===n.patient.group&&e?.screen==="negative"},dd=(n,e="complete")=>({id:`HX-KIT-${String(++n.kitSequence).padStart(4,"0")}`,scope:e,status:"fresh",consumed:!1,wasteContained:!0});function hd(n,e){const t=`-B${String(e).padStart(2,"0")}`;n.patient.id+=t,n.patient.expectedSpecimen+=t,n.patient.order+=t,n.faults.includes("wrong-patient")||(n.patient.specimen=n.patient.expectedSpecimen,n.patient.specimenPatientId=n.patient.id),n.patient.priorWorkup&&(n.patient.priorWorkup.patientId=n.patient.id,n.patient.priorWorkup.recordId=`PRIOR-${n.patient.id}`)}function ud(n,e){const t=eo();return t.config=n.config,hd(t,e),{bay:e,engine:t,loading:od(),kit:dd(n),history:[]}}function Th(n=2){const e=rd.includes(Number(n))?Number(n):2,t={config:e,selectedBay:1,sessions:[],kitSequence:0,clock:0};return t.sessions=Array.from({length:e},(i,s)=>ud(t,s+1)),t}function ft(n){return n.sessions.find(e=>e.bay===n.selectedBay)}function Ah(n,e){const t=Number(e);return n.sessions.some(i=>i.bay===t)?(n.selectedBay=t,Ht()):nt("Select a bay in the current configuration.")}function ps(n){return n.kit.status==="fresh"&&!n.kit.consumed&&!cd(n)&&!n.loading.inserted&&!n.loading.inserting&&n.engine.elapsed===0&&!n.engine.running&&!n.engine.authorised}function Jo(n){return ps(n)?null:"Prepare a fresh kit before changing the patient, donor or test type. The current record is retained."}function pd(n,e){const t=Number(e);if(!rd.includes(t))return nt("Choose two, four, eight or sixteen bays.");if(t===n.config)return Ht();if(t<n.config&&n.sessions.some(i=>i.bay>t&&(!ps(i)||i.history.length)))return nt("The bays being removed contain a kit or retained record. Keep those bays available.");if(n.config=t,t>n.sessions.length)for(let i=n.sessions.length+1;i<=t;i++)n.sessions.push(ud(n,i));else n.sessions=n.sessions.filter(i=>i.bay<=t);return n.sessions.forEach(i=>{i.engine.config=t}),n.selectedBay>t&&(n.selectedBay=t),Ht()}function li(n){const e=n.engine.cartridge;return ad.map(t=>({id:t.id,label:t.label,source:t.source,description:t.description,required:t.id==="patient-cells"?e!=="match":t.id==="donor-cells"?e!=="type":!0,loaded:!!n.loading[t.key]}))}function Zr(n){return n.kit.status==="removed"?"The cartridge has been removed. Prepare a fresh kit.":n.kit.consumed||n.kit.status==="used"?"This single-use cartridge is spent. Remove it and prepare a fresh kit.":n.engine.running?"This bay is already analysing its cartridge.":""}function Qo(n){return jt(n.engine,{type:"verify"}),n.engine.verified?"":"The patient, sample and test order IDs do not agree. Retrieve the correct sample before loading."}function Fr(n){const e=n.engine;if(e.patient.priorWorkup&&!e.patient.priorWorkup.patientId&&e.patient.priorWorkup.recordId?.startsWith(`HX-${e.patient.id}-`)&&(e.patient.priorWorkup.patientId=e.patient.id),n.kit.status==="removed"||n.kit.status==="fresh")return;const i=(n.loading.patientCells||n.loading.patientPlasma)&&(e.faults.includes("wrong-patient")||e.patient.specimenPatientId!==e.patient.id||e.patient.specimen!==e.patient.expectedSpecimen);(e.elapsed>=600||e.requiresRepeat||i||/Invalid QC/.test(e.status)||/Hold \/ investigate/.test(e.status)&&(e.elapsed>0||n.loading.inserted))&&(n.kit.status="used",n.kit.consumed=!0,n.loading.inserting=!1,n.loading.insertionProgress=n.loading.inserted?1:0)}function Rh(n,e){const t=ft(n),i=ad.find(o=>o.id===e);if(!i)return nt("Choose patient red cells, patient plasma or donor red cells.");const s=Zr(t);if(s)return nt(s);if(t.loading.inserted||t.loading.inserting)return nt("The cartridge is seated. Do not add specimens after insertion.");if(!li(t).find(o=>o.id===e).required)return nt("This sample is not required for the selected test.");if(e.startsWith("patient-")){const o=Qo(t);if(o)return nt(o)}return e==="donor-cells"&&!js.some(o=>o.id===t.engine.donorId)?nt("Identify a donor unit before loading its red cells."):(t.loading[i.key]||(t.loading[i.key]=!0,t.kit.status="loaded",t.engine.audit.push({time:t.engine.queueClock,elapsed:t.engine.elapsed,event:`${i.label} loaded into ${t.kit.id}. Specimen route confirmed.`})),Ht())}function Ch(n){const e=ft(n),t=Zr(e);if(t)return nt(t);if(e.loading.inserted)return Ht();const i=li(e).filter(r=>r.required&&!r.loaded);if(i.length)return nt(`Load ${i.map(r=>r.label.toLowerCase()).join(" and ")} before inserting the cartridge.`);const s=Qo(e);return s?nt(s):e.engine.cartridge==="match"&&!ld(e.engine)?nt("Match Only needs valid earlier blood-group and antibody test results approved by laboratory staff."):(e.loading.inserted=!0,e.loading.inserting=!1,e.loading.insertionProgress=1,e.kit.status="inserted",e.engine.audit.push({time:e.engine.queueClock,elapsed:e.engine.elapsed,event:`${e.kit.id} seated and locked in bay ${e.bay}. Reagents and controls are preloaded.`}),Ht())}function Ph(n){const e=ft(n),t=Zr(e);if(t)return nt(t);if(!e.loading.inserted||e.loading.inserting)return nt("Insert the loaded test kit before starting the test.");if(li(e).some(s=>s.required&&!s.loaded))return nt("Load all required samples before starting.");if(e.engine.unavailableBays.includes(e.bay))return nt(`Bay ${e.bay} is isolated by an instrument fault. Use an unaffected bay.`);const i=Qo(e);return i?(Fr(e),nt(i)):(e.engine.bay=e.bay,jt(e.engine,{type:"start"}),e.engine.running?(e.engine.bay=e.bay,e.kit.status="running",Ht()):(Fr(e),nt(e.engine.audit.at(-1)?.event||"This test cannot start until the required checks are resolved.")))}function Dh(n){const e=ft(n);return e.engine.running?(jt(e.engine,{type:"pause"}),Ht()):nt("This bay is not currently analysing.")}function Jr(n,e){const t=Number(e);if(!Number.isFinite(t)||t<0)return nt("Advance by a non-negative number of seconds.");n.sessions.some(i=>i.engine.running)&&(n.clock+=t);for(const i of n.sessions)i.engine.running&&jt(i.engine,{type:"tick",seconds:t}),Fr(i);return Ht()}function Lh(n,e){const t=ft(n),i=Jo(t);return i?nt(i):Ji.some(s=>s.id===e)?(jt(t.engine,{type:"scenario",id:e}),t.engine.config=n.config,hd(t.engine,t.bay),e==="mechanical"&&(t.engine.unavailableBays=[t.bay]),t.kit.scope=t.engine.cartridge,Ht()):nt("Choose a case from the list.")}function Ih(n,e){const t=ft(n),i=Jo(t);return i?nt(i):vn[e]?(jt(t.engine,{type:"cartridge",value:e}),t.kit.scope=e,Ht()):nt("Choose a cartridge type from the list.")}function Uh(n,e){const t=ft(n),i=Jo(t);return i?nt(i):js.some(s=>s.id===e)?(jt(t.engine,{type:"donor",id:e}),Ht()):nt("Choose an identified donor unit.")}function to(n){const e=ft(n);if(e.engine.running)return nt("Do not remove a cartridge during an active analytical run.");if(e.loading.inserting)return nt("Allow cartridge insertion to finish before removal.");if(e.kit.status==="removed")return nt("The cartridge is already removed.");if(ps(e))return nt("No loaded or seated cartridge needs removal.");Fr(e),cd(e)&&(e.kit.consumed=!0);const t={bay:e.bay,kit:ua({...e.kit,status:"removed",wasteContained:!0}),engine:ua(e.engine),loading:ua(e.loading),wasteContained:!0,removedAt:n.clock};return e.history.push(t),e.kit.status="removed",e.kit.wasteContained=!0,e.loading.inserted=!1,e.loading.inserting=!1,e.loading.insertionProgress=0,e.engine.audit.push({time:e.engine.queueClock,elapsed:e.engine.elapsed,event:`${e.kit.id} removed for disposal with its contents sealed. The original test record is retained.`}),Ht()}function Br(n){const e=ft(n);return e.kit.status!=="removed"&&!ps(e)?nt("Remove the current cartridge before preparing another single-use kit."):e.engine.running?nt("Finish or pause the test, then remove its kit before preparing another."):(jt(e.engine,{type:"repeat"}),e.engine.config=n.config,e.loading=od(),e.kit=dd(n,e.engine.cartridge),Ht())}function wi(n){const e=li(n).filter(a=>a.required),t=e.filter(a=>!a.loaded),i=Zr(n),s=n.engine.cartridge==="match"&&!ld(n.engine),r=!i&&!n.loading.inserted&&!n.loading.inserting&&!t.length&&n.engine.verified&&!s,o=!i&&n.loading.inserted&&!n.loading.inserting&&!t.length&&n.engine.verified&&!s&&!n.engine.unavailableBays.includes(n.bay);return{id:n.kit.id,scope:n.kit.scope,status:n.kit.status,consumed:n.kit.consumed,readyToInsert:!!r,readyToRun:!!o,canUnload:!n.engine.running&&!n.loading.inserting&&!["fresh","removed"].includes(n.kit.status),canPrepare:n.kit.status==="removed"||ps(n),reason:i||(s?"Valid earlier patient test results are required.":t.length?`Load ${t.map(a=>a.label.toLowerCase()).join(" and ")}.`:n.engine.verified?"":"Check that the patient, sample and order IDs agree."),loadedCount:e.filter(a=>a.loaded).length,requiredCount:e.length,wasteContained:n.kit.wasteContained,eligible:Ks(n.engine)}}function Nh(n){return n.sessions.filter(e=>e.engine.running).map(e=>e.bay)}function fd(n){const e=new Set,t=new Map;for(const i of n.sessions){i.kit.consumed&&e.add(i.kit.id);for(const s of i.history)s.kit.consumed&&e.add(s.kit.id),s.engine.elapsed>=600&&t.set(s.kit.id,s.engine);i.kit.status!=="removed"&&i.engine.elapsed>=600&&t.set(i.kit.id,i.engine)}return{config:n.config,units:n.config===16?2:1,selectedBay:n.selectedBay,running:n.sessions.filter(i=>i.engine.running).length,used:n.sessions.filter(i=>i.kit.status==="used").length,removed:n.sessions.filter(i=>i.kit.status==="removed").length,loaded:n.sessions.filter(i=>["loaded","inserted","running"].includes(i.kit.status)).length,available:n.sessions.filter(ps).filter(i=>!i.engine.unavailableBays.includes(i.bay)).length,completed:n.sessions.filter(i=>i.engine.elapsed>=600).length,resultsWaiting:[...t.values()].filter(i=>!i.authorised).length,totalConsumed:e.size,recordsRetained:n.sessions.reduce((i,s)=>i+s.history.length,0)}}/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ec="180",Qi={ROTATE:0,DOLLY:1,PAN:2},Yi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},kh=0,Dc=1,Oh=2,md=1,gd=2,On=3,ri=0,Xt=1,qt=2,ii=0,es=1,Lc=2,Ic=3,Uc=4,Fh=5,yi=100,Bh=101,zh=102,Hh=103,Vh=104,Gh=200,Wh=201,qh=202,$h=203,no=204,io=205,Xh=206,Yh=207,jh=208,Kh=209,Zh=210,Jh=211,Qh=212,eu=213,tu=214,so=0,ro=1,ao=2,os=3,oo=4,co=5,lo=6,ho=7,vd=0,nu=1,iu=2,si=0,su=1,ru=2,au=3,_d=4,ou=5,cu=6,lu=7,yd=300,cs=301,ls=302,uo=303,po=304,Qr=306,fo=1e3,xi=1001,mo=1002,_n=1003,du=1004,ir=1005,wn=1006,pa=1007,Si=1008,Cn=1009,bd=1010,xd=1011,Bs=1012,tc=1013,Ei=1014,zn=1015,Zs=1016,nc=1017,ic=1018,zs=1020,Sd=35902,Md=35899,wd=1021,Ed=1022,pn=1023,Hs=1026,Vs=1027,Td=1028,sc=1029,Ad=1030,rc=1031,ac=1033,Rr=33776,Cr=33777,Pr=33778,Dr=33779,go=35840,vo=35841,_o=35842,yo=35843,bo=36196,xo=37492,So=37496,Mo=37808,wo=37809,Eo=37810,To=37811,Ao=37812,Ro=37813,Co=37814,Po=37815,Do=37816,Lo=37817,Io=37818,Uo=37819,No=37820,ko=37821,Oo=36492,Fo=36494,Bo=36495,zo=36283,Ho=36284,Vo=36285,Go=36286,hu=3200,uu=3201,Rd=0,pu=1,Jn="",Dt="srgb",ds="srgb-linear",zr="linear",dt="srgb",Li=7680,Nc=519,fu=512,mu=513,gu=514,Cd=515,vu=516,_u=517,yu=518,bu=519,kc=35044,Oc="300 es",En=2e3,Hr=2001;class Ci{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const i=t[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Fc=1234567;const Cs=Math.PI/180,Gs=180/Math.PI;function fs(){const n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[i&255]+Ut[i>>8&255]+Ut[i>>16&255]+Ut[i>>24&255]).toLowerCase()}function Ze(n,e,t){return Math.max(e,Math.min(t,n))}function oc(n,e){return(n%e+e)%e}function xu(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Su(n,e,t){return n!==e?(t-n)/(e-n):0}function Ps(n,e,t){return(1-t)*n+t*e}function Mu(n,e,t,i){return Ps(n,e,1-Math.exp(-t*i))}function wu(n,e=1){return e-Math.abs(oc(n,e*2)-e)}function Eu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Tu(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Au(n,e){return n+Math.floor(Math.random()*(e-n+1))}function Ru(n,e){return n+Math.random()*(e-n)}function Cu(n){return n*(.5-Math.random())}function Pu(n){n!==void 0&&(Fc=n);let e=Fc+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Du(n){return n*Cs}function Lu(n){return n*Gs}function Iu(n){return(n&n-1)===0&&n!==0}function Uu(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function Nu(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ku(n,e,t,i,s){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+i)/2),d=o((e+i)/2),h=r((e-i)/2),m=o((e-i)/2),p=r((i-e)/2),v=o((i-e)/2);switch(s){case"XYX":n.set(a*d,l*h,l*m,a*c);break;case"YZY":n.set(l*m,a*d,l*h,a*c);break;case"ZXZ":n.set(l*h,l*m,a*d,a*c);break;case"XZX":n.set(a*d,l*v,l*p,a*c);break;case"YXY":n.set(l*p,a*d,l*v,a*c);break;case"ZYZ":n.set(l*v,l*p,a*d,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Xi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function Bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}const en={DEG2RAD:Cs,RAD2DEG:Gs,generateUUID:fs,clamp:Ze,euclideanModulo:oc,mapLinear:xu,inverseLerp:Su,lerp:Ps,damp:Mu,pingpong:wu,smoothstep:Eu,smootherstep:Tu,randInt:Au,randFloat:Ru,randFloatSpread:Cu,seededRandom:Pu,degToRad:Du,radToDeg:Lu,isPowerOfTwo:Iu,ceilPowerOfTwo:Uu,floorPowerOfTwo:Nu,setQuaternionFromProperEuler:ku,normalize:Bt,denormalize:Xi};class Se{constructor(e=0,t=0){Se.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*i-o*s+e.x,this.y=r*s+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ai{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,o,a){let l=i[s+0],c=i[s+1],d=i[s+2],h=i[s+3];const m=r[o+0],p=r[o+1],v=r[o+2],g=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h;return}if(a===1){e[t+0]=m,e[t+1]=p,e[t+2]=v,e[t+3]=g;return}if(h!==g||l!==m||c!==p||d!==v){let f=1-a;const u=l*m+c*p+d*v+h*g,E=u>=0?1:-1,w=1-u*u;if(w>Number.EPSILON){const C=Math.sqrt(w),R=Math.atan2(C,u*E);f=Math.sin(f*R)/C,a=Math.sin(a*R)/C}const x=a*E;if(l=l*f+m*x,c=c*f+p*x,d=d*f+v*x,h=h*f+g*x,f===1-a){const C=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=C,c*=C,d*=C,h*=C}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,o){const a=i[s],l=i[s+1],c=i[s+2],d=i[s+3],h=r[o],m=r[o+1],p=r[o+2],v=r[o+3];return e[t]=a*v+d*h+l*p-c*m,e[t+1]=l*v+d*m+c*h-a*p,e[t+2]=c*v+d*p+a*m-l*h,e[t+3]=d*v-a*h-l*m-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const i=e._x,s=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),d=a(s/2),h=a(r/2),m=l(i/2),p=l(s/2),v=l(r/2);switch(o){case"XYZ":this._x=m*d*h+c*p*v,this._y=c*p*h-m*d*v,this._z=c*d*v+m*p*h,this._w=c*d*h-m*p*v;break;case"YXZ":this._x=m*d*h+c*p*v,this._y=c*p*h-m*d*v,this._z=c*d*v-m*p*h,this._w=c*d*h+m*p*v;break;case"ZXY":this._x=m*d*h-c*p*v,this._y=c*p*h+m*d*v,this._z=c*d*v+m*p*h,this._w=c*d*h-m*p*v;break;case"ZYX":this._x=m*d*h-c*p*v,this._y=c*p*h+m*d*v,this._z=c*d*v-m*p*h,this._w=c*d*h+m*p*v;break;case"YZX":this._x=m*d*h+c*p*v,this._y=c*p*h+m*d*v,this._z=c*d*v-m*p*h,this._w=c*d*h-m*p*v;break;case"XZY":this._x=m*d*h-c*p*v,this._y=c*p*h-m*d*v,this._z=c*d*v+m*p*h,this._w=c*d*h+m*p*v;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,i=t[0],s=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],d=t[6],h=t[10],m=i+a+h;if(m>0){const p=.5/Math.sqrt(m+1);this._w=.25/p,this._x=(d-l)*p,this._y=(r-c)*p,this._z=(o-s)*p}else if(i>a&&i>h){const p=2*Math.sqrt(1+i-a-h);this._w=(d-l)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+c)/p}else if(a>h){const p=2*Math.sqrt(1+a-i-h);this._w=(r-c)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-a);this._w=(o-s)/p,this._x=(r+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ze(this.dot(e),-1,1)))}rotateTowards(e,t){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const i=e._x,s=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+o*a+s*c-r*l,this._y=s*d+o*l+r*a-i*c,this._z=r*d+o*c+i*l-s*a,this._w=o*d-i*a-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const i=this._x,s=this._y,r=this._z,o=this._w;let a=o*e._w+i*e._x+s*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*i+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),d=Math.atan2(c,a),h=Math.sin((1-t)*d)/c,m=Math.sin(t*d)/c;return this._w=o*h+this._w*m,this._x=i*h+this._x*m,this._y=s*h+this._y*m,this._z=r*h+this._z*m,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,i=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bc.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bc.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=e.elements,o=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(e){const t=this.x,i=this.y,s=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*s-a*i),d=2*(a*t-r*s),h=2*(r*i-o*t);return this.x=t+l*c+o*h-a*d,this.y=i+l*d+a*c-r*h,this.z=s+l*h+r*d-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const i=e.x,s=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=s*l-r*a,this.y=r*o-i*l,this.z=i*a-s*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return fa.copy(this).projectOnVector(e),this.sub(fa)}reflect(e){return this.sub(fa.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const i=this.dot(e)/t;return Math.acos(Ze(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){const s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const fa=new A,Bc=new ai;class $e{constructor(e,t,i,s,r,o,a,l,c){$e.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c)}set(e,t,i,s,r,o,a,l,c){const d=this.elements;return d[0]=e,d[1]=s,d[2]=a,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=o,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],d=i[4],h=i[7],m=i[2],p=i[5],v=i[8],g=s[0],f=s[3],u=s[6],E=s[1],w=s[4],x=s[7],C=s[2],R=s[5],P=s[8];return r[0]=o*g+a*E+l*C,r[3]=o*f+a*w+l*R,r[6]=o*u+a*x+l*P,r[1]=c*g+d*E+h*C,r[4]=c*f+d*w+h*R,r[7]=c*u+d*x+h*P,r[2]=m*g+p*E+v*C,r[5]=m*f+p*w+v*R,r[8]=m*u+p*x+v*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8];return t*o*d-t*a*c-i*r*d+i*a*l+s*r*c-s*o*l}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=d*o-a*c,m=a*l-d*r,p=c*r-o*l,v=t*h+i*m+s*p;if(v===0)return this.set(0,0,0,0,0,0,0,0,0);const g=1/v;return e[0]=h*g,e[1]=(s*c-d*i)*g,e[2]=(a*i-s*o)*g,e[3]=m*g,e[4]=(d*t-s*l)*g,e[5]=(s*r-a*t)*g,e[6]=p*g,e[7]=(i*l-c*t)*g,e[8]=(o*t-i*r)*g,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-s*c,s*l,-s*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(ma.makeScale(e,t)),this}rotate(e){return this.premultiply(ma.makeRotation(-e)),this}translate(e,t){return this.premultiply(ma.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const ma=new $e;function Pd(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ws(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ou(){const n=Ws("canvas");return n.style.display="block",n}const zc={};function qs(n){n in zc||(zc[n]=!0,console.warn(n))}function Fu(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}const Hc=new $e().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Vc=new $e().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Bu(){const n={enabled:!0,workingColorSpace:ds,spaces:{},convert:function(s,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===dt&&(s.r=Vn(s.r),s.g=Vn(s.g),s.b=Vn(s.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===dt&&(s.r=ts(s.r),s.g=ts(s.g),s.b=ts(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Jn?zr:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,o){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return qs("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return qs("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[ds]:{primaries:e,whitePoint:i,transfer:zr,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Dt},outputColorSpaceConfig:{drawingBufferColorSpace:Dt}},[Dt]:{primaries:e,whitePoint:i,transfer:dt,toXYZ:Hc,fromXYZ:Vc,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Dt}}}),n}const st=Bu();function Vn(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ts(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}let Ii;class zu{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ii===void 0&&(Ii=Ws("canvas")),Ii.width=e.width,Ii.height=e.height;const s=Ii.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ii}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ws("canvas");t.width=e.width,t.height=e.height;const i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Vn(r[o]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Vn(t[i]/255)*255):t[i]=Vn(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hu=0;class cc{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hu++}),this.uuid=fs(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(ga(s[o].image)):r.push(ga(s[o]))}else r=ga(s);i.url=r}return t||(e.images[this.uuid]=i),i}}function ga(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zu.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vu=0;const va=new A;class Ot extends Ci{constructor(e=Ot.DEFAULT_IMAGE,t=Ot.DEFAULT_MAPPING,i=xi,s=xi,r=wn,o=Si,a=pn,l=Cn,c=Ot.DEFAULT_ANISOTROPY,d=Jn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vu++}),this.uuid=fs(),this.name="",this.source=new cc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Se(0,0),this.repeat=new Se(1,1),this.center=new Se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $e,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(va).x}get height(){return this.source.getSize(va).y}get depth(){return this.source.getSize(va).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case fo:e.x=e.x-Math.floor(e.x);break;case xi:e.x=e.x<0?0:1;break;case mo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case fo:e.y=e.y-Math.floor(e.y);break;case xi:e.y=e.y<0?0:1;break;case mo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=yd;Ot.DEFAULT_ANISOTROPY=1;class vt{constructor(e=0,t=0,i=0,s=1){vt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,i=this.y,s=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*t+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*t+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*t+o[7]*i+o[11]*s+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r;const l=e.elements,c=l[0],d=l[4],h=l[8],m=l[1],p=l[5],v=l[9],g=l[2],f=l[6],u=l[10];if(Math.abs(d-m)<.01&&Math.abs(h-g)<.01&&Math.abs(v-f)<.01){if(Math.abs(d+m)<.1&&Math.abs(h+g)<.1&&Math.abs(v+f)<.1&&Math.abs(c+p+u-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const w=(c+1)/2,x=(p+1)/2,C=(u+1)/2,R=(d+m)/4,P=(h+g)/4,D=(v+f)/4;return w>x&&w>C?w<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(w),s=R/i,r=P/i):x>C?x<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),i=R/s,r=D/s):C<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(C),i=P/r,s=D/r),this.set(i,s,r,t),this}let E=Math.sqrt((f-v)*(f-v)+(h-g)*(h-g)+(m-d)*(m-d));return Math.abs(E)<.001&&(E=1),this.x=(f-v)/E,this.y=(h-g)/E,this.z=(m-d)/E,this.w=Math.acos((c+p+u-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ze(this.x,e.x,t.x),this.y=Ze(this.y,e.y,t.y),this.z=Ze(this.z,e.z,t.z),this.w=Ze(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ze(this.x,e,t),this.y=Ze(this.y,e,t),this.z=Ze(this.z,e,t),this.w=Ze(this.w,e,t),this}clampLength(e,t){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ze(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Gu extends Ci{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new vt(0,0,e,t),this.scissorTest=!1,this.viewport=new vt(0,0,e,t);const s={width:e,height:t,depth:i.depth},r=new Ot(s);this.textures=[];const o=i.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const t={minFilter:wn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isArrayTexture=this.textures[s].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new cc(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ti extends Gu{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}}class Dd extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wu extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=_n,this.minFilter=_n,this.wrapR=xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class fn{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(cn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(cn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=cn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(e.matrixWorld),this.expandByPoint(cn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),sr.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),sr.copy(i.boundingBox)),sr.applyMatrix4(e.matrixWorld),this.union(sr)}const s=e.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,cn),cn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ys),rr.subVectors(this.max,ys),Ui.subVectors(e.a,ys),Ni.subVectors(e.b,ys),ki.subVectors(e.c,ys),qn.subVectors(Ni,Ui),$n.subVectors(ki,Ni),ui.subVectors(Ui,ki);let t=[0,-qn.z,qn.y,0,-$n.z,$n.y,0,-ui.z,ui.y,qn.z,0,-qn.x,$n.z,0,-$n.x,ui.z,0,-ui.x,-qn.y,qn.x,0,-$n.y,$n.x,0,-ui.y,ui.x,0];return!_a(t,Ui,Ni,ki,rr)||(t=[1,0,0,0,1,0,0,0,1],!_a(t,Ui,Ni,ki,rr))?!1:(ar.crossVectors(qn,$n),t=[ar.x,ar.y,ar.z],_a(t,Ui,Ni,ki,rr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,cn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(cn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ln),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ln=[new A,new A,new A,new A,new A,new A,new A,new A],cn=new A,sr=new fn,Ui=new A,Ni=new A,ki=new A,qn=new A,$n=new A,ui=new A,ys=new A,rr=new A,ar=new A,pi=new A;function _a(n,e,t,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){pi.fromArray(n,r);const a=s.x*Math.abs(pi.x)+s.y*Math.abs(pi.y)+s.z*Math.abs(pi.z),l=e.dot(pi),c=t.dot(pi),d=i.dot(pi);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>a)return!1}return!0}const qu=new fn,bs=new A,ya=new A;class ea{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const i=this.center;t!==void 0?i.copy(t):qu.setFromPoints(e).getCenter(i);let s=0;for(let r=0,o=e.length;r<o;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;bs.subVectors(e,this.center);const t=bs.lengthSq();if(t>this.radius*this.radius){const i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(bs,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ya.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(bs.copy(e.center).add(ya)),this.expandByPoint(bs.copy(e.center).sub(ya))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const In=new A,ba=new A,or=new A,Xn=new A,xa=new A,cr=new A,Sa=new A;class ta{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,In)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=In.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(In.copy(this.origin).addScaledVector(this.direction,t),In.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){ba.copy(e).add(t).multiplyScalar(.5),or.copy(t).sub(e).normalize(),Xn.copy(this.origin).sub(ba);const r=e.distanceTo(t)*.5,o=-this.direction.dot(or),a=Xn.dot(this.direction),l=-Xn.dot(or),c=Xn.lengthSq(),d=Math.abs(1-o*o);let h,m,p,v;if(d>0)if(h=o*l-a,m=o*a-l,v=r*d,h>=0)if(m>=-v)if(m<=v){const g=1/d;h*=g,m*=g,p=h*(h+o*m+2*a)+m*(o*h+m+2*l)+c}else m=r,h=Math.max(0,-(o*m+a)),p=-h*h+m*(m+2*l)+c;else m=-r,h=Math.max(0,-(o*m+a)),p=-h*h+m*(m+2*l)+c;else m<=-v?(h=Math.max(0,-(-o*r+a)),m=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+m*(m+2*l)+c):m<=v?(h=0,m=Math.min(Math.max(-r,-l),r),p=m*(m+2*l)+c):(h=Math.max(0,-(o*r+a)),m=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+m*(m+2*l)+c);else m=o>0?-r:r,h=Math.max(0,-(o*m+a)),p=-h*h+m*(m+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ba).addScaledVector(or,m),p}intersectSphere(e,t){In.subVectors(e.center,this.origin);const i=In.dot(this.direction),s=In.dot(In)-i*i,r=e.radius*e.radius;if(s>r)return null;const o=Math.sqrt(r-s),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){const i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,o,a,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,m=this.origin;return c>=0?(i=(e.min.x-m.x)*c,s=(e.max.x-m.x)*c):(i=(e.max.x-m.x)*c,s=(e.min.x-m.x)*c),d>=0?(r=(e.min.y-m.y)*d,o=(e.max.y-m.y)*d):(r=(e.max.y-m.y)*d,o=(e.min.y-m.y)*d),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),h>=0?(a=(e.min.z-m.z)*h,l=(e.max.z-m.z)*h):(a=(e.max.z-m.z)*h,l=(e.min.z-m.z)*h),i>l||a>s)||((a>i||i!==i)&&(i=a),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,In)!==null}intersectTriangle(e,t,i,s,r){xa.subVectors(t,e),cr.subVectors(i,e),Sa.crossVectors(xa,cr);let o=this.direction.dot(Sa),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xn.subVectors(this.origin,e);const l=a*this.direction.dot(cr.crossVectors(Xn,cr));if(l<0)return null;const c=a*this.direction.dot(xa.cross(Xn));if(c<0||l+c>o)return null;const d=-a*Xn.dot(Sa);return d<0?null:this.at(d/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ot{constructor(e,t,i,s,r,o,a,l,c,d,h,m,p,v,g,f){ot.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,o,a,l,c,d,h,m,p,v,g,f)}set(e,t,i,s,r,o,a,l,c,d,h,m,p,v,g,f){const u=this.elements;return u[0]=e,u[4]=t,u[8]=i,u[12]=s,u[1]=r,u[5]=o,u[9]=a,u[13]=l,u[2]=c,u[6]=d,u[10]=h,u[14]=m,u[3]=p,u[7]=v,u[11]=g,u[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ot().fromArray(this.elements)}copy(e){const t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){const t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,i=e.elements,s=1/Oi.setFromMatrixColumn(e,0).length(),r=1/Oi.setFromMatrixColumn(e,1).length(),o=1/Oi.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,i=e.x,s=e.y,r=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const m=o*d,p=o*h,v=a*d,g=a*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=p+v*c,t[5]=m-g*c,t[9]=-a*l,t[2]=g-m*c,t[6]=v+p*c,t[10]=o*l}else if(e.order==="YXZ"){const m=l*d,p=l*h,v=c*d,g=c*h;t[0]=m+g*a,t[4]=v*a-p,t[8]=o*c,t[1]=o*h,t[5]=o*d,t[9]=-a,t[2]=p*a-v,t[6]=g+m*a,t[10]=o*l}else if(e.order==="ZXY"){const m=l*d,p=l*h,v=c*d,g=c*h;t[0]=m-g*a,t[4]=-o*h,t[8]=v+p*a,t[1]=p+v*a,t[5]=o*d,t[9]=g-m*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const m=o*d,p=o*h,v=a*d,g=a*h;t[0]=l*d,t[4]=v*c-p,t[8]=m*c+g,t[1]=l*h,t[5]=g*c+m,t[9]=p*c-v,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const m=o*l,p=o*c,v=a*l,g=a*c;t[0]=l*d,t[4]=g-m*h,t[8]=v*h+p,t[1]=h,t[5]=o*d,t[9]=-a*d,t[2]=-c*d,t[6]=p*h+v,t[10]=m-g*h}else if(e.order==="XZY"){const m=o*l,p=o*c,v=a*l,g=a*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=m*h+g,t[5]=o*d,t[9]=p*h-v,t[2]=v*h-p,t[6]=a*d,t[10]=g*h+m}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($u,e,Xu)}lookAt(e,t,i){const s=this.elements;return Jt.subVectors(e,t),Jt.lengthSq()===0&&(Jt.z=1),Jt.normalize(),Yn.crossVectors(i,Jt),Yn.lengthSq()===0&&(Math.abs(i.z)===1?Jt.x+=1e-4:Jt.z+=1e-4,Jt.normalize(),Yn.crossVectors(i,Jt)),Yn.normalize(),lr.crossVectors(Jt,Yn),s[0]=Yn.x,s[4]=lr.x,s[8]=Jt.x,s[1]=Yn.y,s[5]=lr.y,s[9]=Jt.y,s[2]=Yn.z,s[6]=lr.z,s[10]=Jt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const i=e.elements,s=t.elements,r=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],d=i[1],h=i[5],m=i[9],p=i[13],v=i[2],g=i[6],f=i[10],u=i[14],E=i[3],w=i[7],x=i[11],C=i[15],R=s[0],P=s[4],D=s[8],y=s[12],b=s[1],L=s[5],k=s[9],H=s[13],X=s[2],q=s[6],$=s[10],K=s[14],B=s[3],pe=s[7],ue=s[11],Ie=s[15];return r[0]=o*R+a*b+l*X+c*B,r[4]=o*P+a*L+l*q+c*pe,r[8]=o*D+a*k+l*$+c*ue,r[12]=o*y+a*H+l*K+c*Ie,r[1]=d*R+h*b+m*X+p*B,r[5]=d*P+h*L+m*q+p*pe,r[9]=d*D+h*k+m*$+p*ue,r[13]=d*y+h*H+m*K+p*Ie,r[2]=v*R+g*b+f*X+u*B,r[6]=v*P+g*L+f*q+u*pe,r[10]=v*D+g*k+f*$+u*ue,r[14]=v*y+g*H+f*K+u*Ie,r[3]=E*R+w*b+x*X+C*B,r[7]=E*P+w*L+x*q+C*pe,r[11]=E*D+w*k+x*$+C*ue,r[15]=E*y+w*H+x*K+C*Ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],d=e[2],h=e[6],m=e[10],p=e[14],v=e[3],g=e[7],f=e[11],u=e[15];return v*(+r*l*h-s*c*h-r*a*m+i*c*m+s*a*p-i*l*p)+g*(+t*l*p-t*c*m+r*o*m-s*o*p+s*c*d-r*l*d)+f*(+t*c*h-t*a*p-r*o*h+i*o*p+r*a*d-i*c*d)+u*(-s*a*d-t*l*h+t*a*m+s*o*h-i*o*m+i*l*d)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){const e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],d=e[8],h=e[9],m=e[10],p=e[11],v=e[12],g=e[13],f=e[14],u=e[15],E=h*f*c-g*m*c+g*l*p-a*f*p-h*l*u+a*m*u,w=v*m*c-d*f*c-v*l*p+o*f*p+d*l*u-o*m*u,x=d*g*c-v*h*c+v*a*p-o*g*p-d*a*u+o*h*u,C=v*h*l-d*g*l-v*a*m+o*g*m+d*a*f-o*h*f,R=t*E+i*w+s*x+r*C;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=E*P,e[1]=(g*m*r-h*f*r-g*s*p+i*f*p+h*s*u-i*m*u)*P,e[2]=(a*f*r-g*l*r+g*s*c-i*f*c-a*s*u+i*l*u)*P,e[3]=(h*l*r-a*m*r-h*s*c+i*m*c+a*s*p-i*l*p)*P,e[4]=w*P,e[5]=(d*f*r-v*m*r+v*s*p-t*f*p-d*s*u+t*m*u)*P,e[6]=(v*l*r-o*f*r-v*s*c+t*f*c+o*s*u-t*l*u)*P,e[7]=(o*m*r-d*l*r+d*s*c-t*m*c-o*s*p+t*l*p)*P,e[8]=x*P,e[9]=(v*h*r-d*g*r-v*i*p+t*g*p+d*i*u-t*h*u)*P,e[10]=(o*g*r-v*a*r+v*i*c-t*g*c-o*i*u+t*a*u)*P,e[11]=(d*a*r-o*h*r-d*i*c+t*h*c+o*i*p-t*a*p)*P,e[12]=C*P,e[13]=(d*g*s-v*h*s+v*i*m-t*g*m-d*i*f+t*h*f)*P,e[14]=(v*a*s-o*g*s-v*i*l+t*g*l+o*i*f-t*a*f)*P,e[15]=(o*h*s-d*a*s+d*i*l-t*h*l-o*i*m+t*a*m)*P,this}scale(e){const t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const i=Math.cos(t),s=Math.sin(t),r=1-i,o=e.x,a=e.y,l=e.z,c=r*o,d=r*a;return this.set(c*o+i,c*a-s*l,c*l+s*a,0,c*a+s*l,d*a+i,d*l-s*o,0,c*l-s*a,d*l+s*o,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,o){return this.set(1,i,r,0,e,1,o,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){const s=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,d=o+o,h=a+a,m=r*c,p=r*d,v=r*h,g=o*d,f=o*h,u=a*h,E=l*c,w=l*d,x=l*h,C=i.x,R=i.y,P=i.z;return s[0]=(1-(g+u))*C,s[1]=(p+x)*C,s[2]=(v-w)*C,s[3]=0,s[4]=(p-x)*R,s[5]=(1-(m+u))*R,s[6]=(f+E)*R,s[7]=0,s[8]=(v+w)*P,s[9]=(f-E)*P,s[10]=(1-(m+g))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){const s=this.elements;let r=Oi.set(s[0],s[1],s[2]).length();const o=Oi.set(s[4],s[5],s[6]).length(),a=Oi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],ln.copy(this);const c=1/r,d=1/o,h=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=d,ln.elements[5]*=d,ln.elements[6]*=d,ln.elements[8]*=h,ln.elements[9]*=h,ln.elements[10]*=h,t.setFromRotationMatrix(ln),i.x=r,i.y=o,i.z=a,this}makePerspective(e,t,i,s,r,o,a=En,l=!1){const c=this.elements,d=2*r/(t-e),h=2*r/(i-s),m=(t+e)/(t-e),p=(i+s)/(i-s);let v,g;if(l)v=r/(o-r),g=o*r/(o-r);else if(a===En)v=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===Hr)v=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=m,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=v,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,o,a=En,l=!1){const c=this.elements,d=2/(t-e),h=2/(i-s),m=-(t+e)/(t-e),p=-(i+s)/(i-s);let v,g;if(l)v=1/(o-r),g=o/(o-r);else if(a===En)v=-2/(o-r),g=-(o+r)/(o-r);else if(a===Hr)v=-1/(o-r),g=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=d,c[4]=0,c[8]=0,c[12]=m,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=v,c[14]=g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){const i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}}const Oi=new A,ln=new ot,$u=new A(0,0,0),Xu=new A(1,1,1),Yn=new A,lr=new A,Jt=new A,Gc=new ot,Wc=new ai;class Pn{constructor(e=0,t=0,i=0,s=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){const s=e.elements,r=s[0],o=s[4],a=s[8],l=s[1],c=s[5],d=s[9],h=s[2],m=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(m,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(m,-1,1)),Math.abs(m)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(m,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ze(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(m,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-d,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Gc.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Gc,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Wc.setFromEuler(this),this.setFromQuaternion(Wc,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class lc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Yu=0;const qc=new A,Fi=new ai,Un=new ot,dr=new A,xs=new A,ju=new A,Ku=new ai,$c=new A(1,0,0),Xc=new A(0,1,0),Yc=new A(0,0,1),jc={type:"added"},Zu={type:"removed"},Bi={type:"childadded",child:null},Ma={type:"childremoved",child:null};class xt extends Ci{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yu++}),this.uuid=fs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xt.DEFAULT_UP.clone();const e=new A,t=new Pn,i=new ai,s=new A(1,1,1);function r(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ot},normalMatrix:{value:new $e}}),this.matrix=new ot,this.matrixWorld=new ot,this.matrixAutoUpdate=xt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis($c,e)}rotateY(e){return this.rotateOnAxis(Xc,e)}rotateZ(e){return this.rotateOnAxis(Yc,e)}translateOnAxis(e,t){return qc.copy(e).applyQuaternion(this.quaternion),this.position.add(qc.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis($c,e)}translateY(e){return this.translateOnAxis(Xc,e)}translateZ(e){return this.translateOnAxis(Yc,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?dr.copy(e):dr.set(e,t,i);const s=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(xs,dr,this.up):Un.lookAt(dr,xs,this.up),this.quaternion.setFromRotationMatrix(Un),s&&(Un.extractRotation(s.matrixWorld),Fi.setFromRotationMatrix(Un),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jc),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Zu),Ma.child=e,this.dispatchEvent(Ma),Ma.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Un.multiply(e.parent.matrixWorld)),e.applyMatrix4(Un),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jc),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){const o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,e,ju),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Ku,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(a=>({...a})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));s.material=a}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];s.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),d=o(e.images),h=o(e.shapes),m=o(e.skeletons),p=o(e.animations),v=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),m.length>0&&(i.skeletons=m),p.length>0&&(i.animations=p),v.length>0&&(i.nodes=v)}return i.object=s,i;function o(a){const l=[];for(const c in a){const d=a[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}xt.DEFAULT_UP=new A(0,1,0);xt.DEFAULT_MATRIX_AUTO_UPDATE=!0;xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new A,Nn=new A,wa=new A,kn=new A,zi=new A,Hi=new A,Kc=new A,Ea=new A,Ta=new A,Aa=new A,Ra=new vt,Ca=new vt,Pa=new vt;class un{constructor(e=new A,t=new A,i=new A){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),dn.subVectors(e,t),s.cross(dn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){dn.subVectors(s,t),Nn.subVectors(i,t),wa.subVectors(e,t);const o=dn.dot(dn),a=dn.dot(Nn),l=dn.dot(wa),c=Nn.dot(Nn),d=Nn.dot(wa),h=o*c-a*a;if(h===0)return r.set(0,0,0),null;const m=1/h,p=(c*l-a*d)*m,v=(o*d-a*l)*m;return r.set(1-p-v,v,p)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,kn)===null?!1:kn.x>=0&&kn.y>=0&&kn.x+kn.y<=1}static getInterpolation(e,t,i,s,r,o,a,l){return this.getBarycoord(e,t,i,s,kn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,kn.x),l.addScaledVector(o,kn.y),l.addScaledVector(a,kn.z),l)}static getInterpolatedAttribute(e,t,i,s,r,o){return Ra.setScalar(0),Ca.setScalar(0),Pa.setScalar(0),Ra.fromBufferAttribute(e,t),Ca.fromBufferAttribute(e,i),Pa.fromBufferAttribute(e,s),o.setScalar(0),o.addScaledVector(Ra,r.x),o.addScaledVector(Ca,r.y),o.addScaledVector(Pa,r.z),o}static isFrontFacing(e,t,i,s){return dn.subVectors(i,t),Nn.subVectors(e,t),dn.cross(Nn).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return dn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),dn.cross(Nn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return un.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return un.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return un.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return un.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return un.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const i=this.a,s=this.b,r=this.c;let o,a;zi.subVectors(s,i),Hi.subVectors(r,i),Ea.subVectors(e,i);const l=zi.dot(Ea),c=Hi.dot(Ea);if(l<=0&&c<=0)return t.copy(i);Ta.subVectors(e,s);const d=zi.dot(Ta),h=Hi.dot(Ta);if(d>=0&&h<=d)return t.copy(s);const m=l*h-d*c;if(m<=0&&l>=0&&d<=0)return o=l/(l-d),t.copy(i).addScaledVector(zi,o);Aa.subVectors(e,r);const p=zi.dot(Aa),v=Hi.dot(Aa);if(v>=0&&p<=v)return t.copy(r);const g=p*c-l*v;if(g<=0&&c>=0&&v<=0)return a=c/(c-v),t.copy(i).addScaledVector(Hi,a);const f=d*v-p*h;if(f<=0&&h-d>=0&&p-v>=0)return Kc.subVectors(r,s),a=(h-d)/(h-d+(p-v)),t.copy(s).addScaledVector(Kc,a);const u=1/(f+g+m);return o=g*u,a=m*u,t.copy(i).addScaledVector(zi,o).addScaledVector(Hi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ld={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},hr={h:0,s:0,l:0};function Da(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}class We{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Dt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=st.workingColorSpace){if(e=oc(e,1),t=Ze(t,0,1),i=Ze(i,0,1),t===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+t):i+t-i*t,o=2*i-r;this.r=Da(o,r,e+1/3),this.g=Da(o,r,e),this.b=Da(o,r,e-1/3)}return st.colorSpaceToWorking(this,s),this}setStyle(e,t=Dt){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Dt){const i=Ld[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vn(e.r),this.g=Vn(e.g),this.b=Vn(e.b),this}copyLinearToSRGB(e){return this.r=ts(e.r),this.g=ts(e.g),this.b=ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Dt){return st.workingToColorSpace(Nt.copy(this),e),Math.round(Ze(Nt.r*255,0,255))*65536+Math.round(Ze(Nt.g*255,0,255))*256+Math.round(Ze(Nt.b*255,0,255))}getHexString(e=Dt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(Nt.copy(this),t);const i=Nt.r,s=Nt.g,r=Nt.b,o=Math.max(i,s,r),a=Math.min(i,s,r);let l,c;const d=(a+o)/2;if(a===o)l=0,c=0;else{const h=o-a;switch(c=d<=.5?h/(o+a):h/(2-o-a),o){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=Dt){st.workingToColorSpace(Nt.copy(this),e);const t=Nt.r,i=Nt.g,s=Nt.b;return e!==Dt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(jn),this.setHSL(jn.h+e,jn.s+t,jn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(jn),e.getHSL(hr);const i=Ps(jn.h,hr.h,t),s=Ps(jn.s,hr.s,t),r=Ps(jn.l,hr.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new We;We.NAMES=Ld;let Ju=0;class ms extends Ci{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ju++}),this.uuid=fs(),this.name="",this.type="Material",this.blending=es,this.side=ri,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=no,this.blendDst=io,this.blendEquation=yi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Li,this.stencilZFail=Li,this.stencilZPass=Li,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(i.blending=this.blending),this.side!==ri&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==no&&(i.blendSrc=this.blendSrc),this.blendDst!==io&&(i.blendDst=this.blendDst),this.blendEquation!==yi&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==os&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nc&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Li&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Li&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Li&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=s(e.textures),o=s(e.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let i=null;if(t!==null){const s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class xn extends ms{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=vd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Et=new A,ur=new Se;let Qu=0;class yn{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=kc,this.updateRanges=[],this.gpuType=zn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ur.fromBufferAttribute(this,t),ur.applyMatrix3(e),this.setXY(t,ur.x,ur.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix3(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyMatrix4(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.applyNormalMatrix(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Et.fromBufferAttribute(this,t),Et.transformDirection(e),this.setXYZ(t,Et.x,Et.y,Et.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Xi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),s=Bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Bt(t,this.array),i=Bt(i,this.array),s=Bt(s,this.array),r=Bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==kc&&(e.usage=this.usage),e}}class Id extends yn{constructor(e,t,i){super(new Uint16Array(e),t,i)}}class Ud extends yn{constructor(e,t,i){super(new Uint32Array(e),t,i)}}class wt extends yn{constructor(e,t,i){super(new Float32Array(e),t,i)}}let ep=0;const rn=new ot,La=new xt,Vi=new A,Qt=new fn,Ss=new fn,Ct=new A;class It extends Ci{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ep++}),this.uuid=fs(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Pd(e)?Ud:Id)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new $e().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return rn.makeRotationFromQuaternion(e),this.applyMatrix4(rn),this}rotateX(e){return rn.makeRotationX(e),this.applyMatrix4(rn),this}rotateY(e){return rn.makeRotationY(e),this.applyMatrix4(rn),this}rotateZ(e){return rn.makeRotationZ(e),this.applyMatrix4(rn),this}translate(e,t,i){return rn.makeTranslation(e,t,i),this.applyMatrix4(rn),this}scale(e,t,i){return rn.makeScale(e,t,i),this.applyMatrix4(rn),this}lookAt(e){return La.lookAt(e),La.updateMatrix(),this.applyMatrix4(La.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const o=e[s];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new wt(i,3))}else{const i=Math.min(e.length,t.count);for(let s=0;s<i;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){const r=t[i];Qt.setFromBufferAttribute(r),this.morphTargetsRelative?(Ct.addVectors(this.boundingBox.min,Qt.min),this.boundingBox.expandByPoint(Ct),Ct.addVectors(this.boundingBox.max,Qt.max),this.boundingBox.expandByPoint(Ct)):(this.boundingBox.expandByPoint(Qt.min),this.boundingBox.expandByPoint(Qt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ea);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(e){const i=this.boundingSphere.center;if(Qt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];Ss.setFromBufferAttribute(a),this.morphTargetsRelative?(Ct.addVectors(Qt.min,Ss.min),Qt.expandByPoint(Ct),Ct.addVectors(Qt.max,Ss.max),Qt.expandByPoint(Ct)):(Qt.expandByPoint(Ss.min),Qt.expandByPoint(Ss.max))}Qt.getCenter(i);let s=0;for(let r=0,o=e.count;r<o;r++)Ct.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Ct));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,d=a.count;c<d;c++)Ct.fromBufferAttribute(a,c),l&&(Vi.fromBufferAttribute(e,c),Ct.add(Vi)),s=Math.max(s,i.distanceToSquared(Ct))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new yn(new Float32Array(4*i.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let D=0;D<i.count;D++)a[D]=new A,l[D]=new A;const c=new A,d=new A,h=new A,m=new Se,p=new Se,v=new Se,g=new A,f=new A;function u(D,y,b){c.fromBufferAttribute(i,D),d.fromBufferAttribute(i,y),h.fromBufferAttribute(i,b),m.fromBufferAttribute(r,D),p.fromBufferAttribute(r,y),v.fromBufferAttribute(r,b),d.sub(c),h.sub(c),p.sub(m),v.sub(m);const L=1/(p.x*v.y-v.x*p.y);isFinite(L)&&(g.copy(d).multiplyScalar(v.y).addScaledVector(h,-p.y).multiplyScalar(L),f.copy(h).multiplyScalar(p.x).addScaledVector(d,-v.x).multiplyScalar(L),a[D].add(g),a[y].add(g),a[b].add(g),l[D].add(f),l[y].add(f),l[b].add(f))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let D=0,y=E.length;D<y;++D){const b=E[D],L=b.start,k=b.count;for(let H=L,X=L+k;H<X;H+=3)u(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const w=new A,x=new A,C=new A,R=new A;function P(D){C.fromBufferAttribute(s,D),R.copy(C);const y=a[D];w.copy(y),w.sub(C.multiplyScalar(C.dot(y))).normalize(),x.crossVectors(R,y);const L=x.dot(l[D])<0?-1:1;o.setXYZW(D,w.x,w.y,w.z,L)}for(let D=0,y=E.length;D<y;++D){const b=E[D],L=b.start,k=b.count;for(let H=L,X=L+k;H<X;H+=3)P(e.getX(H+0)),P(e.getX(H+1)),P(e.getX(H+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new yn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let m=0,p=i.count;m<p;m++)i.setXYZ(m,0,0,0);const s=new A,r=new A,o=new A,a=new A,l=new A,c=new A,d=new A,h=new A;if(e)for(let m=0,p=e.count;m<p;m+=3){const v=e.getX(m+0),g=e.getX(m+1),f=e.getX(m+2);s.fromBufferAttribute(t,v),r.fromBufferAttribute(t,g),o.fromBufferAttribute(t,f),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),a.fromBufferAttribute(i,v),l.fromBufferAttribute(i,g),c.fromBufferAttribute(i,f),a.add(d),l.add(d),c.add(d),i.setXYZ(v,a.x,a.y,a.z),i.setXYZ(g,l.x,l.y,l.z),i.setXYZ(f,c.x,c.y,c.z)}else for(let m=0,p=t.count;m<p;m+=3)s.fromBufferAttribute(t,m+0),r.fromBufferAttribute(t,m+1),o.fromBufferAttribute(t,m+2),d.subVectors(o,r),h.subVectors(s,r),d.cross(h),i.setXYZ(m+0,d.x,d.y,d.z),i.setXYZ(m+1,d.x,d.y,d.z),i.setXYZ(m+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Ct.fromBufferAttribute(e,t),Ct.normalize(),e.setXYZ(t,Ct.x,Ct.y,Ct.z)}toNonIndexed(){function e(a,l){const c=a.array,d=a.itemSize,h=a.normalized,m=new c.constructor(l.length*d);let p=0,v=0;for(let g=0,f=l.length;g<f;g++){a.isInterleavedBufferAttribute?p=l[g]*a.data.stride+a.offset:p=l[g]*d;for(let u=0;u<d;u++)m[v++]=c[p++]}return new yn(m,d,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new It,i=this.index.array,s=this.attributes;for(const a in s){const l=s[a],c=e(l,i);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let d=0,h=c.length;d<h;d++){const m=c[d],p=e(m,i);l.push(p)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,m=c.length;h<m;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const c in s){const d=s[c];this.setAttribute(c,d.clone(t))}const r=e.morphAttributes;for(const c in r){const d=[],h=r[c];for(let m=0,p=h.length;m<p;m++)d.push(h[m].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,d=o.length;c<d;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Zc=new ot,fi=new ta,pr=new ea,Jc=new A,fr=new A,mr=new A,gr=new A,Ia=new A,vr=new A,Qc=new A,_r=new A;class gt extends xt{constructor(e=new It,t=new xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(s,e);const a=this.morphTargetInfluences;if(r&&a){vr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const d=a[l],h=r[l];d!==0&&(Ia.fromBufferAttribute(h,e),o?vr.addScaledVector(Ia,d):vr.addScaledVector(Ia.sub(t),d))}t.add(vr)}return t}raycast(e,t){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),pr.copy(i.boundingSphere),pr.applyMatrix4(r),fi.copy(e.ray).recast(e.near),!(pr.containsPoint(fi.origin)===!1&&(fi.intersectSphere(pr,Jc)===null||fi.origin.distanceToSquared(Jc)>(e.far-e.near)**2))&&(Zc.copy(r).invert(),fi.copy(e.ray).applyMatrix4(Zc),!(i.boundingBox!==null&&fi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,fi)))}_computeIntersections(e,t,i){let s;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,m=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let v=0,g=m.length;v<g;v++){const f=m[v],u=o[f.materialIndex],E=Math.max(f.start,p.start),w=Math.min(a.count,Math.min(f.start+f.count,p.start+p.count));for(let x=E,C=w;x<C;x+=3){const R=a.getX(x),P=a.getX(x+1),D=a.getX(x+2);s=yr(this,u,e,i,c,d,h,R,P,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let f=v,u=g;f<u;f+=3){const E=a.getX(f),w=a.getX(f+1),x=a.getX(f+2);s=yr(this,o,e,i,c,d,h,E,w,x),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(o))for(let v=0,g=m.length;v<g;v++){const f=m[v],u=o[f.materialIndex],E=Math.max(f.start,p.start),w=Math.min(l.count,Math.min(f.start+f.count,p.start+p.count));for(let x=E,C=w;x<C;x+=3){const R=x,P=x+1,D=x+2;s=yr(this,u,e,i,c,d,h,R,P,D),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const v=Math.max(0,p.start),g=Math.min(l.count,p.start+p.count);for(let f=v,u=g;f<u;f+=3){const E=f,w=f+1,x=f+2;s=yr(this,o,e,i,c,d,h,E,w,x),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function tp(n,e,t,i,s,r,o,a){let l;if(e.side===Xt?l=i.intersectTriangle(o,r,s,!0,a):l=i.intersectTriangle(s,r,o,e.side===ri,a),l===null)return null;_r.copy(a),_r.applyMatrix4(n.matrixWorld);const c=t.ray.origin.distanceTo(_r);return c<t.near||c>t.far?null:{distance:c,point:_r.clone(),object:n}}function yr(n,e,t,i,s,r,o,a,l,c){n.getVertexPosition(a,fr),n.getVertexPosition(l,mr),n.getVertexPosition(c,gr);const d=tp(n,e,t,i,fr,mr,gr,Qc);if(d){const h=new A;un.getBarycoord(Qc,fr,mr,gr,h),s&&(d.uv=un.getInterpolatedAttribute(s,a,l,c,h,new Se)),r&&(d.uv1=un.getInterpolatedAttribute(r,a,l,c,h,new Se)),o&&(d.normal=un.getInterpolatedAttribute(o,a,l,c,h,new A),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const m={a,b:l,c,normal:new A,materialIndex:0};un.getNormal(fr,mr,gr,m.normal),d.face=m,d.barycoord=h}return d}class Pi extends It{constructor(e=1,t=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};const a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],d=[],h=[];let m=0,p=0;v("z","y","x",-1,-1,i,t,e,o,r,0),v("z","y","x",1,-1,i,t,-e,o,r,1),v("x","z","y",1,1,e,i,t,s,o,2),v("x","z","y",1,-1,e,i,-t,s,o,3),v("x","y","z",1,-1,e,t,i,s,r,4),v("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new wt(c,3)),this.setAttribute("normal",new wt(d,3)),this.setAttribute("uv",new wt(h,2));function v(g,f,u,E,w,x,C,R,P,D,y){const b=x/P,L=C/D,k=x/2,H=C/2,X=R/2,q=P+1,$=D+1;let K=0,B=0;const pe=new A;for(let ue=0;ue<$;ue++){const Ie=ue*L-H;for(let Xe=0;Xe<q;Xe++){const rt=Xe*b-k;pe[g]=rt*E,pe[f]=Ie*w,pe[u]=X,c.push(pe.x,pe.y,pe.z),pe[g]=0,pe[f]=0,pe[u]=R>0?1:-1,d.push(pe.x,pe.y,pe.z),h.push(Xe/P),h.push(1-ue/D),K+=1}}for(let ue=0;ue<D;ue++)for(let Ie=0;Ie<P;Ie++){const Xe=m+Ie+q*ue,rt=m+Ie+q*(ue+1),ct=m+(Ie+1)+q*(ue+1),et=m+(Ie+1)+q*ue;l.push(Xe,rt,et),l.push(rt,ct,et),B+=6}a.addGroup(p,B,y),p+=B,m+=K}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function hs(n){const e={};for(const t in n){e[t]={};for(const i in n[t]){const s=n[t][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone():Array.isArray(s)?e[t][i]=s.slice():e[t][i]=s}}return e}function zt(n){const e={};for(let t=0;t<n.length;t++){const i=hs(n[t]);for(const s in i)e[s]=i[s]}return e}function np(n){const e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Nd(n){const e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}const ip={clone:hs,merge:zt};var sp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends ms{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sp,this.fragmentShader=rp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=np(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const o=this.uniforms[s].value;o&&o.isTexture?t.uniforms[s]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[s]={type:"m4",value:o.toArray()}:t.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}}class dc extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ot,this.projectionMatrix=new ot,this.projectionMatrixInverse=new ot,this.coordinateSystem=En,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Kn=new A,el=new Se,tl=new Se;class on extends dc{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Gs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Cs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(Cs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z)}getViewSize(e,t){return this.getViewBounds(e,el,tl),t.subVectors(tl,el)}setViewOffset(e,t,i,s,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Cs*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*s/l,t-=o.offsetY*i/c,s*=o.width/l,i*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Gi=-90,Wi=1;class ap extends xt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new on(Gi,Wi,e,t);s.layers=this.layers,this.add(s);const r=new on(Gi,Wi,e,t);r.layers=this.layers,this.add(r);const o=new on(Gi,Wi,e,t);o.layers=this.layers,this.add(o);const a=new on(Gi,Wi,e,t);a.layers=this.layers,this.add(a);const l=new on(Gi,Wi,e,t);l.layers=this.layers,this.add(l);const c=new on(Gi,Wi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[i,s,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===En)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Hr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,d]=this.children,h=e.getRenderTarget(),m=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),v=e.xr.enabled;e.xr.enabled=!1;const g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,s),e.render(t,r),e.setRenderTarget(i,1,s),e.render(t,o),e.setRenderTarget(i,2,s),e.render(t,a),e.setRenderTarget(i,3,s),e.render(t,l),e.setRenderTarget(i,4,s),e.render(t,c),i.texture.generateMipmaps=g,e.setRenderTarget(i,5,s),e.render(t,d),e.setRenderTarget(h,m,p),e.xr.enabled=v,i.texture.needsPMREMUpdate=!0}}class kd extends Ot{constructor(e=[],t=cs,i,s,r,o,a,l,c,d){super(e,t,i,s,r,o,a,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class op extends Ti{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new kd(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pi(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Xt,blending:ii});r.uniforms.tEquirect.value=t;const o=new gt(s,r),a=t.minFilter;return t.minFilter===Si&&(t.minFilter=wn),new ap(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,s);e.setRenderTarget(r)}}class St extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const cp={type:"move"};class Ua{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new St,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new St,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new St,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const g of e.hand.values()){const f=t.getJointPose(g,i),u=this._getHandJoint(c,g);f!==null&&(u.matrix.fromArray(f.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,u.jointRadius=f.radius),u.visible=f!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],m=d.position.distanceTo(h.position),p=.02,v=.005;c.inputState.pinching&&m>p+v?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&m<=p-v&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(cp)))}return a!==null&&(a.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const i=new St;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}}class lp extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Na=new A,dp=new A,hp=new $e;class Zn{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){const s=Na.subVectors(i,t).cross(dp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const i=e.delta(Na),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const i=t||hp.getNormalMatrix(e),s=this.coplanarPoint(Na).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new ea,up=new Se(.5,.5),br=new A;class na{constructor(e=new Zn,t=new Zn,i=new Zn,s=new Zn,r=new Zn,o=new Zn){this.planes=[e,t,i,s,r,o]}set(e,t,i,s,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=En,i=!1){const s=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],d=r[4],h=r[5],m=r[6],p=r[7],v=r[8],g=r[9],f=r[10],u=r[11],E=r[12],w=r[13],x=r[14],C=r[15];if(s[0].setComponents(c-o,p-d,u-v,C-E).normalize(),s[1].setComponents(c+o,p+d,u+v,C+E).normalize(),s[2].setComponents(c+a,p+h,u+g,C+w).normalize(),s[3].setComponents(c-a,p-h,u-g,C-w).normalize(),i)s[4].setComponents(l,m,f,x).normalize(),s[5].setComponents(c-l,p-m,u-f,C-x).normalize();else if(s[4].setComponents(c-l,p-m,u-f,C-x).normalize(),t===En)s[5].setComponents(c+l,p+m,u+f,C+x).normalize();else if(t===Hr)s[5].setComponents(l,m,f,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(e){mi.center.set(0,0,0);const t=up.distanceTo(e.center);return mi.radius=.7071067811865476+t,mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){const t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let i=0;i<6;i++){const s=t[i];if(br.x=s.normal.x>0?e.max.x:e.min.x,br.y=s.normal.y>0?e.max.y:e.min.y,br.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(br)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vr extends ms{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new We(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Gr=new A,Wr=new A,nl=new ot,Ms=new ta,xr=new ea,ka=new A,il=new A;class Wo extends xt{constructor(e=new It,t=new Vr){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[0];for(let s=1,r=t.count;s<r;s++)Gr.fromBufferAttribute(t,s-1),Wr.fromBufferAttribute(t,s),i[s]=i[s-1],i[s]+=Gr.distanceTo(Wr);e.setAttribute("lineDistance",new wt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),xr.copy(i.boundingSphere),xr.applyMatrix4(s),xr.radius+=r,e.ray.intersectsSphere(xr)===!1)return;nl.copy(s).invert(),Ms.copy(e.ray).applyMatrix4(nl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,d=i.index,m=i.attributes.position;if(d!==null){const p=Math.max(0,o.start),v=Math.min(d.count,o.start+o.count);for(let g=p,f=v-1;g<f;g+=c){const u=d.getX(g),E=d.getX(g+1),w=Sr(this,e,Ms,l,u,E,g);w&&t.push(w)}if(this.isLineLoop){const g=d.getX(v-1),f=d.getX(p),u=Sr(this,e,Ms,l,g,f,v-1);u&&t.push(u)}}else{const p=Math.max(0,o.start),v=Math.min(m.count,o.start+o.count);for(let g=p,f=v-1;g<f;g+=c){const u=Sr(this,e,Ms,l,g,g+1,g);u&&t.push(u)}if(this.isLineLoop){const g=Sr(this,e,Ms,l,v-1,p,v-1);g&&t.push(g)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){const s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){const a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Sr(n,e,t,i,s,r,o){const a=n.geometry.attributes.position;if(Gr.fromBufferAttribute(a,s),Wr.fromBufferAttribute(a,r),t.distanceSqToSegment(Gr,Wr,ka,il)>i)return;ka.applyMatrix4(n.matrixWorld);const c=e.ray.origin.distanceTo(ka);if(!(c<e.near||c>e.far))return{distance:c,point:il.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}const sl=new A,rl=new A;class al extends Wo{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,i=[];for(let s=0,r=t.count;s<r;s+=2)sl.fromBufferAttribute(t,s),rl.fromBufferAttribute(t,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+sl.distanceTo(rl);e.setAttribute("lineDistance",new wt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class ol extends Ot{constructor(e,t,i,s,r,o,a,l,c){super(e,t,i,s,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Od extends Ot{constructor(e,t,i=Ei,s,r,o,a=_n,l=_n,c,d=Hs,h=1){if(d!==Hs&&d!==Vs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const m={width:e,height:t,depth:h};super(m,s,r,o,a,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new cc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Fd extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ia extends It{constructor(e=1,t=1,i=1,s=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const d=[],h=[],m=[],p=[];let v=0;const g=[],f=i/2;let u=0;E(),o===!1&&(e>0&&w(!0),t>0&&w(!1)),this.setIndex(d),this.setAttribute("position",new wt(h,3)),this.setAttribute("normal",new wt(m,3)),this.setAttribute("uv",new wt(p,2));function E(){const x=new A,C=new A;let R=0;const P=(t-e)/i;for(let D=0;D<=r;D++){const y=[],b=D/r,L=b*(t-e)+e;for(let k=0;k<=s;k++){const H=k/s,X=H*l+a,q=Math.sin(X),$=Math.cos(X);C.x=L*q,C.y=-b*i+f,C.z=L*$,h.push(C.x,C.y,C.z),x.set(q,P,$).normalize(),m.push(x.x,x.y,x.z),p.push(H,1-b),y.push(v++)}g.push(y)}for(let D=0;D<s;D++)for(let y=0;y<r;y++){const b=g[y][D],L=g[y+1][D],k=g[y+1][D+1],H=g[y][D+1];(e>0||y!==0)&&(d.push(b,L,H),R+=3),(t>0||y!==r-1)&&(d.push(L,k,H),R+=3)}c.addGroup(u,R,0),u+=R}function w(x){const C=v,R=new Se,P=new A;let D=0;const y=x===!0?e:t,b=x===!0?1:-1;for(let k=1;k<=s;k++)h.push(0,f*b,0),m.push(0,b,0),p.push(.5,.5),v++;const L=v;for(let k=0;k<=s;k++){const X=k/s*l+a,q=Math.cos(X),$=Math.sin(X);P.x=y*$,P.y=f*b,P.z=y*q,h.push(P.x,P.y,P.z),m.push(0,b,0),R.x=q*.5+.5,R.y=$*.5*b+.5,p.push(R.x,R.y),v++}for(let k=0;k<s;k++){const H=C+k,X=L+k;x===!0?d.push(X,X+1,H):d.push(X+1,X,H),D+=3}c.addGroup(u,D,x===!0?1:2),u+=D}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class hc extends ia{constructor(e=1,t=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,e,t,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(e){return new hc(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Wn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){const i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){const t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let i,s=this.getPoint(0),r=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),r+=i.distanceTo(s),t.push(r),s=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const i=this.getLengths();let s=0;const r=i.length;let o;t?o=t:o=e*i[r-1];let a=0,l=r-1,c;for(;a<=l;)if(s=Math.floor(a+(l-a)/2),c=i[s]-o,c<0)a=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,i[s]===o)return s/(r-1);const d=i[s],m=i[s+1]-d,p=(o-d)/m;return(s+p)/(r-1)}getTangent(e,t){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const o=this.getPoint(s),a=this.getPoint(r),l=t||(o.isVector2?new Se:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){const i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){const i=new A,s=[],r=[],o=[],a=new A,l=new ot;for(let p=0;p<=e;p++){const v=p/e;s[p]=this.getTangentAt(v,new A)}r[0]=new A,o[0]=new A;let c=Number.MAX_VALUE;const d=Math.abs(s[0].x),h=Math.abs(s[0].y),m=Math.abs(s[0].z);d<=c&&(c=d,i.set(1,0,0)),h<=c&&(c=h,i.set(0,1,0)),m<=c&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=e;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();const v=Math.acos(Ze(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(a,v))}o[p].crossVectors(s[p],r[p])}if(t===!0){let p=Math.acos(Ze(r[0].dot(r[e]),-1,1));p/=e,s[0].dot(a.crossVectors(r[0],r[e]))>0&&(p=-p);for(let v=1;v<=e;v++)r[v].applyMatrix4(l.makeRotationAxis(s[v],p*v)),o[v].crossVectors(s[v],r[v])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}class Bd extends Wn{constructor(e=0,t=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new Se){const i=t,s=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);const a=this.aStartAngle+e*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const d=Math.cos(this.aRotation),h=Math.sin(this.aRotation),m=l-this.aX,p=c-this.aY;l=m*d-p*h+this.aX,c=m*h+p*d+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){const e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}}class pp extends Bd{constructor(e,t,i,s,r,o){super(e,t,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function uc(){let n=0,e=0,t=0,i=0;function s(r,o,a,l){n=r,e=a,t=-3*r+3*o-2*a-l,i=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){s(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,d,h){let m=(o-r)/c-(a-r)/(c+d)+(a-o)/d,p=(a-o)/d-(l-o)/(d+h)+(l-a)/h;m*=d,p*=d,s(o,a,m,p)},calc:function(r){const o=r*r,a=o*r;return n+e*r+t*o+i*a}}}const Mr=new A,Oa=new uc,Fa=new uc,Ba=new uc;class Lr extends Wn{constructor(e=[],t=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=s}getPoint(e,t=new A){const i=t,s=this.points,r=s.length,o=(r-(this.closed?0:1))*e;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,d;this.closed||a>0?c=s[(a-1)%r]:(Mr.subVectors(s[0],s[1]).add(s[0]),c=Mr);const h=s[a%r],m=s[(a+1)%r];if(this.closed||a+2<r?d=s[(a+2)%r]:(Mr.subVectors(s[r-1],s[r-2]).add(s[r-1]),d=Mr),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let v=Math.pow(c.distanceToSquared(h),p),g=Math.pow(h.distanceToSquared(m),p),f=Math.pow(m.distanceToSquared(d),p);g<1e-4&&(g=1),v<1e-4&&(v=g),f<1e-4&&(f=g),Oa.initNonuniformCatmullRom(c.x,h.x,m.x,d.x,v,g,f),Fa.initNonuniformCatmullRom(c.y,h.y,m.y,d.y,v,g,f),Ba.initNonuniformCatmullRom(c.z,h.z,m.z,d.z,v,g,f)}else this.curveType==="catmullrom"&&(Oa.initCatmullRom(c.x,h.x,m.x,d.x,this.tension),Fa.initCatmullRom(c.y,h.y,m.y,d.y,this.tension),Ba.initCatmullRom(c.z,h.z,m.z,d.z,this.tension));return i.set(Oa.calc(l),Fa.calc(l),Ba.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new A().fromArray(s))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}function cl(n,e,t,i,s){const r=(i-e)*.5,o=(s-t)*.5,a=n*n,l=n*a;return(2*t-2*i+r+o)*l+(-3*t+3*i-2*r-o)*a+r*n+t}function fp(n,e){const t=1-n;return t*t*e}function mp(n,e){return 2*(1-n)*n*e}function gp(n,e){return n*n*e}function Ds(n,e,t,i){return fp(n,e)+mp(n,t)+gp(n,i)}function vp(n,e){const t=1-n;return t*t*t*e}function _p(n,e){const t=1-n;return 3*t*t*n*e}function yp(n,e){return 3*(1-n)*n*n*e}function bp(n,e){return n*n*n*e}function Ls(n,e,t,i,s){return vp(n,e)+_p(n,t)+yp(n,i)+bp(n,s)}class xp extends Wn{constructor(e=new Se,t=new Se,i=new Se,s=new Se){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new Se){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ls(e,s.x,r.x,o.x,a.x),Ls(e,s.y,r.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Sp extends Wn{constructor(e=new A,t=new A,i=new A,s=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=s}getPoint(e,t=new A){const i=t,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Ls(e,s.x,r.x,o.x,a.x),Ls(e,s.y,r.y,o.y,a.y),Ls(e,s.z,r.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}}class Mp extends Wn{constructor(e=new Se,t=new Se){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new Se){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new Se){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Es extends Wn{constructor(e=new A,t=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new A){const i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new A){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class wp extends Wn{constructor(e=new Se,t=new Se,i=new Se){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new Se){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Ds(e,s.x,r.x,o.x),Ds(e,s.y,r.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class zd extends Wn{constructor(e=new A,t=new A,i=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new A){const i=t,s=this.v0,r=this.v1,o=this.v2;return i.set(Ds(e,s.x,r.x,o.x),Ds(e,s.y,r.y,o.y),Ds(e,s.z,r.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Ep extends Wn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new Se){const i=t,s=this.points,r=(s.length-1)*e,o=Math.floor(r),a=r-o,l=s[o===0?o:o-1],c=s[o],d=s[o>s.length-2?s.length-1:o+1],h=s[o>s.length-3?s.length-1:o+2];return i.set(cl(a,l.x,c.x,d.x,h.x),cl(a,l.y,c.y,d.y,h.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(s.clone())}return this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){const s=this.points[t];e.points.push(s.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){const s=e.points[t];this.points.push(new Se().fromArray(s))}return this}}var Tp=Object.freeze({__proto__:null,ArcCurve:pp,CatmullRomCurve3:Lr,CubicBezierCurve:xp,CubicBezierCurve3:Sp,EllipseCurve:Bd,LineCurve:Mp,LineCurve3:Es,QuadraticBezierCurve:wp,QuadraticBezierCurve3:zd,SplineCurve:Ep});class Qn extends It{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};const r=e/2,o=t/2,a=Math.floor(i),l=Math.floor(s),c=a+1,d=l+1,h=e/a,m=t/l,p=[],v=[],g=[],f=[];for(let u=0;u<d;u++){const E=u*m-o;for(let w=0;w<c;w++){const x=w*h-r;v.push(x,-E,0),g.push(0,0,1),f.push(w/a),f.push(1-u/l)}}for(let u=0;u<l;u++)for(let E=0;E<a;E++){const w=E+c*u,x=E+c*(u+1),C=E+1+c*(u+1),R=E+1+c*u;p.push(w,x,R),p.push(x,C,R)}this.setIndex(p),this.setAttribute("position",new wt(v,3)),this.setAttribute("normal",new wt(g,3)),this.setAttribute("uv",new wt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Qn(e.width,e.height,e.widthSegments,e.heightSegments)}}class Is extends It{constructor(e=.5,t=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);const a=[],l=[],c=[],d=[];let h=e;const m=(t-e)/s,p=new A,v=new Se;for(let g=0;g<=s;g++){for(let f=0;f<=i;f++){const u=r+f/i*o;p.x=h*Math.cos(u),p.y=h*Math.sin(u),l.push(p.x,p.y,p.z),c.push(0,0,1),v.x=(p.x/t+1)/2,v.y=(p.y/t+1)/2,d.push(v.x,v.y)}h+=m}for(let g=0;g<s;g++){const f=g*(i+1);for(let u=0;u<i;u++){const E=u+f,w=E,x=E+i+1,C=E+i+2,R=E+1;a.push(w,x,R),a.push(x,C,R)}}this.setIndex(a),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(c,3)),this.setAttribute("uv",new wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Is(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Us extends It{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));const l=Math.min(o+a,Math.PI);let c=0;const d=[],h=new A,m=new A,p=[],v=[],g=[],f=[];for(let u=0;u<=i;u++){const E=[],w=u/i;let x=0;u===0&&o===0?x=.5/t:u===i&&l===Math.PI&&(x=-.5/t);for(let C=0;C<=t;C++){const R=C/t;h.x=-e*Math.cos(s+R*r)*Math.sin(o+w*a),h.y=e*Math.cos(o+w*a),h.z=e*Math.sin(s+R*r)*Math.sin(o+w*a),v.push(h.x,h.y,h.z),m.copy(h).normalize(),g.push(m.x,m.y,m.z),f.push(R+x,1-w),E.push(c++)}d.push(E)}for(let u=0;u<i;u++)for(let E=0;E<t;E++){const w=d[u][E+1],x=d[u][E],C=d[u+1][E],R=d[u+1][E+1];(u!==0||o>0)&&p.push(w,x,R),(u!==i-1||l<Math.PI)&&p.push(x,C,R)}this.setIndex(p),this.setAttribute("position",new wt(v,3)),this.setAttribute("normal",new wt(g,3)),this.setAttribute("uv",new wt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Us(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ji extends It{constructor(e=new zd(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),t=64,i=1,s=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:i,radialSegments:s,closed:r};const o=e.computeFrenetFrames(t,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new A,l=new A,c=new Se;let d=new A;const h=[],m=[],p=[],v=[];g(),this.setIndex(v),this.setAttribute("position",new wt(h,3)),this.setAttribute("normal",new wt(m,3)),this.setAttribute("uv",new wt(p,2));function g(){for(let w=0;w<t;w++)f(w);f(r===!1?t:0),E(),u()}function f(w){d=e.getPointAt(w/t,d);const x=o.normals[w],C=o.binormals[w];for(let R=0;R<=s;R++){const P=R/s*Math.PI*2,D=Math.sin(P),y=-Math.cos(P);l.x=y*x.x+D*C.x,l.y=y*x.y+D*C.y,l.z=y*x.z+D*C.z,l.normalize(),m.push(l.x,l.y,l.z),a.x=d.x+i*l.x,a.y=d.y+i*l.y,a.z=d.z+i*l.z,h.push(a.x,a.y,a.z)}}function u(){for(let w=1;w<=t;w++)for(let x=1;x<=s;x++){const C=(s+1)*(w-1)+(x-1),R=(s+1)*w+(x-1),P=(s+1)*w+x,D=(s+1)*(w-1)+x;v.push(C,R,D),v.push(R,P,D)}}function E(){for(let w=0;w<=t;w++)for(let x=0;x<=s;x++)c.x=w/t,c.y=x/s,p.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){const e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new ji(new Tp[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}}class ll extends ms{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new We(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Rd,this.normalScale=new Se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Ap extends ms{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Rp extends ms{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class dl extends Vr{constructor(e){super(),this.isLineDashedMaterial=!0,this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}}const za={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};class Cp{constructor(e,t,i){const s=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(d){a++,r===!1&&s.onStart!==void 0&&s.onStart(d,o,a),r=!0},this.itemEnd=function(d){o++,s.onProgress!==void 0&&s.onProgress(d,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){const h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,m=c.length;h<m;h+=2){const p=c[h],v=c[h+1];if(p.global&&(p.lastIndex=0),p.test(d))return v}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Pp=new Cp;class pc{constructor(e){this.manager=e!==void 0?e:Pp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}pc.DEFAULT_MATERIAL_NAME="__DEFAULT";const qi=new WeakMap;class Dp extends pc{constructor(e){super(e)}load(e,t,i,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=za.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let h=qi.get(o);h===void 0&&(h=[],qi.set(o,h)),h.push({onLoad:t,onError:s})}return o}const a=Ws("img");function l(){d(),t&&t(this);const h=qi.get(this)||[];for(let m=0;m<h.length;m++){const p=h[m];p.onLoad&&p.onLoad(this)}qi.delete(this),r.manager.itemEnd(e)}function c(h){d(),s&&s(h),za.remove(`image:${e}`);const m=qi.get(this)||[];for(let p=0;p<m.length;p++){const v=m[p];v.onError&&v.onError(h)}qi.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function d(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),za.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class Lp extends pc{constructor(e){super(e)}load(e,t,i,s){const r=new Ot,o=new Dp(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},i,s),r}}class fc extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class Ip extends fc{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new We(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ha=new ot,hl=new A,ul=new A;class Up{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Se(512,512),this.mapType=Cn,this.map=null,this.mapPass=null,this.matrix=new ot,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new na,this._frameExtents=new Se(1,1),this._viewportCount=1,this._viewports=[new vt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,i=this.matrix;hl.setFromMatrixPosition(e.matrixWorld),t.position.copy(hl),ul.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ul),t.updateMatrixWorld(),Ha.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ha,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Ha)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Hd extends dc{constructor(e=-1,t=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,o=i+e,a=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=d*this.view.offsetY,l=a-d*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Np extends Up{constructor(){super(new Hd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class pl extends fc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new Np}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class kp extends fc{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class Op extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Fp{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}const fl=new ot;class Bp{constructor(e,t,i=0,s=1/0){this.ray=new ta(e,t),this.near=i,this.far=s,this.camera=null,this.layers=new lc,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return fl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(fl),this}intersectObject(e,t=!0,i=[]){return qo(e,this,i,t),i.sort(ml),i}intersectObjects(e,t=!0,i=[]){for(let s=0,r=e.length;s<r;s++)qo(e[s],this,i,t);return i.sort(ml),i}}function ml(n,e){return n.distance-e.distance}function qo(n,e,t,i){let s=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(s=!1),s===!0&&i===!0){const r=n.children;for(let o=0,a=r.length;o<a;o++)qo(r[o],e,t,!0)}}class gl{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ze(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(Ze(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}const vl=new Se;class _l{constructor(e=new Se(1/0,1/0),t=new Se(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const i=vl.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,vl).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}class zp extends Ci{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function yl(n,e,t,i){const s=Hp(i);switch(t){case wd:return n*e;case Td:return n*e/s.components*s.byteLength;case sc:return n*e/s.components*s.byteLength;case Ad:return n*e*2/s.components*s.byteLength;case rc:return n*e*2/s.components*s.byteLength;case Ed:return n*e*3/s.components*s.byteLength;case pn:return n*e*4/s.components*s.byteLength;case ac:return n*e*4/s.components*s.byteLength;case Rr:case Cr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Pr:case Dr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case vo:case yo:return Math.max(n,16)*Math.max(e,8)/4;case go:case _o:return Math.max(n,8)*Math.max(e,8)/2;case bo:case xo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case So:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Mo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wo:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Eo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case To:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ao:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Ro:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Co:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Po:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Do:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Lo:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Io:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Uo:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case No:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case ko:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Oo:case Fo:case Bo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case zo:case Ho:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Vo:case Go:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Hp(n){switch(n){case Cn:case bd:return{byteLength:1,components:1};case Bs:case xd:case Zs:return{byteLength:2,components:1};case nc:case ic:return{byteLength:2,components:4};case Ei:case tc:case zn:return{byteLength:4,components:1};case Sd:case Md:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ec}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ec);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Vd(){let n=null,e=!1,t=null,i=null;function s(r,o){t(r,o),i=n.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function Vp(n){const e=new WeakMap;function t(a,l){const c=a.array,d=a.usage,h=c.byteLength,m=n.createBuffer();n.bindBuffer(l,m),n.bufferData(l,c,d),a.onUploadCallback();let p;if(c instanceof Float32Array)p=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?p=n.HALF_FLOAT:p=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=n.SHORT;else if(c instanceof Uint32Array)p=n.UNSIGNED_INT;else if(c instanceof Int32Array)p=n.INT;else if(c instanceof Int8Array)p=n.BYTE;else if(c instanceof Uint8Array)p=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:m,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:h}}function i(a,l,c){const d=l.array,h=l.updateRanges;if(n.bindBuffer(c,a),h.length===0)n.bufferSubData(c,0,d);else{h.sort((p,v)=>p.start-v.start);let m=0;for(let p=1;p<h.length;p++){const v=h[m],g=h[p];g.start<=v.start+v.count+1?v.count=Math.max(v.count,g.start+g.count-v.start):(++m,h[m]=g)}h.length=m+1;for(let p=0,v=h.length;p<v;p++){const g=h[p];n.bufferSubData(c,g.start*d.BYTES_PER_ELEMENT,d,g.start,g.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const d=e.get(a);(!d||d.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:s,remove:r,update:o}}var Gp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,qp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$p=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Xp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Yp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,jp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Kp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Zp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Jp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Qp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tf=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,nf=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,sf=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,cf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,lf=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,df=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,hf=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,uf=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,pf=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,ff=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,mf=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,gf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,vf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_f=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,yf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,bf="gl_FragColor = linearToOutputTexel( gl_FragColor );",xf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,wf=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Af=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Rf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Cf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Pf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Df=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Lf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,If=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Uf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,kf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ff=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Vf=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Gf=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Wf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,qf=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Xf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Yf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,jf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Kf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Zf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Jf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Qf=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,em=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,nm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,im=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,sm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,am=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,om=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,cm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,lm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,dm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,um=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,pm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,fm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,vm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,_m=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ym=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,bm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,xm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Sm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Mm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Em=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Tm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Am=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Rm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Cm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Dm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Lm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Im=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Um=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Nm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,km=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Om=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Fm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Bm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Vm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Gm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wm=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$m=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Xm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ym=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jm=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Km=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Zm=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Jm=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Qm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,eg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,tg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ng=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ig=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,sg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,rg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ag=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,og=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,cg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,lg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,dg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,hg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ug=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,pg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,fg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,mg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,yg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,bg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,xg=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ke={alphahash_fragment:Gp,alphahash_pars_fragment:Wp,alphamap_fragment:qp,alphamap_pars_fragment:$p,alphatest_fragment:Xp,alphatest_pars_fragment:Yp,aomap_fragment:jp,aomap_pars_fragment:Kp,batching_pars_vertex:Zp,batching_vertex:Jp,begin_vertex:Qp,beginnormal_vertex:ef,bsdfs:tf,iridescence_fragment:nf,bumpmap_pars_fragment:sf,clipping_planes_fragment:rf,clipping_planes_pars_fragment:af,clipping_planes_pars_vertex:of,clipping_planes_vertex:cf,color_fragment:lf,color_pars_fragment:df,color_pars_vertex:hf,color_vertex:uf,common:pf,cube_uv_reflection_fragment:ff,defaultnormal_vertex:mf,displacementmap_pars_vertex:gf,displacementmap_vertex:vf,emissivemap_fragment:_f,emissivemap_pars_fragment:yf,colorspace_fragment:bf,colorspace_pars_fragment:xf,envmap_fragment:Sf,envmap_common_pars_fragment:Mf,envmap_pars_fragment:wf,envmap_pars_vertex:Ef,envmap_physical_pars_fragment:kf,envmap_vertex:Tf,fog_vertex:Af,fog_pars_vertex:Rf,fog_fragment:Cf,fog_pars_fragment:Pf,gradientmap_pars_fragment:Df,lightmap_pars_fragment:Lf,lights_lambert_fragment:If,lights_lambert_pars_fragment:Uf,lights_pars_begin:Nf,lights_toon_fragment:Of,lights_toon_pars_fragment:Ff,lights_phong_fragment:Bf,lights_phong_pars_fragment:zf,lights_physical_fragment:Hf,lights_physical_pars_fragment:Vf,lights_fragment_begin:Gf,lights_fragment_maps:Wf,lights_fragment_end:qf,logdepthbuf_fragment:$f,logdepthbuf_pars_fragment:Xf,logdepthbuf_pars_vertex:Yf,logdepthbuf_vertex:jf,map_fragment:Kf,map_pars_fragment:Zf,map_particle_fragment:Jf,map_particle_pars_fragment:Qf,metalnessmap_fragment:em,metalnessmap_pars_fragment:tm,morphinstance_vertex:nm,morphcolor_vertex:im,morphnormal_vertex:sm,morphtarget_pars_vertex:rm,morphtarget_vertex:am,normal_fragment_begin:om,normal_fragment_maps:cm,normal_pars_fragment:lm,normal_pars_vertex:dm,normal_vertex:hm,normalmap_pars_fragment:um,clearcoat_normal_fragment_begin:pm,clearcoat_normal_fragment_maps:fm,clearcoat_pars_fragment:mm,iridescence_pars_fragment:gm,opaque_fragment:vm,packing:_m,premultiplied_alpha_fragment:ym,project_vertex:bm,dithering_fragment:xm,dithering_pars_fragment:Sm,roughnessmap_fragment:Mm,roughnessmap_pars_fragment:wm,shadowmap_pars_fragment:Em,shadowmap_pars_vertex:Tm,shadowmap_vertex:Am,shadowmask_pars_fragment:Rm,skinbase_vertex:Cm,skinning_pars_vertex:Pm,skinning_vertex:Dm,skinnormal_vertex:Lm,specularmap_fragment:Im,specularmap_pars_fragment:Um,tonemapping_fragment:Nm,tonemapping_pars_fragment:km,transmission_fragment:Om,transmission_pars_fragment:Fm,uv_pars_fragment:Bm,uv_pars_vertex:zm,uv_vertex:Hm,worldpos_vertex:Vm,background_vert:Gm,background_frag:Wm,backgroundCube_vert:qm,backgroundCube_frag:$m,cube_vert:Xm,cube_frag:Ym,depth_vert:jm,depth_frag:Km,distanceRGBA_vert:Zm,distanceRGBA_frag:Jm,equirect_vert:Qm,equirect_frag:eg,linedashed_vert:tg,linedashed_frag:ng,meshbasic_vert:ig,meshbasic_frag:sg,meshlambert_vert:rg,meshlambert_frag:ag,meshmatcap_vert:og,meshmatcap_frag:cg,meshnormal_vert:lg,meshnormal_frag:dg,meshphong_vert:hg,meshphong_frag:ug,meshphysical_vert:pg,meshphysical_frag:fg,meshtoon_vert:mg,meshtoon_frag:gg,points_vert:vg,points_frag:_g,shadow_vert:yg,shadow_frag:bg,sprite_vert:xg,sprite_frag:Sg},ge={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $e}},envmap:{envMap:{value:null},envMapRotation:{value:new $e},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $e}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $e}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $e},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $e},normalScale:{value:new Se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $e},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $e}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $e}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $e}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0},uvTransform:{value:new $e}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $e},alphaMap:{value:null},alphaMapTransform:{value:new $e},alphaTest:{value:0}}},Sn={basic:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.fog]),vertexShader:Ke.meshbasic_vert,fragmentShader:Ke.meshbasic_frag},lambert:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new We(0)}}]),vertexShader:Ke.meshlambert_vert,fragmentShader:Ke.meshlambert_frag},phong:{uniforms:zt([ge.common,ge.specularmap,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,ge.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30}}]),vertexShader:Ke.meshphong_vert,fragmentShader:Ke.meshphong_frag},standard:{uniforms:zt([ge.common,ge.envmap,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.roughnessmap,ge.metalnessmap,ge.fog,ge.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag},toon:{uniforms:zt([ge.common,ge.aomap,ge.lightmap,ge.emissivemap,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.gradientmap,ge.fog,ge.lights,{emissive:{value:new We(0)}}]),vertexShader:Ke.meshtoon_vert,fragmentShader:Ke.meshtoon_frag},matcap:{uniforms:zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,ge.fog,{matcap:{value:null}}]),vertexShader:Ke.meshmatcap_vert,fragmentShader:Ke.meshmatcap_frag},points:{uniforms:zt([ge.points,ge.fog]),vertexShader:Ke.points_vert,fragmentShader:Ke.points_frag},dashed:{uniforms:zt([ge.common,ge.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ke.linedashed_vert,fragmentShader:Ke.linedashed_frag},depth:{uniforms:zt([ge.common,ge.displacementmap]),vertexShader:Ke.depth_vert,fragmentShader:Ke.depth_frag},normal:{uniforms:zt([ge.common,ge.bumpmap,ge.normalmap,ge.displacementmap,{opacity:{value:1}}]),vertexShader:Ke.meshnormal_vert,fragmentShader:Ke.meshnormal_frag},sprite:{uniforms:zt([ge.sprite,ge.fog]),vertexShader:Ke.sprite_vert,fragmentShader:Ke.sprite_frag},background:{uniforms:{uvTransform:{value:new $e},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ke.background_vert,fragmentShader:Ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $e}},vertexShader:Ke.backgroundCube_vert,fragmentShader:Ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ke.cube_vert,fragmentShader:Ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ke.equirect_vert,fragmentShader:Ke.equirect_frag},distanceRGBA:{uniforms:zt([ge.common,ge.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ke.distanceRGBA_vert,fragmentShader:Ke.distanceRGBA_frag},shadow:{uniforms:zt([ge.lights,ge.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:Ke.shadow_vert,fragmentShader:Ke.shadow_frag}};Sn.physical={uniforms:zt([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $e},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $e},clearcoatNormalScale:{value:new Se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $e},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $e},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $e},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $e},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $e},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $e},transmissionSamplerSize:{value:new Se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $e},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $e},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $e},anisotropyVector:{value:new Se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $e}}]),vertexShader:Ke.meshphysical_vert,fragmentShader:Ke.meshphysical_frag};const wr={r:0,b:0,g:0},gi=new Pn,Mg=new ot;function wg(n,e,t,i,s,r,o){const a=new We(0);let l=r===!0?0:1,c,d,h=null,m=0,p=null;function v(w){let x=w.isScene===!0?w.background:null;return x&&x.isTexture&&(x=(w.backgroundBlurriness>0?t:e).get(x)),x}function g(w){let x=!1;const C=v(w);C===null?u(a,l):C&&C.isColor&&(u(C,1),x=!0);const R=n.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||x)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function f(w,x){const C=v(x);C&&(C.isCubeTexture||C.mapping===Qr)?(d===void 0&&(d=new gt(new Pi(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:hs(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),d.geometry.deleteAttribute("normal"),d.geometry.deleteAttribute("uv"),d.onBeforeRender=function(R,P,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(d.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(d)),gi.copy(x.backgroundRotation),gi.x*=-1,gi.y*=-1,gi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),d.material.uniforms.envMap.value=C,d.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,d.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,d.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,d.material.uniforms.backgroundRotation.value.setFromMatrix4(Mg.makeRotationFromEuler(gi)),d.material.toneMapped=st.getTransfer(C.colorSpace)!==dt,(h!==C||m!==C.version||p!==n.toneMapping)&&(d.material.needsUpdate=!0,h=C,m=C.version,p=n.toneMapping),d.layers.enableAll(),w.unshift(d,d.geometry,d.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new gt(new Qn(2,2),new oi({name:"BackgroundMaterial",uniforms:hs(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:ri,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=st.getTransfer(C.colorSpace)!==dt,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(h!==C||m!==C.version||p!==n.toneMapping)&&(c.material.needsUpdate=!0,h=C,m=C.version,p=n.toneMapping),c.layers.enableAll(),w.unshift(c,c.geometry,c.material,0,0,null))}function u(w,x){w.getRGB(wr,Nd(n)),i.buffers.color.setClear(wr.r,wr.g,wr.b,x,o)}function E(){d!==void 0&&(d.geometry.dispose(),d.material.dispose(),d=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(w,x=1){a.set(w),l=x,u(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(w){l=w,u(a,l)},render:g,addToRenderList:f,dispose:E}}function Eg(n,e){const t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=m(null);let r=s,o=!1;function a(b,L,k,H,X){let q=!1;const $=h(H,k,L);r!==$&&(r=$,c(r.object)),q=p(b,H,k,X),q&&v(b,H,k,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,x(b,L,k,H),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return n.createVertexArray()}function c(b){return n.bindVertexArray(b)}function d(b){return n.deleteVertexArray(b)}function h(b,L,k){const H=k.wireframe===!0;let X=i[b.id];X===void 0&&(X={},i[b.id]=X);let q=X[L.id];q===void 0&&(q={},X[L.id]=q);let $=q[H];return $===void 0&&($=m(l()),q[H]=$),$}function m(b){const L=[],k=[],H=[];for(let X=0;X<t;X++)L[X]=0,k[X]=0,H[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:k,attributeDivisors:H,object:b,attributes:{},index:null}}function p(b,L,k,H){const X=r.attributes,q=L.attributes;let $=0;const K=k.getAttributes();for(const B in K)if(K[B].location>=0){const ue=X[B];let Ie=q[B];if(Ie===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(Ie=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(Ie=b.instanceColor)),ue===void 0||ue.attribute!==Ie||Ie&&ue.data!==Ie.data)return!0;$++}return r.attributesNum!==$||r.index!==H}function v(b,L,k,H){const X={},q=L.attributes;let $=0;const K=k.getAttributes();for(const B in K)if(K[B].location>=0){let ue=q[B];ue===void 0&&(B==="instanceMatrix"&&b.instanceMatrix&&(ue=b.instanceMatrix),B==="instanceColor"&&b.instanceColor&&(ue=b.instanceColor));const Ie={};Ie.attribute=ue,ue&&ue.data&&(Ie.data=ue.data),X[B]=Ie,$++}r.attributes=X,r.attributesNum=$,r.index=H}function g(){const b=r.newAttributes;for(let L=0,k=b.length;L<k;L++)b[L]=0}function f(b){u(b,0)}function u(b,L){const k=r.newAttributes,H=r.enabledAttributes,X=r.attributeDivisors;k[b]=1,H[b]===0&&(n.enableVertexAttribArray(b),H[b]=1),X[b]!==L&&(n.vertexAttribDivisor(b,L),X[b]=L)}function E(){const b=r.newAttributes,L=r.enabledAttributes;for(let k=0,H=L.length;k<H;k++)L[k]!==b[k]&&(n.disableVertexAttribArray(k),L[k]=0)}function w(b,L,k,H,X,q,$){$===!0?n.vertexAttribIPointer(b,L,k,X,q):n.vertexAttribPointer(b,L,k,H,X,q)}function x(b,L,k,H){g();const X=H.attributes,q=k.getAttributes(),$=L.defaultAttributeValues;for(const K in q){const B=q[K];if(B.location>=0){let pe=X[K];if(pe===void 0&&(K==="instanceMatrix"&&b.instanceMatrix&&(pe=b.instanceMatrix),K==="instanceColor"&&b.instanceColor&&(pe=b.instanceColor)),pe!==void 0){const ue=pe.normalized,Ie=pe.itemSize,Xe=e.get(pe);if(Xe===void 0)continue;const rt=Xe.buffer,ct=Xe.type,et=Xe.bytesPerElement,j=ct===n.INT||ct===n.UNSIGNED_INT||pe.gpuType===tc;if(pe.isInterleavedBufferAttribute){const ee=pe.data,G=ee.stride,le=pe.offset;if(ee.isInstancedInterleavedBuffer){for(let Y=0;Y<B.locationSize;Y++)u(B.location+Y,ee.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Y=0;Y<B.locationSize;Y++)f(B.location+Y);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let Y=0;Y<B.locationSize;Y++)w(B.location+Y,Ie/B.locationSize,ct,ue,G*et,(le+Ie/B.locationSize*Y)*et,j)}else{if(pe.isInstancedBufferAttribute){for(let ee=0;ee<B.locationSize;ee++)u(B.location+ee,pe.meshPerAttribute);b.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let ee=0;ee<B.locationSize;ee++)f(B.location+ee);n.bindBuffer(n.ARRAY_BUFFER,rt);for(let ee=0;ee<B.locationSize;ee++)w(B.location+ee,Ie/B.locationSize,ct,ue,Ie*et,Ie/B.locationSize*ee*et,j)}}else if($!==void 0){const ue=$[K];if(ue!==void 0)switch(ue.length){case 2:n.vertexAttrib2fv(B.location,ue);break;case 3:n.vertexAttrib3fv(B.location,ue);break;case 4:n.vertexAttrib4fv(B.location,ue);break;default:n.vertexAttrib1fv(B.location,ue)}}}}E()}function C(){D();for(const b in i){const L=i[b];for(const k in L){const H=L[k];for(const X in H)d(H[X].object),delete H[X];delete L[k]}delete i[b]}}function R(b){if(i[b.id]===void 0)return;const L=i[b.id];for(const k in L){const H=L[k];for(const X in H)d(H[X].object),delete H[X];delete L[k]}delete i[b.id]}function P(b){for(const L in i){const k=i[L];if(k[b.id]===void 0)continue;const H=k[b.id];for(const X in H)d(H[X].object),delete H[X];delete k[b.id]}}function D(){y(),o=!0,r!==s&&(r=s,c(r.object))}function y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:a,reset:D,resetDefaultState:y,dispose:C,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:g,enableAttribute:f,disableUnusedAttributes:E}}function Tg(n,e,t){let i;function s(c){i=c}function r(c,d){n.drawArrays(i,c,d),t.update(d,i,1)}function o(c,d,h){h!==0&&(n.drawArraysInstanced(i,c,d,h),t.update(d,i,h))}function a(c,d,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,d,0,h);let p=0;for(let v=0;v<h;v++)p+=d[v];t.update(p,i,1)}function l(c,d,h,m){if(h===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let v=0;v<c.length;v++)o(c[v],d[v],m[v]);else{p.multiDrawArraysInstancedWEBGL(i,c,0,d,0,m,0,h);let v=0;for(let g=0;g<h;g++)v+=d[g]*m[g];t.update(v,i,1)}}this.setMode=s,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Ag(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function o(P){return!(P!==pn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(P){const D=P===Zs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==Cn&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==zn&&!D)}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=t.logarithmicDepthBuffer===!0,m=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),p=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_TEXTURE_SIZE),f=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),u=n.getParameter(n.MAX_VERTEX_ATTRIBS),E=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),w=n.getParameter(n.MAX_VARYING_VECTORS),x=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=v>0,R=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:m,maxTextures:p,maxVertexTextures:v,maxTextureSize:g,maxCubemapSize:f,maxAttributes:u,maxVertexUniforms:E,maxVaryings:w,maxFragmentUniforms:x,vertexTextures:C,maxSamples:R}}function Rg(n){const e=this;let t=null,i=0,s=!1,r=!1;const o=new Zn,a=new $e,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,m){const p=h.length!==0||m||i!==0||s;return s=m,i=h.length,p},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,m){t=d(h,m,0)},this.setState=function(h,m,p){const v=h.clippingPlanes,g=h.clipIntersection,f=h.clipShadows,u=n.get(h);if(!s||v===null||v.length===0||r&&!f)r?d(null):c();else{const E=r?0:i,w=E*4;let x=u.clippingState||null;l.value=x,x=d(v,m,w,p);for(let C=0;C!==w;++C)x[C]=t[C];u.clippingState=x,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=E}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,m,p,v){const g=h!==null?h.length:0;let f=null;if(g!==0){if(f=l.value,v!==!0||f===null){const u=p+g*4,E=m.matrixWorldInverse;a.getNormalMatrix(E),(f===null||f.length<u)&&(f=new Float32Array(u));for(let w=0,x=p;w!==g;++w,x+=4)o.copy(h[w]).applyMatrix4(E,a),o.normal.toArray(f,x),f[x+3]=o.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=g,e.numIntersection=0,f}}function Cg(n){let e=new WeakMap;function t(o,a){return a===uo?o.mapping=cs:a===po&&(o.mapping=ls),o}function i(o){if(o&&o.isTexture){const a=o.mapping;if(a===uo||a===po)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new op(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",s),t(c.texture,o.mapping)}else return null}}return o}function s(o){const a=o.target;a.removeEventListener("dispose",s);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:i,dispose:r}}const Ki=4,bl=[.125,.215,.35,.446,.526,.582],bi=20,Va=new Hd,xl=new We;let Ga=null,Wa=0,qa=0,$a=!1;const _i=(1+Math.sqrt(5))/2,$i=1/_i,Sl=[new A(-_i,$i,0),new A(_i,$i,0),new A(-$i,0,_i),new A($i,0,_i),new A(0,_i,-$i),new A(0,_i,$i),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],Pg=new A;class Ml{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,s=100,r={}){const{size:o=256,position:a=Pg}=r;Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=El(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ga,Wa,qa),this._renderer.xr.enabled=$a,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===cs||e.mapping===ls?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ga=this._renderer.getRenderTarget(),Wa=this._renderer.getActiveCubeFace(),qa=this._renderer.getActiveMipmapLevel(),$a=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Zs,format:pn,colorSpace:ds,depthBuffer:!1},s=wl(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wl(e,t,i);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Dg(r)),this._blurMaterial=Lg(r,e,t)}return s}_compileMaterial(e){const t=new gt(this._lodPlanes[0],e);this._renderer.compile(t,Va)}_sceneToCubeUV(e,t,i,s,r){const l=new on(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,m=h.autoClear,p=h.toneMapping;h.getClearColor(xl),h.toneMapping=si,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null));const g=new xn({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),f=new gt(new Pi,g);let u=!1;const E=e.background;E?E.isColor&&(g.color.copy(E),e.background=null,u=!0):(g.color.copy(xl),u=!0);for(let w=0;w<6;w++){const x=w%3;x===0?(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[w],r.y,r.z)):x===1?(l.up.set(0,0,c[w]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[w],r.z)):(l.up.set(0,c[w],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[w]));const C=this._cubeSize;Er(s,x*C,w>2?C:0,C,C),h.setRenderTarget(s),u&&h.render(f,l),h.render(e,l)}f.geometry.dispose(),f.material.dispose(),h.toneMapping=p,h.autoClear=m,e.background=E}_textureToCubeUV(e,t){const i=this._renderer,s=e.mapping===cs||e.mapping===ls;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=El());const r=s?this._cubemapMaterial:this._equirectMaterial,o=new gt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;Er(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Va)}_applyPMREM(e){const t=this._renderer,i=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Sl[(s-r-1)%Sl.length];this._blur(e,r-1,r,o,a)}t.autoClear=i}_blur(e,t,i,s,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,s,"latitudinal",r),this._halfBlur(o,e,i,i,s,"longitudinal",r)}_halfBlur(e,t,i,s,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const d=3,h=new gt(this._lodPlanes[s],c),m=c.uniforms,p=this._sizeLods[i]-1,v=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*bi-1),g=r/v,f=isFinite(r)?1+Math.floor(d*g):bi;f>bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${bi}`);const u=[];let E=0;for(let P=0;P<bi;++P){const D=P/g,y=Math.exp(-D*D/2);u.push(y),P===0?E+=y:P<f&&(E+=2*y)}for(let P=0;P<u.length;P++)u[P]=u[P]/E;m.envMap.value=e.texture,m.samples.value=f,m.weights.value=u,m.latitudinal.value=o==="latitudinal",a&&(m.poleAxis.value=a);const{_lodMax:w}=this;m.dTheta.value=v,m.mipInt.value=w-i;const x=this._sizeLods[s],C=3*x*(s>w-Ki?s-w+Ki:0),R=4*(this._cubeSize-x);Er(t,C,R,3*x,2*x),l.setRenderTarget(t),l.render(h,Va)}}function Dg(n){const e=[],t=[],i=[];let s=n;const r=n-Ki+1+bl.length;for(let o=0;o<r;o++){const a=Math.pow(2,s);t.push(a);let l=1/a;o>n-Ki?l=bl[o-n+Ki-1]:o===0&&(l=0),i.push(l);const c=1/(a-2),d=-c,h=1+c,m=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,v=6,g=3,f=2,u=1,E=new Float32Array(g*v*p),w=new Float32Array(f*v*p),x=new Float32Array(u*v*p);for(let R=0;R<p;R++){const P=R%3*2/3-1,D=R>2?0:-1,y=[P,D,0,P+2/3,D,0,P+2/3,D+1,0,P,D,0,P+2/3,D+1,0,P,D+1,0];E.set(y,g*v*R),w.set(m,f*v*R);const b=[R,R,R,R,R,R];x.set(b,u*v*R)}const C=new It;C.setAttribute("position",new yn(E,g)),C.setAttribute("uv",new yn(w,f)),C.setAttribute("faceIndex",new yn(x,u)),e.push(C),s>Ki&&s--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function wl(n,e,t){const i=new Ti(n,e,t);return i.texture.mapping=Qr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Er(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Lg(n,e,t){const i=new Float32Array(bi),s=new A(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function El(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function Tl(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:ii,depthTest:!1,depthWrite:!1})}function mc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ig(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){const l=a.mapping,c=l===uo||l===po,d=l===cs||l===ls;if(c||d){let h=e.get(a);const m=h!==void 0?h.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==m)return t===null&&(t=new Ml(n)),h=c?t.fromEquirectangular(a,h):t.fromCubemap(a,h),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),h.texture;if(h!==void 0)return h.texture;{const p=a.image;return c&&p&&p.height>0||d&&p&&s(p)?(t===null&&(t=new Ml(n)),h=c?t.fromEquirectangular(a):t.fromCubemap(a),h.texture.pmremVersion=a.pmremVersion,e.set(a,h),a.addEventListener("dispose",r),h.texture):null}}}return a}function s(a){let l=0;const c=6;for(let d=0;d<c;d++)a[d]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Ug(n){const e={};function t(i){if(e[i]!==void 0)return e[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){const s=t(i);return s===null&&qs("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Ng(n,e,t,i){const s={},r=new WeakMap;function o(h){const m=h.target;m.index!==null&&e.remove(m.index);for(const v in m.attributes)e.remove(m.attributes[v]);m.removeEventListener("dispose",o),delete s[m.id];const p=r.get(m);p&&(e.remove(p),r.delete(m)),i.releaseStatesOfGeometry(m),m.isInstancedBufferGeometry===!0&&delete m._maxInstanceCount,t.memory.geometries--}function a(h,m){return s[m.id]===!0||(m.addEventListener("dispose",o),s[m.id]=!0,t.memory.geometries++),m}function l(h){const m=h.attributes;for(const p in m)e.update(m[p],n.ARRAY_BUFFER)}function c(h){const m=[],p=h.index,v=h.attributes.position;let g=0;if(p!==null){const E=p.array;g=p.version;for(let w=0,x=E.length;w<x;w+=3){const C=E[w+0],R=E[w+1],P=E[w+2];m.push(C,R,R,P,P,C)}}else if(v!==void 0){const E=v.array;g=v.version;for(let w=0,x=E.length/3-1;w<x;w+=3){const C=w+0,R=w+1,P=w+2;m.push(C,R,R,P,P,C)}}else return;const f=new(Pd(m)?Ud:Id)(m,1);f.version=g;const u=r.get(h);u&&e.remove(u),r.set(h,f)}function d(h){const m=r.get(h);if(m){const p=h.index;p!==null&&m.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:a,update:l,getWireframeAttribute:d}}function kg(n,e,t){let i;function s(m){i=m}let r,o;function a(m){r=m.type,o=m.bytesPerElement}function l(m,p){n.drawElements(i,p,r,m*o),t.update(p,i,1)}function c(m,p,v){v!==0&&(n.drawElementsInstanced(i,p,r,m*o,v),t.update(p,i,v))}function d(m,p,v){if(v===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,p,0,r,m,0,v);let f=0;for(let u=0;u<v;u++)f+=p[u];t.update(f,i,1)}function h(m,p,v,g){if(v===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let u=0;u<m.length;u++)c(m[u]/o,p[u],g[u]);else{f.multiDrawElementsInstancedWEBGL(i,p,0,r,m,0,g,0,v);let u=0;for(let E=0;E<v;E++)u+=p[E]*g[E];t.update(u,i,1)}}this.setMode=s,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=d,this.renderMultiDrawInstances=h}function Og(n){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(r/3);break;case n.LINES:t.lines+=a*(r/2);break;case n.LINE_STRIP:t.lines+=a*(r-1);break;case n.LINE_LOOP:t.lines+=a*r;break;case n.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Fg(n,e,t){const i=new WeakMap,s=new vt;function r(o,a,l){const c=o.morphTargetInfluences,d=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=d!==void 0?d.length:0;let m=i.get(a);if(m===void 0||m.count!==h){let b=function(){D.dispose(),i.delete(a),a.removeEventListener("dispose",b)};var p=b;m!==void 0&&m.texture.dispose();const v=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,u=a.morphAttributes.position||[],E=a.morphAttributes.normal||[],w=a.morphAttributes.color||[];let x=0;v===!0&&(x=1),g===!0&&(x=2),f===!0&&(x=3);let C=a.attributes.position.count*x,R=1;C>e.maxTextureSize&&(R=Math.ceil(C/e.maxTextureSize),C=e.maxTextureSize);const P=new Float32Array(C*R*4*h),D=new Dd(P,C,R,h);D.type=zn,D.needsUpdate=!0;const y=x*4;for(let L=0;L<h;L++){const k=u[L],H=E[L],X=w[L],q=C*R*4*L;for(let $=0;$<k.count;$++){const K=$*y;v===!0&&(s.fromBufferAttribute(k,$),P[q+K+0]=s.x,P[q+K+1]=s.y,P[q+K+2]=s.z,P[q+K+3]=0),g===!0&&(s.fromBufferAttribute(H,$),P[q+K+4]=s.x,P[q+K+5]=s.y,P[q+K+6]=s.z,P[q+K+7]=0),f===!0&&(s.fromBufferAttribute(X,$),P[q+K+8]=s.x,P[q+K+9]=s.y,P[q+K+10]=s.z,P[q+K+11]=X.itemSize===4?s.w:1)}}m={count:h,texture:D,size:new Se(C,R)},i.set(a,m),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let v=0;for(let f=0;f<c.length;f++)v+=c[f];const g=a.morphTargetsRelative?1:1-v;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",m.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",m.size)}return{update:r}}function Bg(n,e,t,i){let s=new WeakMap;function r(l){const c=i.render.frame,d=l.geometry,h=e.get(l,d);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),s.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==c&&(m.update(),s.set(m,c))}return h}function o(){s=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Gd=new Ot,Al=new Od(1,1),Wd=new Dd,qd=new Wu,$d=new kd,Rl=[],Cl=[],Pl=new Float32Array(16),Dl=new Float32Array(9),Ll=new Float32Array(4);function gs(n,e,t){const i=n[0];if(i<=0||i>0)return n;const s=e*t;let r=Rl[s];if(r===void 0&&(r=new Float32Array(s),Rl[s]=r),e!==0){i.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(r,a)}return r}function At(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Rt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function sa(n,e){let t=Cl[e];t===void 0&&(t=new Int32Array(e),Cl[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function zg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Hg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2fv(this.addr,e),Rt(t,e)}}function Vg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(At(t,e))return;n.uniform3fv(this.addr,e),Rt(t,e)}}function Gg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4fv(this.addr,e),Rt(t,e)}}function Wg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,i))return;Ll.set(i),n.uniformMatrix2fv(this.addr,!1,Ll),Rt(t,i)}}function qg(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,i))return;Dl.set(i),n.uniformMatrix3fv(this.addr,!1,Dl),Rt(t,i)}}function $g(n,e){const t=this.cache,i=e.elements;if(i===void 0){if(At(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(At(t,i))return;Pl.set(i),n.uniformMatrix4fv(this.addr,!1,Pl),Rt(t,i)}}function Xg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Yg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2iv(this.addr,e),Rt(t,e)}}function jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3iv(this.addr,e),Rt(t,e)}}function Kg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4iv(this.addr,e),Rt(t,e)}}function Zg(n,e){const t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Jg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(At(t,e))return;n.uniform2uiv(this.addr,e),Rt(t,e)}}function Qg(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(At(t,e))return;n.uniform3uiv(this.addr,e),Rt(t,e)}}function e0(n,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(At(t,e))return;n.uniform4uiv(this.addr,e),Rt(t,e)}}function t0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Al.compareFunction=Cd,r=Al):r=Gd,t.setTexture2D(e||r,s)}function n0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||qd,s)}function i0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||$d,s)}function s0(n,e,t){const i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||Wd,s)}function r0(n){switch(n){case 5126:return zg;case 35664:return Hg;case 35665:return Vg;case 35666:return Gg;case 35674:return Wg;case 35675:return qg;case 35676:return $g;case 5124:case 35670:return Xg;case 35667:case 35671:return Yg;case 35668:case 35672:return jg;case 35669:case 35673:return Kg;case 5125:return Zg;case 36294:return Jg;case 36295:return Qg;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return s0}}function a0(n,e){n.uniform1fv(this.addr,e)}function o0(n,e){const t=gs(e,this.size,2);n.uniform2fv(this.addr,t)}function c0(n,e){const t=gs(e,this.size,3);n.uniform3fv(this.addr,t)}function l0(n,e){const t=gs(e,this.size,4);n.uniform4fv(this.addr,t)}function d0(n,e){const t=gs(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function h0(n,e){const t=gs(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function u0(n,e){const t=gs(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function p0(n,e){n.uniform1iv(this.addr,e)}function f0(n,e){n.uniform2iv(this.addr,e)}function m0(n,e){n.uniform3iv(this.addr,e)}function g0(n,e){n.uniform4iv(this.addr,e)}function v0(n,e){n.uniform1uiv(this.addr,e)}function _0(n,e){n.uniform2uiv(this.addr,e)}function y0(n,e){n.uniform3uiv(this.addr,e)}function b0(n,e){n.uniform4uiv(this.addr,e)}function x0(n,e,t){const i=this.cache,s=e.length,r=sa(t,s);At(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2D(e[o]||Gd,r[o])}function S0(n,e,t){const i=this.cache,s=e.length,r=sa(t,s);At(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture3D(e[o]||qd,r[o])}function M0(n,e,t){const i=this.cache,s=e.length,r=sa(t,s);At(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTextureCube(e[o]||$d,r[o])}function w0(n,e,t){const i=this.cache,s=e.length,r=sa(t,s);At(i,r)||(n.uniform1iv(this.addr,r),Rt(i,r));for(let o=0;o!==s;++o)t.setTexture2DArray(e[o]||Wd,r[o])}function E0(n){switch(n){case 5126:return a0;case 35664:return o0;case 35665:return c0;case 35666:return l0;case 35674:return d0;case 35675:return h0;case 35676:return u0;case 5124:case 35670:return p0;case 35667:case 35671:return f0;case 35668:case 35672:return m0;case 35669:case 35673:return g0;case 5125:return v0;case 36294:return _0;case 36295:return y0;case 36296:return b0;case 35678:case 36198:case 36298:case 36306:case 35682:return x0;case 35679:case 36299:case 36307:return S0;case 35680:case 36300:case 36308:case 36293:return M0;case 36289:case 36303:case 36311:case 36292:return w0}}class T0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=r0(t.type)}}class A0{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=E0(t.type)}}class R0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){const s=this.seq;for(let r=0,o=s.length;r!==o;++r){const a=s[r];a.setValue(e,t[a.id],i)}}}const Xa=/(\w+)(\])?(\[|\.)?/g;function Il(n,e){n.seq.push(e),n.map[e.id]=e}function C0(n,e,t){const i=n.name,s=i.length;for(Xa.lastIndex=0;;){const r=Xa.exec(i),o=Xa.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===s){Il(t,c===void 0?new T0(a,n,e):new A0(a,n,e));break}else{let h=t.map[a];h===void 0&&(h=new R0(a),Il(t,h)),t=h}}}class Ir{constructor(e,t){this.seq=[],this.map={};const i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){const r=e.getActiveUniform(t,s),o=e.getUniformLocation(t,r.name);C0(r,o,this)}}setValue(e,t,i,s){const r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){const s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,s)}}static seqWithValue(e,t){const i=[];for(let s=0,r=e.length;s!==r;++s){const o=e[s];o.id in t&&i.push(o)}return i}}function Ul(n,e,t){const i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}const P0=37297;let D0=0;function L0(n,e){const t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=s;o<r;o++){const a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}const Nl=new $e;function I0(n){st._getMatrix(Nl,st.workingColorSpace,n);const e=`mat3( ${Nl.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case zr:return[e,"LinearTransferOETF"];case dt:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function kl(n,e,t){const i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+L0(n.getShaderSource(e),a)}else return r}function U0(n,e){const t=I0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function N0(n,e){let t;switch(e){case su:t="Linear";break;case ru:t="Reinhard";break;case au:t="Cineon";break;case _d:t="ACESFilmic";break;case cu:t="AgX";break;case lu:t="Neutral";break;case ou:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Tr=new A;function k0(){st.getLuminanceCoefficients(Tr);const n=Tr.x.toFixed(4),e=Tr.y.toFixed(4),t=Tr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function O0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ts).join(`
`)}function F0(n){const e=[];for(const t in n){const i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function B0(n,e){const t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=n.getActiveAttrib(e,s),o=r.name;let a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Ts(n){return n!==""}function Ol(n,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fl(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const z0=/^[ \t]*#include +<([\w\d./]+)>/gm;function $o(n){return n.replace(z0,V0)}const H0=new Map;function V0(n,e){let t=Ke[e];if(t===void 0){const i=H0.get(e);if(i!==void 0)t=Ke[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return $o(t)}const G0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bl(n){return n.replace(G0,W0)}function W0(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function zl(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function q0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===md?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===gd?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===On&&(e="SHADOWMAP_TYPE_VSM"),e}function $0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case cs:case ls:e="ENVMAP_TYPE_CUBE";break;case Qr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function X0(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case ls:e="ENVMAP_MODE_REFRACTION";break}return e}function Y0(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case vd:e="ENVMAP_BLENDING_MULTIPLY";break;case nu:e="ENVMAP_BLENDING_MIX";break;case iu:e="ENVMAP_BLENDING_ADD";break}return e}function j0(n){const e=n.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function K0(n,e,t,i){const s=n.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=q0(t),c=$0(t),d=X0(t),h=Y0(t),m=j0(t),p=O0(t),v=F0(r),g=s.createProgram();let f,u,E=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ts).join(`
`),f.length>0&&(f+=`
`),u=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v].filter(Ts).join(`
`),u.length>0&&(u+=`
`)):(f=[zl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ts).join(`
`),u=[zl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,v,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",m?"#define CUBEUV_TEXEL_WIDTH "+m.texelWidth:"",m?"#define CUBEUV_TEXEL_HEIGHT "+m.texelHeight:"",m?"#define CUBEUV_MAX_MIP "+m.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==si?"#define TONE_MAPPING":"",t.toneMapping!==si?Ke.tonemapping_pars_fragment:"",t.toneMapping!==si?N0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ke.colorspace_pars_fragment,U0("linearToOutputTexel",t.outputColorSpace),k0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ts).join(`
`)),o=$o(o),o=Ol(o,t),o=Fl(o,t),a=$o(a),a=Ol(a,t),a=Fl(a,t),o=Bl(o),a=Bl(a),t.isRawShaderMaterial!==!0&&(E=`#version 300 es
`,f=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,u=["#define varying in",t.glslVersion===Oc?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Oc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+u);const w=E+f+o,x=E+u+a,C=Ul(s,s.VERTEX_SHADER,w),R=Ul(s,s.FRAGMENT_SHADER,x);s.attachShader(g,C),s.attachShader(g,R),t.index0AttributeName!==void 0?s.bindAttribLocation(g,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(g,0,"position"),s.linkProgram(g);function P(L){if(n.debug.checkShaderErrors){const k=s.getProgramInfoLog(g)||"",H=s.getShaderInfoLog(C)||"",X=s.getShaderInfoLog(R)||"",q=k.trim(),$=H.trim(),K=X.trim();let B=!0,pe=!0;if(s.getProgramParameter(g,s.LINK_STATUS)===!1)if(B=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,g,C,R);else{const ue=kl(s,C,"vertex"),Ie=kl(s,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(g,s.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+q+`
`+ue+`
`+Ie)}else q!==""?console.warn("THREE.WebGLProgram: Program Info Log:",q):($===""||K==="")&&(pe=!1);pe&&(L.diagnostics={runnable:B,programLog:q,vertexShader:{log:$,prefix:f},fragmentShader:{log:K,prefix:u}})}s.deleteShader(C),s.deleteShader(R),D=new Ir(s,g),y=B0(s,g)}let D;this.getUniforms=function(){return D===void 0&&P(this),D};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let b=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=s.getProgramParameter(g,P0)),b},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=D0++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=C,this.fragmentShader=R,this}let Z0=0;class J0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){const t=this.shaderCache;let i=t.get(e);return i===void 0&&(i=new Q0(e),t.set(e,i)),i}}class Q0{constructor(e){this.id=Z0++,this.code=e,this.usedTimes=0}}function ev(n,e,t,i,s,r,o){const a=new lc,l=new J0,c=new Set,d=[],h=s.logarithmicDepthBuffer,m=s.vertexTextures;let p=s.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return c.add(y),y===0?"uv":`uv${y}`}function f(y,b,L,k,H){const X=k.fog,q=H.geometry,$=y.isMeshStandardMaterial?k.environment:null,K=(y.isMeshStandardMaterial?t:e).get(y.envMap||$),B=K&&K.mapping===Qr?K.image.height:null,pe=v[y.type];y.precision!==null&&(p=s.getMaxPrecision(y.precision),p!==y.precision&&console.warn("THREE.WebGLProgram.getParameters:",y.precision,"not supported, using",p,"instead."));const ue=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Ie=ue!==void 0?ue.length:0;let Xe=0;q.morphAttributes.position!==void 0&&(Xe=1),q.morphAttributes.normal!==void 0&&(Xe=2),q.morphAttributes.color!==void 0&&(Xe=3);let rt,ct,et,j;if(pe){const at=Sn[pe];rt=at.vertexShader,ct=at.fragmentShader}else rt=y.vertexShader,ct=y.fragmentShader,l.update(y),et=l.getVertexShaderID(y),j=l.getFragmentShaderID(y);const ee=n.getRenderTarget(),G=n.state.buffers.depth.getReversed(),le=H.isInstancedMesh===!0,Y=H.isBatchedMesh===!0,se=!!y.map,Re=!!y.matcap,T=!!K,de=!!y.aoMap,ie=!!y.lightMap,oe=!!y.bumpMap,he=!!y.normalMap,Ge=!!y.displacementMap,J=!!y.emissiveMap,be=!!y.metalnessMap,Qe=!!y.roughnessMap,xe=y.anisotropy>0,S=y.clearcoat>0,_=y.dispersion>0,I=y.iridescence>0,F=y.sheen>0,Z=y.transmission>0,W=xe&&!!y.anisotropyMap,Ae=S&&!!y.clearcoatMap,ne=S&&!!y.clearcoatNormalMap,Ce=S&&!!y.clearcoatRoughnessMap,we=I&&!!y.iridescenceMap,te=I&&!!y.iridescenceThicknessMap,ye=F&&!!y.sheenColorMap,Be=F&&!!y.sheenRoughnessMap,Ue=!!y.specularMap,ve=!!y.specularColorMap,Ye=!!y.specularIntensityMap,U=Z&&!!y.transmissionMap,ce=Z&&!!y.thicknessMap,me=!!y.gradientMap,Pe=!!y.alphaMap,re=y.alphaTest>0,Q=!!y.alphaHash,Le=!!y.extensions;let qe=si;y.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(qe=n.toneMapping);const pt={shaderID:pe,shaderType:y.type,shaderName:y.name,vertexShader:rt,fragmentShader:ct,defines:y.defines,customVertexShaderID:et,customFragmentShaderID:j,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:p,batching:Y,batchingColor:Y&&H._colorsTexture!==null,instancing:le,instancingColor:le&&H.instanceColor!==null,instancingMorph:le&&H.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:ee===null?n.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:ds,alphaToCoverage:!!y.alphaToCoverage,map:se,matcap:Re,envMap:T,envMapMode:T&&K.mapping,envMapCubeUVHeight:B,aoMap:de,lightMap:ie,bumpMap:oe,normalMap:he,displacementMap:m&&Ge,emissiveMap:J,normalMapObjectSpace:he&&y.normalMapType===pu,normalMapTangentSpace:he&&y.normalMapType===Rd,metalnessMap:be,roughnessMap:Qe,anisotropy:xe,anisotropyMap:W,clearcoat:S,clearcoatMap:Ae,clearcoatNormalMap:ne,clearcoatRoughnessMap:Ce,dispersion:_,iridescence:I,iridescenceMap:we,iridescenceThicknessMap:te,sheen:F,sheenColorMap:ye,sheenRoughnessMap:Be,specularMap:Ue,specularColorMap:ve,specularIntensityMap:Ye,transmission:Z,transmissionMap:U,thicknessMap:ce,gradientMap:me,opaque:y.transparent===!1&&y.blending===es&&y.alphaToCoverage===!1,alphaMap:Pe,alphaTest:re,alphaHash:Q,combine:y.combine,mapUv:se&&g(y.map.channel),aoMapUv:de&&g(y.aoMap.channel),lightMapUv:ie&&g(y.lightMap.channel),bumpMapUv:oe&&g(y.bumpMap.channel),normalMapUv:he&&g(y.normalMap.channel),displacementMapUv:Ge&&g(y.displacementMap.channel),emissiveMapUv:J&&g(y.emissiveMap.channel),metalnessMapUv:be&&g(y.metalnessMap.channel),roughnessMapUv:Qe&&g(y.roughnessMap.channel),anisotropyMapUv:W&&g(y.anisotropyMap.channel),clearcoatMapUv:Ae&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ne&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:we&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:te&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:Be&&g(y.sheenRoughnessMap.channel),specularMapUv:Ue&&g(y.specularMap.channel),specularColorMapUv:ve&&g(y.specularColorMap.channel),specularIntensityMapUv:Ye&&g(y.specularIntensityMap.channel),transmissionMapUv:U&&g(y.transmissionMap.channel),thicknessMapUv:ce&&g(y.thicknessMap.channel),alphaMapUv:Pe&&g(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(he||xe),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!q.attributes.uv&&(se||Pe),fog:!!X,useFog:y.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:y.flatShading===!0&&y.wireframe===!1,sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:G,skinning:H.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Ie,morphTextureStride:Xe,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:qe,decodeVideoTexture:se&&y.map.isVideoTexture===!0&&st.getTransfer(y.map.colorSpace)===dt,decodeVideoTextureEmissive:J&&y.emissiveMap.isVideoTexture===!0&&st.getTransfer(y.emissiveMap.colorSpace)===dt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===qt,flipSided:y.side===Xt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Le&&y.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Le&&y.extensions.multiDraw===!0||Y)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function u(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const L in y.defines)b.push(L),b.push(y.defines[L]);return y.isRawShaderMaterial===!1&&(E(b,y),w(b,y),b.push(n.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function E(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function w(y,b){a.disableAll(),b.supportsVertexTextures&&a.enable(0),b.instancing&&a.enable(1),b.instancingColor&&a.enable(2),b.instancingMorph&&a.enable(3),b.matcap&&a.enable(4),b.envMap&&a.enable(5),b.normalMapObjectSpace&&a.enable(6),b.normalMapTangentSpace&&a.enable(7),b.clearcoat&&a.enable(8),b.iridescence&&a.enable(9),b.alphaTest&&a.enable(10),b.vertexColors&&a.enable(11),b.vertexAlphas&&a.enable(12),b.vertexUv1s&&a.enable(13),b.vertexUv2s&&a.enable(14),b.vertexUv3s&&a.enable(15),b.vertexTangents&&a.enable(16),b.anisotropy&&a.enable(17),b.alphaHash&&a.enable(18),b.batching&&a.enable(19),b.dispersion&&a.enable(20),b.batchingColor&&a.enable(21),b.gradientMap&&a.enable(22),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),y.push(a.mask)}function x(y){const b=v[y.type];let L;if(b){const k=Sn[b];L=ip.clone(k.uniforms)}else L=y.uniforms;return L}function C(y,b){let L;for(let k=0,H=d.length;k<H;k++){const X=d[k];if(X.cacheKey===b){L=X,++L.usedTimes;break}}return L===void 0&&(L=new K0(n,b,y,r),d.push(L)),L}function R(y){if(--y.usedTimes===0){const b=d.indexOf(y);d[b]=d[d.length-1],d.pop(),y.destroy()}}function P(y){l.remove(y)}function D(){l.dispose()}return{getParameters:f,getProgramCacheKey:u,getUniforms:x,acquireProgram:C,releaseProgram:R,releaseShaderCache:P,programs:d,dispose:D}}function tv(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function s(o,a,l){n.get(o)[a]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function nv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function Hl(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Vl(){const n=[];let e=0;const t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function o(h,m,p,v,g,f){let u=n[e];return u===void 0?(u={id:h.id,object:h,geometry:m,material:p,groupOrder:v,renderOrder:h.renderOrder,z:g,group:f},n[e]=u):(u.id=h.id,u.object=h,u.geometry=m,u.material=p,u.groupOrder=v,u.renderOrder=h.renderOrder,u.z=g,u.group=f),e++,u}function a(h,m,p,v,g,f){const u=o(h,m,p,v,g,f);p.transmission>0?i.push(u):p.transparent===!0?s.push(u):t.push(u)}function l(h,m,p,v,g,f){const u=o(h,m,p,v,g,f);p.transmission>0?i.unshift(u):p.transparent===!0?s.unshift(u):t.unshift(u)}function c(h,m){t.length>1&&t.sort(h||nv),i.length>1&&i.sort(m||Hl),s.length>1&&s.sort(m||Hl)}function d(){for(let h=e,m=n.length;h<m;h++){const p=n[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:a,unshift:l,finish:d,sort:c}}function iv(){let n=new WeakMap;function e(i,s){const r=n.get(i);let o;return r===void 0?(o=new Vl,n.set(i,[o])):s>=r.length?(o=new Vl,r.push(o)):o=r[s],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function sv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new We};break;case"SpotLight":t={position:new A,direction:new A,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new We,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new We,groundColor:new We};break;case"RectAreaLight":t={color:new We,position:new A,halfWidth:new A,halfHeight:new A};break}return n[e.id]=t,t}}}function rv(){const n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Se,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}let av=0;function ov(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function cv(n){const e=new sv,t=rv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new A);const s=new A,r=new ot,o=new ot;function a(c){let d=0,h=0,m=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let p=0,v=0,g=0,f=0,u=0,E=0,w=0,x=0,C=0,R=0,P=0;c.sort(ov);for(let y=0,b=c.length;y<b;y++){const L=c[y],k=L.color,H=L.intensity,X=L.distance,q=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)d+=k.r*H,h+=k.g*H,m+=k.b*H;else if(L.isLightProbe){for(let $=0;$<9;$++)i.probe[$].addScaledVector(L.sh.coefficients[$],H);P++}else if(L.isDirectionalLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const K=L.shadow,B=t.get(L);B.shadowIntensity=K.intensity,B.shadowBias=K.bias,B.shadowNormalBias=K.normalBias,B.shadowRadius=K.radius,B.shadowMapSize=K.mapSize,i.directionalShadow[p]=B,i.directionalShadowMap[p]=q,i.directionalShadowMatrix[p]=L.shadow.matrix,E++}i.directional[p]=$,p++}else if(L.isSpotLight){const $=e.get(L);$.position.setFromMatrixPosition(L.matrixWorld),$.color.copy(k).multiplyScalar(H),$.distance=X,$.coneCos=Math.cos(L.angle),$.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),$.decay=L.decay,i.spot[g]=$;const K=L.shadow;if(L.map&&(i.spotLightMap[C]=L.map,C++,K.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[g]=K.matrix,L.castShadow){const B=t.get(L);B.shadowIntensity=K.intensity,B.shadowBias=K.bias,B.shadowNormalBias=K.normalBias,B.shadowRadius=K.radius,B.shadowMapSize=K.mapSize,i.spotShadow[g]=B,i.spotShadowMap[g]=q,x++}g++}else if(L.isRectAreaLight){const $=e.get(L);$.color.copy(k).multiplyScalar(H),$.halfWidth.set(L.width*.5,0,0),$.halfHeight.set(0,L.height*.5,0),i.rectArea[f]=$,f++}else if(L.isPointLight){const $=e.get(L);if($.color.copy(L.color).multiplyScalar(L.intensity),$.distance=L.distance,$.decay=L.decay,L.castShadow){const K=L.shadow,B=t.get(L);B.shadowIntensity=K.intensity,B.shadowBias=K.bias,B.shadowNormalBias=K.normalBias,B.shadowRadius=K.radius,B.shadowMapSize=K.mapSize,B.shadowCameraNear=K.camera.near,B.shadowCameraFar=K.camera.far,i.pointShadow[v]=B,i.pointShadowMap[v]=q,i.pointShadowMatrix[v]=L.shadow.matrix,w++}i.point[v]=$,v++}else if(L.isHemisphereLight){const $=e.get(L);$.skyColor.copy(L.color).multiplyScalar(H),$.groundColor.copy(L.groundColor).multiplyScalar(H),i.hemi[u]=$,u++}}f>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ge.LTC_FLOAT_1,i.rectAreaLTC2=ge.LTC_FLOAT_2):(i.rectAreaLTC1=ge.LTC_HALF_1,i.rectAreaLTC2=ge.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=m;const D=i.hash;(D.directionalLength!==p||D.pointLength!==v||D.spotLength!==g||D.rectAreaLength!==f||D.hemiLength!==u||D.numDirectionalShadows!==E||D.numPointShadows!==w||D.numSpotShadows!==x||D.numSpotMaps!==C||D.numLightProbes!==P)&&(i.directional.length=p,i.spot.length=g,i.rectArea.length=f,i.point.length=v,i.hemi.length=u,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=E,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=x+C-R,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,D.directionalLength=p,D.pointLength=v,D.spotLength=g,D.rectAreaLength=f,D.hemiLength=u,D.numDirectionalShadows=E,D.numPointShadows=w,D.numSpotShadows=x,D.numSpotMaps=C,D.numLightProbes=P,i.version=av++)}function l(c,d){let h=0,m=0,p=0,v=0,g=0;const f=d.matrixWorldInverse;for(let u=0,E=c.length;u<E;u++){const w=c[u];if(w.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),h++}else if(w.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(f),x.direction.setFromMatrixPosition(w.matrixWorld),s.setFromMatrixPosition(w.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(f),p++}else if(w.isRectAreaLight){const x=i.rectArea[v];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(f),o.identity(),r.copy(w.matrixWorld),r.premultiply(f),o.extractRotation(r),x.halfWidth.set(w.width*.5,0,0),x.halfHeight.set(0,w.height*.5,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),v++}else if(w.isPointLight){const x=i.point[m];x.position.setFromMatrixPosition(w.matrixWorld),x.position.applyMatrix4(f),m++}else if(w.isHemisphereLight){const x=i.hemi[g];x.direction.setFromMatrixPosition(w.matrixWorld),x.direction.transformDirection(f),g++}}}return{setup:a,setupView:l,state:i}}function Gl(n){const e=new cv(n),t=[],i=[];function s(d){c.camera=d,t.length=0,i.length=0}function r(d){t.push(d)}function o(d){i.push(d)}function a(){e.setup(t)}function l(d){e.setupView(t,d)}const c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function lv(n){let e=new WeakMap;function t(s,r=0){const o=e.get(s);let a;return o===void 0?(a=new Gl(n),e.set(s,[a])):r>=o.length?(a=new Gl(n),o.push(a)):a=o[r],a}function i(){e=new WeakMap}return{get:t,dispose:i}}const dv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function uv(n,e,t){let i=new na;const s=new Se,r=new Se,o=new vt,a=new Ap({depthPacking:uu}),l=new Rp,c={},d=t.maxTextureSize,h={[ri]:Xt,[Xt]:ri,[qt]:qt},m=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Se},radius:{value:4}},vertexShader:dv,fragmentShader:hv}),p=m.clone();p.defines.HORIZONTAL_PASS=1;const v=new It;v.setAttribute("position",new yn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const g=new gt(v,m),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=md;let u=this.type;this.render=function(R,P,D){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||R.length===0)return;const y=n.getRenderTarget(),b=n.getActiveCubeFace(),L=n.getActiveMipmapLevel(),k=n.state;k.setBlending(ii),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const H=u!==On&&this.type===On,X=u===On&&this.type!==On;for(let q=0,$=R.length;q<$;q++){const K=R[q],B=K.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",K,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const pe=B.getFrameExtents();if(s.multiply(pe),r.copy(B.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/pe.x),s.x=r.x*pe.x,B.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/pe.y),s.y=r.y*pe.y,B.mapSize.y=r.y)),B.map===null||H===!0||X===!0){const Ie=this.type!==On?{minFilter:_n,magFilter:_n}:{};B.map!==null&&B.map.dispose(),B.map=new Ti(s.x,s.y,Ie),B.map.texture.name=K.name+".shadowMap",B.camera.updateProjectionMatrix()}n.setRenderTarget(B.map),n.clear();const ue=B.getViewportCount();for(let Ie=0;Ie<ue;Ie++){const Xe=B.getViewport(Ie);o.set(r.x*Xe.x,r.y*Xe.y,r.x*Xe.z,r.y*Xe.w),k.viewport(o),B.updateMatrices(K,Ie),i=B.getFrustum(),x(P,D,B.camera,K,this.type)}B.isPointLightShadow!==!0&&this.type===On&&E(B,D),B.needsUpdate=!1}u=this.type,f.needsUpdate=!1,n.setRenderTarget(y,b,L)};function E(R,P){const D=e.update(g);m.defines.VSM_SAMPLES!==R.blurSamples&&(m.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,m.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new Ti(s.x,s.y)),m.uniforms.shadow_pass.value=R.map.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,n.setRenderTarget(R.mapPass),n.clear(),n.renderBufferDirect(P,null,D,m,g,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,n.setRenderTarget(R.map),n.clear(),n.renderBufferDirect(P,null,D,p,g,null)}function w(R,P,D,y){let b=null;const L=D.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)b=L;else if(b=D.isPointLight===!0?l:a,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const k=b.uuid,H=P.uuid;let X=c[k];X===void 0&&(X={},c[k]=X);let q=X[H];q===void 0&&(q=b.clone(),X[H]=q,P.addEventListener("dispose",C)),b=q}if(b.visible=P.visible,b.wireframe=P.wireframe,y===On?b.side=P.shadowSide!==null?P.shadowSide:P.side:b.side=P.shadowSide!==null?P.shadowSide:h[P.side],b.alphaMap=P.alphaMap,b.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,b.map=P.map,b.clipShadows=P.clipShadows,b.clippingPlanes=P.clippingPlanes,b.clipIntersection=P.clipIntersection,b.displacementMap=P.displacementMap,b.displacementScale=P.displacementScale,b.displacementBias=P.displacementBias,b.wireframeLinewidth=P.wireframeLinewidth,b.linewidth=P.linewidth,D.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const k=n.properties.get(b);k.light=D}return b}function x(R,P,D,y,b){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&b===On)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,R.matrixWorld);const H=e.update(R),X=R.material;if(Array.isArray(X)){const q=H.groups;for(let $=0,K=q.length;$<K;$++){const B=q[$],pe=X[B.materialIndex];if(pe&&pe.visible){const ue=w(R,pe,y,b);R.onBeforeShadow(n,R,P,D,H,ue,B),n.renderBufferDirect(D,null,H,ue,R,B),R.onAfterShadow(n,R,P,D,H,ue,B)}}}else if(X.visible){const q=w(R,X,y,b);R.onBeforeShadow(n,R,P,D,H,q,null),n.renderBufferDirect(D,null,H,q,R,null),R.onAfterShadow(n,R,P,D,H,q,null)}}const k=R.children;for(let H=0,X=k.length;H<X;H++)x(k[H],P,D,y,b)}function C(R){R.target.removeEventListener("dispose",C);for(const D in c){const y=c[D],b=R.target.uuid;b in y&&(y[b].dispose(),delete y[b])}}}const pv={[so]:ro,[ao]:lo,[oo]:ho,[os]:co,[ro]:so,[lo]:ao,[ho]:oo,[co]:os};function fv(n,e){function t(){let U=!1;const ce=new vt;let me=null;const Pe=new vt(0,0,0,0);return{setMask:function(re){me!==re&&!U&&(n.colorMask(re,re,re,re),me=re)},setLocked:function(re){U=re},setClear:function(re,Q,Le,qe,pt){pt===!0&&(re*=qe,Q*=qe,Le*=qe),ce.set(re,Q,Le,qe),Pe.equals(ce)===!1&&(n.clearColor(re,Q,Le,qe),Pe.copy(ce))},reset:function(){U=!1,me=null,Pe.set(-1,0,0,0)}}}function i(){let U=!1,ce=!1,me=null,Pe=null,re=null;return{setReversed:function(Q){if(ce!==Q){const Le=e.get("EXT_clip_control");Q?Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.ZERO_TO_ONE_EXT):Le.clipControlEXT(Le.LOWER_LEFT_EXT,Le.NEGATIVE_ONE_TO_ONE_EXT),ce=Q;const qe=re;re=null,this.setClear(qe)}},getReversed:function(){return ce},setTest:function(Q){Q?ee(n.DEPTH_TEST):G(n.DEPTH_TEST)},setMask:function(Q){me!==Q&&!U&&(n.depthMask(Q),me=Q)},setFunc:function(Q){if(ce&&(Q=pv[Q]),Pe!==Q){switch(Q){case so:n.depthFunc(n.NEVER);break;case ro:n.depthFunc(n.ALWAYS);break;case ao:n.depthFunc(n.LESS);break;case os:n.depthFunc(n.LEQUAL);break;case oo:n.depthFunc(n.EQUAL);break;case co:n.depthFunc(n.GEQUAL);break;case lo:n.depthFunc(n.GREATER);break;case ho:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Pe=Q}},setLocked:function(Q){U=Q},setClear:function(Q){re!==Q&&(ce&&(Q=1-Q),n.clearDepth(Q),re=Q)},reset:function(){U=!1,me=null,Pe=null,re=null,ce=!1}}}function s(){let U=!1,ce=null,me=null,Pe=null,re=null,Q=null,Le=null,qe=null,pt=null;return{setTest:function(at){U||(at?ee(n.STENCIL_TEST):G(n.STENCIL_TEST))},setMask:function(at){ce!==at&&!U&&(n.stencilMask(at),ce=at)},setFunc:function(at,Dn,bn){(me!==at||Pe!==Dn||re!==bn)&&(n.stencilFunc(at,Dn,bn),me=at,Pe=Dn,re=bn)},setOp:function(at,Dn,bn){(Q!==at||Le!==Dn||qe!==bn)&&(n.stencilOp(at,Dn,bn),Q=at,Le=Dn,qe=bn)},setLocked:function(at){U=at},setClear:function(at){pt!==at&&(n.clearStencil(at),pt=at)},reset:function(){U=!1,ce=null,me=null,Pe=null,re=null,Q=null,Le=null,qe=null,pt=null}}}const r=new t,o=new i,a=new s,l=new WeakMap,c=new WeakMap;let d={},h={},m=new WeakMap,p=[],v=null,g=!1,f=null,u=null,E=null,w=null,x=null,C=null,R=null,P=new We(0,0,0),D=0,y=!1,b=null,L=null,k=null,H=null,X=null;const q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let $=!1,K=0;const B=n.getParameter(n.VERSION);B.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(B)[1]),$=K>=1):B.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(B)[1]),$=K>=2);let pe=null,ue={};const Ie=n.getParameter(n.SCISSOR_BOX),Xe=n.getParameter(n.VIEWPORT),rt=new vt().fromArray(Ie),ct=new vt().fromArray(Xe);function et(U,ce,me,Pe){const re=new Uint8Array(4),Q=n.createTexture();n.bindTexture(U,Q),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Le=0;Le<me;Le++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(ce,0,n.RGBA,1,1,Pe,0,n.RGBA,n.UNSIGNED_BYTE,re):n.texImage2D(ce+Le,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,re);return Q}const j={};j[n.TEXTURE_2D]=et(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=et(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=et(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=et(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ee(n.DEPTH_TEST),o.setFunc(os),oe(!1),he(Dc),ee(n.CULL_FACE),de(ii);function ee(U){d[U]!==!0&&(n.enable(U),d[U]=!0)}function G(U){d[U]!==!1&&(n.disable(U),d[U]=!1)}function le(U,ce){return h[U]!==ce?(n.bindFramebuffer(U,ce),h[U]=ce,U===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ce),U===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ce),!0):!1}function Y(U,ce){let me=p,Pe=!1;if(U){me=m.get(ce),me===void 0&&(me=[],m.set(ce,me));const re=U.textures;if(me.length!==re.length||me[0]!==n.COLOR_ATTACHMENT0){for(let Q=0,Le=re.length;Q<Le;Q++)me[Q]=n.COLOR_ATTACHMENT0+Q;me.length=re.length,Pe=!0}}else me[0]!==n.BACK&&(me[0]=n.BACK,Pe=!0);Pe&&n.drawBuffers(me)}function se(U){return v!==U?(n.useProgram(U),v=U,!0):!1}const Re={[yi]:n.FUNC_ADD,[Bh]:n.FUNC_SUBTRACT,[zh]:n.FUNC_REVERSE_SUBTRACT};Re[Hh]=n.MIN,Re[Vh]=n.MAX;const T={[Gh]:n.ZERO,[Wh]:n.ONE,[qh]:n.SRC_COLOR,[no]:n.SRC_ALPHA,[Zh]:n.SRC_ALPHA_SATURATE,[jh]:n.DST_COLOR,[Xh]:n.DST_ALPHA,[$h]:n.ONE_MINUS_SRC_COLOR,[io]:n.ONE_MINUS_SRC_ALPHA,[Kh]:n.ONE_MINUS_DST_COLOR,[Yh]:n.ONE_MINUS_DST_ALPHA,[Jh]:n.CONSTANT_COLOR,[Qh]:n.ONE_MINUS_CONSTANT_COLOR,[eu]:n.CONSTANT_ALPHA,[tu]:n.ONE_MINUS_CONSTANT_ALPHA};function de(U,ce,me,Pe,re,Q,Le,qe,pt,at){if(U===ii){g===!0&&(G(n.BLEND),g=!1);return}if(g===!1&&(ee(n.BLEND),g=!0),U!==Fh){if(U!==f||at!==y){if((u!==yi||x!==yi)&&(n.blendEquation(n.FUNC_ADD),u=yi,x=yi),at)switch(U){case es:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Lc:n.blendFunc(n.ONE,n.ONE);break;case Ic:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Uc:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case es:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Lc:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ic:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uc:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}E=null,w=null,C=null,R=null,P.set(0,0,0),D=0,f=U,y=at}return}re=re||ce,Q=Q||me,Le=Le||Pe,(ce!==u||re!==x)&&(n.blendEquationSeparate(Re[ce],Re[re]),u=ce,x=re),(me!==E||Pe!==w||Q!==C||Le!==R)&&(n.blendFuncSeparate(T[me],T[Pe],T[Q],T[Le]),E=me,w=Pe,C=Q,R=Le),(qe.equals(P)===!1||pt!==D)&&(n.blendColor(qe.r,qe.g,qe.b,pt),P.copy(qe),D=pt),f=U,y=!1}function ie(U,ce){U.side===qt?G(n.CULL_FACE):ee(n.CULL_FACE);let me=U.side===Xt;ce&&(me=!me),oe(me),U.blending===es&&U.transparent===!1?de(ii):de(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),r.setMask(U.colorWrite);const Pe=U.stencilWrite;a.setTest(Pe),Pe&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),J(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ee(n.SAMPLE_ALPHA_TO_COVERAGE):G(n.SAMPLE_ALPHA_TO_COVERAGE)}function oe(U){b!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),b=U)}function he(U){U!==kh?(ee(n.CULL_FACE),U!==L&&(U===Dc?n.cullFace(n.BACK):U===Oh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):G(n.CULL_FACE),L=U}function Ge(U){U!==k&&($&&n.lineWidth(U),k=U)}function J(U,ce,me){U?(ee(n.POLYGON_OFFSET_FILL),(H!==ce||X!==me)&&(n.polygonOffset(ce,me),H=ce,X=me)):G(n.POLYGON_OFFSET_FILL)}function be(U){U?ee(n.SCISSOR_TEST):G(n.SCISSOR_TEST)}function Qe(U){U===void 0&&(U=n.TEXTURE0+q-1),pe!==U&&(n.activeTexture(U),pe=U)}function xe(U,ce,me){me===void 0&&(pe===null?me=n.TEXTURE0+q-1:me=pe);let Pe=ue[me];Pe===void 0&&(Pe={type:void 0,texture:void 0},ue[me]=Pe),(Pe.type!==U||Pe.texture!==ce)&&(pe!==me&&(n.activeTexture(me),pe=me),n.bindTexture(U,ce||j[U]),Pe.type=U,Pe.texture=ce)}function S(){const U=ue[pe];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function _(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function I(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function F(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Z(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function W(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ae(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ne(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Ce(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function te(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ye(U){rt.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),rt.copy(U))}function Be(U){ct.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),ct.copy(U))}function Ue(U,ce){let me=c.get(ce);me===void 0&&(me=new WeakMap,c.set(ce,me));let Pe=me.get(U);Pe===void 0&&(Pe=n.getUniformBlockIndex(ce,U.name),me.set(U,Pe))}function ve(U,ce){const Pe=c.get(ce).get(U);l.get(ce)!==Pe&&(n.uniformBlockBinding(ce,Pe,U.__bindingPointIndex),l.set(ce,Pe))}function Ye(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},pe=null,ue={},h={},m=new WeakMap,p=[],v=null,g=!1,f=null,u=null,E=null,w=null,x=null,C=null,R=null,P=new We(0,0,0),D=0,y=!1,b=null,L=null,k=null,H=null,X=null,rt.set(0,0,n.canvas.width,n.canvas.height),ct.set(0,0,n.canvas.width,n.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ee,disable:G,bindFramebuffer:le,drawBuffers:Y,useProgram:se,setBlending:de,setMaterial:ie,setFlipSided:oe,setCullFace:he,setLineWidth:Ge,setPolygonOffset:J,setScissorTest:be,activeTexture:Qe,bindTexture:xe,unbindTexture:S,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:we,texImage3D:te,updateUBOMapping:Ue,uniformBlockBinding:ve,texStorage2D:ne,texStorage3D:Ce,texSubImage2D:F,texSubImage3D:Z,compressedTexSubImage2D:W,compressedTexSubImage3D:Ae,scissor:ye,viewport:Be,reset:Ye}}function mv(n,e,t,i,s,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Se,d=new WeakMap;let h;const m=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(S,_){return p?new OffscreenCanvas(S,_):Ws("canvas")}function g(S,_,I){let F=1;const Z=xe(S);if((Z.width>I||Z.height>I)&&(F=I/Math.max(Z.width,Z.height)),F<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){const W=Math.floor(F*Z.width),Ae=Math.floor(F*Z.height);h===void 0&&(h=v(W,Ae));const ne=_?v(W,Ae):h;return ne.width=W,ne.height=Ae,ne.getContext("2d").drawImage(S,0,0,W,Ae),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+W+"x"+Ae+")."),ne}else return"data"in S&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),S;return S}function f(S){return S.generateMipmaps}function u(S){n.generateMipmap(S)}function E(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function w(S,_,I,F,Z=!1){if(S!==null){if(n[S]!==void 0)return n[S];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let W=_;if(_===n.RED&&(I===n.FLOAT&&(W=n.R32F),I===n.HALF_FLOAT&&(W=n.R16F),I===n.UNSIGNED_BYTE&&(W=n.R8)),_===n.RED_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.R8UI),I===n.UNSIGNED_SHORT&&(W=n.R16UI),I===n.UNSIGNED_INT&&(W=n.R32UI),I===n.BYTE&&(W=n.R8I),I===n.SHORT&&(W=n.R16I),I===n.INT&&(W=n.R32I)),_===n.RG&&(I===n.FLOAT&&(W=n.RG32F),I===n.HALF_FLOAT&&(W=n.RG16F),I===n.UNSIGNED_BYTE&&(W=n.RG8)),_===n.RG_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RG8UI),I===n.UNSIGNED_SHORT&&(W=n.RG16UI),I===n.UNSIGNED_INT&&(W=n.RG32UI),I===n.BYTE&&(W=n.RG8I),I===n.SHORT&&(W=n.RG16I),I===n.INT&&(W=n.RG32I)),_===n.RGB_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RGB8UI),I===n.UNSIGNED_SHORT&&(W=n.RGB16UI),I===n.UNSIGNED_INT&&(W=n.RGB32UI),I===n.BYTE&&(W=n.RGB8I),I===n.SHORT&&(W=n.RGB16I),I===n.INT&&(W=n.RGB32I)),_===n.RGBA_INTEGER&&(I===n.UNSIGNED_BYTE&&(W=n.RGBA8UI),I===n.UNSIGNED_SHORT&&(W=n.RGBA16UI),I===n.UNSIGNED_INT&&(W=n.RGBA32UI),I===n.BYTE&&(W=n.RGBA8I),I===n.SHORT&&(W=n.RGBA16I),I===n.INT&&(W=n.RGBA32I)),_===n.RGB&&(I===n.UNSIGNED_INT_5_9_9_9_REV&&(W=n.RGB9_E5),I===n.UNSIGNED_INT_10F_11F_11F_REV&&(W=n.R11F_G11F_B10F)),_===n.RGBA){const Ae=Z?zr:st.getTransfer(F);I===n.FLOAT&&(W=n.RGBA32F),I===n.HALF_FLOAT&&(W=n.RGBA16F),I===n.UNSIGNED_BYTE&&(W=Ae===dt?n.SRGB8_ALPHA8:n.RGBA8),I===n.UNSIGNED_SHORT_4_4_4_4&&(W=n.RGBA4),I===n.UNSIGNED_SHORT_5_5_5_1&&(W=n.RGB5_A1)}return(W===n.R16F||W===n.R32F||W===n.RG16F||W===n.RG32F||W===n.RGBA16F||W===n.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function x(S,_){let I;return S?_===null||_===Ei||_===zs?I=n.DEPTH24_STENCIL8:_===zn?I=n.DEPTH32F_STENCIL8:_===Bs&&(I=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ei||_===zs?I=n.DEPTH_COMPONENT24:_===zn?I=n.DEPTH_COMPONENT32F:_===Bs&&(I=n.DEPTH_COMPONENT16),I}function C(S,_){return f(S)===!0||S.isFramebufferTexture&&S.minFilter!==_n&&S.minFilter!==wn?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function R(S){const _=S.target;_.removeEventListener("dispose",R),D(_),_.isVideoTexture&&d.delete(_)}function P(S){const _=S.target;_.removeEventListener("dispose",P),b(_)}function D(S){const _=i.get(S);if(_.__webglInit===void 0)return;const I=S.source,F=m.get(I);if(F){const Z=F[_.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&y(S),Object.keys(F).length===0&&m.delete(I)}i.remove(S)}function y(S){const _=i.get(S);n.deleteTexture(_.__webglTexture);const I=S.source,F=m.get(I);delete F[_.__cacheKey],o.memory.textures--}function b(S){const _=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(_.__webglFramebuffer[F]))for(let Z=0;Z<_.__webglFramebuffer[F].length;Z++)n.deleteFramebuffer(_.__webglFramebuffer[F][Z]);else n.deleteFramebuffer(_.__webglFramebuffer[F]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[F])}else{if(Array.isArray(_.__webglFramebuffer))for(let F=0;F<_.__webglFramebuffer.length;F++)n.deleteFramebuffer(_.__webglFramebuffer[F]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let F=0;F<_.__webglColorRenderbuffer.length;F++)_.__webglColorRenderbuffer[F]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[F]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=S.textures;for(let F=0,Z=I.length;F<Z;F++){const W=i.get(I[F]);W.__webglTexture&&(n.deleteTexture(W.__webglTexture),o.memory.textures--),i.remove(I[F])}i.remove(S)}let L=0;function k(){L=0}function H(){const S=L;return S>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+S+" texture units while this GPU supports only "+s.maxTextures),L+=1,S}function X(S){const _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function q(S,_){const I=i.get(S);if(S.isVideoTexture&&be(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&I.__version!==S.version){const F=S.image;if(F===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{j(I,S,_);return}}else S.isExternalTexture&&(I.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,I.__webglTexture,n.TEXTURE0+_)}function $(S,_){const I=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&I.__version!==S.version){j(I,S,_);return}t.bindTexture(n.TEXTURE_2D_ARRAY,I.__webglTexture,n.TEXTURE0+_)}function K(S,_){const I=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&I.__version!==S.version){j(I,S,_);return}t.bindTexture(n.TEXTURE_3D,I.__webglTexture,n.TEXTURE0+_)}function B(S,_){const I=i.get(S);if(S.version>0&&I.__version!==S.version){ee(I,S,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+_)}const pe={[fo]:n.REPEAT,[xi]:n.CLAMP_TO_EDGE,[mo]:n.MIRRORED_REPEAT},ue={[_n]:n.NEAREST,[du]:n.NEAREST_MIPMAP_NEAREST,[ir]:n.NEAREST_MIPMAP_LINEAR,[wn]:n.LINEAR,[pa]:n.LINEAR_MIPMAP_NEAREST,[Si]:n.LINEAR_MIPMAP_LINEAR},Ie={[fu]:n.NEVER,[bu]:n.ALWAYS,[mu]:n.LESS,[Cd]:n.LEQUAL,[gu]:n.EQUAL,[yu]:n.GEQUAL,[vu]:n.GREATER,[_u]:n.NOTEQUAL};function Xe(S,_){if(_.type===zn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===wn||_.magFilter===pa||_.magFilter===ir||_.magFilter===Si||_.minFilter===wn||_.minFilter===pa||_.minFilter===ir||_.minFilter===Si)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,pe[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,pe[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,pe[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,ue[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,ue[_.minFilter]),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,Ie[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===_n||_.minFilter!==ir&&_.minFilter!==Si||_.type===zn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function rt(S,_){let I=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",R));const F=_.source;let Z=m.get(F);Z===void 0&&(Z={},m.set(F,Z));const W=X(_);if(W!==S.__cacheKey){Z[W]===void 0&&(Z[W]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,I=!0),Z[W].usedTimes++;const Ae=Z[S.__cacheKey];Ae!==void 0&&(Z[S.__cacheKey].usedTimes--,Ae.usedTimes===0&&y(_)),S.__cacheKey=W,S.__webglTexture=Z[W].texture}return I}function ct(S,_,I){return Math.floor(Math.floor(S/I)/_)}function et(S,_,I,F){const W=S.updateRanges;if(W.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,I,F,_.data);else{W.sort((te,ye)=>te.start-ye.start);let Ae=0;for(let te=1;te<W.length;te++){const ye=W[Ae],Be=W[te],Ue=ye.start+ye.count,ve=ct(Be.start,_.width,4),Ye=ct(ye.start,_.width,4);Be.start<=Ue+1&&ve===Ye&&ct(Be.start+Be.count-1,_.width,4)===ve?ye.count=Math.max(ye.count,Be.start+Be.count-ye.start):(++Ae,W[Ae]=Be)}W.length=Ae+1;const ne=n.getParameter(n.UNPACK_ROW_LENGTH),Ce=n.getParameter(n.UNPACK_SKIP_PIXELS),we=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let te=0,ye=W.length;te<ye;te++){const Be=W[te],Ue=Math.floor(Be.start/4),ve=Math.ceil(Be.count/4),Ye=Ue%_.width,U=Math.floor(Ue/_.width),ce=ve,me=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ye),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Ye,U,ce,me,I,F,_.data)}S.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,ne),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ce),n.pixelStorei(n.UNPACK_SKIP_ROWS,we)}}function j(S,_,I){let F=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(F=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(F=n.TEXTURE_3D);const Z=rt(S,_),W=_.source;t.bindTexture(F,S.__webglTexture,n.TEXTURE0+I);const Ae=i.get(W);if(W.version!==Ae.__version||Z===!0){t.activeTexture(n.TEXTURE0+I);const ne=st.getPrimaries(st.workingColorSpace),Ce=_.colorSpace===Jn?null:st.getPrimaries(_.colorSpace),we=_.colorSpace===Jn||ne===Ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,we);let te=g(_.image,!1,s.maxTextureSize);te=Qe(_,te);const ye=r.convert(_.format,_.colorSpace),Be=r.convert(_.type);let Ue=w(_.internalFormat,ye,Be,_.colorSpace,_.isVideoTexture);Xe(F,_);let ve;const Ye=_.mipmaps,U=_.isVideoTexture!==!0,ce=Ae.__version===void 0||Z===!0,me=W.dataReady,Pe=C(_,te);if(_.isDepthTexture)Ue=x(_.format===Vs,_.type),ce&&(U?t.texStorage2D(n.TEXTURE_2D,1,Ue,te.width,te.height):t.texImage2D(n.TEXTURE_2D,0,Ue,te.width,te.height,0,ye,Be,null));else if(_.isDataTexture)if(Ye.length>0){U&&ce&&t.texStorage2D(n.TEXTURE_2D,Pe,Ue,Ye[0].width,Ye[0].height);for(let re=0,Q=Ye.length;re<Q;re++)ve=Ye[re],U?me&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ve.width,ve.height,ye,Be,ve.data):t.texImage2D(n.TEXTURE_2D,re,Ue,ve.width,ve.height,0,ye,Be,ve.data);_.generateMipmaps=!1}else U?(ce&&t.texStorage2D(n.TEXTURE_2D,Pe,Ue,te.width,te.height),me&&et(_,te,ye,Be)):t.texImage2D(n.TEXTURE_2D,0,Ue,te.width,te.height,0,ye,Be,te.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){U&&ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Pe,Ue,Ye[0].width,Ye[0].height,te.depth);for(let re=0,Q=Ye.length;re<Q;re++)if(ve=Ye[re],_.format!==pn)if(ye!==null)if(U){if(me)if(_.layerUpdates.size>0){const Le=yl(ve.width,ve.height,_.format,_.type);for(const qe of _.layerUpdates){const pt=ve.data.subarray(qe*Le/ve.data.BYTES_PER_ELEMENT,(qe+1)*Le/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,qe,ve.width,ve.height,1,ye,pt)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,te.depth,ye,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,re,Ue,ve.width,ve.height,te.depth,0,ve.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?me&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,re,0,0,0,ve.width,ve.height,te.depth,ye,Be,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,re,Ue,ve.width,ve.height,te.depth,0,ye,Be,ve.data)}else{U&&ce&&t.texStorage2D(n.TEXTURE_2D,Pe,Ue,Ye[0].width,Ye[0].height);for(let re=0,Q=Ye.length;re<Q;re++)ve=Ye[re],_.format!==pn?ye!==null?U?me&&t.compressedTexSubImage2D(n.TEXTURE_2D,re,0,0,ve.width,ve.height,ye,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,re,Ue,ve.width,ve.height,0,ve.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?me&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ve.width,ve.height,ye,Be,ve.data):t.texImage2D(n.TEXTURE_2D,re,Ue,ve.width,ve.height,0,ye,Be,ve.data)}else if(_.isDataArrayTexture)if(U){if(ce&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Pe,Ue,te.width,te.height,te.depth),me)if(_.layerUpdates.size>0){const re=yl(te.width,te.height,_.format,_.type);for(const Q of _.layerUpdates){const Le=te.data.subarray(Q*re/te.data.BYTES_PER_ELEMENT,(Q+1)*re/te.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Q,te.width,te.height,1,ye,Be,Le)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,te.width,te.height,te.depth,ye,Be,te.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,te.width,te.height,te.depth,0,ye,Be,te.data);else if(_.isData3DTexture)U?(ce&&t.texStorage3D(n.TEXTURE_3D,Pe,Ue,te.width,te.height,te.depth),me&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,te.width,te.height,te.depth,ye,Be,te.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,te.width,te.height,te.depth,0,ye,Be,te.data);else if(_.isFramebufferTexture){if(ce)if(U)t.texStorage2D(n.TEXTURE_2D,Pe,Ue,te.width,te.height);else{let re=te.width,Q=te.height;for(let Le=0;Le<Pe;Le++)t.texImage2D(n.TEXTURE_2D,Le,Ue,re,Q,0,ye,Be,null),re>>=1,Q>>=1}}else if(Ye.length>0){if(U&&ce){const re=xe(Ye[0]);t.texStorage2D(n.TEXTURE_2D,Pe,Ue,re.width,re.height)}for(let re=0,Q=Ye.length;re<Q;re++)ve=Ye[re],U?me&&t.texSubImage2D(n.TEXTURE_2D,re,0,0,ye,Be,ve):t.texImage2D(n.TEXTURE_2D,re,Ue,ye,Be,ve);_.generateMipmaps=!1}else if(U){if(ce){const re=xe(te);t.texStorage2D(n.TEXTURE_2D,Pe,Ue,re.width,re.height)}me&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ye,Be,te)}else t.texImage2D(n.TEXTURE_2D,0,Ue,ye,Be,te);f(_)&&u(F),Ae.__version=W.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function ee(S,_,I){if(_.image.length!==6)return;const F=rt(S,_),Z=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+I);const W=i.get(Z);if(Z.version!==W.__version||F===!0){t.activeTexture(n.TEXTURE0+I);const Ae=st.getPrimaries(st.workingColorSpace),ne=_.colorSpace===Jn?null:st.getPrimaries(_.colorSpace),Ce=_.colorSpace===Jn||Ae===ne?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const we=_.isCompressedTexture||_.image[0].isCompressedTexture,te=_.image[0]&&_.image[0].isDataTexture,ye=[];for(let Q=0;Q<6;Q++)!we&&!te?ye[Q]=g(_.image[Q],!0,s.maxCubemapSize):ye[Q]=te?_.image[Q].image:_.image[Q],ye[Q]=Qe(_,ye[Q]);const Be=ye[0],Ue=r.convert(_.format,_.colorSpace),ve=r.convert(_.type),Ye=w(_.internalFormat,Ue,ve,_.colorSpace),U=_.isVideoTexture!==!0,ce=W.__version===void 0||F===!0,me=Z.dataReady;let Pe=C(_,Be);Xe(n.TEXTURE_CUBE_MAP,_);let re;if(we){U&&ce&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Pe,Ye,Be.width,Be.height);for(let Q=0;Q<6;Q++){re=ye[Q].mipmaps;for(let Le=0;Le<re.length;Le++){const qe=re[Le];_.format!==pn?Ue!==null?U?me&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,0,0,qe.width,qe.height,Ue,qe.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,Ye,qe.width,qe.height,0,qe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,0,0,qe.width,qe.height,Ue,ve,qe.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le,Ye,qe.width,qe.height,0,Ue,ve,qe.data)}}}else{if(re=_.mipmaps,U&&ce){re.length>0&&Pe++;const Q=xe(ye[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Pe,Ye,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(te){U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,ye[Q].width,ye[Q].height,Ue,ve,ye[Q].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,ye[Q].width,ye[Q].height,0,Ue,ve,ye[Q].data);for(let Le=0;Le<re.length;Le++){const pt=re[Le].image[Q].image;U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,0,0,pt.width,pt.height,Ue,ve,pt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,Ye,pt.width,pt.height,0,Ue,ve,pt.data)}}else{U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Ue,ve,ye[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Ye,Ue,ve,ye[Q]);for(let Le=0;Le<re.length;Le++){const qe=re[Le];U?me&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,0,0,Ue,ve,qe.image[Q]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Q,Le+1,Ye,Ue,ve,qe.image[Q])}}}f(_)&&u(n.TEXTURE_CUBE_MAP),W.__version=Z.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function G(S,_,I,F,Z,W){const Ae=r.convert(I.format,I.colorSpace),ne=r.convert(I.type),Ce=w(I.internalFormat,Ae,ne,I.colorSpace),we=i.get(_),te=i.get(I);if(te.__renderTarget=_,!we.__hasExternalTextures){const ye=Math.max(1,_.width>>W),Be=Math.max(1,_.height>>W);Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY?t.texImage3D(Z,W,Ce,ye,Be,_.depth,0,Ae,ne,null):t.texImage2D(Z,W,Ce,ye,Be,0,Ae,ne,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),J(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,Z,te.__webglTexture,0,Ge(_)):(Z===n.TEXTURE_2D||Z>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,F,Z,te.__webglTexture,W),t.bindFramebuffer(n.FRAMEBUFFER,null)}function le(S,_,I){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer){const F=_.depthTexture,Z=F&&F.isDepthTexture?F.type:null,W=x(_.stencilBuffer,Z),Ae=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ne=Ge(_);J(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ne,W,_.width,_.height):I?n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,W,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,W,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,Ae,n.RENDERBUFFER,S)}else{const F=_.textures;for(let Z=0;Z<F.length;Z++){const W=F[Z],Ae=r.convert(W.format,W.colorSpace),ne=r.convert(W.type),Ce=w(W.internalFormat,Ae,ne,W.colorSpace),we=Ge(_);I&&J(_)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,we,Ce,_.width,_.height):J(_)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,we,Ce,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,Ce,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Y(S,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const F=i.get(_.depthTexture);F.__renderTarget=_,(!F.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q(_.depthTexture,0);const Z=F.__webglTexture,W=Ge(_);if(_.depthTexture.format===Hs)J(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,Z,0);else if(_.depthTexture.format===Vs)J(_)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0,W):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,Z,0);else throw new Error("Unknown depthTexture format")}function se(S){const _=i.get(S),I=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){const F=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),F){const Z=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,F.removeEventListener("dispose",Z)};F.addEventListener("dispose",Z),_.__depthDisposeCallback=Z}_.__boundDepthTexture=F}if(S.depthTexture&&!_.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");const F=S.texture.mipmaps;F&&F.length>0?Y(_.__webglFramebuffer[0],S):Y(_.__webglFramebuffer,S)}else if(I){_.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[F]),_.__webglDepthbuffer[F]===void 0)_.__webglDepthbuffer[F]=n.createRenderbuffer(),le(_.__webglDepthbuffer[F],S,!1);else{const Z=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[F];n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,W)}}else{const F=S.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),le(_.__webglDepthbuffer,S,!1);else{const Z=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,W),n.framebufferRenderbuffer(n.FRAMEBUFFER,Z,n.RENDERBUFFER,W)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Re(S,_,I){const F=i.get(S);_!==void 0&&G(F.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),I!==void 0&&se(S)}function T(S){const _=S.texture,I=i.get(S),F=i.get(_);S.addEventListener("dispose",P);const Z=S.textures,W=S.isWebGLCubeRenderTarget===!0,Ae=Z.length>1;if(Ae||(F.__webglTexture===void 0&&(F.__webglTexture=n.createTexture()),F.__version=_.version,o.memory.textures++),W){I.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[ne]=[];for(let Ce=0;Ce<_.mipmaps.length;Ce++)I.__webglFramebuffer[ne][Ce]=n.createFramebuffer()}else I.__webglFramebuffer[ne]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let ne=0;ne<_.mipmaps.length;ne++)I.__webglFramebuffer[ne]=n.createFramebuffer()}else I.__webglFramebuffer=n.createFramebuffer();if(Ae)for(let ne=0,Ce=Z.length;ne<Ce;ne++){const we=i.get(Z[ne]);we.__webglTexture===void 0&&(we.__webglTexture=n.createTexture(),o.memory.textures++)}if(S.samples>0&&J(S)===!1){I.__webglMultisampledFramebuffer=n.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ne=0;ne<Z.length;ne++){const Ce=Z[ne];I.__webglColorRenderbuffer[ne]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,I.__webglColorRenderbuffer[ne]);const we=r.convert(Ce.format,Ce.colorSpace),te=r.convert(Ce.type),ye=w(Ce.internalFormat,we,te,Ce.colorSpace,S.isXRRenderTarget===!0),Be=Ge(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,Be,ye,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ne,n.RENDERBUFFER,I.__webglColorRenderbuffer[ne])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(I.__webglDepthRenderbuffer=n.createRenderbuffer(),le(I.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(W){t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture),Xe(n.TEXTURE_CUBE_MAP,_);for(let ne=0;ne<6;ne++)if(_.mipmaps&&_.mipmaps.length>0)for(let Ce=0;Ce<_.mipmaps.length;Ce++)G(I.__webglFramebuffer[ne][Ce],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,Ce);else G(I.__webglFramebuffer[ne],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);f(_)&&u(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let ne=0,Ce=Z.length;ne<Ce;ne++){const we=Z[ne],te=i.get(we);let ye=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ye=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ye,te.__webglTexture),Xe(ye,we),G(I.__webglFramebuffer,S,we,n.COLOR_ATTACHMENT0+ne,ye,0),f(we)&&u(ye)}t.unbindTexture()}else{let ne=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(ne=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ne,F.__webglTexture),Xe(ne,_),_.mipmaps&&_.mipmaps.length>0)for(let Ce=0;Ce<_.mipmaps.length;Ce++)G(I.__webglFramebuffer[Ce],S,_,n.COLOR_ATTACHMENT0,ne,Ce);else G(I.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,ne,0);f(_)&&u(ne),t.unbindTexture()}S.depthBuffer&&se(S)}function de(S){const _=S.textures;for(let I=0,F=_.length;I<F;I++){const Z=_[I];if(f(Z)){const W=E(S),Ae=i.get(Z).__webglTexture;t.bindTexture(W,Ae),u(W),t.unbindTexture()}}}const ie=[],oe=[];function he(S){if(S.samples>0){if(J(S)===!1){const _=S.textures,I=S.width,F=S.height;let Z=n.COLOR_BUFFER_BIT;const W=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Ae=i.get(S),ne=_.length>1;if(ne)for(let we=0;we<_.length;we++)t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const Ce=S.texture.mipmaps;Ce&&Ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let we=0;we<_.length;we++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(Z|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(Z|=n.STENCIL_BUFFER_BIT)),ne){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[we]);const te=i.get(_[we]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,te,0)}n.blitFramebuffer(0,0,I,F,0,0,I,F,Z,n.NEAREST),l===!0&&(ie.length=0,oe.length=0,ie.push(n.COLOR_ATTACHMENT0+we),S.depthBuffer&&S.resolveDepthBuffer===!1&&(ie.push(W),oe.push(W),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,oe)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ie))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ne)for(let we=0;we<_.length;we++){t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,Ae.__webglColorRenderbuffer[we]);const te=i.get(_[we]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,Ae.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.TEXTURE_2D,te,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.resolveDepthBuffer===!1&&l){const _=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Ge(S){return Math.min(s.maxSamples,S.samples)}function J(S){const _=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function be(S){const _=o.render.frame;d.get(S)!==_&&(d.set(S,_),S.update())}function Qe(S,_){const I=S.colorSpace,F=S.format,Z=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||I!==ds&&I!==Jn&&(st.getTransfer(I)===dt?(F!==pn||Z!==Cn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),_}function xe(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=H,this.resetTextureUnits=k,this.setTexture2D=q,this.setTexture2DArray=$,this.setTexture3D=K,this.setTextureCube=B,this.rebindTextures=Re,this.setupRenderTarget=T,this.updateRenderTargetMipmap=de,this.updateMultisampleRenderTarget=he,this.setupDepthRenderbuffer=se,this.setupFrameBufferTexture=G,this.useMultisampledRTT=J}function gv(n,e){function t(i,s=Jn){let r;const o=st.getTransfer(s);if(i===Cn)return n.UNSIGNED_BYTE;if(i===nc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===ic)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Sd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Md)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===bd)return n.BYTE;if(i===xd)return n.SHORT;if(i===Bs)return n.UNSIGNED_SHORT;if(i===tc)return n.INT;if(i===Ei)return n.UNSIGNED_INT;if(i===zn)return n.FLOAT;if(i===Zs)return n.HALF_FLOAT;if(i===wd)return n.ALPHA;if(i===Ed)return n.RGB;if(i===pn)return n.RGBA;if(i===Hs)return n.DEPTH_COMPONENT;if(i===Vs)return n.DEPTH_STENCIL;if(i===Td)return n.RED;if(i===sc)return n.RED_INTEGER;if(i===Ad)return n.RG;if(i===rc)return n.RG_INTEGER;if(i===ac)return n.RGBA_INTEGER;if(i===Rr||i===Cr||i===Pr||i===Dr)if(o===dt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Rr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Pr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Rr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Cr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Pr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Dr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===go||i===vo||i===_o||i===yo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===go)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===vo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_o)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===bo||i===xo||i===So)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===bo||i===xo)return o===dt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===So)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Mo||i===wo||i===Eo||i===To||i===Ao||i===Ro||i===Co||i===Po||i===Do||i===Lo||i===Io||i===Uo||i===No||i===ko)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Mo)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wo)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Eo)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===To)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ao)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ro)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Co)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Po)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Do)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Lo)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Io)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Uo)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===No)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ko)return o===dt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Oo||i===Fo||i===Bo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Oo)return o===dt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Fo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Bo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===zo||i===Ho||i===Vo||i===Go)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===zo)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Ho)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Vo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Go)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zs?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}const vv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_v=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class yv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const i=new Fd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,i=new oi({vertexShader:vv,fragmentShader:_v,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new Qn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class bv extends Ci{constructor(e,t){super();const i=this;let s=null,r=1,o=null,a="local-floor",l=1,c=null,d=null,h=null,m=null,p=null,v=null;const g=typeof XRWebGLBinding<"u",f=new yv,u={},E=t.getContextAttributes();let w=null,x=null;const C=[],R=[],P=new Se;let D=null;const y=new on;y.viewport=new vt;const b=new on;b.viewport=new vt;const L=[y,b],k=new Op;let H=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ee=C[j];return ee===void 0&&(ee=new Ua,C[j]=ee),ee.getTargetRaySpace()},this.getControllerGrip=function(j){let ee=C[j];return ee===void 0&&(ee=new Ua,C[j]=ee),ee.getGripSpace()},this.getHand=function(j){let ee=C[j];return ee===void 0&&(ee=new Ua,C[j]=ee),ee.getHandSpace()};function q(j){const ee=R.indexOf(j.inputSource);if(ee===-1)return;const G=C[ee];G!==void 0&&(G.update(j.inputSource,j.frame,c||o),G.dispatchEvent({type:j.type,data:j.inputSource}))}function $(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",$),s.removeEventListener("inputsourceschange",K);for(let j=0;j<C.length;j++){const ee=R[j];ee!==null&&(R[j]=null,C[j].disconnect(ee))}H=null,X=null,f.reset();for(const j in u)delete u[j];e.setRenderTarget(w),p=null,m=null,h=null,s=null,x=null,et.stop(),i.isPresenting=!1,e.setPixelRatio(D),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return m!==null?m:p},this.getBinding=function(){return h===null&&g&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return v},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(w=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",$),s.addEventListener("inputsourceschange",K),E.xrCompatible!==!0&&await t.makeXRCompatible(),D=e.getPixelRatio(),e.getSize(P),g&&"createProjectionLayer"in XRWebGLBinding.prototype){let G=null,le=null,Y=null;E.depth&&(Y=E.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,G=E.stencil?Vs:Hs,le=E.stencil?zs:Ei);const se={colorFormat:t.RGBA8,depthFormat:Y,scaleFactor:r};h=this.getBinding(),m=h.createProjectionLayer(se),s.updateRenderState({layers:[m]}),e.setPixelRatio(1),e.setSize(m.textureWidth,m.textureHeight,!1),x=new Ti(m.textureWidth,m.textureHeight,{format:pn,type:Cn,depthTexture:new Od(m.textureWidth,m.textureHeight,le,void 0,void 0,void 0,void 0,void 0,void 0,G),stencilBuffer:E.stencil,colorSpace:e.outputColorSpace,samples:E.antialias?4:0,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}else{const G={antialias:E.antialias,alpha:!0,depth:E.depth,stencil:E.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,G),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ti(p.framebufferWidth,p.framebufferHeight,{format:pn,type:Cn,colorSpace:e.outputColorSpace,stencilBuffer:E.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await s.requestReferenceSpace(a),et.setContext(s),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function K(j){for(let ee=0;ee<j.removed.length;ee++){const G=j.removed[ee],le=R.indexOf(G);le>=0&&(R[le]=null,C[le].disconnect(G))}for(let ee=0;ee<j.added.length;ee++){const G=j.added[ee];let le=R.indexOf(G);if(le===-1){for(let se=0;se<C.length;se++)if(se>=R.length){R.push(G),le=se;break}else if(R[se]===null){R[se]=G,le=se;break}if(le===-1)break}const Y=C[le];Y&&Y.connect(G)}}const B=new A,pe=new A;function ue(j,ee,G){B.setFromMatrixPosition(ee.matrixWorld),pe.setFromMatrixPosition(G.matrixWorld);const le=B.distanceTo(pe),Y=ee.projectionMatrix.elements,se=G.projectionMatrix.elements,Re=Y[14]/(Y[10]-1),T=Y[14]/(Y[10]+1),de=(Y[9]+1)/Y[5],ie=(Y[9]-1)/Y[5],oe=(Y[8]-1)/Y[0],he=(se[8]+1)/se[0],Ge=Re*oe,J=Re*he,be=le/(-oe+he),Qe=be*-oe;if(ee.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Qe),j.translateZ(be),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Y[10]===-1)j.projectionMatrix.copy(ee.projectionMatrix),j.projectionMatrixInverse.copy(ee.projectionMatrixInverse);else{const xe=Re+be,S=T+be,_=Ge-Qe,I=J+(le-Qe),F=de*T/S*xe,Z=ie*T/S*xe;j.projectionMatrix.makePerspective(_,I,F,Z,xe,S),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function Ie(j,ee){ee===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ee.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let ee=j.near,G=j.far;f.texture!==null&&(f.depthNear>0&&(ee=f.depthNear),f.depthFar>0&&(G=f.depthFar)),k.near=b.near=y.near=ee,k.far=b.far=y.far=G,(H!==k.near||X!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),H=k.near,X=k.far),k.layers.mask=j.layers.mask|6,y.layers.mask=k.layers.mask&3,b.layers.mask=k.layers.mask&5;const le=j.parent,Y=k.cameras;Ie(k,le);for(let se=0;se<Y.length;se++)Ie(Y[se],le);Y.length===2?ue(k,y,b):k.projectionMatrix.copy(y.projectionMatrix),Xe(j,k,le)};function Xe(j,ee,G){G===null?j.matrix.copy(ee.matrixWorld):(j.matrix.copy(G.matrixWorld),j.matrix.invert(),j.matrix.multiply(ee.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ee.projectionMatrix),j.projectionMatrixInverse.copy(ee.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Gs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(m===null&&p===null))return l},this.setFoveation=function(j){l=j,m!==null&&(m.fixedFoveation=j),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=j)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(k)},this.getCameraTexture=function(j){return u[j]};let rt=null;function ct(j,ee){if(d=ee.getViewerPose(c||o),v=ee,d!==null){const G=d.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let le=!1;G.length!==k.cameras.length&&(k.cameras.length=0,le=!0);for(let T=0;T<G.length;T++){const de=G[T];let ie=null;if(p!==null)ie=p.getViewport(de);else{const he=h.getViewSubImage(m,de);ie=he.viewport,T===0&&(e.setRenderTargetTextures(x,he.colorTexture,he.depthStencilTexture),e.setRenderTarget(x))}let oe=L[T];oe===void 0&&(oe=new on,oe.layers.enable(T),oe.viewport=new vt,L[T]=oe),oe.matrix.fromArray(de.transform.matrix),oe.matrix.decompose(oe.position,oe.quaternion,oe.scale),oe.projectionMatrix.fromArray(de.projectionMatrix),oe.projectionMatrixInverse.copy(oe.projectionMatrix).invert(),oe.viewport.set(ie.x,ie.y,ie.width,ie.height),T===0&&(k.matrix.copy(oe.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),le===!0&&k.cameras.push(oe)}const Y=s.enabledFeatures;if(Y&&Y.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&g){h=i.getBinding();const T=h.getDepthInformation(G[0]);T&&T.isValid&&T.texture&&f.init(T,s.renderState)}if(Y&&Y.includes("camera-access")&&g){e.state.unbindTexture(),h=i.getBinding();for(let T=0;T<G.length;T++){const de=G[T].camera;if(de){let ie=u[de];ie||(ie=new Fd,u[de]=ie);const oe=h.getCameraImage(de);ie.sourceTexture=oe}}}}for(let G=0;G<C.length;G++){const le=R[G],Y=C[G];le!==null&&Y!==void 0&&Y.update(le,ee,c||o)}rt&&rt(j,ee),ee.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ee}),v=null}const et=new Vd;et.setAnimationLoop(ct),this.setAnimationLoop=function(j){rt=j},this.dispose=function(){}}}const vi=new Pn,xv=new ot;function Sv(n,e){function t(f,u){f.matrixAutoUpdate===!0&&f.updateMatrix(),u.value.copy(f.matrix)}function i(f,u){u.color.getRGB(f.fogColor.value,Nd(n)),u.isFog?(f.fogNear.value=u.near,f.fogFar.value=u.far):u.isFogExp2&&(f.fogDensity.value=u.density)}function s(f,u,E,w,x){u.isMeshBasicMaterial||u.isMeshLambertMaterial?r(f,u):u.isMeshToonMaterial?(r(f,u),h(f,u)):u.isMeshPhongMaterial?(r(f,u),d(f,u)):u.isMeshStandardMaterial?(r(f,u),m(f,u),u.isMeshPhysicalMaterial&&p(f,u,x)):u.isMeshMatcapMaterial?(r(f,u),v(f,u)):u.isMeshDepthMaterial?r(f,u):u.isMeshDistanceMaterial?(r(f,u),g(f,u)):u.isMeshNormalMaterial?r(f,u):u.isLineBasicMaterial?(o(f,u),u.isLineDashedMaterial&&a(f,u)):u.isPointsMaterial?l(f,u,E,w):u.isSpriteMaterial?c(f,u):u.isShadowMaterial?(f.color.value.copy(u.color),f.opacity.value=u.opacity):u.isShaderMaterial&&(u.uniformsNeedUpdate=!1)}function r(f,u){f.opacity.value=u.opacity,u.color&&f.diffuse.value.copy(u.color),u.emissive&&f.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity),u.map&&(f.map.value=u.map,t(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.bumpMap&&(f.bumpMap.value=u.bumpMap,t(u.bumpMap,f.bumpMapTransform),f.bumpScale.value=u.bumpScale,u.side===Xt&&(f.bumpScale.value*=-1)),u.normalMap&&(f.normalMap.value=u.normalMap,t(u.normalMap,f.normalMapTransform),f.normalScale.value.copy(u.normalScale),u.side===Xt&&f.normalScale.value.negate()),u.displacementMap&&(f.displacementMap.value=u.displacementMap,t(u.displacementMap,f.displacementMapTransform),f.displacementScale.value=u.displacementScale,f.displacementBias.value=u.displacementBias),u.emissiveMap&&(f.emissiveMap.value=u.emissiveMap,t(u.emissiveMap,f.emissiveMapTransform)),u.specularMap&&(f.specularMap.value=u.specularMap,t(u.specularMap,f.specularMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest);const E=e.get(u),w=E.envMap,x=E.envMapRotation;w&&(f.envMap.value=w,vi.copy(x),vi.x*=-1,vi.y*=-1,vi.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),f.envMapRotation.value.setFromMatrix4(xv.makeRotationFromEuler(vi)),f.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,f.reflectivity.value=u.reflectivity,f.ior.value=u.ior,f.refractionRatio.value=u.refractionRatio),u.lightMap&&(f.lightMap.value=u.lightMap,f.lightMapIntensity.value=u.lightMapIntensity,t(u.lightMap,f.lightMapTransform)),u.aoMap&&(f.aoMap.value=u.aoMap,f.aoMapIntensity.value=u.aoMapIntensity,t(u.aoMap,f.aoMapTransform))}function o(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,u.map&&(f.map.value=u.map,t(u.map,f.mapTransform))}function a(f,u){f.dashSize.value=u.dashSize,f.totalSize.value=u.dashSize+u.gapSize,f.scale.value=u.scale}function l(f,u,E,w){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.size.value=u.size*E,f.scale.value=w*.5,u.map&&(f.map.value=u.map,t(u.map,f.uvTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function c(f,u){f.diffuse.value.copy(u.color),f.opacity.value=u.opacity,f.rotation.value=u.rotation,u.map&&(f.map.value=u.map,t(u.map,f.mapTransform)),u.alphaMap&&(f.alphaMap.value=u.alphaMap,t(u.alphaMap,f.alphaMapTransform)),u.alphaTest>0&&(f.alphaTest.value=u.alphaTest)}function d(f,u){f.specular.value.copy(u.specular),f.shininess.value=Math.max(u.shininess,1e-4)}function h(f,u){u.gradientMap&&(f.gradientMap.value=u.gradientMap)}function m(f,u){f.metalness.value=u.metalness,u.metalnessMap&&(f.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,f.metalnessMapTransform)),f.roughness.value=u.roughness,u.roughnessMap&&(f.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,f.roughnessMapTransform)),u.envMap&&(f.envMapIntensity.value=u.envMapIntensity)}function p(f,u,E){f.ior.value=u.ior,u.sheen>0&&(f.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),f.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(f.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,f.sheenColorMapTransform)),u.sheenRoughnessMap&&(f.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,f.sheenRoughnessMapTransform))),u.clearcoat>0&&(f.clearcoat.value=u.clearcoat,f.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(f.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,f.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(f.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Xt&&f.clearcoatNormalScale.value.negate())),u.dispersion>0&&(f.dispersion.value=u.dispersion),u.iridescence>0&&(f.iridescence.value=u.iridescence,f.iridescenceIOR.value=u.iridescenceIOR,f.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],f.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(f.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,f.iridescenceMapTransform)),u.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),u.transmission>0&&(f.transmission.value=u.transmission,f.transmissionSamplerMap.value=E.texture,f.transmissionSamplerSize.value.set(E.width,E.height),u.transmissionMap&&(f.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,f.transmissionMapTransform)),f.thickness.value=u.thickness,u.thicknessMap&&(f.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=u.attenuationDistance,f.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(f.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(f.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=u.specularIntensity,f.specularColor.value.copy(u.specularColor),u.specularColorMap&&(f.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,f.specularColorMapTransform)),u.specularIntensityMap&&(f.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,f.specularIntensityMapTransform))}function v(f,u){u.matcap&&(f.matcap.value=u.matcap)}function g(f,u){const E=e.get(u).light;f.referencePosition.value.setFromMatrixPosition(E.matrixWorld),f.nearDistance.value=E.shadow.camera.near,f.farDistance.value=E.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Mv(n,e,t,i){let s={},r={},o=[];const a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(E,w){const x=w.program;i.uniformBlockBinding(E,x)}function c(E,w){let x=s[E.id];x===void 0&&(v(E),x=d(E),s[E.id]=x,E.addEventListener("dispose",f));const C=w.program;i.updateUBOMapping(E,C);const R=e.render.frame;r[E.id]!==R&&(m(E),r[E.id]=R)}function d(E){const w=h();E.__bindingPointIndex=w;const x=n.createBuffer(),C=E.__size,R=E.usage;return n.bindBuffer(n.UNIFORM_BUFFER,x),n.bufferData(n.UNIFORM_BUFFER,C,R),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,x),x}function h(){for(let E=0;E<a;E++)if(o.indexOf(E)===-1)return o.push(E),E;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function m(E){const w=s[E.id],x=E.uniforms,C=E.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let R=0,P=x.length;R<P;R++){const D=Array.isArray(x[R])?x[R]:[x[R]];for(let y=0,b=D.length;y<b;y++){const L=D[y];if(p(L,R,y,C)===!0){const k=L.__offset,H=Array.isArray(L.value)?L.value:[L.value];let X=0;for(let q=0;q<H.length;q++){const $=H[q],K=g($);typeof $=="number"||typeof $=="boolean"?(L.__data[0]=$,n.bufferSubData(n.UNIFORM_BUFFER,k+X,L.__data)):$.isMatrix3?(L.__data[0]=$.elements[0],L.__data[1]=$.elements[1],L.__data[2]=$.elements[2],L.__data[3]=0,L.__data[4]=$.elements[3],L.__data[5]=$.elements[4],L.__data[6]=$.elements[5],L.__data[7]=0,L.__data[8]=$.elements[6],L.__data[9]=$.elements[7],L.__data[10]=$.elements[8],L.__data[11]=0):($.toArray(L.__data,X),X+=K.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,k,L.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(E,w,x,C){const R=E.value,P=w+"_"+x;if(C[P]===void 0)return typeof R=="number"||typeof R=="boolean"?C[P]=R:C[P]=R.clone(),!0;{const D=C[P];if(typeof R=="number"||typeof R=="boolean"){if(D!==R)return C[P]=R,!0}else if(D.equals(R)===!1)return D.copy(R),!0}return!1}function v(E){const w=E.uniforms;let x=0;const C=16;for(let P=0,D=w.length;P<D;P++){const y=Array.isArray(w[P])?w[P]:[w[P]];for(let b=0,L=y.length;b<L;b++){const k=y[b],H=Array.isArray(k.value)?k.value:[k.value];for(let X=0,q=H.length;X<q;X++){const $=H[X],K=g($),B=x%C,pe=B%K.boundary,ue=B+pe;x+=pe,ue!==0&&C-ue<K.storage&&(x+=C-ue),k.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=x,x+=K.storage}}}const R=x%C;return R>0&&(x+=C-R),E.__size=x,E.__cache={},this}function g(E){const w={boundary:0,storage:0};return typeof E=="number"||typeof E=="boolean"?(w.boundary=4,w.storage=4):E.isVector2?(w.boundary=8,w.storage=8):E.isVector3||E.isColor?(w.boundary=16,w.storage=12):E.isVector4?(w.boundary=16,w.storage=16):E.isMatrix3?(w.boundary=48,w.storage=48):E.isMatrix4?(w.boundary=64,w.storage=64):E.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",E),w}function f(E){const w=E.target;w.removeEventListener("dispose",f);const x=o.indexOf(w.__bindingPointIndex);o.splice(x,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function u(){for(const E in s)n.deleteBuffer(s[E]);o=[],s={},r={}}return{bind:l,update:c,dispose:u}}class wv{constructor(e={}){const{canvas:t=Ou(),context:i=null,depth:s=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:m=!1}=e;this.isWebGLRenderer=!0;let p;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=i.getContextAttributes().alpha}else p=o;const v=new Uint32Array(4),g=new Int32Array(4);let f=null,u=null;const E=[],w=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const x=this;let C=!1;this._outputColorSpace=Dt;let R=0,P=0,D=null,y=-1,b=null;const L=new vt,k=new vt;let H=null;const X=new We(0);let q=0,$=t.width,K=t.height,B=1,pe=null,ue=null;const Ie=new vt(0,0,$,K),Xe=new vt(0,0,$,K);let rt=!1;const ct=new na;let et=!1,j=!1;const ee=new ot,G=new A,le=new vt,Y={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let se=!1;function Re(){return D===null?B:1}let T=i;function de(M,N){return t.getContext(M,N)}try{const M={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ec}`),t.addEventListener("webglcontextlost",me,!1),t.addEventListener("webglcontextrestored",Pe,!1),t.addEventListener("webglcontextcreationerror",re,!1),T===null){const N="webgl2";if(T=de(N,M),T===null)throw de(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let ie,oe,he,Ge,J,be,Qe,xe,S,_,I,F,Z,W,Ae,ne,Ce,we,te,ye,Be,Ue,ve,Ye;function U(){ie=new Ug(T),ie.init(),Ue=new gv(T,ie),oe=new Ag(T,ie,e,Ue),he=new fv(T,ie),oe.reversedDepthBuffer&&m&&he.buffers.depth.setReversed(!0),Ge=new Og(T),J=new tv,be=new mv(T,ie,he,J,oe,Ue,Ge),Qe=new Cg(x),xe=new Ig(x),S=new Vp(T),ve=new Eg(T,S),_=new Ng(T,S,Ge,ve),I=new Bg(T,_,S,Ge),te=new Fg(T,oe,be),ne=new Rg(J),F=new ev(x,Qe,xe,ie,oe,ve,ne),Z=new Sv(x,J),W=new iv,Ae=new lv(ie),we=new wg(x,Qe,xe,he,I,p,l),Ce=new uv(x,I,oe),Ye=new Mv(T,Ge,oe,he),ye=new Tg(T,ie,Ge),Be=new kg(T,ie,Ge),Ge.programs=F.programs,x.capabilities=oe,x.extensions=ie,x.properties=J,x.renderLists=W,x.shadowMap=Ce,x.state=he,x.info=Ge}U();const ce=new bv(x,T);this.xr=ce,this.getContext=function(){return T},this.getContextAttributes=function(){return T.getContextAttributes()},this.forceContextLoss=function(){const M=ie.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ie.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return B},this.setPixelRatio=function(M){M!==void 0&&(B=M,this.setSize($,K,!1))},this.getSize=function(M){return M.set($,K)},this.setSize=function(M,N,z=!0){if(ce.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}$=M,K=N,t.width=Math.floor(M*B),t.height=Math.floor(N*B),z===!0&&(t.style.width=M+"px",t.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set($*B,K*B).floor()},this.setDrawingBufferSize=function(M,N,z){$=M,K=N,B=z,t.width=Math.floor(M*z),t.height=Math.floor(N*z),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(Ie)},this.setViewport=function(M,N,z,V){M.isVector4?Ie.set(M.x,M.y,M.z,M.w):Ie.set(M,N,z,V),he.viewport(L.copy(Ie).multiplyScalar(B).round())},this.getScissor=function(M){return M.copy(Xe)},this.setScissor=function(M,N,z,V){M.isVector4?Xe.set(M.x,M.y,M.z,M.w):Xe.set(M,N,z,V),he.scissor(k.copy(Xe).multiplyScalar(B).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(M){he.setScissorTest(rt=M)},this.setOpaqueSort=function(M){pe=M},this.setTransparentSort=function(M){ue=M},this.getClearColor=function(M){return M.copy(we.getClearColor())},this.setClearColor=function(){we.setClearColor(...arguments)},this.getClearAlpha=function(){return we.getClearAlpha()},this.setClearAlpha=function(){we.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,z=!0){let V=0;if(M){let O=!1;if(D!==null){const ae=D.texture.format;O=ae===ac||ae===rc||ae===sc}if(O){const ae=D.texture.type,_e=ae===Cn||ae===Ei||ae===Bs||ae===zs||ae===nc||ae===ic,De=we.getClearColor(),Te=we.getClearAlpha(),Fe=De.r,He=De.g,ke=De.b;_e?(v[0]=Fe,v[1]=He,v[2]=ke,v[3]=Te,T.clearBufferuiv(T.COLOR,0,v)):(g[0]=Fe,g[1]=He,g[2]=ke,g[3]=Te,T.clearBufferiv(T.COLOR,0,g))}else V|=T.COLOR_BUFFER_BIT}N&&(V|=T.DEPTH_BUFFER_BIT),z&&(V|=T.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),T.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",me,!1),t.removeEventListener("webglcontextrestored",Pe,!1),t.removeEventListener("webglcontextcreationerror",re,!1),we.dispose(),W.dispose(),Ae.dispose(),J.dispose(),Qe.dispose(),xe.dispose(),I.dispose(),ve.dispose(),Ye.dispose(),F.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",bn),ce.removeEventListener("sessionend",Sc),di.stop()};function me(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Pe(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;const M=Ge.autoReset,N=Ce.enabled,z=Ce.autoUpdate,V=Ce.needsUpdate,O=Ce.type;U(),Ge.autoReset=M,Ce.enabled=N,Ce.autoUpdate=z,Ce.needsUpdate=V,Ce.type=O}function re(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Q(M){const N=M.target;N.removeEventListener("dispose",Q),Le(N)}function Le(M){qe(M),J.remove(M)}function qe(M){const N=J.get(M).programs;N!==void 0&&(N.forEach(function(z){F.releaseProgram(z)}),M.isShaderMaterial&&F.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,z,V,O,ae){N===null&&(N=Y);const _e=O.isMesh&&O.matrixWorld.determinant()<0,De=uh(M,N,z,V,O);he.setMaterial(V,_e);let Te=z.index,Fe=1;if(V.wireframe===!0){if(Te=_.getWireframeAttribute(z),Te===void 0)return;Fe=2}const He=z.drawRange,ke=z.attributes.position;let Je=He.start*Fe,lt=(He.start+He.count)*Fe;ae!==null&&(Je=Math.max(Je,ae.start*Fe),lt=Math.min(lt,(ae.start+ae.count)*Fe)),Te!==null?(Je=Math.max(Je,0),lt=Math.min(lt,Te.count)):ke!=null&&(Je=Math.max(Je,0),lt=Math.min(lt,ke.count));const bt=lt-Je;if(bt<0||bt===1/0)return;ve.setup(O,V,De,z,Te);let mt,ut=ye;if(Te!==null&&(mt=S.get(Te),ut=Be,ut.setIndex(mt)),O.isMesh)V.wireframe===!0?(he.setLineWidth(V.wireframeLinewidth*Re()),ut.setMode(T.LINES)):ut.setMode(T.TRIANGLES);else if(O.isLine){let Oe=V.linewidth;Oe===void 0&&(Oe=1),he.setLineWidth(Oe*Re()),O.isLineSegments?ut.setMode(T.LINES):O.isLineLoop?ut.setMode(T.LINE_LOOP):ut.setMode(T.LINE_STRIP)}else O.isPoints?ut.setMode(T.POINTS):O.isSprite&&ut.setMode(T.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)qs("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ut.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))ut.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Oe=O._multiDrawStarts,_t=O._multiDrawCounts,it=O._multiDrawCount,Kt=Te?S.get(Te).bytesPerElement:1,Di=J.get(V).currentProgram.getUniforms();for(let Zt=0;Zt<it;Zt++)Di.setValue(T,"_gl_DrawID",Zt),ut.render(Oe[Zt]/Kt,_t[Zt])}else if(O.isInstancedMesh)ut.renderInstances(Je,bt,O.count);else if(z.isInstancedBufferGeometry){const Oe=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,_t=Math.min(z.instanceCount,Oe);ut.renderInstances(Je,bt,_t)}else ut.render(Je,bt)};function pt(M,N,z){M.transparent===!0&&M.side===qt&&M.forceSinglePass===!1?(M.side=Xt,M.needsUpdate=!0,tr(M,N,z),M.side=ri,M.needsUpdate=!0,tr(M,N,z),M.side=qt):tr(M,N,z)}this.compile=function(M,N,z=null){z===null&&(z=M),u=Ae.get(z),u.init(N),w.push(u),z.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(u.pushLight(O),O.castShadow&&u.pushShadow(O))}),M!==z&&M.traverseVisible(function(O){O.isLight&&O.layers.test(N.layers)&&(u.pushLight(O),O.castShadow&&u.pushShadow(O))}),u.setupLights();const V=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ae=O.material;if(ae)if(Array.isArray(ae))for(let _e=0;_e<ae.length;_e++){const De=ae[_e];pt(De,z,O),V.add(De)}else pt(ae,z,O),V.add(ae)}),u=w.pop(),V},this.compileAsync=function(M,N,z=null){const V=this.compile(M,N,z);return new Promise(O=>{function ae(){if(V.forEach(function(_e){J.get(_e).currentProgram.isReady()&&V.delete(_e)}),V.size===0){O(M);return}setTimeout(ae,10)}ie.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let at=null;function Dn(M){at&&at(M)}function bn(){di.stop()}function Sc(){di.start()}const di=new Vd;di.setAnimationLoop(Dn),typeof self<"u"&&di.setContext(self),this.setAnimationLoop=function(M){at=M,ce.setAnimationLoop(M),M===null?di.stop():di.start()},ce.addEventListener("sessionstart",bn),ce.addEventListener("sessionend",Sc),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(N),N=ce.getCamera()),M.isScene===!0&&M.onBeforeRender(x,M,N,D),u=Ae.get(M,w.length),u.init(N),w.push(u),ee.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),ct.setFromProjectionMatrix(ee,En,N.reversedDepth),j=this.localClippingEnabled,et=ne.init(this.clippingPlanes,j),f=W.get(M,E.length),f.init(),E.push(f),ce.enabled===!0&&ce.isPresenting===!0){const ae=x.xr.getDepthSensingMesh();ae!==null&&ca(ae,N,-1/0,x.sortObjects)}ca(M,N,0,x.sortObjects),f.finish(),x.sortObjects===!0&&f.sort(pe,ue),se=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,se&&we.addToRenderList(f,M),this.info.render.frame++,et===!0&&ne.beginShadows();const z=u.state.shadowsArray;Ce.render(z,M,N),et===!0&&ne.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=f.opaque,O=f.transmissive;if(u.setupLights(),N.isArrayCamera){const ae=N.cameras;if(O.length>0)for(let _e=0,De=ae.length;_e<De;_e++){const Te=ae[_e];wc(V,O,M,Te)}se&&we.render(M);for(let _e=0,De=ae.length;_e<De;_e++){const Te=ae[_e];Mc(f,M,Te,Te.viewport)}}else O.length>0&&wc(V,O,M,N),se&&we.render(M),Mc(f,M,N);D!==null&&P===0&&(be.updateMultisampleRenderTarget(D),be.updateRenderTargetMipmap(D)),M.isScene===!0&&M.onAfterRender(x,M,N),ve.resetDefaultState(),y=-1,b=null,w.pop(),w.length>0?(u=w[w.length-1],et===!0&&ne.setGlobalState(x.clippingPlanes,u.state.camera)):u=null,E.pop(),E.length>0?f=E[E.length-1]:f=null};function ca(M,N,z,V){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)z=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)u.pushLight(M),M.castShadow&&u.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||ct.intersectsSprite(M)){V&&le.setFromMatrixPosition(M.matrixWorld).applyMatrix4(ee);const _e=I.update(M),De=M.material;De.visible&&f.push(M,_e,De,z,le.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||ct.intersectsObject(M))){const _e=I.update(M),De=M.material;if(V&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),le.copy(M.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),le.copy(_e.boundingSphere.center)),le.applyMatrix4(M.matrixWorld).applyMatrix4(ee)),Array.isArray(De)){const Te=_e.groups;for(let Fe=0,He=Te.length;Fe<He;Fe++){const ke=Te[Fe],Je=De[ke.materialIndex];Je&&Je.visible&&f.push(M,_e,Je,z,le.z,ke)}}else De.visible&&f.push(M,_e,De,z,le.z,null)}}const ae=M.children;for(let _e=0,De=ae.length;_e<De;_e++)ca(ae[_e],N,z,V)}function Mc(M,N,z,V){const O=M.opaque,ae=M.transmissive,_e=M.transparent;u.setupLightsView(z),et===!0&&ne.setGlobalState(x.clippingPlanes,z),V&&he.viewport(L.copy(V)),O.length>0&&er(O,N,z),ae.length>0&&er(ae,N,z),_e.length>0&&er(_e,N,z),he.buffers.depth.setTest(!0),he.buffers.depth.setMask(!0),he.buffers.color.setMask(!0),he.setPolygonOffset(!1)}function wc(M,N,z,V){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;u.state.transmissionRenderTarget[V.id]===void 0&&(u.state.transmissionRenderTarget[V.id]=new Ti(1,1,{generateMipmaps:!0,type:ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float")?Zs:Cn,minFilter:Si,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));const ae=u.state.transmissionRenderTarget[V.id],_e=V.viewport||L;ae.setSize(_e.z*x.transmissionResolutionScale,_e.w*x.transmissionResolutionScale);const De=x.getRenderTarget(),Te=x.getActiveCubeFace(),Fe=x.getActiveMipmapLevel();x.setRenderTarget(ae),x.getClearColor(X),q=x.getClearAlpha(),q<1&&x.setClearColor(16777215,.5),x.clear(),se&&we.render(z);const He=x.toneMapping;x.toneMapping=si;const ke=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),u.setupLightsView(V),et===!0&&ne.setGlobalState(x.clippingPlanes,V),er(M,z,V),be.updateMultisampleRenderTarget(ae),be.updateRenderTargetMipmap(ae),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Je=!1;for(let lt=0,bt=N.length;lt<bt;lt++){const mt=N[lt],ut=mt.object,Oe=mt.geometry,_t=mt.material,it=mt.group;if(_t.side===qt&&ut.layers.test(V.layers)){const Kt=_t.side;_t.side=Xt,_t.needsUpdate=!0,Ec(ut,z,V,Oe,_t,it),_t.side=Kt,_t.needsUpdate=!0,Je=!0}}Je===!0&&(be.updateMultisampleRenderTarget(ae),be.updateRenderTargetMipmap(ae))}x.setRenderTarget(De,Te,Fe),x.setClearColor(X,q),ke!==void 0&&(V.viewport=ke),x.toneMapping=He}function er(M,N,z){const V=N.isScene===!0?N.overrideMaterial:null;for(let O=0,ae=M.length;O<ae;O++){const _e=M[O],De=_e.object,Te=_e.geometry,Fe=_e.group;let He=_e.material;He.allowOverride===!0&&V!==null&&(He=V),De.layers.test(z.layers)&&Ec(De,N,z,Te,He,Fe)}}function Ec(M,N,z,V,O,ae){M.onBeforeRender(x,N,z,V,O,ae),M.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(x,N,z,V,M,ae),O.transparent===!0&&O.side===qt&&O.forceSinglePass===!1?(O.side=Xt,O.needsUpdate=!0,x.renderBufferDirect(z,N,V,O,M,ae),O.side=ri,O.needsUpdate=!0,x.renderBufferDirect(z,N,V,O,M,ae),O.side=qt):x.renderBufferDirect(z,N,V,O,M,ae),M.onAfterRender(x,N,z,V,O,ae)}function tr(M,N,z){N.isScene!==!0&&(N=Y);const V=J.get(M),O=u.state.lights,ae=u.state.shadowsArray,_e=O.state.version,De=F.getParameters(M,O.state,ae,N,z),Te=F.getProgramCacheKey(De);let Fe=V.programs;V.environment=M.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(M.isMeshStandardMaterial?xe:Qe).get(M.envMap||V.environment),V.envMapRotation=V.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Fe===void 0&&(M.addEventListener("dispose",Q),Fe=new Map,V.programs=Fe);let He=Fe.get(Te);if(He!==void 0){if(V.currentProgram===He&&V.lightsStateVersion===_e)return Ac(M,De),He}else De.uniforms=F.getUniforms(M),M.onBeforeCompile(De,x),He=F.acquireProgram(De,Te),Fe.set(Te,He),V.uniforms=De.uniforms;const ke=V.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(ke.clippingPlanes=ne.uniform),Ac(M,De),V.needsLights=fh(M),V.lightsStateVersion=_e,V.needsLights&&(ke.ambientLightColor.value=O.state.ambient,ke.lightProbe.value=O.state.probe,ke.directionalLights.value=O.state.directional,ke.directionalLightShadows.value=O.state.directionalShadow,ke.spotLights.value=O.state.spot,ke.spotLightShadows.value=O.state.spotShadow,ke.rectAreaLights.value=O.state.rectArea,ke.ltc_1.value=O.state.rectAreaLTC1,ke.ltc_2.value=O.state.rectAreaLTC2,ke.pointLights.value=O.state.point,ke.pointLightShadows.value=O.state.pointShadow,ke.hemisphereLights.value=O.state.hemi,ke.directionalShadowMap.value=O.state.directionalShadowMap,ke.directionalShadowMatrix.value=O.state.directionalShadowMatrix,ke.spotShadowMap.value=O.state.spotShadowMap,ke.spotLightMatrix.value=O.state.spotLightMatrix,ke.spotLightMap.value=O.state.spotLightMap,ke.pointShadowMap.value=O.state.pointShadowMap,ke.pointShadowMatrix.value=O.state.pointShadowMatrix),V.currentProgram=He,V.uniformsList=null,He}function Tc(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=Ir.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function Ac(M,N){const z=J.get(M);z.outputColorSpace=N.outputColorSpace,z.batching=N.batching,z.batchingColor=N.batchingColor,z.instancing=N.instancing,z.instancingColor=N.instancingColor,z.instancingMorph=N.instancingMorph,z.skinning=N.skinning,z.morphTargets=N.morphTargets,z.morphNormals=N.morphNormals,z.morphColors=N.morphColors,z.morphTargetsCount=N.morphTargetsCount,z.numClippingPlanes=N.numClippingPlanes,z.numIntersection=N.numClipIntersection,z.vertexAlphas=N.vertexAlphas,z.vertexTangents=N.vertexTangents,z.toneMapping=N.toneMapping}function uh(M,N,z,V,O){N.isScene!==!0&&(N=Y),be.resetTextureUnits();const ae=N.fog,_e=V.isMeshStandardMaterial?N.environment:null,De=D===null?x.outputColorSpace:D.isXRRenderTarget===!0?D.texture.colorSpace:ds,Te=(V.isMeshStandardMaterial?xe:Qe).get(V.envMap||_e),Fe=V.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,He=!!z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),ke=!!z.morphAttributes.position,Je=!!z.morphAttributes.normal,lt=!!z.morphAttributes.color;let bt=si;V.toneMapped&&(D===null||D.isXRRenderTarget===!0)&&(bt=x.toneMapping);const mt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,ut=mt!==void 0?mt.length:0,Oe=J.get(V),_t=u.state.lights;if(et===!0&&(j===!0||M!==b)){const Ft=M===b&&V.id===y;ne.setState(V,M,Ft)}let it=!1;V.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==_t.state.version||Oe.outputColorSpace!==De||O.isBatchedMesh&&Oe.batching===!1||!O.isBatchedMesh&&Oe.batching===!0||O.isBatchedMesh&&Oe.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Oe.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Oe.instancing===!1||!O.isInstancedMesh&&Oe.instancing===!0||O.isSkinnedMesh&&Oe.skinning===!1||!O.isSkinnedMesh&&Oe.skinning===!0||O.isInstancedMesh&&Oe.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Oe.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Oe.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Oe.instancingMorph===!1&&O.morphTexture!==null||Oe.envMap!==Te||V.fog===!0&&Oe.fog!==ae||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==ne.numPlanes||Oe.numIntersection!==ne.numIntersection)||Oe.vertexAlphas!==Fe||Oe.vertexTangents!==He||Oe.morphTargets!==ke||Oe.morphNormals!==Je||Oe.morphColors!==lt||Oe.toneMapping!==bt||Oe.morphTargetsCount!==ut)&&(it=!0):(it=!0,Oe.__version=V.version);let Kt=Oe.currentProgram;it===!0&&(Kt=tr(V,N,O));let Di=!1,Zt=!1,_s=!1;const yt=Kt.getUniforms(),nn=Oe.uniforms;if(he.useProgram(Kt.program)&&(Di=!0,Zt=!0,_s=!0),V.id!==y&&(y=V.id,Zt=!0),Di||b!==M){he.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),yt.setValue(T,"projectionMatrix",M.projectionMatrix),yt.setValue(T,"viewMatrix",M.matrixWorldInverse);const Vt=yt.map.cameraPosition;Vt!==void 0&&Vt.setValue(T,G.setFromMatrixPosition(M.matrixWorld)),oe.logarithmicDepthBuffer&&yt.setValue(T,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&yt.setValue(T,"isOrthographic",M.isOrthographicCamera===!0),b!==M&&(b=M,Zt=!0,_s=!0)}if(O.isSkinnedMesh){yt.setOptional(T,O,"bindMatrix"),yt.setOptional(T,O,"bindMatrixInverse");const Ft=O.skeleton;Ft&&(Ft.boneTexture===null&&Ft.computeBoneTexture(),yt.setValue(T,"boneTexture",Ft.boneTexture,be))}O.isBatchedMesh&&(yt.setOptional(T,O,"batchingTexture"),yt.setValue(T,"batchingTexture",O._matricesTexture,be),yt.setOptional(T,O,"batchingIdTexture"),yt.setValue(T,"batchingIdTexture",O._indirectTexture,be),yt.setOptional(T,O,"batchingColorTexture"),O._colorsTexture!==null&&yt.setValue(T,"batchingColorTexture",O._colorsTexture,be));const sn=z.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&te.update(O,z,Kt),(Zt||Oe.receiveShadow!==O.receiveShadow)&&(Oe.receiveShadow=O.receiveShadow,yt.setValue(T,"receiveShadow",O.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(nn.envMap.value=Te,nn.flipEnvMap.value=Te.isCubeTexture&&Te.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(nn.envMapIntensity.value=N.environmentIntensity),Zt&&(yt.setValue(T,"toneMappingExposure",x.toneMappingExposure),Oe.needsLights&&ph(nn,_s),ae&&V.fog===!0&&Z.refreshFogUniforms(nn,ae),Z.refreshMaterialUniforms(nn,V,B,K,u.state.transmissionRenderTarget[M.id]),Ir.upload(T,Tc(Oe),nn,be)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ir.upload(T,Tc(Oe),nn,be),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&yt.setValue(T,"center",O.center),yt.setValue(T,"modelViewMatrix",O.modelViewMatrix),yt.setValue(T,"normalMatrix",O.normalMatrix),yt.setValue(T,"modelMatrix",O.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ft=V.uniformsGroups;for(let Vt=0,la=Ft.length;Vt<la;Vt++){const hi=Ft[Vt];Ye.update(hi,Kt),Ye.bind(hi,Kt)}}return Kt}function ph(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function fh(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return D},this.setRenderTargetTextures=function(M,N,z){const V=J.get(M);V.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,V.__autoAllocateDepthBuffer===!1&&(V.__useRenderToTexture=!1),J.get(M.texture).__webglTexture=N,J.get(M.depthTexture).__webglTexture=V.__autoAllocateDepthBuffer?void 0:z,V.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const z=J.get(M);z.__webglFramebuffer=N,z.__useDefaultFramebuffer=N===void 0};const mh=T.createFramebuffer();this.setRenderTarget=function(M,N=0,z=0){D=M,R=N,P=z;let V=!0,O=null,ae=!1,_e=!1;if(M){const Te=J.get(M);if(Te.__useDefaultFramebuffer!==void 0)he.bindFramebuffer(T.FRAMEBUFFER,null),V=!1;else if(Te.__webglFramebuffer===void 0)be.setupRenderTarget(M);else if(Te.__hasExternalTextures)be.rebindTextures(M,J.get(M.texture).__webglTexture,J.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const ke=M.depthTexture;if(Te.__boundDepthTexture!==ke){if(ke!==null&&J.has(ke)&&(M.width!==ke.image.width||M.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");be.setupDepthRenderbuffer(M)}}const Fe=M.texture;(Fe.isData3DTexture||Fe.isDataArrayTexture||Fe.isCompressedArrayTexture)&&(_e=!0);const He=J.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(He[N])?O=He[N][z]:O=He[N],ae=!0):M.samples>0&&be.useMultisampledRTT(M)===!1?O=J.get(M).__webglMultisampledFramebuffer:Array.isArray(He)?O=He[z]:O=He,L.copy(M.viewport),k.copy(M.scissor),H=M.scissorTest}else L.copy(Ie).multiplyScalar(B).floor(),k.copy(Xe).multiplyScalar(B).floor(),H=rt;if(z!==0&&(O=mh),he.bindFramebuffer(T.FRAMEBUFFER,O)&&V&&he.drawBuffers(M,O),he.viewport(L),he.scissor(k),he.setScissorTest(H),ae){const Te=J.get(M.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_CUBE_MAP_POSITIVE_X+N,Te.__webglTexture,z)}else if(_e){const Te=N;for(let Fe=0;Fe<M.textures.length;Fe++){const He=J.get(M.textures[Fe]);T.framebufferTextureLayer(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0+Fe,He.__webglTexture,z,Te)}}else if(M!==null&&z!==0){const Te=J.get(M.texture);T.framebufferTexture2D(T.FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Te.__webglTexture,z)}y=-1},this.readRenderTargetPixels=function(M,N,z,V,O,ae,_e,De=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(Te=Te[_e]),Te){he.bindFramebuffer(T.FRAMEBUFFER,Te);try{const Fe=M.textures[De],He=Fe.format,ke=Fe.type;if(!oe.textureFormatReadable(He)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!oe.textureTypeReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-V&&z>=0&&z<=M.height-O&&(M.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+De),T.readPixels(N,z,V,O,Ue.convert(He),Ue.convert(ke),ae))}finally{const Fe=D!==null?J.get(D).__webglFramebuffer:null;he.bindFramebuffer(T.FRAMEBUFFER,Fe)}}},this.readRenderTargetPixelsAsync=async function(M,N,z,V,O,ae,_e,De=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=J.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&_e!==void 0&&(Te=Te[_e]),Te)if(N>=0&&N<=M.width-V&&z>=0&&z<=M.height-O){he.bindFramebuffer(T.FRAMEBUFFER,Te);const Fe=M.textures[De],He=Fe.format,ke=Fe.type;if(!oe.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!oe.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Je=T.createBuffer();T.bindBuffer(T.PIXEL_PACK_BUFFER,Je),T.bufferData(T.PIXEL_PACK_BUFFER,ae.byteLength,T.STREAM_READ),M.textures.length>1&&T.readBuffer(T.COLOR_ATTACHMENT0+De),T.readPixels(N,z,V,O,Ue.convert(He),Ue.convert(ke),0);const lt=D!==null?J.get(D).__webglFramebuffer:null;he.bindFramebuffer(T.FRAMEBUFFER,lt);const bt=T.fenceSync(T.SYNC_GPU_COMMANDS_COMPLETE,0);return T.flush(),await Fu(T,bt,4),T.bindBuffer(T.PIXEL_PACK_BUFFER,Je),T.getBufferSubData(T.PIXEL_PACK_BUFFER,0,ae),T.deleteBuffer(Je),T.deleteSync(bt),ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,z=0){const V=Math.pow(2,-z),O=Math.floor(M.image.width*V),ae=Math.floor(M.image.height*V),_e=N!==null?N.x:0,De=N!==null?N.y:0;be.setTexture2D(M,0),T.copyTexSubImage2D(T.TEXTURE_2D,z,0,0,_e,De,O,ae),he.unbindTexture()};const gh=T.createFramebuffer(),vh=T.createFramebuffer();this.copyTextureToTexture=function(M,N,z=null,V=null,O=0,ae=null){ae===null&&(O!==0?(qs("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ae=O,O=0):ae=0);let _e,De,Te,Fe,He,ke,Je,lt,bt;const mt=M.isCompressedTexture?M.mipmaps[ae]:M.image;if(z!==null)_e=z.max.x-z.min.x,De=z.max.y-z.min.y,Te=z.isBox3?z.max.z-z.min.z:1,Fe=z.min.x,He=z.min.y,ke=z.isBox3?z.min.z:0;else{const sn=Math.pow(2,-O);_e=Math.floor(mt.width*sn),De=Math.floor(mt.height*sn),M.isDataArrayTexture?Te=mt.depth:M.isData3DTexture?Te=Math.floor(mt.depth*sn):Te=1,Fe=0,He=0,ke=0}V!==null?(Je=V.x,lt=V.y,bt=V.z):(Je=0,lt=0,bt=0);const ut=Ue.convert(N.format),Oe=Ue.convert(N.type);let _t;N.isData3DTexture?(be.setTexture3D(N,0),_t=T.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(be.setTexture2DArray(N,0),_t=T.TEXTURE_2D_ARRAY):(be.setTexture2D(N,0),_t=T.TEXTURE_2D),T.pixelStorei(T.UNPACK_FLIP_Y_WEBGL,N.flipY),T.pixelStorei(T.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),T.pixelStorei(T.UNPACK_ALIGNMENT,N.unpackAlignment);const it=T.getParameter(T.UNPACK_ROW_LENGTH),Kt=T.getParameter(T.UNPACK_IMAGE_HEIGHT),Di=T.getParameter(T.UNPACK_SKIP_PIXELS),Zt=T.getParameter(T.UNPACK_SKIP_ROWS),_s=T.getParameter(T.UNPACK_SKIP_IMAGES);T.pixelStorei(T.UNPACK_ROW_LENGTH,mt.width),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,mt.height),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Fe),T.pixelStorei(T.UNPACK_SKIP_ROWS,He),T.pixelStorei(T.UNPACK_SKIP_IMAGES,ke);const yt=M.isDataArrayTexture||M.isData3DTexture,nn=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const sn=J.get(M),Ft=J.get(N),Vt=J.get(sn.__renderTarget),la=J.get(Ft.__renderTarget);he.bindFramebuffer(T.READ_FRAMEBUFFER,Vt.__webglFramebuffer),he.bindFramebuffer(T.DRAW_FRAMEBUFFER,la.__webglFramebuffer);for(let hi=0;hi<Te;hi++)yt&&(T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,J.get(M).__webglTexture,O,ke+hi),T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,J.get(N).__webglTexture,ae,bt+hi)),T.blitFramebuffer(Fe,He,_e,De,Je,lt,_e,De,T.DEPTH_BUFFER_BIT,T.NEAREST);he.bindFramebuffer(T.READ_FRAMEBUFFER,null),he.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else if(O!==0||M.isRenderTargetTexture||J.has(M)){const sn=J.get(M),Ft=J.get(N);he.bindFramebuffer(T.READ_FRAMEBUFFER,gh),he.bindFramebuffer(T.DRAW_FRAMEBUFFER,vh);for(let Vt=0;Vt<Te;Vt++)yt?T.framebufferTextureLayer(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,sn.__webglTexture,O,ke+Vt):T.framebufferTexture2D(T.READ_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,sn.__webglTexture,O),nn?T.framebufferTextureLayer(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,Ft.__webglTexture,ae,bt+Vt):T.framebufferTexture2D(T.DRAW_FRAMEBUFFER,T.COLOR_ATTACHMENT0,T.TEXTURE_2D,Ft.__webglTexture,ae),O!==0?T.blitFramebuffer(Fe,He,_e,De,Je,lt,_e,De,T.COLOR_BUFFER_BIT,T.NEAREST):nn?T.copyTexSubImage3D(_t,ae,Je,lt,bt+Vt,Fe,He,_e,De):T.copyTexSubImage2D(_t,ae,Je,lt,Fe,He,_e,De);he.bindFramebuffer(T.READ_FRAMEBUFFER,null),he.bindFramebuffer(T.DRAW_FRAMEBUFFER,null)}else nn?M.isDataTexture||M.isData3DTexture?T.texSubImage3D(_t,ae,Je,lt,bt,_e,De,Te,ut,Oe,mt.data):N.isCompressedArrayTexture?T.compressedTexSubImage3D(_t,ae,Je,lt,bt,_e,De,Te,ut,mt.data):T.texSubImage3D(_t,ae,Je,lt,bt,_e,De,Te,ut,Oe,mt):M.isDataTexture?T.texSubImage2D(T.TEXTURE_2D,ae,Je,lt,_e,De,ut,Oe,mt.data):M.isCompressedTexture?T.compressedTexSubImage2D(T.TEXTURE_2D,ae,Je,lt,mt.width,mt.height,ut,mt.data):T.texSubImage2D(T.TEXTURE_2D,ae,Je,lt,_e,De,ut,Oe,mt);T.pixelStorei(T.UNPACK_ROW_LENGTH,it),T.pixelStorei(T.UNPACK_IMAGE_HEIGHT,Kt),T.pixelStorei(T.UNPACK_SKIP_PIXELS,Di),T.pixelStorei(T.UNPACK_SKIP_ROWS,Zt),T.pixelStorei(T.UNPACK_SKIP_IMAGES,_s),ae===0&&N.generateMipmaps&&T.generateMipmap(_t),he.unbindTexture()},this.initRenderTarget=function(M){J.get(M).__webglFramebuffer===void 0&&be.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?be.setTextureCube(M,0):M.isData3DTexture?be.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?be.setTexture2DArray(M,0):be.setTexture2D(M,0),he.unbindTexture()},this.resetState=function(){R=0,P=0,D=null,he.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}}const Wl={type:"change"},gc={type:"start"},Xd={type:"end"},Ar=new ta,ql=new Zn,Ev=Math.cos(70*en.DEG2RAD),Tt=new A,Gt=2*Math.PI,ht={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},Ya=1e-6;class Tv extends zp{constructor(e,t=null){super(e,t),this.state=ht.NONE,this.target=new A,this.cursor=new A,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Qi.ROTATE,MIDDLE:Qi.DOLLY,RIGHT:Qi.PAN},this.touches={ONE:Yi.ROTATE,TWO:Yi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new A,this._lastQuaternion=new ai,this._lastTargetPosition=new A,this._quat=new ai().setFromUnitVectors(e.up,new A(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new gl,this._sphericalDelta=new gl,this._scale=1,this._panOffset=new A,this._rotateStart=new Se,this._rotateEnd=new Se,this._rotateDelta=new Se,this._panStart=new Se,this._panEnd=new Se,this._panDelta=new Se,this._dollyStart=new Se,this._dollyEnd=new Se,this._dollyDelta=new Se,this._dollyDirection=new A,this._mouse=new Se,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Rv.bind(this),this._onPointerDown=Av.bind(this),this._onPointerUp=Cv.bind(this),this._onContextMenu=kv.bind(this),this._onMouseWheel=Lv.bind(this),this._onKeyDown=Iv.bind(this),this._onTouchStart=Uv.bind(this),this._onTouchMove=Nv.bind(this),this._onMouseDown=Pv.bind(this),this._onMouseMove=Dv.bind(this),this._interceptControlDown=Ov.bind(this),this._interceptControlUp=Fv.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Wl),this.update(),this.state=ht.NONE}update(e=null){const t=this.object.position;Tt.copy(t).sub(this.target),Tt.applyQuaternion(this._quat),this._spherical.setFromVector3(Tt),this.autoRotate&&this.state===ht.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(i)&&isFinite(s)&&(i<-Math.PI?i+=Gt:i>Math.PI&&(i-=Gt),s<-Math.PI?s+=Gt:s>Math.PI&&(s-=Gt),i<=s?this._spherical.theta=Math.max(i,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+s)/2?Math.max(i,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(Tt.setFromSpherical(this._spherical),Tt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Tt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=Tt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new A(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new A(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Tt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(Ar.origin.copy(this.object.position),Ar.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(Ar.direction))<Ev?this.object.lookAt(this.target):(ql.setFromNormalAndCoplanarPoint(this.object.up,this.target),Ar.intersectPlane(ql,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>Ya||8*(1-this._lastQuaternion.dot(this.object.quaternion))>Ya||this._lastTargetPosition.distanceToSquared(this.target)>Ya?(this.dispatchEvent(Wl),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Gt/60*this.autoRotateSpeed*e:Gt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Tt.setFromMatrixColumn(t,0),Tt.multiplyScalar(-e),this._panOffset.add(Tt)}_panUp(e,t){this.screenSpacePanning===!0?Tt.setFromMatrixColumn(t,1):(Tt.setFromMatrixColumn(t,0),Tt.crossVectors(this.object.up,Tt)),Tt.multiplyScalar(e),this._panOffset.add(Tt)}_pan(e,t){const i=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;Tt.copy(s).sub(this.target);let r=Tt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/i.clientHeight,this.object.matrix),this._panUp(2*t*r/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const i=this.domElement.getBoundingClientRect(),s=e-i.left,r=t-i.top,o=i.width,a=i.height;this._mouse.x=s/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Gt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(i,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(i,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const i=this._getSecondPointerPosition(e),s=.5*(e.pageX+i.x),r=.5*(e.pageY+i.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Gt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Gt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(i,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),i=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(i*i+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Se,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}}function Av(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Rv(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Cv(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Xd),this.state=ht.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Pv(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Qi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=ht.DOLLY;break;case Qi.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ht.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ht.ROTATE}break;case Qi.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=ht.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=ht.PAN}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(gc)}function Dv(n){switch(this.state){case ht.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case ht.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case ht.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Lv(n){this.enabled===!1||this.enableZoom===!1||this.state!==ht.NONE||(n.preventDefault(),this.dispatchEvent(gc),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Xd))}function Iv(n){this.enabled!==!1&&this._handleKeyDown(n)}function Uv(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case Yi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=ht.TOUCH_ROTATE;break;case Yi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=ht.TOUCH_PAN;break;default:this.state=ht.NONE}break;case 2:switch(this.touches.TWO){case Yi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=ht.TOUCH_DOLLY_PAN;break;case Yi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=ht.TOUCH_DOLLY_ROTATE;break;default:this.state=ht.NONE}break;default:this.state=ht.NONE}this.state!==ht.NONE&&this.dispatchEvent(gc)}function Nv(n){switch(this._trackPointer(n),this.state){case ht.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case ht.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case ht.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case ht.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=ht.NONE}}function kv(n){this.enabled!==!1&&n.preventDefault()}function Ov(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Fv(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}class Bv{constructor(){this.id=0,this.object=null,this.z=0,this.renderOrder=0}}class Yd{constructor(){this.id=0,this.v1=new ns,this.v2=new ns,this.v3=new ns,this.normalModel=new A,this.vertexNormalsModel=[new A,new A,new A],this.vertexNormalsLength=0,this.color=new We,this.material=null,this.uvs=[new Se,new Se,new Se],this.z=0,this.renderOrder=0}}class ns{constructor(){this.position=new A,this.positionWorld=new A,this.positionScreen=new vt,this.visible=!0}copy(e){this.positionWorld.copy(e.positionWorld),this.positionScreen.copy(e.positionScreen)}}class jd{constructor(){this.id=0,this.v1=new ns,this.v2=new ns,this.vertexColors=[new We,new We],this.material=null,this.z=0,this.renderOrder=0}}class Kd{constructor(){this.id=0,this.object=null,this.x=0,this.y=0,this.z=0,this.rotation=0,this.scale=new Se,this.material=null,this.renderOrder=0}}class zv{constructor(){let e,t,i=0,s,r,o=0,a,l,c=0,d,h,m=0,p,v,g=0,f;const u={objects:[],lights:[],elements:[]},E=new A,w=new vt,x=new fn(new A(-1,-1,-1),new A(1,1,1)),C=new fn,R=new Array(3),P=new ot,D=new ot,y=new ot,b=new na,L=[],k=[],H=[],X=[],q=[];function $(){const G=[],le=[],Y=[];let se=null;const Re=new $e;function T(S){se=S,Re.getNormalMatrix(se.matrixWorld),G.length=0,le.length=0,Y.length=0}function de(S){const _=S.position,I=S.positionWorld,F=S.positionScreen;I.copy(_).applyMatrix4(f),F.copy(I).applyMatrix4(D);const Z=1/F.w;F.x*=Z,F.y*=Z,F.z*=Z,S.visible=F.x>=-1&&F.x<=1&&F.y>=-1&&F.y<=1&&F.z>=-1&&F.z<=1}function ie(S,_,I){s=Xe(),s.position.set(S,_,I),de(s)}function oe(S,_,I){G.push(S,_,I)}function he(S,_,I){le.push(S,_,I)}function Ge(S,_){Y.push(S,_)}function J(S,_,I){return S.visible===!0||_.visible===!0||I.visible===!0?!0:(R[0]=S.positionScreen,R[1]=_.positionScreen,R[2]=I.positionScreen,x.intersectsBox(C.setFromPoints(R)))}function be(S,_,I){return(I.positionScreen.x-S.positionScreen.x)*(_.positionScreen.y-S.positionScreen.y)-(I.positionScreen.y-S.positionScreen.y)*(_.positionScreen.x-S.positionScreen.x)<0}function Qe(S,_){const I=k[S],F=k[_];I.positionScreen.copy(I.position).applyMatrix4(y),F.positionScreen.copy(F.position).applyMatrix4(y),ee(I.positionScreen,F.positionScreen)===!0&&(I.positionScreen.multiplyScalar(1/I.positionScreen.w),F.positionScreen.multiplyScalar(1/F.positionScreen.w),d=ct(),d.id=se.id,d.v1.copy(I),d.v2.copy(F),d.z=Math.max(I.positionScreen.z,F.positionScreen.z),d.renderOrder=se.renderOrder,d.material=se.material,se.material.vertexColors&&(d.vertexColors[0].fromArray(le,S*3),d.vertexColors[1].fromArray(le,_*3)),u.elements.push(d))}function xe(S,_,I,F){const Z=k[S],W=k[_],Ae=k[I];if(J(Z,W,Ae)!==!1&&(F.side===qt||be(Z,W,Ae)===!0)){a=rt(),a.id=se.id,a.v1.copy(Z),a.v2.copy(W),a.v3.copy(Ae),a.z=(Z.positionScreen.z+W.positionScreen.z+Ae.positionScreen.z)/3,a.renderOrder=se.renderOrder,E.subVectors(Ae.position,W.position),w.subVectors(Z.position,W.position),E.cross(w),a.normalModel.copy(E),a.normalModel.applyMatrix3(Re).normalize();for(let ne=0;ne<3;ne++){const Ce=a.vertexNormalsModel[ne];Ce.fromArray(G,arguments[ne]*3),Ce.applyMatrix3(Re).normalize(),a.uvs[ne].fromArray(Y,arguments[ne]*2)}a.vertexNormalsLength=3,a.material=F,F.vertexColors&&a.color.fromArray(le,S*3),u.elements.push(a)}}return{setObject:T,projectVertex:de,checkTriangleVisibility:J,checkBackfaceCulling:be,pushVertex:ie,pushNormal:oe,pushColor:he,pushUv:Ge,pushLine:Qe,pushTriangle:xe}}const K=new $;function B(G){if(G.visible===!1)return;if(G.isLight)u.lights.push(G);else if(G.isMesh||G.isLine||G.isPoints){if(G.material.visible===!1||G.frustumCulled===!0&&b.intersectsObject(G)===!1)return;pe(G)}else if(G.isSprite){if(G.material.visible===!1||G.frustumCulled===!0&&b.intersectsSprite(G)===!1)return;pe(G)}const le=G.children;for(let Y=0,se=le.length;Y<se;Y++)B(le[Y])}function pe(G){e=Ie(),e.id=G.id,e.object=G,E.setFromMatrixPosition(G.matrixWorld),E.applyMatrix4(D),e.z=E.z,e.renderOrder=G.renderOrder,u.objects.push(e)}this.projectScene=function(G,le,Y,se){l=0,h=0,v=0,u.elements.length=0,G.matrixWorldAutoUpdate===!0&&G.updateMatrixWorld(),le.parent===null&&le.matrixWorldAutoUpdate===!0&&le.updateMatrixWorld(),P.copy(le.matrixWorldInverse),D.multiplyMatrices(le.projectionMatrix,P),b.setFromProjectionMatrix(D),t=0,u.objects.length=0,u.lights.length=0,B(G),Y===!0&&u.objects.sort(j);const Re=u.objects;for(let T=0,de=Re.length;T<de;T++){const ie=Re[T].object,oe=ie.geometry;if(K.setObject(ie),f=ie.matrixWorld,r=0,ie.isMesh){let he=ie.material;const Ge=Array.isArray(he),J=oe.attributes,be=oe.groups;if(J.position===void 0)continue;const Qe=J.position.array;for(let xe=0,S=Qe.length;xe<S;xe+=3){let _=Qe[xe],I=Qe[xe+1],F=Qe[xe+2];const Z=oe.morphAttributes.position;if(Z!==void 0){const W=oe.morphTargetsRelative,Ae=ie.morphTargetInfluences;for(let ne=0,Ce=Z.length;ne<Ce;ne++){const we=Ae[ne];if(we===0)continue;const te=Z[ne];W?(_+=te.getX(xe/3)*we,I+=te.getY(xe/3)*we,F+=te.getZ(xe/3)*we):(_+=(te.getX(xe/3)-Qe[xe])*we,I+=(te.getY(xe/3)-Qe[xe+1])*we,F+=(te.getZ(xe/3)-Qe[xe+2])*we)}}K.pushVertex(_,I,F)}if(J.normal!==void 0){const xe=J.normal.array;for(let S=0,_=xe.length;S<_;S+=3)K.pushNormal(xe[S],xe[S+1],xe[S+2])}if(J.color!==void 0){const xe=J.color.array;for(let S=0,_=xe.length;S<_;S+=3)K.pushColor(xe[S],xe[S+1],xe[S+2])}if(J.uv!==void 0){const xe=J.uv.array;for(let S=0,_=xe.length;S<_;S+=2)K.pushUv(xe[S],xe[S+1])}if(oe.index!==null){const xe=oe.index.array;if(be.length>0)for(let S=0;S<be.length;S++){const _=be[S];if(he=Ge===!0?ie.material[_.materialIndex]:ie.material,he!==void 0)for(let I=_.start,F=_.start+_.count;I<F;I+=3)K.pushTriangle(xe[I],xe[I+1],xe[I+2],he)}else for(let S=0,_=xe.length;S<_;S+=3)K.pushTriangle(xe[S],xe[S+1],xe[S+2],he)}else if(be.length>0)for(let xe=0;xe<be.length;xe++){const S=be[xe];if(he=Ge===!0?ie.material[S.materialIndex]:ie.material,he!==void 0)for(let _=S.start,I=S.start+S.count;_<I;_+=3)K.pushTriangle(_,_+1,_+2,he)}else for(let xe=0,S=Qe.length/3;xe<S;xe+=3)K.pushTriangle(xe,xe+1,xe+2,he)}else if(ie.isLine){y.multiplyMatrices(D,f);const he=oe.attributes;if(he.position!==void 0){const Ge=he.position.array;for(let J=0,be=Ge.length;J<be;J+=3)K.pushVertex(Ge[J],Ge[J+1],Ge[J+2]);if(he.color!==void 0){const J=he.color.array;for(let be=0,Qe=J.length;be<Qe;be+=3)K.pushColor(J[be],J[be+1],J[be+2])}if(oe.index!==null){const J=oe.index.array;for(let be=0,Qe=J.length;be<Qe;be+=2)K.pushLine(J[be],J[be+1])}else{const J=ie.isLineSegments?2:1;for(let be=0,Qe=Ge.length/3-1;be<Qe;be+=J)K.pushLine(be,be+1)}}}else if(ie.isPoints){y.multiplyMatrices(D,f);const he=oe.attributes;if(he.position!==void 0){const Ge=he.position.array;for(let J=0,be=Ge.length;J<be;J+=3)w.set(Ge[J],Ge[J+1],Ge[J+2],1),w.applyMatrix4(y),ue(w,ie,le)}}else ie.isSprite&&(ie.modelViewMatrix.multiplyMatrices(le.matrixWorldInverse,ie.matrixWorld),w.set(f.elements[12],f.elements[13],f.elements[14],1),w.applyMatrix4(D),ue(w,ie,le))}return se===!0&&u.elements.sort(j),u};function ue(G,le,Y){const se=1/G.w;G.z*=se,G.z>=-1&&G.z<=1&&(p=et(),p.id=le.id,p.x=G.x*se,p.y=G.y*se,p.z=G.z,p.renderOrder=le.renderOrder,p.object=le,p.rotation=le.rotation,p.scale.x=le.scale.x*Math.abs(p.x-(G.x+Y.projectionMatrix.elements[0])/(G.w+Y.projectionMatrix.elements[12])),p.scale.y=le.scale.y*Math.abs(p.y-(G.y+Y.projectionMatrix.elements[5])/(G.w+Y.projectionMatrix.elements[13])),p.material=le.material,u.elements.push(p))}function Ie(){if(t===i){const G=new Bv;return L.push(G),i++,t++,G}return L[t++]}function Xe(){if(r===o){const G=new ns;return k.push(G),o++,r++,G}return k[r++]}function rt(){if(l===c){const G=new Yd;return H.push(G),c++,l++,G}return H[l++]}function ct(){if(h===m){const G=new jd;return X.push(G),m++,h++,G}return X[h++]}function et(){if(v===g){const G=new Kd;return q.push(G),g++,v++,G}return q[v++]}function j(G,le){return G.renderOrder!==le.renderOrder?G.renderOrder-le.renderOrder:G.z!==le.z?le.z-G.z:G.id!==le.id?G.id-le.id:0}function ee(G,le){let Y=0,se=1;const Re=G.z+G.w,T=le.z+le.w,de=-G.z+G.w,ie=-le.z+le.w;return Re>=0&&T>=0&&de>=0&&ie>=0?!0:Re<0&&T<0||de<0&&ie<0?!1:(Re<0?Y=Math.max(Y,Re/(Re-T)):T<0&&(se=Math.min(se,Re/(Re-T))),de<0?Y=Math.max(Y,de/(de-ie)):ie<0&&(se=Math.min(se,de/(de-ie))),se<Y?!1:(G.lerp(le,Y),le.lerp(G,1-se),!0))}}}class $l extends xt{constructor(e){super(),this.isSVGObject=!0,this.node=e}}class Hv{constructor(){let e,t,i,s,r,o,a,l,c,d,h,m=0,p=null,v=1,g,f;const u=this,E=new _l,w=new _l,x=new We,C=new We,R=new We,P=new We,D=new We,y=new We,b=new A,L=new A,k=new A,H=new $e,X=new ot,q=new ot,$=[],K=new zv,B=document.createElementNS("http://www.w3.org/2000/svg","svg");this.domElement=B,this.autoClear=!0,this.sortObjects=!0,this.sortElements=!0,this.overdraw=.5,this.outputColorSpace=Dt,this.info={render:{vertices:0,faces:0}},this.setQuality=function(Y){switch(Y){case"high":v=1;break;case"low":v=0;break}},this.setClearColor=function(Y){y.set(Y)},this.setPixelRatio=function(){},this.setSize=function(Y,se){s=Y,r=se,o=s/2,a=r/2,B.setAttribute("viewBox",-o+" "+-a+" "+s+" "+r),B.setAttribute("width",s),B.setAttribute("height",r),E.min.set(-o,-a),E.max.set(o,a)},this.getSize=function(){return{width:s,height:r}},this.setPrecision=function(Y){p=Y};function pe(){for(m=0;B.childNodes.length>0;)B.removeChild(B.childNodes[0])}function ue(Y){return p!==null?Y.toFixed(p):Y}this.clear=function(){pe(),B.style.backgroundColor=y.getStyle(u.outputColorSpace)},this.render=function(Y,se){if(!(se instanceof dc)){console.error("THREE.SVGRenderer.render: camera is not an instance of Camera.");return}const Re=Y.background;Re&&Re.isColor?(pe(),B.style.backgroundColor=Re.getStyle(u.outputColorSpace)):this.autoClear===!0&&this.clear(),u.info.render.vertices=0,u.info.render.faces=0,X.copy(se.matrixWorldInverse),q.multiplyMatrices(se.projectionMatrix,X),e=K.projectScene(Y,se,this.sortObjects,this.sortElements),t=e.elements,i=e.lights,H.getNormalMatrix(se.matrixWorldInverse),Ie(i),g="",f="";for(let T=0,de=t.length;T<de;T++){const ie=t[T],oe=ie.material;if(!(oe===void 0||oe.opacity===0)){if(w.makeEmpty(),ie instanceof Kd)l=ie,l.x*=o,l.y*=-a,rt(l,ie,oe);else if(ie instanceof jd)l=ie.v1,c=ie.v2,l.positionScreen.x*=o,l.positionScreen.y*=-a,c.positionScreen.x*=o,c.positionScreen.y*=-a,w.setFromPoints([l.positionScreen,c.positionScreen]),E.intersectsBox(w)===!0&&ct(l,c,oe);else if(ie instanceof Yd){if(l=ie.v1,c=ie.v2,d=ie.v3,l.positionScreen.z<-1||l.positionScreen.z>1||c.positionScreen.z<-1||c.positionScreen.z>1||d.positionScreen.z<-1||d.positionScreen.z>1)continue;l.positionScreen.x*=o,l.positionScreen.y*=-a,c.positionScreen.x*=o,c.positionScreen.y*=-a,d.positionScreen.x*=o,d.positionScreen.y*=-a,this.overdraw>0&&(j(l.positionScreen,c.positionScreen,this.overdraw),j(c.positionScreen,d.positionScreen,this.overdraw),j(d.positionScreen,l.positionScreen,this.overdraw)),w.setFromPoints([l.positionScreen,c.positionScreen,d.positionScreen]),E.intersectsBox(w)===!0&&et(l,c,d,ie,oe)}}}G(),Y.traverseVisible(function(T){if(T.isSVGObject){if(b.setFromMatrixPosition(T.matrixWorld),b.applyMatrix4(q),b.z<-1||b.z>1)return;const de=b.x*o,ie=-b.y*a,oe=T.node;oe.setAttribute("transform","translate("+de+","+ie+")"),B.appendChild(oe)}})};function Ie(Y){R.setRGB(0,0,0),P.setRGB(0,0,0),D.setRGB(0,0,0);for(let se=0,Re=Y.length;se<Re;se++){const T=Y[se],de=T.color;T.isAmbientLight?(R.r+=de.r,R.g+=de.g,R.b+=de.b):T.isDirectionalLight?(P.r+=de.r,P.g+=de.g,P.b+=de.b):T.isPointLight&&(D.r+=de.r,D.g+=de.g,D.b+=de.b)}}function Xe(Y,se,Re,T){for(let de=0,ie=Y.length;de<ie;de++){const oe=Y[de],he=oe.color;if(oe.isDirectionalLight){const Ge=b.setFromMatrixPosition(oe.matrixWorld).normalize();let J=Re.dot(Ge);if(J<=0)continue;J*=oe.intensity,T.r+=he.r*J,T.g+=he.g*J,T.b+=he.b*J}else if(oe.isPointLight){const Ge=b.setFromMatrixPosition(oe.matrixWorld);let J=Re.dot(b.subVectors(Ge,se).normalize());if(J<=0||(J*=oe.distance==0?1:1-Math.min(se.distanceTo(Ge)/oe.distance,1),J==0))continue;J*=oe.intensity,T.r+=he.r*J,T.g+=he.g*J,T.b+=he.b*J}}}function rt(Y,se,Re){let T=se.scale.x*o,de=se.scale.y*a;Re.isPointsMaterial&&(T*=Re.size,de*=Re.size);const ie="M"+ue(Y.x-T*.5)+","+ue(Y.y-de*.5)+"h"+ue(T)+"v"+ue(de)+"h"+ue(-T)+"z";let oe="";(Re.isSpriteMaterial||Re.isPointsMaterial)&&(oe="fill:"+Re.color.getStyle(u.outputColorSpace)+";fill-opacity:"+Re.opacity),ee(oe,ie)}function ct(Y,se,Re){const T="M"+ue(Y.positionScreen.x)+","+ue(Y.positionScreen.y)+"L"+ue(se.positionScreen.x)+","+ue(se.positionScreen.y);if(Re.isLineBasicMaterial){let de="fill:none;stroke:"+Re.color.getStyle(u.outputColorSpace)+";stroke-opacity:"+Re.opacity+";stroke-width:"+Re.linewidth+";stroke-linecap:"+Re.linecap;Re.isLineDashedMaterial&&(de=de+";stroke-dasharray:"+Re.dashSize+","+Re.gapSize),ee(de,T)}}function et(Y,se,Re,T,de){u.info.render.vertices+=3,u.info.render.faces++;const ie="M"+ue(Y.positionScreen.x)+","+ue(Y.positionScreen.y)+"L"+ue(se.positionScreen.x)+","+ue(se.positionScreen.y)+"L"+ue(Re.positionScreen.x)+","+ue(Re.positionScreen.y)+"z";let oe="";de.isMeshBasicMaterial?(x.copy(de.color),de.vertexColors&&x.multiply(T.color)):de.isMeshLambertMaterial||de.isMeshPhongMaterial||de.isMeshStandardMaterial?(C.copy(de.color),de.vertexColors&&C.multiply(T.color),x.copy(R),L.copy(Y.positionWorld).add(se.positionWorld).add(Re.positionWorld).divideScalar(3),Xe(i,L,T.normalModel,x),x.multiply(C).add(de.emissive)):de.isMeshNormalMaterial&&(k.copy(T.normalModel).applyMatrix3(H).normalize(),x.setRGB(k.x,k.y,k.z).multiplyScalar(.5).addScalar(.5)),de.wireframe?oe="fill:none;stroke:"+x.getStyle(u.outputColorSpace)+";stroke-opacity:"+de.opacity+";stroke-width:"+de.wireframeLinewidth+";stroke-linecap:"+de.wireframeLinecap+";stroke-linejoin:"+de.wireframeLinejoin:oe="fill:"+x.getStyle(u.outputColorSpace)+";fill-opacity:"+de.opacity,ee(oe,ie)}function j(Y,se,Re){let T=se.x-Y.x,de=se.y-Y.y;const ie=T*T+de*de;if(ie===0)return;const oe=Re/Math.sqrt(ie);T*=oe,de*=oe,se.x+=T,se.y+=de,Y.x-=T,Y.y-=de}function ee(Y,se){f===Y?g+=se:(G(),f=Y,g=se)}function G(){g&&(h=le(m++),h.setAttribute("d",g),h.setAttribute("style",f),B.appendChild(h)),g="",f=""}function le(Y){return $[Y]==null&&($[Y]=document.createElementNS("http://www.w3.org/2000/svg","path"),v==0&&$[Y].setAttribute("shape-rendering","crispEdges")),$[Y]}}}const ws=new A;function an(n,e,t,i,s,r){const o=2*Math.PI*s/4,a=Math.max(r-2*s,0),l=Math.PI/4;ws.copy(e),ws[i]=0,ws.normalize();const c=.5*o/(o+a),d=1-ws.angleTo(n)/l;return Math.sign(ws[t])===1?d*c:a/(o+a)+c+c*(1-d)}class vc extends Pi{constructor(e=1,t=1,i=1,s=2,r=.1){const o=s*2+1;if(r=Math.min(e/2,t/2,i/2,r),super(1,1,1,o,o,o),this.type="RoundedBoxGeometry",this.parameters={width:e,height:t,depth:i,segments:s,radius:r},o===1)return;const a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;const l=new A,c=new A,d=new A(e,t,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,m=this.attributes.normal.array,p=this.attributes.uv.array,v=h.length/6,g=new A,f=.5/o;for(let u=0,E=0;u<h.length;u+=3,E+=2)switch(l.fromArray(h,u),c.copy(l),c.x-=Math.sign(c.x)*f,c.y-=Math.sign(c.y)*f,c.z-=Math.sign(c.z)*f,c.normalize(),h[u+0]=d.x*Math.sign(l.x)+c.x*r,h[u+1]=d.y*Math.sign(l.y)+c.y*r,h[u+2]=d.z*Math.sign(l.z)+c.z*r,m[u+0]=c.x,m[u+1]=c.y,m[u+2]=c.z,Math.floor(u/v)){case 0:g.set(1,0,0),p[E+0]=an(g,c,"z","y",r,i),p[E+1]=1-an(g,c,"y","z",r,t);break;case 1:g.set(-1,0,0),p[E+0]=1-an(g,c,"z","y",r,i),p[E+1]=1-an(g,c,"y","z",r,t);break;case 2:g.set(0,1,0),p[E+0]=1-an(g,c,"x","z",r,e),p[E+1]=an(g,c,"z","x",r,i);break;case 3:g.set(0,-1,0),p[E+0]=1-an(g,c,"x","z",r,e),p[E+1]=1-an(g,c,"z","x",r,i);break;case 4:g.set(0,0,1),p[E+0]=1-an(g,c,"x","y",r,e),p[E+1]=1-an(g,c,"y","x",r,t);break;case 5:g.set(0,0,-1),p[E+0]=an(g,c,"x","y",r,e),p[E+1]=1-an(g,c,"y","x",r,t);break}}static fromJSON(e){return new vc(e.width,e.height,e.depth,e.segments,e.radius)}}const Zd=Object.freeze({pressure:Object.freeze({label:"Movement",technicalLabel:"Local mechanical actuation",color:"#8778b6"}),optical:Object.freeze({label:"Light and image",technicalLabel:"Optical path",color:"#b58a24"}),data:Object.freeze({label:"Data",technicalLabel:"Electrical control and image data",color:"#3c7fa4"}),power:Object.freeze({label:"Power",technicalLabel:"Electrical supply",color:"#667078"})});Object.freeze([{id:"bay-valve",name:"Bay motor driver",simpleName:"Movement controller",view:"dock",side:"reusable",description:"Each bay has one dual motor-driver board that controls its two 12 V dry linear actuators. The drivers and actuators are local to that bay.",simpleDescription:"This bay controls its own two small mechanical drives.",interfacesWith:["processor","backplane","pumps"]},{id:"bay-dock",name:"Cartridge dock",simpleName:"Cartridge holder",view:"dock",side:"reusable",description:"The proposed PETG dock locates and holds the disposable cartridge. Two insertion limit switches provide cartridge-position information; liquids remain in the cartridge.",simpleDescription:"The holder positions the cartridge and checks that it is inserted.",interfacesWith:["pumps","dock-seal","cartridge"]},{id:"dock-seal",name:"Silicone dry contact pad",simpleName:"Dry contact pad",view:"dock",side:"reusable",description:"The proposed silicone interface pad provides dry mechanical contact between the local actuator mechanism and the cartridge contact surface. It is not a reusable liquid pathway.",simpleDescription:"The soft pad transfers movement without carrying sample liquid.",interfacesWith:["pumps","bay-dock","cartridge-membrane"]},{id:"cartridge-membrane",name:"Cartridge contact surface",simpleName:"Disposable contact surface",view:"dock",side:"disposable",description:"The cartridge presents a dry contact surface to the mechanical interface. The detailed internal cartridge mechanism remains a proposed design; all specimen-contact liquid paths and waste stay inside the disposable cartridge.",simpleDescription:"The reusable drive touches the cartridge exterior; the wet assay paths stay inside.",interfacesWith:["dock-seal","cartridge"]}].map(n=>Object.freeze({...n,interfacesWith:Object.freeze(n.interfacesWith)})));const $s=Object.freeze([{id:"pressure-dock",kind:"pressure",label:"Move the cartridge mechanism",technicalLabel:"Local linear-actuator contact",from:"pumps",to:"dock-seal",description:"The selected bay uses its own two dry linear actuators to operate the proposed cartridge mechanism through a silicone dry contact pad. The reusable drive carries no sample liquid.",simpleDescription:"Small drives in this bay move the cartridge mechanism through a dry pad."},{id:"optical-capture",kind:"optical",label:"Read the reaction",technicalLabel:"Camera and ring-light imaging",from:"wells",to:"optics",description:"One camera and one white ring-illumination board in each bay record the cartridge reaction windows for software interpretation and qualified review.",simpleDescription:"The bay light and camera record what happened in the reaction chambers."},{id:"camera-data",kind:"data",label:"Send the reaction image",technicalLabel:"Captured image data",from:"optics",to:"processor",description:"The bay camera sends the captured image and status to the processing board. The software associates this evidence with the correct specimen and testing bay.",simpleDescription:"The camera image is linked to the correct sample record."},{id:"display-data",kind:"data",label:"Show progress and results",technicalLabel:"Operator display data",from:"processor",to:"screen",description:"The processing board supplies progress, control findings and review status to the operator display. Staff must review and authorise an eligible result.",simpleDescription:"The screen shows progress and findings for staff review."},{id:"power-processor",kind:"power",label:"Power the controller",technicalLabel:"Processing-board electrical supply",from:"power",to:"processor",description:"The analyser power supply feeds the processing and control electronics.",simpleDescription:"The power supply runs the main controller."},{id:"power-optics",kind:"power",label:"Power the camera and light",technicalLabel:"Bay imaging electrical supply",from:"power",to:"optics",description:"The analyser electrical supply powers the selected bay camera and white ring-illumination board.",simpleDescription:"Electrical power runs the bay camera and light."},{id:"power-control",kind:"power",label:"Power this bay’s drives",technicalLabel:"Local motor-driver and actuator supply",from:"power",to:"pumps",description:"Electrical power reaches the selected bay’s two dry linear actuators through that bay’s dual motor driver. There is no mechanical drive shared across testing bays.",simpleDescription:"Each bay has powered drives of its own."},{id:"system-air-supply",kind:"pressure",label:"Control the first local drive",technicalLabel:"Bay-local actuator 1 control",from:"bay-valve",to:"pumps",description:"One output of the bay’s dual motor-driver board controls the first of its two dry linear actuators. This relationship exists locally in each installed bay.",simpleDescription:"This bay’s movement controller operates its first drive."},{id:"system-air-branch",kind:"pressure",label:"Control the second local drive",technicalLabel:"Bay-local actuator 2 control",from:"bay-valve",to:"pumps",description:"The second output of the same local dual motor driver controls the bay’s second dry linear actuator. Additional bays have their own driver and actuator pair.",simpleDescription:"This bay’s movement controller operates its second drive."},{id:"system-dock-actuation",kind:"pressure",label:"Transfer movement through the pad",technicalLabel:"Local actuator-to-pad mechanical contact",from:"pumps",to:"dock-seal",description:"The selected bay’s actuator mechanism applies movement through its silicone dry contact pad to the cartridge. The proposed connection transfers mechanical motion, not sample liquid.",simpleDescription:"The local drive moves the cartridge mechanism through a dry contact pad."},{id:"system-data-trunk",kind:"data",label:"Connect the bay controls",technicalLabel:"Local control backplane data",from:"processor",to:"backplane",description:"The controller exchanges bay commands, image records and status through the analyser’s electrical data backplane. Every installed bay retains its own mechanical actuators.",simpleDescription:"The data backplane links each bay to the main controller."},{id:"system-data-branch",kind:"data",label:"Connect this bay’s camera",technicalLabel:"Bay imaging data branch",from:"backplane",to:"optics",description:"The electrical data branch carries commands to this bay’s imaging assembly and returns its captured images and status.",simpleDescription:"This bay sends its camera images and status over the data connection."},{id:"system-power-trunk",kind:"power",label:"Distribute electrical power",technicalLabel:"Local electrical distribution backplane",from:"power",to:"backplane",description:"The analyser power supply feeds an electrical distribution backplane. This shared electrical supply does not imply a shared mechanical drive or reusable liquid circuit.",simpleDescription:"The backplane distributes electricity to the installed bays."},{id:"system-power-branch",kind:"power",label:"Power this bay’s imaging",technicalLabel:"Bay imaging electrical branch",from:"backplane",to:"optics",description:"An electrical branch supplies this bay’s camera and white ring-illumination board.",simpleDescription:"This electrical branch runs the bay camera and ring light."},{id:"cluster-data-link",kind:"data",label:"Link two analyser units",technicalLabel:"Inter-analyser data link",from:"backplane",to:"backplane",via:"module-coupler",description:"Two complete analyser units exchange queue and result-status information through a data connection. Each unit retains its own power supply, and every testing bay has local mechanical drives. No specimen circulates between analysers.",simpleDescription:"The two units share testing information over a data link."},{id:"dock-seal-interface",kind:"pressure",label:"Seat the dry contact pad",technicalLabel:"Dock-to-pad positioning",from:"bay-dock",to:"dock-seal",description:"The proposed cartridge dock positions the silicone dry interface pad for contact with the inserted cartridge. The dock and pad are outside the disposable liquid pathways.",simpleDescription:"The holder positions the pad against the cartridge."},{id:"membrane-actuation",kind:"pressure",label:"Contact the disposable surface",technicalLabel:"Dry pad-to-cartridge mechanical interface",from:"dock-seal",to:"cartridge-membrane",description:"The silicone pad contacts the cartridge’s dry external contact surface. The precise internal mechanism requires development; liquids and residual waste remain in the single-use kit.",simpleDescription:"The dry pad touches the cartridge exterior while liquids stay inside."},{id:"local-driver-data",kind:"data",label:"Send movement commands",technicalLabel:"Bay-local dual motor-driver commands",from:"processor",to:"bay-valve",description:"The controller sends movement commands to the dual motor-driver board in the selected bay. One local driver operates that bay’s two dry linear actuators.",simpleDescription:"The controller tells this bay’s own drives when to move."},{id:"local-driver-power",kind:"power",label:"Power the local movement controller",technicalLabel:"Bay motor-driver electrical branch",from:"backplane",to:"bay-valve",description:"The electrical distribution supplies the selected bay’s dual motor-driver board and its local actuator pair.",simpleDescription:"This electrical branch powers the bay’s movement controller."},{id:"heater-power",kind:"power",label:"Power the bay heater",technicalLabel:"Switched bay-heater electrical branch",from:"backplane",to:"thermal",description:"Each bay has a heater element and a local heater power switch. The temperature probe provides the corresponding temperature measurement for control and checking.",simpleDescription:"A controlled electrical supply runs this bay’s heater."},{id:"temperature-data",kind:"data",label:"Read the bay temperature",technicalLabel:"Bay temperature-probe measurement",from:"thermal",to:"processor",description:"The selected bay’s temperature probe provides its measured temperature to the controller for assay-environment control and checks.",simpleDescription:"The controller checks the temperature in this bay."},{id:"manual-patient-cells",kind:"manual",label:"Load patient red cells",technicalLabel:"Manual prepared recipient red-cell loading",from:"patient-cells",to:"cartridge",description:"Staff manually load an identified, prepared patient red-cell fraction into its cartridge inlet when the selected test requires it. This container is not permanently connected to the analyser.",simpleDescription:"Staff load the prepared patient red cells into the cartridge."},{id:"manual-patient-plasma",kind:"manual",label:"Load patient plasma",technicalLabel:"Manual prepared recipient plasma loading",from:"patient-plasma",to:"cartridge",description:"Staff manually load the identified patient plasma fraction into its separate cartridge inlet. This is a small prepared specimen fraction, not a transfusion plasma bag.",simpleDescription:"Staff load the prepared patient plasma into its own inlet."},{id:"manual-donor-cells",kind:"manual",label:"Load donor red cells",technicalLabel:"Manual prepared donor red-cell loading",from:"donor-cells",to:"cartridge",description:"Staff manually load prepared red cells from the selected, identified donor unit for a requested crossmatch. These donor cells meet patient plasma only in the intended cartridge reaction.",simpleDescription:"Staff load the selected donor’s prepared red cells for crossmatching."}].map(n=>Object.freeze({...n,color:Zd[n.kind]?.color||"#8b4a59"})));function Vv(n){const e=String(n||"").trim(),t=/^bay-\d+$/.test(e)?"bays":e.startsWith("reaction:")?"wells":e==="air-manifold"?"pumps":e;if(t==="bays"){const i=new Set(["pressure-dock","optical-capture","camera-data","system-air-supply","system-air-branch","system-dock-actuation","system-data-branch","system-power-branch","local-driver-data","local-driver-power","heater-power","temperature-data"]);return $s.filter(s=>i.has(s.id))}return $s.filter(i=>i.from===t||i.to===t||i.via===t)}const Ai=[{id:"enclosure",name:"Protective enclosure",does:"Houses the assay, electronics and two independent testing bays.",why:"A compact benchtop body protects the proposed fluidic and optical assemblies.",process:"The Core design target is approximately 45 × 35 × 30 cm and under 18 kg. Neither has been measured on a manufactured instrument.",dimension:"45 × 35 × 30 cm; under 18 kg. Proposed Core design targets; expanded dimensions unverified.",simpleName:"Machine body",simpleDoes:"Protects the testing bays and electronics."},{id:"screen",name:"Operator touchscreen",does:"Shows specimen identity, bay progress and review status.",why:"The operator must see which cartridge and patient record belong together.",process:"An analytical result enters qualified review; this display does not independently authorise transfusion.",simpleName:"Screen",simpleDoes:"Shows progress, results and review status."},{id:"bays",name:"Independent cartridge bays",does:"Locates and locks an identified single-use cartridge beneath its optical reader.",why:"Separate test positions let eligible requests begin independently.",process:"Each bay has its own camera, light, two mechanical actuators, motor driver, heater and temperature probe. Shared reader power and electronics remain relevant system dependencies.",simpleName:"Testing bays",simpleDoes:"Each bay holds a separate kit for one test."},{id:"optics",name:"Camera and illumination assembly",does:"Illuminates the reaction windows and captures their optical pattern.",why:"Controlled imaging makes dispersed, agglutinated and uncertain patterns visible for interpretation.",process:"Image quality and assay controls must pass. Optical clumping alone does not detect every clinically significant antibody.",simpleName:"Camera and light",simpleDoes:"Lights the test chambers and records their reactions."},{id:"pumps",name:"Dry linear actuators",does:"Two local linear actuators operate one bay’s cartridge mechanisms through dry contact pads.",why:"Each bay needs its own controlled mechanical movement.",process:"Appendix A2 lists two dry linear actuators and one dual motor driver for each bay. The motors act through the silicone dry interface pad; specimen and reagent liquids remain inside the disposable cartridge.",view:"dock",simpleName:"Small motors",simpleDoes:"Two small motors operate the kit through dry contact pads."},{id:"processor",name:"Processing and control board",does:"Coordinates timing, bay status, optical capture and the local event record.",why:"All test evidence must remain attached to the correct specimen and donor identifiers.",process:"Local records can remain available during a network outage, while hospital transmission stays pending.",simpleName:"Computer board",simpleDoes:"Keeps each image and result linked to the correct sample."},{id:"power",name:"Power supply",does:"Converts mains input to the internal instrument supply rails.",why:"Optics, control electronics and actuators require stable electrical power.",process:"Portability means relocation between suitably equipped laboratories. The concept still requires electrical power and trained staff.",simpleName:"Power supply",simpleDoes:"Supplies electricity to this reader and its bays."},{id:"thermal",name:"Core cooling fan",does:"Circulates air around the shared reader electronics.",why:"The reusable electronics need suitable operating conditions.",process:"The shared build lists a cooling fan. Each bay separately contains its own heater, temperature probe and heater power switch.",simpleName:"Cooling fan",simpleDoes:"Moves air around the reader electronics."},{id:"structure",name:"Internal support frame",does:"Aligns bays, optics and fluid-control interfaces.",why:"Repeatable positioning keeps each reaction window within the imaging field.",process:"A rigid support chassis separates the assay dock from serviceable electronics.",simpleName:"Support frame",simpleDoes:"Keeps the kit, camera and other parts in place."},{id:"cartridge",name:"Single-use microfluidic cartridge",does:"Contains separate sample, reagent, reaction and waste regions.",why:"The assay route must match the requested Type & Screen, Complete Routine or Match Only scope.",process:"A fresh, identified cartridge is used for one indicated test. After use, the sealed specimen-contact paths and waste remain inside the disposable kit. Reuse is blocked in the demonstration. Geometry and chemistry require development and validation.",specification:"Single-use sealed assay kit; scope-specific reaction regions. No validated cartridge dimensions are specified.",simpleName:"Single-use kit",simpleDoes:"Holds the samples, test materials, liquid paths and waste."},{id:"inlet",name:"Patient sample inlet",does:"Receives an identified patient specimen.",why:"Recipient red cells support forward grouping; recipient plasma supports reverse grouping, screening and crossmatching.",process:"Existing laboratory equipment prepares the separate patient red-cell and plasma fractions. Staff identify and load them into the selected kit.",simpleName:"Sample inlet",simpleDoes:"Receives the identified, prepared sample."},{id:"channels",name:"Separated red-cell and plasma routes",does:"Directs metered specimen fractions to their relevant reaction wells.",why:"Typing reagents react with patient red cells; screening and crossmatching use patient plasma.",process:"Red denotes a red-cell route. Amber denotes plasma. Animation follows the modelled channel geometry.",simpleName:"Liquid paths",simpleDoes:"Keeps each sample on its required route inside the kit."},{id:"reagents",name:"Metered reagent reservoirs",does:"Supplies the selected reagent or reference cells to an isolated test region.",why:"Forward grouping, reverse grouping and screening use different materials.",process:"Assay-specific reagent/reference-cell reservoirs are preloaded into the single-use kit. The operator loads only the required prepared specimen fractions. Lot, expiry and control responses must be acceptable.",specification:"Preloaded, metered, isolated assay reagents; not transfusion products.",simpleName:"Test materials",simpleDoes:"Contains the materials needed for each reaction."},{id:"wells",name:"Reaction and optical windows",does:"Holds each isolated assay reaction for controlled imaging.",why:"A positive Anti-A typing reaction and a reactive donor crossmatch have different meanings.",process:"Typing reactivity supports antigen identification. Crossmatch reactivity requires holding the donor unit and investigating.",simpleName:"Test chambers",simpleDoes:"Holds the reactions that the camera records."},{id:"waste",name:"Sealed waste region",does:"Collects spent sample and reagent within the disposable cartridge.",why:"Waste must remain separate from reagent storage and finished reaction windows.",process:"Spent assay fluid remains in the sealed single-use kit. A used cartridge cannot be refilled or reused. The proposed containment geometry still requires validation.",specification:"Sealed post-assay waste; disposable cartridge lifecycle.",simpleName:"Used liquid",simpleDoes:"Keeps leftover liquid sealed inside the used kit."},{id:"patient-cells",name:"Patient red-cell fraction",does:"Supplies prepared recipient red cells to forward ABO and RhD typing.",why:"Patient red cells are required to test for A, B and D antigen reactions.",process:"This is a prepared specimen fraction. It remains separate from recipient plasma and donor red cells until its own indicated reactions. It is not a transfusion component.",specification:"Required for Type & Screen and Complete Routine; omitted from Match Only.",simpleName:"Patient red cells",simpleDoes:"Used to check the patient’s main blood-group markers."},{id:"patient-plasma",name:"Patient plasma fraction",does:"Supplies prepared recipient plasma to reverse grouping, antibody screening and indicated crossmatching.",why:"Recipient antibodies are assessed using the appropriate reagent cells or selected donor red cells.",process:"This small prepared specimen fraction is not a transfusion plasma bag. Its gold pathway remains separate from the patient-cell route.",specification:"Required by all three demonstrated cartridge scopes.",simpleName:"Patient plasma",simpleDoes:"Used to check antibodies and a selected donor when requested."},{id:"donor-cells",name:"Donor red-cell fraction",does:"Supplies prepared red cells from the selected, identified donor unit.",why:"Donor-specific crossmatching combines recipient plasma with these donor cells in the crossmatch chamber.",process:"Donor red cells remain in their isolated red route until the intended crossmatch reaction. Matching ABO/RhD labels alone do not establish compatibility.",specification:"Required for Complete Routine and Match Only; omitted from Type & Screen.",simpleName:"Donor red cells",simpleDoes:"Used to check the selected donor against the patient’s plasma."},{id:"backplane",name:"Power and data backplane",view:"inside",does:"Carries electrical power and communication between the Core and its installed bays.",why:"Each local motor driver, heater and camera needs the appropriate electrical connection.",process:"Keyed electrical couplers link expansion bays within one reader. Each complete reader retains its own power supply; two readers exchange data only.",specification:"Proposed connection layout; no connector part number or electrical rating is claimed.",simpleName:"Power and data board",simpleDoes:"Connects each bay to the reader’s electricity and computer."},{id:"air-manifold",name:"Local actuator support",view:"inside",does:"Positions two dry mechanical actuators within one testing bay.",why:"The actuator heads must align with that bay’s dry cartridge contact surfaces.",process:"This support carries local mechanical hardware. The rear interconnect carries power and data; cartridge liquids remain in the single-use wet path.",specification:"Local dry mechanical layout based on the updated product bill of materials.",simpleName:"Motor support",simpleDoes:"Holds the two small motors inside one bay."},{id:"module-coupler",name:"Expansion power and data couplers",view:"inside",does:"Joins the electrical interfaces between the Core and added bay modules.",why:"The added bays need power and communication links.",process:"The couplers connect power and data within one reader. A separate data cable connects two complete readers, each with its own power supply.",simpleName:"Expansion plugs",simpleDoes:"Connects power and data when more bays are added."},{id:"bay-valve",name:"Dual motor-driver board",view:"dock",does:"Controls the two dry linear actuators in one bay.",why:"The bay’s cartridge mechanism needs controlled local movement.",process:"Appendix A2 specifies one dual motor driver and two dry linear actuators per bay. Control and power reach the board electrically.",simpleName:"Motor control",simpleDoes:"Controls the two small motors in one bay."},{id:"bay-dock",name:"Cartridge dock and guide rails",view:"dock",does:"Locates and locks the cartridge, aligning its dry contact surfaces and optical windows.",why:"The actuator pads, heater and camera must meet the intended kit positions.",process:"The locating stop and insertion switches support positioning checks. Fitting the inspection model does not load, run or change an assay.",simpleName:"Kit holder",simpleDoes:"Guides the kit into place and locks it for testing."},{id:"dock-seal",name:"Silicone dry interface pad",view:"dock",does:"Transfers local actuator movement to the cartridge contact surface.",why:"A dry contact interface keeps the reusable drive separate from the specimen-contact paths.",process:"The updated bill of materials lists a silicone dry interface pad for each bay. The flat contact pad meets the kit surface during inspection fitting.",simpleName:"Soft contact pad",simpleDoes:"Passes the motor’s movement to the kit through a dry surface."},{id:"cartridge-membrane",name:"Sealed cartridge contact surface",view:"dock",does:"Receives dry mechanical contact from the bay’s actuator pad.",why:"The bay must operate the cartridge mechanism while its liquid paths stay disposable.",process:"The contact surface is part of the sealed kit. Mechanical actuation is illustrated as a proposed layout; the detailed internal cartridge mechanism remains an engineering-development task.",simpleName:"Kit contact surface",simpleDoes:"Receives the motor’s movement while liquids stay inside the kit."},{id:"donor",name:"Identified donor-unit inlet",does:"Routes donor red cells to the donor-specific crossmatch chamber.",why:"A matching ABO/RhD label does not by itself establish donor-unit compatibility.",process:"Recipient plasma is tested against red cells from the selected, traceable donor unit.",simpleName:"Donor sample inlet",simpleDoes:"Receives prepared cells from the selected donor unit."},{id:"heater",name:"Bay heating element",simpleName:"Heater",does:"Controls the kit’s temperature for the selected test.",simpleDoes:"Controls the kit’s temperature for the selected test.",why:"The assay requires appropriate controlled conditions.",process:"Appendix A2 lists one heater and a heater power switch per bay. Operating limits depend on the developed assay method.",view:"dock"},{id:"temperature-probe",name:"Bay temperature probe",simpleName:"Temperature sensor",does:"Measures the temperature near the kit.",simpleDoes:"Measures the temperature near the kit.",why:"The software needs temperature feedback to check the heating conditions.",process:"Appendix A2 lists a temperature probe for every bay. No measured temperature accuracy is claimed.",view:"dock"},{id:"limit-switch",name:"Cartridge insertion limit switches",simpleName:"Kit position switches",does:"Checks whether the kit has reached its intended dock positions.",simpleDoes:"Checks whether the kit has reached its intended dock positions.",why:"The drive and camera should operate on a correctly positioned kit.",process:"Appendix A2 lists two insertion limit switches per bay. This model illustrates their placement, not validated detection performance.",view:"dock"}],ze={shell:15329507,light:16447990,burgundy:8201269,dark:2369579,metal:11976128,red:9704747,amber:11827208,green:5405289},Xl={"Anti-A":"anti-a","Anti-B":"anti-b","Anti-D":"anti-d","A1 cells":"reverse-a1","B cells":"reverse-b","Screen I":"screen-i","Screen II":"screen-ii","Screen III":"screen-iii",Crossmatch:"crossmatch","Control +":"positive-control","Control −":"negative-control"},ja=n=>Ai.find(e=>e.id===n);class Gv{constructor(e,{onSelect:t=()=>{}}={}){this.container=e,this.onSelect=t,this.state={config:2,elapsed:0,running:!1,stage:0,cartridge:"complete",mode:"device",exploded:!1,cutaway:!1,flow:!1,activeBays:[],selectedBay:1,sampleLoaded:!1,inserted:!1,insertionProgress:0,loadedFractions:{patientCells:!1,patientPlasma:!1,donorCells:!1},bayStates:[],showDimensions:!1,kitUsed:!1,showConnections:!1,connectionKind:null,connectionScope:"system",dockSeparated:!0,explanationMode:!1},this.parts=[],this.flows=[],this.bayLamps=[],this.selectables=[],this.reactionWells=[],this.loadedCartridges=[],this.sampleTubes=[],this.patientInlets=[],this.screens=[],this.loadingTrays=[],this.labelPoints=[],this.wasteRegions=[],this.bayAnchors=[],this.deviceUnits=[],this.corePorts=[],this.bayPorts=new Map,this.connectionEdges=[],this.inspectionCovers=[],this.systemUnits=[],this.systemEdges=[],this.dockInspection=null,this.textures=[],this.logoTexture=null,this.disposed=!1,this.raycaster=new Bp,this.pointer=new Se,this.clock=new Fp;const i=document.createElement("canvas");let s=null;try{s=i.getContext("webgl2",{antialias:!0,failIfMajorPerformanceCaveat:!0})}catch{}s?(this.renderer=new wv({canvas:i,context:s,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),this.renderer.toneMapping=_d,this.renderer.toneMappingExposure=.95,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=gd):(this.software=!0,this.renderer=new Hv,this.renderer.setQuality("low"),this.renderer.setPrecision(2),this.renderer.overdraw=.25),this.renderer.setClearColor(15790060,1),this.renderer.outputColorSpace=Dt,this.renderer.domElement.setAttribute("aria-label","Interactive 3D HemaTrix model. Drag to rotate, scroll to zoom, right-drag to pan."),this.renderer.domElement.setAttribute("role","img"),this.renderer.domElement.style.cssText="width:100%;height:100%;display:block;touch-action:none",e.appendChild(this.renderer.domElement),this.scene=new lp,this.scene.background=new We(15790060),this.camera=new on(36,1,.1,120),this.controls=new Tv(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.075,this.controls.minDistance=3,this.controls.maxDistance=35,this.controls.maxPolarAngle=Math.PI*.48,this.controls.target.set(0,1,0),this.scene.add(new Ip(16777215,8095115,1)),this.software&&this.scene.add(new kp(9673631,.65));const r=new pl(16777215,this.software?.75:2.15);r.position.set(-5,10,6),r.castShadow=!0,r.shadow.mapSize.set(2048,2048),r.shadow.camera.left=-18,r.shadow.camera.right=18,r.shadow.camera.top=18,r.shadow.camera.bottom=-18,r.shadow.normalBias=.025,r.shadow.bias=-2e-4,this.scene.add(r);const o=new pl(16777215,this.software?.25:.7);o.position.set(7,4,-5),this.scene.add(o),this.floor=new gt(new Qn(100,100),new ll({color:15790060,roughness:.95})),this.floor.rotation.x=-Math.PI/2,this.floor.position.y=-.02,this.floor.receiveShadow=!0,this.scene.add(this.floor),this.root=new St,this.scene.add(this.root),this._pointerDown=a=>{this.down=[a.clientX,a.clientY]},this._pointerUp=a=>{this.down&&Math.hypot(a.clientX-this.down[0],a.clientY-this.down[1])<5&&this.pick(a)},this.renderer.domElement.addEventListener("pointerdown",this._pointerDown),this.renderer.domElement.addEventListener("pointerup",this._pointerUp),this.observer=new ResizeObserver(()=>this.resize()),this.observer.observe(e),this.build(),this.resize(),this.setView("reset"),this.animate()}mat(e,t={}){return new ll({color:e,roughness:.48,metalness:.08,...t})}tag(e,t){return e.userData.component=t,this.selectables.push(e),e}box(e,t,i,s,r,o=.04,a={}){const l=o&&!this.software?new vc(...t,2,o):new Pi(...t),c=new gt(l,this.mat(s,a));return c.position.set(...i),c.castShadow=!0,c.receiveShadow=!0,r&&this.tag(c,r),e.add(c),c}cylinder(e,t,i,s,r,o,a={}){const l=new gt(new ia(t,t,i,this.software?8:24),this.mat(r,a));return l.position.set(...s),l.castShadow=!0,l.receiveShadow=!0,o&&this.tag(l,o),e.add(l),l}part(e,t,i=[0,0,0]){const s=new St;return e.add(s),s.userData.component=t,s.userData.origin=s.position.clone(),s.userData.explode=new A(...i),this.parts.push(s),s}text(e,t,i,{width:s=1.7,height:r=.28,size:o=48,color:a="#3d4143",background:l=null,rotate:c=!1}={}){if(this.software){const f=document.createElementNS("http://www.w3.org/2000/svg","text");f.textContent=t,f.setAttribute("text-anchor","middle"),f.setAttribute("dominant-baseline","central"),f.setAttribute("fill",a),f.setAttribute("font-family","Arial,sans-serif"),f.setAttribute("font-weight","600"),f.setAttribute("font-size",String(Math.max(6,Math.min(13,o/5)))),f.style.pointerEvents="none";const u=new $l(f);return u.position.set(...i),u.userData.labelNormal=new A(0,c?1:0,c?0:1),u.userData.labelHeight=r*.72,u.userData.labelWidth=s*.95,e.add(u),u}const d=document.createElement("canvas");d.width=1024,d.height=Math.round(1024*r/s);const h=d.getContext("2d");l&&(h.fillStyle=l,h.fillRect(0,0,d.width,d.height)),h.fillStyle=a,h.textAlign="center",h.textBaseline="middle";let m=d.height*.72;h.font=`600 ${m}px Arial, sans-serif`;const p=h.measureText(t).width;p>d.width*.95&&(m*=d.width*.95/p,h.font=`600 ${m}px Arial, sans-serif`),h.fillText(t,512,d.height/2);const v=new ol(d);v.colorSpace=Dt,this.textures.push(v);const g=new gt(new Qn(s,r),new xn({map:v,transparent:!0,depthWrite:!1,side:qt}));return g.position.set(...i),c&&(g.rotation.x=-Math.PI/2),e.add(g),g}frontLogo(e,t){const s=.5924812030075188;if(this.software){const o=document.createElementNS("http://www.w3.org/2000/svg","g"),a=document.createElementNS("http://www.w3.org/2000/svg","image");a.setAttribute("href","./assets/hematrix-logo.svg"),a.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href","./assets/hematrix-logo.svg"),a.setAttribute("x","0"),a.setAttribute("y","0"),a.setAttribute("width","1"),a.setAttribute("height","1"),a.setAttribute("preserveAspectRatio","none"),a.style.pointerEvents="none",o.appendChild(a);const l=new $l(o);return l.position.set(...t),l.userData.logoImage=a,l.userData.logoSize={width:.5,height:s},l.userData.labelNormal=new A(0,0,1),e.add(l),l}if(!this.logoTexture){const o=new Lp().load("./assets/hematrix-logo.png",a=>{this.disposed&&a.dispose()});o.colorSpace=Dt,o.repeat.set(665/2048,788/1535),o.offset.set(154/2048,658/1535),this.logoTexture=o}const r=new gt(new Qn(.5,s),new xn({map:this.logoTexture,transparent:!0,alphaTest:.005,depthWrite:!1,toneMapped:!1}));return r.position.set(...t),this.tag(r,"enclosure"),e.add(r),r}tube(e,t,i,s,r="channels",o=1){const a=new Lr(t.map(c=>new A(...c)),!1,"catmullrom",.12),l=new gt(new ji(a,this.software?12:64,i,this.software?4:8,!1),this.mat(s,{roughness:.25,transparent:o<1,opacity:o,depthWrite:o>=1}));return r&&this.tag(l,r),e.add(l),{curve:a,mesh:l}}channel(e,t,i,s=.15,r=.72){const{curve:o}=this.tube(e,t,.059,new We(i).lerp(new We(3159867),.24),"channels",.58),a=this.tube(e,t,.041,i,"channels").mesh;a.geometry.setDrawRange(0,0);const l=[];for(let c=0;c<3;c++){const d=new gt(new Us(.044,8,6),this.mat(i,{roughness:.5}));d.visible=!1,e.add(d),l.push(d)}this.flows.push({curve:o,fluid:a,start:s,end:r,beads:l,bay:this.buildingBay||null,fraction:this.activeFraction||null,segments:this.software?12:64,radial:this.software?4:8,fullIndex:this.software?a.geometry.index.array.slice():null,fillCount:-1})}build(){this.fallback||(this.clearRoot(),this.parts=[],this.flows=[],this.bayLamps=[],this.selectables=[],this.reactionWells=[],this.loadedCartridges=[],this.sampleTubes=[],this.patientInlets=[],this.screens=[],this.loadingTrays=[],this.labelPoints=[],this.wasteRegions=[],this.bayAnchors=[],this.deviceUnits=[],this.corePorts=[],this.bayPorts=new Map,this.connectionEdges=[],this.inspectionCovers=[],this.systemUnits=[],this.systemEdges=[],this.dockInspection=null,this.state.mode==="cartridge"?this.buildCartridge(this.root,this.state.cartridge):this.state.mode==="optics"?this.buildOptics():this.state.mode==="dock"?this.buildDock():this.buildDevice(),this.buildConnectionLayer(),this.buildSystemConnectionLayer(),this.selectComponent(this.state.selectedComponent||null),this.updateMachineDisplays(!0))}clearRoot(){if(this.root){this.root.traverse(e=>{if(e.geometry&&e.geometry.dispose(),e.material)for(const t of Array.isArray(e.material)?e.material:[e.material])t.dispose()}),this.root.clear();for(const e of this.textures)e.dispose();this.textures=[],this.selection&&(this.scene.remove(this.selection),this.selection.geometry.dispose(),this.selection.material.dispose(),this.selection=null)}}buildDevice(){const e=this.state.config===16?2:1,t=this.state.config===16?8:this.state.config;for(let i=0;i<e;i++){this.buildingUnit=i;const s=new St;s.position.z=i===0?0:-4.6,this.root.add(s),this.deviceUnits.push({object:s,index:i}),this.buildCore(s,i*8);const r=(t-2)/2;for(let o=0;o<r;o++)this.buildModule(s,3.06+o*1.64,i*8+2+o*2);this.buildSystemInfrastructure(s,i,t)}this.buildingUnit=0,this.buildPreparedInputs(this.root),this.center=new A(Math.max(t-2,0)/2*.82-.7,1.25,e===2?-2.3:.3),this.span=t===2?7:t===4?7.8:10.7}buildCore(e,t){const i=this.part(e,"structure",[0,-.03,0]);this.box(i,[4.5,.23,3.4],[0,.23,0],ze.dark,"structure",.07),this.box(i,[4.35,.2,3.25],[0,.4,0],ze.metal,"structure");for(const v of[-1.8,1.8])for(const g of[-1.25,1.25])this.cylinder(i,.19,.18,[v,.07,g],ze.dark,"structure");const s=this.part(e,"enclosure",[0,1.45,-.35]);s.userData.shell=!0,this.box(s,[.16,2.55,3.4],[-2.17,1.7,0],ze.shell,"enclosure",.05),this.box(s,[.16,2.55,3.4],[2.17,1.7,0],ze.shell,"enclosure",.05),this.box(s,[4.5,.18,3.4],[0,3,0],ze.light,"enclosure",.07),this.box(s,[4.2,2.4,.16],[0,1.75,-1.62],ze.shell,"enclosure"),this.box(s,[4.25,1.35,.16],[0,2.3,1.63],ze.light,"enclosure",.05),this.box(s,[4.26,.16,.16],[0,.52,1.65],ze.burgundy,"enclosure",.02),this.box(s,[2.7,1.6,.06],[-.2,1.7,-1.73],13817299,"enclosure",.025);for(let v=0;v<10;v++)this.box(s,[.045,.75,.02],[-1.15+v*.16,1.85,-1.77],8094339,"thermal",.007);this.box(s,[.3,.23,.05],[1.35,.9,-1.76],ze.dark,"power",.015);for(const v of[-1.86,1.86])for(const g of[.8,2.7]){const f=this.cylinder(s,.045,.025,[v,g,1.73],8949649,"enclosure");f.rotation.x=Math.PI/2}const r=this.part(e,"screen",[0,.4,1.1]);r.userData.shell=!0,r.userData.connectionVisible=!0,r.userData.connectionUnit=this.buildingUnit,this.box(r,[3.15,1.19,.13],[-.45,2.2,1.77],2107952,"screen",.06);const o=new xt;o.position.set(-.45,2.2,1.845),r.add(o);const a={anchor:o,width:2.99,height:1.055,bayStart:t};if(this.software){this.box(r,[2.99,1.055,.012],[-.45,2.2,1.843],1057578,"screen",0);const v=(g,f,u,E)=>this.text(r,g,[-.45,f,1.857],{width:2.78,height:u,size:50,color:E});a.labels={header:v("HEMATRIX",2.65,.12,"#b5c9cf"),title:v("Load patient sample",2.43,.23,"#f4f8f7"),status:v("IDLE",2.23,.13,"#b5c9cf"),lines:[v("",2.06,.13,"#e9f2ef"),v("",1.9,.13,"#e9f2ef"),v("",1.74,.13,"#e9f2ef")]}}else{const v=document.createElement("canvas");v.width=1200,v.height=480;const g=new ol(v);g.colorSpace=Dt,this.textures.push(g);const f=new gt(new Qn(2.99,1.055),new xn({map:g,toneMapped:!1}));f.position.set(-.45,2.2,1.845),r.add(f),this.tag(f,"screen"),a.texture=g,a.canvas=v}this.screens.push(a),this.frontLogo(r,[1.58,2.5,1.746]),this.text(r,"HemaTrix",[1.58,2.04,1.746],{width:.76,height:.15,size:61,color:"#642033"}),this.text(r,"CORE",[1.58,1.84,1.746],{width:.61,height:.1,size:38,color:"#394548"}),this.box(r,[.18,.04,.02],[1.58,1.68,1.74],ze.green,"screen",.012),this.addLabel(s,"enclosure","Core enclosure",[2.2,2.6,.2]),this.addLabel(r,"screen","Live instrument display",[-.45,2.2,1.85]);const l=this.part(e,"bays",[0,0,1.05]);for(let v=0;v<2;v++){const g=v===0?-1.03:1.03,f=t+v+1,u=new St;u.userData.bay=f,l.add(u),this.addLabel(u,`bay-${f}`,`Bay ${String(f).padStart(2,"0")}`,[g,1.08,1.5],{bay:f}),this.bayAnchors.push({object:u,bay:f}),this.bayPorts.set(f,{unit:this.buildingUnit,pressure:this.port(u,[g,.97,-1.02]),dockingWindow:this.port(u,[g,.87,.29])}),this.box(u,[1.85,.13,2.86],[g,.58,-.04],ze.dark,"bays",.025);for(const P of[-1,1])this.box(u,[.09,.8,2.86],[g+P*.88,.98,-.04],ze.dark,"bays",.018);this.box(u,[1.85,.8,.08],[g,.98,-1.44],ze.dark,"bays",.018),this.box(u,[1.67,.22,.055],[g,1.23,1.43],3423038,"bays",.018),this.box(u,[1.67,.11,.055],[g,.7,1.43],3423038,"bays",.018);const E=this.box(u,[1.52,.065,2.55],[g,.68,.02],9212821,"bays",.015),w=this.box(u,[1.5,.075,.06],[g,.71,1.36],8030093,"bays",.012);this.loadingTrays.push({object:E,origin:E.position.clone(),bay:t+v+1},{object:w,origin:w.position.clone(),bay:t+v+1}),this.box(u,[.31,.13,.075],[g+.63,1.05,1.49],9936288,"bays",.018),this.text(u,`BAY ${t+v+1}`,[g,1.25,1.47],{width:.8,height:.13,size:42,color:"#e4e7e4"});const x=this.box(u,[.35,.045,.027],[g,.78,1.48],ze.green,"bays",.012);this.bayLamps.push({mesh:x,index:t+v});const C=new St;C.position.set(g,.73,.29),C.scale.setScalar(.31),C.rotation.y=Math.PI/2,u.add(C);const R=this.scopeForBay(f);this.loadedCartridges.push({object:C,origin:C.position.clone(),bay:f,scope:R}),this.buildingBay=f,this.buildCartridge(C,R,!0),this.buildingBay=null}const c=this.part(e,"optics",[0,.95,.1]);for(const[v,g]of[-1.03,1.03].entries()){const f=this.bayPorts.get(t+v+1);f.optical=this.port(c,[g,1.445,.04]),f.cameraData=this.port(c,[g+.34,1.86,-.13]),f.cameraPower=this.port(c,[g-.33,1.82,-.13]);for(const u of[-1,1])this.box(c,[.12,.12,1.7],[g+u*.66,1.5,-.04],8556952,"optics",.02);this.box(c,[1.45,.12,.12],[g,1.5,-.83],8556952,"optics",.02),this.box(c,[.7,.38,.68],[g,1.83,.04],4081741,"optics",.035),this.cylinder(c,.2,.18,[g,1.56,.04],2041129,"optics"),this.cylinder(c,.13,.035,[g,1.45,.04],9353157,"optics",{metalness:.6,roughness:.1})}const d=this.part(e,"processor",[1.15,.4,-.55]);this.box(d,[.11,1.45,1.65],[1.86,1.54,-.44],3235664,"processor",.02),this.box(d,[.09,.4,.4],[1.77,1.7,-.4],2435886,"processor",.008);for(let v=0;v<4;v++)this.box(d,[.11,.1,.22],[1.76,1.2+v*.2,-.88],13810814,"processor",.005);const h=this.part(e,"power",[-1,.25,-.3]);this.box(h,[.58,1.35,1.5],[-1.67,1.35,-.45],11449782,"power",.03);for(let v=0;v<7;v++)this.box(h,[.025,.45,.045],[-1.985,1.65,-.95+v*.16],6318961,"power",.003);const m=this.part(e,"thermal",[0,.35,-.35]);this.box(m,[.84,.84,.12],[0,2.18,-1.47],5464939,"thermal",.035);const p=this.cylinder(m,.32,.04,[0,2.18,-1.395],2701632,"thermal");p.rotation.x=Math.PI/2;for(let v=0;v<4;v++){const g=this.box(m,[.11,.36,.025],[Math.sin(v*Math.PI/2)*.14,2.18+Math.cos(v*Math.PI/2)*.14,-1.365],10136497,"thermal",.01);g.rotation.z=-v*Math.PI/2+.35}this.corePorts[this.buildingUnit]={frameParts:[i,r,c,d,h,m],displayAssembly:r,processorData:this.port(d,[1.78,1.85,-.38]),processorPower:this.port(d,[1.78,1.14,-.68]),screen:this.port(r,[-.45,2.2,1.69]),power:this.port(h,[-1.36,1.25,-.45])};for(const[v,g,f,u]of[[i,"structure","Internal support frame",[0,.42,0]],[c,"optics","Camera and ring illumination",[0,1.9,.05]],[d,"processor","Processing board",[1.85,1.6,-.4]],[h,"power","Power supply",[-1.65,1.4,-.4]],[m,"thermal","Core cooling fan",[0,2.4,-1.4]]])this.addLabel(v,g,f,u,{internal:!0})}buildModule(e,t,i){const s=this.part(e,"bays",[.35,0,.2]),r=this.box(s,[1.55,2.73,3.35],[t,1.61,0],ze.shell,"bays",.07);this.inspectionCovers.push(r),this.box(s,[1.57,.18,3.4],[t,.25,0],ze.dark,"structure",.04);for(let o=0;o<2;o++){const a=.9+o*.97,l=i+o+1,c=new St;c.userData.bay=l,s.add(c),this.addLabel(c,`bay-${l}`,`Bay ${String(l).padStart(2,"0")}`,[t,a,1.77],{bay:l}),this.bayAnchors.push({object:c,bay:l}),this.bayPorts.set(l,{unit:this.buildingUnit,pressure:this.port(c,[t,a-.04,.24]),dockingWindow:this.port(c,[t,a-.1,.94])});const d=this.box(c,[1.29,.73,.075],[t,a,1.71],ze.dark,"bays",.025);this.inspectionCovers.push(d),this.box(c,[1.13,.065,1.95],[t,a-.23,.69],7305597,"bays",.012);const h=new St;h.position.set(t,a-.2,.94),h.scale.setScalar(.245),h.rotation.y=Math.PI/2,c.add(h);const m=this.scopeForBay(l);this.loadedCartridges.push({object:h,origin:h.position.clone(),bay:l,scope:m}),this.buildingBay=l,this.buildCartridge(h,m,!0),this.buildingBay=null;const p=this.part(c,"optics",[0,.36,-.08]);this.box(p,[.38,.27,.42],[t,a+.29,.94],3885392,"optics",.025),this.cylinder(p,.1,.13,[t,a+.09,.94],2700604,"optics"),this.cylinder(p,.074,.025,[t,a+.015,.94],7905714,"optics",{roughness:.1});const v=this.bayPorts.get(l);v.optical=this.port(p,[t,a,.94]),v.cameraData=this.port(p,[t+.19,a+.29,.85]),v.cameraPower=this.port(p,[t-.19,a+.29,.85]),this.text(c,`BAY ${i+o+1}`,[t,a+.14,1.76],{width:.83,height:.15,size:42,color:"#e4e7e4"});const g=this.box(c,[.26,.04,.025],[t,a-.19,1.77],ze.green,"bays",.008);this.bayLamps.push({mesh:g,index:i+o})}this.text(s,"EXPANSION",[t,2.55,1.72],{width:1.13,height:.15,size:40,color:"#6e7372"}),this.box(s,[1.53,.13,.05],[t,.48,1.71],ze.burgundy,"enclosure",.005)}port(e,t){const i=new xt;return i.position.set(...t),e.add(i),i}inspectionDestination(e){const t=e.userData.origin||new A,i=this.bayPorts.get(Number(this.state.selectedBay||1))?.unit||0;return this.state.showConnections&&this.state.cutaway&&e.userData.connectionVisible&&e.userData.connectionUnit===i?t.clone().add(new A(0,1.45,-1.4)):t.clone().addScaledVector(e.userData.explode||new A,this.state.exploded?1:0)}connectionFrameBounds(){const e=Number(this.state.selectedBay||1),t=this.bayPorts.get(e),i=this.corePorts[t?.unit||0];if(!i)return null;this.root.updateMatrixWorld(!0);const s=Object.values(this.connectionEndpoints()).flat().filter(Boolean),r=new fn().setFromPoints(s),o=c=>{const d=new fn().setFromObject(c);let h=c;for(;h&&h!==this.root;){if(h.userData.origin&&h.parent){const m=this.inspectionDestination(h),p=h.position,v=h.parent.localToWorld(m.clone()).sub(h.parent.localToWorld(p.clone()));d.translate(v)}h=h.parent}return d};for(const c of i.frameParts||[])r.union(o(c));const a=this.loadedCartridges.find(c=>c.bay===e),l=this.bayState(e);if(a&&l?.kitPresent!==!1){const c=o(a.object),d=l?.inserted??this.state.inserted,h=d?1:en.clamp(Number(l?.insertionProgress??this.state.insertionProgress)||0,0,1),m=a.origin.clone().add(new A(0,0,1.6*(1-h))),p=a.object.parent.localToWorld(m).sub(a.object.parent.localToWorld(a.object.position.clone()));c.translate(p),r.union(c)}return r.expandByScalar(.3)}connectionEndpoints(){const e=Number(this.state.selectedBay||1),t=this.bayPorts.get(e),i=this.corePorts[t?.unit||0];if(!t||!i)return{};this.root.updateMatrixWorld(!0);const s=this.bayState(e),o=(s?.inserted??this.state.inserted)&&s?.kitPresent!==!1&&t.reaction?t.reaction:t.dockingWindow,a=l=>l?.getWorldPosition(new A);return{"pressure-dock":[a(t.actuatorFaces?.[0]),a(t.padPorts?.[0])],"optical-capture":[a(o),a(t.optical)],"camera-data":[a(t.cameraData),a(i.processorData)],"display-data":[a(i.processorData),a(i.screen)],"power-processor":[a(i.power),a(i.processorPower)],"power-optics":[a(i.power),a(t.cameraPower)],"power-control":[a(i.power),a(t.driverPower)]}}buildConnectionLayer(){this.connectionLayer=new St,this.connectionLayer.visible=!1,this.root.add(this.connectionLayer);for(const e of $s.filter(t=>["pressure-dock","optical-capture","camera-data","display-data","power-processor","power-optics","power-control"].includes(t.id))){const t=new St;this.connectionLayer.add(t);const i=e.kind==="optical",s=i?new dl({color:e.color,dashSize:.07,gapSize:.045,transparent:!0,opacity:.95,depthTest:!1}):new xn({color:e.color,transparent:!0,opacity:.95,depthTest:!1,toneMapped:!1}),r=i?new It().setFromPoints([new A,new A(0,.01,0)]):new ji(new Es(new A,new A(0,.01,0)),8,.027,4,!1),o=i?new Wo(r,s):new gt(r,s);t.add(o),o.renderOrder=5;const a=[];for(let c=0;c<2;c++){const d=new gt(new Us(.052,this.software?6:10,6),new xn({color:e.color,toneMapped:!1,depthTest:!1}));d.renderOrder=6,t.add(d),a.push(d)}const l=new gt(new hc(.06,.15,6),new xn({color:e.color,toneMapped:!1,depthTest:!1}));l.renderOrder=6,t.add(l),this.connectionEdges.push({metadata:e,group:t,path:o,ends:a,arrow:l,curve:null,last:null})}}connectionCurve(e,t,i){if(e.kind==="optical"||e.kind==="pressure")return new Es(t.clone(),i.clone());const s=t.clone(),r=i.clone();let o;if(e.kind==="pressure"){const a=Math.min(s.z,r.z)-.35;o=[s,new A(s.x,s.y+.12,a),new A(r.x,r.y+.12,a),r]}else if(e.kind==="power"){const a=Math.min(s.y,r.y)-.34;o=[s,new A(s.x,a,s.z-.14),new A(r.x,a,r.z-.14),r]}else{const a=Math.max(s.y,r.y)+.23;o=[s,new A(s.x,a,s.z-.25),new A(r.x,a,r.z-.25),r]}return new Lr(o,!1,"catmullrom",.1)}updateConnections(){if(!this.connectionLayer)return;const e=!!this.state.showConnections&&this.state.mode==="device"&&!!this.state.cutaway;this.connectionLayer.visible=!1,this.updateSystemConnections(e)}connectionAnchors(){return this.systemLayer?.visible?this.systemEdges.filter(e=>e.curve).map(e=>{const t=this.projectPoint(e.curve.getPoint(.5));return{...e.metadata,label:this.state.explanationMode&&e.metadata.technicalLabel||e.metadata.label,id:e.id,x:t.x,y:t.y,visible:e.group.visible&&t.visible,bay:e.bay}}):this.connectionLayer?.visible?(this.camera.updateMatrixWorld(!0),this.connectionEdges.filter(e=>e.curve).map(e=>{const t=this.projectPoint(e.curve.getPoint(.52));return{...e.metadata,label:this.state.explanationMode&&e.metadata.technicalLabel||e.metadata.label,x:t.x,y:t.y,visible:e.group.visible&&t.visible}})):[]}buildLocalBayHardware(e){const t=this.bayPorts.get(e),i=this.loadedCartridges.find(R=>R.bay===e);if(!t||!i)return;const s=t.pressure.parent,r=i.object.scale.x,o=i.origin.x,a=i.origin.y+.24*r,l=i.origin.z-2.55*r,c=this.part(s,"air-manifold",[0,.03,-.03]),d=this.part(s,"pumps",[0,.06,-.04]),h=this.part(s,"bay-valve",[0,.08,-.06]),m=this.part(s,"dock-seal");this.box(c,[.48,.065,.46],[o,a-.12,l-.28],9149602,"air-manifold",.018),this.box(h,[.27,.045,.28],[o-.34,a+.1,l-.33],3235410,"bay-valve",.012);for(const R of[-1,1])this.box(h,[.075,.05,.13],[o-.34+R*.075,a+.145,l-.33],2636354,"bay-valve",.006);t.driverData=this.port(h,[o-.45,a+.13,l-.43]),t.driverPower=this.port(h,[o-.45,a+.13,l-.25]),t.driverOutputs=[],t.actuatorInputs=[],t.actuatorFaces=[],t.padPorts=[];for(const[R,P]of[-1,1].entries()){const D=o+P*.115,y=R?10794436:9611945;this.box(d,[.15,.14,.24],[D,a,l-.38],4347230,"pumps",.012);const b=this.cylinder(d,.052,.18,[D,a,l-.19],11188928,"pumps",{metalness:.35});b.rotation.x=Math.PI/2;const L=this.cylinder(d,.02,.12,[D,a,l-.09],14279651,"pumps",{metalness:.65,roughness:.24});L.rotation.x=Math.PI/2,this.box(d,[.105,.1,.025],[D,a,l-.0405],8689823,"pumps",.008),this.box(m,[.11,.11,.028],[D,a,l-.014],y,"dock-seal",.008,{roughness:.9,metalness:0}),this.box(i.object,[.024/r,.12/r,.11/r],[2.55-.012/r,.24,P*.115/r],y,"cartridge-membrane",.016),t.driverOutputs.push(this.port(h,[o-.34+P*.07,a+.13,l-.2])),t.actuatorInputs.push(this.port(d,[D,a+.06,l-.48])),t.actuatorFaces.push(this.port(d,[D,a,l-.028])),t.padPorts.push(this.port(m,[D,a,l]))}const p=this.part(s,"heater"),v=this.part(s,"temperature-probe"),g=this.part(s,"limit-switch"),f=i.origin.y-.037;this.box(p,[.77,.035,1.07],[o,f,i.origin.z],11904140,"heater",.014,{metalness:.22}),this.box(p,[.15,.035,.18],[o+.48,f-.035,l+.12],3235410,"heater",.006),this.box(p,[.075,.075,.08],[o+.48,f+.015,l+.12],2832705,"heater",.004);const u=this.cylinder(v,.015,.16,[o+.39,f+.018,i.origin.z+.2],13950429,"temperature-probe",{metalness:.65});u.rotation.z=Math.PI/2,this.box(v,[.065,.045,.07],[o+.48,f+.018,i.origin.z+.2],3426642,"temperature-probe",.006),t.heaterPower=this.port(p,[o+.48,f+.015,l+.12]),t.probeData=this.port(v,[o+.5,f+.018,i.origin.z+.2]);const E=1.625*r;for(const R of[-1,1])this.box(g,[.075,.08,.11],[o+R*(E+.065),i.origin.y+.035,l+.11],2899783,"limit-switch",.008),this.box(g,[.025,.025,.1],[o+R*(E-.005),i.origin.y+.08,l+.11],12767701,"limit-switch",.004);t.switchData=this.port(g,[o+E+.065,i.origin.y+.08,l+.11]);const w=t.optical.parent,x=t.optical.position,C=new gt(new Is(.13,.235,this.software?12:24),this.mat(4285522,{side:qt,roughness:.6}));C.rotation.x=-Math.PI/2,C.position.set(x.x,x.y-.01,x.z),this.tag(C,"optics"),w.add(C);for(let R=0;R<8;R++){const P=R*Math.PI/4;this.box(w,[.032,.018,.032],[x.x+Math.cos(P)*.18,x.y-.021,x.z+Math.sin(P)*.18],16776944,"optics",.004,{emissive:12037254,emissiveIntensity:.2})}for(const[R,P,D,y]of[[d,"pumps","Dry linear actuators",[o,a+.13,l-.28]],[h,"bay-valve","Dual motor driver",[o-.34,a+.18,l-.33]],[m,"dock-seal","Silicone dry interface pad",[o,a,l]],[p,"heater","Bay heater",[o+.25,f,i.origin.z]],[v,"temperature-probe","Temperature probe",[o+.48,f+.05,i.origin.z+.2]],[g,"limit-switch","Insertion limit switches",[o+.43,i.origin.y+.12,l+.11]],[c,"air-manifold","Local actuator support",[o,a-.1,l-.28]]])this.addLabel(R,P,D,y,{internal:!0,bay:e})}buildSystemInfrastructure(e,t,i){const s=this.part(e,"backplane",[0,0,-.12]),r=[[-1.7,i>2?2.15:1.7]];for(let l=0;l<(i-2)/2;l++){const c=3.06+l*1.64;r.push([c-.68,c+.68])}const o=r.at(-1)[1];for(const[l,c]of r){const d=c-l,h=(l+c)/2;this.box(s,[d,.38,.085],[h,.8,-1.48],3233869,"backplane",.012),this.box(s,[d,.025,.025],[h,.9,-1.42],3964836,"backplane",.003),this.box(s,[d,.025,.025],[h,.68,-1.42],9082523,"backplane",.003)}for(let l=0;l<r.length-1;l++){const c=r[l][1],d=r[l+1][0],h=(c+d)/2,m=d-c,p=this.part(e,"module-coupler");this.box(p,[m,.15,.14],[h,.91,-1.48],3964836,"module-coupler",.012),this.box(p,[m,.14,.14],[h,.69,-1.48],6713464,"module-coupler",.012),this.box(p,[.07,.55,.12],[h,.8,-1.56],7569285,"module-coupler",.008),this.addLabel(p,"module-coupler","Power and data coupler",[h,.94,-1.45],{internal:!0})}const a={index:t,parent:e,backplane:s,dataStart:this.port(s,[-1.7,.9,-1.42]),powerStart:this.port(s,[-1.7,.68,-1.42]),dataEnd:this.port(s,[o,.9,-1.42]),powerEnd:this.port(s,[o,.68,-1.42]),branches:[]};for(let l=0;l<i;l++){const c=t*8+l+1,d=this.bayPorts.get(c);if(!d)continue;this.buildLocalBayHardware(c);const h=d.pressure.position.x+(l>=2?l%2===0?-.12:.12:0);a.branches.push({id:c,bay:d,dataTap:this.port(s,[h,.9,-1.42]),powerTap:this.port(s,[h,.68,-1.42])})}this.addLabel(s,"backplane","Power and data backplane",[(o-1.7)/2,.81,-1.4],{internal:!0}),this.systemUnits.push(a)}buildSystemConnectionLayer(){this.systemLayer=new St,this.root.add(this.systemLayer),this.systemLayer.visible=!1;const e=(t,i,s,{unit:r=0,bay:o=null,straight:a=!1,route:l=null}={})=>{const c=$s.find(g=>g.id===t);if(!c||!i||!s)return;const d=new St;this.systemLayer.add(d);const h=c.kind==="pressure",m=h?new xn({color:c.color,transparent:!0,opacity:.7,depthTest:!1,toneMapped:!1}):new Vr({color:c.color,transparent:!0,opacity:.7,depthTest:!1,linewidth:1.7}),p=h?new gt(new ji(new Es(new A,new A(0,.01,0)),4,.025,4,!1),m):new Wo(new It,m);p.renderOrder=5,d.add(p);const v=[];for(let g=0;g<2;g++){const f=new gt(new Us(.035,6,4),new xn({color:c.color,toneMapped:!1,depthTest:!1,transparent:!0}));f.renderOrder=6,d.add(f),v.push(f)}this.systemEdges.push({id:`${t}-u${r}-b${o??"bus"}-${this.systemEdges.length}`,metadata:c,from:i,to:s,unit:r,bay:o,straight:a,route:l,group:d,path:p,dots:v,physical:h,curve:null,last:null})};for(const t of this.systemUnits){const i=t.index,s=this.corePorts[i];e("system-data-trunk",s.processorData,t.dataStart,{unit:i}),e("system-data-trunk",t.dataStart,t.dataEnd,{unit:i,straight:!0}),e("system-power-trunk",s.power,t.powerStart,{unit:i}),e("system-power-trunk",t.powerStart,t.powerEnd,{unit:i,straight:!0}),e("display-data",s.processorData,s.screen,{unit:i});for(const r of t.branches){const o={unit:i,bay:r.id};e("local-driver-data",r.dataTap,r.bay.driverData,o),e("local-driver-power",r.powerTap,r.bay.driverPower,o),e("system-air-supply",r.bay.driverOutputs[0],r.bay.actuatorInputs[0],{...o,straight:!0}),e("system-air-branch",r.bay.driverOutputs[1],r.bay.actuatorInputs[1],{...o,straight:!0});for(let a=0;a<2;a++)e("system-dock-actuation",r.bay.actuatorFaces[a],r.bay.padPorts[a],{...o,straight:!0});e("system-data-branch",r.dataTap,r.bay.cameraData,o),e("system-power-branch",r.powerTap,r.bay.cameraPower,o),e("heater-power",r.powerTap,r.bay.heaterPower,o),e("temperature-data",r.bay.probeData,r.dataTap,o),e("optical-capture",r.bay.dockingWindow,r.bay.optical,{...o,straight:!0})}}if(this.systemUnits.length===2){const t=this.systemUnits[0],i=this.systemUnits[1];e("cluster-data-link",t.dataStart,i.dataStart,{unit:-1,route:(s,r)=>new Lr([s,new A(-2.7,s.y,s.z),new A(-2.7,r.y,r.z),r],!1,"catmullrom",.06)})}}updateSystemConnections(e){if(!this.systemLayer||(this.systemLayer.visible=e,!e))return;this.root.updateMatrixWorld(!0);const t=Number(this.state.selectedBay||1),i=this.bayPorts.get(t)?.unit||0,s=this.state.connectionKind;for(const r of this.systemEdges){const o=r.from.getWorldPosition(new A),a=r.to.getWorldPosition(new A),l=[...o.toArray(),...a.toArray()].map(p=>p.toFixed(3)).join(",");l!==r.last&&(r.last=l,r.curve=r.route?r.route(o,a):r.straight?new Es(o,a):this.connectionCurve(r.metadata,o,a),r.path.geometry.dispose(),r.path.geometry=r.physical?new ji(r.curve,r.straight?4:10,.025,4,!1):new It().setFromPoints(r.curve.getPoints(r.straight?1:12)),r.dots[0].position.copy(o),r.dots[1].position.copy(a));const c=r.bay===t,d=r.unit===i||r.unit===-1,h=!s||s==="all"||s===r.metadata.kind,m=h?c?1:d?.62:.24:.13;r.path.material.opacity=m,r.path.material.linewidth=c&&h?3:1.6,r.dots.forEach(p=>{p.material.opacity=m,p.scale.setScalar(c?1.65:1)}),r.group.visible=this.state.connectionScope!=="selected"||r.unit===i&&(r.bay===null||r.bay===t)}}systemFrameBounds(){this.root.updateMatrixWorld(!0);const e=this.connectionFrameBounds()||new fn;for(const t of this.deviceUnits)e.union(new fn().setFromObject(t.object));for(const t of this.systemEdges){const i=t.from.getWorldPosition(new A),s=t.to.getWorldPosition(new A);if(e.expandByPoint(i),e.expandByPoint(s),t.route)for(const r of t.route(i,s).getPoints(12))e.expandByPoint(r)}return e.expandByScalar(.25)}buildDock(){const e=new St;this.root.add(e);const t=this.part(e,"bay-dock");this.box(t,[2.8,.18,2.3],[0,.16,.62],4608858,"bay-dock",.055),this.box(t,[2.42,.12,2.14],[0,.3,.63],11451328,"bay-dock",.025),this.box(t,[2.35,.18,.2],[0,.4,-.11],7110279,"bay-dock",.025);for(const y of[-1,1])this.box(t,[.17,.13,1.95],[y*.76,.42,.8],6650245,"bay-dock",.018),this.box(t,[.09,.023,1.87],[y*.76,.4735,.8],14016481,"bay-dock",.007),this.box(t,[.13,.34,.1],[y*.85,.64,.098],12569293,"bay-dock",.016);const i=this.part(e,"pumps"),s=this.part(e,"dock-seal"),r=[9611945,10794436];for(const[y,b]of[-.3,.3].entries()){this.box(i,[.27,.27,.42],[b,.6,-.75],4609889,"pumps",.025);const L=this.cylinder(i,.108,.48,[b,.6,-.42],11057341,"pumps",{metalness:.35,roughness:.4});L.rotation.x=Math.PI/2;const k=this.cylinder(i,.039,.4,[b,.6,-.1],14016736,"pumps",{metalness:.7,roughness:.22});k.rotation.x=Math.PI/2;const H=this.cylinder(i,.105,.04,[b,.6,.1],8624029,"pumps",{metalness:.18,roughness:.5});H.rotation.x=Math.PI/2;const X=this.cylinder(s,.109,.028,[b,.6,.134],r[y],"dock-seal",{roughness:.93,metalness:0});X.rotation.x=Math.PI/2}const o=this.part(e,"bay-valve");this.box(o,[.59,.055,.47],[-.86,.91,-.54],3235667,"bay-valve",.015);for(const y of[-1.01,-.71])this.box(o,[.17,.075,.2],[y,.971,-.54],2701890,"bay-valve",.012),this.box(o,[.16,.105,.09],[y,.973,-.76],9280674,"bay-valve",.009);for(const[y,b]of[-.3,.3].entries())this.tube(o,[[-.86+y*.19,.94,-.34],[-.59+y*.15,.82,-.24],[b,.73,-.57],[b,.7,-.77]],.023,y?7964842:5662584,"bay-valve");const a=this.part(e,"backplane");this.box(a,[.58,.39,.25],[.76,.65,-.77],3491405,"backplane",.035),this.box(a,[.48,.27,.035],[.76,.65,-.912],12832976,"backplane",.012);for(const[y,b]of[[.63,6713464],[.88,3964836]]){const L=this.cylinder(a,.052,.075,[y,.65,-.948],b,"backplane",{metalness:.3,roughness:.35});L.rotation.x=Math.PI/2}this.tube(a,[[.63,.55,-.8],[.46,.38,-.78],[-.87,.38,-.78],[-.87,.88,-.73]],.024,6713464,"backplane");const l=this.part(e,"heater");this.box(l,[1.24,.06,1.28],[0,.445,.92],11641224,"heater",.018,{metalness:.25,roughness:.6}),this.box(l,[1.2,.01,1.23],[0,.48,.92],8947581,"heater",.008,{roughness:.9}),this.box(l,[.35,.045,.32],[.88,.37,-.37],3235409,"heater",.012),this.box(l,[.16,.16,.17],[.88,.465,-.37],2898240,"heater",.014),this.tube(l,[[.63,.55,-.8],[.9,.38,-.65],[.9,.4,-.37],[.59,.43,.45]],.023,6713464,"heater");const c=this.part(e,"temperature-probe"),d=this.cylinder(c,.028,.25,[.69,.455,.91],14015965,"temperature-probe",{metalness:.7,roughness:.25});d.rotation.z=Math.PI/2,this.box(c,[.12,.075,.1],[.84,.455,.91],3426642,"temperature-probe",.015),this.tube(c,[[.89,.455,.91],[1.04,.35,.91],[1.04,.35,-.6],[.88,.64,-.8]],.017,3964836,"temperature-probe");const h=this.part(e,"limit-switch"),m=[];for(const y of[-1,1]){this.box(h,[.17,.13,.22],[y*1.01,.565,.27],3161927,"limit-switch",.018),this.box(h,[.045,.055,.17],[y*.917,.608,.27],13227738,"limit-switch",.006);const b=this.box(h,[.055,.055,.075],[y*.88,.607,.24],10400953,"limit-switch",.01);m.push({object:b,side:y})}const p=new St;e.add(p),p.userData.component="cartridge";for(const y of[-1,1])this.box(p,[.1,.055,1.7],[y*.76,.454,.88],13030102,"bay-dock",.01);this.box(p,[1.78,.25,1.6],[0,.61,1],14543076,"cartridge",.045,{transparent:!0,opacity:.22,depthWrite:!1,roughness:.18}),this.box(p,[1.78,.035,1.6],[0,.7525,1],14083553,"cartridge",.035,{transparent:!0,opacity:.16,depthWrite:!1,roughness:.15}),this.box(p,[1.8,.36,.06],[0,.6,.178],14739430,"cartridge",.025,{transparent:!0,opacity:.34,depthWrite:!1,roughness:.25});const v=new St;p.add(v),v.userData.component="cartridge-membrane";for(const[y,b]of[-.3,.3].entries())this.box(v,[.235,.215,.026],[b,.6,.161],r[y],"cartridge-membrane",.025,{roughness:.83,metalness:0});this.tube(p,[[-.3,.68,.29],[-.48,.68,.44],[-.48,.68,1.34],[-.18,.68,1.5]],.026,10102075,"cartridge"),this.tube(p,[[.3,.68,.29],[.48,.68,.44],[.48,.68,1.34],[.18,.68,1.5]],.026,12159524,"cartridge");for(const y of[-.34,.34])this.cylinder(p,.17,.035,[y,.721,.87],6848907,"cartridge",{roughness:.35}),this.cylinder(p,.135,.013,[y,.747,.87],y<0?11826555:13808746,"cartridge",{roughness:.3});this.box(p,[.24,.12,.31],[.58,.63,1.53],5799281,"cartridge",.025);const g=new St;g.position.set(1.06,.69,.78),t.add(g),g.userData.component="bay-dock";const f=this.cylinder(g,.085,.17,[0,0,0],8887205,"bay-dock");f.rotation.z=Math.PI/2,this.box(g,[.13,.1,.48],[0,.05,.19],5003877,"bay-dock",.025),this.box(g,[.19,.13,.15],[0,.05,.43],8295836,"bay-dock",.025);const u=this.part(e,"optics");for(const y of[-1,1])this.box(u,[.13,1.58,.18],[y*1.12,1.09,.6],9413034,"optics",.02);this.box(u,[2.37,.13,.24],[0,1.9,.6],9413034,"optics",.025),this.box(u,[.62,.35,.55],[0,1.71,.83],3161928,"optics",.04),this.cylinder(u,.17,.2,[0,1.45,.83],2437690,"optics",{roughness:.3}),this.cylinder(u,.115,.035,[0,1.335,.83],7774645,"optics",{metalness:.45,roughness:.12});const E=new gt(new Is(.185,.355,this.software?16:32),this.mat(3891796,{side:qt,roughness:.65}));E.rotation.x=-Math.PI/2,E.position.set(0,1.304,.83),this.tag(E,"optics"),u.add(E);for(let y=0;y<10;y++){const b=y*Math.PI/5;this.box(u,[.046,.025,.046],[Math.cos(b)*.267,1.292,.83+Math.sin(b)*.267],16776688,"optics",.006,{emissive:15064511,emissiveIntensity:.25,roughness:.4})}this.tube(a,[[.88,.75,-.8],[1.01,1.03,-.63],[1.01,1.84,.43],[.3,1.84,.61]],.023,3964836,"backplane"),this.tube(a,[[.63,.75,-.8],[.83,1.01,-.68],[.83,1.79,.42],[-.3,1.79,.61]],.023,6713464,"backplane");const w=new St;e.add(w);const x=[];for(const y of[-.34,.34])for(const b of[.59,1.1])x.push(new A(0,1.315,.83),new A(y,.76,b));const C=new al(new It().setFromPoints(x),new dl({color:12560749,dashSize:.055,gapSize:.035,transparent:!0,opacity:.55}));C.computeLineDistances(),w.add(C),this.addLabel(t,"bay-dock","Guide rails and lock",[-.85,.51,1.23]),this.addLabel(i,"pumps","Actuators",[0,.76,-.62]),this.addLabel(s,"dock-seal","Silicone pads",[-.3,.6,.148]),this.addLabel(v,"cartridge-membrane","Sealed kit surface",[.3,.6,.148]),this.addLabel(o,"bay-valve","Motor driver",[-.86,1.02,-.54]),this.addLabel(l,"heater","Heater",[.48,.49,.95]),this.addLabel(h,"limit-switch","Insertion switches",[1.01,.66,.27]),this.addLabel(u,"optics","Camera and light",[0,1.86,.91]);const R=new A,P=new A(0,0,1.5),D=this.state.dockSeparated!==!1;p.position.copy(D?P:R),g.rotation.x=D?-.75:0,w.visible=!D,this.dockInspection={cartridge:p,assembled:R,separated:P,lock:g,opticalBeam:w,switchActuators:m},this.center=new A(0,1,1.05),this.span=4.75}updateDockInspection(){if(!this.dockInspection||this.state.mode!=="dock")return;const e=this.dockInspection,t=this.state.dockSeparated!==!1,i=t?e.separated:e.assembled;e.cartridge.position.lerp(i,.18),e.lock.rotation.x=en.lerp(e.lock.rotation.x,t?-.75:0,.18);const s=!t&&e.cartridge.position.distanceTo(e.assembled)<.025;e.opticalBeam.visible=s;for(const r of e.switchActuators||[])r.object.position.x=en.lerp(r.object.position.x,r.side*(s?.93:.88),.18),r.object.material.color.setHex(s?7444618:10400953)}scopeForBay(e){return this.bayState(e)?.cartridge||(e===Number(this.state.selectedBay||1)?this.state.cartridge:"complete")}bayState(e){return(this.state.bayStates||[]).find(t=>Number(t.bay)===Number(e))}fractionState(e){const t=e?this.bayState(e):null;return t?.loadedFractions?t.loadedFractions:!e||e===Number(this.state.selectedBay||1)?this.state.loadedFractions||{}:{}}requiredFractions(e=this.state.cartridge){return e==="type"?["patientCells","patientPlasma"]:e==="match"?["patientPlasma","donorCells"]:["patientCells","patientPlasma","donorCells"]}addLabel(e,t,i,s,r={}){const o=new xt;return o.position.set(...s),e.add(o),this.labelPoints.push({anchor:o,id:t,name:i,unit:this.buildingUnit||0,bay:this.buildingBay||null,...r}),o}buildPreparedInputs(e){const t=this.requiredFractions(),i={patientCells:{id:"patient-cells",label:"PATIENT RED CELLS",color:ze.red,cap:ze.burgundy},patientPlasma:{id:"patient-plasma",label:"PATIENT PLASMA",color:ze.amber,cap:12026651},donorCells:{id:"donor-cells",label:"DONOR RED CELLS",color:ze.red,cap:2837601}};t.forEach((s,r)=>{const o=i[s],a=new St;a.position.set(-4.12+r*.84,0,2.05),a.userData.component=o.id,e.add(a),this.box(a,[.68,.14,.68],[0,.14,0],5662059,o.id,.04),this.cylinder(a,.17,1.05,[0,.75,0],11387850,o.id,{transparent:!0,opacity:.23,roughness:.1,depthWrite:!1});const l=this.cylinder(a,.12,.65,[0,.61,0],o.color,o.id,{roughness:.4});this.cylinder(a,.195,.17,[0,1.36,0],o.cap,o.id),this.box(a,[.25,.34,.024],[0,.85,.166],16052969,o.id,.006),this.box(a,[.64,.3,.038],[0,.27,.365],16777215,o.id,.012,{roughness:.75,metalness:0});const c=s==="patientCells"?["Patient","Red cells"]:s==="patientPlasma"?["Patient","Plasma"]:["Donor","Red cells"];this.text(a,c[0],[0,.335,.388],{width:.58,height:.105,size:48,color:"#17232a"}),this.text(a,c[1],[0,.205,.388],{width:.58,height:.105,size:48,color:"#17232a"}),this.sampleTubes.push({object:l,base:.285,height:.65,key:s}),this.addLabel(a,o.id,o.label.toLowerCase().replace(/^./,d=>d.toUpperCase()),[0,1.3,.18])})}displayData(){return this.state.machineDisplay?{...this.state.machineDisplay,lines:(this.state.machineDisplay.lines||[]).slice(0,3)}:this.state.elapsed>=600?{title:"Analysis complete",status:"QUALIFIED REVIEW REQUIRED",lines:["Inspect reactions and controls","No clinical result released"],progress:1,tone:"warning"}:this.state.running?{title:"Processing specimen",status:"ANALYSIS IN PROGRESS",lines:["Reaction chambers under observation",`Bay ${this.state.selectedBay||1}`],progress:this.state.elapsed/600,tone:"neutral"}:this.state.inserted?{title:"Cartridge inserted",status:"READY TO RUN",lines:["Patient specimen loaded","Select Run test to begin"],progress:0,tone:"neutral"}:this.state.sampleLoaded?{title:"Sample loaded",status:"INSERT CARTRIDGE",lines:["Identified specimen in patient inlet","Cartridge remains outside the bay"],progress:0,tone:"neutral"}:{title:"Load patient sample",status:"IDLE",lines:["Identify the patient specimen","Load sample, then insert cartridge"],progress:0,tone:"neutral"}}updateMachineDisplays(e=!1){const t=this.displayData(),i={neutral:"#9dcbd3",success:"#8ce1b2",warning:"#ffcf79",danger:"#ff9d9b"}[t.tone]||"#9dcbd3",s=en.clamp(Number(t.progress)||0,0,1),r=JSON.stringify([t.title,t.status,t.lines,Math.round(s*100),t.tone,this.state.selectedBay]);for(const o of this.screens)if(!(!e&&o.signature===r))if(o.signature=r,o.labels)o.labels.header.node.textContent=`HEMATRIX  /  BAY ${this.state.selectedBay||1}`,o.labels.title.node.textContent=String(t.title||""),o.labels.status.node.textContent=String(t.status||""),o.labels.status.node.setAttribute("fill",i),o.labels.lines.forEach((a,l)=>{a.node.textContent=String(t.lines?.[l]||"")});else{const a=o.canvas.getContext("2d");a.fillStyle="#10232a",a.fillRect(0,0,1200,480);const l=(c,d,h,m)=>{a.fillStyle=m,a.font=h,a.fillText(String(c||""),42,d,1110)};l(`HEMATRIX   /   BAY ${this.state.selectedBay||1}`,44,"600 27px Arial","#a9c2c9"),l(t.title,118,"600 54px Arial","#f4f8f7"),l(t.status,171,"600 31px Arial",i),(t.lines||[]).slice(0,3).forEach((c,d)=>l(c,239+d*65,"500 36px Arial","#e8f0ed")),a.fillStyle="#29434b",a.fillRect(42,449,1116,8),a.fillStyle=i,a.fillRect(42,449,1116*s,8),o.texture.needsUpdate=!0}}projectPoint(e){const t=e.clone().project(this.camera),i=this.container.clientWidth,s=this.container.clientHeight;return{x:(t.x+1)*i/2,y:(1-t.y)*s/2,visible:t.z>-1&&t.z<1&&Math.abs(t.x)<1.1&&Math.abs(t.y)<1.1}}labelAnchors(){if(!this.root)return[];this.root.updateMatrixWorld(!0),this.camera.updateMatrixWorld(!0);const e=Number(this.state.selectedBay||1),t=e>8?1:0,i=[];for(const s of this.labelPoints){let r=!0,o=s.anchor;for(;o;)o.visible||(r=!1),o=o.parent;const a=this.state.mode==="device"&&!this.state.cutaway&&!this.state.exploded;if(s.internal&&a){const p=s.id==="cartridge"&&s.bay===e&&!this.state.inserted;r=r&&p}s.id==="wells"&&this.state.mode==="cartridge"&&(r=!1),s.bay&&s.bay!==e&&!/^bay-\d+$/.test(s.id)&&(r=!1),s.internal&&s.unit!==t&&this.state.mode==="device"&&!s.bay&&(r=!1);const l=s.anchor.getWorldPosition(new A);/^bay-\d+$/.test(s.id)&&a&&new A(0,0,1).transformDirection(s.anchor.matrixWorld).dot(this.camera.position.clone().sub(l))<=0&&(r=!1);const c=this.projectPoint(l),d=ja(s.id),m=s.id==="waste"&&(this.state.kitUsed||this.bayState(s.bay)?.used)?this.state.explanationMode?"Sealed waste in used cartridge":"Used kit waste":d?this.state.explanationMode?d.name:d.simpleName:s.id.startsWith("reaction:")?as({id:s.id.slice(9),name:s.name},{explanationMode:!!this.state.explanationMode}).title:s.name;i.push({id:s.id,name:m,x:c.x,y:c.y,visible:r&&c.visible,bay:s.bay,key:`${s.id}-${s.bay||"assembly"}-${s.unit}-${i.length}`})}return i}dimensionAnchors(){if(!this.camera||this.state.mode!=="device"||!this.state.showDimensions)return[];this.camera.updateMatrixWorld(!0);const e=this.state.config>2?"Core only; expanded dimensions unverified.":"Proposed Core design target; not measured.";return[{text:"45 cm Core width target",a:[-2.25,.04,2.02],b:[2.25,.04,2.02]},{text:"35 cm Core depth target",a:[2.52,.04,-1.7],b:[2.52,.04,1.7]},{text:"30 cm Core height target",a:[-2.7,.02,2.02],b:[-2.7,3.09,2.02]}].map(i=>{const s=this.projectPoint(new A(...i.a)),r=this.projectPoint(new A(...i.b));return{text:i.text,note:e,x:(s.x+r.x)/2,y:(s.y+r.y)/2,visible:s.visible&&r.visible,line:{x1:s.x,y1:s.y,x2:r.x,y2:r.y}}})}screenAnchor(){const e=this.screens[0];if(!e||this.state.mode!=="device")return{x:0,y:0,left:0,top:0,width:0,height:0,visible:!1};this.root.updateMatrixWorld(!0),this.camera.updateMatrixWorld(!0);const t=e.anchor.getWorldPosition(new A);let s=new A(0,0,1).transformDirection(e.anchor.matrixWorld).dot(this.camera.position.clone().sub(t))>0,r=e.anchor;for(;r;)r.visible||(s=!1),r=r.parent;const o=this.container.clientWidth,a=this.container.clientHeight,l=[[-1,-1],[-1,1],[1,1],[1,-1]].map(([p,v])=>e.anchor.localToWorld(new A(p*e.width/2,v*e.height/2,0)).project(this.camera)).map(p=>({x:(p.x+1)*o/2,y:(1-p.y)*a/2,z:p.z})),c=Math.min(...l.map(p=>p.x)),d=Math.min(...l.map(p=>p.y)),h=Math.max(...l.map(p=>p.x)),m=Math.max(...l.map(p=>p.y));return{x:(c+h)/2,y:(d+m)/2,left:c,top:d,width:h-c,height:m-d,visible:s&&l.every(p=>p.z>-1&&p.z<1),corners:l}}buildCartridge(e,t="complete",i=!1){const s=t==="match",r=t!=="type",o=this.part(e,"cartridge",[0,-.12,0]);this.box(o,[5.1,.16,3.25],[0,.18,0],14476257,"cartridge",.08,{roughness:.6,metalness:.02});const a=this.part(e,"cartridge",[0,.9,-2.5]);a.userData.cover=!0,this.box(a,[5.02,.035,3.16],[0,.31,0],14149349,"cartridge",.045,{transparent:!0,opacity:.055,roughness:.1,depthWrite:!1}),this.box(o,[.17,.18,2.6],[-2.48,.22,0],ze.burgundy,"cartridge",.02);for(const g of[-2.22,2.22])for(const f of[-1.38,1.38])this.cylinder(o,.055,.04,[g,.3,f],10858414,"cartridge");i||(this.text(o,t==="type"?"TYPE & SCREEN":s?"MATCH ONLY":"COMPLETE ROUTINE",[.28,.359,-1.35],{width:3.65,height:.22,size:55,color:"#632c37",rotate:!0}),this.text(o,"TEST AREAS",[.25,.357,1.39],{width:2.8,height:.15,size:34,color:"#6b7776",rotate:!0}));const l={patientCells:{id:"patient-cells",x:-2.04,z:-.65,color:ze.red},patientPlasma:{id:"patient-plasma",x:-2.04,z:.55,color:ze.amber},donorCells:{id:"donor-cells",x:2.16,z:-.1,color:ze.red}};for(const g of this.requiredFractions(t)){const f=l[g],u=this.part(e,f.id,[g==="donorCells"?.4:-.4,.12,0]);this.cylinder(u,.19,.15,[f.x,.39,f.z],ze.shell,f.id);const E=this.cylinder(u,.125,.04,[f.x,.49,f.z],f.color,f.id);this.patientInlets.push({object:E,key:g,bay:this.buildingBay||null,color:f.color}),this.addLabel(u,f.id,ja(f.id).name.replace("fraction","inlet"),[f.x,.51,f.z],{internal:i,bay:this.buildingBay||null})}const c=this.part(e,"channels",[0,.1,0]),d=this.part(e,"wells",[0,.2,0]);this.buildingBay&&this.bayPorts.has(this.buildingBay)&&(this.bayPorts.get(this.buildingBay).reaction=this.port(d,[0,.45,.15]));const h=this.part(e,"reagents",[.15,.55,-.1]),m=(g,f,u,E="plasma",w=!1)=>{const x=E==="cells"?ze.red:ze.amber;this.cylinder(d,.235,.07,[g,.36,f],5992568,"wells",{roughness:.35});const C=this.cylinder(d,.19,.028,[g,.408,f],x,"wells",{roughness:.4});this.cylinder(h,.098,.12,[g+.28,.45,f-.29],15195847,"reagents",{roughness:.3}),this.channel(c,[[g+.28,.45,f-.29],[g+.28,.4,f-.12],[g,.4,f]],13089931,.35,.65),!i&&this.state.nativeLabels&&this.text(d,as({id:Xl[u],name:u},{explanationMode:!!this.state.explanationMode}).title,[g,.362,f+.32],{width:.69,height:.14,size:43,color:"#172d33",rotate:!0});const R=[];for(let P=0;P<(this.software&&i?4:12);P++){const D=this.cylinder(d,.026,.012,[g+Math.sin(P*2.4)*(w?.065:.12),.429,f+Math.cos(P*2.4)*(w?.065:.12)],ze.red,"wells");R.push(D)}if(this.reactionWells.push({label:u,cells:R,x:g,z:f,defaultPositive:w,liquid:C,bay:this.buildingBay||null}),!i){const P=Xl;this.addLabel(d,`reaction:${P[u]||u}`,u,[g,.45,f],{reaction:!0})}};if(s)this.activeFraction="patientPlasma",this.channel(c,[[-2.04,.41,.55],[-1.55,.4,.55],[-1.2,.4,.1],[.65,.4,.1]],ze.amber,.05,.55),this.activeFraction=null,this.box(c,[.43,.07,.42],[-1.35,.35,-.28],14278614,"channels",.025,{transparent:!0,opacity:.7}),i||this.text(c,"EARLIER TESTS MUST BE VALID",[-.45,.357,-1.03],{width:3.25,height:.15,size:39,color:"#626b64",rotate:!0}),m(.65,.1,"Crossmatch","plasma"),m(-.5,.1,"Control −","plasma"),m(-.5,.88,"Control +","plasma",!0);else{this.box(c,[.42,.08,.34],[-1.65,.34,-.65],12560809,"channels",.03),this.box(c,[.42,.08,.34],[-1.65,.34,.55],13220756,"channels",.03),this.activeFraction="patientCells",this.channel(c,[[-2.04,.405,-.65],[-1.65,.4,-.65],[-1.4,.4,-.5],[.85,.4,-.5]],ze.red,.04,.53),this.activeFraction="patientPlasma",this.channel(c,[[-2.04,.405,.55],[-1.65,.4,.55],[-1.23,.4,.55],[-1.23,.4,-.08],[.82,.4,-.08]],ze.amber,.05,.58),this.channel(c,[[-1.23,.4,.55],[-1.23,.4,.65],[.84,.4,.65]],ze.amber,.2,.6),this.activeFraction=null;for(const f of[-.85,0,.85])this.channel(c,[[f,.4,-.5],[f,.4,-.76]],ze.red,.34,.62),this.channel(c,[[f,.4,.65],[f,.4,.93]],ze.amber,.36,.65),this.box(c,[.095,.065,.065],[f,.4,-.61],9281175,"channels",.009),this.box(c,[.095,.065,.065],[f,.4,.77],9281175,"channels",.009);for(const f of[-.85,0])this.channel(c,[[f,.4,-.08],[f,.4,.15]],ze.amber,.35,.64),this.box(c,[.095,.065,.065],[f,.4,.015],9281175,"channels",.009);const g=[-.85,0,.85];["Anti-A","Anti-B","Anti-D"].forEach((f,u)=>m(g[u],-.76,f,"cells",u===0||u===2)),["A1 cells","B cells"].forEach((f,u)=>m(g[u],.15,f,"plasma",u===1)),["Screen I","Screen II","Screen III"].forEach((f,u)=>m(g[u],.93,f,"plasma")),!i&&this.state.nativeLabels&&(this.text(c,"RED CELLS",[-1.65,.359,-.62],{width:.83,height:.115,size:37,color:"#8a2939",rotate:!0}),this.text(c,"PLASMA",[-1.68,.359,.14],{width:.72,height:.115,size:39,color:"#99732f",rotate:!0}))}if(r){s||(m(1.78,.53,"Crossmatch","plasma"),m(-1.65,-.97,"Control +","plasma",!0));const g=s?[.65,.4,.1]:[1.78,.4,.53];this.activeFraction="donorCells",this.channel(c,[[2.16,.43,-.1],[2.36,.4,.12],[2.36,.4,.53],g],ze.red,.24,.65),this.activeFraction=null,s||this.channel(c,[[.82,.4,-.08],[1.3,.4,-.08],[1.3,.4,.53],[1.78,.4,.53]],ze.amber,.35,.68)}else m(1.77,.53,"Control +","plasma",!0);s||m(1.78,-.62,"Control −","plasma");const p=this.part(e,"waste",[.4,.1,.2]);this.box(p,[.72,.09,.37],[1.8,.35,1.2],6323571,"waste",.035);const v=this.box(p,[.6,.035,.26],[1.8,.414,1.2],7087921,"waste",.02);this.wasteRegions.push({object:v,bay:this.buildingBay||null}),this.channel(c,[[s?.65:1.78,.4,.53],[1.78,.4,.89],[1.8,.4,1.2]],9993072,.8,1);for(const[g,f,u,E]of[[o,"cartridge","Single-use assay cartridge",[0,.2,0]],[c,"channels","Isolated specimen routes",[-.9,.42,.05]],[h,"reagents","Preloaded assay reagents",[.3,.5,-.4]],[d,"wells","Reaction and optical windows",[.25,.45,.4]],[p,"waste","Sealed single-use waste",[1.8,.43,1.2]]])this.addLabel(g,f,u,E,{internal:i,bay:this.buildingBay||null});i||(this.state.nativeLabels&&this.text(p,"WASTE",[1.82,.411,1.2],{width:.61,height:.12,size:43,color:"#eff3eb",rotate:!0}),this.center=new A(0,.2,0),this.span=5.6)}buildOptics(){const e=this.part(this.root,"structure",[0,-.1,0]);this.box(e,[5,.22,3.5],[0,.12,0],14212571,"structure",.07);for(const a of[-1.7,1.7])this.box(e,[.13,3.1,.16],[a,1.8,-.9],ze.metal,"structure",.015);this.box(e,[3.55,.15,.3],[0,3.27,-.9],ze.metal,"structure",.025);const t=this.part(this.root,"optics",[0,1.1,0]);this.box(t,[1.45,.8,1.1],[0,2.77,-.1],ze.dark,"optics",.07),this.text(t,"CAMERA",[0,2.83,.46],{width:1.26,height:.16,size:44,color:"#e1e6df"}),this.cylinder(t,.32,.4,[0,2.2,-.1],4937308,"optics"),this.cylinder(t,.23,.07,[0,1.98,-.1],8102576,"optics",{metalness:.6,roughness:.07});const i=new gt(new Is(.32,.92,this.software?16:32),this.mat(4154194,{side:qt}));i.rotation.x=-Math.PI/2,i.position.set(0,1.76,-.1),this.tag(i,"optics"),t.add(i);for(let a=0;a<12;a++){const l=a*Math.PI/6;this.box(t,[.075,.035,.075],[Math.cos(l)*.63,1.73,-.1+Math.sin(l)*.63],16776688,"optics",.009,{emissive:10984048,emissiveIntensity:.25})}this.text(t,"WHITE LIGHT",[0,1.77,.76],{width:2.64,height:.18,size:43,color:"#6e7365"});const s=this.part(this.root,"wells",[0,.2,.6]);this.box(s,[3,.16,2],[0,.52,-.1],14477281,"wells",.08,{transparent:!0,opacity:.62,roughness:.15}),this.cylinder(s,.65,.05,[0,.65,-.1],15520708,"wells",{transparent:!0,opacity:.5});for(let a=0;a<34;a++){const l=a<20?a:a-20,c=a<20?-.21:.27,d=a<20?-.19:.13,h=l*2.399,m=.035*Math.sqrt(l);this.cylinder(s,.055,.024,[c+Math.cos(h)*m,.69,d+Math.sin(h)*m],ze.red,"wells")}this.text(s,"TEST CHAMBER",[0,.54,1.05],{width:3.25,height:.18,size:42,color:"#6e3b43"});const r=[];for(const a of[-.64,.64])for(const l of[-.74,.54])r.push(new A(0,1.94,-.1),new A(a,.74,l));const o=new al(new It().setFromPoints(r),new Vr({color:12166764,transparent:!0,opacity:.55}));this.root.add(o),this.addLabel(e,"structure","Optical support frame",[-1.7,2,-.9]),this.addLabel(t,"optics","Camera sensor and LED illumination",[0,2.7,.4]),this.addLabel(s,"wells","Illustrative reaction window",[0,.75,-.1]),this.center=new A(0,1.3,0),this.span=5.9}update(e={}){const t=JSON.stringify((e.bayStates||this.state.bayStates||[]).map(c=>[c.bay,c.cartridge])),i=t!==this.bayScopeSignature;this.bayScopeSignature=t;const s=i||e.mode&&e.mode!==this.state.mode||e.config&&Number(e.config)!==this.state.config||e.cartridge&&e.cartridge!==this.state.cartridge||e.mode==="dock"&&e.selectedBay&&Number(e.selectedBay)!==Number(this.state.selectedBay),r=e.selectedBay&&Number(e.selectedBay)!==Number(this.state.selectedBay),o=e.connectionScope&&e.connectionScope!==this.state.connectionScope,a=e.view&&e.view!==this.state.view,l="cutaway"in e&&e.cutaway!==this.state.cutaway;if(this.state={...this.state,...e},this.state.config=Number(this.state.config)||2,this.fallback){this.showFallback();return}s&&(this.build(),this.setView(e.view||"reset")),(a||l||o||r&&this.state.view==="connections")&&this.setView(e.view||"reset"),"selectedComponent"in e&&this.selectComponent(e.selectedComponent),this.updateReactionWells(),this.updateMachineDisplays()}updateReactionWells(){const e=t=>String(t||"").toLowerCase().replace(/[^a-z0-9]/g,"");for(const t of this.reactionWells){const i=t.bay?this.bayState(t.bay):null,s=!t.bay||t.bay===Number(this.state.selectedBay||1),r=Array.isArray(i?.reactions)?i.reactions:s&&Array.isArray(this.state.reactions)?this.state.reactions:[],o=e(t.label),a={a1cells:"reversea1",bcells:"reverseb",control:"",controlminus:"negativecontrol",controlplus:"positivecontrol"},l=t.label==="Control −"?"negativecontrol":t.label==="Control +"?"positivecontrol":a[o]||o,c=r.find(p=>[p.name,p.reagent,p.id].some(v=>{const g=e(v);return g===o||g===l||o==="crossmatch"&&g.includes("crossmatch")||o==="screeni"&&(g==="screen1"||g==="screeningcell1")||o==="screenii"&&(g==="screen2"||g==="screeningcell2")||o==="screeniii"&&(g==="screen3"||g==="screeningcell3")})),d=c?c.positive:t.defaultPositive,h=c&&d===null,m=!!c&&c.ready!==!1;for(let p=0;p<t.cells.length;p++){const v=d?.056:.12;t.cells[p].position.set(t.x+Math.sin(p*2.399)*v,.429,t.z+Math.cos(p*2.399)*v),t.cells[p].material.color.setHex(h?10195845:ze.red),t.cells[p].visible=m}t.liquid.material.color.setHex(m?h?11643290:d?12214104:14203808:14014930)}}setMode(e){this.update({mode:e})}setView(e="reset"){if(this.fallback)return;if(e==="connections"&&this.state.mode==="device"){const o=this.state.connectionScope!=="selected",a=o?this.systemFrameBounds():this.connectionFrameBounds();if(a&&!a.isEmpty()){const l=a.getCenter(new A),c=(o?new A(.35,1.15,-1.6):new A(.6,.9,1.4)).normalize(),d=new A(0,1,0).cross(c).normalize(),h=c.clone().cross(d).normalize(),m=Math.tan(en.degToRad(this.camera.fov/2));let p=6.5;for(const v of[a.min.x,a.max.x])for(const g of[a.min.y,a.max.y])for(const f of[a.min.z,a.max.z]){const u=new A(v,g,f).sub(l),E=u.dot(c);p=Math.max(p,E+Math.abs(u.dot(d))/(m*Math.max(.35,this.camera.aspect)*.8),E+Math.abs(u.dot(h))/(m*.8))}this.camera.position.copy(l).addScaledVector(c,p),this.controls.target.copy(l),this.controls.update();return}}if(e==="screen"&&this.screens[0]){const o=this.screens[0].anchor.getWorldPosition(new A);this.camera.position.copy(o).add(new A(0,.02,Math.max(3.3,1.72/(Math.tan(en.degToRad(this.camera.fov/2))*this.camera.aspect)))),this.controls.target.copy(o),this.controls.update();return}const t=this.center||new A(0,1,0),i=(this.span||6)*(this.state.mode==="device"?1.45:1.4)*Math.max(1,1.32/Math.max(.5,this.camera.aspect)),s={front:[0,.3,1],side:[1,.28,.06],rear:[0,.34,-1],top:[.01,1,.01],reset:this.state.mode==="dock"?[1,.7,1.5]:this.state.mode==="cartridge"?[.12,1,.32]:this.state.cutaway?[.55,1.05,1.1]:[.45,.32,1.35]}[e]||[.9,.62,1.05],r=new A(...s).normalize().multiplyScalar(i);this.camera.position.copy(t).add(r),this.controls.target.copy(t),this.controls.update()}selectComponent(e){this.state.selectedComponent=e,!this.fallback&&(this.selection&&(this.scene.remove(this.selection),this.selection.geometry.dispose(),this.selection.material.dispose(),this.selection=null),this.root.traverse(t=>{if(t.isMesh&&t.material?.emissive){let i=t;for(;i&&!i.userData.bay;)i=i.parent;const s=e&&(t.userData.component===e||e===`bay-${i?.userData.bay}`);t.material.emissive.setHex(s?4330014:0),t.material.emissiveIntensity=s?.25:0}}))}pick(e){const t=this.renderer.domElement.getBoundingClientRect();this.pointer.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera);const i=this.raycaster.intersectObjects(this.root.children,!0);for(const s of i){let r=s.object,o=r,a=!1;for(;o;)o.visible||(a=!0),o=o.parent;if(!a){for(;r&&!r.userData.component;)r=r.parent;if(r){let l=s.object;for(;l&&!l.userData.bay;)l=l.parent;const c=(this.state.cutaway||this.state.mode==="dock")&&r.userData.component!=="bays",d=l&&!c?`bay-${l.userData.bay}`:r.userData.component;this.selectComponent(d),this.onSelect(d,ja(d)||{id:d,name:`Bay ${String(l?.userData.bay||"").padStart(2,"0")}`});return}}}}resize(){if(this.fallback||this.disposed)return;const e=Math.max(1,this.container.clientWidth),t=Math.max(1,this.container.clientHeight);this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t,!1),this.state.mode==="device"&&this.state.showConnections&&this.state.view==="connections"?this.setView("connections"):this.state.mode==="dock"&&this.setView(this.state.view&&this.state.view!=="connections"?this.state.view:"reset")}animate(){if(this.disposed||this.fallback)return;this.frame=requestAnimationFrame(()=>this.animate());const e=Math.min(this.clock.getDelta(),.05),t=this.clock.elapsedTime;if(this.software&&t-(this.lastSoftwareFrame||0)<.1){this.controls.update();return}this.lastSoftwareFrame=t;const i=!!(this.state.showConnections&&this.state.cutaway&&this.state.mode==="device"),s=this.bayPorts.get(Number(this.state.selectedBay||1))?.unit||0;for(const a of this.deviceUnits)a.object.visible=!i||this.state.connectionScope!=="selected"||a.index===s;for(const a of this.sampleTubes)a.object.parent.visible=!i;for(const a of this.parts){const l=this.inspectionDestination(a);a.position.lerp(l,Math.min(1,e*6)),(a.userData.shell||a.userData.cover)&&(a.visible=!this.state.cutaway||!!(i&&a.userData.connectionVisible&&a.userData.connectionUnit===s))}this.updateDockInspection();for(const a of this.inspectionCovers)a.visible=!this.state.cutaway;let r=Number(this.state.elapsed||0)/600;typeof this.state.flow=="number"?r=this.state.flow>1?this.state.flow/600:this.state.flow:this.state.flow&&r===0&&(r=t*.08%1),r=Math.max(0,Math.min(1,r));for(const a of this.flows){const l=a.bay?this.bayState(a.bay):null;let c=l?Number(l.elapsed||0)/600:r;a.bay===Number(this.state.selectedBay||1)&&this.state.flow&&!l?.running&&Number(this.state.elapsed)>Number(l?.elapsed||0)&&(c=r);const d=l?l.running:this.state.running,h=this.fractionState(a.bay);a.fraction&&h[a.fraction]===!1&&!this.state.flow&&(c=0);const m=en.clamp((c-a.start)/(a.end-a.start),0,1),p=Math.floor(m*a.segments)*a.radial*6;this.software?(p!==a.fillCount&&(a.fluid.geometry.setIndex(new yn(a.fullIndex.slice(0,p),1)),a.fillCount=p),a.fluid.visible=p>0):a.fluid.geometry.setDrawRange(0,p);for(let v=0;v<a.beads.length;v++){const g=a.beads[v];if(g.visible=m>.02&&(d||this.state.flow),g.visible){const f=(t*.18+v*.28)%1*m;g.position.copy(a.curve.getPointAt(en.clamp(f,0,1)))}}}for(const{mesh:a,index:l}of this.bayLamps){const c=l+1,d=this.bayState(c),h=c===Number(this.state.selectedBay||1),m=d?.running||h&&this.state.running||(this.state.activeBays||[]).includes(c),p=d?.used||d?.kitUsed||h&&this.state.kitUsed,v=String(d?.status||"").toLowerCase(),g=/invalid|hold|fault|investigat/.test(v),f=/review|authoris|handover/.test(v)||p&&!m,u=g?9908546:m?ze.burgundy:f?12093229:d?.inserted?ze.green:8227726;a.material.color.setHex(u),a.material.emissive.setHex(m?4657696:0),a.material.emissiveIntensity=.18}for(const a of this.loadedCartridges){const l=this.bayState(a.bay),c=a.bay===Number(this.state.selectedBay||1),d=(this.state.activeBays||[]).includes(a.bay);a.object.visible=l?.kitPresent!==!1&&(c||d||!!l?.inserted||!!l?.used||!!l?.kitId),a.object.position.copy(a.origin);const m=(l?l.inserted:c&&this.state.inserted)?1:en.clamp(Number(l?.insertionProgress??(c?this.state.insertionProgress:0))||0,0,1);(c||l?.kitId)&&(a.object.position.z+=1.6*(1-m))}for(const a of this.loadingTrays){const l=this.bayState(a.bay),c=a.bay===Number(this.state.selectedBay||1);if(a.object.position.copy(a.origin),c||l?.kitId){const d=l?.inserted||c&&this.state.inserted?1:en.clamp(Number(l?.insertionProgress??this.state.insertionProgress)||0,0,1);a.object.position.z+=1.6*(1-d)}}const o=this.fractionState(null);for(const a of this.sampleTubes){const l=o[a.key]?.14:1;a.object.scale.y=en.lerp(a.object.scale.y,l,.13),a.object.position.y=a.base+a.height*a.object.scale.y/2}for(const a of this.patientInlets){const l=this.fractionState(a.bay);a.object.material.color.setHex(l[a.key]?a.color:14016219)}for(const a of this.wasteRegions){const l=a.bay?this.bayState(a.bay):null,c=!a.bay||a.bay===Number(this.state.selectedBay||1),d=l?.elapsed??(c?this.state.elapsed:0),h=l?.used||l?.kitUsed||c&&this.state.kitUsed;a.object.visible=!!h||d>450,a.object.material.color.setHex(h?6498099:9663044),a.object.scale.y=h?Math.max(.2,Math.min(1,d/600)):.2}if(this.updateConnections(),this.controls.update(),this.software){this.root.updateMatrixWorld(!0);const a=new A,l=new A,c=new ai;this.root.traverse(d=>{if(!d.isSVGObject)return;d.getWorldPosition(a),d.getWorldQuaternion(c),l.copy(d.userData.labelNormal).applyQuaternion(c);const h=this.camera.position.clone().sub(a);if(d.visible=l.dot(h.normalize())>.06,d.userData.logoImage){const{width:g,height:f}=d.userData.logoSize,u=this.projectPoint(a),E=(R,P)=>this.projectPoint(d.localToWorld(new A(R,P,0))),w=E(-g/2,f/2),x=E(g/2,f/2),C=E(-g/2,-f/2);d.userData.logoImage.setAttribute("transform",`matrix(${x.x-w.x} ${x.y-w.y} ${C.x-w.x} ${C.y-w.y} ${w.x-u.x} ${w.y-u.y})`);return}const m=Math.max(1,this.camera.position.distanceTo(a)),p=this.container.clientHeight/(2*m*Math.tan(en.degToRad(this.camera.fov/2))),v=Math.max(1,Math.min(42,(d.userData.labelHeight||.1)*p,(d.userData.labelWidth||1.7)*p/Math.max(1,d.node.textContent.length*.61)));d.node.setAttribute("font-size",v.toFixed(1))})}this.renderer.render(this.scene,this.camera)}showFallback(){const e=this.state?.cartridge||"complete";this.container.innerHTML=`<div style="display:flex;min-height:320px;height:100%;align-items:center;justify-content:center;padding:28px;box-sizing:border-box;background:#f0efec;color:#343b3d;font-family:Arial,sans-serif"><div style="max-width:430px"><p style="font-size:12px;letter-spacing:1px;color:#7d2435">HEMATRIX ENGINEERING VIEW</p><h3 style="font-weight:500;font-size:24px">3D graphics unavailable</h3><p style="line-height:1.65">The interactive test engine remains available. The ${e==="type"?"Type & Screen":e==="match"?"Match Only":"Complete Routine"} cartridge uses identified sample inlets, separated assay pathways, controlled reaction windows and sealed waste.</p><p style="line-height:1.65">Use the component list to inspect the proposed device architecture. A WebGL-capable browser enables rotation, cutaway and exploded views.</p></div></div>`}dispose(){this.disposed=!0,cancelAnimationFrame(this.frame),this.observer?.disconnect(),this.controls?.dispose(),this.renderer&&(this.renderer.domElement.removeEventListener("pointerdown",this._pointerDown),this.renderer.domElement.removeEventListener("pointerup",this._pointerUp),this.clearRoot(),this.logoTexture?.dispose(),this.logoTexture=null,this.floor.geometry.dispose(),this.floor.material.dispose(),this.renderer.dispose?.(),this.renderer.domElement.remove())}}const _c=new Set(["negative","positive","weak","bubble","illumination","blur","equivocal"]),Ka=.019;function Wv(n=37){let e=n>>>0;return()=>(e=1664525*e+1013904223>>>0,e/4294967296)}function Jd(n){const e=Wv(1871),t=[],i=(l,c,d=Ka)=>t.push({x:l,y:c,r:d,angle:e()*Math.PI,shape:.75+e()*.19}),s=n==="positive",r=n==="weak"||n==="equivocal";if(s||r){const l=s?[[-.24,-.22],[.02,-.28],[.26,-.13],[-.25,.1],[.04,.01],[.24,.23],[-.07,.28]]:[[-.21,-.19],[.23,.1],[-.05,.26]];for(const[c,d]of l){const h=s?15:7;for(let m=0;m<h;m++){const p=m*2.3999632,v=Math.sqrt(m)*(s?.02:.023);i(c+Math.cos(p)*v,d+Math.sin(p)*v,Ka*(.88+e()*.2))}}}const o=s?112:r?88:94;let a=0;for(;t.length<o&&a++<9e3;){const l=(e()-.5)*.82,c=(e()-.5)*.82;if(l*l+c*c>.4*.4)continue;const d=s?.05:r?.046:.052;t.some(h=>Math.hypot(h.x-l,h.y-c)<d)||i(l,c,Ka*(.86+e()*.25))}return t}function Qd(n){const e=new Set,t=[];for(let i=0;i<n.length;i++){if(e.has(i))continue;const s=[i];e.add(i);for(let r=0;r<s.length;r++){const o=n[s[r]];for(let a=0;a<n.length;a++){if(e.has(a))continue;const l=n[a];Math.hypot(o.x-l.x,o.y-l.y)<(o.r+l.r)*1.18&&(e.add(a),s.push(a))}}t.push(s.map(r=>n[r]))}return t}function Xo(n="negative"){if(!_c.has(n))return{classification:"Unable to interpret",clusterIndex:null,quality:0,detail:"The image pattern is not recognised. No positive or negative result is assigned."};const e=["bubble","illumination","blur"].includes(n)?"negative":n,t=Jd(e),i=Qd(t).filter(c=>c.length>=3).reduce((c,d)=>c+d.length,0),s=Math.round(i/t.length*100)/100,r={negative:["No reactivity detected",98,"The cells are predominantly dispersed. Interpretation still depends on the assay controls and complete testing record."],positive:["Reactive pattern",98,"Connected cell clusters are visible. In a typing well this can support antigen detection; in a crossmatch it requires investigation."],weak:["Weak reactivity: review",91,"Small clusters occur among dispersed cells. Retain the finding and request qualified review or repeat testing."],equivocal:["Equivocal: investigate",72,"The image is ambiguous. A reliable positive or negative result cannot be assigned."],bubble:["Invalid optical field",37,"An air bubble obscures the reaction area. Correct the fluidic fault and repeat; do not infer a nonreactive result."],illumination:["Invalid optical field",42,"Uneven illumination prevents reliable interpretation. Check the optical calibration and repeat the test."],blur:["Invalid optical field",45,"Loss of focus prevents reliable pattern interpretation. Inspect the optics and repeat the test."]},[o,a,l]=r[n];return{classification:o,clusterIndex:s,quality:a,detail:l}}function Yl(n,e){if(e&&_c.has(e))return e;const t=String(n?.grade??"").toLowerCase(),i=String(n?.interpretation??"").toLowerCase();return t.includes("invalid")||i.includes("invalid")||i.includes("unreadable")?"bubble":t.includes("weak")||t==="w+"||t==="1+"||i.includes("weak")?"weak":n?.positive===null?"equivocal":n?.positive?"positive":"negative"}function qv(n,e,t,i,s,r){const o=t+e.x*s,a=i+e.y*s,l=e.r*s;n.save(),n.translate(o,a),n.rotate(e.angle),n.scale(1,e.shape);const c=n.createRadialGradient(-l*.18,-l*.18,l*.08,0,0,l);r?(c.addColorStop(0,"#d9b5b9"),c.addColorStop(.54,"#a54e5c"),c.addColorStop(1,"#782638")):(c.addColorStop(0,"#f6b8a9"),c.addColorStop(.3,"#e48c80"),c.addColorStop(.56,"#b34243"),c.addColorStop(.85,"#8e2a37"),c.addColorStop(1,"#a7484b")),n.fillStyle=c,n.beginPath(),n.ellipse(0,0,l,l,0,0,Math.PI*2),n.fill(),n.strokeStyle=r?"rgba(89,28,43,.5)":"rgba(112,33,43,.24)",n.lineWidth=Math.max(.5,l*.06),n.stroke(),n.beginPath(),n.ellipse(-l*.13,-l*.15,l*.48,l*.32,0,Math.PI*1.04,Math.PI*1.8),n.strokeStyle="rgba(255,217,207,.45)",n.lineWidth=l*.12,n.stroke(),n.restore()}class eh{constructor(e){if(!e)throw new Error("ReactionViewer requires a container");this.container=e,this.canvas=document.createElement("canvas"),this.canvas.setAttribute("role","img"),this.canvas.setAttribute("aria-label","Illustrative reaction image"),this.canvas.style.cssText="width:100%;height:100%;display:block;min-height:180px;",e.appendChild(this.canvas),this.options={mode:"raw",pattern:"negative"},this.resizeObserver=new ResizeObserver(()=>this.draw()),this.resizeObserver.observe(e),this.draw()}update(e={}){return this.options={...this.options,...e},e.reaction&&!Object.hasOwn(e,"pattern")&&(this.options.pattern=null),this.draw(),Xo(this.options.pattern||Yl(this.options.reaction,this.options.quality))}draw(){const e=this.container.getBoundingClientRect(),t=Math.max(160,e.width||360),i=Math.max(180,e.height||240),s=Math.min(window.devicePixelRatio||1,2);(this.canvas.width!==Math.round(t*s)||this.canvas.height!==Math.round(i*s))&&(this.canvas.width=Math.round(t*s),this.canvas.height=Math.round(i*s));const r=this.canvas.getContext("2d");if(!r)return;r.setTransform(s,0,0,s,0,0),r.clearRect(0,0,t,i);const o=this.options.mode==="processed",a=this.options.pattern||Yl(this.options.reaction,this.options.quality),l=["bubble","illumination","blur"].includes(a)?"negative":a,c=Jd(_c.has(l)?l:"negative"),d=Math.min(t-34,i-30),h=t/2,m=i/2,p=d*.49;r.fillStyle=o?"#eeecea":"#f1eeea",r.fillRect(0,0,t,i),r.save(),r.beginPath(),r.arc(h,m,p,0,Math.PI*2),r.clip();const v=r.createRadialGradient(h-d*.1,m-d*.12,0,h,m,p);v.addColorStop(0,o?"#f6f5f1":"#fff5e8"),v.addColorStop(.8,o?"#eeece8":"#f6e8db"),v.addColorStop(1,o?"#dfdcd8":"#dacebf"),r.fillStyle=v,r.fillRect(h-p,m-p,p*2,p*2),a==="blur"&&(r.filter=`blur(${Math.max(2.2,d*.009)}px)`);for(const g of c)qv(r,g,h,m,d,o);if(r.filter="none",o&&!["bubble","illumination","blur"].includes(a)){const g=Qd(c).filter(f=>f.length>=3);r.strokeStyle="#306d6b",r.lineWidth=1.5,r.setLineDash([4,3]);for(const f of g){const u=Math.min(...f.map(C=>C.x-C.r))*d+h-4,E=Math.max(...f.map(C=>C.x+C.r))*d+h+4,w=Math.min(...f.map(C=>C.y-C.r))*d+m-4,x=Math.max(...f.map(C=>C.y+C.r))*d+m+4;r.beginPath(),r.roundRect(u,w,E-u,x-w,8),r.stroke()}r.setLineDash([])}if(a==="bubble"){const g=h+d*.12,f=m-d*.08,u=d*.18,E=r.createRadialGradient(g-u*.22,f-u*.25,u*.01,g,f,u);E.addColorStop(0,"rgba(255,255,255,.83)"),E.addColorStop(.7,"rgba(250,245,235,.89)"),E.addColorStop(.91,"rgba(116,103,91,.25)"),E.addColorStop(1,"rgba(95,74,60,.55)"),r.beginPath(),r.arc(g,f,u,0,Math.PI*2),r.fillStyle=E,r.fill(),r.strokeStyle="rgba(255,255,255,.9)",r.lineWidth=2,r.beginPath(),r.arc(g,f,u*.89,Math.PI*1.05,Math.PI*1.63),r.stroke(),o&&(r.strokeStyle="#ad7027",r.lineWidth=2,r.setLineDash([5,3]),r.beginPath(),r.arc(g,f,u+4,0,Math.PI*2),r.stroke(),r.setLineDash([]))}if(a==="illumination"){const g=r.createLinearGradient(h-p,m,h+p,m);g.addColorStop(0,"rgba(29,18,21,.85)"),g.addColorStop(.5,"rgba(41,22,25,.28)"),g.addColorStop(1,"rgba(255,255,230,.27)"),r.fillStyle=g,r.fillRect(h-p,m-p,p*2,p*2)}r.restore(),r.strokeStyle="#d3cec7",r.lineWidth=1,r.beginPath(),r.arc(h,m,p+.6,0,Math.PI*2),r.stroke(),r.fillStyle="#645e59",r.font="12px DM Sans, Arial, sans-serif",r.textAlign="left",r.fillText(o?"Processed reaction image":"Illustrative reaction image",12,17),r.font="12px DM Sans, Arial, sans-serif",r.textAlign="right",r.fillText("Reference pattern",t-12,i-10),this.canvas.setAttribute("aria-label",`${o?"Processed":"Raw"} reaction image: ${Xo(a).classification}. Illustrative, not a clinical image.`)}dispose(){this.resizeObserver.disconnect(),this.canvas.remove()}}const Me=n=>document.querySelector(n),Ns=n=>Ve?n.name:n.simpleName||n.name,th=n=>Ve?n.does:n.simpleDoes||n.does,Ur=n=>Ve?n:{"No reactivity detected":"No reaction found",Reactive:"Reaction found: investigate","Invalid result":"Result unavailable: repeat needed","Awaiting result":"Not ready yet","Not reported":"Result unavailable","Negative (prior record)":"No reaction found in earlier record","Prior workup required":"Earlier patient tests needed","Unable to interpret":"Unclear: investigate"}[n]||n,Ee=n=>String(n??"").replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e]),ci=(n,e=19)=>{const t={play:"M8 5l11 7-11 7V5z",pause:"M8 5v14M16 5v14",check:"M5 12l4 4L19 6",reset:"M3 10a9 9 0 1 1 2.4 8M3 4v6h6",expand:"M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5",close:"M6 6l12 12M18 6L6 18",scan:"M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M7 12h10",eye:"M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0",drop:"M12 3C10 7 5 11 5 15a7 7 0 0 0 14 0c0-4-5-8-7-12z",insert:"M4 4h16v16H4zM8 13h8M8 16h8M9 4v5h6V4"};return`<svg width="${e}" height="${e}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${t[n]||t.eye}"/></svg>`},qr=(n,e="neutral")=>`<span class="status-pill ${e}">${Ee(n)}</span>`;let Ve=!1,fe=Th(2),Ne=ft(fe).engine,Mn=null,Tn=!1,Bn=!1,kt=!1,mn=null,Gn="system",ei=!0,ra="technical",Ri=!1,Yt=location.hash==="#explore"?"explore":"demonstrate",je="exterior",Pt="reset",$t="enclosure",yc=!1,aa=!1,Zi=!1,nh=0,ks=20,us=!1,$r=!1,gn=0,An=!1,As="negative",Yo=!1,Nr="anti-a",tn="",Fn="",jl,Kl="",Rn,Rs,Xs;Me("#app").innerHTML=`<header class="app-header"><a class="brand" href="#demonstrate" aria-label="HemaTrix"><img class="brand-logo" src="./assets/hematrix-logo.svg" alt="" width="36" height="43"><span>HemaTrix<small>DISTRIBUTED</small></span></a><nav aria-label="Main navigation"><button data-nav="demonstrate">Use the machine</button><button data-nav="explore">Explore</button></nav><div class="header-actions"><button id="explanation-toggle" data-action="explanation" aria-pressed="false"><span class="mode-indicator" aria-hidden="true"></span><span>Explanation mode</span><strong id="explanation-state">Off</strong></button><button data-action="fullscreen" aria-label="Full screen">${ci("expand")}<span>Full screen</span></button></div></header>
<main class="lab-layout"><section class="scene-panel" aria-label="Interactive product"><div class="scene-header"><div><h1 id="instrument-title">HemaTrix Core</h1><span id="configuration-label" class="configuration-label">Two independent bays</span></div><button data-action="screen-view" class="screen-zoom">View screen</button></div><div class="scene-views" role="group" aria-label="Live view"><button data-view="exterior">Machine</button><button data-view="inside">Inside the machine</button><button data-view="cartridge">Cartridge</button><button data-view="optics" class="explore-only">Camera view</button><button data-action="labels" id="labels-toggle" aria-pressed="false">Show labels</button><button data-action="dimensions" id="dimensions-toggle" aria-pressed="false">Dimensions</button><button data-action="connections" id="connections-toggle" aria-pressed="false">Connections</button></div><div id="connection-key" hidden></div><div id="viewer" class="viewer" role="group" aria-label="Interactive HemaTrix model. Drag to rotate, scroll to zoom."></div><div id="part-info" hidden></div><div class="scene-bottom"><div class="live-caption"><strong id="scene-caption-title">Load the patient sample</strong><p id="scene-caption">Use the control beside the machine to begin.</p></div><div class="camera-controls"><label class="sr-only" for="camera">Camera angle</label><select id="camera"><option value="reset">Perspective</option><option value="front">Front</option><option value="side">Side</option><option value="top">Top</option><option value="rear">Rear</option><option value="screen">Screen close-up</option><option value="connections">Connections view</option></select><button data-action="reset-camera" aria-label="Reset view" title="Reset view">${ci("reset")}</button></div></div><div class="model-legend" id="model-legend" hidden><span class="cells-key">Patient red cells</span><span class="plasma-key">Patient plasma</span><span>Separate pathways</span></div></section><aside class="control-panel" id="controls"></aside></main><div class="toast" id="toast" role="status" aria-live="polite"></div>
<dialog id="review-dialog" class="review-dialog"><div id="review-body"></div></dialog><dialog id="details-dialog" class="details-dialog"><div id="details-body"></div></dialog>`;function bc(n){return{fresh:"Ready to load",loaded:"Sample loaded",inserted:"In place",running:"Testing",used:"Used",removed:"Removed"}[n]||n}function ih(n){const e=/^bay-\d+$/.test(n)?"bays":n.startsWith("reaction:")?"wells":n,t=new Set,i=[];for(const s of Vv(n)||[]){if(s.id==="cluster-data-link"){fe.config===16&&i.push(`<p>Connected to Unit ${fe.selectedBay>8?1:2} to share test records. Each machine has its own power and moving parts.</p>`);continue}for(const r of[s.from,s.to]){if(r===e)continue;const o=Ve?`${r}-${s.label}`:r;if(t.has(o))continue;t.add(o);const a=Ai.find(c=>c.id===r),l=a?Ns(a):r;i.push(`<button data-linked-part="${Ee(r)}"><strong>${Ee(l)}</strong>${Ve?`<small>${Ee(s.label)}</small>`:""}</button>`)}}return i.length?`<section class="connected-parts"><h4>Works with</h4>${i.join("")}</section>`:""}function $v(){const n=Me("#connection-key");if(n.hidden=!kt||!["inside","dock"].includes(je),n.hidden)return;const e=!!n.querySelector(".bay-connection-details")?.open,t=je==="dock",i=t?"dock":Gn,s=fe.selectedBay>8?2:1,o=t?"The rails guide the cartridge into place. A lock holds it still while the drivers press against its dry outer pad. All liquid stays inside the cartridge.":{pressure:"Small drivers at each bay press against the outside of its cartridge. They do not touch the sample.",optical:"A light and camera read each cartridge. The images go to the machine for staff review.",data:"Each bay sends its test information to the screen. Every record stays linked to its patient and cartridge.",power:"The rear electrical connections supply each bay and its moving parts, heater, light and camera."}[mn]||"Every bay connects to power and data at the rear. Each has its own moving parts, heater and camera. Samples stay in their own cartridges.",a=JSON.stringify([i,fe.config,fe.selectedBay,mn,ei,Ve]);if(n.dataset.signature===a)return;n.dataset.signature=a;const l={pressure:"Movement",optical:"Light and camera",data:"Test information",power:"Power"};n.innerHTML=`<div class="connection-heading"><strong>${t?`Bay ${fe.selectedBay}: cartridge fit`:i==="system"?`How the bays connect${fe.config===16?` / Unit ${s}`:""}`:`Bay ${fe.selectedBay}: connections`}</strong><span>Proposed design</span></div>
 <div class="connection-scope" role="group" aria-label="Connection view">${[["system","All bays"],["selected","This bay"],["dock","Cartridge fit"]].map(([c,d])=>`<button data-connection-scope="${c}" aria-pressed="${i===c}">${d}</button>`).join("")}</div>
 ${t?`<div class="dock-controls"><button data-action="dock-separate" aria-pressed="${ei}">${ei?"Fit cartridge in place":"Show the contact points"}</button><span>${ei?"Cartridge moved out for a closer look.":"Cartridge aligned and locked in place."} Your test keeps its current state.</span></div>`:`<div class="connection-types"><button data-connection-kind="all" aria-pressed="${!mn}">Show all</button>${Object.entries(Zd).map(([c,d])=>`<button data-connection-kind="${Ee(c)}" aria-pressed="${mn===c}"><i style="--connection-color:${Ee(d.color)}"></i>${Ee(Ve?d.label:l[c]||d.label)}</button>`).join("")}</div>`}
 <p class="connection-description">${Ee(o)}</p>
 ${Ve?`<details class="bay-connection-details" ${e?"open":""}><summary>Mechanical and electrical explanation</summary><div class="bay-route-summary"><div class="route-row"><strong>Movement</strong><span>Local motor driver and two dry linear actuators apply force through the silicone interface pad.</span></div><div class="route-row"><strong>Power and data</strong><span>Electrical connectors supply the bay electronics, heater and camera and carry identified test data.</span></div><div class="route-row"><strong>Sample</strong><span>Prepared patient and donor fractions remain in sealed disposable channels. No sample tubing connects bays.</span></div></div><p>${fe.config===16?"Each unit operates its own hardware. The inter-unit connection carries data only. ":""}This illustrates the proposed component arrangement. Mechanical travel, contact force and connector specifications still need validation.</p></details>`:""}`}function ti(n){Me("#toast").textContent=n,Me("#toast").classList.add("visible"),clearTimeout(jl),jl=setTimeout(()=>Me("#toast").classList.remove("visible"),4e3)}function Xv(){return Ji.find(n=>n.id===Ne.scenarioId)}function vs(){const n=ft(fe);Ne=n.engine,yc=li(n).filter(t=>t.required).every(t=>t.loaded),aa=n.loading.inserted,Zi=n.loading.inserting,nh=n.loading.insertionProgress}function Lt(n){return n.ok||ti(n.reason),vs(),Mt(),n.ok}function Js(){vs();const n=ft(fe),e=Kr(Ne,{sampleLoaded:yc,inserted:aa,inserting:Zi,explanationMode:Ve}),t=li(n).find(i=>i.required&&!i.loaded);return n.kit.status==="removed"?{...e,phase:"removed",title:"Prepare the next kit",instruction:"The used cartridge is out and its record is saved for review. Use a new cartridge for the next test.",action:"fresh-kit",actionLabel:"Prepare fresh cartridge",machine:{title:"Cartridge removed",status:"Bay ready for a fresh kit",lines:[`Bay ${n.bay}`,"Previous record retained","New cartridge required"],progress:0,tone:"neutral"}}:t&&!["blocked","review","authorised","handover"].includes(e.phase)?{...e,phase:"loading",title:`Load ${t.label.toLowerCase()}`,instruction:t.description,action:"load-next",actionLabel:`Load ${t.label.toLowerCase()}`,machine:{title:"Load prepared samples",status:`Bay ${n.bay} / ${wi(n).loadedCount} of ${wi(n).requiredCount} loaded`,lines:[Ne.patient.id,`Next: ${t.label}`,"Test materials already inside"],progress:0,tone:"neutral"}}:e}function sh(n){return n.engine.unavailableBays.includes(n.bay)?"Unavailable":n.engine.running?"Testing":n.loading.inserting?"Inserting":n.kit.status==="removed"?"Empty":n.kit.status==="used"?/Hold|Invalid/.test(n.engine.status)?"Investigate":"Result ready":n.engine.elapsed>0?"Paused":n.loading.inserted?"Ready to run":n.kit.status==="loaded"?"Loading":"Available"}function rh(){const n=fd(fe);return`<section class="bay-manager"><div class="bay-manager-heading"><h2>Testing bays</h2><button data-action="expand-bays" ${fe.config===16?"disabled":""}>${fe.config===8?"Connect another unit":"Add bays"}</button></div><div class="bay-grid ${fe.config>4?"many-bays":""}">${fe.sessions.map(e=>`<button class="bay-button" data-bay="${e.bay}" aria-pressed="${e.bay===fe.selectedBay}"><strong>Bay ${String(e.bay).padStart(2,"0")}</strong><small>${sh(e)}</small>${e.engine.elapsed>0&&e.engine.elapsed<600?`<span class="bay-mini-progress"><i style="width:${e.engine.elapsed/6}%"></i></span>`:""}</button>`).join("")}</div><small>${n.running} testing / ${fe.config} installed bays${n.resultsWaiting?` / ${n.resultsWaiting} awaiting review`:""}</small></section>`}function Yv(n){jt(Ne,n),Jr(fe,0),Mt()}function jv(n){const e=Lh(fe,n);Lt(e)&&(je="exterior",Pt="reset",us=!1,Mt())}function ah(n){Lt(Ah(fe,Number(n)))&&(Pt=kt&&je==="inside"?"connections":"reset",Ri=!1,Mt())}function Kv(){const n=Js().result;return{group:Ur(n.group||"Not reported"),screen:Ur(n.screen||"Not reported"),crossmatch:Ur(n.crossmatch||"Not requested")}}function Zv(){return{exterior:{mode:"device",cutaway:!1},inside:{mode:"device",cutaway:!0},cartridge:{mode:"cartridge",cutaway:!1},optics:{mode:"optics",cutaway:!1},dock:{mode:"dock",cutaway:!1}}[je]}function xc(){const n=Js(),e=Zv(),t=Yt==="explore"&&$r&&!Ne.running;Rn?.update({explanationMode:Ve,config:Ne.config,cartridge:Ne.cartridge,mode:e.mode,cutaway:e.cutaway,exploded:Yt==="explore"&&je!=="dock"&&us,view:Pt,selectedComponent:Yt==="explore"||Ri?$t.startsWith("reaction:")?"wells":$t:null,elapsed:t?gn:Ne.elapsed,running:Ne.running||An,stage:Hn(Ne),selectedBay:fe.selectedBay,sampleLoaded:yc,loadedFractions:ft(fe).loading,inserted:aa,insertionProgress:nh,kitUsed:ft(fe).kit.consumed,showConnections:kt,connectionKind:mn,connectionScope:Gn,dockSeparated:ei,kitPresent:ft(fe).kit.status!=="removed",showDimensions:Bn,bayStates:fe.sessions.map(s=>({bay:s.bay,cartridge:s.engine.cartridge,elapsed:s.engine.elapsed,running:s.engine.running,inserted:s.loading.inserted,insertionProgress:s.loading.insertionProgress,loadedFractions:s.loading,used:s.kit.consumed,kitPresent:s.kit.status!=="removed",kitId:s.kit.id,status:s.engine.status,group:s.engine.patient.group,reactions:rs(s.engine)})),machineDisplay:n.machine,flow:Ne.running||t,reactions:rs(t?{...Ne,elapsed:gn}:Ne),activeBays:Nh(fe)});const i=Me("#machine-screen");if(i){const s=n.machine,r=JSON.stringify([s.title,s.status,s.lines,Math.round(s.progress*100)]);i.dataset.signature!==r&&(i.dataset.signature=r,i.innerHTML=`<div class="physical-brand">HEMATRIX <span>BAY ${fe.selectedBay}</span></div><h2>${Ee(s.title)}</h2><strong>${Ee(s.status)}</strong><div class="physical-lines">${s.lines.map(o=>`<span>${Ee(o)}</span>`).join("")}</div>${Ne.running?`<div class="physical-progress"><i style="width:${Math.round(s.progress*100)}%"></i></div>`:""}`)}}function hn(){if(vs(),Me("#details-dialog").open&&ra==="lifecycle"){const s=wi(ft(fe));Me("#lifecycle-kit-id")&&(Me("#lifecycle-kit-id").textContent=s.id),Me("#lifecycle-kit-status")&&(Me("#lifecycle-kit-status").textContent=bc(s.status))}Jv();const n=Js(),e=Mi[Hn(Ne)];Me("#instrument-title").textContent=Ne.config===16?"HemaTrix Distributed":Ne.config===2?"HemaTrix Core":"HemaTrix Expanded",Me("#configuration-label").textContent=Ne.config===16?"Two connected eight-bay units":`${fe.config} bays / Bay ${fe.selectedBay} selected`;let t=n.title,i=n.instruction;je==="inside"&&(t=kt?"How the parts connect":"Inside the machine",i=kt?Gn==="system"?"See how each bay connects to power and the machine screen. Select a bay to look closer.":"Follow the selected bay from its rear connector to the cartridge.":Ne.running?Ve?e.description:n.instruction:"Drag to turn the machine. Select Connections to see how the parts work together."),je==="dock"&&(t=`Bay ${fe.selectedBay} cartridge ${Ve?"dock":"holder"}`,i="Look at the contact points, then fit the cartridge in place."),je==="cartridge"&&(t=vn[Ne.cartridge].name,i=Ne.running?Ve?e.description:n.instruction:"Follow the prepared samples through separate paths inside the cartridge."),je==="optics"&&(t="From reaction to result",i="A light and camera show whether cells stay separate or clump together. Staff review what the reactions mean."),Me("#scene-caption-title").textContent=t,Me("#scene-caption").textContent=i,Me("#model-legend").hidden=je!=="cartridge",document.querySelectorAll("[data-view]").forEach(s=>{s.classList.toggle("active",s.dataset.view===je),s.setAttribute("aria-pressed",String(s.dataset.view===je))}),document.querySelectorAll(".explore-only").forEach(s=>s.hidden=Yt!=="explore"),Me("#camera").value=Pt,Me("#labels-toggle").textContent=Tn?"Hide labels":"Show labels",Me("#labels-toggle").setAttribute("aria-pressed",Tn),Me("#dimensions-toggle").setAttribute("aria-pressed",Bn),Me("#connections-toggle").setAttribute("aria-pressed",kt&&["inside","dock"].includes(je)),$v(),i_(),xc()}function Mt(){vs(),document.body.classList.toggle("explanation-mode",Ve),Me("#explanation-toggle").setAttribute("aria-pressed",String(Ve)),Me("#explanation-state").textContent=Ve?"On":"Off",document.querySelectorAll("[data-nav]").forEach(n=>{n.classList.toggle("active",n.dataset.nav===Yt),n.setAttribute("aria-current",n.dataset.nav===Yt?"page":"false")}),Ys(),hn(),Me("#review-dialog").open&&oa(),Me("#details-dialog").open&&ch()}function Jv(){const n=fd(fe);document.querySelectorAll("[data-bay]").forEach(t=>{const i=fe.sessions.find(r=>r.bay===Number(t.dataset.bay));if(!i)return;t.querySelector("small").textContent=sh(i);let s=t.querySelector(".bay-mini-progress");i.engine.elapsed>0&&i.engine.elapsed<600?(s||(s=document.createElement("span"),s.className="bay-mini-progress",s.innerHTML="<i></i>",t.appendChild(s)),s.firstChild.style.width=`${i.engine.elapsed/6}%`):s?.remove()});const e=Me(".bay-manager>small");e&&(e.textContent=`${n.running} testing / ${fe.config} installed bays${n.resultsWaiting?` / ${n.resultsWaiting} awaiting review`:""}`)}function Ys(){Xs?.dispose(),Xs=null,vs();const n=!!Me("#controls .setup-options")?.open,e=!!Me("#controls .history-list")?.open,t=Me("#controls");if(Yt==="explore"){Qv(t);return}const i=Js(),s=ft(fe),r=wi(s),o=Ne.elapsed>=600&&s.kit.status!=="removed",a=Kv(),l=r.status!=="fresh",c=li(s).filter(d=>d.required);t.innerHTML=`${rh()}<section class="workflow-card"><span class="step-label">${o?"RESULT":Zi?"LOADING":`BAY ${fe.selectedBay} / NEXT ACTION`}</span><h2>${Ee(i.title)}</h2><p>${Ee(i.instruction)}</p><button class="primary-action" data-action="${i.action}" ${Zi?"disabled":""}>${ci(i.action==="load-next"?"drop":i.action==="insert"?"insert":Ne.running?"pause":i.action==="review"?"eye":"play")}<span>${Ee(Zi?"Inserting cartridge":i.actionLabel)}</span></button>${Ne.running?'<button class="text-button" data-action="review">View test progress</button>':""}</section><div class="fraction-list">${c.map(d=>`<button class="fraction-row" data-fraction="${d.id}" ${d.loaded||aa||r.consumed||r.status==="removed"||Zi?"disabled":""}><span class="fraction-swatch ${d.id}"></span><span><strong>${d.label}</strong><small>${d.id==="donor-cells"?Ee(Ne.donorId):Ee(Ne.patient.id)}</small></span><span class="fraction-state">${d.loaded?"Loaded":"Load"}</span></button>`).join("")}</div><p class="fraction-note">Use the samples already prepared by the laboratory. Plasma is the liquid part of blood.</p>${o?`<section class="on-machine-results"><div class="result-heading"><h3>Test result</h3><button class="text-button" data-action="screen-view">Enlarge</button></div><dl class="result-values"><div><dt>Blood group</dt><dd>${Ee(a.group)}</dd></div>${Ne.cartridge!=="match"?`<div><dt>Antibody check</dt><dd>${Ee(a.screen)}</dd></div>`:""}${Ne.cartridge!=="type"?`<div><dt>Donor check</dt><dd>${Ee(a.crossmatch)}</dd></div>`:""}</dl></section>`:""}<section class="kit-card"><h3>${r.status==="removed"?"Cartridge removed":r.consumed?"Replace used cartridge":"One cartridge per test"}</h3><div class="kit-id">${Ee(r.id)} ${qr(bc(r.status),r.consumed?"warning":"neutral")}</div><p>${r.status==="removed"?"Discard the sealed used cartridge and transfer tips through the laboratory waste process. Keep the machine and bay for the next test.":r.consumed?"The used sample and test materials stay inside this cartridge. Remove it and use a new cartridge for the next test.":"The cartridge contains the test materials and keeps used liquid inside. It is replaced after one test."}</p><div class="kit-actions">${r.canUnload?`<button data-action="unload-kit">${r.consumed?"Remove used cartridge":"Remove loaded cartridge"}</button>`:""}<button class="text-button" data-action="lifecycle">What do I replace after a test?</button></div></section><details class="setup-options" ${n?"open":""}><summary>Choose test and example settings</summary><div class="case-field"><label for="scenario">Example in bay ${fe.selectedBay}</label><select id="scenario" ${l?"disabled":""}>${Ji.filter(d=>d.id!=="volume").map(d=>`<option value="${d.id}" ${d.id===Ne.scenarioId?"selected":""}>${Ee(d.title)}</option>`).join("")}</select><p class="case-description">${Ee(Xv().subtitle)}</p></div><label for="cartridge">Test cartridge</label>${oh("cartridge",l)}<p>${Ee(vn[Ne.cartridge].description)}</p>${Ne.cartridge!=="type"?`<label for="donor">Donor unit</label><select id="donor" ${l?"disabled":""}>${js.map(d=>`<option value="${d.id}" ${d.id===Ne.donorId?"selected":""}>${d.id} / ${d.group}${Ve&&d.antigens.includes("K")?" / K positive":""}</option>`).join("")}</select>`:""}<label for="speed">Playback speed</label><select id="speed"><option value="10" ${ks===10?"selected":""}>Slow</option><option value="20" ${ks===20?"selected":""}>Standard</option><option value="60" ${ks===60?"selected":""}>Fast</option></select>${Ve?'<button class="text-button" data-action="details">Inspect checks and test issues</button>':""}</details>${s.history.length?`<details class="history-list" ${e?"open":""}><summary>Previous test records (${s.history.length})</summary>${s.history.map((d,h)=>`<button class="history-record" data-history="${h}">${Ee(d.kit.id)} / ${Ee(d.engine.patient.id)}<small>${Ee(Kr(d.engine,{sampleLoaded:!0,inserted:!0,explanationMode:Ve}).machine.title)}</small></button>`).join("")}</details>`:""}${Ne.scenarioId==="massive"?'<p class="emergency-note">Emergency release continues independently while this test runs.</p>':""}`}function oh(n,e=!1){return`<select id="${n}" ${e?"disabled":""}>${Object.entries(vn).map(([t,i])=>`<option value="${t}" ${t===Ne.cartridge?"selected":""}>${Ee(i.name)} / RM${i.price}</option>`).join("")}</select>`}function Qv(n){const e=lh($t),t=fe.config===16?2*(9900+6*2200):9900+(fe.config-2)*2200;if(n.innerHTML=`${rh()}<div class="explore-intro"><span class="step-label">EXPLORE</span><h2>Get to know the machine</h2><p>Choose a part or click it on the model.${Ve?" Detailed explanations are on.":" Turn on Explanation mode for the engineering and test details."}</p></div>
 <label for="component">Choose a part</label><select id="component">${Ai.some(i=>i.id===$t)?"":`<option value="${$t}" selected>${Ee(Ns(e))}</option>`}${Ai.map(i=>`<option value="${i.id}" ${i.id===$t?"selected":""}>${Ee(Ns(i))}</option>`).join("")}</select>
 <section class="component-info"><h2>${Ee(Ns(e))}</h2><p>${Ee(th(e))}</p>${Ve?`<details class="technical-details" open><summary>How it works</summary><p>${Ee(e.why||"")}</p><p>${Ee(e.process||"")}</p></details>`:""}${ih($t)}</section>
 ${je==="dock"?'<section class="explore-options"><h3>How the cartridge fits</h3><p>Use the controls above the model to look at the contact points or fit the cartridge back in place.</p></section>':je==="cartridge"?`<div class="explore-options"><label for="explore-cartridge">Choose a cartridge</label>${oh("explore-cartridge",ft(fe).kit.status!=="fresh")}<button class="primary-action" data-action="flow-play">${ci(An?"pause":"play")}<span>${An?"Pause sample view":"Follow the sample"}</span></button><label for="inspection-position">Sample position</label><input id="inspection-position" type="range" min="0" max="600" value="${gn}"><button class="text-button" data-action="flow-reset">Start sample view again</button></div>`:je==="optics"?`<div class="explore-options"><label for="pattern">What the camera sees</label><select id="pattern">${[["negative","Cells stay separate"],["positive","Cells clump together"],["weak","Small clumps"],["equivocal","Unclear reaction"],["bubble","Air bubble"],["illumination","Poor lighting"],["blur","Blurred image"]].map(([i,s])=>`<option value="${i}" ${i===As?"selected":""}>${s}</option>`).join("")}</select><div id="optical-field" class="optical-field"></div><div id="optical-interpretation"></div>${Ve?`<label class="checkbox-label"><input id="processed" type="checkbox" ${Yo?"checked":""}> Show image processing</label>`:""}</div>`:`<div class="explore-options"><button data-action="explode" class="${us?"active":""}">${us?"Put the machine together":"See the separate parts"}</button><label for="config">Number of testing bays</label><select id="config">${[2,4,8,16].map(i=>`<option value="${i}" ${i===Ne.config?"selected":""}>${i} bays${i===16?" / two machines":""}</option>`).join("")}</select></div>`}
 <section class="product-summary"><h3>Size and proposed price</h3><p class="product-price"><strong>RM${t.toLocaleString("en-MY")}</strong> for ${fe.config} bays${fe.config===16?" across two machines":""}.</p><p>The two-bay Core starts at RM9,900. Each added bay costs RM2,200. Installation and networking are extra.</p><table class="product-prices"><caption>Single-use cartridges</caption><tbody>${Object.values(vn).map(i=>`<tr><th scope="row">${Ee(i.name)}</th><td>RM${i.price}</td></tr>`).join("")}</tbody></table><div class="dimension-spec"><h3>Two-bay Core size</h3><dl><div><dt>Width</dt><dd>45 cm</dd></div><div><dt>Depth</dt><dd>35 cm</dd></div><div><dt>Height</dt><dd>30 cm</dd></div><div><dt>Weight target</dt><dd>Under 18 kg</dd></div></dl><p>Proposed design and selling prices.${fe.config>2?" Larger system sizes are not yet specified.":""} Use on a stable bench with power and trained laboratory staff.</p></div></section><div class="control-footer"><button data-nav="demonstrate">Use the machine</button></div>`,je==="optics"){Xs=new eh(Me("#optical-field")),Xs.update({pattern:As,mode:Ve&&Yo?"processed":"raw"});const i=Xo(As),s={negative:"The cells stay separate. The test and its checks determine what this means.",positive:"The cells clump together. Clumping has a different meaning in each test, so staff review the full result.",weak:"Only small clumps are visible. This needs further review.",equivocal:"The image is unclear. Do not treat it as a clear result.",bubble:"An air bubble can affect the image. The result needs investigation.",illumination:"The lighting makes this image unreliable.",blur:"The image is too blurred to read reliably."};Me("#optical-interpretation").innerHTML=Ve?`<strong>${Ee(i.classification)}</strong><p>${Ee(i.detail)}</p>`:`<p>${Ee(s[As])}</p>`}}function Zl(n=Ne){Mn=n,Fn=n.reviewNote||"",tn=n.reviewer||tn||"",oa(),Me("#review-dialog").showModal()}function oa(){Rs?.dispose(),Rs=null;const n=Mn||Ne,e=Kr(n,{sampleLoaded:!0,inserted:!0,explanationMode:Ve}),t=rs(n),i=t.find(d=>d.id===Nr)||t[0];Nr=i.id;const s=!!Me("#review-body .reaction-details")?.open,r=n.elapsed>=600,o=Ks(n),a=as(i,{explanationMode:Ve}),l=jr(n).map(d=>Fs(d,{explanationMode:Ve})),c=Object.entries({"Blood group":e.result.group,...n.cartridge!=="match"?{"Antibody check":e.result.screen}:{},...n.cartridge!=="type"?{"Donor check":e.result.crossmatch}:{}});Me("#review-body").innerHTML=`<div class="dialog-heading"><div><span class="step-label">${Ee(n.patient.id)} / ${Ee(vn[n.cartridge].name)}</span><h2>Test results</h2></div><button data-action="close-review" aria-label="Close results">${ci("close")}</button></div><div class="review-layout"><section><div class="review-summary">${qr(e.machine.title,e.machine.tone)}<p>${Ee(e.instruction)}</p><button class="text-button explanation-inline" data-action="explanation">${Ve?"Use plain language":"Explain these results"}</button></div>
 <dl class="result-values review-overview">${c.map(([d,h])=>`<div><dt>${d}</dt><dd>${Ee(Ur(h))}</dd></div>`).join("")}</dl>
 <details class="reaction-details" ${Ve||s?"open":""}><summary>${Ve?"Reaction evidence":"View individual test checks"} (${t.length})</summary><div class="reaction-cards">${t.map(d=>{const h=as(d,{explanationMode:Ve});return`<button class="reaction-card ${d.id===Nr?"active":""}" data-reaction="${d.id}"><span>${Ee(h.title)}</span><strong>${Ee(h.observation)}</strong></button>`}).join("")}</div><div class="review-evidence"><div id="review-microscope"></div><div><h3>${Ee(a.title)}</h3>${Ve?`<p>${Ee(a.input)} tested with ${Ee(a.reagent)}.</p>`:""}<strong>${Ee(a.meaning)}</strong></div></div></details>
 <details class="technical-details" ${e.phase==="blocked"?"open":""}><summary>${Ve?"Quality control findings":"Safety and test checks"}</summary><div class="qc-list">${l.map(d=>`<div class="qc-item"><strong>${Ee(d.name)}</strong>${qr(d.status==="pass"?"Passed":d.status==="fail"?"Action required":"Pending",d.status==="fail"?"danger":d.status==="pass"?"success":"neutral")}<p>${Ee(d.detail)}</p></div>`).join("")}</div></details></section>
 <aside class="review-actions"><h3>Staff review</h3><p>${o?"The test checks have passed. A qualified laboratory reviewer can approve this record.":r?"A qualified laboratory reviewer must investigate the unresolved findings. This result cannot be approved.":"Let the test finish before reviewing the full result."}</p><label for="operator">Reviewer ID</label><input id="operator" value="${Ee(tn)}" placeholder="Enter reviewer ID" maxlength="40"><label for="review-note">Review note</label><textarea id="review-note" rows="3">${Ee(Fn)}</textarea><button class="primary-action" data-action="authorise" ${!o||!tn.trim()?"disabled":""}>${Ve?"Authorise result":"Approve result"}</button><button data-action="hold">Hold for investigation</button><button data-action="repeat" ${n!==Ne?'disabled title="Use an available bay to repeat a previous test"':""}>Repeat test</button><button data-action="handover" ${!n.authorised||!n.network||n.handedOver?"disabled":""}>Confirm ward received result</button><button class="text-button" data-action="report">Download record</button><p class="review-limits">${n.network?"Result approval and ward receipt are separate from collecting blood and checking the patient at the bedside.":"The hospital connection is unavailable. The result has not been sent."}</p></aside></div>`,i.ready?(Rs=new eh(Me("#review-microscope")),Rs.update({reaction:i}),Ve||Me("#review-microscope canvas")?.setAttribute("aria-label",`Test image: ${a.observation}. Illustrative product image.`)):Me("#review-microscope").innerHTML='<div class="waiting-image">This image is not ready yet</div>'}function e_(){ra="technical",ch(),Me("#details-dialog").showModal()}function ch(){if(ra==="lifecycle"){dh();return}const n=jr(Ne).map(e=>Fs(e,{explanationMode:Ve}));Me("#details-body").innerHTML=`<div class="dialog-heading"><div><span class="step-label">${Ve?"EXPLANATION MODE":"TEST CHECKS"}</span><h2>Checks and activity</h2></div><button data-action="close-details" aria-label="Close test checks">${ci("close")}</button></div><div class="dialog-content">${Ve?`<p>Choose an issue to see how the machine responds. A test affected by a fault needs a fresh cartridge and a repeat run.</p><div class="fault-grid">${Za.map(e=>`<label class="fault-toggle"><input type="checkbox" data-fault="${e.id}" ${Ne.faults.includes(e.id)?"checked":""}><span>${Ee(e.name)}</span></label>`).join("")}<label class="fault-toggle"><input id="network-fault" type="checkbox" ${Ne.network?"":"checked"}><span>Disconnect hospital network</span></label></div><details class="technical-details"><summary>Event record</summary><div class="event-list">${[...Ne.audit].reverse().map(e=>`<p>${Ee(e.event).replace(/simulated/gi,"demonstration").replace(/simulation/gi,"demonstration")}</p>`).join("")}</div></details>`:`<div class="qc-list">${n.map(e=>`<div class="qc-item"><strong>${Ee(e.name)}</strong>${qr(e.status==="pass"?"Passed":e.status==="fail"?"Action required":"Pending",e.status==="fail"?"danger":e.status==="pass"?"success":"neutral")}<p>${Ee(e.detail)}</p></div>`).join("")}</div>`}</div>`}function Jl(n){const e=n||li(ft(fe)).find(i=>i.required&&!i.loaded)?.id;if(!e)return;const t=Rh(fe,e);Lt(t)&&e==="patient-plasma"&&ti("Patient plasma loaded. It stays separate from the red cells until the required tests.")}function t_(){const n=ft(fe),e=Ch(fe);if(!e.ok){Lt(e);return}n.loading.inserted=!1,n.loading.inserting=!0,n.loading.insertionProgress=0;const t=(n.animationToken||0)+1;n.animationToken=t,Mt();const i=performance.now();function s(r){t===n.animationToken&&(n.loading.insertionProgress=Math.min(1,(r-i)/1500),xc(),n.loading.insertionProgress<1?requestAnimationFrame(s):(n.loading.inserted=!0,n.loading.inserting=!1,Mt(),ti(`Cartridge locked in bay ${n.bay}. Ready to run.`)))}requestAnimationFrame(s)}function n_(){const n=ft(fe),e=wi(n);if(e.status==="removed"){Lt(Br(fe));return}if(e.canUnload){Lt(to(fe));return}if(n.engine.running){ti("Pause or complete this test before clearing its cartridge.");return}Lt(Br(fe))}function Ql(){Lt(Ph(fe))}function lh(n){const e=Ai.find(t=>t.id===n);if(e)return e;if(/^bay-\d+$/.test(n))return{name:`Testing bay ${n.slice(4)}`,simpleName:`Bay ${n.slice(4)}`,simpleDoes:"Holds one cartridge and runs its test. Other bays can keep working at the same time.",does:"This bay accepts one identified single-use cartridge and runs independently.",why:"Other occupied bays continue while this bay is loaded or reviewed.",process:"Each test retains its own sample identifiers, kit and result record."};if(n.startsWith("reaction:")){const t=rs(Ne).find(i=>i.id===n.slice(9));if(t){const i=as(t,{explanationMode:!1});return{name:t.name,simpleName:i.title,simpleDoes:i.meaning,does:`${t.input} is tested with ${t.reagent}.`,why:t.kind==="typing"?"This chamber contributes to blood grouping.":t.kind==="control"?"The reference response must match its expected pattern.":t.kind==="crossmatch"?"Patient plasma is tested against cells from the identified donor.":"Screening cells test for unexpected red-cell antibodies.",process:t.ready?t.interpretation:"This chamber has not been read yet."}}}return{name:"Selected part",simpleName:"Selected part",simpleDoes:"Choose a named part to find out what it does.",does:"Select a labelled part to inspect its role."}}function i_(){const n=Me("#part-info");if(n.hidden=!Ri,!Ri)return;const e=lh($t),t=JSON.stringify([$t,fe.selectedBay,ft(fe).kit.id,Hn(Ne),kt,mn,Gn,ei,Ve,e]);n.dataset.signature!==t&&(n.dataset.signature=t,n.innerHTML=`<div class="part-info-panel"><div><h3>${Ee(Ns(e))}</h3><button data-action="close-part" aria-label="Close part information">${ci("close",16)}</button></div><p>${Ee(th(e))}</p>${Ve?`${e.why?`<p>${Ee(e.why)}</p>`:""}${e.process?`<p>${Ee(e.process)}</p>`:""}${e.dimension?`<strong>${Ee(e.dimension)}</strong>`:""}`:""}${ih($t)}${Ve?"":'<button class="text-button explanation-inline" data-action="explanation">Show the explanation</button>'}</div>`)}function jo(n){/^bay-\d+$/.test(n)&&ah(Number(n.slice(4))),$t=n,Ri=!0,Yt==="explore"&&!/^bay-\d+$/.test(n)&&Ys(),hn()}function s_(){ra="lifecycle",dh(),Me("#details-dialog").showModal()}function dh(){const n=wi(ft(fe));Me("#details-body").innerHTML=`<div class="dialog-heading"><div><span class="step-label">AFTER USE</span><h2>What do I replace?</h2></div><button data-action="close-details" aria-label="Close after-use guide">${ci("close")}</button></div><div class="lifecycle-content"><p class="lifecycle-intro">Use a new cartridge and transfer tips for each test. Keep the machine and its testing bays.</p><ol class="lifecycle-steps"><li><strong>Keep used liquid inside</strong><p>The sample and used test materials stay sealed inside the cartridge.</p></li><li><strong>Keep the test record</strong><p>Patient and donor details, test images and staff review stay linked to the cartridge number.</p></li><li><strong>Discard the cartridge and tips</strong><p>Use the laboratory's waste process. Do not refill or reuse a used cartridge or transfer tip.</p></li><li><strong>Prepare the next test</strong><p>After the required checks, load prepared samples into a new cartridge. The screen, cameras, lights, heaters and moving parts are reused.</p></li></ol><section class="lifecycle-next"><h3>Checking another donor</h3><p>When the patient's earlier tests are still valid and reviewed, Match Only checks the next donor using patient plasma and that donor's red cells.</p></section><p class="lifecycle-current">Current cartridge: <strong id="lifecycle-kit-id">${Ee(n.id)}</strong> / <span id="lifecycle-kit-status">${Ee(bc(n.status))}</span></p>${Ve?'<details class="technical-details"><summary>Design and procedure notes</summary><p>The proposed reusable bay uses dry mechanical actuators. The sample-contact channels, assay materials and contained waste remain in the single-use cartridge. Preparation, volumes, containment and maintenance require validation and hospital procedures.</p></details>':""}</div>`}function r_(n){je=n,Pt="reset",$t=n==="cartridge"?"cartridge":n==="optics"?"optics":n==="inside"?"pumps":"enclosure",Mt()}function a_(n){Yt=n,history.replaceState(null,"",`#${Yt}`),Yt==="demonstrate"&&je==="optics"&&(je="exterior"),Mt()}function o_(){const n=Mn||Ne,e=fe.sessions.flatMap(r=>r.history).find(r=>r.engine===n),t=e?.kit.id||ft(fe).kit.id,i=["HEMATRIX TEST RECORD","Product demonstration record. Not a clinical report.","",`Patient: ${n.patient.id}`,`Bay: ${n.bay||fe.selectedBay}`,`Kit ID: ${t}`,`Cartridge: ${vn[n.cartridge].name}`,`Status: ${Kr(n,{sampleLoaded:!0,inserted:!0,explanationMode:Ve}).machine.title}`,`Reviewer: ${n.reviewer||"Awaiting review"}`,...rs(n).map(r=>{const o=as(r,{explanationMode:Ve});return`${o.title}: ${o.meaning}`}),"",...jr(n).map(r=>{const o=Fs(r,{explanationMode:Ve});return`${o.name}: ${o.status}`})],s=document.createElement("a");s.href=URL.createObjectURL(new Blob([i.join(`
`)],{type:"text/plain"})),s.download=`HemaTrix_${n.patient.id}_record.txt`,s.click(),setTimeout(()=>URL.revokeObjectURL(s.href),1e3)}Me("#app").addEventListener("click",async n=>{const e=n.target.closest("button");if(!e||e.disabled)return;if(e.dataset.connectionScope){const i=e.dataset.connectionScope;kt=!0,Ri=!1,i==="dock"?(je="dock",Pt="reset",mn=null,Tn=!0,$t="bay-dock"):(Gn=i,je="inside",Pt="connections"),Mt();return}if(e.dataset.connectionKind){mn=e.dataset.connectionKind==="all"?null:e.dataset.connectionKind,hn();return}if(e.dataset.linkedPart){kt=!0,mn=null;const i=Ai.find(s=>s.id===e.dataset.linkedPart);i?.view==="inside"&&(Gn="system"),je=i?.view==="dock"?"dock":"inside",Pt=je==="dock"?"reset":"connections",je==="dock"&&(Tn=!0),jo(e.dataset.linkedPart);return}if(e.dataset.bay){ah(e.dataset.bay);return}if(e.dataset.fraction){Jl(e.dataset.fraction);return}if(e.dataset.component){jo(e.dataset.component);return}if(e.dataset.history!==void 0){Zl(ft(fe).history[Number(e.dataset.history)].engine);return}if(e.dataset.nav){a_(e.dataset.nav);return}if(e.dataset.view){r_(e.dataset.view);return}if(e.dataset.reaction){Nr=e.dataset.reaction,tn=Me("#operator")?.value||tn,Fn=Me("#review-note")?.value||Fn,oa();return}const t=e.dataset.action;if(t==="explanation"){tn=Me("#operator")?.value||tn,Fn=Me("#review-note")?.value||Fn,Ve=!Ve,Mt();return}if(t==="load"||t==="load-next"){Jl();return}if(t==="insert"){t_();return}if(t==="start"){Ql();return}if(t==="resume"){Ne.running?Lt(Dh(fe)):Ql();return}if(t==="dock-separate"){ei=!ei,hn();return}if(t==="connections"){kt=!(kt&&["inside","dock"].includes(je)),kt?(je="inside",Gn="system",Pt="connections"):je==="dock"&&(je="inside",Pt="reset"),Mt();return}if(t==="reset"){n_();return}if(t==="expand-bays"){const i=[2,4,8,16].find(s=>s>fe.config);i&&Lt(pd(fe,i));return}if(t==="labels"){Tn=!Tn,hn();return}if(t==="dimensions"){Bn=!Bn,hn();return}if(t==="close-part"){Ri=!1,hn();return}if(t==="unload-kit"){Lt(to(fe));return}if(t==="fresh-kit"){Lt(Br(fe));return}if(t==="lifecycle"){s_();return}if(t==="review"){Zl();return}if(t==="details"){e_();return}if(t==="close-review"){Me("#review-dialog").close(),Mn=null;return}if(t==="close-details"){Me("#details-dialog").close();return}if(t==="screen-view"){je="exterior",Pt="screen",Mt(),Rn.setView("screen");return}if(t==="close-screen"){Pt="reset",Rn.setView("reset"),hn();return}if(t==="reset-camera"){Pt="reset",Rn.setView("reset"),Me("#camera").value="reset",hn();return}if(t==="fullscreen"){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen()}catch{ti("Full screen is not available in this browser.")}return}if(t==="explode"){us=!us,Mt();return}if(t==="flow-play"){$r=!0,An=!An,gn>=600&&(gn=0),Mt();return}if(t==="flow-reset"){$r=!0,An=!1,gn=0,Mt();return}if(["authorise","hold"].includes(t)){if(tn=Me("#operator").value.trim(),Fn=Me("#review-note").value,!tn){ti("Enter a reviewer ID.");return}jt(Mn||Ne,{type:"review",decision:t,operator:tn,note:Fn}),Jr(fe,0),Mt();return}if(t==="repeat"){if(Mn&&Mn!==Ne){ti("Use an available bay and a fresh kit to repeat a retained record.");return}Me("#review-dialog").close(),Mn=null;const i=wi(ft(fe));i.canUnload?Lt(to(fe)):i.status==="removed"?Lt(Br(fe)):ti("Complete or pause the active run before replacing its kit.");return}if(t==="handover"){jt(Mn||Ne,{type:"handover"}),Mt();return}if(t==="report"){o_();return}});Me("#app").addEventListener("change",n=>{const e=n.target;if(e.id==="scenario"){jv(e.value);return}if(e.id==="cartridge"||e.id==="explore-cartridge"){Lt(Ih(fe,e.value));return}if(e.id==="donor"){Lt(Uh(fe,e.value));return}if(e.id==="speed"){ks=Number(e.value);return}if(e.id==="camera"){Pt=e.value,Pt==="connections"&&(kt=!0,je="inside"),Rn.setView(Pt),hn();return}if(e.id==="component"){$t=e.value;const t=Ai.find(i=>i.id===e.value);je=t?.view||(["cartridge","inlet","channels","reagents","wells","waste","donor","patient-cells","patient-plasma","donor-cells"].includes(e.value)||e.value.startsWith("reaction:")?"cartridge":e.value==="optics"?"optics":"inside"),Pt="reset",je==="dock"?(kt=!0,Tn=!0):t?.view==="inside"&&(kt=!0,Gn="system",Pt="connections"),Mt();return}if(e.id==="config"){Lt(pd(fe,Number(e.value)));return}if(e.id==="pattern"){As=e.value,Ys();return}if(e.id==="processed"){Yo=e.checked,Ys();return}if(e.dataset.fault){jt(Ne,{type:"fault",id:e.dataset.fault,enabled:e.checked}),Jr(fe,0),Mt();return}if(e.id==="network-fault"){Yv({type:"network",connected:!e.checked});return}});Me("#app").addEventListener("input",n=>{if(n.target.id==="inspection-position"&&($r=!0,An=!1,gn=Number(n.target.value),xc()),n.target.id==="operator"){tn=n.target.value;const e=Me('[data-action="authorise"]');e&&(e.disabled=!Ks(Mn||Ne)||!tn.trim())}n.target.id==="review-note"&&(Fn=n.target.value)});for(const n of["review-dialog","details-dialog"])Me("#"+n).addEventListener("click",e=>{if(e.target.id===n){const t=e.target.getBoundingClientRect();(e.clientX<t.left||e.clientX>t.right||e.clientY<t.top||e.clientY>t.bottom)&&e.target.close()}});Rn=new Gv(Me("#viewer"),{onSelect:n=>jo(n)});const Qs=document.createElement("div");Qs.id="machine-screen";Qs.className="physical-screen";Qs.setAttribute("role","group");Qs.setAttribute("aria-label","Machine display");Me("#viewer").appendChild(Qs);const Xr=document.createElement("div");Xr.id="part-labels";Me("#viewer").appendChild(Xr);const is=document.createElementNS("http://www.w3.org/2000/svg","svg");is.id="dimension-lines";is.setAttribute("aria-hidden","true");Me("#viewer").appendChild(is);const Yr=document.createElement("div");Yr.id="dimension-labels";Me("#viewer").appendChild(Yr);let ed=0,td="";function c_(){const n=Me("#viewer").clientWidth,e=Me("#viewer").clientHeight;if(Xr.hidden=!Tn,Yr.hidden=!Bn,is.hidden=!Bn,!Tn&&!Bn)return;const t=[];let i="",s="";if(Tn)for(const c of Rn.labelAnchors?.()||[]){if(!c.visible)continue;if(kt&&je==="inside"){const g=new Set($s.filter(u=>u.kind!=="manual"&&(!mn||u.kind===mn)).flatMap(u=>[u.from,u.to,...Array.isArray(u.via)?u.via:[u.via]].filter(Boolean))),f=/^bay-\d+$/.test(c.id)?"bays":c.id;if(!g.has(f)||Gn==="selected"&&/^bay-\d+$/.test(c.id)&&Number(c.id.slice(4))!==fe.selectedBay)continue}const d=Math.min(n<500?180:220,Math.max(86,c.name.length*7.1+22)),h=c.name.length>24?44:34,m=[[0,-24],[0,24],[85,0],[-85,0],[0,-52],[0,52],[120,-40],[-120,40]];let p,v=1/0;for(const[g,f]of m){const u=Math.max(d/2+6,Math.min(n-d/2-6,c.x+g)),E=Math.max(h/2+6,Math.min(e-h/2-6,c.y+f));let w=0;for(const C of t)w+=Math.max(0,(C.w+d)/2-Math.abs(C.x-u))*Math.max(0,(C.h+h)/2-Math.abs(C.y-E));const x=w*20+Math.abs(g)+Math.abs(f);x<v&&(v=x,p={x:u,y:E,w:d,h})}t.push(p),s+=`<line x1="${c.x}" y1="${c.y}" x2="${p.x}" y2="${p.y}" stroke="#87928b" stroke-width="1"/>`,i+=`<button class="part-label" data-component="${Ee(c.id)}" style="left:${Math.round(p.x)}px;top:${Math.round(p.y)}px;width:${d}px;min-height:${h}px" title="${Ee(c.name)}">${Ee(c.name)}</button>`}const r=Bn?Rn.dimensionAnchors?.()||[]:[];let o="",a="";for(const c of r)c.visible&&(o+=`<span class="dimension-label" style="left:${Math.round(c.x)}px;top:${Math.round(c.y)}px">${Ee(c.text)}</span>`,c.line&&(a+=`<line x1="${c.line.x1}" y1="${c.line.y1}" x2="${c.line.x2}" y2="${c.line.y2}" stroke="#414844" stroke-width="1.3"/><path d="M${c.line.x1-4} ${c.line.y1-4}l8 8M${c.line.x2-4} ${c.line.y2-4}l8 8" stroke="#414844" fill="none"/>`));const l=i+"|"+s+"|"+o+"|"+a;l!==td&&(td=l,Xr.innerHTML=`<svg viewBox="0 0 ${n} ${e}" aria-hidden="true">${s}</svg>`+i,Yr.innerHTML=o+(Bn?`<span class="dimension-note">${je==="cartridge"?"Cartridge size is not yet specified. Select Machine to see the Core size.":je==="optics"?"Individual camera and light sizes are not yet specified.":je==="dock"?"Cartridge holder and connector sizes are not yet specified.":fe.config>2?"Size shown is for the two-bay Core. Larger sizes are not yet specified.":"Proposed Core size. Final measurements are not yet available."}</span>`:""),is.setAttribute("viewBox",`0 0 ${n} ${e}`),is.innerHTML=a)}function hh(){const n=performance.now();n-ed>90&&(ed=n,c_());const e=Rn.screenAnchor?.(),t=Me("#machine-screen");if(!e?.visible||je==="inside"||je==="cartridge"||je==="optics")t.hidden=!0;else{t.hidden=!1;const[i,s,r,o]=[e.corners[1],e.corners[2],e.corners[3],e.corners[0]],a=s.x-r.x,l=o.x-r.x,c=i.x-s.x+r.x-o.x,d=s.y-r.y,h=o.y-r.y,m=i.y-s.y+r.y-o.y,p=a*h-l*d;let v=0,g=0;Math.abs(p)>1e-8&&(v=(c*h-l*m)/p,g=(a*m-c*d)/p);const f=s.x-i.x+v*s.x,u=o.x-i.x+g*o.x,E=s.y-i.y+v*s.y,w=o.y-i.y+g*o.y;t.style.transform=`matrix3d(${f/640},${E/640},0,${v/640},${u/226},${w/226},0,${g/226},0,0,1,0,${i.x},${i.y},0,1)`}requestAnimationFrame(hh)}Mt();hh();let nd=performance.now();setInterval(()=>{const n=performance.now(),e=Math.min(1,(n-nd)/1e3);nd=n;let t=!1;if(fe.sessions.some(i=>i.engine.running)&&(Jr(fe,e*ks),vs(),t=!0),An&&Yt==="explore"){gn=Math.min(600,gn+e*50),gn>=600&&(An=!1);const i=Me("#inspection-position");i&&(i.value=gn),t=!0}if(t){hn();const i=Js(),s=[Yt,fe.selectedBay,i.phase,Ne.status,Hn(Ne),An,fe.sessions.map(r=>r.kit.status).join("-")].join("|");s!==Kl&&(Kl=s,Ys(),Me("#review-dialog").open&&oa())}},120);window.addEventListener("hashchange",()=>{Yt=location.hash==="#explore"?"explore":"demonstrate",Mt()});window.addEventListener("beforeunload",()=>{Rn.dispose(),Rs?.dispose(),Xs?.dispose()});
