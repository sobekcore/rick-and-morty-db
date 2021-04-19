# Rick & Morty Database
The website is available under: [rick-and-morty-db.netlify.app](https://rick-and-morty-db.netlify.app/). Also please read README and code comments for my explanations of how and why i did some things in a certain way, the code is heavily commented because i've wanted to explain my thought process even more. Some of the keywords on readme are highlighted for your convenience. Enjoy reading!

## TL;DR
If you dont want to read everything, just read this:
* **`(1)`** - Paginated data is loaded in a **`async`** way and are **`lazy loaded`**, it boosts performance and speed a lot.
* **`(2)`** - Searching is done with **`url query`**, its more user friendly this way (explanation below).
* **`(3)`** - I've added simple text that show number of currently possible characters to choose from in a header.
* **`(4)`** - **`Vue 3`** was used in this task, as well as **`Composition API`** and **`Suspense`** tag.
* **`(5)`** - Favorite characters are stored in **`local storage`**, also added removing them from favorites as a bonus.
* **`(6)`** - Created simple unit tests with **`Jest`**, couldn't quite mount few components right, so they are not that advanced unfortunately.
* **`(7)`** - Current subpage that you are visiting is stored in **`cookies`**, user browser remembers last subpage visited.
* **`(8)`** - Removing characters from favorites has fancy animation, try it out.
* **`(9)`** - **`Pagination`** is slightly modified, i thought it will fit better this way (explanation below).
* **`(10)`** - Advanced **`responsiveness`** is implemented into the website, try it out. Its smooth to use on **`mobile`**.

However if you wanna know more in depth of my thinking process, please read sections below.

## Architectural Decisions
Here i will explain some of the design choices, it's kinda important so i would like you to read it. If something is shifted in a way you dont like, im sorry.

**`(1)`** - Firstly, as you can see character data is displayed in pages as showcased in a template, however my version is highly customizable, and it could be displayed all in a single page thru loop (my first version was like this but i've decied to stick to the project, if u want to see it look at some of the previous commits). All of this is possible thanks to lazy loading and **`asynchronous`** characters loading. It downloades all the data at the beginning, but in a non aggresive way. This way it doesnt throw that many requests at once and also elegantly loads in a waterfall kinda method (see "Network" tab in dev-tools if you want proof for that).

**`(2)`** - Secondly i made searching with the **`url query`** search, i think its way more usefull this way instead of some kind of live searching. Thanks to that users could maybe share link of their searched characters more easily, because search results save with that link, wheres with live searching, it would be really hard to so.

## Bonus Features
Besides the basic requirements that were needed i've added few things that i thought fit good in there.

**`(3)`** - First one is a simple text that show number of all the avaiable characters wihthin current search range in the header, that place felt very empty at fullHD+ resolutions so i thought i would place that there.

**`(4)`** - Second one is a usage of **`Vue 3`**. I've used some of the **`Composition API`** and its setup() with a great result, as well as async component and **`Suspense`** tag for asynchronous characters loading.

**`(5)`** - One of the features is a favorite characters list as wrote on the task requirements, but i've done it in elegant way of storing array of characters id's and making a GraphQL query for those ones whose id is saved. Everything is held in **`local storage`** so it is rememberred by users browser. Also i've added deleting characters from favorites by simply pressing star button when its blue in a favorite tab. Its done in a similar way to adding them to local storage array, but instead removing them from it.

**`(6)`** - Next one is a simple unit testing with **`Jest`**. I know Jest from using it often with React, so i used it here too, the tests are really simple but i couldnt quite get it right to mount components that had imports in it, not sure why tho.

**`(7)`** - I've also made that your current page is stored in **`cookies`**, which means if you for example left the website with favorites tab on, when you comeback, the same tab will be opened immediately, it improves **`user experience`** a lot.

**`(8)`** - Also i've made fancy animation on deletion from favorites, making calculations on which button to scale was tricky but managed to get it just right.

**`(9)`** - Pagination is slightly modified in my version, i thought 4 pages on each side is too much, and took it down to 2 per side, but instead of this i've added buttons that take you to the last and to the first page of all the currently searched characters in range.

**`(10)`** - Last feature is a a bit of advanced **`responsiveness`** with swapping **`grid`** rows with each other to result very eye pleasing usage of the application on mobile. Also the pagination is hidden by default on mobile, and you can show/hide it with a convenient fixed button at the bottom of the screen.
