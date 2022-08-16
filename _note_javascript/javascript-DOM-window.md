---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-dom-window
title: "Le DOM : Objet window et ses propriétés"
path: javascript-DOM-window.md
date: "2022-08-16"
tag: js
status: draft
has_children: true
toc: javascript-note
order: 25
collection: note_javascript
   
---





<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Objet window
Comme nous l'avons vue précédemment, l'objet `window` possède des propriétés spécifiques du navigateur telles que la taille de la fenêtre et l'url du document, mais aussi des méthodes et des propriétés plus générales telles que ceux définissant des chronomètres et des intervalles.

## Chronométrage et intervalles
L'API du navigateur permet de créer des comptes à rebours.

**Méthodes**
>`window.setTimeout(fonctionRappel, compte)`
> 
>La méthode crée un compte à rebours selon le paramètre compte (en ms). Lors de la fin du compte, la fonction est appelée. Le compte à rebours est fait en parallèle et ne bloque pas les autres processus. Ne s'exécute qu'une seule fois.
>La méthode retourne un identifiant (nombre) qui peut être passé à la méthode `clearTimeout()` afin d'annuler le compte à rebours. Chaque compte à rebours retourne un identifiant unique.

>`window.clearTimeout(identifiant)` 
>
>Méthode qui permet d'annuler un compte à rebours. La méthode attend un nombre qui est retourné par la méthode setTimeout(). Chaque compte à rebours possède un identifiant unique.

>`window.setInterval(fonction, intervalle)`
>
>La méthode crée un compte à rebours selon le paramètre intervalle (en ms) qui se répète à tous les intervalles. Après chaque intervalle, la fonction est appelée. Le compte à rebours est fait en parallèle et ne bloque pas les autres processus. L'intervalle s'exécute en boucle tant qu'il n'est pas arrêté avec la méthode clearInterval().
>La méthode retourne un identifiant (nombre) qui peut être passé à la méthode `clearInterval()` afin d'arrêter le compte à rebours. Chaque compte à rebours retourne un identifiant unique.

>`window.clearInterval(identifiant)`
>
>Méthode qui permet d'annuler un compte à rebours d'intervalle. La méthode attend un nombre qui est retourné par la méthode `setInterval()`. Chaque compte à rebours d'intervalle possède un identifiant unique.

# Navigation et url
L'objet window contient aussi des propriétés et des méthodes qui permettent de contrôler la navigation et de connaître l'URL de la page
chargée.

Le principal objet de navigation est la propriété `location`.

>`window.location`
>La propriété location contient un objet de type Location qui possède des propriétés et des méthodes spécifiques à l'URL de la fenêtre active. La lecture directe de la propriété renvoie toujours la valeur de la propriété href de l'objet Location en faisant un appel implicite à la méthodes `toString()`. La propriété est éditable. L'assignation d'une valeur force un changement d'URL dans le navigateur, de la même façon qu'un lien cliqué par l'usager. Les propriétés de l'objet Location sont éditables de la même manière et provoque un changement d'URL après l'assignation. La valeur assignée à la propriété location peut être relative.

**Propriétés de l'objet location :**
>`location.href`
>Contient l'URL complète.
>
>Exemple :
>"http://www.exemple.com:1234/page/index.html?q=exemple&a=1#resultat"

>`location.protocol`
>Contient la partie protocole de l'URL.
>
>Exemple : "http:"

>`location.host`
> 
>Contient la partie hôte et port de l'URL.
>
>Exemple : "www.exemple.com:1234"

>`location.hostname`
>
> Contient la partie hôte seulement de l'URL.
>
> Exemple : "www.exemple.com"

>`location.hash`
>
> Contient la partie de l'ancre de l'URL après le symbole # (*hash* en anglais)
>
> Exemple : "#resultat"

>`location.pathname`
>
>Contient le chemin d'accès de l'URL.
>
> Exemple : "/page/index.html"

>`location.port`
>
> Contient le numéro du port de l'URL.
>
> Exemple : "8080"

>`location.search`
>
> Contient la partie de requête de l'URL.
>
> Exemple : "?q=exemple&a=1"

**Méthodes de l'objet location :**

> `location.assign(url)`
>
> Charge un nouvel url, comme si la propriété location.href avait été modifiée.

>`location.replace(url)`
> Charge un nouvel url, en modifiant l'historique. La page précédemment chargée ne peut plus être atteint en reculant dans l'historique du navigateur.

> `location.reload()`
>
> Recharge la page en cours.

**Objet** history

Un second objet permet de contrôler la navigation. La propriété history
de l'objet window permet de charger une page qui est dans l'historique
du navigateur.

**Propriétés :**

history.length

> Retourne le nombre d'item de l'historique.

**Méthodes :**

history.back()

> Charge la page précédente dans l'historique

history.forward()

> Charge la page suivante dans l'historique

history.go(index)

> Se déplace selon la valeur du paramètre index dans l'historique.
>
> Exemple :
>
> history.go(-2); //recule de 2 pages

Il faut noter que pour des raisons de sécurité et de protection des
données confidentielles, les URLs de l'objet history ne peuvent être
lus directement.

L'environnement de l'usager

Afin de déterminer l'apparence des éléments Web affichés sur l'écran
de l'usager, il est parfois nécessaire de connaître la configuration de
son matériel. La taille de l'écran, le nombre de couleur affichable ou
le type de navigateur utilisé sont des informations qui peuvent
s'avérer utiles. L'objet window possède deux propriétés qui permettent
d'accéder à ces informations : navigator et screen.

L'objet de type Navigator qui possède des propriétés spécifiquement
relié au navigateur. Certaines de ses propriétés ne sont pas standard et
peuvent être défini différemment d'un navigateur Web à l'autre.

Propriétés :

navigator.appName

> Retourne une chaine spécifiant le nom du navigateur.

navigator.appVersion

> Retourne une chaine spécifiant la version du navigateur.

navigator.userAgent

> Retourne une chaine spécifiant le navigateur.

navigator.platform

> Retourne une chaine spécifiant le système d'exploitation.

navigator.online

> Retourne une valeur booléenne qui spécifie si la page est vu en-ligne
> ou hors-ligne.

navigator.geolocation (ES5)

> Objet de géolocalisation (voir section Géolocalisation).

**Méthodes :**

navigator.javaEnabled()

> Méthode qui retourne une valeur booléenne selon la disponibilité de
> l'interpréteur Java

navigator.cookiesEnabled()

> Méthode qui retourne une valeur booléenne selon l'état des témoins
> (cookies)

Objet Screen

La seconde propriété, l'objet screen, possède 5 propriétés qui
retournent des informations à propos de la fenêtre du navigateur.

**Propriétés :**

screen.width

> Retourne la largeur de l'écran de l'usager (en pixel)

screen.height

> Retourne la hauteur de l'écran de l'usager (en pixel)

screen.availWidth

> Retourne la largeur disponible pour l'affichage de la page dans
> l'écran de l'usager (en pixel). La taille des menus et des barres
> d'outils du navigateur est soustrait de la taille de l'écran.

screen.availHeight

> Retourne la hauteur disponible pour l'affichage de la page dans
> l'écran de l'usager (en pixel). La taille des menus et des barres
> d'outils du navigateur est soustrait de la taille de l'écran.

screen.colorDepth

> Retourne le nombre de couleurs disponibles selon la configuration de
> l'utilisateur (16, 24 ou 32 bits)




# Stratégies et astuces de travail avec les objets



# Exercices sur les objets



# Sources additionnelles
* [Classe - JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Classes)



