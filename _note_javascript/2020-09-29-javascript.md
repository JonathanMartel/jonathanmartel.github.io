---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours
title: "Introduction au Javascript"
path: 2020-09-29-javascript.md
tag: js
status: publish
has_children: true
toc: javascript-note
order: 1
collection: note_javascript
   
---
Le ECMAScript ou JavaScript est un langage de programmation interprété de haut-niveau, dynamique, non-typé et orientée objet. Il est principalement utilisé avec deux autres technologies Web : le HTML et le CSS. Dans cette triade, le HTML défini le contenu, le CSS gère l'aspect visuel des éléments de contenu et le JavaScript sert à concevoir l'interactivité des pages.

Comme langage de programmation interprété (en opposition à un langage de programmation compilé), le JavaScript nécessite un environnement spécifique d'interprétation. Aujourd'hui, tous les navigateurs modernes (sur les ordinateurs personnels, les consoles de jeux, les tablettes ou les téléphones intelligents) disposent d'un interpréteur JavaScript, ce qui en fait un des langages de programmation les plus omniprésents de toute l'histoire de l'informatique.

Le JavaScript fut créé par Netscape et enregistré par Sun Microsystem. Sa version standardisée auprès de l'*European Computer Manufacturer's Association* porte le nom de ECMAScript. Lorsqu'il est question de la norme ou d'une version spécifique de JavaScript, il est préférable d'utiliser ECMAScript et non JavaScript.

Les navigateurs intègrent maintenant en continue les développements de JavaScript et on ne peut plus spécifiquement identifier une version numérique.

L'API (*Application programming interface* ou interface de programmation) de JavaScript inclus diverses fonctions pour travailler avec des chaînes de caractères, des tableaux, des dates et des expressions régulières. Contrairement à d'autres langages de programmation, son API n'inclut pas de fonction d'entrée et de sortie. Ces fonctions sont définies par l'environnement d'interprétation dans lequel JavaScript est intégré[^1].

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>


# Syntaxe de base
## Les commentaires
JavaScript accepte deux types de commentaires. Les commentaires multilignes qui débutent par « /* » et se termine par « */ ». Tout ce qui se trouve entre ces deux éléments est considéré comme des éléments ne devant pas être interprétés. Ce type de commentaires est utilisé pour écrire un long descriptif ou bien pour commenter une zone de code que l'on voudrait masquer sans l'effacer. Ce « masque » permet d'empêcher l'interprétation de plusieurs lignes de code sans avoir à les effacer. Très utile lors du dépannage.

Le second type est le commentaire uniligne. Celui-ci début par « // » et se termine à la fin de la ligne. Il sert principalement à commenter une ligne de code spécifique ou bien à masquer une ligne spécifique. Les deux types peuvent être utilisés conjointement. Le commentaire uniligne peut se retrouver incrusté dans un commentaire multiligne sans affecter ce dernier. L'inverse est aussi vrai. Il faut par contre être attentif lors de l'utilisation des commentaires multilignes.
Contrairement au nombre de parenthèses ouvertes et fermées, ce derniers ne sont pas soumis à un compte strict. Tous les caractères qui se retrouve à l'intérieur du commentaire est considéré comme du commentaire, ainsi donc, à la première occurrence de « */ » le commentaire se ferme, peu importe le nombre de symbole d'ouverture inscrit.
```js
/* Début d'un commentaire multiligne
qui se poursuit sur une seconde ligne
malgré un second symbole /* d'ouverture de commentaires
ou un troisième /* à la première occurrence du symbole de fin, il se
ferme */

// Le commentaire multiligne est fermé
```
Les commentaires sont très importants dans le code source. Il permet de documenter le code facilitant d'autant la compréhension de celui-ci par son créateur ou bien par une personne tiers. Trop souvent négligé, il est un outil indispensable du programmeur.

### Standard de commentaire
TODO
Il n'existe pas vraiment de standard dans la documentation en JavaScript. Contrairement à Java qui dispose d'un utilitaire qui permet de générer une documentation en fonction des commentaires dans le code, il n'existe aucune solution utilisée par tous pour faire la même chose en JavaScript. En fait, il en existe plusieurs, qui n'utilisent pas le même standard. Il y a cependant un générateur de documentation, JsDoc, qui utilise le même standard que JavaDoc. Ce standard est même intégré à d'autres langages de programmation comme PHP.

## Les variables
Les variables sont des entités abstraites qui permettent d'enregistrer des valeurs dans un programme. La particularité de ces éléments est qu'en plus de contenir des valeurs sur lequel nous pouvons faire des opérations, qu'il est possible de modifier leur valeur dynamiquement, selon le déroulement du programme. 

### Nomenclature et mot réservé
Les variables doivent débuter par une lettre (a-zA-Z), le symbole $ ou une barre de soulignement (_). Certains mots sont réservés et ne peuvent être utilisé comme nom de variable (voir tableau suivant pour une liste non exhaustive). 
Quelques mots réservés : `break`, `case`, `catch`, `continue`, `const`, `debugger`, `default`, `delete`, `do`, `finally`, `in`, `let`, `new`, `switch`, `throw`, `try`, `var`, `void`, `while`, `with`

## Type
En JavaScript, les variables (ou propriétés lorsque celles-ci sont définies dans des objets) peuvent être de plusieurs types.

### Nombre (*number*)
Les variables de type Nombre contiennent des nombres entiers ou réelles. Dans les faits, JavaScript représente tous les nombres en valeur réelle de 64 bits et ne fait pas de distinction, contrairement à plusieurs langages, entre les entiers et les réels.

### Booléen (*boolean*)
Le type booléen défini uniquement deux valeurs : `true` ou `false`. Toute autre valeur est incompatible avec le type booléen. Ces valeurs sont retournées et utilisées par les opérateurs logiques et de comparaisons. D'autres valeurs peuvent être converties en type booléen. Si toutes les valeurs non `false` sont `true`, les valeurs
suivantes sont toujours converties en valeur `false` : `undefined`, `null`, `0`, `-0`, `NaN`, `""`

### Chaine de caractère (*string*)
La chaine de caractère est une série ordonnée de valeur de 16 bits qui représente un caractère Unicode. Elle possède une longueur qui est défini par le nombre de valeur de 16 bits qu'elle contient. Une chaine de caractère de taille 0 est vide. La chaine de caractère débute et termine avec un guillemet double `"` ou un guillemet simple `'`. Une chaine débutant par un guillemet double doit se terminer par un guillemet double. Celle-ci peut alors inclure le guillemet simple comme caractère. L'inverse est aussi vrai. On utilisera donc le guillemet double lorsqu'une chaine contient une apostrophe ou bien un guillemet simple quand elle contient un guillemet double. 

Si une chaine contient les deux caractères, il faut utiliser le caractère d'échappement `\` avant le caractère à échapper. L'apostrophe sera donc représenté par `\'` et le guillemet double par `\"`.

> Il est aussi possible d'utiliser les littéraux de gabarit (aussi nommé littéraux de chaines) afin de définir des chaines de caractères. On définira le début et la fin de la chaine avec un accent grave ou *back tick* `` ` `` . Leur avantage est qu'elles permettent de définir des chaines multiligne et d'utiliser des fonctions d'interpolation à l'intérieur de celle-ci sans utiliser la concaténation des chaines (voir [Chaine de caractère](js-note-de-cours-chaines) pour plus de détails)

Exemples :

```js
"" // Chaine vide de longueur 0
'test';
'test = "monTest"';
"J'aime la programmation JavaScript";
"test = \"monTest\"";
```
### Tableau
Les tableaux sont une collection de valeur de type indéfini. Chaque valeur est appelée un élément et chaque élément à une position, nommée index. Contrairement à d'autres langages de programmation tels que le C ou le C++, les tableaux JavaScript peuvent contenir n'importe lequel des objets et des types JavaScript, et même en contenir plusieurs différents en même temps. Un tableau peut donc contenir à la fois, un second tableau, un objet prédéfini par l'API JavaScript, un objet créé par le programmeur et une chaine de caractère. En JavaScript, la déclaration d'un tableau est dynamique, c'est-à-dire qu'elle est sans taille fixe et peut contenir des trous. L'index de départ est 0 et peut aller jusqu'à 32 bits.

Exemple :
```js
let tableau = []; //Créer un tableau vide
let prime = [2, 3, 5, 7, 11]; //Tableau des nombres premiers

// Tableau contenant une chaine, un entier, un booléen, un réel et un tableau
let divers = ["test", 1, true, 1.234, ["item1","item2","item3"]];
```

L'accès à un index spécifique se fait en utilisant les crochets `[]` :
```js
prime[3]; // => 7
prime[5] = 13; // Assignation de la valeur 13 à l'index 5
```
### Objet
En JavaScript, le type objet (*Object*) est le type fondamental. Celui-ci permet d'enregistrer et de lire plusieurs variables appelés « propriétés ». Contrairement aux autres types de base de JavaScript, les objets sont mutables, c'est-à-dire qu'ils sont manipulés par référence et non par copie. Si `x` est un objet, `let y = x;`, ne copie pas l'objet `x` dans `y`, mais copie la référence à l'objet dans `y`. Donc `x` et `y` réfère au même objet et possède donc strictement les mêmes propriétés et les mêmes valeurs. Veuillez consulter la section [orienter object] pour plus de détails

Exemple :
```js
let objet = {}; // Objet vide
let objet2 = { // Créer un objet avec 2 propriétés
    propriete1: 45,
    propriete2: 90
};

objet2.propriete1; // => 45
objet2.propriete2; // => 90
objet2.propriete3 = 180; // Déclare une nouvelle propriété par assignation
objet2.propriete3; // => 180

let auteur1 = {
    prenom:"David",
    nom: "Flanagan"
};

let livres =
{
    titre: "Javascript",
    "sous-titre": "Le guide définif", // "" pour un nom de variable illégal
    auteur : auteur1 // Assigne un objet à la propriété auteur
};

livres.auteur.prenom; // => David
```

### Conversion de type
JavaScript permet de convertir automatiquement ou directement des types entre eux. Un nombre peut se convertir en chaine de caractère et inversement à certaines conditions. La comparaison suivantes : `"2" == 2` donne `true`, même si le type n'est pas le même. Dans ce cas, il y a conversion automatique par l'interpréteur. Dans les cas où la conversion n'est pas explicite ou bien automatique, le langage admet une forme directe de conversion de type ou *casting*. 

Liste des types de conversion automatique
Référence : Table 3-2 (Flanagan, 2011, p. 46)

## Les opérateurs

### Opérateurs arithmétiques, incrémentation et décrémentation
```js
+       // Addition
-       // Soustraction
*       // Multiplication
/       // Division
%       // Modulo (reste de division entière)

+=      // Additionne assigne
-=      // Soustrait et assigne
*=      // Multiplie et assigne
/=      // Divise et assigne
%=      // Modulo et assigne

++      // Incrémente
--      // Décrémente
```

### Opérateurs de comparaison
```js
==      // Egalité
!=      // n'est pas égal

<       // plus petit 
>       // plus grand 

<=      // plus petit ou égal
>=      // plus grand ou égal

===     // strict égalité (la valeur et le type)
!==     // Strict différence (la valeur et le type)
```

### Opérateurs logiques
```js
&&      // ET logique
||      // OU logique
```

## Les structures de contrôles
Les structures de contrôles, incluant les tests et les boucles, sont des éléments forts importants de tous les langages de programmation. Comme d'autres langages, JavaScript défini plusieurs structures de contrôle classiques. Si plusieurs ne sont que rarement utilisées, d'autres sont essentielles, voire indispensables, à toute programmation. Les structures de contrôles sont imbriquables, c'est-à-dire qu'elles peuvent en contenir d'autres. Une instruction conditionnelle peut en contenir une ou plusieurs autres et aussi contenir des boucles et d'autres structures de contrôles.

### Conditionnel
La structure de contrôle conditionnelle (if), aussi connu sous le nom d'« alternative » ou de « test SI », permet d'exécuter des instructions en fonction de l'évaluation d'une condition simple ou complexe qui retourne une valeur booléenne. 

Syntaxe de base (si, sinon)
```js
// Test la condition
if(condition) {      
    // Instructions si *condition* est vraie
}
else {                  // L'instruction else est toujours optionnelle
    // Instructions si la condition est fausse
}
```

Syntaxe de base (si, sinon si, sinon)
```js
// Test la condition
if(condition) {       
    // Instructions si *condition* est vraie
}
else if(autreCondition) {
    // Instructions si *condition* est fausse et que *autreCondition* est vraie
}
else { // L'instruction else est toujours optionnelle
    // Instructions si *condition* et *autreCondition* sont fausses
}
```

Une forme courte de la structure de contrôle conditionnelle existe. Nommée opérateur conditionnel ou opérateur ternaire `(?:)`. Cet opérateur sera principalement utilisé lorsque la condition est simple et que l'instruction à exécuter l'est aussi. On évitera d'y placer une condition complexe et des instructions complexes. Pour des raisons de
lisibilité, et ce, même s'il le permet, il est déconseillé d'imbriquer d'autres structures de contrôle dans un opérateur ternaire.

Syntaxe : 
```js
(condition ? Instruction si vrai : Instruction si faux);
```

Exemple :
```js
let sexe = "M";
(sexe == "M" ? console.log("Bonjour Monsieur") : console.log("Bonjour Madame"));    // Affichera Bonjour Monsieur
```

### Le cas ou selon (*switch case*)
Cette structure de contrôle est principalement utilisée pour définir une alternative de traitement en fonction de valeurs de renvoie connues. Selon la valeur d'un élément,  certaines instructions seront exécutées. Très utile quand les valeurs possibles sont connues, comme dans le cas d'une lecture de touche de clavier.

Syntaxe de base (Cas)
```js
switch(valeur) {
    case valeur1:
        // Instructions si valeur == valeur1
        break; // Sortir de l'instruction switch, sans évaluer le reste
    case valeur2:
        // Instructions si valeur == valeur2
        break;
    case valeur3:
        // Instructions si valeur == valeur3
        // Sans break, donc si valeur == valeur3, le cas valeur4 sera aussi exécuté
    case valeur4:
        // Instructions si valeur == valeur4 ou valeur == valeur3
        break;
    default :
        // Instructions si valeur est égale à aucun cas spécifié
        break;
}
```

Exemple  (ouvrez la console pour voir les sorties) :
<!--<script async src="//jsfiddle.net/JonathanMartel/0dutgh5z/4/embed/html,js,result/dark/"></script>-->

<iframe width="100%" height="300" src="//jsfiddle.net/JonathanMartel/0dutgh5z/7/embedded/js,result/dark/" frameborder="0"></iframe>
### Boucle tant que ou boucle indéfinie (while)
La boucle tant que permet d'exécuté des instructions tant qu'une condition est respectée. Les instructions ne sont exécutées que si la condition est vraie. Cette boucle est aussi appelée boucle indéfinie puisqu'elle peut être exécutée un nombre indéfini de fois. Lorsque l'on connait le nombre d'itération de la boucle, mieux vaut utiliser un type de boucle défini comme le compteur (for). Attention : Bien s'assurer que la condition deviendra fausse durant la boucle afin d'éviter les boucles infinies qui feront invariablement planter l'interpréteur.

Syntaxe :
```js
while(condition) {
    // Instructions à exécuter tant que *condition* est vraie
}
```

### Boucle jusqu'à ce que (do, while)
Cette boucle est très similaire à la boucle tant que. La principale différence entre les deux est que celle-ci exécutera au moins une fois les instructions avant de tester la condition.

Syntaxe :
```js
do {
    // Instructions à exécuter une fois et tant que c*ondition* est vraie
}
while(condition)
```

### Boucle définie ou compteur (*for*)
La boucle définie ou compteur est surement la structure de contrôle la plus utilisée et la plus pratique après la structure conditionnelle. La boucle *for* permet de bien contrôler le nombre d'itération exécuté par la boucle en spécifiant clairement les conditions de répétition de la boucle tout en définissant une instruction de comptage à exécuter après chaque itération.

Syntaxe :
```js
for(initialisation; condition ; incrémentation) {
    // Instructions à exécuter tant que *condition* est vraie
}
```

Exemple (ouvrez la console pour voir les sorties) :
<!--<script async src="//jsfiddle.net/JonathanMartel/026sb4y9/embed/js/dark/"></script>-->
<iframe width="100%" height="300" src="//jsfiddle.net/JonathanMartel/026sb4y9/4/embedded/js,result/dark" frameborder="0"></iframe>

Les valeurs d'initialisation, la condition et l'incrémentation sont optionnelles. Si la condition est absente, il faut prévoir une instruction `break` pour quitter la boucle.

### Itérateur (*for in*)
La boucle itérateur est un type spécifique de boucle définie. Elle permet d'évaluer chaque élément d'un tableau ou d'un objet séquentiellement sans utiliser sa longueur explicitement comme condition. Pour chaque élément dans le tableau ou l'objet, elle exécute les instructions comprises dans la boucle. 

Syntaxe
```js
for(propriété/index in *objet/tableau*) {
    // Instructions à exécuter sur chaque élément
}
```

Exemple (ouvrez la console pour voir les sorties) :
<!--<script async src="//jsfiddle.net/JonathanMartel/wva9cuq5/embed/js/dark/"></script>-->
<iframe width="100%" height="300" src="//jsfiddle.net/JonathanMartel/wva9cuq5/1/embedded/js,result/dark" frameborder="0"></iframe>  

# Sources additionnelles
* [Instructions \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions)
* [if...else \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/if...else)
* [switch \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/switch)
* [var \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/var)
* [let \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/let)
* [fonction \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/function)
* [for \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for)
* [while \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/while)
* [do...shile \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/do...while)
* [for...in \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/for...in)
* [Opérateurs \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/Opérateurs)
* [Objets globaux \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/Objects_globaux)



