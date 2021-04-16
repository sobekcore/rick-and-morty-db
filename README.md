## Rick & Morty Database
The website is available under: -- (not available yet)

## Architectural Decisions
Here i will explain some of the design choices, it's kinda important so i would like you to read it. If something is shifted in a way you dont like, im sorry.

Firstly, as you can see, there is no pagination. Well, there is, but all the paginated data is squashed with the help of v-for into infinite-scrolling type of array, and then are loaded chunk by chunk (1 chunk == 1 page == 20 characters). without performance drops, thanks to lazy loading and **`asynchronus`** characters loading. So it doesnt throw that many requests at once and also elegantly loads in a waterfall kinda method (see "Network" tab in dev-tools if you want proof for that).\
If thats not whats accepted by any means in this kind of task, i could very easily change it back to pagination in like an hour by just removing the v-for loop and passing variables thru button clicks, not thru loop.

Secondly i made searching with the **`url query`** search, i think its way more usefull this way, instead of some kind of live searching. Thanks to that users could maybe share link of their searched characters more easily, because search results save with that link, wheres with live searching, it would be really hard to so.

## Bonus Features
Besides the basic requirements that were needed i've added few things that i thought fit good in there.

First one is a simple text that show number of all the characters in the header, that place felt very empty at fullHD+ resolutions so i thought i would place that there.

Second one is a usage of Vue 3. I've used some of the **`Composition API`** and its setup() with a great result, as well as async component + **`Suspense`** tag for asynchronous characters loading.

One of the features is a favorite characters list as wrote on the task requirements, but i've done it in elegant way of storing array of characters id's and that making a GraphQL query for the ones with saved id's. Everything is held in **`local storage`** so it is rememberred by users browser.

Next one is a simple unit testing with **`Jest`**. I know Jest from using it often with React, so i used it here too, the test are really simple but i couldnt quite get it right to mount components that had imports in it, not sure why tho.

Last feature is a a bit of advanced **`responsiveness`** with swapping grid rows with each other to result very eye pleasing usage of the application on mobile.
