# SeriesMingle

This is the documentation for the SeriesMingle Repository.

***Work in Progress***

<!-- This readme will contain the following information:
- Project Description and Objectives
- File Structure and Function Descriptions
- API Endpoints -->

<!-- ## Table of Contents
1. [Objective](#Objective)
2. [File Structure](#File-Structure)
   * [Client](#Client)
     * [Apis](#Apis)
       * [cloneProject.ts](#cloneProject.ts)
       * [createProject.ts](#createProject.ts)
       * [deleteProject.ts](#deleteProject.ts)
       * [fetchMedia.ts](#fetchMedia.ts)
       * [fetchProject.ts](#fetchProject.ts)
       * [fetchSecret.ts](#fetchSecret.ts)
       * [fetchUserProjects.ts](#fetchUserProjects.ts)
       * [leaveProject.ts](#leaveProject.ts)
       * [search.ts](#search.ts)
       * [setProject.ts](#setProject.ts)
     * [Components](#Components)
       * [App.tsx](#App.tsx)
       * [Dashboard.tsx](#Dashboard.tsx)
       * [Entry.tsx](#Entry.tsx)
       * [EpisodeDetails.tsx](#EpisodeDetails.tsx)
       * [Example.tsx](#Example.tsx)
       * [Home.tsx](#Home.tsx)
       * [Layer.tsx](#Layer.tsx)
       * [Login.tsx](#Login.tsx)
       * [NotFound.tsx](#NotFound.tsx)
       * [Project.tsx](#Project.tsx)
       * [ProjectCard.tsx](#ProjectCard.tsx)
       * [ProtectedRoute.tsx](#ProtectedRoute.tsx)
       * [Schedule.tsx](#Schedule.tsx)
       * [Terminal.tsx](#Terminal.tsx)
     * [Files](#Files)
       * [example.json](#example.json)
       * [favicon.ico](#favicon.ico)
       * [firebase.rules](#firebase.rules)
     * [Functions](#Functions)
       * [generateColors.ts](#generateColors.ts)
       * [generateSchedule.ts](#generateSchedule.ts)
       * [scroll.ts](#scroll.ts)
     * [Styles](#Styles)
       * [app.scss](#app.scss)
       * [dash.scss](#dash.scss)
       * [home.scss](#home.scss)
       * [login.scss](#login.scss)
       * [project.scss](#project.scss)
     * [index.tsx](#index.tsx)
     * [routes.tsx](#routes.tsx)
   * [Models](#Models)
     * WIP
   * [Server](#Server)
    * [EasterEggs](#EasterEggs)
      * [decrypt.ts](#decrypt.ts)
      * [*.txt](#*.txt)
    * [Routes](#Routes)
      * [projects.ts](#project.ts)
      * [tmdb.ts](#tmdb.ts)
    * [firebase.ts](#firebase.ts)
    * [index.ts](#index.ts)
    * [server.ts](#server.ts)
   * [Tests](#Tests)
     * WIP
   * [.gitignore](#.gitignore)
   * [Dockerfile](#Dockerfile)
   * [Documentation.md](#Documentation.md)
   * [index.html](#index.html)
   * [package-lock.json](#package-lock.json)
   * [package.json](#package.json)
   * [Procfile](#Procfile)
   * [README.md](#README.md)
   * [tsconfig.json](#tsconfig.json)
   * [vite.config.js](#vite.config.js) -->

## File Structure

**Test Status Key:**

| Status | Symbol | Usage |
| --- | --- | --- |
| Test Passed | ✅ | Test passes for case |
| Test Failed | 🛑 | Test fails for case |
| Future Test | 🚧 | Test not yet implemented |

**Route Protection Key:**

| Status | Symbol | Usage |
| --- | --- | --- |
| Protected Route | ✅ | Authentication required |
| Public Route | ❎ | No authentication required |
| To be Protected | 🛑 | Authentication planned |
| Future Route | 🚧 | Route not yet implimented |

### `/client/apis`

Contains all API functions.
Each file contains and (default) exports a function that makes a request to the server.

#### - `cloneProject.ts`

>Clones a project of a given id, if the user has access to it, assigning the clone to the user.

Sends POST request to `/api/v1/projects/clone` with the project id and user id.

*To be updated into using auth from logged in user, instead of passing user id.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `id` | string | The id of the project to clone |
| `user` | string | The user id of the user to own the cloned project |

**Returns:**

```json
// On Success
{
  "id": "iasIFGOcdOlRZvYNNB4a" // The id of the new project
}

// On Failure
Status: 400
```

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| ID is of project user owns | Success | 🚧 |
| ID is of project user has been invited to | Success | 🚧 |
| ID is of project user does not have access to | Failure | 🚧 |
| ID is invalid | Failure | 🚧 |
| User is not authenticated | Failure | 🚧 |

#### - `createProject.ts`

>Creates a new project and assigns it to the user.

*To be updated into using auth from logged in user, instead of passing user id.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `user` | string | The user id of the user to own the new project |

**Returns:**

```json
// On Success
{
  "id": "iasIFGOcdOlRZvYNNB4a" // The id of the new project
}

// On Failure
Status: 400
```

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| User is authenticated | Success | 🚧 |
| User is not authenticated | Failure | 🚧 |

#### - `deleteProject.ts`

>Deletes a project of a given id, if the user owns it.

*To be updated into using auth from logged in user.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `id` | string | The id of the project to delete |

**Returns:**

```json
// On Success
Status: 200

// On Failure
Status: 400
```

**Tests:**

| Case | Output Case | Test Status |
| --- | --- | --- |
| ID is of project user owns | Success | 🚧 |
| ID is of project user does not own | Failure | 🚧 |
| ID is invalid | Failure | 🚧 |
| User is not authenticated | Failure | 🚧 |

<!-- 

## Server Routes

Root: `/api/v1`

| Endpoint | Usage | Body | Response | Protected |
| --- | --- | --- | --- | --- |
| GET `/search?q=string` | Search for a movie or tv show | | Array of search results | ❎ |
| GET `/movie?id=string` | Get details for a movie | | Object with movie details | ❎ |
| GET `/tv?id=string` | Get details for a tv show | | Object with tv show details | ❎ |
| POST `/projects` | Set a project | Updated project object | Status Code | ✅ |
| GET `/projects/:id` | Get a project | | Project object | ✅ |
| GET `/projects/user/:user` | Get all projects owned by user | | Array of project objects | ✅ |
| POST `/projects/create` | Create a new project | Project object | Object containing new project id | ✅ |
| GET `/projects/delete/:id` | Delete a project | | Status Code | ✅ |
| POST `/projects/clone` | Clone a project | Project object | Object containing new project id | ✅ |
| GET `/secret?passphrase=string` | Attempt to access an Easter Egg | | Decrypted Easter Egg Content | ❎ |
 -->