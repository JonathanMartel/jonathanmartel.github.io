---
layout: post
permalink: /phaser-chat-souris
title: "Création d’un jeu simple de poursuite"
path: 2017-11-29-phaser-chat-souris.md
tag: phaser
status: publish
---

Phaser est une librairie javaScript de jeu destiné aux plateformes mobiles et web. Il permet de créer des jeux 2D facilement et de déployer ceux-ci sur des plateformes Web et mobiles. Cet article couvre la création d'un mini-jeu de poursuite du curseur de la souris.


<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

### Création d’un jeu simple
Pour créer un jeu avec Phaser, il faut d’abord créer l’instance qui contiendra le jeu. Pour ce faire vous devez utiliser la méthode [`Phaser.Game()`](https://photonstorm.github.io/phaser-ce/Phaser.Game.html)

#### Création de l'objet Game
L’exemple suivant crée un jeu de 600x600 qui utilisera le mode de rendu disponible (WebGL, Canvas ou aucun  (Phaser.HEADLESS)), dans le body (aucun parent) avec les références vers des fonctions contenant les trois états du système. Les autres paramètres sont laissés à leur valeur par défaut.

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
	jeu.load.image('hero', 'assets/heros.png');   // Chargement de l'image heros.png et assignation de la "clé" "hero" à celle-ci.
}
```
#### Créaction des éléments du jeu
Une fois le chargement des ressources exécutées, le moteur de jeu appel la méthode assigné à l’état `create`. C’est ici que l’on crée les éléments du jeu qui apparaitront sur la scène. 

L’exemple suivant montre comment l’on créer le personnage à partir de l’image chargée. Le personnage sera ici un sprite avec une seule image qui le représente (hero.png). Il sera créé à la coordonnée (16, 16) de la scène. Notez que le point d'origine (0,0) est placé dans le coin supérieur droit. 
```js
/*Création du heros*/
function create() {	// À la creation du jeu 
    this.hero = jeu.add.sprite(16, 16, 'hero');	// Assignation de l’image dans le personnage. 
}
```

#### Contrôle du personnage dans la boucle du jeu
Nous voyons maintenant notre héros dans notre jeu. Maintenant, il ne reste qu’à faire en sorte que le personnage poursuive le curseur de la souris. Pour ce faire, nous allons utiliser la méthode assignée à l’état `update`. Sur chaque image-clé, nous vérifions que la position de la souris à l'aide de la classe [Phaser.Input](https://photonstorm.github.io/phaser-ce/Phaser.Input.html) et nous déplaçons le personnage en conséquence.
 
Il faut donc écrire la fonction `update` de sorte qu’elle fasse la lecture de la position de la souris déplace le héro. 
```js
// Sur chaque frame, lire la position de la souris et déplacer le hero
function update() {	            // Sur chaque frame
   this.hero.x = jeu.input.mousePointer.x;      // Lecture de la position de la souris et assignation de la nouvelle position au héro
   this.hero.y = jeu.input.mousePointer.y;
}
```


#### Ajouter d'autres personnages
Pour rendre le jeu plus intéressant, nous pourrions ajouter un ennemi qui essai d'attraper le personnage. Il n’y a qu’à ajouter une ressource qui contiendra l’image de celui-ci dans le `preload` et placer cette image dans un sprite sur le jeu ([Phaser.Sprite](https://photonstorm.github.io/phaser-ce/Phaser.Sprite.html)). 

La fonction `preload` deviendra :
```js
function preload() {	// Chargement du jeu 
    jeu.load.image('hero', 'assets/hero.png');
    jeu.load.image('ennemi', 'assets/ennemi.png');  // Chargement de la nouvelle image.
}
```

Et la fonction create deviendra : 
```js
function create() {	// À la creation du jeu 
 	this.hero = jeu.add.sprite(16, 16, 'hero');
	this.ennemi = jeu.add.sprite(16, 16, 'ennemi');    // Nouveau sprite
	this.ennemi.x = jeu.width/2;	// Place l’ennemi dans le centre du jeu
	this.ennemi.y = jeu.height/2;
}
```
Maintenant, il faut modifier la fonction update pour que l'ennemi avance vers notre héro selon une vitesse déterminée. Pour ce faire nous devrons calculer le vecteur de direction entre l'ennemi et notre héro avec la classe [Phaser.Point](https://photonstorm.github.io/phaser-ce/Phaser.Point.html).

```js
// Sur chaque frame, lire la position de la souris et déplacer le hero. Ensuite, dirigé l'ennemi vers le hero.
function update() {	            // Sur chaque frame
   this.hero.x = jeu.input.mousePointer.x;
   this.hero.y = jeu.input.mousePointer.y;
   
   var vDistance = Phaser.Point.subtract(this.hero.position, this.ennemi.position); // Soustraire les deux positions.
   var vDirection = Phaser.Point.normalize(vDistance);   // Calculer le vecteur unitaire de la distance, ce qui donne la direction.
   
   this.ennemi.x += vDirection.x*5;      // Déplacer de 5 unités l'ennemi dans la direction du vecteur de direction.
   this.ennemi.y += vDirection.y*5;
   
}
```
Maintenant, l'ennemi poursuit le héro. Mais il manque une condition qui permet à l'ennemi de "gagner" ou bien d'arrêter la poursuite lorsqu'il a rattrapé le héro.
On ajoutera donc une fonction qui permet de vérifier que les deux sprites se touche et ajouter la condition dans la boucle d'update ([Phaser.Rectangle](https://photonstorm.github.io/phaser-ce/Phaser.Rectangle.html)).
```js
// La fonction reçoit deux sprites et vérifie si leur limite entre en intersection l'un avec l'autre. Elle retourne un booléen.
function verifCollision(a,b){
    return Phaser.Rectangle.intersects(a.getBounds(), b.getBounds());
}


// Sur chaque frame, lire la position de la souris et déplacer le hero. Ensuite, dirigé l'ennemi vers le hero.
function update() {	            // Sur chaque frame
   this.hero.x = jeu.input.mousePointer.x;
   this.hero.y = jeu.input.mousePointer.y;
   if(verifCollision(this.hero, this.ennemi) == false){ // Condition de la poursuite.
       var vDistance = Phaser.Point.subtract(this.hero.position, this.ennemi.position); // Soustraire les deux positions.
       var vDirection = Phaser.Point.normalize(vDistance);   // Calculer le vecteur unitaire de la distance, ce qui donne la direction.

       this.ennemi.x += vDirection.x*5;      // Déplacer de 5 unités l'ennemi dans la direction du vecteur de direction.
       this.ennemi.y += vDirection.y*5;
   }
  
}
```

Le jeu est maintenant complété. Nous n'avons pas inclus de condition gagnante ni perdante pour le héro. La gestion des conditions de fin de jeu sera vue dans un autre article.




