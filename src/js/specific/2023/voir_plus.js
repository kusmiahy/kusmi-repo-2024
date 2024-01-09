/**
 * Récupérer -> le span (enlever la classe), les deux boutons, les blocs qui ont une classe il faut retirer
 */

const spanFade = document.querySelector('.hide__text');
const ctaViewMore = document.querySelector('.hide__cta--view-more');
const ctaViewLess = document.querySelector('.hide__cta--view-less');
const allBlocksNotDisplayed = document.querySelectorAll('.category-bottom-content__block');

ctaViewMore.addEventListener('click', () => {
    spanFade.classList.remove('hide__fadeout');
    allBlocksNotDisplayed.forEach((block) => {
        block.classList.remove('category-bottom-content__block--not-display');
    })
    ctaViewMore.style.display = 'none';
})

ctaViewLess.addEventListener('click', () => {
    spanFade.classList.add('hide__fadeout');
    allBlocksNotDisplayed.forEach((block) => {
        block.classList.add('category-bottom-content__block--not-display');
    })
    allBlocksNotDisplayed[0].classList.remove('category-bottom-content__block--not-display');
    ctaViewMore.style.display = 'initial';
    window.scrollTo({
        top: ((document.querySelector('.category-bottom-content__block--display').offsetTop) - 110),
        behavior: 'smooth',
    });
})
