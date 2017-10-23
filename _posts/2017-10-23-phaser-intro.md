---
layout: post
permalink: /phaser-intro
title: "Création d’un jeu simple"
path: 2017-10-23-phaser-intro.md
tag: phaser
---

Phaser est une librairie de jeu destiné aux plateformes mobiles et web. 


<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

### Création d’un jeu simple
Pour créer un jeu avec Phaser, il faut d’abord créer l’instance qui contiendra le jeu. Pour ce faire vous devez utiliser la méthode [`Phaser.Game()`](https://photonstorm.github.io/phaser-ce/Phaser.Game.html)

#### Création de l'objet Game
L’exemple suivant crée un jeu de 600x600 qui utilisera le mode de rendu disponible (WebGL, Canvas ou aucun  (Phaser.HEADLESS)), dans le body (aucun parent) avec les références vers des fonctions contenant les 3 états du système. Les autres paramètres sont laissés à leur valeur par défaut.

```js
var jeu = new Phaser.Game(600, 600, Phaser.AUTO, '' ,  { preload: preload, create: create, update: update });

function preload() {	// Chargement du jeu 
}

function create() {	// À la creation du jeu 
}

function update() {	// Sur chaque frame
}
```
#### Chargement des ressources
Dans un deuxième temps, il faut charger les ressources (*assets*) du jeu. Ceci se fait dans l’état `preload()` à l’aide de la classe [Phaser.Loader](https://photonstorm.github.io/phaser-ce/Phaser.Loader.html). Cet objet permet de charger plusieurs ressources telles des images, des spritesheets, des tilemaps ou des fichiers textes qui seront ajoutés à la scène plus tard.

```js
/*Chargement d’une image*/
function preload() {	// Chargement du jeu 
	jeu.load.image('heros', 'assets/heros.png'); 
}
```
#### Créaction des éléments du jeu
Une fois le chargement des ressources exécutées, le moteur de jeu appel la méthode assigné à l’état create. C’est ici que l’on crée les éléments du jeu. 

L’exemple suivant montre comment l’on créer le personnage à partir de l’image chargée
```js
/*Création du heros*/
function create() {	// À la creation du jeu 
   this.heros = jeu.add.sprite(16, 16, 'heros');	// Assignation de l’image dans le personnage.
}
```

#### Contrôle du personnage dans la boucle du jeu
Nous voyons maintenant notre héros dans notre jeu. Maintenant, il ne reste qu’à contrôler ce dernier à l’aide des touches du clavier. Pour ce faire, nous allons utiliser la méthode assignée à l’état `update`. Sur chaque frame, nous vérifions que la touche est pressée et nous déplaçons le personnage en conséquence.
 
Pour lire les touches du clavier, nous devons d’abord modifier la fonction `create` en lui ajoutant une ligne qui permet d’assigner le contrôleur du clavier à une propriété.
```js
/*Création du personnage et récupération du contrôle avec le clavier*/
function create() {	// À la creation du jeu 
   this.heros = jeu.add.sprite(16, 16, 'heros');	// Assignation de l’image dans le personnage.
	this.clavier = jeu.input.keyboard;
}
```
Ensuite, il faut écrire la fonction `update` de sorte qu’elle fasse la lecture des touches pressées et déplace le héros.

```js 
/*Sur chaque frame, lire le clavier et agir sur la vitesse de déplacement*/
function update() {	// Sur chaque frame
	var velocite = {x:0, y:0};	// La vitesse initiale
   if(this.clavier.isDown(Phaser.Keyboard.A)) { // Est-ce que la touche A est pressé
      	velocite.x = -5;	// Vitesse de -5 en x
   }
   else if(this.clavier.isDown(Phaser.Keyboard.D)) {  // Est-ce que la touche D est pressé
   	velocite.x = 5; // Vitesse de 5 en x
   }
   if(this.clavier.isDown(Phaser.Keyboard.S)) {	// Est-ce que la touche S est pressé
   	velocite.y = 5;	// Vitesse de 5 en y
   }
   else if(this.clavier.isDown(Phaser.Keyboard.W)) {  // Est-ce que la touche W est pressé
   	velocite.y = -5; // Vitesse de -5 en y
   }
		// Ajout de la vitesse en x et y à la position du personnage.
    this.heros.x += velocite.x;
    this.heros.y += velocite.y;
    
}
```
#### Ajouter d'autres personnages
Pour rendre le jeu plus intéressant, nous pourrions ajouter un ennemi. Il n’y a qu’à ajouter une ressource qui contiendra l’image de celui-ci dans le `preload` et placer cette image dans un sprite sur le jeu. 

La fonction `preload` deviendra :
```js
function preload() {	// Chargement du jeu 
	jeu.load.image('heros', 'assets/heros.png');
	jeu.load.image('ennemi', 'assets/player.png'); 
}
```

Et la fonction create deviendra : 
```js
function create() {	// À la creation du jeu 
 	this.heros = jeu.add.sprite(16, 16, 'hero');
	this.ennemi = jeu.add.sprite(16, 16, 'ennemi');
	this.ennemi.x = jeu.width/2;	// Place l’ennemi dans le centre du jeu
	this.ennemi.y = jeu.height/2;
  	this.clavier = jeu.input.keyboard;
}
```



### Sources :
https://stackoverflow.com/questions/35237779/difference-between-an-iife-and-non-iife-in-javascript-modular-approach
https://toddmotto.com/mastering-the-module-pattern/
https://toddmotto.com/typescript-setters-getter
https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e
https://atendesigngroup.com/blog/factory-functions-javascript