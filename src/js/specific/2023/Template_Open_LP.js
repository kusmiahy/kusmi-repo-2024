/**
 * Fonction qui permet d'ouvrir une LP et changer le contenu HTML 
 * du premier slot
 */

const ctaClickDiscover = document.getElementById('ctaClickDiscover');
const ctaClickReturn = document.getElementById('ctaClickReturn');
const firstSlot = document.querySelector('.first-slot');
const wrapperToShow = document.querySelector('.slots');

/**
 * openLP permet de toggle les classes et de faire apparaître le wrapper
 * Si le bouton "En savoir plus" est cliqué, le premier bloc
 * s'agrandit et les autres slots s'affichent 
 * On rajoute des classes pour changer la position du texte et l'opacité
 * Et on fait pareil mais l'inverse pour le bouton "Voir la collection"
 * Les slots disparaissent et le premier slot revient 
 */

function openLP(ctaDiscover, ctaReturn, wrapper) {
    ctaDiscover.addEventListener('click', () => {
        firstSlot.classList.add('first-slot--opened');
        // Pour l'animation
        slotTextClosed.classList.remove('first-slot__texte--notClosed');
        slotTextClosed.classList.add('first-slot__texte--closed');
        slotTextOpen.classList.remove('first-slot__texte--notOpened');
        slotTextOpen.classList.add('first-slot__texte--opened');
        // Pour afficher les autres slots
        wrapper.classList.add('slots--opened');
    })
    ctaReturn.addEventListener('click', () => {
        firstSlot.classList.remove('first-slot--opened');
        // Pour l'animation
        slotTextClosed.classList.add('first-slot__texte--notClosed');
        slotTextClosed.classList.remove('first-slot__texte--closed');
        slotTextOpen.classList.add('first-slot__texte--notOpened');
        slotTextOpen.classList.remove('first-slot__texte--opened');
        // Pour afficher les autres slots
        wrapper.classList.remove('slots--opened');
    })
}

openLP(ctaClickDiscover, ctaClickReturn, wrapperToShow);