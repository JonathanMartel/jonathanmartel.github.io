---
layout: post
permalink: /html5-semantique
title: "Les balises de séparation sémantique (sectionning)"
path: 2013-12-04-html5-balise-semantique.md
tag: html5
 
---

Le HTML5 apporte son lot de nouvelles balises et leur usage peut parfois prêter à confusion. Ce présent article vise à éclairer les développeurs et les intégrateurs débutant dans l’univers du HTML5. Nous y présenterons les nouvelles balises de division sémantique (ou sectionning) en référence aux usages prescrits par le [W3C](https://www.w3.org/TR/html5/sections.html)



<div class="toc" markdown="1">
<span class="gamma">Table des matières</span>
{:.no_toc}
* TOC
{:toc}
</div>

### De nouvelles balises pour préciser le contenu de vos pages
D’entrer de jeu, il faut bien distinguer le rôle des nouvelles balises. Ceux-ci ne sont pas simplement des éléments de mise en page et d’alignement, mais visent à définir la structure du document. Elles ne viennent pas remplacer entièrement la balise <div> qui reste très importante, mais bien préciser le type de contenu de vos pages. Les balises de sectionnement sont : article, section, aside, nav, header, footer et address.

#### Balise <article>
> The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.
> When article elements are nested, the inner article elements represent articles that are in principle related to the contents of the outer article. For instance, a blog entry on a site that accepts user-submitted comments could represent the comments as article elements nested within the article element for the blog entry.

Un <article> peut donc avoir un <article> comme parent ou enfant. Le contenu de l’enfant sera par principe lié à celui du parent. Un billet de blogue pourra contenir les commentaires qui seront eux-même des <article>.


```html
<article class="billet">
  <h1>Titre du billet</h1>
  Texte du billet
  <article class="commentaire">
    Commentaire 1 sur le billet
  </article>
  <article class="commentaire">
    Commentaire 2 sur le billet
  </article>
</article>
```

Il en serait de même avec une page qui présenterait un résumé des 5 derniers billets publiés sur un site. Dans ce cas, la liste serait elle-même un article et les 5 billets seraient aussi des articles :

```html
<article class="dernierBillets">
  <article class="billet">
    Résumé 1...
  </article>
  <article class="billet">
    Résumé 2...
  </article>
  <article class="billet">
    Résumé 3...</article>
  <article class="billet">
    Résumé 4...
  </article>
  <article class="billet">
    Résumé 5...
  </article>
</article>
```
En général, les balises de sectionnement peuvent contiennent un entête (header) et un pied de page (footer). Ainsi, un article possèdera possiblement un titre et des informations relatifs à sa date de publication ou à sa catégorie. La zone d’entête n’est pas toujours définie par la balise <header>. Par exemple, dans le cas de l’ajout d’un simple titre, une balise <h1> définira correctement la zone d’entête.  Les règles d’usage précises de la balise <header> et des balises <hX> sont décrites plus bas.

```html
<article>
  <header>
    <h1>Titre du billet</h1>
    <time datetime="2013-11-20">2013-11-20</time>
  </header>
  Texte du billet
  <footer>
    Jonathan Martel (<address>jmartel@cmaisonneuve.qc.ca</address>)
  </footer>
</article>
```

Dans le cas où le contenu d’un article> devrait être divisé, on peut utiliser la balise section>.

#### Balise <section>

La balise <section> sert à subdiviser les parties d’un <article>. Il faut prendre garde au sens litéral de la balise. Si ceului-ci nous insite à en faire un usage plus générale que la balise article, il doit être réservé à la division des sous-ensembles d’un article (chapitre, partie, section, etc).

> The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content, typically with a heading.
>
> Examples of sections would be chapters, the various tabbed pages in a tabbed dialog box, or the numbered sections of a thesis. A Web site’s home page could be split into sections for an introduction, news items, and contact information.
>
> […]
>
> The section element is not a generic container element. When an element is needed only for styling purposes or as a convenience for scripting, authors are encouraged to use the div element instead. A general rule is that the section element is appropriate only if the element’s contents would be listed explicitly in the document’s outline.

Il ne faut donc pas confondre la balise <section> avec une balise de mise en page tel que <div>. Pour effectuer des opérations de mise en page ou pour rendre possible le contrôle par programmation, mieux vaut utiliser une <div>. On ne peut donc pas directement remplacer toutes les balises <div> par <section> dans un document HTML5.

Dans un billet de blogue, la zone de commentaire pourrait être balisée avec une balise <section>

```html
<article class="billet">
  <h1>Titre du billet</h1>
  Texte du billet...
  <section class="commentaires">
    <h1>Commentaires des usagers</h1>
    <article class="commentaire">
      Commentaire 1 sur le billet
    </article>
    <article class="commentaire">
      Commentaire 2 sur le billet
    </article>
  </section>
</article>
```
Un élément <section> possède habituellement un entête.

#### Balise <header et <h1-h6>

La balise <header> est utilisée pour définir le contenu introductif de son parent. Celui-ci peut être un élément de sectionnement de contenu (<article>, <section>, etc) ou bien un élément de sectionnement racine tel que <body>. À l’intérieur du <header> on pourra trouver le titre de la section, un résumé, une phrase d’introduction, la date de publication ou d’autres informations relatives au contenu de l’élément parent.

> The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids.
>
> When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.
>
> A header element is intended to usually contain the section’s heading (an h1–h6 element), but this is not required. The header element can also be used to wrap a section’s table of contents, a search form, or any relevant logos.

On pourra y trouver une balise de titre <h1-h6>. Dans le cas où la balise <header> ne contiendrait qu’un seul titre, celle-ci deviendrait optionnelle et la balise titre (<h1-h6>) seule conviendrait.

À ce titre, les balises <h1-h6> se réfèrent de la même manière à la section parente qu’ils représentent. La documentation officielle suggère que l’on peut utiliser les niveaux de titre de 2 manières différentes. Déjà, il est fautif de faire des sauts dans la numérotation. Les balises de titre doivent être utilisé séquentiellement et dans l’ordre de l’imbrication ou du niveau des diverses sections qu’ils accompagnent. Les deux exemples suivants sont valides bien que la deuxième manière devraient être privilégié afin de faciliter le maintien à long terme des sections d’une page.

Exemple 1
```html
<article>
  <h1>Apples</h1>
  Apples are fruit.
  <section>
    <h2>Taste</h2>
    They taste lovely.
    <section>
      <h3>Sweet</h3>
      Red apples are sweeter than green ones.
    </section>
  </section>
  <section>
    <h2>Color</h2>
    Apples come in various colors.
  </section>
</article>
```

Exemple 2
```html
<article>
  <h1>Apples</h1>
  Apples are fruit.
  <section>
    <h1>Taste</h1>
    They taste lovely.
    <section>
      <h1>Sweet</h1>
      Red apples are sweeter than green ones.
    </section>
  </section>
  <section>
    <h1>Color</h1>
    Apples come in various colors.
  </section>
</article>
```

La lisibilité du deuxième exemple doit être explicité avec des règles CSS claires d’imbrication afin que les navigateurs affichent correctement la taille des titres en fonction de leur imbrication. Par défaut, les navigateurs modernes sont déjà aptes à produire une présentation conforme à la structure.

#### Balise <footer>

La balise <footer> contient habituellement des informations aux sujets de l’auteur, des droits d’auteurs, de la date de publication, etc de son parent.

> The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.
>
> When the footer element contains entire sections, they represent appendices, indexes, long colophons, verbose license agreements, and other such content.

Tout comme la balise <header>, celle-ci est toujours en rapport avec la section pour lequel il est un enfant. Il peut donc y avoir un <footer> dans un <article>, une <section>, un <aside> ou le <main>.

#### Balise <aside>

Le aside représente du contenu qui est en lien avec la page ou la section dans lequel il est placé.

> The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.
>
> The element can be used for typographical effects like pull quotes or sidebars, for advertising, for groups of nav elements, and for other content that is considered separate from the main content of the page.

C’est habituellement du contenu secondaire qui pourrait ne pas être présent sans affecter la compréhension de la page/section. Il est souvent utilisé pour y placer des citations, des liens externes, de la publicité, etc.

#### Balise <nav>

La balise <nav> sert à définir la navigation principale d’une page, c’est-à-dire une zone où l’on retrouve le bloc de navigation qui permet de passer d’une page à une autre, ou bien à une autre section de la page en cours. Cela s’applique donc exclusivement au menu de navigation principal et non à toutes les zones où l’on retrouve des liens, comme dans le pied de page.

> The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.
>
> In cases where the content of a nav element represents a list of items, use list markup to aid understanding and navigation.
>
> Not all groups of links on a page need to be in a nav element — the element is primarily intended for sections that consist of major navigation blocks. In particular, it is common for footers to have a short list of links to various pages of a site, such as the terms of service, the home page, and a copyright page. The footer element alone is sufficient for such cases; while a nav element can be used in such cases, it is usually unnecessary.

Son usage n’est pas strictement limité pour définir une liste de lien. Une navigation peur contenir plusieurs éléments qui ne sont pas des listes. Il peut s’agir d’un texte (avec des liens) qui permet de se diriger vers les sections principales (ou les contenus principaux) de votre site.


### Sources :
https://stackoverflow.com/questions/35237779/difference-between-an-iife-and-non-iife-in-javascript-modular-approach
https://toddmotto.com/mastering-the-module-pattern/
https://toddmotto.com/typescript-setters-getter
https://medium.com/javascript-scene/javascript-factory-functions-vs-constructor-functions-vs-classes-2f22ceddf33e
https://atendesigngroup.com/blog/factory-functions-javascript