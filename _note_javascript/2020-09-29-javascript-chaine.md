---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-chaines
title: "Les chaines de caractères"
path: 2020-09-29-javascript-chaine.md
tag: js
status: publish
has_children: true
toc: javascript-note
order: 3
collection: note_javascript
   
---
Le traitement des chaînes de caractères est un élément très important en programmation. En JavaScript, il sert régulièrement à valider des données fournies par des champs de formulaire Web.

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Définition des chaines
Les chaines de caractères peuvent être défini de 4 manières différentes. Les deux premières et les plus répondandues utilisent le guillemet simple `'` ou double `"` comme caractère pour marquer le début et la fin d'une chaine. Le même caractère doit être utiliser pour fermer la chaine. Ainsi donc, la chaine `"Ceci est une chaine"` et `'Ceci est une chaine'` sont équivalentes et traité de la même manière en JavaScript. Par contre, `"Ceci est une chaine'` et `'Ceci est une chaine"` ne sont pas valides. Comme l'utilisation du caractère `'` est souvent utilisé en français, en anglais et dans d'autres langues, il est plus commun d'utiliser le double guillement `"` comme délimiteur de chaines afin d'éviter les erreurs ou d'utiliser un caractère d'échappement`\`.

```js
'test';
"test";
'test = "monTest"';     // => test = "monTest"
"test = \"monTest\"";   // => test = "monTest"
"J'aime la programmation JavaScript";   // => J'aime la programmation JavaScript
'J\'aime la programmation JavaScript';   // => J'aime la programmation JavaScript
```

Le constructeur `String(valeur)` permet aussi de créer une chaine et retourne la `valeur` passée en paramètre sous forme de chaine. Bien que rarement utilisé, cette manière de faire permet de convertir des variables de divers types en chaine de caractères. 

Finalement, la norme ECMAScript 2015 vient définir les littéraux de gabarits (*Template litteral*). Cette forme permet d'éviter les problèmes d'échappement des caractères littéraux `'` et `"`, l'ajout de la capacité à créer des chaines multilignes sans utiliser la concaténation, ainsi que la capacité d'interpolation d'expression à même la chaine. 
```js
let langage = "JavaScript";
let chaine = "";
chaine = `J'aime le "JavaScript"`;
chaine = `J'aime le "${langage}"`;
chaine = 'J\'aime le "'+ langage + '"';
chaine = "J'aime le \""+ langage + "\"";
chaine = `J'aime le "JavaScript" sur 
          deux lignes`;
chaine = `J'aime le "${langage}" sur 
          deux lignes`;
chaine = 'J\'aime le "' + langage + '" sur ' +
         'deux lignes';
chaine = "J'aime le \""+ langage + "\" sur " +
         "deux lignes";
chaine = 'J\'aime le "' + langage + '" sur \
deux lignes';
chaine = "J'aime le \""+ langage + "\" sur \
deux lignes";
```

# Utilisation des chaines
Les chaînes de caractères peuvent être assignées à des variables de la même façon que les autres types de valeur. Elles possèdent par contre certaines caractéristiques et peuvent être manipulées de plusieurs façons. L'API de JavaScript définie plusieurs méthodes qui peuvent être appelées sur des chaînes de caractères.

## Concaténation de chaînes
L'addition de deux chaînes de caractères ne produit pas un résultat chiffré, comme l'addition de deux valeurs numériques. L'utilisation de l'opérateur d'addition permettra de concaténer plusieurs chaines ensemble.

Exemple :
```js
// Opérateur de concaténation

let hello = "Hello" + " " + "World"; // Concaténation de trois chaînes

hello; // => "Hello World"
hello += hello; // Concaténation de la valeur de deux chaines dans des variables
hello; // => "Hello WorldHello World"`
```
Il faudra par contre être attentif à ce qu'on concatène ensemble et aux conversions automatiques de type. Il est à noter que la conversion de type se fait habituellement à la faveur d'une chaine, c'est-à-dire que chaque objet peut habituellement être convertie en chaine avec la méthode `toString()` des objets. Ceci aura des conséquences inatendu sur les résultats de certaines concaténation ou certaines opération arithmétique.
```js
// Supposons que l'utilisateur entre 10 dans le champs texte
let valeur = document.querySelector("[name='valeurinitiale']").value;  
valeur = valeur + 1;    
console.log(valeur);       // Résultat attendu 11, résultat obtenu 101.
```
Dans l'exemple précédent, valeur est de type String, puisqu'il provient d'un élément de formulaire. Au lieu de faire l'addition de 1, l'interpréteur fait la concaténation puisque `"10" + 1` n'est pas `10 + 1`. L'interpréteur effectue la conversion de type du nombre `1` vers la chaine `"1"`. Afin d'éviter cette erreur fréquente, il est possible de forcer la conversion. 
```js
// Supposons que l'utilisateur entre 10 dans le champs texte
let valeur = document.querySelector("[name='valeurinitiale']").value;  
valeur = parseFloat(valeur); // parseFloat() pour des réelles, parseInt() pour forcer une conversion vers un entier.
valeur = valeur + 1;    
console.log(valeur);       // Résultat attendu 11, résultat obtenu 11.
```



# Principales propriétés et méthodes

## Propriétés :
`chaine.length`
> Retourne la longueur d'une chaine

## Méthodes :
`chaine.charAt(n)`
> Retourne le caractère qui occupe la position n

`chaine.charCodeAt (n)`
> Retourne l'encodage Unicode du caractère qui occupe la position n

`chaine.concat(valeur, ...)`
> Retourne la chaine de caractère composée de chaine et des valeurs du paramètre

`Static String.fromCharCode(valeur, ...)`
> Retourne la chaine de caractère composée des valeurs Unicode passées en paramètre.

`chaine.indexof(sous-chaine, [index])`
> Retourne l'index de la première occurrence de la sous-chaine trouvée à partir de l'index (optionnel)

`chaine.lastIndexOf(sous-chaine, [index])`
> Retourne l'index de la dernière occurrence de la sous-chaine trouvée à avant l'index (optionnel)

`chaine.replace(valRecheche, valRemplacement)`
> Retourne la chaine de caractère dans lequel les occurrences de la sous-chaine valRecherche seront remplacées par valRemplacement dans chaine.

`chaine.slice(debut, fin)`
> Retourne une nouvelle chaine de caractère qui comprend les caractères entre debut (inclut) et fin (exclut). slice accepte les valeurs négatives.

`chaine.split(delimiteur, [limite])`
> Retourne un tableau de chaines de caractères créé en divisant chaine selon le delimiteur. Le paramètre limite permet de définir le maximum d'éléments retournés dans le tableau.
> Exemple :
> `"1:2:3:4".split(":"); //=> ["1","2","3","4"]`

`chaine.substring(debut, fin)`
> Retourne une sous-chaine de caractères entre debut (inclut) et fin (exclut).

`chaine.toLowerCase()`
> Retourne une copie de la chaine dans laquelle les hauts-de-casses sont converties en bas-de-casses.

`chaine.toUpperCase()`
> Retourne une copie de la chaine dans laquelle les bas-de-casses sont converties en hauts-de-casses.

`chaine.trim()`
> Retourne une copie de la chaine avec les espaces blancs initiaux et finaux retirés



# Exercices sur les chaines



# Sources additionnelles
* [String \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String)



