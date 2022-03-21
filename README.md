# Rick & Morty Database
This application is an aggregated source of all the characters from the show. Data is gathered from an awesome public API named: [https://rickandmortyapi.com](https://rickandmortyapi.com). Previously mentioned data is then presented in a nice and eye-pleasing way to easily search through characters and make favorites ones your own.

## Application Features
* Most of the codebase is supported with **`TypeScript`** to ensure that no runtime errors are present in a final production code.

* Paginated data is loaded in a **`async`** way and is **`lazy loaded`**, it boosts performance and speed a lot.

* Searching is done with **`url query`**. Visitors can share their search results with ease, it's more user-friendly this way.

* **`Vue 3`** was used in this app, as well as the brand new **`Composition API`** instead of old Options API. It brings more consistency to the framework.

* Favorite characters are stored in **`local storage`**, which is threaded as a regular storage unit - it could be a database or any other type of storage, and it would work rather similar.

* Simple unit tests are implemented with **`Jest`**. They are provided in a per-component way to ensure that every component is tested in each own context.

* Current subpage that you are visiting is stored in **`cookies`**. User browser remembers last subpage visited to simplify usage of an application.

## Application Structure
Structure of the application is very straight forward and self-explanatory, but here it will be described briefly just in case.

```
├── src
│   ├── assets
│   ├── components
│   ├── graphql
│   ├── services
│   ├── styles
│   ├── types
│   ├── app.vue
│   └── main.ts
```

* **`assets`** directory is a place where all the static assets should belong, like images, plain CSS files, fonts etc.
* **`components`** directory must be used to place all the new application core components in it, they must be as simple as possible and contain a minimum of a logic as possible
* **`graphql`** directory holds all the graphql queries and mutations, they are separated from the rest of the codebase for clarity
* **`services`** directory should contain most of the logic for most of the features, this is your go-to place to create new functionalities
* **`styles`** directory contains all the style files that are strictly connected to the main application, as well as helpers files etc.
* **`types`** directory has all the type declaration files to ensure that TypeScript correctly handles types in all the files that are not natively typed
* **`app.vue`** is a standard entry-point for a Vue application, it's always a first component of a Vue instance
* **`main.ts`** is a real entry-point of a whole codebase, it initializes Vue instance, Apollo Client etc.
