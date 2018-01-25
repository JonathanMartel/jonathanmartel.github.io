---
layout: post
permalink: /phaser-scale
title: "Ajustement de la taille du jeu sur différents périphériques"
path: 2018-01-10-phaser-scale.md
tag: phaserio
status: draft
---
Source : 
https://gist.github.com/jdnichollsc/f4f4af1cc6aa697bb274

Cet article porte sur les techniques et stratégies qui permettent d'adapter la dimension des jeux faits avec Phaser pour divers types d'écran. Deux stratégies seront explorées soit (1) l'adaptation de la dimension de la vue du jeu et (2) l'ajustement de la dimension du jeu en maintenant une proportion constante. 

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>



La multitude des modèles et taille de périphérique est un enjeu constant de le développement Web. Si pour une page Web, la fluidité des contenus comme le texte est assez simple à mettre en oeuvre sur plusieurs tailles de périphérique, l'expérience immersive du jeu demande un ajustement plus précis et occupant l'entièreté de la page. Pour y arriver, il y a principalement 2 stratégies qui peuvent être déployées. La première consiste à adapter la vue ou la taille de la caméra du jeu en fonction de la taille et de la proportion du périphérique. Un écran plus large donnera une plus grande vue sur le jeu en largeur et un écran plus haut donnera un point de vue plus haut dans le jeu. De cette manière, le jeu occupera toujours 100% de la dimension de l'écran. La deuxième solution consite à fixer la taille de la vue du jeu à une certaine taille et une certaine proportion (9:16 par exemple) et d'ajuster la taille de la vue pour maximiser la dimension du jeu dans le périphérique. Ainsi, le jeu occupera 100% de la hauteur ou 100% de la largeur de l'écran. Le reste sera comblé par un espace vide autour du jeu. 

> Inséré ici des captures d'écran qui montre ce que j'explique...





S'est d'autant vrai pour les jeux puisque n
Dans cet article, nous allons voir comment gérer les animations des sprites avec Phaser. Les animations des sprites ne sont qu'un simple changement de texture fait selon une cadence (*framerate*) spécifique. Pour créer une animation, il faut donc fournir une séquence de textures empaquettées dans un seul fichier source (png, jpg, etc). Cette séquence d'image, appelée *spritesheet* ou *texture atlas*, sera utilisée comme source de texture. Chaque *frame* sera une image de la séquence. Une animation d'une seconde à une cadence de 30 images par seconde aura 30 images dans son spritesheet. Plusieurs outils permettent de créer des spritesheets. Les spritesheets utilisés ici ont été créé à partir de Adobe Animate.

> La différence entre un *spritesheet* et un *texture atlas* est que le premier contient uniquement des éléments de même taille, tandis que le second contient un ensemble d'images (ou textures) empaquettées qui peuvent être de différente taille. Les animations seront fait à partir de spritesheet.

D'abord, nous expliquerons comment utiliser un *spritesheet* simple pour animer un sprite. Ensuite, nous verrons comment utiliser un fichier JSON qui permet de gérer plusieurs animations avec un seul *spritesheet*.



> L'ensemble des exemples montré sont partiels, c'est-à-dire que le code montré n'est pas complet. Les parties du code non montré ont déjà fait l'objet d'un article précédent. Le code complet est disponible sur Github : [Code complet](#)

### Animation simple
Afin de charger l'image, nous allons, contrairement à une simple texture chargée à l'aide de la méthode (Phaser.Loader.image())[https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#image], nous allons utiliser la méthode (Phaser.Loader.spritesheet())[https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#spritesheet]. Cette méthode demande plus de paramètres que la précédente, notamment la taille des images du *spritesheet*, la marge et le *padding* entre les éléments. Pour l'exemple suivant, déterminons que nos images ont 32x32 pixels et qu'ils n'ont pas de marge, ni de *padding*. La dimension finale du fichier d'image n'est pas importante, Phaser utilisera le nombre et la position des *frames* à partir de la dimension de chaque (32x32). Les images n'ont pas à être sur une seule ligne, l'image globale peut donc contenir plusieurs lignes. Par contre, si l'image globale contient des frames vides il faudra spécifier le nombre de frame valide, sinon la séquence animée contiendra des blancs. Par exemple, une animation de 30 frames répartie sur 8 colonnes contiendra deux frames vides (4 lignes de 8 images = 32, donc 2 de trop)

Le sprite sera ensuite créé comme les autres en utilisant la méthode [Phaser.GameObjectFactory.sprite()](https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#sprite). Par défaut, le premier frame de l'animation sera utilisé comme texture pour le sprite si rien n'est spécifié.

```js
etat.prototype = {
    preload : function(){
        // chargement d'un spritesheet de 30 image de 32x32 pixels
        _jeu.load.spritesheet('hero', './assets/hero.png', 32, 32, 30);
    },
    create: function(){
        // création du sprite
        this.hero = _jeu.add.sprite(0,0, "hero");
    },
    update : function(){
    
    }
}
```

Nous avons alors un sprite construit à partir d'un spritesheet, mais aucune animation. Il faudra procéder à la création de l'animation et à son démarrage. L'animation devra être ajoutée à l'animationManager du sprite avec la méthode [Phaser.AnimationManager.add()](https://photonstorm.github.io/phaser-ce/Phaser.AnimationManager.html#add). Par la suite, en fonction des paramètres de création et du contexte du jeu, il faudra contrôler l'état de l'animation (démarrer, arrêter, etc) et la vitesse d'exécution avec les propriétés et les méthodes de la classe [Phaser.Animation](https://photonstorm.github.io/phaser-ce/Phaser.Animation.html).

L'exemple suivant montrera comment à partir du clavier, nous pouvons contrôler l'état de l'animation. Les touches `Haut` et `Bas` monteront et baisseront la cadence et la touche `Espace` démarrera et arrêtera l'animation.

```js
etat.prototype = {
    preload : function(){
        // chargement d'un spritesheet de 30 image de 32x32 pixels
        _jeu.load.spritesheet('hero', './assets/hero.png', 32, 32, 30);
    },
    create: function(){
        // création du sprite
        this.hero = _jeu.add.sprite(0,0, "hero");
        // Création de l'animation dans le sprite
        this.animMarche = this.hero.animations.add('marche', null, 30, true)
        
        // démarrage de l'animation à 30 fps
        this.animMarche.play("marche");
        
        // Configuration des touches du clavier
        this.clavier = {
                            up : _jeu.input.keyboard.addKey(Phaser.KeyCode.UP),
                            down : _jeu.input.keyboard.addKey(Phaser.KeyCode.DOWN),
                            spacebar : _jeu.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR),
                           };
        
        this.clavier.spacebar.onDown.add(this.arret, this);
        
    },
    update : function(){
        if(this.animMarche.isPlaying){
            if(this.clavier.up.isDown){
                if(this.animMarche.speed < 120){
                    this.animMarche.speed += 1;
                }
            }
            else if(this.clavier.down.isDown){
                if(this.animMarche.speed > 5){
                    this.animMarche.speed -= 1;
                }
            }

        }
    },
    arret : function(){
        if(this.animMarche.isPlaying){
            this.animMarche.stop();
        }
        else{
            this.animMarche.play();
        }
    }
}
```








Maintenant, voyons comment gérer les interactions et les collisions entre les éléments (héro et ennemis) dans notre boucle `update`.

```js    
etat.prototype = {
    create : function(){
       [...] // Non modifié
    },
    update : function(){
        // Pour chaque ennemi, il faut vérifier la collision avec les autres ennemis. 
        // Nous devrons utiliser deux boucles
        for(var i=0; i< this.aEnnemis.length; i++){ // Pour chaque ennemi
            var ennemi = this.aEnnemis[i];
            for(var j=0; j<this.aEnnemis.length; j++){
                if(ennemi != this.aEnnemis[j]){ // Si l'ennemi n'est pas celui qui est déjà sélectionné
                    _jeu.physics.arcade.collide(ennemi, this.aEnnemis[j]);
                }
            }
        }
    }
}
```
Ouf, une boucle dans une boucle et une condition qui permet de définir que la collision n'est pas appelée avec le même sprite. S'il y avait d'autres éléments à intégrer dans la vérification de la collision (plusieurs obstacles, des éléments du décors, un personnage, etc), le code deviendrait vite beaucoup plus complexe et difficile à gérer. C'est ici que les groupes vont nous permettre de facilement surmonter ces problèmes potentiels.

### Les groupes 
Les groupes permettent, à la manière des tableaux, de faciliter la gestion de plusieurs éléments sur lesquels nous voulons exécuter le même code ou bien appliquer les mêmes propriétés. La gestion de la physique est aussi simplifiée puisqu'un groupe peut être passé en paramètre à la méthode [Phaser.Physics.collide()](https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.html#collide).

#### Refaire la création et la gestion des collisions avec les groupes.
Dans le code suivant, nous utiliserons les groupes afin de créer les 5 ennemis et de gérer les collisions entre eux. Nous utiliserons spécifiquement les physicsGroup qui sont un type particulier de groupe qui applique la physique sur les sprites y étant ajoutés.

La méthode `create()` devient ainsi un peu plus simple.
```js
create : function(){
    _jeu.physics.startSystem(Phaser.Physics.ARCADE);
    _jeu.physics.arcade.gravity = new Phaser.Point(0,0);

    this.hero = _jeu.add.sprite(0,0,"hero");
    _jeu.physics.enable(this.hero);

    // Instanciation d'un groupe physique
    this.pgEnnemis = _jeu.add.physicsGroup(Phaser.Physics.ARCADE);
    
    //Création des 5 ennemis avec une position aléatoire. La physique y est automatiquement appliquée.
    for(var i=0; i<5; i++){
        this.pgEnnemis.create(_jeu.world.randomX,_jeu.world.randomY, "ennemi"); 
    }
    // Utilisation de la méthode setAll() pour configurer les propriétés des éléments du groupe
    // Configuration de la collision avec les limites du monde
    this.pgEnnemis.setAll("body.collideWorldBounds", true);
    
    // Utilisation de la méthode callAll() afin d'appeler une méthode sur l'ensemble des éléments du groupe
    // Taux de rebond des ennemis (bounce)
    this.pgEnnemis.callAll("body.bounce.set", "body.bounce", 1);
    
    // Utilisation de la boulce forEach des groupes pour appeler une fonction sur les éléments du groupe
    
    this.pgEnnemis.forEach(function(element){
        element.body.velocity.x = (Math.random()*200)-100;
        element.body.velocity.y = (Math.random()*200)-100;
    })
    // Notez que l'ensemble des propriétés et des méthodes appelées précedemment aurait pu l'être sur le forEach...    
        
    }
    this.curseur = _jeu.input.keyboard.createCursorKeys();
},
```
Il existe donc plusieurs façons de configurer les éléments dans le groupe. Les méthodes `setAll()`, `callAll()` et `forEach()` servent à définir les propriétés, appeler les méthodes et boucler sur les éléments du groupe. Elle s'implifie grandement le code.

Maintenant, pour la boucle `update` nous pouvons utiliser les groupes. La gestion des collisions deviendra : 
```js    
update : function(){
    // Gestion des collisions entre tous les éléments du groupe.
    _jeu.physics.arcade.collide(this.pgEnnemis, this.pgEnnemis);
}
```
Wow! Simple! La collision entre un sprite et un groupe aussi peut être gérer facilement en passant le sprite en paramètre.



### Finalement
Nous avons maintenant complété un exemple de base qui permet de gérer plusieurs éléments ensemble en utilisant les groupes. Les groupes peuvent aussi servir de réservoir de sprite (*pool*). Cette technique permet d'éviter de créer des sprites et de les détruire tout au long du jeu. Elle consiste à créer des objets dans un groupe, appeler sur eux la méthode `kill()` et à chaque fois que l'item est nécessaire dans le jeu, la faire revivre avec `revive()`. Ainsi, nous pourrons utiliser 10-15 ennemis ou projectile seulement pour un jeu complet évitant ainsi de multiplier les instanciations et la destruction de sprite dans le jeu, pouvant être très couteux en temps de calcul et en espace mémoire. La technique de gestion d'un pool de ressource sera vu dans un autre article.



### Sources : 

