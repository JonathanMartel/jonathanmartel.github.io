---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-async
title: "Requête et traitement de donnéees asynchrone"
path: javascript-async-base.md
date: "2022-08-23"
tag: js
status: publish
has_children: true
toc: javascript-note
order: 40
collection: note_javascript
   
---
Le JavaScript, comme bien d'autres langages, possèdent des instructions de traitement asynchrone permettant d'éviter de bloquer l'interface graphique ou bien les autres processus pendant des phases de traitement qui pourraient être très longue. Par exemple, une requête vers un serveur Web ou bien le décodage d'un fichier de données JSON pourrait occasionner des problèmes de performance si ces opérations devaient être fait dans le processus principal. Cette section présente les bases de la programmation asynchrone en JavaScript, notamment les requêtes asynchrones (Ajax ou fetch) et l'introduction aux promesses ainsi qu'aux intructions await/async

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

# Requêtes asynchrones, dites Ajax (*Asynchronous Javascript and XML*) ou *fetch*

Ajax est une méthode de programmation qui permet de faire des requêtes asynchrones à un serveur Web. Dans le navigateur, une requête HTML se produit toujours de la même manière :
1.  le navigateur envoie une requête au serveur et attend la réponse
2.  le serveur reçoit la requête
3.  le serveur envoie une réponse au navigateur
4.  le navigateur affiche ou traite la réponse

Lorsque la requête est faite en cliquant sur un lien (`<a>`) ou en changeant l'URL dans la barre d'adresse, le navigateur redessine la page qui est affichée. Se faisant, l'ensemble des scripts et des feuilles de style doivent être réinterprétés. En utilisant les requêtes asynchrones, il est possible de mettre à jour des parties (ou l'ensemble de l'interface graphique) sans devoir relancer le chargemenent de l'ensemble des scripts (ou des fichiers CSS).

Avec les requêtes asynchrones, le navigateur n'attend pas la réponse en bloquant ses processus et son déroulement. Il utilise plutôt l'API des événements ou des promesses qui utilise une fonction de rappel (`callback`) qui sera appelée quand la réponse sera reçue. La réception de la requête devient comme un événement qui est capturé par le gestionnaire de requête asynchrone. La réponse d'une requête asynchrone n'est pas traitée automatiquement par le navigateur. Même dans le cas où le serveur retourne une chaine qui peut être interprété comme du HTML, le script doit la traiter et insérer les éléments dans le DOM (`innerHTML`, `insertAdjacentHTML`, etc). La réponse peut être une chaine HTML qui représente une page complète, seulement une partie d'une page ou bien des données (XML, JSON, autres) spécifiques qui doivent être traitées avant d'être affichées.

Ainsi, les requêtes asynchrone ne remplacent pas les requêtes HTTP classiques dans tous les cas. Elles doivent être utilisées lorsqu'une partie de la page Web doit être mise à jour et non pas l'entièreté de la page. Elles peuvent servir à interroger des services externes, soumettre les données d'un formulaire ou bien mettre à jour des éléments de l'interface en fonction des données entrées par un utilisateur.

## Exécuter une requête asynchrone
Il y a deux manières d'effectuer une requête asynchrone : `XMLHttpRequest` et `fetch`. Si la seconde est plus moderne et gagne en popularité, la première est reste toujours pertinente à ce jour.

### XHR (devient *legacy*, mais toujours utilisé)

La requête se fait à l'aide de l'objet `XMLHttpRequest` que l'on devra instancier. Chaque instance peut effectuer une requête asynchrone, il est donc possible d'effectuer des requêtes asynchrones concurrentes ou bien en cascaces, selon les besoins. 

#### Exécuter une requête
Voici trois exemples de requêtes simples. Dans ces trois cas, et pour simplifier les exemples, elles n'attendent pas de réponse du serveur et sont exécutées sur des url fictifs. Des exemples plus complexes, avec des urls réels seront présentés plus loin.

Exemple de requête simple Ajax (Méthode GET sans données) :
```js
let requete = new XMLHttpRequest(); // Création de l'objet
requete.open("GET", "https://monURL.com/", true); // Création de la requête
requete.send(); // Envoie de la requête
// Aucune attente de réponse
```

Exemple de requête simple Ajax (Méthode GET avec des données) :
```js
let requete = new XMLHttpRequest(); // Création de l'objet
requete.open("GET", "https://monURL.com/?requete=maRequete&duree=10&pays=Canada&fichier=true", true); // Création de la requête avec les données en querystring. 
requete.send(); // Envoie de la requête
// Aucune attente de réponse
```

Exemple de requête simple Ajax (Méthode POST avec des données en format queryString) :
```js
let requete = new XMLHttpRequest(); // Création de l'objet

requete.open("POST", "https://monURL.com/", true); // Création de la requête
requete.setRequestHeader("Content-type","application/x-www-form-urlencoded"); // Entête qui précise le type de contenu envoyé
requete.send("requete=maRequete&duree=10&pays=Canada&fichier=true");    // Envoie de la requête
// Aucune attente de réponse
```

#### Recevoir une réponse et la traiter
Dans la majorité des cas, la requête Ajax recevra une réponse qui devra être traitée par le script d'appel. Dans ces cas, il faut configurer un gestionnaire de réponse à l'aide de l'événement `readystatechange`. Cet événement est appelé à chaque changement de la propriété `readyState`. Celle-ci défini l'état du client XHR. Elle possède l'une des valeurs suivantes :

|  **Constante**  |    **Valeur** | **Signification** |
|------------------ |------------ |---------------------------------------------------|
|  UNSENT           |  0          |  La méthode open() n'a pas été appelée.|
|  OPENED           |  1          |  La méthode open() a été appelée.|
|  HEADERS_RECEIVED |  2          |  Les entêtes ont été reçus par le serveur.|
|  LOADING          |  3          |  Le corps de la réponse est en train d'être reçu.|
|  DONE             |  4          |  La réponse a été reçue complètement.|

Avant de traiter la réponse du serveur, il faut attendre que la valeur `4` (ou la constante `XMLHttpRequest.DONE`) soit atteinte. Il est souvent nécessaire de valider que le statut de la requête (le code de réponse de la requête HTTP) soit bien 200. Un code 401 (non authorisé), 404 (non trouvé) ou 500 (Erreur interne) indique un problème dans la requête. 

Exemple :
```js
requete.addEventListener("readystatechange", function () {

    console.log ("readyState : " + requete.readyState);
    console.log ("status : " + requete.status);

    if(requete.readyState == 4 && requete.status == 200) {  // Requête terminée et réussie
        console.log("Reponse : " + requete.responseText);   
    }
}
```
D'autres événements sur l'objet XHR ont été implanté dans certains navigateurs et peuvent remplacer l'utilisation de `readyStateChange`. Le tableau suivant résume ces événements : 

|   **Constante**      |   **Description**   |
|------------------ |--------------------------------------|
|  progress         |   Événement de progression            |
|  load             |   Transfert complété et réussi        |
|  error            |   Erreur dans la requête              |
|  abort            |   Requête annulée                     |


Exemple :
```js
requete.addEventListener("progress", function (evt) {   // Peut être appelé plusieurs fois sur une seule requête
    if(evt.lengthComputable){                   // Si la taille est calculable, parfois la taille est inconnue
        console.log(evt.loaded, evt.total);     // affiche la progression et le total
    }
    console.log("progression...");
}

requete.addEventListener("load", function (evt) {   // Fin de la requête et succès
    console.log("complété", evt.responseText)   // Affiche la réponse en texte
}

requete.addEventListener("error", function (evt) {  // Erreur de la requête (code non 200)
    console.log("Erreur : ", evt.status);       
}

requete.addEventListener("abort", function (evt) {  // Quand la requête est annulée par le client (XMLHttpRequest.abort())
    console.log("requête annulée par le client");
}

```

#### Envoyer des données de formulaire ou en format JSON
S'il est assez simple d'envoyer des données en format queryString (clé=valeur&clé=valeur), il est habituellement assez rare que les données à envoyer soient direcement disponible sous cette forme ou bien que le serveur accepte ce format (GET ou POST). Voyons deux cas de figure différent. Le premier, avec des données provenant d'un formulaire HTML et le second en format JSON.

Dans le premier cas, bien que l'on puisse construire manuellement la chaine de requête (queryString), il est plus aisé d'utiliser l'objet FormData. Celui-ci permet de créer notre chaine de requête à partir d'un formulaire HTML ou bien à partir d'autres données. 

Exemple d'envoie en POST de données de formulaire avec l'objet FormData : 
```js
let formUtilisateur = document.querySelector("form[name='utilisateur']");   // Récupération du form
let donneesFormulaire = new FormData(formUtilisateur);          // Création de l'instance de FormData avec les données du formulaire
donneesFormulaire.append("cleSecrete", "Insérer la clé secrète");   // Ajout d'un élément dans le FormData

let requete = new XMLHttpRequest();     // Création de l'objet de requête
requete.addEventListenir("load", function(evt){
    if(evt.responseText == "ok"){       // Ici le serveur envoie une simple chaine pour dire "ok"
        console.log("usager créé avec succès");
    }
});
requete.open("POST", "https://monURL.com/", true); // Création de la requête
requete.send(donneesFormulaire);    // Envoie de la requête avec les données
```
Comme on le voit, le données du formulaire sont intégrés automatiquement dans l'objet formdata et on peut aussi y ajouter des clés. Par ailleurs, il est aussi possible d'en retirer avec la méthode `FormData.delete()`.

> Notez qu'il est aussi possible de construire un objet de type FormData sans utiliser les formulaires HTML. On y ajoutera les combinaisons clé=valeur en utilisant la méthode `FormData.append()`, dans une boucle, par exemple.

Il est aussi possible d'envoyer des données en format JSON avec XHR.

Exemple d'envoie en POST de données en format JSON : 
```js
let data = {    nom : "Martel", 
                prenom : "Jonathan", 
                profession : "Enseignant"
                enfant : ["Léo", "Émile"]
            };

let requete = new XMLHttpRequest();     // Création de l'objet de requête
requete.setRequestHeader("Content-Type", "application/json;charset=UTF-8"); // Assigne le bon type de contenu et l'encodage
requete.addEventListenir("load", function(evt){
    if(evt.responseText == "ok"){       // Ici le serveur envoie une simple chaine pour dire "ok"
        console.log("Données reçues avec succès");
    }
});
requete.open("POST", "https://monURL.com/", true); // Création de la requête
requete.send(JSON.stringify(data));    // Envoie de la requête avec les données en format JSON
```

> Notez que les exemples et les cas présentés ne constituent pas l'ensemble des possibilités de ce qu'il est possible de faire avec les requêtes asynchrones, mais présente les principes de base. 


### Utilisation de *fetch* 
L'utilisation de l'API `fetch` est désormais ce que l'on retrouve le plus dans le développement Web. Certains cas de rétrocompatibilité nécessite l'usage de `xhr`, mais il est recommandé d'utiliser `fetch` pour les projets qui ne demandent pas le maintien de la compatibilité des anciens navigateurs. Au lieu d'utiliser le système d'événement de Javascript, `fetch` utilise les promesses (`Promise`) afin d'effectuer le traitement de la réponse d'une requête asynchrone. 

#### Requête fetch
Reprenons les trois exemples précédents de requêtes simples. Ces trois requêtes n'attendent pas de réponse du serveur. Elles sont exécutées sur des url fictifs. Par défaut, fetch réalise des requêtes en GET.

Exemple de requête simple Ajax (Méthode GET sans données) :
```js
fetch("https://monURL.com/"); // Création et exécution de la requête
// Aucune attente de réponse
```

Exemple de requête simple Ajax (Méthode GET avec des données) :
```js
fetch("https://monURL.com/?requete=maRequete&duree=10&pays=Canada&fichier=true");  // Création et exécution de la requête
// Aucune attente de réponse
```

Exemple de requête simple Ajax (Méthode POST avec des données) :
```js
// Configuration des paramètres de la requête
let options =   { 
                    method: 'POST', // La méthode
                    headers:{       // Les informations de l'entête
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },    
                    // Le corps de la requête
                    body: new URLSearchParams({ 
                        'requete': 'maRequete',
                        'duree': 10,
                        'pays': 'Canada',
                        'fichier' : true
                    }

fetch("https://monURL.com/", options); // Création et envoie de la requête
// Aucune attente de réponse
```
Comme nous le voyons, l'envoie de données en POST par `fetch` implique de bien comprendre le protocole HTTP et de savoir traiter adéquatement les données avant leur envoie. L'exemple précédent reproduit l'envoie de données sous la forme d'un formulaire HTML en POST. Le corps de la requête pourrait aussi être assigné en utilisant un objet de type `FormData` ou bien en utilisant le format JSON. Tous dépend de la structure de nos données ou bien de ce que le serveur attend comme format. 

#### Traiter la réponse 
Si dans les exemples précédents nous n'attendions pas de réponse, ce n'est pas toujours le cas, bien au contraire. Dans la majorité des cas, l'utilisation de requête asynchrone vise à récupérer des informations sur un serveur afin de mettre à jour la page ou l'interface Web sans effectuer de rafraichissement complet. La méthode `fetch` retourne un objet de type `Promise` à laquelle nous devrons passer une fonction de rappel (`callback`). Celle-ci sera automatiquement appelée lorsque la promesse sera résolue. Cette fonction de rappel recevras un objet de type `Response` représentant la réponse à la requête et contenant un `stream` d'accès aux données nécessitant une autre opération asynchrone.

Dans l'exemple suivant, deux promesses sont retournées, une première promesse est retournée par `fetch` et la seconde est retournée par `Response.json()`. 

Exemple de GET avec le traitement de l'information retourné en format JSON.
```js
fetch("https://ghibliapi.herokuapp.com/films")      // Exécute la requête
    .then((reponse)=>reponse.json())                // quand la promesse est résolue, décode le JSON reçu, cela retourne une promesse
    .then((filmGhibli)=> console.log(filmGhibli));  // quand la 2e promesse est résolue (JSON décodé), affiche les données reçues    
```
L'utilisation des fonctions fléchées permet de créer une structure de code simple (ou pas) à lire, mais le même exemple pourrait s'écrire en utilisant des fonctions anonymes ou bien des fonctions nommées/déclarées. L'exemple suivant montre comment cela se fait.

```js
function AfficherFilm(films)){
    console.log(filmGhibli);
}

fetch("https://ghibliapi.herokuapp.com/films")      // Exécute la requête
    .then(function(reponse) {
        return reponse.json();                      // quand la promesse est résolue, décode le JSON reçu, cela retourne une promesse
    })                  
    .then(AfficherFilm);                            // quand la 2e promesse est résolue (JSON décodé), Appel de la fonction AfficherFilm
```

## Se passer des fonctions de rappel et du *then* ?
Il est possible de ne pas utiliser les fonctions de rappel ou bien la méthode `then` lorsque nous travaillons avec `fetch` (ou tout type d'instructions qui retourne une promesse). Il faut alors travailler avec la structure `async/await`. Dans ce cas, il est nécessaire de définir une fonction qui deviendra asynchrone, c'est-à-dire qui pourra être interrompue durant son déroulement. C'est dans cette fonction que nous pourrons utiliser `fetch` sans définir de fonction de rappel. Si nous reprenons l'exemple précédent en utilisant la fonction asynchrone (`async`) et en définissnt l'instruction qui sera mise en attente.

Exemple : 
```js
async function faireRequete() {
    const reponse  = await fetch("https://ghibliapi.herokuapp.com/films");  // Exécute la requête
    const filmGhibli = await reponse.json();
    console.log(filmGhibli);
}
```
La fonction `faireRequete` pourra être interrompu par un appel de fonction (via un événement ou une requête asynchrone) sans bloquer le déroulement du script. Pour rappel, les fonctions en javascript sont bloquantes, c'est-à-dire qu'elle doit être exécuté au complet avant qu'une autre fonction puisse être exécuté, et ce, même dans le cas d'un événement. Les événements qui se produisent pendant le déroulement d'une fonction sont placés sur une pile d'appelles et sont exécutées dans l'ordre quand les autres se termine. Dans le cas d'une fonction async, celle-ci pourra être interrompue et n'attendra pas la fin de la résolution complète des deux promesses avant de "passer la main" à une autre fonction. 

Pour certains, l'utilisation de `async/await` permet de simplifier l'écriture. Par contre, elle n'est pas toujours appropriée et ne devrait pas constituer une réponse dans tous les cas.

## Les *Promise*
Il est aussi possible d'utiliser des instructions asynchrones dans d'autres cas que celui des requêtes `fetch`. Les promesses pourront être utiles dans un cas où un processus long et bloquant est requis (traitement avancé d'un gros jeu de données). Une `Promise` représente un élément qui est disponible maintenant, dans le futur ou bien jamais. Elle peut avoir trois états : *pending*, *fulfilled* et *rejected*. 

### Créer une *Promise*
Une promesse est créée en instanciant un objet de type Promise et en lui passant une fonction enveloppante. C'est celle-ci qui prendre en charge l'appel des fonctions de rappel (succès ou échec) assigné à l'aide de la méthode `then` ou `catch`. 

Syntaxe d'une promesse avec la logique du .then, .catch, .finally: 
```js
const promesse = new Promise( (resolveFct,rejectFct) => {
    // code de la promesse qui peut prendre du temps
    if(succes) {
        resolveFct(valeur); // Appel de la fonction reçu en paramètre (correspond au then)
    }
    else {
        rejectFct("code, objet ou message d'erreur");  // Appel de la fonction reçu en paramètre (correspond au catch)
    }
});

promesse.then(function(valeur){         // Promesse résolue (succès)
    //instructions
}).catch(function(erreur){              // Promesse rejetée (échec)
    //instructions
}).finally(function(){                  // Après tout (après le then ou le catch)
    //instructions
})

```

### Promesses concurrentes et synchronisation des résultats
Dans certains cas, il est souhaitable de lancer plusieurs processus asynchrone comme plusieurs requêtes en même temps, par exemple. S'il y a des situations où les promesses peuvent être traité séparément, parfois, on veut attendre qu'elle soit tous terminés avant de faire le traitement. On pourrait vouloir charger un catalogue de produit ainsi qu'une liste de catégorie (format JSON) avant de créer une barre de filtre ou de navigation sur mesure. Les deux promesses devant être résolues avant de créer les outils de filtre. On pourra alors utiliser la méthode `Promise.all` ou `Promise.allSettled` qui retourne une promesse. Les deux promesses retournées ont des fonctionnements similaires. La promesse retournée par `Promise.all` sera résolue si toutes les promesses passées en paramètres sont résolues, et échouera dès qu'une des promesses observées échoues. La promesse retournée par `Promise.allSettled` sera résolue quand l'ensemble des promesses passées en paramètre sont résolues ou écouées. Dans les deux cas, la fonction de rappel reçoit un tableau des résultats de chaque promesses passées en paramètres aux méthodes `all` ou `allSettled`.

L'exemple suivant montre un exemple de l'utilisation de `Promise.all`. Deux requêtes sont exécutées en parallèle et le résultats est ensuite affiché quand les deux requêtes sont complétées.

Exemple : 
```js
const pFilms = fetch("https://ghibliapi.herokuapp.com/films")      // Exécute la requête
                .then((reponse)=>reponse.json())                // quand la promesse est résolue, décode le JSON reçu, cela retourne une promesse

const pPerso = fetch("https://ghibliapi.herokuapp.com/people")      // Exécute la requête
                .then((reponse)=>reponse.json())                // quand la promesse est résolue, décode le JSON reçu, cela retourne une promesse

const aPromesse = [pFilms, pPerso];     // itérable de promesse

Promise.all(aPromesse)
    .then((data)=>{
        let [p1, p2] = data;                    // Affectation par déstructuration
        console.log(p1, p2)
    });
```
Les données seront affichées uniquement lorsque les deux promesses auront été résolues.

# Sources additionnelles
* [XMLHttpRequest \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest)
* [Utiliser XMLHttpRequest \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
* [FormData \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/FormData)
* [Fetch \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API)
* [Utiliser Fetch \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch)
* [Response \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/Response)
* [Request \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/Request)
* [Headers \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/API/Headers)
* [Promise \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [await \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/await)
* [async function \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function)
* [Affecter par décomposition \- JavaScript \| MDN](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)



