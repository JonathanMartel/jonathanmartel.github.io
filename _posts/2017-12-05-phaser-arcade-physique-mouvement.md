---
layout: post
permalink: /phaser-physics-arcade-mouvement
title: "Physique Arcade et mouvement"
path: 2017-12-05-phaser-arcade-physique-mouvement.md
tag: phaser
status: publish
---

Dans cet article, nous allons voir comment la physique Arcade permet de gérer les collisions et les déplacements de nos éléments de jeu. Nous verrons comment créer des personnages répondant à la gravité et comment détecter les collisions entre eux.

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

> L'ensemble des exemples montré sont partiels, c'est-à-dire que le code montré n'est pas complet. Les parties du code non montré ont déjà fait l'objet d'un article précédent. Le code complet est disponible sur Github : (Code complet)[github.com/]

### Le déplacement avec x et y
Tout d'abord, voyons comment un `sprite` peut être déplacé en utilisant directement sa position en x et en y. 
```js
var Jouer = (function(){
    var _jeu;
    var etat = function(jeu){
        _jeu = jeu;
    }
    
    etat.prototype = {
        create : function(){
            // Création du hero
            this.hero = _jeu.add.sprite(0,0,"hero");
            
            // Récupération des clés du clavier (flèches)
            this.curseur = _jeu.input.keyboard.createCursorKeys();
            
            // Défini les limites de la scène.
            this.limiteScene = new Phaser.Rectangle(0,0, jeu.width, jeu.height);
        },
        update : function(){
            // si le personnage est dans la scène, le déplacement est permis
            if(Phaser.Rectangle.containsPoint(this.limiteScene, this.hero.position)) {
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
            }
        },
    }
    return etat;
})();
```
Cette manière de faire à cependant un problème important. En déplaçant le sprite directement, la détection des collisions se fait après que la position fut changée, c'est-à-dire une fois que l'objet est déjà déplacé. Ce qui aura comme conséquence de créer plusieurs situations où le sprite entrera dans l'objet avec lequel la collision est détectée, causant un chevauchement des deux objets et empêchant un déplacement subséquent. Pour régler ce problème, il faut vérifier la collision avant d'effectuer le déplacement final et ajuster la position en conséquence de la collision.

Donc au lieu de déplacer le héro directement, nous calculerons sa prochaine position et vérifierons si elle est valide. Dans ce cas, nous effectuerons le déplacement, sinon aucun déplacement ne sera effectué.
```js
    update : function(){
        var vDeplacement = new Phaser.Point(0,0);
        if(this.curseur.up.isDown){
            vDeplacement.y -= 5;
        }else if(this.curseur.down.isDown){
            vDeplacement.y += 5;
        }

        if(this.curseur.left.isDown){
            vDeplacement.x -= 5;
        }else if(this.curseur.right.isDown){
            vDeplacement.x += 5;
        }
        //Calcul de la prochaine position
        var prochainePosition = Phaser.Point.add(this.hero.position, vDeplacement);
        // Si la position est valide, l'effectué
        if(Phaser.Rectangle.containsPoint(this.limiteScene, prochainePosition))
        {
            this.hero.position = prochainePosition;  
        }
    }
```
Bien entendu, ça ne règle pas l'ensemble des problèmes de gestion des collisions (dépasse de l'objet en raison de la vitesse, positionnement précis sur le bord de la limites, etc), mais nous nous approchons d'une solution généralement valide (avec quelques tests et conditions supplémentaires). Afin de compléter un peu l'exemple de base avant de passer à la gestion des collisions par l'engin physique Arcade, nous allons ajouter la gestion des collisions avec un ennemi.
```js    
etat.prototype = {
    create : function(){
        // Création du hero
        this.hero = _jeu.add.sprite(0,0,"hero");
        this.ennemi = _jeu.add.sprite(200,200,"loup");

        // Récupération des clés du clavier (flèches)
        this.curseur = _jeu.input.keyboard.createCursorKeys();

        // Défini les limites de la scène.
        this.limiteScene = new Phaser.Rectangle(0,0, jeu.width, jeu.height);
    },
    update : function(){
        var vDeplacement = new Phaser.Point(0,0);
        if(this.curseur.up.isDown){
            vDeplacement.y -= 5;
        }else if(this.curseur.down.isDown){
            vDeplacement.y += 5;
        }

        if(this.curseur.left.isDown){
            vDeplacement.x -= 5;
        }else if(this.curseur.right.isDown){
            vDeplacement.x += 5;
        }
        //Calcul de la prochaine position
        var prochainePosition = Phaser.Point.add(this.hero.position, vDeplacement);
        // Si la position est valide, l'effectué
        if(Phaser.Rectangle.containsPoint(this.limiteScene, prochainePosition))
        {
            this.hero.position = prochainePosition;  
        }
        // Après le déplacement, nous allons vérifier la collision avec l'ennemi
        if(this.verifCollision(this.hero, this.ennemi)){
            this.ennemi.kill(); // Tuer l'ennemi touché
        }
        
    }, 
    verifCollision : function(a, b){
        return Phaser.Rectangle.intersects(a.getBounds(), b.getBounds());
    }
}
```

### Et la physique elle ?
> Dans cet exemple, nous convrirons uniquement des éléments de base de la Physique Arcade de Phaser.

Maintenant, voyons comment la physique nous aide à gérer les collisions et les déplacements. D'abord, il faut démarrer le système physique que nous utiliserons. Ceci sera fait dans le `create` de l'état Jouer. Nous utilserons la méthode `startSystem()` de la classe (Phaser.Physics)[https://photonstorm.github.io/phaser-ce/Phaser.Physics.html] et nous lui donnerons en paramètre le système Arcade.
```js
    [...]
    // Démarrer le système physique.
    _jeu.physics.startSystem(Phaser.Physics.ARCADE);
    [...]
```

Ensuite, il faut configurer le système (gravité, matériaux des limites, etc) ainsi que déclarer et configurer les éléments qui seront intégrés au système de gestion de la physique. 
```js
create : function(){
    _jeu.physics.startSystem(Phaser.Physics.ARCADE);

    // Configuration du sens et de la force de la gravité, ici aucune gravité.
    _jeu.physics.arcade.gravity = new Phaser.Point(0,0);

    this.hero = _jeu.add.sprite(0,0,"hero");

    // Ajoute le héro aux objets physiques. 
    // Après l'ajout, le héro à maintenant une propriété "body" qui donne accès à ses paramètres physiques.
    _jeu.physics.enable(this.hero);


    this.ennemi = _jeu.add.sprite(400, 400, "ennemi");

    // Ajoute l'ennemi aux objets physiques. 
    _jeu.physics.enable(this.ennemi);


    this.curseur = _jeu.input.keyboard.createCursorKeys();

}
```
Nous avons maintenant un héro et un ennemi qui possèdent un "corps" physique (*body*). Ces derniers peuvent encore se déplacer avec les touches du clavier, mais la gestion de leur mouvement doit être faite différemment. En effet, les coordonnées x et y des sprites devra maintenant être vu comme le résultat des déplacements physiques de l'objet. C'est maintenant la physique qui contrôle les objets. La fonction `update` deviendra : 
```js
update : function(){
    // Déclaration de la vélocité initiale (0,0)
    this.hero.body.velocity = new Phaser.Point(0,0);
    
    // Les touches du clavier serviront à modifier la velocité du personnage et non plus à calculer la prochaine position du sprite.
    if(this.curseur.up.isDown){
        this.hero.body.velocity.y -= 200;
    }else if(this.curseur.down.isDown){
        this.hero.body.velocity.y += 200;
    }

    if(this.curseur.left.isDown){
        this.hero.body.velocity.x -= 200;
    }else if(this.curseur.right.isDown){
        this.hero.body.velocity.x += 200;
    }
}
```
Cependant, ce code ne permet pas de gérer les collisions, ni de déterminer les limites de la scène (ou du monde). Pour ce faire, nous devrons configurer nos objets afin qu'il limite leur déplacement à la dimension du monde. Le `create`, sera modifié ainsi : 
```js
create : function(){
    _jeu.physics.startSystem(Phaser.Physics.ARCADE);
    _jeu.physics.arcade.gravity = new Phaser.Point(0,0);

    this.hero = _jeu.add.sprite(0,0,"hero");
    _jeu.physics.enable(this.hero);

    // La propriété collideWorldBounds permet à l'engin physique de gérer la collision avec les limites du monde (scène)
    this.hero.body.collideWorldBounds = true;

    this.ennemi = _jeu.add.sprite(400, 400, "ennemi");
    _jeu.physics.enable(this.ennemi);

    // L'ennemi aussi détectera les collisions avec le monde.
    this.ennemi.body.collideWorldBounds = true;

    this.curseur = _jeu.input.keyboard.createCursorKeys();

}
```
Nous voyons maintenant que le héro bloque contre les limites du jeu sans utiliser de code supplémentaire . Il faut maintenant ajouter la gestion des collisions avec l'ennemi.
Dans la fonction `update`, nous utiliserons la méthode `collide` de la classe [Phaser.Physics.Arcade](https://photonstorm.github.io/phaser-ce/Phaser.Physics.Arcade.html) et ajouterons le code nécessaire à la gestion des collisions entre le héro et l'ennemi.
```js
update : function(){
    // L'appel de la fonction collide permet de demander à l'engin physique de calculer les collisions entre deux éléments.
    _jeu.physics.arcade.collide(this.hero, this.ennemi);
    
    this.hero.body.velocity = new Phaser.Point(0,0);
    
    if(this.curseur.up.isDown){
        this.hero.body.velocity.y -= 200;
    }else if(this.curseur.down.isDown){
        this.hero.body.velocity.y += 200;
    }

    if(this.curseur.left.isDown){
        this.hero.body.velocity.x -= 200;
    }else if(this.curseur.right.isDown){
        this.hero.body.velocity.x += 200;
    }
}
```
Maintenant, la collision est gérée. Si nous voulons ajouter une action sur cette collision, nous devrons utiliser une fonction de rappel (*callback*). 
```js    
etat.prototype = {
    create : function(){
       [...] // Non modifié
    },
    update : function(){
         // L'appel de la fonction collide permet de demander à l'engin physique de calculer les collisions entre deux éléments.
         // L'ajout d'un callback (ici this.surCollision) permet créer un comportement sur mesure sur la collision
        _jeu.physics.arcade.collide(this.hero, this.ennemi, this.surCollision, null, this);

        this.hero.body.velocity = new Phaser.Point(0,0);

        if(this.curseur.up.isDown){
            this.hero.body.velocity.y -= 200;
        }else if(this.curseur.down.isDown){
            this.hero.body.velocity.y += 200;
        }

        if(this.curseur.left.isDown){
            this.hero.body.velocity.x -= 200;
        }else if(this.curseur.right.isDown){
            this.hero.body.velocity.x += 200;
        }
        
    }, 
    surCollision : function(objetA, objetB){
        objetB.kill();  // Tue l'ennemi lors d'une collision
    }
}
```
### Finalement
Nous avons maintenant complété un exemple de base qui permet de gérer les collisions avec l'engin physique Arcade de Phaser. Dans un autre article, nous verrons comment gérer plusieurs ennemis en utilisant des groupes et de mettre en place la détection des conditions de fin de partie.




### Sources : 

