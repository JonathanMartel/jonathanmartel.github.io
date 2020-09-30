---
layout: note_cours
permalink: /note-de-cours/js-note-de-cours-2
title: "Note de cours - section 2"
path: 2020-09-29-javascript-section2.md
tag: js
status: publish
has_children: false
parent: 2020-09-29-javascript.md
order: 2
toc: javascript-note
---

Source : 
https://gist.github.com/Ikalou/197c414d62f45a1193fd

Commande : git mergetool

https://docs.unity3d.com/Manual/SmartMerge.html

Ce court article montre comment créer la configuration nécessaire pour utiliser Git avec Unity. Il sera utile pour les petites équipes qui veulent collaborer simplement et partager les assets (scene, prefab, script). 

> Notez que cet article ne porte pas sur les commandes de git et nécessite une connaissance préalable de celles-ci.

<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

### Configuration de votre projet dans Unity
D'abord, il faut configurer le projet dans Unity afin de pouvoir utiliser efficacement Unity. La première étape consiste à changer le mode de gestion des fichiers de Unity. Dans votre projet, vous devez aller dans `Edit > Project Settings > Editor` et mettre l'option `Version Control Mode` à `Visible Meta Files` et l'option `Asset Serialization Mode` à `Force Text`. C'est deux options permettront à Git et à l'outil de fusion des fichiers fourni par Unity (`UnityYAMLMerge`) de réaliser correctement les fusions.

### Configuration du dépôt Git
Ensuite, il faut correctement configurer le dépôt Git pour qu'il utilise l'outil de fusion fourni par Unity. Dans le fichier `.gitconfig` à la racine de votre projet, vous devez ajouter les éléments suivants :
```
[merge]
    tool = unityyamlmerge

    [mergetool "unityyamlmerge"]
    trustExitCode = false
    cmd = "CHEMIN VERS UnityYAMLMerge" merge -p "$BASE" "$REMOTE" "$LOCAL" "$MERGED"
```
Où CHEMIN VERS UNITYYAMLMERGE doit être remplacer par le chemin d'accès vers l'outil :
- OSX : /Applications/Unity/Unity.app/Contents/Tools/UnityYAMLMerge
- Windows : C:\Program Files\Unity\Editor\Data\Tools\UnityYAMLMerge.exe

Maintenant, tous est fin prêt à être utilisé pour fusionner les assets de Unity.

### Travailler avec l'outil de fusion UnityYAMLMerge
L'outil de fusion permet de résoudre les conflits de fusion entre deux assets non textuels dans Unity. Prenons le cas d'une scène dont un élément aurait été modifié par deux personnes (A et B). La personne A a envoyé son commit sur le projet (ici upstream) avant la personne B. Maintenant que B est prêt, elle voudra s'assurer que sa branche est à jour avec upstream et exécutera un `git pull` avant de soumettre ses changements sur le projet. Puisque A et B ont modifié le même asset, il y aura un conflit. C'est ici que l'outil de fusion nous aidera. 

À la suite du pull (fetch + merge), git indiquera qu'il existe des conflits sur l'item. 
```
CONFLICT (content): Merge conflict in Assets/scene1.unity
Automatic merge failed; fix conflicts and then commit the result.
```

Afin de régler le conflit, nous utiliserons UnityYAMLMerge : 
```
$ git mergetool
```
L'outil produira alors 4 copies différentes du fichier en conflit. Une copie de sauvegarde (_BACKUP), une copie de la version précédente (_BASE), une copie des modifications locales (_LOCAL) et une copie de la version distance (_REMOTE). On se servira donc de BASE, LOCAL et REMOTE pour établir ce que devrait être l'élément. Une fois le conflit réglé, il faut sauvegarder la version devant être utiliser en remplaçant l'original. Finalement, il faut finaliser la fusion avec Git.

```
Was the merge successful [y/n]? y
```
Le mergetool effacera ensuite l'ensemble des copies utilisées pour la résolution du conflit. Ne restera qu'à finaliser le merge en exécutant le commit.



### Sources : 

