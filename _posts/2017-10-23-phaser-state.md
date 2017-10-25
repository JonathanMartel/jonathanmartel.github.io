---
layout: post
permalink: /phaser-state
title: "Gestion des états"
path: 2017-10-23-phaser-state.md
tag: phaser
status: draft
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

Chaque état doit être défini comme un objet et surcharger les méthodes de la classe `Phaser.State` qu'il utilise. Aucunes méthodes ne sont explicitement nécessaires pour qu'un état soit fonctionnel, seules les méthodes nécessaire doivent être surchargée.

Voici l'état Chargement.
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



### Sources : 
http://www.html5gamedevs.com/topic/1372-phaser-function-order-reserved-names-and-special-uses/