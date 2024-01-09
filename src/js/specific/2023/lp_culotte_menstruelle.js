// Calculateur 

// Récupération des élements, stocker dans des variables pour le calculateur
const dureeCycle = document.getElementById('duree_cycle');
const dureeRegles = document.getElementById('duree_regles');
const nbTampons = document.getElementById('nbTampons');
const nbServiettes = document.getElementById('nbServiettes');
// pour l'affichage des résultats 
const btnCalcul = document.getElementById('calculate');
// Déchets en kg/an
const resultatsKgParAn = document.getElementById('results_kg_an');
// Nb de culottes économisées
const resultatsCbCulottes = document.getElementById('results_nb_culottes');

// La data fixe qu'on affiche par défaut
let defautCycle = 28; // en jours
let defautRegle = 5; // en jours
let defautNbTampons = 3; // le nb de tampons que l'usager utilise
let defautNbServiettes = 3; // le nb de serviettes que l'usager utilise

// Les multiplicateurs pour le nb de déchets économisés
const uniteTampon = 0.27; // le prix d'un tampon dans un cycle
const uniteServiette = 0.24; // le prix d'une serviette dans un cycle
const uniteTamponPoids = 0.002; // en kg
const uniteServiettePoids = 0.007; // en kg

// Le nombre de jours dans une année
const nbJoursDansUnAn = 365;

// le prix global => qui correspond à deux culottes qu'on utiliserait imaginons dans un cycle
const prixGlobal = 50;

// On va récupérer tous les boutons moins et plus
const tousLesBtnMoins = [...document.querySelectorAll('.btn_calculator__moins')];
const tousLesBtnPlus = [...document.querySelectorAll('.btn_calculator__plus')];

// Exécution des fonctions

// Pour chaque bouton moins
tousLesBtnMoins.forEach(btnMoins => {
    btnMoins.addEventListener('click', () => {
        if (btnMoins.classList.contains('duree_cycle')) {
            ajouterOuReduire(btnMoins, defautCycle, dureeCycle);
            defautCycle = dureeCycle.innerText;
            console.log('cycle : ' + defautCycle);

        } else if (btnMoins.classList.contains('duree_regles')) {
            ajouterOuReduire(btnMoins, defautRegle, dureeRegles);
            defautRegle = dureeRegles.innerText;
            console.log('regles : ' + defautRegle);

        } else if (btnMoins.classList.contains('nbTampons')) {
            ajouterOuReduire(btnMoins, defautNbTampons, nbTampons);
            defautNbTampons = nbTampons.innerText;
            console.log('nb tampons : ' + defautNbTampons);

        } else if (btnMoins.classList.contains('nbServiettes')) {
            ajouterOuReduire(btnMoins, defautNbServiettes, nbServiettes);
            defautNbServiettes = nbServiettes.innerText;
            console.log('nb serviettes : ' + defautNbServiettes);
        }
    })
})

// Pour chaque bouton plus
tousLesBtnPlus.forEach(BtnPlus => {
    BtnPlus.addEventListener('click', () => {
        if (BtnPlus.classList.contains('duree_cycle')) {
            ajouterOuReduire(BtnPlus, defautCycle, dureeCycle);
            defautCycle = dureeCycle.innerText;
            console.log(typeof defautCycle + ' ' + defautCycle)

        } else if (BtnPlus.classList.contains('duree_regles')) {
            ajouterOuReduire(BtnPlus, defautRegle, dureeRegles);
            defautRegle = dureeRegles.innerText;
            console.log(typeof dureeRegles + ' ' + dureeRegles)

        } else if (BtnPlus.classList.contains('nbTampons')) {
            ajouterOuReduire(BtnPlus, defautNbTampons, nbTampons);
            defautNbTampons = nbTampons.innerText;
            console.log(typeof nbTampons + ' ' + nbTampons)

        } else if (BtnPlus.classList.contains('nbServiettes')) {
            ajouterOuReduire(BtnPlus, defautNbServiettes, nbServiettes);
            defautNbServiettes = nbServiettes.innerText;
            console.log(typeof nbServiettes + ' ' + nbServiettes)
        }
    })
})

// clique sur le btn Calculer mon économie
btnCalcul.addEventListener('click', () => {
    defautCycle = parseInt(defautCycle, 10);
    defautRegle = parseInt(defautRegle, 10);
    defautNbTampons = parseInt(defautNbTampons, 10);
    defautNbServiettes = parseInt(defautNbServiettes, 10);

    let poidsTamponUnCycle = (defautNbTampons * uniteTamponPoids) * defautRegle;
    let poidsServietteUnCycle = (defautNbServiettes * uniteServiettePoids) * defautRegle;
    let nbDeFoisOuOnANosRegles = nbJoursDansUnAn / defautCycle; // période globale cb de 
    let dureeDesReglesDansUneAnne = nbDeFoisOuOnANosRegles * defautRegle; // nb de jours où on a nos regles dans l'annee
    let poidsTotal = (poidsTamponUnCycle + poidsServietteUnCycle) * dureeDesReglesDansUneAnne;
    let dechetsReduits = Math.round(poidsTotal * 10) / 10;


    let prixTamponDansUnCycle = (defautNbTampons * uniteTampon) * defautRegle;
    let prixServietteDansUnCycle = (defautNbServiettes * uniteServiette) * defautRegle;
    let prixTotal = prixTamponDansUnCycle + prixServietteDansUnCycle;
    let rentabCycle = prixGlobal / prixTotal;
    let rentabilisation = Math.round(rentabCycle * 10) / 10;

    resultatsKgParAn.innerText = dechetsReduits.toString();
    resultatsCbCulottes.innerText = rentabilisation.toString();
})


// Fonctions qu'on va utiliser par la suite

// pour les boutons moins et + du calculateur qui vont réduire ou augmenter le nombre
function ajouterOuReduire(btn, actuel, element) {
    actuel = parseInt(element.innerText, 10); // 10 correspond à la base
    btn = btn.querySelector('p');
    if (btn.innerText == '-') {
        if (actuel <= 0) {
            actuel = 0
        } else {
            actuel -= 1;
        }
    } else
    if (btn.innerText == '+') {
        if (actuel >= 100) {
            actuel = 100
        } else {
            actuel += 1;
        }
    }

    element.innerText = actuel.toString();
}

// -----------------------------------------------------------------------

// FAQ   
let questions = document.querySelectorAll(".faq__question");
questions.forEach((question) => {
    question.addEventListener("click", function() {
        question.classList.toggle("faq__question_active");

        const nextElement = question.nextElementSibling; // faq__secondary_panel
        if (!nextElement.classList.contains("faq__secondary_panel_active")) {
            nextElement.classList.toggle("faq__secondary_panel_active");
        } else {
            nextElement.classList.remove("faq__secondary_panel_active");
        }
    });
});

let secondary_questions = document.querySelectorAll(".faq__secondary_question");
secondary_questions.forEach((question) => {
    question.addEventListener("click", function() {
        question.classList.toggle("faq__secondary_question_active");

        const nextElement = question.nextElementSibling;
        nextElement.classList.toggle("faq__panel_active");
    });
});


// -----------------------------------------------------------------------

// Récupération des élements, stocker dans des variables pour Vimeo
const vimeo_thumbnail = document.getElementById('vimeo_thumbnail');
const wrapper_video = document.getElementById('camille_video');

// const wrapper_videoCH = document.getElementById('valentine_video');
const videoCamille = document.getElementById('myVideo');

// const videoValentine = document.getElementById('myVideo_CH');

// au click, l'image disparait pour que la video Vimeo reste
vimeo_thumbnail.addEventListener('click', () => {
    vimeo_thumbnail.style.display = 'none';
    wrapper_video.classList.remove('x-absolute');
    wrapper_video.classList.add('x-relative');
})

// vimeo_thumbnail.addEventListener('click', () => {
//     vimeo_thumbnail.style.display = 'none';
//     wrapper_videoCH.classList.remove('x-absolute');
//     wrapper_videoCH.classList.add('x-relative');
// })

// On met le script Vimeo dans la balise head

const scriptVimeo = document.createElement('script');
scriptVimeo.src = 'https://player.vimeo.com/api/player.js';
scriptVimeo.async = true;
document.head.appendChild(scriptVimeo);

// // options de la vidéo Mobile puis Desktop
if (window.innerWidth < 1024) {

    // Mobile
    var options_video = {
        url: "https://player.vimeo.com/video/785957023",
        autoplay: false,
        loop: true,
        controls: true,
        muted: true,
    };
} else {

    // Desktop
    var options_video = {
        url: "https://player.vimeo.com/video/785956259",
    };
}

// var options_video_CH = {
//     url: "https://player.vimeo.com/video/788336527",
//     autoplay: false,
//     loop: true,
//     controls: true,
//     muted: true,
// }

// fonction checkVimeo qui permet de checker si un objet Vimeo existe et si il n'existe pas on relance

let checkVimeo = function() {
    console.log("CheckVimeo");
    if (typeof Vimeo !== 'undefined') {
        initVimeo(videoCamille, options_video);
        // initVimeo(videoValentine, options_video_CH);
    } else {
        setTimeout(checkVimeo, 250);
    }
}

// Fonction initVimeo qui prend en paramètre l'id de la vidéo et les options de la vidéo (loop muted etc)

function initVimeo(idVideo, options) {

    let videoPlayer = new Vimeo.Player(idVideo, options);

    videoPlayer.on('play', function() {
        videoPlayer.style.zIndex = "3";
        console.log('Played the video' + idVideo);
    });
}

checkVimeo();

// Ancrage scroll 

function ancrage(click, destination) {
    let itemClick = document.querySelector(click);

    itemClick.addEventListener("click", function() {
        console.log("start scroll");
        window.scrollTo({
            top: ((document.querySelector(destination).offsetTop) - 110),
            behavior: 'smooth',
        });
    });
}

ancrage('#cta_calculateur', '#calculateur');
// ancrage('#cta_interview', '#interview');
ancrage('#cta_faq', '#faq');