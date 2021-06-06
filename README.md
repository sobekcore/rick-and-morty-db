# Rick & Morty Database
The website is available under: [rick-and-morty-db.netlify.app](https://rick-and-morty-db.netlify.app/). Also please read README and code comments for my explanations of how and why i did some things in a certain way, the code is heavily commented because i wanted to explain my thought process even more. Some of the **`keywords`** on readme are highlighted for your convenience. Enjoy reading!

## Bonus Features
* Paginated data is loaded in a **`async`** way and is **`lazy loaded`**, it boosts performance and speed a lot.
* Searching is done with **`url query`**, its more user friendly this way.
* I've added simple text that show number of currently possible characters to choose from in a header.
* **`Vue 3`** was used in this app, as well as **`Composition API`** and **`Suspense`** tag.
* Favorite characters are stored in **`local storage`**, also added removing them from favorites.
* Created simple unit tests with **`Jest`**, couldn't quite mount few components right, so they are not that advanced unfortunately.
* Current subpage that you are visiting is stored in **`cookies`**, user browser remembers last subpage visited.
* Removing characters from favorites has fancy animation, try it out.
* Website contains **`Pagination`**, it is done in a nice and clean way, works just fine.
* Advanced **`responsiveness`** is implemented into the website, try it out. Its smooth to use on **`mobile`**.
* Application is easily **`scallable`** and **`maintainable`** without chaning a single line of code thanks to its structure.
