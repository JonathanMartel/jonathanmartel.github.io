---
layout: post
permalink: /phaser-animations
title: "Animation des sprites à partir de spritesheet"
path: 2017-12-13-phaser-animations.md
tag: phaserio
status: publish
---

Dans cet article, nous allons voir comment gérer les animations des sprites avec Phaser. Les animations des sprites sont un simple changement d'image dans un sprite fait selon une cadence (*framerate*) spécifique. Pour créer une animation, il faut donc fournir une séquence d'image empaquettées dans un seul fichier source (png, jpg, etc). Cette séquence d'image, appelée *spritesheet*, sera utilisée comme source. Chaque *frame* sera une image de la séquence. Une animation d'une seconde à une cadence de 30 images par seconde aura 30 images dans son *spritesheet*. Plusieurs outils permettent de créer des *spritesheets*, ceux utilisés dans cet article l'ont été à partir de Adobe Animate.

> La différence entre un *spritesheet* et un *texture atlas* est que le premier contient uniquement des éléments de même taille, tandis que le second contient un ensemble d'images (ou textures) empaquettées qui peuvent être de différente taille. Les animations seront fait à partir de *spritesheet*.

D'abord, nous expliquerons comment utiliser un *spritesheet* simple pour animer un sprite. Ensuite, nous verrons comment utiliser un fichier JSON qui permet de gérer plusieurs animations avec un seul *spritesheet*.


<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

> L'ensemble des exemples montrés sont partiels, c'est-à-dire que le code montré n'est pas complet. Les parties du code non montré ont déjà fait l'objet d'un article précédent. Le code complet est disponible sur Github : [Code complet](#)

### Animation simple
Afin de charger l'image, contrairement à une simple texture chargée à l'aide de la méthode (Phaser.Loader.image())[https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#image], nous allons utiliser la méthode (Phaser.Loader.spritesheet())[https://photonstorm.github.io/phaser-ce/Phaser.Loader.html#spritesheet]. Cette méthode demande plus de paramètres que la précédente, notamment la taille des images du *spritesheet*, la marge et le *padding* entre les éléments. Pour l'exemple suivant, déterminons que nos images ont 32x32 pixels et qu'ils n'ont pas de marge, ni de *padding*. La dimension finale du fichier d'image n'est pas importante, Phaser calculera le nombre et la position des *frames* à partir de la dimension de chacun (32x32). Les images n'ont pas à être sur une seule ligne, l'image globale peut donc contenir plusieurs lignes. Par contre, si l'image globale contient des *frames* vides, il faudra spécifier le nombre de *frames* valides, sinon la séquence animée contiendra des blancs. Par exemple, une animation de 30 *frames* répartie sur 8 colonnes contiendra deux *frames* vides (4 lignes de 8 images = 32, donc 2 de trop)

Le sprite sera ensuite créé comme les autres en utilisant la méthode [Phaser.GameObjectFactory.sprite()](https://photonstorm.github.io/phaser-ce/Phaser.GameObjectFactory.html#sprite). Par défaut, le premier *frame* de l'animation sera utilisé comme image pour le sprite si rien n'est spécifié.

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

Nous avons alors un sprite construit à partir d'un *spritesheet*, mais aucune animation. Il faudra procéder à la création de l'animation et à son démarrage. L'animation devra être ajoutée à l'AnimationManager du sprite avec la méthode [Phaser.AnimationManager.add()](https://photonstorm.github.io/phaser-ce/Phaser.AnimationManager.html#add). Par la suite, en fonction des paramètres de création et du contexte du jeu, il faudra contrôler l'état de l'animation (démarrer, arrêter, etc) et la vitesse d'exécution avec les propriétés et les méthodes de la classe [Phaser.Animation](https://photonstorm.github.io/phaser-ce/Phaser.Animation.html).

L'exemple suivant montrera comment à partir du clavier, nous pouvons contrôler l'état de l'animation. Les touches `Haut` et `Bas` augmenteront et réduiront la cadence et la touche `Espace` démarrera et arrêtera l'animation.

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
                            down : _jeu.input.keyboard.addKey(Phaser.KeyCode.DOWN)
                            spacebar : _jeu.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
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

### Plusieurs animations dans un seul *spritesheet*.
Afin de rendre plus efficace la gestion des animations des personnages d'un jeu, il est possible, au lieu de charger plusieurs *spritesheets*, de combiner plusieurs animations dans un même *spritesheet*. Bien que le travail de fusion des images peut être fait manuellement dans un logiciel d'édition d'image (comme Photoshop), plusieurs logiciels d'animation peuvent produire un spritesheet qui combine plusieurs séquence d'animation, c'est notamment le cas d'Adobe Animate.

> Dans Animate, il suffit de sélectionner plusieurs clip d'animation dans la bibliothèque et de procéder à leur exportation en spritesheet. 

#### Dictionnaire d'animation en format JSON (*Atlas JSON Hash*)
Pour faciliter l'utilisation des *spritesheets* qui combinent plusieurs séquence d'animation, il faut utiliser un fichier "dictionnaire" qui permet de déterminer la position de chaque image dans une séquence d'animation précise. Ce fichier sera donné en paramètre à Phaser afin de déterminer, pour chaque séquence d'animation, où se trouve l'entièreté des *frames*. Ceci permettra, à la fois, de réduire le nombre de fichier de *spritesheet* à charger, mais aussi, de réduire la taille de ceux-ci en permettant la réutilisation d'une même image pour plusieurs frames de l'animation (quand ils sont identitiques). Encore une fois, la création manuelle de ce type de fichier est possible, mais plusieurs logiciels d'animations le génère en même temps que le *spritesheet* associé.

```js
// Exemple d'un fichier Atlas JSON Hash qui contient 2 séquences d'animation (idle et marche)
{
    "frames": {
        "hero_idle0000":
        {
            "frame": {"x":0,"y":0,"w":279,"h":292},
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {"x":0,"y":0,"w":279,"h":292},
            "sourceSize": {"w":279,"h":292}
        },
        "hero_idle0001":
        {
            "frame": {"x":279,"y":0,"w":279,"h":292},
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {"x":0,"y":0,"w":279,"h":292},
            "sourceSize": {"w":279,"h":292}
        },
        [...]
        "hero_idle0079":
        {
            "frame": {"x":279,"y":1168,"w":279,"h":292},
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {"x":0,"y":0,"w":279,"h":292},
            "sourceSize": {"w":279,"h":292}
        },
        "hero_marche0000":
        {
            "frame": {"x":558,"y":1168,"w":279,"h":292},
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {"x":4,"y":0,"w":287,"h":297},
            "sourceSize": {"w":287,"h":297}
        },
        "hero_marche0001":
        {
            "frame": {"x":837,"y":1168,"w":280,"h":292},
            "rotated": false,
            "trimmed": true,
            "spriteSourceSize": {"x":3,"y":0,"w":287,"h":297},
            "sourceSize": {"w":287,"h":297}
        }
    [...]
    }
}
```
Le fichier décrit chaque *frame* des séquences (position, taille, etc) en référence au *spritesheet*. 

#### Chargement du dictionnaire et du *spritesheet*
Pour charger le fichier JSON et le spritesheet, le code de preload deviendra : 
```js
etat.prototype = {
    preload : function(){
        // chargement du fichier JSON et du spritesheet
        _jeu.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
    },
    create: function(){
        // création du sprite
        this.hero = _jeu.add.sprite(0,0, "hero");
    },
}
```
Ceci permet de charger le fichier JSON et le *spritesheet* associé. De la même façon que l'animation simple, le premier *frame* servira d'image de base pour le sprite. 

Une fois le fichier chargé, il faut créer les objets permettant la manipulation des séquences d'animation (démarrage, arrêt, etc). Pour ce faire, nous allons utiliser la méthode [Phaser.Animation.generateFrameNames()](https://photonstorm.github.io/phaser-ce/Phaser.Animation.html#_generateFrameNames). Cette méthode permet de générer un tableau comprenant le nom des *frames*. Ce tableau sera ensuite passé en paramètre à la méthode [Phaser.AnimationManager.add()](https://photonstorm.github.io/phaser-ce/Phaser.AnimationManager.html#add).


```js
create: function(){
    // création du sprite
    this.hero = _jeu.add.sprite(0,0, "hero");
    
    // Génère le tableau des noms de frame (hero_marche0000 à hero_marche0029)
    var aAnimFrameMarche = Phaser.Animation.generateFrameNames('hero_marche', 0, 29, '',4);
    this.hero.animations.add('marche', aAnimFrameMarche, 30, true);
    
    // Génère le tableau des noms de frame (hero_idle0000 à hero_idle0079)
    var aAnimFrameIdle = Phaser.Animation.generateFrameNames('hero_idle', 0, 79, '',4);
    this.hero.animations.add('attente', aAnimFrameIdle, 30, true);
},
```

#### Contrôle des séquences 
Maintenant, voyons comment contrôler les séquences en modifiant le code de l'exemple de l'animation simple. Les touches `Haut` et `Bas` permettent de changer la vitesse de l'animation, les touches `gauche` et `droite` permet de changer l'animation et la touche `espace` permet d'arrêter et de redémarrer l'animation.

```js
etat.prototype = {
    preload : function(){
        // chargement du fichier JSON et du spritesheet
        _jeu.load.atlasJSONHash('hero', 'assets/hero.png', 'assets/hero.json');
    },
    create: function(){
        // création du sprite
        this.hero = _jeu.add.sprite(0,0, "hero");

        // Génère le tableau des noms de frame (hero_marche0000 à hero_marche0029)
        var aAnimFrameMarche = Phaser.Animation.generateFrameNames('hero_marche', 0, 29, '',4);
        this.hero.animations.add('marche', aAnimFrameMarche, 30, true);
    
        // Génère le tableau des noms de frame (hero_idle0000 à hero_idle0079)
        var aAnimFrameIdle = Phaser.Animation.generateFrameNames('hero_idle', 0, 79, '',4);
        this.hero.animations.add('attente', aAnimFrameIdle, 30, true);

        // démarrage de l'animation `attente` à 30 fps
        this.hero.animations.play("attente");
        
        // Configuration des touches du clavier
        this.clavier = {
                            up : _jeu.input.keyboard.addKey(Phaser.KeyCode.UP),
                            down : _jeu.input.keyboard.addKey(Phaser.KeyCode.DOWN),
                            droite : _jeu.input.keyboard.addKey(Phaser.KeyCode.RIGHT),
                            gauche : _jeu.input.keyboard.addKey(Phaser.KeyCode.LEFT),
                            spacebar : _jeu.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR)
                       };
        
        this.clavier.gauche.onDown.add(this.changeAnim, this);
        this.clavier.droite.onDown.add(this.changeAnim, this);
        this.clavier.spacebar.onDown.add(this.arret, this);
        
    },
    update : function(){
        //Change la vitesse de l'animation courante
        if(this.clavier.up.isDown){
            if(this.hero.animations.currentAnim.speed < 120){
                this.hero.animations.currentAnim.speed += 1;
            }
        }
        else if(this.clavier.down.isDown){
            if(this.hero.animations.currentAnim.speed > 5){
                this.hero.animations.currentAnim.speed -= 1;
            }
        }
    },
    arret : function(){
        // Arrête ou démarre l'animation active.
        if(this.hero.animations.currentAnim.isPlaying){
                this.hero.animations.currentAnim.stop();
        }
        else{
            this.hero.animations.currentAnim.play();
        }
    },
    changeAnim : function(){
        // Vérifie l'état (arrêt ou jouer) de l'animation active
        var bAnimationPlay = this.hero.animations.currentAnim.isPlaying;
        
        // Arrêter l'animation active
        this.hero.animations.currentAnim.stop();
        
        // Si l'animation était 'attente', changer pour marche (et vice-versa)
        if(this.hero.animations.currentAnim.name == "attente") {
            this.hero.animations.currentAnim = this.hero.animations.getAnimation("marche");
        }
        else {
            this.hero.animations.currentAnim = this.hero.animations.getAnimation("attente");
        }

        // Si l'animation était déjà démarrée, la redémarrer.
        if(bAnimationPlay)
        {
            this.hero.animations.currentAnim.play();
        }
    }
}
```
Ainsi, nous pouvons contrôler quelle séquence d'animation "attente" ou "marche" sera jouée. Nous pourrions ajouter d'autres séquences et ainsi avoir un ensemble d'animation pour un jeu (marche, course, attaque, saut, etc). Chaque animation pourrait être placé dans le même spritesheet et être contrôlé à l'aide des méthodes des classes Phaser.AnimationsManager et Phaser.Animation.

