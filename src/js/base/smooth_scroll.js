//--------------------------------------------------------------------------
//--------------------------------------------------------------------------
// Décalage des ancres à cause du header
//--------------------------------------------------------------------------
//--------------------------------------------------------------------------

// Cible plusieurs elements
const elDomAll = (el) => document.querySelectorAll(el);

// Cible 1 element
const elDom = (el) => document.querySelector(el);

var linkAnchorAll = elDomAll( 'button[id^="#"]' );

for (let a = 0; a < linkAnchorAll.length; a++) {

    linkAnchorAll[a].addEventListener('click', function (e){
        console.log("Cancel");
        e.preventDefault();
        
        console.log("Go to");
        var element = linkAnchorAll[a].id.toString();
        element = element.replace('#', '');
        element = document.getElementById(element);

        // smooth scroll to element and align it at the bottom
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth',
        });
        // element.scrollIntoView({ behavior: 'smooth', block: 'end'});
    }, true);

}