## Repository des intégrateurs de Kusmi ##

* Team Inté

### Install ###
* git clone https://github.com/kusmiahy/kusmi-repo-2024.git
* cd kusmi-repo 
* npm install
* gulp prod

### For compile ###
* your html file need to be index.prod.html for compile 
* You juste take of the prod for stop to compile the file index.html 

## Aide pour les différents liens sur SFCC ##

<!--Lien vers une fiche produit-->
<a href="$url('Product-Show','pid','652788321005')$">Lien vers mon produit dont l'id = 652788321005 </a>
<!-- Lien vers une page categories -->
<a href="$url('Search-Show','cgid','vestes')$">Lien vers ma catégorie dont l'id = vestes</a>
<!-- Lien vers une page de contenu -->
<a href="$url('Page-Show','cid','cart-topbanner')$">Lien vers l'url de mon content asset dont l'id = cart-topbanner</a>
<!-- Lien vers une page seasonal show (noël) -->
<a href="$url('Seasonal-Show','cid','')$">Lien vers ma catégorie dont l'id = vestes</a>
* Pour montrer la page FAQ
$url('Faq-Show')$
* Pour créer un compte
$url('Account-Show')$
* Pour se connecter
$url('Login-Show', 'activeTab', 'register', 'activateLoyalty', 'true')$
