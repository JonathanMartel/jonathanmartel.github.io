---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-dom-style
title: "Le DOM"
path: javascript-DOM-style.md
date: "2022-08-16"
tag: js
status: draft
has_children: true
toc: javascript-note
order: 24
collection: note_javascript
   
---





<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

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



