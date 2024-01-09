const allQuestions = document.querySelectorAll('.faq__question');

/**
 * Injecter une pastille à côté du produit dans le DOM
 */

function addPastille(id, lienImg) {

    const pastille = document.createElement('div');

    pastille.classList.add('rituel-pastille-melisse');
    pastille.innerHTML = `
        <img src="${lienImg}" class="rituel-pastille-melisse__image" />`;

    const parent = document.querySelector(id);

    if (parent) {
        parent.appendChild(pastille);
    }
}

/**
 * Quand une question est cliquée, la réponse apparait et si on reclique elle disparait
 */

document.addEventListener("DOMContentLoaded", function () {
    const currentURL = window.location.href;
    allQuestions.forEach((question) => {
        question.addEventListener('click', () => {
            console.log("click");
            !question.classList.contains('faq__question--toggled') ? question.classList.add('faq__question--toggled') : question.classList.remove('faq__question--toggled');
        })
    })
    // currentURL.includes('com/fr') ? addPastille('#pdpCarousel-21251A1070', 'images/pdp/2023/rituel_sommeil/pastille_melisse_fr.svg?$staticlink$') : addPastille('#pdpCarousel-21251A1070', 'images/pdp/2023/rituel_sommeil/pastille_melisse_en.svg?$staticlink$');
})
