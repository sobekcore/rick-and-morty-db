# Rick & Morty Database
The website is available under: [rick-and-morty-db.netlify.app](https://rick-and-morty-db.netlify.app/). Also, please read README and code comments for my explanations of how and why I did some things in a certain way, the code is heavily commented because I wanted to explain my thought process even more. Some **`keywords`** on readme are highlighted for your convenience. Enjoy reading!

## Bonus Features
* Paginated data is loaded in a **`async`** way and is **`lazy loaded`**, it boosts performance and speed a lot.
* Searching is done with **`url query`**, its more user-friendly this way.
* I've added simple text that show number of currently possible characters to choose from in a header.
* **`Vue 3`** was used in this app, as well as the brand new **`Composition API`** instead of old Options API.
* Favorite characters are stored in **`local storage`**, also added removing them from favorites.
* Created simple unit tests with **`Jest`**, couldn't quite mount few components right, so they are not that advanced, unfortunately.
* Current subpage that you are visiting is stored in **`cookies`**, user browser remembers last subpage visited.
* Removing characters from favorites has fancy animation, try it out.
* Website contains **`Pagination`**, it is done in a nice and clean way, works just fine.
* Advanced **`responsiveness`** is implemented into the website, try it out. It's smooth to use on **`mobile`**.
* Application is easily **`scallable`** and **`maintainable`** without changing a single line of code thanks to its structure.
