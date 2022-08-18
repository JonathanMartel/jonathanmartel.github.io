---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-dom-formulaire
title: "Travailler avec les formulaires (la base)"
path: javascript-DOM-formulaire.md
date: "2022-08-16"
tag: js
status: publish
has_children: true
toc: javascript-note
order: 22
collection: note_javascript
   
---





<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Traitement des formulaires

Le JavaScript est indispensable pour le traitement des formulaires. Validation de données et création de formulaire dynamique sont au nombre des éléments qui sont importants et très souvent présents sur une application Web ou une page Web.

Le traitement des éléments de formulaire HTML est quelques fois assez complexe méritant donc une section spécifique des notes. Bien que les éléments des formulaires soient intégrés au DOM au même titre que les autres éléments tel que les <div> et les <p>, l'élément <form> à quelques particularités intéressantes. Notons simplement la possibilité d'avoir plusieurs formulaires dans une page, la présence de l'attribut name qui n'est pas exclusif sur les éléments des formulaires et l'interactivité des éléments de liste et de choix (bouton radio, case à cocher, etc.).

# Accès aux éléments du *<form>*

Cet élément fut un des premiers éléments à pouvoir être programmé. Il existe donc des méthodes spécifiques d'accès qui ne sont pas défini dans le DOM pour les items d'un formulaire. Pour que ces manières de faire fonctionnent, il faut toutefois que l'attribut name des items du formulaire soit défini. La définition de l'attribut name est aussi importante lors de la soumission d'un formulaire sur un serveur. Sans l'attribut, les valeurs associées à chaque élément ne sera pas envoyée sur le serveur et donc inutilisable.

Les exemples de code de la section suivantes réfèreront tous au formulaire suivant :
```html
<form id="formulaire" name="formulaire" method="post" action="">
    <p>Nom : <input type="text" name="nom" id="nom" /></p>

    <p>Prénom : <input type="text" name="prenom" id="prenom" /></p>

    <p>
        Choix 1 <input type="checkbox" name="choix[]" value="1"/>
        Choix 2 <input type="checkbox" name="choix[]" value="2"/>
        Choix 3 <input type="checkbox" name="choix[]" value="3"/>
        Choix 4 <input type="checkbox" name="choix[]" value="4"/>
    </p>

    <p>
        <input name="sexe" type="radio" id="sexe_0" value="h" />Homme<br />
        <input name="sexe" type="radio" id="sexe_1" value="f" />Femme
    </p>

    <p>Autre choix : 
        <select name="menu" id="menu">
            <option value="1">valeur 1</option>
            <option value="2">valeur 2</option>
            <option value="3">valeur 3</option>
        </select>
    </p>

    <p>
        <input type="submit" name="button" id="button" value="Envoyer"/>
        <input type="reset" name="button2" id="button2" value="Réinitialiser" />
    </p>

</form>
```
Il existe plusieurs manières d'accéder aux éléments d'un formulaire. Cela peut se faire en utilisant les outils du DOM, tel que le `getElementById()`, `getElementsByTagName()`, `getElementsByName()` ou le `queryselector() / querySelectorAll()`.

Les objets des formulaires sont aussi directement accessibles à travers l'objet `Document`. Les formulaires sont considérés comme des objets de type `HTMLCollection`, c'est-à-dire des tableaux d'objets spécifiques. On peut donc accéder à l'élément `<input name='nom'>` des manières suivantes :

```js
//Diverses méthodes d'accès aux éléments avec un attribut name
document.forms.formulaire.nom; // Formulaire avec name=formulaire
document.forms[0].nom; // Si le formulaire est le premier de la page
document.forms.formulaire.elements[0]; // premier élément
document.forms.formulaire.elements.nom; //Élément avec name=nom

document.querySelector("[name='nom'");  // Avec le sélecteur CSS d'attribut (meilleure façon)
document.getElementsByName("nom")[0];  // Si c'est le premier élément avec le name='nom'
// Méthodes d'accès sans attribut name

```
> Dans bien des cas, il vaut mieux privilégier l'usage du `querySelector()` et `querySelectorAll()` qui s'avèrent être des outils puissants et constants.

L'objet `Form` possède plusieurs propriétés. Quatre de ceux-ci servent principalement à définir des valeurs pour la soumission du formulaire à un serveur. Ce sont les propriétés `action`, `encoding`, `method` et `target`. D'autres propriétés de l'objet `Form` sont disponible afin d'accéder aux éléments et propriétés de celui-ci. Chaque élément du formulaire est disponible sous
forme d'un tableau dans une propriété de l'objet `Form` nommée `elements[]`.

La majorité des types d'élément d'un formulaire possèdent quatre propriétés importantes, soit `type`, `form`, `name` et `value`.

**Propriétés :**
> - Element.type
>   - Une chaine en lecture-seule qui identifie le type d'élément (attribut type de la balise), tel que button, checkbox, radio, text, textarea, etc.
> - Element.form
>   - Référence à l'objet Form qui dans lequel se retrouve l'élément.
> Element.name
>   - La valeur de l'attribut name, en lecture-seule.
> - Element.value
>   - Propriété modifiable, elle contient la valeur entrée par l'usager dans l'élément du formulaire ou bien la valeur de l'attribut value. Cette valeur n'est cependant pas disponible pour les boutons radios et les cases à cocher.

### Accès aux valeurs textes des éléments du formulaire

La plupart des éléments entrés dans les formulaires par les usagers sont des chaines de caractères qui se lisent à partir de la propriété `value` des objets `Element`. La valeur retournée ou inscrite dans la propriété sera donc celle du formulaire. L'exemple suivant montre une fonction qui lit la valeur du champ nom et prénom, les concatènent, affiche le résultat dans la console et retourne le résultat.

Exemple :
```js
/*Fonction qui lit la valeur du champ nom et du champ prenom, concatène les valeurs et affiche dans la console.*/

function concatNom() {
    let nom = document.querySelector("[name='nom']").value;
    let prenom = document.querySelector("[name='prenom']").value;
    let nomPrenom = nom + ', ' + prenom;

    console.log(nomPrenom);

    return nomPrenom;
}
```
La lecture de la propriété `value` permet de lire la chaine de caractère inscrite dans le formulaire. Une boite vide retourne la valeur null.

### Accès à l'état des cases à cocher et des boutons radios

La lecture des valeurs des cases à cocher, des listes déroulantes ou des boutons radios ne peut être faite de la même manière. La particularité de ces éléments interactifs demande une approche différente. Comme plusieurs cases peuvent être cochées ou non, et que plusieurs éléments peuvent être sélectionnés ou non dans une liste, c'est l'état de chaque élément qu'il faut vérifier afin d'obtenir leur valeur. Il faut donc utiliser une propriété spécifique des cases à cocher et des boutons radios, la propriété `checked`. Celle-ci est `true` si l'élément est coché et `false` s'il ne l'est pas.

L'exemple suivant est une fonction qui vérifie l'état des cases à cocher dans le formulaire précédent. La fonction vérifie si le `choix1`, le `choix2`, le `choix3` et le `choix4` est coché et retourne un tableau composé des éléments qui sont cochés.

Exemple 1 :
```js 
// Fonction qui lit l'état des quatre cases à cocher et retourne un tableau contenant les éléments sélectionnés
function verifCasesCochees() {
    let casesCochees = [];
    let elements = document.getElementsByName("choix[]");
    for(let i = 0 ; i< elements.length ; i++) {
        if(elements[i].checked) {
            casesCochees.push(elements[i]);
        }
        console.log(element.checked);
    }
    console.log(casesCochees);
    return casesCochees;

}
```
L'exemple précédent pourrait être refactorisé en utilisant `querySelectorAll()` et un sélecteur CSS plus spécifique.

Exemple 2 : 
```js 
function verifCasesCochees() {
    let casesCochees = document.querySelectorAll("[name='choix[]']:checked");
    console.log(casesCochees);
    return casesCochees;
}
```

### Accès aux valeurs des listes déroulants et des menus de sélection multiple

Pour lire les valeurs des items sélectionnés dans une liste de sélection simple ou multiple, il faut utiliser une autre stratégie. Ces deux éléments peuvent se comporter à la fois comme des cases à cocher, mais aussi comme des boutons radio selon que la sélection est simple ou multiple.

Une liste de sélection simple (avec la propriété `type="select-one"`) possède une propriété `selectedIndex` qui indique l'index de l'élément sélectionné. Ceci réfère à un index du tableau de la propriété options qui contient tous les choix disponibles dans la sélection. L'exemple est une fonction qui récupère la valeur de l'élément sélectionné en utilisant cette propriété.

Exemple 1 :
```js
// Fonction qui retourne la valeur de l'option sélectionné dans une liste de sélection simple.
function recupValeurComboSimple() {
    let indexSelection = document.querySelector("[name='menu']").selectedIndex;
    let valeurSelection = document.querySelector("[name='menu']").options[indexSelection].value;
    console.log(valeurSelection);
    return valeurSelection;
}
```
Il est aussi possible d'utiliser un sélecteur CSS plus précis en ciblant les éléments de type `option`.
Exemple 2 :
```js
// Fonction qui retourne la valeur de l'option sélectionné dans une liste de sélection simple.
function recupValeurComboSimple() {
    let elementSelection = document.querySelector("[name='menu'] > option:checked")
    let valeurSelection = elementSelection.value;
    console.log(valeurSelection);
    return valeurSelection;
}
```
Une liste de sélection multiple (avec l'attribut `multiple`) se traite un peu à la manière des cases à cocher. Pour récupérer la valeur, il faut déterminer quels éléments ont été sélectionnés en vérifiant la propriété `selected` de tous les items. L'exemple suivant retourne un tableau de toutes les valeurs des éléments sélectionnés dans une liste de sélection multiple. Le nombre d'élément contenu dans la propriété options[] est donné par la propriété des tableaux `length`.

Exemple 1 :
```js
function recupValeurComboMulti() {
    let itemsSelectionnes = [];
    let element = document.getElementsByName('menu')[0];
    let nombreItem = element.options.length;

    for(let i = 0; i < nombreItem ; i++) {
        if(element.options[i].selected) {
            itemsSelectionnes.push(element.options[i].value);
        }
    }
    console.log(itemsSelectionnes);
    return itemsSelectionnes;

}
```
Le même exemple, en utilisant les sélecteurs CSS et `querySelectorAll()`;
Exemple 2 :
```js
function recupValeurComboMulti() {
    let itemsSelectionnes =  document.querySelectorAll("[name='menu'] > option:checked");
    let nombreItemSelectionnes = itemsSelectionnes.length;
    let valeurItemsSelectionnes = [];

    for(let i = 0; i < nombreItemSelectionnes ; i++) {
        valeurItemsSelectionnes.push(itemsSelectionnes[i].value);
    }
    console.log(valeurItemsSelectionnes);
    return valeurItemsSelectionnes;

}
```


# Stratégies et astuces de travail avec les formulaires
À venir (ou pas)


# Exercices sur les formulaires
À venir (ou pas)



# Sources additionnelles
<!--* [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)-->



