/**
 * Injecter une pastille à côté du produit dans le DOM
 */

function addPastille(id, lienImg, altEuro) {

    const pastille = document.createElement('div');

    pastille.classList.add('pastille-pdp__container');
    pastille.innerHTML = `
        <img src="${lienImg}" class="pastille-pdp__container__image" alt="${altEuro}"/>`;

    const parent = document.querySelector(id);

    if (parent) {
        parent.appendChild(pastille);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const currentURL = window.location.href;
    currentURL.includes('com/fr') ? addPastille('.m-pdp__images-container', 'images/pdp/2023/rituel_sommeil/pastille_melisse_fr.svg?$staticlink$', 'Pastille Enrichi en extrait de mélisse') : addPastille('.m-pdp__images-container', 'images/pdp/2023/rituel_sommeil/pastille_melisse_en.svg?$staticlink$', 'Sticker enriched with lemon balm extract');
})