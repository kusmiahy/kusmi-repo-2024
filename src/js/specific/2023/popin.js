const popin = document.querySelector('#popin');
const openModal = document.querySelector('.popin__open');
const closeModal = document.querySelector('.dialog__close');
const closeCta = document.querySelector('.dialog__cta');

openModal.addEventListener("click", () => {
    popin.showModal();
})

closeModal.addEventListener("click", () => {
    popin.close();
})
closeCta.addEventListener("click", () => {
    popin.close();
})