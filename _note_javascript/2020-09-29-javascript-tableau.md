---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-tableau
title: "Les tableaux"
path: 2020-09-29-javascript-tableau.md
tag: js
status: publish
has_children: true
toc: javascript-note
order: 13
collection: note_javascript
   
---

Les tableaux sont une collection de valeur de type indéfini. Chaque valeur est appelée un élément et chaque élément a une position, nommée index. Un tableau peut contenir n'importe quel objet ou type de valeur, même une fonction. Le premier élément est à l'index 0 et le dernier à l'index `tableau.length-1`. La déclaration d'un tableau est dynamique (sans taille fixe) et peut contenir des trous, c'est-à-dire des éléments de valeur `null`. Contrairement à d'autres langages comme PHP, les tableaux en JavaScript sont toujours indexés numériquement. Par le fait même, l'ordre des éléments est garanti et toujours le même. Les opérations de tri déplacent les valeurs en brisant l'association `clé=valeur`. 

Comme dans bien d'autres langage les tableaux et les chaines sont similaires dans leur manipulation et très important à comprendre. D'ailleurs, en JavaScript, il existe plusieurs type hérité des tableaux avec lesquelles il est fort utile de savoir travailler (voir [Le modèle de document](#) pour plus de détails).

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Utilisation des tableaux
## Création de tableau
La création de tableau se fait de manière dynamique en utilisant les `[]` et l'opérateur d'assignation `=`. Un tableau peut être déclaré vide ou bien avec des valeurs. Comme il est dynamique et n'a aucune taille ou type de contenu prédéfini, il est possible d'ajouter des éléments à tout moment.

Exemple :
```js
let tableau = []; //Tableau vide
let reponse = ["a", "b", "c"]; // Tableau à 3 index qui contient des chaînes
// Tableau qui contient plusieurs types de valeurs, même un autre tableau
let divers = [1, true, "Jonathan", ["a", "b", "c"]];
```

Il est aussi possible de créer un tableau comme une instance d'objet de type `Array` en utilisant le mot-clé `new`.

Exemple :
```js
let tab2 = new Array(); // Tableau vide
let tab3 = Array(); // Appel implicite du constructeur
let tab4 = new Array(10); // Crée un tableau de 10 valeurs vides
let tab5 = new Array(10, 15, 50); // Crée un tableau avec certaines valeurs
```

## Accès aux données d'un tableau
Afin d'accéder aux données d'un tableau, il faut utiliser les `[]` et un index numérique qui représente l'ordre des éléments du tableau. 

Exemple :
```js
let divers = [1, true, "Jonathan", ["a", "b", "c"]];
let valeur = divers[0];
console.log(valeur); // => 1
console.log(divers[1]); // => true
console.log(divers[2]); // => "Jonathan"
```

Il est aussi possible de connaître la longueur total d'un tableau en utilisant la propriété `length`. Celle-ci retournera le nombre d'élément du tableau et dans le cas d'un tableau ayant des valeurs `null`, il retournera la valeur de l'`index + 1` de la position du dernier élément non `null` du tableau. Un tableau de longueur `0` est un tableau vide. 

Exemple :
```js
let divers = [1, true, "Jonathan", ["a", "b", "c"]];
let nombre_item = divers.length;
console.log(nombre_item);       // => 4
let autre_divers = [];
console.log(autre_divers.length)    // => 0

```

Il est aussi possible de connaitre la valeur du dernier élement d'un tableau puisqu'il est toujours placé à la position `length-1`.
```js
let divers = [1, true, "Jonathan", ["a", "b", "c"]];
let dernier_element = divers[divers.length-1] 
console.log(dernier_element)        // => ["a", "b", "c"]
```

## Ajouter des éléments dans un tableau
Il est possible d'assigner une valeur à un index spécifique dans le tableau. Notez qu'un tableau peut contenir des indexes vides ou `null` et que sa longueur est dynamique. L'assignation d'un valeur dans un index spécifique écrase la valeur déjà présente, elle n'insère pas l'élément à partir de l'index. 

Exemple :
```js
let monTableau = [];        // Création d'un tableau vide
monTableau[2] = 4;          // Assignation d'une valeur à l'index 2
console.log(monTableau[0])  // => undefined
console.log(monTableau[2])  // => 4
let divers = [1, true, "Jonathan", ["a", "b", "c"]];
divers[1] = false;
console.log(divers)         // => [1, false, "Jonathan", ["a", "b", "c"]];
```
> N'oubliez pas que le premier item est placé à l'index 0

Il est possible aussi possible d'ajouter des éléments à la suite d'un tableau déjà défini en utilisant la propriété `length` puisque celle-ci retourne toujours la prochaine position vide du tableau. 

Exemple :
```js
let divers = [1, true, "Jonathan", ["a", "b", "c"]];
console.log(divers.length)      // => 4
divers[divers.length] = "test";
console.log(divers.length)      // => 5
console.log(divers)         // => [1, true, "Jonathan", ["a", "b", "c"], "test"];
```

Certaines méthodes des tableaux, telles que `push()`, `unshift()` et `splice()` permettent d'insérer, sans écraser, des valeurs dans un tableau. La méthode `push(element1, ..., elementN)` permet d'ajouter un élément à la fin du tableau. Elle est similaire à `array[array.length] = element`, mais `push()` permet d'insérer plusieurs éléments dans un même tableau. La méthode retourne la nouvelle longueur du tableau.

Exemple :
```js
let unTableau = [1,2,3];
console.log(unTableau[3]);  // => undefined
unTableau.push(5);          // Ajoute la valeur 5 après le dernier index
console.log(unTableau[3]);  // => 5
unTableau.push(1,2,3);      // Ajoute les valeurs 1, 2 et 3 après le dernier index
console.log(unTableau);     // => [1,2,3,5,1,2,3]
```
La méthode `unshift(element1, ..., elementN)` permet d'insérer un ou plusieurs éléments à l'index 0 en décalant les autres. Comme `push()`, la méthode retourne la nouvelle longueur du tableau.

Exemple :
```js
let unTableau = [1,2,3];
unTableau.unshift(5);        // Ajoute la valeur 5 avant la valeur à l'index 0
console.log(unTableau[0]);  // => 5
console.log(unTableau);     // => [5,1,2,3]
```

Quant à elle, La méthode `splice(début, nbASupprimer, [element1, ..., elementN ])` est plus complexe et ressemble plus à un couteau suisse ! Elle permet d'insérer, de remplacer et d'effacer des éléments dans un tableau en fonction de ses paramètres. Pour insérer simplement des éléments, il faut préciser l'index du début de l'insertion et les éléments à insérer en laissant le paramètre `nbASupprimer` à 0. La méthode retourne un tableau avec les éléments supprimés, lorsque le paramètre `nbASupprimer` est à 0, le tableau retourné est vide `[]`.

> Attention à l'utilisation de `splice()` dans ce contexte puisqu'un tableau vide n'est pas `false`

Exemple
```js
let unTableau = [1,2,3];
unTableau.splice(0,0, 1,2,3);               // Ajoute la valeur 1,2 et 3 avant la valeur à l'index 0
console.log(unTableau);                     // => [1, 2, 3, 1, 2, 3]
unTableau.splice(unTableau.length,0, 4);    // Ajoute la valeur 4 à la fin du tableau
console.log(unTableau);                     // => [1, 2, 3, 1, 2, 3, 4]
unTableau.splice(2,0, 99);                  // Ajoute la valeur 99 à l'index 2 en décalant les autres valeurs
console.log(unTableau);                     // => [1, 2, 99, 3, 1, 2, 3, 4]
```

## Retirer des éléments dans un tableau
Il est aussi possible de retirer des éléments à un tableau en utilisant les méthodes `pop()`, `shift()` et notre couteau suisse `splice()`. `pop()` supprime le dernier élément du tableau et le retourne, réduisant la longueur de la chaine de 1. `shift()` produit un effet similaire, mais en supprimant et retournant l'élément placé à l'index 0 et décalant les autres valeurs. Quant à `splice()`, elle retourne un tableau comprenant les valeurs effacées entre `début` et `début + nbASupprimer`.

Exemple
```js
let unTableau = [1,2,3,4,5];
let nPop = unTableau.pop();
console.log(nPop, unTableau)    //=> 5, [1,2,3,4]
let nShift = unTableau.shift();
console.log(nShift, unTableau)    //=> 1, [2,3,4]

unTableau = [1,2,3,4,5];
let aSplice = unTableau.splice(1, 3);
console.log(aSplice, unTableau)    //=> [2,3,4], [1,5]
```

`splice()` permet aussi de remplacer les valeurs supprimés en insérant des valeurs de remplacement. Si le nombre de valeur inséré est moindre ou supérieur au nombre supprimé, la longueur du tableau est modifiée

Exemple
```js
let unTableau = [1,2,3,4,5];
let aSplice = unTableau.splice(1, 3, 99, 88, 77);
console.log(aSplice, unTableau)    //=> [2,3,4], [1, 99, 88, 77, 5]
unTableau.splice(0, 2, 66);
console.log(unTableau)    //=> [66, 88, 77, 5]
unTableau.splice(3, 1, 55, 44, 33);
console.log(unTableau)    //=> [66, 88, 77, 55, 44, 33]
```

## Parcourir un tableau
La plupart du temps, le traitement d'un tableau demande qu'on le parcours en entier afin d'y trouver la valeur requise ou bien d'effectuer une opération sur l'ensemble des valeurs. De manière traditionnel en JavaScript, nous utilisons la boucle itérative `for()` pour parcourir un tableau.

Exemple : 
```js
let unTableau = [1,2,3,4,5];
for(let i=0; i<unTableau.length ; i++)
{
    unTableau[i] = unTableau[i]*2;      // Double la valeur
}
console.log(unTableau);         // [2,4,6,8,10]
```
Il est aussi possible d'appliquer un traitement qui modifie ou extrait des éléments d'un tableau. Dans ce cas, il faudra être attentif à la manière de traiter le tableau. Par exemple, si nous voulons retirer toutes les valeurs impaires d'un tableau en utilisant `splice()` vaut mieux parcourir le tableau à partir de la fin. 

Exemple (mauvais): 
```js
let unTableau = [1,1,2,2,3, 3, 3, 4];
for(let i=0; i<unTableau.length ; i++)
{
    if(unTableau[i]%2 == 1){
        unTableau.splice(i, 1); 
    }
}
console.log(unTableau);         // [1, 2, 2, 3, 4]
```
> En parcourant le tableau de 0 à length et en effaçant la valeur impaire, `splice()` décale les autres valeurs. i pointe donc sur la nouvelle valeur qui vient d'être décalé. Pour ne pas subir les effets de décalage des valeurs, il faut parcourir le tableau de la fin vers le début.

Exemple (bon): 
```js
let unTableau = [1, 1, 2, 2, 3, 3, 3, 4];
for(let i=unTableau.length-1; i>=0; i--)    // De length-1 à 0
{
    if(unTableau[i]%2 == 1){
        unTableau.splice(i, 1); 
    }
}
console.log(unTableau);         // [2, 2, 4]
```

Il est aussi possible de créer un second tableau qui contiendra les valeurs requises pour éviter les problèmes de manipulation des indexes.
Exemple: 
```js
let unTableau = [1, 1, 2, 2, 3, 3, 3, 4];
let aPairs=  [];
for(let i=0; i<unTableau.length ; i++)
{
    if(unTableau[i]%2 == 0){
        aPairs.push(unTableau[i])
    }
}
console.log(aPairs);         // [2, 2, 4]
```

Il est aussi possible d'utiliser la programmation fonctionnelle pour effectuer ce même type de traitement, mais ça déborde la portée de ce chapitre (voir [Programmation avancés](#))

## Trier un tableau
Javascript intègre des fonctions pour réaliser des tris sur les valeurs des tableaux. La fonction `sort([fn])` permet d'effectuer un tri de base ou un tri avancé, selon le paramètre qui lui ait passé. 

```js
let unTableau = [1, 0, -2, 4, 1, 5, 99, -999];

```


## Simuler des tableaux à plusieurs dimensions

Si d'autres langages de programmation définissent des tableaux à plusieurs dimensions (c, c++), en JavaScript on ne peut définir directement ce type de tableau. Mais puisqu'un tableau peut en contenir d'autres, on pourra définir ce type de tableau de la manière suivante.

Exemple :
```js
/* Tableau représentant un jeu d'échec
* N = noir, B = blanc, T = Tour, F = fou, C = cavalier, R = Reine, P = Pion
*/
let echec = [
    ["T1N", "C1N", "F1N", "RN", "RoiN", "F2N", "C2N", "T2N"], // Rang 1
    ["P1N", "P2N", "P3N", "P4N", "P5N", "P6N", "P7N", "P8N"], // Rang 2
    ["","","","","","","",""], // Rang 3
    ["","","","","","","",""], // Rang 4
    ["","","","","","","",""], // Rang 5
    ["","","","","","","",""], // Rang 6
    ["P1B", "P2B", "P3B", "P4B", "P5B", "P6B", "P7B", "P8B"], // Rang 7
    ["T1B", "C1B", "F1B", "RoiB", "RB", "F2B", "C2B", "T2B"] // Rang 8
];

echec[0][0]; // => "T1N"
echec[7][7]; // => "T2B"
```
> Notez que le tableau n'a pas besoin d'être carré ou même rectangulaire. Si dans l'exemple précédent le tableau possède le même nombre d'élément pour chaque index, il pourrait en être autrement en fonction de ses besoins.

<!-- 
# Principales propriétés et méthodes
L'API de JavaScript défini plusieurs propriétés et méthodes qui peuvent être appelées sur les tableaux.

## Propriétés :
`tableau.length`
> Retourne le nombre d'élément dans un tableau ou l'index+1 du dernier élément. La propriété est éditable. Un changement de valeur tronquera ou augmentera la taille du tableau.

## Méthodes :
`tableau.concat(valeur, ...)`
> Retourne un nouveau tableau formé par la concaténation des valeurs au tableau.

`tableau.join([separateur])`
> Retourne une chaine de caractères composée des éléments de tableau, séparés par separateur. Si aucun séparateur n'est fourni, la virgule est utilisée.

`tableau.pop()`
> Retourne le dernier élément du tableau, décrémente la longueur totale et efface l'élément. Si le tableau est vide, retourne undefined.

`tableau.push(valeur, ...)`
> Ajoute un élément à la fin du tableau et incrémente la longueur totale du tableau. Retourne la nouvelle taille du tableau. Les méthodes push() et pop() permettent d'utiliser un tableau comme une pile (*stack*) FILO (*first in, last out*).

`tableau.reverse()`
> Renverse l'ordre de tableau. La méthode ne retourne pas un nouveau tableau.

`tableau.shift()`
> Retourne le premier élément de tableau, efface l'élément et décale les autres éléments d'une position. La méthode modifie directement tableau.

`tableau.slice(debut, [fin])`
> Retourne la portion de tableau spécifiée entre debut et fin. Si debut est négatif, l'index démarre par la fin. Si fin est absent, ce sont tous les éléments entre debut et la fin de tableau qui sont retournés.

`tableau.sort([fonctionDeTri])`
> Retourne une référence triée de tableau. Le tri se fait directement sur tableau et non sur une copie. Optionnellement, la méthode attend une fonction de tri. Cette fonction doit attendre deux paramètres, a et b, et retourner une valeur négative si a < b, 0 si a == b et une valeur positive si a>b.

tableau.splice(debut, effacer, valeur, ...)
> Permet d'insérer, de retirer ou de remplacer plusieurs éléments de tableau. L'insertion ou l'effacement commence à l'index debut. Le paramètre effacer permet de spécifier le nombre d'élément à effacer dans tableau. S'il est à 0, aucun élément ne sera effacé. Les autres paramètres sont optionnels et définissent les éléments à insérer dans tableau. La méthode retourne les éléments effacés.

Exemple :
```js
let a = [1,2,3,4,5,6];
a.splice(1,2); // Retourne [2,3]; a = [1,4,5,6]
a.splice(1,1); // Retourne [4]; a = [1,5,6]
a.splice(1,0,2,3) // Retourne []; a = [1,2,3,5,6]
```
`tableau.unshift(valeur, ...)`
> Insère les valeurs entrées en paramètres au début de tableau. La méthode modifie directement tableau. Retourne la nouvelle longueur de tableau.

`tableau.lastIndexOf(valeur, [index])`
> Retourne la position du dernier élément de tableau qui est égal à valeur. Chercher à partir de index. Retourne -1, si aucun résultat trouvé.

`tableau.map(fonction, [item])`
> Appel fonction pour chaque éléments de tableau. La méthode retourne un tableau de même dimension que tableau. Pour chaque élément la fonction est appelée avec les paramètres suivants : fonction(array[i], i, array)
Le paramètre item contient l'objet tableau (this).

`tableau.every(predicat, [item])`
> Retourne vrai si le predicat retourne pour tous les éléments du tableau la valeur vrai et faux dans l'autre cas. Pour chaque élément le predicat est appelé avec les paramètres suivants : `predicat(array[i], i, array)`
Le paramètre item contient l'objet tableau (this).
Exemple :
`[3,4,5].every(function(x) {return x>2;}); //=> true`
`[3,4,5].every(function(x) {return x>3;}); //=> false`

`tableau.filter(predicat, [item])`
> Retourne les éléments du tableau qui sont vrai selon le predicat. Pour chaque élément le predicat est appelé avec les paramètres suivants :
`predicat(array[i], i, array)`
Le paramètre item contient l'objet tableau (this).

Exemple :
`[3,4,5].filter(function(x) {return x>3;}); //=> [4,5]`
`[3,4,5].filter(function(x) {return x<=4;}); //=> [3,4]`

`tableau.forEach(fonction, [item])`
> Appel fonction pour chaque élément de tableau. Pour chaque élément la fonction est appelée avec les paramètres suivants : `fonction(array[i], i, array)`
Le paramètre item contient l'objet tableau (this).
Exemple :
`[3,4,5].forEach(function(x, i, a) {return a[i]++;}); // => [4,5,6]`

`tableau.indexof(valeur, [index])`
> Retourne la position de la première occurrence de valeur trouvée à partir de l'index (optionnel). Retourne -1 si la valeur n'est pas trouvée.

`tableau.reduce(fonction, [initiale])`
> Méthode qui permet de réduire les valeurs de tableau. La fonction doit attendre deux valeurs et en retourner une seule. La méthode appelle fonction tableau.length-1 fois. Elle est appelée une première fois avec les deux premières valeurs de tableau et ensuite avec la valeur de retour et la prochaine valeur de tableau. Le paramètre initial permet d'introduire une valeur initiale qui sera insérée comme premier élément du tableau. La méthode retourne la valeur de la dernière invocation de fonction.>
Exemple :
`[1,2,3,4].reduce(function(x, y){return x*y;}); //=>24:((1*2)*3)*4`

`tableau.reduceRight(fonction, [initiale])`
> La méthode est similaire à tableau.reduce(). La différence est qu'elle opère de droite à gauche, de l'index le plus grand au plus petit

`tableau.some(predicat, item)`
> Retourne true, si au moins un élément du tableau qui est vrai selon le predicat et false, si aucuns éléments retournent faux. Le paramètre item contient l'objet tableau (this).
-->
# Stratégies et astuces de travail avec les tableaux



# Exercices sur les tableaux



# Sources additionnelles
* [Array \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array)



