---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-dom-event
title: "La gestion des événements"
path: javascript-DOM-evenement.md
date: "2022-08-16"
tag: js
status: publish
toc: javascript-note
order: 21
collection: note_javascript
   
---





<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Les événements

Le JavaScript côté client, c'est-à-dire dans un navigateur, est basé sur un modèle de programmation conçu autour d'événements asynchrones.
Le navigateur Web génère des événements en fonction de ce qui se passe dans le document ou la fenêtre. Les fonctions JavaScript peuvent alors
recevoir des avertissements lors de l'événement et produire un comportement en réponse. Les types d'événements qui peuvent être générés varient énormément, pensons notamment à un clic de souris, la fin du chargement du document, le défilement de la mollette de la souris, lorsqu'un usager appuie sur une touche du clavier, etc. Si le programme a besoin de répondre à l'événement, il doit l'enregistrer et spécifier une fonction qui sera appelée à chaque occurrence de celui-ci. Cette fonction sera appelée un gestionnaire d'événement.

## Les types d'événement

Il existe plusieurs types d'événement qui peuvent être générés par le navigateur. Il n'existe cependant pas de standard ou de liste défini d'événement possible. Leur nombre varient de jour en jour en fonction du développement de nouveau navigateur, mais aussi en fonction des diverses plateformes qui apparaissent. Les plateformes mobiles et les écrans multitouches ont fait apparaître plusieurs événements en rapport avec la gestuelle des doigts sur l'écran.

Toutefois, il est possible de définir des catégories générales d'événement qui permettent de mieux comprendre quels sont les événements possibles.

### Événements dépendants du périphérique d'entrée 
Ces événements comprennent tous les comportements qui sont liés à un périphérique d'entrée particulier comme ceux provenant des mouvements
de la souris (Relâchement d'un bouton, déplacement, défilement, etc), du clavier et des écrans tactiles.

### Événements indépendants du périphérique d'entrée 
Ce sont les événements qui ne sont pas liés à un périphérique particulier. Ce sont par exemple les événements comme le fait de cliquer sur un bouton, un lien ou dans un champ de texte. Comme cet événement peut être fait à partir d'un clavier, d'une souris ou d'un geste du doit, il devient indépendant du périphérique

### Événements de l'interface utilisateur 
Ceux-ci sont spécifiquement liés à l'interface utilisateur et sont générés principalement par les changements fait sur les éléments HTML.
Le déplacement du curseur dans un champ texte d'un formulaire ou bien le changement d'état d'une case à cocher sont de cette catégorie.

### Événements de changement d'état

D'autres événements ne sont pas liés à un geste de l'utilisateur. Ils viennent uniquement de changement d'état de la page ou de la réception de données en provenance du serveur. Lorsque le document est pleinement chargé, par exemple, un événement de ce type est généré.

### Événements selon un API spécifique 

L'ajout de plusieurs APIs augmente aussi le nombre d'événement possible. Ces dernières sont liés à des modules spécifiques, tels que ceux liés au glisser-déposer et aux événements de la balise `<video>` ou `<audio>` en HTML.

## L'enregistrement de gestionnaire d'événements

Il existe trois manières d'enregistrer un gestionnaire d'événement, c'est-à-dire de spécifier quelle fonction sera lancée lors de la
réception de l'événement. Les deux premières façons de faire sont présentés pour des raisons historiques, elles ne sont pas recommandé et ont des effets indésirables.

### Par les attributs (à ne pas faire)

La première manière consiste à entrer le code JavaScript à exécuter dans un attribut spécifique des balises HTML. L'exemple suivant montre
comment on peut enregistrer l'appel de la fonction console.log() lors d'un clique sur un paragraphe spécifique.

Exemple :
```js
<p onclick="console.log('Vous avez cliqué ici !');">Cliquez ici</p>     // Très mauvais code.
```
Il est même possible d'enregistrer plusieurs instructions dans l'attribut de l'événement. Il faut alors séparer les instructions
correctement par des points-virgules ou bien inscrire les valeurs de l'attribut sur plusieurs lignes.

Exemple :
```js
<button onclick="console.log('Vous avez cliqué ici !'); console.log('Testde bouton'); ">Cliquez ici</button>    // Vous allez perdre votre emploi pour ça!
```
Les attributs d'événement changent selon le type de balise.

Comme vous le savez, il faut éviter de mélanger le JavaScript et le HTML, comme il est de mise de distinguer le CSS du HTML. Dans ce cas, il faudra éviter d'utiliser cette manière de faire.

### Par la propriété de l'objet window (ouf, limite acceptable, mais pas vraiment acceptable)

Une autre manière d'enregistrer un événement est d'associer une fonction sur la propriété de l'élément cible de l'événement. Cette fonction sera alors appelée lorsque l'événement sera généré par ou sur l'élément cible. L'exemple suivant montre comment enregistrer une fonction sur l'événement onload de l'objet window qui est généré à la fin du chargement du DOM, quand le document est prêt à être lu. La fonction enregistre un autre événement sur la soumission d'un formulaire.

Exemple :
```js
// Enregistrement de l'événement onload avec une fonction d'initialisation qui enregistre une autre fonction sur la soumission d'un formulaire

window.onload = function () {
    let monForm = document.getElementById('monForm'); // Recherche de l'élément

    // Enregistre l'événement onsubmit qui sera lancé avant la soumission du form
    monForm.onsubmit = fonction(){ /* code de la fonction */};
};
``` 
Cette méthode très simple peut poser un problème par contre. En modifiant directement la valeur de la propriété de l'événement, cela remplace tout comportement qui serait déjà attribué à cet événement. Dans le cas de l'écriture d'une librairie qui ajouterait, par exemple, des comportements génériques sur les paragraphes, il ne faudrait pas écraser le code déjà associé à un élément par l'usager de la librairie. La prochaine manière permet d'éviter ce problème et devrait être privilégié en tout temps.

### Avec la méthode *addEventListener()* (Voilà la bonne façon de faire)

Cette troisième manière devrait devenir la manière à privilégier pour attacher ou enregistrer un événement sur un élément cible. Elle permet notamment d'attacher plusieurs fonctions sur le même élément, de contrôler la propagation des événements et maintient la séparation entre le contenu (HTML), la mise en page (CSS) et l'interactivité (JavaScript).

La méthode `addEventListener()` est défini sur l'objet window et pour la majorité des éléments du DOM qui sont des cibles ou des sources potentielles d'événements. La méthode demande trois paramètres (le dernier est optionnel et rarement utilisé), selon la syntaxe suivante :

Syntaxe : 
```js
Element.addEventListener(strEvenement, fctFonction,[boolCapture])
```
`addEventlistener` attache la fonction `fctFonction` sur l'événement `strEvenement` de l'objet `Element`. Le paramètre `boolCapture` prend normalement la valeur false. Ce paramètre est optionnel, mais peut être requis dans certains cas. (Voir la sous-section [Propagation des événements](lien) pour plus de détails).

L'exemple suivant enregistre deux gestionnaires pour l'événement `click` d'un bouton.

Exemple :
```js
let b = document.querySelector('.bouton');
b.addEventListener("click", function(){
                                console.log("un clique")
                            });
b.addEventListener("click", function(){
                                console.log("le même clique, mais un autre gestionnaire")
                            });
```
> Dans l'exemple, la chaine "un clique" sera affichée avant "le même clique, mais un autre gestionnaire". Les gestionnaires sont appelés dans l'ordre. 

Il est à noter que la fonction de rappel, le gestionnaire d'événement, n'a pas à être une fonction anonyme. Elle peut être une fonction nommée (ou une fonction fléchée).

Exemple : 
```js
function clicBouton () {
    console.log("le même clique, mais un autre gestionnaire")
} 
let b = document.querySelector('.bouton');
b.addEventListener("click", ()=> {
                                console.log("un clique")
                            });
b.addEventListener("click", clicBouton);
```
Dans le cas de la fonction nommée `clicBouton`, notez que c'est l'objet function `clicBouton` qui est passé en paramètre et non l'appel de la fonction `clicBouton()`. 

## Retrait d'un gestionnaire d'événements
Il est aussi possible de retirer un gestionnaire d'événement en utilisant la méthode `removeEventListener()`

Syntaxe :
```js
cible.removeEventListener(strEvenement, fctFonction,[boolCapture]);
```

## Définir un gestionnaire d'événement

Le gestionnaire d'événement est une fonction qui doit être enregistrée sur un événement particulier et qui sera appelée lorsque l'événement surviendra. Une simple fonction qui n'attend pas de paramètre peut être utilisée, mais la fonction qui est utilisée comme gestionnaire d'événement peut être définie d'une meilleure façon. 

Lorsque le gestionnaire d'événement est appelé, il est généralement appelé avec un objet Event en paramètre. Ceci permet de créer des gestionnaires d'événement capable d'identifier la source de l'événement et la cible précise. On peut alors attacher le même gestionnaire sur plusieurs éléments.

La syntaxe générique d'un gestionnaire d'événement devrait être la suivante :

Syntaxe :
```js
function gestionnaire(evenement) {
    // Placer le code source du gestionnaire ici
}
```
Par défaut le gestionnaire d'événement reçoit un objet de type `Event` qui décrit le type d'événement et ses propriétés. Pour un événement `click`, par exemple, il contiendra une référence à l'élément cliqué, la position du curseur, etc. Plusieurs usages peuvent être fait de cet objet, donc notamment en lien avec la propagation des événements.

## Propagation des événements

Les événements en JavaScript ne sont pas exclusivement générés sur l'élément en cause, mais se propage dans le DOM selon la hiérarchie des éléments. Ainsi, un clique sur un lien dans un paragraphe sera disponible pour l'élément cliqué, mais aussi pour le paragraphe, pour la division dans lequel se trouve le paragraphe, pour la balise corps, pour le document et pour la fenêtre. Cette propagation est très importante dans la configuration et la définition des gestionnaires d'événement. Il n'est donc pas nécessaire d'attacher le gestionnaire d'événement sur l'élément cliqué pour être capable de le gérer. Tous les événements peuvent être capté à un niveau supérieur ou inférieur selon les paramètres et les besoins.

Il existe deux phases dans la propagation de l'événement. La première phase, la phase de *capture*, est disponible lorsque le paramètre `boolCapture` de la méthode `addEventListener()` est mise à `true`. Ceci permet aux éléments qui sont les ancêtres de la cible de l'événement de capter l'événement avant la cible originale. Ainsi, si l'on clique sur un paragraphe dans une division, celle-ci pourrait capter l'événement avant le paragraphe et ainsi en faire un traitement. La seconde phase est le *bubbling* qui permet aux éléments qui sont les ancêtres de la cible de l'événement de recevoir aussi l'événement, mais après la cible originale. Si `boolCapture` est mis à true, la phase de *bubbling* existera aussi.

### Arrêter la propagation de l'événement ou les comportements par défaut
Il est possible de cesser la propagation des événements dans le DOM ou bien les comportements par défaut. Pour prévenir le comportement par défaut (soumission d'un formulaire sur le clic du bouton submit ou sur la touche "Enter", changement de page sur le clic d'une balise `<a>`, etc), le gestionnaire d'événement peut appeler la méthode `Event.preventDefault()`. Il est aussi possible d'arrêter la propagation de l'événement (capture ou bubbling) à travers le DOM. La méthode `Event.stopPropagation()` permet d'arrêter la propagation de l'événement à travers le DOM, c'est-à-dire que les autres gestionnaires attachés à la cible seront appelés, mais les autres niveaux de propagation ne seront pas appelés. Pour empêcher les autres gestionnaires d'événement sur le même objet, il est aussi possible d'arrêter immédiatement la propagation en utilisant la méthode `Event.stopImmediatePropagation()`. Dans ce cas, les autres gestionnaires du même événement ne seront pas appelées. 

## Objet Event
Chaque type d'événement défini ses propres propriétés, mais il existe des propriétés de base plus générales qui sont partagées par plusieurs types.

> Propriétés :
> - Événement.clientX, Événement.clientY
>   - Contient la position du pointeur de la souris lors de l'événement
> - Événement.currentTarget
>   - Contient l'élément qui est la cible actuel de l'événement. Si l'événement se propage, le currentTarget change
> - Événement.target
>   - Contient l'élément qui est la cible originale de l'événement.
> - Événement.preventBubble()
>   - Arrête la phase de bubbling
>- Événement.preventCapture()
>   - Arrête la phase de capture
> - Événement.preventDefault()
>   - Prévient le comportement par défaut de l'événement.
> - Événement.stopPropagation()
>   - Arrête la propagation de l'événement dans sa phase actuelle (*capture* ou *bubbling*).

### Quelques-uns des événements
Voici une liste non exhaustive de quelques événements intéressants

- abort
    - Annulation du chargement par l'usager
- blur
    - L'élément perd le focus
- change
    - Changement du contenu d'un élément (lancé seulement sur la fin du changement, pas sur chaque touche)
- click
    - Sur un clic de souris/clavier/sélection gestuelle
- contextmenu
    - Quand le menu contextuelle est appelé
- dblclick
    - Sur un double clique
- drag
    - Sur le déplacement d'un élément (drag) (Activé sur la source)
- dragend
    - Quand le glisser cesse (Activé sur la source)
- dragenter
    - Début du drag (Activé sur la cible)
- dragleave
    - Fin du drag (Activé sur la cible)
- dragover
    - sur le déplacement d'un élément (Activé sur la cible)
- dragstart
    - L'usager initialise un drag-and-drop (Activé sur la source)
- drop
    - L'usager a terminé le drag-and-drop (Activé sur la cible)
- error
    - Chargement de la ressource en erreur (erreur de réseau)
- focus
    - L'élément a obtenu le focus
- input
    - Un input a été fait sur un élément d'un formulaire (lancé plus souvent que onchange)
- keydown
    - L'usager appuie sur une touche
- keypress
    - Le keypress génère un caractère
- keyup
    - L'usager relâche une touche
- load
    - Le chargement de la ressource est complété
- unload
    - Lancé quand le document ferme (le navigateur ferme ou un changement de page)
- mousedown
    - L'usager appuie sur un bouton de souris
- mousemove
    - L'usager bouge la souris
- mouseout
    - La souris quitte un élément
- mouseover
    - La souris est au-dessus d'un élément
- mouseup
    - L'usager relâche le bouton
- mousewheel
    - L'usager tourne la molette de souris
- reset
    - Le formulaire est effacé (reset)
- scroll
    - La barre de défilement d'un élément est utilisée
- select
    - L'usager sélectionne du texte dans un élément de formulaire
- submit
    - Quand un formulaire est soumis

# Stratégies et astuces de travail avec les événements
À venir (ou pas)


# Exercices sur la gestion des événements
À venir (ou pas)


# Sources additionnelles
<!-- * [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)-->



