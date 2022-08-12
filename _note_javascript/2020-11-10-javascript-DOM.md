---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-dom
title: "Le DOM"
path: 2020-11-10-javascript-DOM.md
tag: js
status: draft
has_children: true
toc: javascript-note
order: 15
collection: note_javascript
   
---





<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Le *Document object model* (DOM)
Le JavaScript côté-client est interprété à l'intérieur d'un navigateur, mais principalement de sa fenêtre. Celle-ci dispose de méthodes et de propriétés accessibles sur l'objet `window`. L'objet `window` est instancié automatiquement par le navigateur et le code JavaScript de la balise `<script>` est contenu dans cet objet global. L'objet `window` possède des propriétés spécifiques du navigateur telles que la taille de la fenêtre et l'url du document. Parmis les propriétés de cet objet, on retrouve l'objet `document` qui réfère spécifiquement au document html chargé par le navigateur. Ce dernier qui contient l'ensemble des propriétés et des méthodes nécessaires à la manipulation du contenu du document chargé.

La propriété document est définie par le DOM (*Document object model*). Cet API spécifie les méthodes et les propriétés qui permettent de représenter et de manipuler le contenu d'un document HTML ou XML.

## Représentation du DOM et accès aux éléments
Les objets du DOM sont représentés sous forme d'un arbre de données. Chaque noeud peut avoir un parent, des ancêtres, un ou des enfants, des descendants et des frères (*sibblings*)

Exemple :
```html
<html>
    <head>
        <title>Document HTML</title>
    </head>
    <body>
        <h1>Titre de niveau 1</h1>
        <p>Un paragraphe avec un élément en <em>italique</em></p>
    </body>
</html>
```
Dans l'exemple précédent, `<html>` est le parent de `<head>` et de `<body>`. Ces deux éléments sont frères (*sibling*). `<h1>` et `<p>` sont les enfants de `<body>`. `<h1>`, `<p>` et `<em>` sont les descendants de `<body>`. `<html>`, `<body>` et `<p>` sont les ancêtres de `<em>`. Les éléments de texte, exclut dans la liste précédente, sont aussi considérés comme des noeuds dans le DOM.

Il n'est toutefois pas essentiel de connaître l'emplacement d'un noeud dans une branche pour accéder à ce noeud. Le DOM défini principalement quatre façons distinctes afin d'accéder à un élément HTML : par sélecteur CSS, par identifiant (*id*), par nom (*name*) et par nom de balise (*tagname*). Bien que la première manière soit à privilégier, la section suivante s'emploie à présenter ces quatre façons. 

### Par sélecteur CSS
Le CSS définissent des manières très efficaces et puissantes de faire des requêtes sur les balises HTML. Le DOM défini deux méthodes qui permettent d'utiliser la syntaxe des sélecteurs CSS. La méthode `querySelectorAll(sel)` retourne un `NodeList` qui contient un tableau des éléments trouvés et la méthode `querySelector(sel)` retourne un objet de type `Element` représentant le premier élément trouvé.

Exemple :
```js
// Retourne le premier boutons radio cochés.
let radio_cocher = document.querySelector('input[type="radio"]:checked');

// Retourne un nodeList de tous les boutons radio qui sont cochés.
let aRadio_cocher = document.querySelectorAll('input[type="radio"]:checked');
```

### Par identifiant
C'est la méthode la plus rapide et direct d'accéder à un élément HTML unique. Chaque élément HTML qui a un attribut `id` peut être accédé de cette manière. Notez que chaque `id` doit être unique dans un document Web. Pour accéder à un élément ayant un identifiant unique, il faut utiliser la méthode getElementById(id).

Exemple :
```js
let paragraphe = document.getElementById("para1");

// Est l'équivalent de :
let paragraphe = document.querySelector("#para1"); 
```
La méthode retourne un objet de type `Element` qui contient des propriétés et des méthodes de bases qui permettent de manipuler le contenu de l'élément HTML.

### Par nom (*name*)
Certaines balises, ceux d'un formulaire, doivent contenir un attribut name afin de soumettre leur valeur à un serveur. Il est aussi possible d'accéder à ces éléments en utilisant leur attribut name avec la méthode getElementsByName(nom).

Exemple :
```js
let aChampNom = document.getElementsByName("nom");

// Est l'équivalent de :
let aChampNom = document.querySelectorAll("[name='nom']");
```
Contrairement à l'attribut `id`, le contenu de l'attribut `name` n'a pas à être unique. Pour cette raison, la méthode ne renvoie pas directement un objet de type `Element`, mais plutôt un objet de type `NodeList` qui est similaire à un tableau et contient les éléments trouvés. Le premier élément trouvé sera à l'index 0.
> La ligne de code `` donne un résultat identique.

### Par type de balise
Le DOM défini aussi une méthode pour accéder à tous les éléments d'un même type, c'est-à-dire à tous les éléments ayant la même balise. En utilisant la méthode `getElementsByTagName(balise)`, il est possible d'accéder à tous les éléments d'un certain type.

Comme dans l'exemple suivant :
```js
let para = document.getElementsByTagName('p');

// Est l'équivalent de :
let para = document.querySelectorAll("p");
```
Tout comme la méthode précédente, celle-ci retourne un `NodeList`. Cette méthode est aussi défini dans les objets de type `Element`. Il est donc possible de chercher tous les éléments HTML ayant un type de balise spécifique qui sont un descendant d'un élément trouvé.

Exemple :
```js
let para = document.getElementsByTagName('p');
let em = para[0].getElementsByTagName('em');

// Est l'équivalent de : 
let em = document.querySelectorAll("p > em");
//ou 
let para = document.querySelector("p");
let em = para.querySelectorAll("em");
```
Cet exemple retourne un `NodeList` de tous les éléments `<em>` qui sont descendant du premier élément `<p>`.


# Navigation dans le DOM

Une fois que la requête nous renvoie un résultat valide, il est possible d'utiliser la représentation en arbre du DOM pour se promener d'un noeud à un autre ou d'un élément à un autre. Le DOM fait une distinction entre noeud et élément. Les fragments de texte sont considérés comme des noeuds dans l'arbre mais ne sont pas des éléments. Le texte dans une
balise `<p>` est un noeud, mais n'est pas un élément. La balise `<p>` est un élément, mais aussi un noeud.

Propriétés :

Node.parentNode

> Réfère au noeud qui est parent de Node

Node.ChildNodes

> Objet NodeList des descendants de Node

Node.firstChild

> Réfère au noeud qui est le premier enfant de Node.

Node.lastChild

> Réfère au noeud qui est le dernier enfant de Node.

Node.nextSibling

> Réfère au noeud qui est le prochain frère de Node.

Node.previousSibling

> Réfère au noeud qui est le frère précédent de Node.

Node.nodeValue

> Le contenu texte d'un noeud Text ou Comment.

Node.nodeName

> Le nom de la balise (tagname)

Node.nodeType

> Contient un entier qui définit le type de noeud de Node. Document = 9,
> Element = 1, Text = 3, Comments = 8, document-fragment = 11

Element.children

> Un NodeList des enfants de Element

Element.firstElementChild

> Réfère à l'élément qui est le premier enfant de Element.

Element.lastElementChild

> Réfère à l'élément qui est le dernier enfant de Element.

Element.nextElementSibling

> Réfère à l'élément qui est le prochain frère de Element.

Element.previousElementSibling

> Réfère à l'élément qui est le frère précédent de Element.

Element.childElementCount

> Contient le nombre d'élément qui sont enfants de Element.

Objet Element

L'objet Element possède d'autres propriétés et méthodes qui permettent
de manipuler leur attribut, leur contenu et leur apparence. La section
suivante n'est pas une présentation exhaustive de tous ces éléments,
mais une présentation générale qui sera complétée dans chaque section
spécifiquement liés à un usage.

Les attributs des balises peuvent être directement lu comme des
propriétés des objets de type Element. Pour des fins de clarification du
code, il est parfois plus utile d'utiliser les méthodes propres à la
lecture et à l'écriture de ces attributs. Le DOM défini 4 méthodes
d'accès aux attributs des balises.

Méthodes :

Element.setAttribute(Attribut, valeur);

> Crée ou modifie Attribut selon valeur

Element.getAttribute(Attribut);

> Retourne la valeur de Attribut sous forme de chaine de caractère

Element.hasAttribute(Attribut);

> Retourne un booléen selon que Attribut existe ou non sur Element

Element.removeAttribute(Attribut);

> Efface attribut de Element.

Il faut noter que ces méthodes ne sont pas appropriées pour modifier
l'attribut class d'un élément. Le DOM défini des méthodes spécifiques
pour lire et modifier les classes des éléments (voir section
Manipulation du CSS).

# Manipulation du contenu des objets de type Element

Le contenu des objets de type Element varie beaucoup d'un document à
l'autre. On considèrera par contre qu'il peut être lu de 3 façons
distinctes. Premièrement, comme une chaine HTML, incluant toute les
balises HTML qui sont incluses dans l'élément. Deuxièmement, comme une
chaine de caractère en texte seulement, c'est-à-dire sans les balises
HTML contenu dans le texte et troisièmement, comme une série de noeud et
d'élément qui possèdent eu aussi des noeuds et des éléments. Selon ce
que l'on veut faire avec l'élément trouvé, on pourra utiliser l'une
des trois manières de voir le contenu d'un élément (ou bien un mélange
des trois). Chaque manière utilise des méthodes et des propriétés
distinctes.

## Comme une chaine HTML

Pour récupérer le contenu d'un objet Element, il faut utiliser la
propriété innerHTML. Celle-ci contient la chaine HTML qui est dans
l'élément trouvé.

## Comme une chaine texte

La propriété textContent contient uniquement les éléments textes, vidés
de leur balise HTML. Ainsi, la balise <p> de l'exemple utilisé en
début de section retournera « Un paragraphe avec un élément en
italique ». Donc la chaine sans les marqueurs HTML.

## Comme des noeuds

Cette manière, la plus complexe, permet d'aller chercher chaque
fragment de texte comme noeud d'un élément HTML. Il faut alors utiliser
les propriétés de l'objet Node (défini plus haut dans cette section)
pour fouiller l'arbre des noeuds et extraire les noeuds de type texte.

#Création, insertion et effacement d'élément et de noeud

S'il est possible d'altérer des éléments existants, il est aussi
possible d'en ajouter dans l'arbre du DOM. Les objets de type Node,
Text et Element possèdent des méthodes qui permettent la création,
l'insertion et l'effacement d'éléments et de noeuds.

Afin d'ajouter des éléments HTML dans l'arbre du DOM, il faut procéder
en deux étapes. La première est de créer le noeud ou l'élément. Pour ce
faire, il faut utiliser une des méthodes suivantes de l'objet document.

document.createElement(nouvElement);

> Crée l'élément nouvElement.

document.createTextNode(nouvNoeud);

> Crée un noeud texte contenant la chaine de caractère nouvNoeud.

Ces deux méthodes crée l'objet dans le document, mais ne le place pas
dans le DOM. Il n'apparait donc pas dans la page HTML. La deuxième
étape consiste à insérer le noeud dans l'arbre, donc au bon endroit
dans le document. Pour ce faire, il faut utiliser la méthode une des
méthodes suivantes :

Node.appendChild(nouvElement);

> Ajoute nouvElement comme enfant de Node.

ParentNode.insertBefore(nouvElement, Noeud);

> Insère nouvElement avant Noeud. La méthode doit être appelée sur le
> noeud parent de Noeud.

Il est aussi possible de remplacer et d'effacer des noeuds. Pour
effacer un noeud, il faut appeler la méthode removeChild() sur le noeud
parent du noeud à effacer et passer ce dernier en paramètre.

Syntaxe :

parentNode.removeChild(n); // Enlève le noeud n dans le parentNode.

Pour remplacer un noeud par un nouveau noeud, il faut appeler la méthode
replaceChild() sur le noeud parent. La méthode prend 2 paramètres : le
nouveau noeud et le noeud à remplacer.

Syntaxe :

// Remplace le noeud n par le nouveau noeud créer (<p>)

parentNode.replaceChild(document.createElement("p"), n);

# Traitement des formulaires

Le JavaScript est indispensable pour le traitement des formulaires.
Validation de données et création de formulaire dynamique sont au nombre
des éléments qui sont importants et très souvent présents sur une
application Web ou une page Web.

Le traitement des éléments de formulaire HTML est quelques fois assez
complexe méritant donc une section spécifique des notes. Bien que les
éléments des formulaires soient intégrés au DOM au même titre que les
autres éléments tel que les <div> et les <p>, l'élément <form> à
quelques particularités intéressantes. Notons simplement la possibilité
d'avoir plusieurs formulaires dans une page, la présence de l'attribut
name qui n'est pas exclusif sur les éléments des formulaires et
l'interactivité des éléments de liste et de choix (bouton radio, case à
cocher, etc.).

# Accès aux éléments du <form>

Cet élément fut un des premiers éléments à pouvoir être programmé. Il
existe donc des méthodes spécifiques d'accès qui ne sont pas défini
dans le DOM pour les items d'un formulaire. Pour que ces manières de
faire fonctionnent, il faut toutefois que l'attribut name des items du
formulaire soit défini. La définition de l'attribut name est aussi
importante lors de la soumission d'un formulaire sur un serveur. Sans
l'attribut, les valeurs associées à chaque élément ne sera pas envoyée
sur le serveur et donc inutilisable.

Les exemples de code de la section suivantes réfèreront tous au
formulaire suivant :

<form id="formulaire" name="formulaire" method="post"
action="">

<p>

Nom : <input type="text" name="nom" id="nom" />

</p>

<p>

Prénom : <input type="text" name="prenom" id="prenom" />

</p>

<p>

Choix 1 <input type="checkbox" name="choix1" id="choix1" />

Choix 2 <input type="checkbox" name="choix2" id="choix2" />

Choix 3 <input type="checkbox" name="choix3" id="choix3" />

Choix 4 <input type="checkbox" name="choix4" id="choix4" />

</p>

<p>

<input name="sexe" type="radio" id="sexe_0" value="h" />Homme

<br />

<input name="sexe" type="radio" id="sexe_1" value="f" />Femme

</p>

<p>

Autre choix :

<select name="menu" id="menu">

<option value="1">valeur 1</option>

<option value="2">valeur 2</option>

<option value="3">valeur 3</option>

</select>

</p>

<p>

<input type="submit" name="button" id="button" value="Envoyer"
/>

<input type="reset" name="button2" id="button2"
value="Réinitialiser" />

</p>

</form>

Il existe plusieurs manières d'accéder aux éléments d'un formulaire.
Cela peut se faire en utilisant les outils du DOM, tel que le
getElementById(), getElementsByTagName(), getElementsByName() ou le
queryselectorAll().

Les objets des formulaires sont aussi directement accessibles à travers
l'objet Document. Les formulaires sont considérés comme des objets de
type HTMLCollection, c'est-à-dire des tableaux d'objets spécifiques.
On peut donc accéder à l'élément <input name='nom'> des manières
suivantes :

//Méthodes d'accès aux éléments avec un attribut name

document.forms.formulaire.nom; // Formulaire avec name=formulaire

document.forms[0].nom; // Si le formulaire est le premier de la page

window.formulaire.nom; // Caduc, ne pas utiliser

document.formulaire.nom; // Ne devrait pas être utilisé

document.forms.formulaire.elements[0]; // premier élément

document.forms.formulaire.elements.nom; //Élément avec name=nom

// Méthodes d'accès sans attribut name

document.getElementById('nom');

document.getElementsByTagName('input')[0]; // S'il est le premier
input

L'objet Form possède plusieurs propriétés. Quatre de ceux-ci servent
principalement à définir des valeurs pour la soumission du formulaire à
un serveur. Ce sont les propriétés action, encoding, method et target.
Une autre propriété de l'objet Form est disponible afin d'accéder aux
éléments de celui-ci. Chaque élément du formulaire est disponible sous
forme d'un tableau dans une propriété de l'objet Form nommée
elements[].

La majorité des types d'élément d'un formulaire possèdent quatre
propriétés importantes, soit type, form, name et value.

**Propriétés :**

Element.type

> Une chaine en lecture-seule qui identifie le type d'élément (attribut
> type de la balise), tel que button, checkbox, radio, text, textarea,
> etc.

Element.form

> Référence à l'objet Form qui dans lequel se retrouve l'élément.

Element.name

> La valeur de l'attribut name, en lecture-seule.

Element.value

> Propriété modifiable, elle contient la valeur entrée par l'usager
> dans l'élément du formulaire ou bien la valeur de l'attribut value.
> Cette valeur n'est cependant pas disponible pour les boutons radios
> et les cases à cocher.

Accès aux valeurs textes des éléments du formulaire

La plupart des éléments entrés dans les formulaires par les usagers sont
des chaines de caractères qui se lisent à partir de la propriété value
des objets Element. La valeur retournée ou inscrite dans la propriété
sera donc celle du formulaire. L'exemple suivant montre une fonction
qui lit la valeur du champ nom et prénom, les concatènent, affiche le
résultat dans la console et retourne le résultat.

Exemple :

/*Fonction qui lit la valeur du champ nom et du champ prenom, concatène
les valeurs et affiche dans la console.*/

function concatNom()

{

let nom = document.getElementsByName('nom')[0].value;

let prenom = document.getElementsByName('prenom')[0].value;

let nomPrenom = nom + ', ' + prenom;

console.log(nomPrenom);

return nomPrenom;

}

La lecture de la propriété value permet de lire la chaine de caractère
inscrite dans le formulaire. Une boite vite retourne la valeur null.

Accès à l'état des cases à cocher et des boutons radios

La lecture des valeurs des cases à cocher, des listes déroulantes ou des
boutons radios ne peut être faite de la même manière. La particularité
de ces éléments interactifs demande une approche différente. Comme
plusieurs cases peuvent être cochées ou non, et que plusieurs éléments
peuvent être sélectionnés ou non dans une liste, c'est l'état de
chaque élément qu'il faut vérifier afin d'obtenir leur valeur.

Il faut donc utiliser une propriété spécifique des cases à cocher et des
boutons radios, la propriété checked. Celle-ci est true, si l'élément
est coché et false, s'il n'est pas coché.

L'exemple suivant est une fonction qui vérifie l'état des cases à
cocher dans le formulaire précédent. La fonction vérifie si le choix1,
le choix2, le choix3 et le choix4 est coché et retourne un tableau
composé des éléments qui sont cochés.

Exemple :

// Fonction qui lit l'état des quatre cases à cocher et retourne un
tableau contenant les éléments sélectionnés

function verifCasesCochees()

{

let casesCochees = [];

let element;

for(let i = 1 ; i<=4 ; i++)

{

element = document.getElementsByName('choix'+i)[0];

if(element.checked)

{

casesCochees.push(element);

}

console.log(element.checked);

}

console.log(casesCochees);

return casesCochees;

}

Accès aux valeurs des listes déroulants et des menus de sélection
multiple

Pour lire les valeurs des items sélectionnés dans une liste de sélection
simple ou multiple, il faut utiliser une autre stratégie. Ces deux
éléments peuvent se comporter à la fois comme des cases à cocher, mais
aussi comme des boutons radio selon que la sélection est simple ou
multiple.

Une liste de sélection simple (avec la propriété type="select-one")
possède une propriété selectedIndex qui indique l'index de l'élément
sélectionné. Ceci réfère à un index du tableau de la propriété options
qui contient tous les choix disponibles dans la sélection. L'exemple
est une fonction qui récupère la valeur de l'élément sélectionné.

Exemple :

// Fonction qui retourne la valeur de l'option sélectionné dans une
liste de sélection simple.

function recupValeurComboSimple()

{

let indexSelection =
document.getElementsByName('menu')[0].selectedIndex;

let valeurSelection =
document.getElementsByName('menu')[0].options[indexSelection].value;

console.log(valeurSelection);

return valeurSelection;

}

Une liste de sélection multiple (avec la propriété
type="select-multiple") se traite un peu à la manière des cases à
cocher. Pour récupérer la valeur, il faut déterminer quels éléments ont
été sélectionnés en vérifiant la propriété selected de tous les items.
L'exemple suivant retourne un tableau de toutes les valeurs des
éléments sélectionnés dans une liste de sélection multiple. Le nombre
d'élément contenu dans la propriété options[] est donné par la
propriété des tableaux length.

Exemple :

function recupValeurComboMulti()

{

let itemsSelectionnes = [];

let element = document.getElementsByName('menu')[0];

let nombreItem = element.options.length;

for(let i = 0; i < nombreItem ; i++)

{

if(element.options[i].selected)

{

itemsSelectionnes.push(element.options[i].value);

}

}

console.log(itemsSelectionnes);

return itemsSelectionnes;

}

Il est aussi possible de changer la valeur des éléments par
programmation, mais aussi leur statut de sélection. Les propriétés
checked et selected peuvent être modifiées et attendent une valeur
booléenne. L'exemple suivant place des valeurs de sélection par défaut
sur les cases à cocher selon l'objet passé en paramètre. L'objet
attendu à la forme {choix1 : true, choixN : false}.

Exemple :

// Fonction qui sélectionne les items selon la valeur du paramètre. Le
paramètre attendu est un objet de la forme : {choix1 : true, choix2 :
false, choix3 : false, choix4 : true}.

function valeurParDefaut(choix)

{

for(element in choix)

{

document.getElementsByName(element)[0].checked = choix[element];

}

}

Manipulation du style et des CSS

L'interactivité permise par l'inclusion du code JavaScript dans une
page HTML passe aussi par les modifications de l'affichage des balises
HTML dans diverses conditions. Un champ de formulaire qui devient rouge
quand l'information qui s'y trouve n'est pas valide, une division qui
vient apparaître au premier plan et qui demande des informations
supplémentaires à l'usager ou bien qui affiche une publicité ou de
l'information, etc. C'est comportement sont possibles en manipulant le
HTML à partir du JavaScript, mais aussi en modifiant les règles de style
et les feuilles de style (CSS) de la page HTML.

Modification de l'apparence des éléments HTML

Comme pour leur application, il existe plusieurs méthodes pour modifier
les règles de style et les CSS en JavaScript. Premièrement, l'attribut
style des balises faisant partie des propriétés accessibles par le DOM
sur chaque élément, il est possible d'appliquer directement des
nouveaux styles *inlines* sur vos balises. Deuxièmement, il est possible
de changer la classe des éléments HTML et ainsi appliquer un modèle
préconçu de règles de style. Troisièmement, il est même possible de
modifier la feuille de style directement et ainsi provoquer un
changement dans les règles de bases directement.

Accès aux styles *inlines*

La première méthode de modification consiste à modifier l'attribut
style de la balise concernée. Cette manière de modifier permet
d'appliquer des règles *inlines* qui auront une priorité sur les styles
externes de la même manière que si l'on procédait à l'ajout de
l'attribut style sur une balise.

Chaque élément qui admet un attribut style aura aussi un objet style.
Celui-ci ayant plusieurs propriétés se rapportant aux instructions CSS.

L'exemple suivant montre comment changer la couleur de l'arrière-plan
d'une division #div1.

e = document.getElementById('div1');

e.style.backgroundColor = '#FF0000';

Chaque propriété CSS est directement modifiable et attend une chaine de
caractère. Les propriétés qui ont des caractères non valides dans les
noms de variables en JavaScript change de forme pour adopter une forme
sans espace et avec une lettre majuscule en début des mots suivants le
premier. Dans l'exemple, background-color devient backgroundColor.
Ainsi, margin-top devient marginTop et border-bottom-color devient
borderBottomColor.

Il est important de bien noter que les valeurs assignées aux propriétés
doivent être des chaines de caractères et contenir les unités pour être
valides.

Exemple :

e.style.position = "absolute"; // Correcte

e.style.left = 300; // Incorrecte

e.style.left = "300"; // Incorrecte

e.style.left = "300px"; // Correcte

Lors de l'utilisation de variable il faut toujours se rappeler
d'ajouter les unités et de respecter la syntaxe des valeurs entrées
comme si elles étaient entrées comme une règle CSS.

Exemple :

let dessus = 55;

let gauche = 25;

let droite = 55;

let bas = 75;

e.style.margin = dessus+"px "+ droite +"px "+bas+"px "+
gauche+"px ";

Modification à l'aide des classes

Une autre façon très pratique de faire des modifications d'apparence
dans les éléments HTML est d'appliqué des classes sur les balises. Une
classe défini un affichage précis pour un élément ou des éléments HTML.
Une classe pourrait définir l'apparence d'un paragraphe spécifique ou
bien celle d'un type de paragraphe précis, tel que les paragraphes de
citations ou les premiers paragraphes d'une section.

Il est possible de changer le ou les classes qui s'appliquent à un
élément HTML en JavaScript tout comme il est possible de vérifier si une
ou plusieurs classes sont appliquées sur un élément particulier. Pour ce
faire, il faut utiliser les propriétés et les méthodes suivantes :

**Propriétés :**

Element.className

Contient le ou les classes qui s'appliquent à l'objet sous forme
d'une chaine de caractère.

Element.classList (ES5)

Une propriété en lecture seule qui contient un tableau des classes
appliquées à Element.

> Cette propriété peut se modifier à l'aide de méthodes (voir les
> méthodes classList plus bas).

**Méthodes :**

Element.classList.add(classe) (ES5)

Ajoute la classe passée en paramètre de la liste de classe de Element.

Element.classList.remove(classe) (ES5)

Retire la classe passée en paramètre de la liste de classe de Element.

Element.classList.toggle(classe) (ES5)

> Méthode qui permet d'ajouter ou de retirer la classe passée en
> paramètre selon qu'elle soit déjà appliquée ou non sur Element. Si
> elle est dans la liste de classe de Element, elle sera retirée. Si
> elle n'existe pas dans la liste de classe de Element, elle sera
> ajoutée.

Element.classList.contains(classe) (ES5)

Méthode qui permet de vérifier si une classe existe dans la liste de
classe de Element.

L'exemple suivant montre comment il est possible de changer la classe
qui est appliquée sur un élément selon la classe actuellement appliquée.

Exemple :

// La fonction vérifie si la classe1 est appliquée et applique la
classe2 si c'est le cas, sinon, elle applique classe1.

function changeClasse(id, classe1, classe2)

{

element = document.getElementById(id);

if(element.classList.contains(classe1))

{

element.classList.add(classe2);

}

else

{

element.classList.add(classe1);

}

}

# Objet window
Comme nous l'avons vue précédemment, l'objet `window` possède des propriétés spécifiques du navigateur telles que la taille de la fenêtre et l'url du document, mais aussi des méthodes et des propriétés plus générales telles que ceux définissant des chronomètres et des intervalles.

## Chronométrage et intervalles
L'API du navigateur permet de créer des comptes à rebours.

**Méthodes**
>`window.setTimeout(fonctionRappel, compte)`
> 
>La méthode crée un compte à rebours selon le paramètre compte (en ms). Lors de la fin du compte, la fonction est appelée. Le compte à rebours est fait en parallèle et ne bloque pas les autres processus. Ne s'exécute qu'une seule fois.
>La méthode retourne un identifiant (nombre) qui peut être passé à la méthode `clearTimeout()` afin d'annuler le compte à rebours. Chaque compte à rebours retourne un identifiant unique.

>`window.clearTimeout(identifiant)` 
>
>Méthode qui permet d'annuler un compte à rebours. La méthode attend un nombre qui est retourné par la méthode setTimeout(). Chaque compte à rebours possède un identifiant unique.

>`window.setInterval(fonction, intervalle)`
>
>La méthode crée un compte à rebours selon le paramètre intervalle (en ms) qui se répète à tous les intervalles. Après chaque intervalle, la fonction est appelée. Le compte à rebours est fait en parallèle et ne bloque pas les autres processus. L'intervalle s'exécute en boucle tant qu'il n'est pas arrêté avec la méthode clearInterval().
>La méthode retourne un identifiant (nombre) qui peut être passé à la méthode `clearInterval()` afin d'arrêter le compte à rebours. Chaque compte à rebours retourne un identifiant unique.

>`window.clearInterval(identifiant)`
>
>Méthode qui permet d'annuler un compte à rebours d'intervalle. La méthode attend un nombre qui est retourné par la méthode `setInterval()`. Chaque compte à rebours d'intervalle possède un identifiant unique.

# Navigation et url
L'objet window contient aussi des propriétés et des méthodes qui permettent de contrôler la navigation et de connaître l'URL de la page
chargée.

Le principal objet de navigation est la propriété `location`.

>`window.location`
>La propriété location contient un objet de type Location qui possède des propriétés et des méthodes spécifiques à l'URL de la fenêtre active. La lecture directe de la propriété renvoie toujours la valeur de la propriété href de l'objet Location en faisant un appel implicite à la méthodes `toString()`. La propriété est éditable. L'assignation d'une valeur force un changement d'URL dans le navigateur, de la même façon qu'un lien cliqué par l'usager. Les propriétés de l'objet Location sont éditables de la même manière et provoque un changement d'URL après l'assignation. La valeur assignée à la propriété location peut être relative.

**Propriétés de l'objet location :**
>`location.href`
>Contient l'URL complète.
>
>Exemple :
>"http://www.exemple.com:1234/page/index.html?q=exemple&a=1#resultat"

>`location.protocol`
>Contient la partie protocole de l'URL.
>
>Exemple : "http:"

>`location.host`
> 
>Contient la partie hôte et port de l'URL.
>
>Exemple : "www.exemple.com:1234"

>`location.hostname`
>
> Contient la partie hôte seulement de l'URL.
>
> Exemple : "www.exemple.com"

>`location.hash`
>
> Contient la partie de l'ancre de l'URL après le symbole # (*hash* en anglais)
>
> Exemple : "#resultat"

>`location.pathname`
>
>Contient le chemin d'accès de l'URL.
>
> Exemple : "/page/index.html"

>`location.port`
>
> Contient le numéro du port de l'URL.
>
> Exemple : "8080"

>`location.search`
>
> Contient la partie de requête de l'URL.
>
> Exemple : "?q=exemple&a=1"

**Méthodes de l'objet location :**

> `location.assign(url)`
>
> Charge un nouvel url, comme si la propriété location.href avait été modifiée.

>`location.replace(url)`
> Charge un nouvel url, en modifiant l'historique. La page précédemment chargée ne peut plus être atteint en reculant dans l'historique du navigateur.

> `location.reload()`
>
> Recharge la page en cours.

**Objet** history

Un second objet permet de contrôler la navigation. La propriété history
de l'objet window permet de charger une page qui est dans l'historique
du navigateur.

**Propriétés :**

history.length

> Retourne le nombre d'item de l'historique.

**Méthodes :**

history.back()

> Charge la page précédente dans l'historique

history.forward()

> Charge la page suivante dans l'historique

history.go(index)

> Se déplace selon la valeur du paramètre index dans l'historique.
>
> Exemple :
>
> history.go(-2); //recule de 2 pages

Il faut noter que pour des raisons de sécurité et de protection des
données confidentielles, les URLs de l'objet history ne peuvent être
lus directement.

L'environnement de l'usager

Afin de déterminer l'apparence des éléments Web affichés sur l'écran
de l'usager, il est parfois nécessaire de connaître la configuration de
son matériel. La taille de l'écran, le nombre de couleur affichable ou
le type de navigateur utilisé sont des informations qui peuvent
s'avérer utiles. L'objet window possède deux propriétés qui permettent
d'accéder à ces informations : navigator et screen.

L'objet de type Navigator qui possède des propriétés spécifiquement
relié au navigateur. Certaines de ses propriétés ne sont pas standard et
peuvent être défini différemment d'un navigateur Web à l'autre.

Propriétés :

navigator.appName

> Retourne une chaine spécifiant le nom du navigateur.

navigator.appVersion

> Retourne une chaine spécifiant la version du navigateur.

navigator.userAgent

> Retourne une chaine spécifiant le navigateur.

navigator.platform

> Retourne une chaine spécifiant le système d'exploitation.

navigator.online

> Retourne une valeur booléenne qui spécifie si la page est vu en-ligne
> ou hors-ligne.

navigator.geolocation (ES5)

> Objet de géolocalisation (voir section Géolocalisation).

**Méthodes :**

navigator.javaEnabled()

> Méthode qui retourne une valeur booléenne selon la disponibilité de
> l'interpréteur Java

navigator.cookiesEnabled()

> Méthode qui retourne une valeur booléenne selon l'état des témoins
> (cookies)

Objet Screen

La seconde propriété, l'objet screen, possède 5 propriétés qui
retournent des informations à propos de la fenêtre du navigateur.

**Propriétés :**

screen.width

> Retourne la largeur de l'écran de l'usager (en pixel)

screen.height

> Retourne la hauteur de l'écran de l'usager (en pixel)

screen.availWidth

> Retourne la largeur disponible pour l'affichage de la page dans
> l'écran de l'usager (en pixel). La taille des menus et des barres
> d'outils du navigateur est soustrait de la taille de l'écran.

screen.availHeight

> Retourne la hauteur disponible pour l'affichage de la page dans
> l'écran de l'usager (en pixel). La taille des menus et des barres
> d'outils du navigateur est soustrait de la taille de l'écran.

screen.colorDepth

> Retourne le nombre de couleurs disponibles selon la configuration de
> l'utilisateur (16, 24 ou 32 bits)



## Modification des règles dans la feuille de style

Les deux manières présentées précédemment modifiaient les règles de
style qui étaient appliquées sur les éléments du DOM. Il est aussi
possible d'agir directement sur la liste des règles CSS défini dans la
feuille de style, qu'elle soit externe ou non.

Les feuilles de styles (plusieurs CSS peuvent être attachés à une page
Web) se retrouvent dans la propriété document.styleSheet qui est un
objet sous forme de tableau. Cette propriété contient toutes les
feuilles de styles attachées au document. On peut alors modifiées ou
bien seulement activées ou désactivées.

Pour désactiver ou activer une feuille de styles

Afin d'activer ou de désactiver une feuille de styles spécifique, il
faut utiliser la propriété modifiable *disabled* de l'objet styleSheet.
Si elle est *true*, la feuille sera désactivée et la valeur false la
réactivera.

Exemple :

// le code suivant désactive la première feuille de style

document.styleSheet[0].disabled = true;

En plus d'activer et désactiver les diverses feuilles de styles, il est
possible d'interroger, d'insérer ou d'effacer des règles. Bien qu'il
soit plus commun et peut-être une meilleure pratique que d'appliquer
diverses classes sur un élément afin de faire varier son apparence, il
se peut que l'on ait besoin de modifier dynamique les règles d'une
feuille de styles.

Dans ce cas, on utilisera alors les méthodes et les propriétés suivantes
:

**Propriétés :**

styleSheet.cssRules

> Tableau des diverses règles de la feuille CSS. L'accès à la première
> règle de la première feuille, se fait selon cette syntaxe :
> document.styleSheet[0].cssRules[0]. Chaque règle possède deux
> propriétés pour accéder directement à la règle et au sélecteur.

cssRules.selectorText

Contient le sélecteur de la règle CSS.

cssRules.style

Contient le texte de la règle CSS défini par le sélecteur.

cssRules.cssText

Contient le texte complet de la règle CSS (le sélecteur et le style).

**Méthodes :**

styleSheet.insertRule(regle, index)

> Insère la règle passée en chaine de caractère à la position index. Si
> index est omis, la règle est ajoutée à la fin.

styleSheet.deleteRule(index)

Efface la règle selon index.


# Stratégies et astuces de travail avec les objets



# Exercices sur les objets



# Sources additionnelles
* [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)



