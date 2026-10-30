document.getElementById('year').textContent=new Date().getFullYear();
const form=document.getElementById('leadForm');const status=document.getElementById('status');
form.addEventListener('submit',async(e)=>{e.preventDefault();if(!form.reportValidity())return;
const btn=form.querySelector('button[type=submit]');btn.disabled=true;status.textContent='Invio in corso…';
const contact=form.elements.namedItem("contact").value.trim();const isEmail=contact.includes('@');
const payload={nome:form.elements.namedItem("name").value.trim(),azienda:form.elements.namedItem("business").value.trim(),email:isEmail?contact:null,telefono:isEmail?null:contact,sito_web:form.elements.namedItem("website").value.trim(),servizio:form.elements.namedItem("need").value,consenso_privacy:form.querySelector('#consent').checked,website_confirm:form.elements.namedItem("company_url").value,provenienza:'landing_mws',utm_source:new URLSearchParams(location.search).get('utm_source')||''};
try{const r=await fetch(window.MWS_CONFIG.endpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});if(!r.ok)throw new Error('Invio non riuscito');status.textContent='Richiesta inviata! Ti ricontatteremo presto.';form.reset();}catch(err){status.textContent='Non è stato possibile inviare la richiesta. Riprova più tardi.';}finally{btn.disabled=false;}
});
