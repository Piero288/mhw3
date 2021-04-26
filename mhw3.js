
for(const c of contenuto){
    const contenitore = document.querySelector('#contenitore');
    const box = document.createElement('div');
    box.classList.add('contenuto');
    box.classList.add('cerca');
    box.setAttribute('data-index', c.ind)
    contenitore.appendChild(box);
    const immagine = document.createElement('img');
    immagine.src=c.image;
    box.appendChild(immagine);
    const box_titolo_pref = document.createElement('div');
    box_titolo_pref.classList.add('testobox');
    box.appendChild(box_titolo_pref);
    const titolo=document.createElement('h1');
    titolo.textContent=c.titolo;
    box_titolo_pref.appendChild(titolo);
    const pref=document.createElement('img');
    pref.src="cuore.png";
    pref.classList.add('img_pref');
    pref.setAttribute('data-preferiti', '0');
    box_titolo_pref.appendChild(pref);
    const pdettagli = document.createElement('p');
    pdettagli.textContent = "Mostra maggiori dettagli";
    box.appendChild(pdettagli);
    pdettagli.addEventListener('click', moreDetails);
}

function moreDetails(event){
    const p = event.currentTarget;         //recupero l'elemento che scatena l'evento
    const pn = p.parentNode;               //recupero il box che contiene l'elemento p che scatena l'evento
    const numbox=pn.dataset.index;         //mi ritorna l'indice associato al div preso da pn
    if(p.textContent==="Mostra maggiori dettagli"){
        p.textContent="Mostra meno dettagli";
        const descrizione=document.createElement('p');
        pn.appendChild(descrizione);
        descrizione.textContent=contenuto[numbox-1].descrizione;
        pn.appendChild(valori[numbox-1]);
        //pn devo appendere il paragrafo di v all'indice numbox-1 pn.appendChild(v[numbox-1])
        console.log(numbox);
    }
    else{
        p.textContent="Mostra maggiori dettagli";
        const p_descr = pn.querySelectorAll('p');
        p_descr[1].remove();               //rimuove il paragrafo di indice 1 all'interno del div
        pn.lastChild.remove();             //rimuove l'ultimo figlio appenso nel box
    }
}

const favourites = document.querySelectorAll('.testobox img');
for(const f of favourites){
    f.addEventListener('click', addFavourite)
}

function addFavourite(event){
    const f = event.currentTarget;              //vado a recuperare l'immagine cliccabile, cioè l'elemento che scatena l'evento che mi rimanda alla funzione
    const prodotto=f.parentNode.parentNode;     //vado a recuperare il box che contiene il div che contene la mia immagine cliccabile
    const ind = prodotto.dataset.index;         //così recupero l'index corrispondente

    const contenitore = document.querySelector('#preferiti');   //in "contenitore" metto il div con id preferiti
    const div_hidden = contenitore.parentNode;                  //così ho l'intera sezione preferiti

    if(f.dataset.preferiti==='0'){
        f.dataset.preferiti='1';
        f.src='addfavourite.jpg';
      
        const contenitore = document.querySelector('#preferiti');
        const box = document.createElement('div');
        box.classList.add('contenuto');
        box.setAttribute('data-index', ind)
        contenitore.appendChild(box);
        let immagine = document.createElement('img');
        immagine.src = contenuto[ind -1].image;
        console.log(immagine);
        box.appendChild(immagine);
        const box_titolo_pref = document.createElement('div');
        box_titolo_pref.classList.add('testobox');
        box.appendChild(box_titolo_pref);
        let titolo=document.createElement('h1');
        titolo.textContent = contenuto[ind-1].titolo;
        box_titolo_pref.appendChild(titolo);
        const pref=document.createElement('img');
        pref.src="removefavourite.jpg";
        pref.classList.add('img_pref');
        pref.setAttribute('data-preferiti', '1');
        box_titolo_pref.appendChild(pref);
        pref.addEventListener('click', removeFavourite);
        div_hidden.classList.remove('hidden');
        div_hidden.classList.add('show');
    }
}

function removeFavourite(event){
    const f = event.currentTarget;              //vado a recuperare l'immagine cliccabile, cioè l'elemento che scatena l'evento che mi rimanda alla funzione
    const prodotto=f.parentNode.parentNode;     //vado a recuperare il box che contiene il div che contene la mia immagine cliccabile
    const ind_f = prodotto.dataset.index;       //così recupero l'index del box "prodotto" corrispondente
    prodotto.remove();
   
    const prodottoF = document.querySelectorAll('#contenitore .cerca');     //prende la la lista dei box di #contenitore
    console.log(prodottoF);
    for( pF of prodottoF){                                                      //pF è il singolo box
    const ind_pF = pF.dataset.index;                                            //index del singolo box
        if(ind_pF===ind_f){
            console.log(pF);
            const testoboxF = pF.querySelector('.testobox img');
            testoboxF.src="cuore.png";
            testoboxF.dataset.preferiti='0';
        }
    }

    const box_pf = document.querySelector('#preferiti .contenuto');             //mi recupera i box all'interno di preferiti
    console.log(box_pf);
    if(box_pf=== null){                                                         //se all'interno della sezione preferiti non c'è nulla
        const sez_pf = document.querySelector('.show');                         //mi recupero la sezione con classe show e poi la cambio in hidden
        sez_pf.classList.remove('show');
        sez_pf.classList.add('hidden');
    }
}


const div_cerca = document.querySelector('#barraricerca'); //mi recupero l'input
div_cerca.addEventListener('keyup', ricerca);

function ricerca(event){
    const stringa= event.currentTarget.value;
    const boxprodotto = document.querySelectorAll('#contenitore .cerca');
    console.log(boxprodotto);
    const boxhidden=document.querySelectorAll('#contenitore .hidden');
    for(bh of boxhidden){
        bh.classList.remove('hidden');
        bh.classList.add('contenuto');
    }
    
        if(stringa !== ' '){
            for( bp of boxprodotto){
                  let titolobox = bp.querySelector('.testobox h1');
                let titolo = titolobox.textContent;
                console.log(titolo);
                    if(titolo.toLowerCase().indexOf(stringa.toLowerCase()) === -1){
                        bp.classList.remove('contenuto');
                        bp.classList.add('hidden');     
                    }
            }
        }
}
