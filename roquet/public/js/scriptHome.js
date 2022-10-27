
let bd = document.getElementById('body');
let chercher = document.getElementById('chercher');
let conversation = document.getElementById('conversation');
let statut = document.getElementById('statut');
let tourne = document.getElementById('tourne')
statut.addEventListener('click',()=>{
    statut.style.transition = 1 + 's';
    tourne.style.transform = 'rotate('+ 300 + 'deg)';
    setTimeout(() => {
        tourne.style.transform = 'rotate('+ 0 + 'deg)';
    }, 1000);
});
let sms = document.getElementById('sms');
let publie = document.getElementById('publie');
publie.addEventListener('keydown',(e)=>{
    if(e.key == "Enter"){
        socket.emit('chat message', ['publie',publie.value])
        publie.value = '';
    }
})
let moi = document.getElementById('moi');
conversation.style.background = 'rgba(155, 197, 162)';
bd.style.background = 'rgba(155, 197, 162)';
conversation.style.border = 'solid 6px rgba(155, 197, 162)';
conversation.style.marginBottom = 12 +'vh';
moi.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'hidden';
    publie.style.visibility = 'hidden';
    sms.style.visibility = 'hidden';
    sms.style.opacity = 0 + '%';
    publie.style.opacity = 0 + '%';
    moi.style.marginBottom = 12 +'vh';
    moi.style.background = 'rgba(197, 155, 155)';
    bd.style.background = 'rgba(197, 155, 155)';
    moi.style.border = 'solid 6px rgba(197, 155, 155)';
    statut.style.marginBottom = 1.5 +'vh';
    statut.style.border = 'none';
    statut.style.background = 'rgb(250,250,250)';
    conversation.style.background = 'rgb(250,250,250)';
    conversation.style.marginBottom = 1.5 +'vh';
    conversation.style.border = 'none';
    chercher.style.background = 'rgb(250,250,250)';
    chercher.style.marginBottom = 1.5 +'vh';
    chercher.style.border = 'none';
    document.getElementById('membre').style.visibility = 'hidden';
});
statut.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'hidden';
    publie.style.visibility = 'visible';
    sms.style.visibility = 'visible';
    publie.style.opacity = 100 + '%';
    sms.style.opacity = 100 + '%';
    statut.style.background = 'rgba(155, 185, 197)';
    bd.style.background = 'rgba(155, 185, 197)';
    statut.style.border = 'solid 6px rgba(155, 185, 197)';
    statut.style.marginBottom = 12 +'vh';
    moi.style.marginBottom = 1.5 +'vh';
    moi.style.border = 'none';
    moi.style.background = 'rgb(250,250,250)';
    conversation.style.background = 'rgb(250,250,250)';
    conversation.style.marginBottom = 1.5 +'vh';
    conversation.style.border = 'none';
    chercher.style.background = 'rgb(250,250,250)';
    chercher.style.marginBottom = 1.5 +'vh';
    chercher.style.border = 'none';
    document.getElementById('membre').style.visibility = 'hidden';
});
conversation.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'visible';
    publie.style.visibility = 'hidden';
    sms.style.visibility = 'hidden';
    sms.style.opacity = 0 + '%';
    publie.style.opacity = 0 + '%';
    conversation.style.background = 'rgba(155, 197, 162)';
    bd.style.background = 'rgba(155, 197, 162)';
    conversation.style.border = 'solid 6px rgba(155, 197, 162)';
    conversation.style.marginBottom = 12 +'vh';
    moi.style.background = 'rgb(250,250,250)';
    moi.style.marginBottom = 1.5 +'vh';
    moi.style.border = 'none';
    statut.style.marginBottom = 1.5 +'vh';
    statut.style.border = 'none';
    statut.style.background = 'rgb(250,250,250)';
    chercher.style.background = 'rgb(250,250,250)';
    chercher.style.marginBottom = 1.5 +'vh';
    chercher.style.border = 'none';
    document.getElementById('membre').style.visibility = 'hidden';
});
chercher.addEventListener('click',()=>{
    document.getElementById('souscription').style.visibility = 'hidden';
    publie.style.visibility = 'hidden';
    sms.style.visibility = 'hidden';
    sms.style.opacity = 0 + '%';
    publie.style.opacity = 0 + '%';
    chercher.style.background = 'rgba(197, 194, 155)';
    bd.style.background = 'rgba(197, 194, 155)';
    chercher.style.border = 'solid 6px rgba(197, 194, 155)';
    chercher.style.marginBottom = 12 +'vh';
    moi.style.background = 'rgb(250,250,250)';
    moi.style.marginBottom = 1.5 +'vh';
    moi.style.border = 'none';
    statut.style.marginBottom = 1.5 +'vh';
    statut.style.border = 'none';
    statut.style.background = 'rgb(250,250,250)';
    conversation.style.background = 'rgb(250,250,250)';
    conversation.style.marginBottom = 1.5 +'vh';
    conversation.style.border = 'none';
    document.getElementById('membre').style.visibility = 'visible';
});
let users = [];
let z = 0;
let sous = document.createElement('div');
sous.setAttribute('id','souscription');
bd.appendChild(sous);
socket.on('chat message', (msg)=> {
    if(msg[0] == 'moi'){
        my = msg[1];
    }
    if(msg[0] == 'sms'){
        
    }
    if(msg[0] == 'publie'){
        let s = document.createElement('div');
        s.textContent = msg[1];
        sms.appendChild(s);
    }
    if(msg[0] == 'nombre'){
        if(users.length == 0){
            users = msg[1];
            let membre = document.createElement('div');
            membre.setAttribute('id','membre');
            membre.style.transition = 0;
            for(i in users[0]){
                let gens = document.createElement('div');
                gens.setAttribute('class','profile');
                gens.setAttribute('id',`${users[0][i]}`);
                gens.style.background = `rgb(${parseInt(Math.random()*255)},${parseInt(Math.random()*255)},${parseInt(Math.random()*255)})`;
                gens.textContent = users[0][i][0];
                membre.appendChild(gens);
                z++;
                let change = 0;
                gens.addEventListener('click',()=>{
                    if(change == 0){
                        let lui = document.createElement('div');
                        lui = gens;
                        sous.appendChild(lui);
                        change = 1;
                    }
                    else{
                        socket.emit('chat message', ['sms','destinateur','message']);
                    }
                });
            }
            bd.appendChild(membre);
        }
    }
});