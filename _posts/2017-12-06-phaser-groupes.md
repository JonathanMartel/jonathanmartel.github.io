---
layout: post
permalink: /phaser-groupe
title: "Utilisation des groupes"
path: 2017-12-06-phaser-groupes.md
tag: phaserio
status: publish
---

Dans cet article, nous allons voir comment gérer facilement plusieurs objets à l'aide de la classe (Phaser.Group)[https://photonstorm.github.io/phaser-ce/Phaser.Group.html]. Cette classe permet de traiter plusieurs éléments de même nature (par exemple des ennemis ou des projectiles), sans utiliser de boucle `for()` et de tableaux dans notre code. Ainsi, nous pourrons modifier des propriétés et appeler des méthodes sur l'ensemble des éléments d'un groupe. Il sera aussi possible d'appliquer la physique et les collisions sur le groupe en entier (les éléments les uns avec les autres et chaque élément avec d'autres éléments).

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

> L'ensemble des exemples montré sont partiels, c'est-à-dire que le code montré n'est pas complet. Les parties du code non montré ont déjà fait l'objet d'un article précédent. Le code complet est disponible sur Github : (Code complet)[github.com/]

### Créer et configurer plusieurs ennemis
Dans cet exemple, nous allons créer plusieurs ennemis (5) avec la physique et gérer les collisions avec le personnage principal. Nous verrons ensuite comment, avec les groupes, nous pourrions simplifer le code en utilisant les méthodes et les propriétés des groupes, spécifiquement des groupes physiques.
```js
create : function(){
    _jeu.physics.startSystem(Phaser.Physics.ARCADE);
    _jeu.physics.arcade.gravity = new Phaser.Point(0,0);

    this.hero = _jeu.add.sprite(0,0,"hero");
    _jeu.physics.enable(this.hero);

    // Instanciation d'un tableau vide qui contiendra nos ennemis
    this.aEnnemis = [];
    for(var i=0; i< 5; i++){
        // Création d'un ennemi à une position aléatoire dans le monde.
        var ennemi = _jeu.add.sprite(_jeu.world.randomX, _jeu.world.randomY, "ennemi");    
        // Application de la physique sur cet ennemi
        _jeu.physics.enable(ennemi);
        // Assignation d'une velocité aléatoire initiale à l'ennemi
        ennemi.body.velocity.x = (Math.random()*200)-100;
        ennemi.body.velocity.y = (Math.random()*200)-100;
        // Configuration de la collision avec les limites du monde
        ennemi.body.collideWorldBounds = true;
        
        // Défini le facteur de restitution de la force des collisions, ici 100% en x et y.
        ennemi.body.bounce.set(1,1);
        
        //ajoute l'ennemi dans le tableau
        this.aEnnemis.push(ennemi)
    }
    this.curseur = _jeu.input.keyboard.createCursorKeys();
},
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

