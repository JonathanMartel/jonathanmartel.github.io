---
layout: post
permalink: /phaser-state
title: "Gestion des états"
path: 2017-12-01-phaser-state.md
tag: phaserio
status: publish
---

Phaser reprend globalement le fonctionnement d’un automate fini (Finite-state machine). Le contrôle du déroulement du jeu se fait en passant d’un état vers un autre selon certaines conditions. Chaque état s’occupe du déroulement d’une séquence précise du jeu, telle que le chargement ou bien l’affichage du menu d’introduction. Par ailleurs, un état peut se charger de la totalité du déroulement du jeu. Chacun de ces états possèdent son propre déroulement au travers de l’appel de méthodes prédéfinies. 

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>


### Gestion des états (state)
Un état se défini à l'aide de la classe `Phaser.State`. Ceux-ci servent à gérer le déroulement des phases de jeu, mais aussi des fonctionnalités de celui-ci. Ils seront utiles autant pour précharger des ressources (avant le début du jeu), gérer l'affichage des menus (chaque menu peut être un état), gérer les niveaux et afficher les informations de fin de jeu (État gagnant ou perdant)

À la création du jeu, il faut définir les divers états existants. Ceux-ci sont dynamiques et peuvent être nommés sans suivre de convention spécifique.

Dans l'exemple suivant, le jeu est créé avec trois états : Chargement, Jouer, Fin.
```js
var jeu = (function(){
    var _jeu = new Phaser.Game(800, 600, Phaser.Auto, 'jeu');
    _jeu.state.add("Chargement", chargement);
    _jeu.state.add("Jouer", jouer);
    _jeu.state.add("Fin", fin);
    
    _jeu.state.start("Chargement");         // Démarrage de l'état Chargement

    return _jeu;
})();
```

Chaque état doit être défini comme un objet et surcharger les méthodes de la classe `Phaser.State` qu'il utilise. Aucunes méthodes ne sont explicitement nécessaires pour qu'un état soit fonctionnel, seules les méthodes nécessaires doivent être surchargées.

Pour fin d'exemple, voici l'état `Chargement`:
```js
var chargement = (function(){
    var _jeu;
    var _chargement = function(jeu){
        _jeu = jeu;
    };
    
    _chargement.prototype = {
        preload: function(){
            _jeu.load.image("bombe", "./assets/bomb.png");
            _jeu.load.spritesheet('eclat', './assets/firework-palette.png', 11, 11, -1);
            _jeu.load.spritesheet('explosion', './assets/explosion.png', 256, 128, -1);
            _jeu.load.image('etincelle', './assets/etincelle.png');
        },
        create : function(){
            _jeu.state.start('Jouer', false);
        }
    };
    return _chargement;
})();
```

#### Ordre d’appel des méthodes de la classe Phaser.State
Le chaque State possède des méthodes qui sont importantes et appelées dans un ordre précis. Généralement, les 4 premières méthodes présenté ci-après sont les plus utilisées. La méthode `paused()` et `resumed()` peuvent être fort pratique afin de gérer des écrans de pause de jeu.

##### `init()`
Première méthode appelée lors du démarrage d’un état. Contrairement aux autres fonctions, celle-ci peut recevoir des paramètres lors du chargement de l’état, ce qui permet de configurer dynamiquement des chargements exécutés dans une fonction ultérieure.

##### `preload()`
Appelée en second dans l’ordre, cette méthode permet le chargement asynchrone des ressources du jeu. Dans cette méthode, il ne faut jamais créer de ressources sans savoir que ceux-ci ont déjà été chargées auparavant.

##### `create()`
Cette méthode est appelée dès que la fonction preload (si elle existe) a terminé et que les ressources ont été chargées. C’est ici que l’on créer les objets du jeu.

##### `update()`
Cette méthode est appelée sur chaque frame durant le cours normal du jeu. C’est ici que la logique du jeu devra être programmée.

##### `paused()`
Cette méthode est appelée lorsque la boucle de jeu (game loop) est mise en pause.

##### `resumed()`
Cette méthode est appelée lorsque le jeu reprend après que la boucle de jeu eut été en pause.

##### `shutdown()`
Cette méthode est appelée lorsqu'un state actif est remplacé par un nouveau state.

##### `render()`
Cette méthode est appelée après que le rendu du jeu soit effectué. Cela permet de créer des effets de post-processing et de corriger potentiellement des problèmes de rendu.

> Notez qu'il existe d'autres méthodes qui ne sont pas couvertes ici. Voir [Phaser.State](https://photonstorm.github.io/phaser-ce/Phaser.State.html)

### Création d'un jeu simple avec des états
La création d'un jeu avec des états demande une petite planification. Il faut d'abord déterminer quels seront ces états. Les états suivent habituellement la séquence d'un jeu. Initialement, nous voyons l'introduction, le menu de départ, le "jeu" et l'écran de victoire/défaite. Chacun de ces éléments peut être un état. Par contre, d'autres, moins liés à la séquence de jeu, sont souvent nécessaires. Il pourrait y avoir un état `Pré-chargement` ou `Demarrage`, responsable de charger rapidement les éléments nécessaires à l'intro ou bien à l'écran de chargement. Ensuite, l'écran `Chargement` ou `Intro` qui permet d'avoir une barre de progression du chargement des ressources nécessaires au jeu ou bien de jouer une animation d'introduction, pendant lequel les ressources du jeu seront chargées. Ensuite un état `Menu` qui permet de faire des choix et de démarrer le jeu. On ajouterait un état `Jouer` qui serait la mécanique du jeu à proprement parler. Finalement, nous pourrions avoir un état `gagnant` et `perdant` pour gérer les séquences de fin de jeu.

L'exemple suivant utilisera les états suivants : Demarrage, Chargement, Menu, Jouer. Une fois le jeu terminé, l'état Menu sera appelé.

D'abord, nous allons créer le jeu dans le fichier `jeu.js`. C'est aussi dans ce fichier que nous allons déclarer les états.
```js
//Dans le fichier jeu.js
(function(){
    var jeu = new Phaser.Game(768, 640, Phaser.Auto);    // Déclaration du jeu
    jeu.state.add("Demarrage", Demarrage);  // Déclaration des états de jeu
    jeu.state.add("Chargement", Chargement);
    jeu.state.add("Menu", Menu);
    jeu.state.add("Jouer", Jouer);
    jeu.state.add("Gagnant", Gagnant);
    jeu.state.add("Perdant", Perdant);
    
    jeu.state.start("Demarrage");         // Appel de l'état Demarrage

})();

```
Ensuite, nous allons définir l'état Demarrage dans le fichier demarrage.js. Cet état servira seulement à pré-charger les éléments nécessaires à l'affichage de notre écran de chargement de ressources. Dès que ces ressources sont chargées, le prochain état est lancé.
```js
// Utilisation du Module pattern
var Demarrage = (function(){
    var _jeu;   // Copie privée de la référence au jeu puisque `this` fait ici référence à l'état Demarrage
    var etat = function(jeu){
        _jeu = jeu;
    }
    etat.prototype = {
        preload : function(){
            // Chargement des ressouces nécessaires à l'écran de chargement
            _jeu.load.image("ecran_demarrage", "./assets/demarrage.jpg");   
            _jeu.load.image("barre_chargement", "./assets/chargement.png");
            _jeu.stage.backgroundColor = "#77B5FE";
        },
        create: function(){
            _jeu.state.start("Chargement", false);      // lancement de l'état "Chargement"
        }  
        
    }
    return etat;
})();
```
Dans le fichier chargement.js, nous allons définir le nouvel état : Chargement. Celui-ci affichera un écran de démarrage et une barre de progression. C'est ici que l'ensemble des ressources du jeu seront chargés. Ce temps d'attente sera donc le seul de l'ensemble du jeu.
```js
var Chargement = (function(){
    var _jeu;
    var etat = function(jeu){
        _jeu = jeu
    }
    etat.prototype = {
        preload: function(){
            // Chargement des ressources du jeu
            _jeu.load.image("hero", "assets/mouton_chevre.png");
            _jeu.load.image("ennemi", "assets/loup.png");
            _jeu.load.image("bouton", "assets/bouton.png");
            
            // Création des écrans de démarrage et de la barre de progression. 
            // Nous pouvons ajouter dans le preload parce que les deux ressources impliquées ont été préalablement chargé dans l'état "Demarrage".
            _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "ecran_demarrage");
            _jeu.barreChargement = _jeu.add.sprite (_jeu.width/2, _jeu.hei, "barre_chargement");
            
            // La méthode setPreloadSprite permet de définir un sprite qui deviendra une barre de progression. 
            // Tant que les ressources demandées dans le preload ne seront pas chargés entièrement, la barre n'aura pas 100 % de son échelle en x (sa largeur)
            this.load.setPreloadSprite(_jeu.barreChargement);
            
        },
        create:function(){
           _jeu.barreChargement.destroy();  // Détruire la barre de progression
            _jeu.state.start("Menu", false);    // Démarrage du menu, sans effacer la scène.
        }
    }
    return etat;
})()
```

Une fois les ressources chargées, le menu doit donc être déclaré. Dans le fichier menu.js, le nouveau module est déclaré. Celui-ci se charge de créer le bouton de démarrage du jeu et d'attacher la fonction de rappel (callback) sur le clique.
```js
var Menu = (function(){
    var _jeu;
    var etat = function(jeu){
        _jeu = jeu
    }
    etat.prototype = {
        create:function(){
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.5,.5); // Changement de l'ancrage pour afficher le bouton au centre du jeu.
        },
        //Fonction qui sert de callback sur le clique du bouton
        demarrerJeu : function(){
            _jeu.state.start("Jouer", true);  // Démarrage du jeu. La scène est nettoyée de l'image de fond et du bouton.
        }
    }
    return etat;
})()
```

Maintenant, la logique du jeu. Pour cet démo, nous aurons simplement un personnage qui doit toucher à l'ennemi pour gagner.
```js
var Jouer = (function(){
    var _jeu;
    var etat = function(jeu){
        _jeu = jeu;
    }
    
    etat.prototype = {
        create : function(){
            // Création du hero et de l'ennemi
            this.hero = _jeu.add.sprite(0,0,"hero");
            this.hero.scale = new Phaser.Point(0.25,0.25);
            
            this.ennemi = _jeu.add.sprite(400, 400, "ennemi");
            this.ennemi.scale = new Phaser.Point(0.25,0.25);
            
            // Récupération des clés du clavier (flèches)
            this.curseur = _jeu.input.keyboard.createCursorKeys();
            
        },
        update : function(){
            // Gestion simple du déplacement. 
            if(this.curseur.up.isDown){
                this.hero.y -= 5;
            }else if(this.curseur.down.isDown){
                this.hero.y += 5;
            }
            
            if(this.curseur.left.isDown){
                this.hero.x -= 5;
            }else if(this.curseur.right.isDown){
                this.hero.x += 5;
            }
            
            // Vérification de la collision
            if(this.verifCollision(this.hero, this.ennemi)){
                _jeu.state.start("Menu");   // Retour au menu en cas de collision.
            }    
        },
        verifCollision : function(a,b){
            return Phaser.Rectangle.intersects(a.getBounds(), b.getBounds());   // Simple vérification de l'intersection géométrique des rectangles des sprites.
        }
    }
    return etat;
})();

```

Maintenant, le jeu est complet. Lorsque le héro touche l'ennemi (immobile, c'est assez facile), le menu est réaffiché. Oups, celui-ci ne s'affiche pas correctement puisque nous avons effacé le monde. Seul le bouton, créé dans l'état `Menu` s'affiche. Le fond, créé dans l'état `Chargement` n'est plus là. La solution consiste à redéfinir le sprite dans l'état Menu. Le code de l'état Menu deviendra donc : 

```js
var Menu = (function(){
    var _jeu;
    var etat = function(jeu){
        _jeu = jeu
    }
    etat.prototype = {
        create:function(){
            if(!_jeu.ecranDemarrage.parent){    // Détecter si l'écran est déjà dans le monde ou pas (après le clearWorld)
                _jeu.ecranDemarrage = _jeu.add.sprite(0,0, "ecran_demarrage");
            }
            
            this.btnDemarrage = _jeu.add.button(_jeu.width/2,_jeu.height/2, "bouton", this.demarrerJeu, this);
            this.btnDemarrage.anchor = new Phaser.Point(.5,.5); // Changement de l'ancrage pour afficher le bouton au centre du jeu.
        },
        //Fonction qui sert de callback sur le clique du bouton
        demarrerJeu : function(){
            _jeu.state.start("Jouer", true);  // Démarrage du jeu. La scène est nettoyée de l'image de fond et du bouton.
        }
    }
    return etat;
})()
```


### Sources : 
http://www.html5gamedevs.com/topic/1372-phaser-function-order-reserved-names-and-special-uses/
