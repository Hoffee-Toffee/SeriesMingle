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
| Future Route | 🚧 | Route not yet implemented |

### `/client/apis`

```
Contains all API functions.
Each file contains and (default) exports a function that makes a request to the server.
Unless otherwise stated, all functions return the body of the response.
```

#### - [`cloneProject.ts`](./client/apis/cloneProject.ts)

>Clones a project of a given id, if the user has access to it, assigning the clone to the user.

*To be updated into using auth from logged in user, instead of passing user id.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `id` | string | The id of the project to clone |
| `user` | string | The user id of the user to own the cloned project |

**Endpoint:** [POST `/api/v1/projects/clone`](#--projectsts)

```jsonc
// Request Body
{
  "id": "iasIFGOcdOlRZvYNNB4a",
  "user": "5feNQ3XPKZRnpaMydanS8C1OZcs2"
}
```

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| ID is of project user owns | Success | 🚧 |
| ID is of project user has been invited to | Success | 🚧 |
| ID is of project user does not have access to | Failure | 🚧 |
| ID is invalid | Failure | 🚧 |
| User is not authenticated | Failure | 🚧 |

#### - [`createProject.ts`](./client/apis/createProject.ts)

>Creates a new project and assigns it to the user.

*To be updated into using auth from logged in user, instead of passing user id.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `user` | string | The user id of the user to own the new project |

**Endpoint:** [POST `/api/v1/projects/create`](#--projectsts)

```jsonc
// Request Body
{
  "user": "5feNQ3XPKZRnpaMydanS8C1OZcs2"
}
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

**Endpoint:** [GET `/api/v1/projects/delete/:id`](#--projectsts)

Returns a status code.

**Tests:**

| Case | Output Case | Test Status |
| --- | --- | --- |
| ID is of project user owns | Success | 🚧 |
| ID is of project user does not own | Failure | 🚧 |
| ID is invalid | Failure | 🚧 |
| User is not authenticated | Failure | 🚧 |

#### - `fetchMedia.ts`

>Fetches extended details for a movie or tv show of a given id.

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `type` | string | The type of media to fetch (`'movie'` or `'tv'`) |
| `id` | string | The id of the media to fetch |

**Endpoint:** [GET `/api/v1/:type?id=:id`](#--tmdbts)

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| ID is valid | Success | 🚧 |
| ID is invalid | Failure | 🚧 |
| Type is valid | Success | 🚧 |
| Type is invalid | Failure | 🚧 |

#### - `fetchProject.ts`

>Fetches a project of a given id, if the user has access to it.

*To be updated into using auth from logged in user.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `id` | string | The id of the project to fetch |

**Endpoint:** [GET `/api/v1/projects/:id`](#--projectsts)

Returns a processed project object.

*To be migrated*

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| ID is of project user owns | Success | 🚧 |
| ID is of project user has been invited to | Success | 🚧 |
| ID is of project user does not have access to | Failure | 🚧 |
| ID is invalid | Failure | 🚧 |
| User is not authenticated | Failure | 🚧 |

#### - [`fetchSecret.ts`](./client/apis/fetchSecret.ts)

>Fetches the decrypted content of an Easter Egg, if the passphrase is correct.

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `passphrase` | string | The passphrase to decrypt the content |

**Endpoint:** [GET `/api/v1/secret?passphrase=:passphrase`](#--decryptts)

Returns the raw text decrypted from the Easter Egg file.

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| Valid passphrase | Success | 🚧 |
| Invalid passphrase | Failure | 🚧 |

#### - `fetchUserProjects.ts`

>Fetches all projects owned by a user.

*To be updated into using auth from logged in user.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `user` | string | The user id of the user to fetch projects for |

**Endpoint:** [GET `/api/v1/projects/user/:user`](#--projectsts)

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| User is authenticated | Success | 🚧 |
| User is not authenticated | Failure | 🚧 |

#### - [`leaveProject.ts`](./client/apis/leaveProject.ts)

>Removes a user from a project of a given id, if the user is a member.

*To be updated into using auth from logged in user.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `projectId` | string | The id of the project to leave |
| `userId` | string | The user id of the user to remove from the project |

**Endpoint:** [POST `/api/v1/projects/leave/:projectId`](#--projectsts)

```jsonc
// Request Body
{
  "userId": "5feNQ3XPKZRnpaMydanS8C1OZcs2"
}
```

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| ID is of project user is a member of | Success | 🚧 |
| ID is of project user is not a member of | Failure | 🚧 |
| ID is invalid | Failure | 🚧 |
| User is not authenticated | Failure | 🚧 |

#### - [`search.ts`](./client/apis/search.ts)

>Searches for a movie or tv show by a given query.

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `query` | string | The search query to search for |

**Endpoint:** [GET `/api/v1/search?q=:query`](#--tmdbts)

Returns an array of search results, with the query added to the front of the array.

*To be migrated.*

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| Query is valid | Success | 🚧 |
| Query is invalid | Failure | 🚧 |

#### - [`setProject.ts`](./client/apis/setProject.ts)

>Sets a project of a given id, to the given data, if the user has access to it.

*To be updated into using auth from logged in user.*

**Params:**

| Parameter | Data Type | Description |
| --- | --- | --- |
| `state` | object | The new project data |
| `id` | string | The id of the project to set |
| `props` | string[] | The properties that have been changed |

**Endpoint:** [POST `/api/v1/projects`](#--projectsts)

```jsonc
// Request Body
{
  "id": "iasIFGOcdOlRZvYNNB4a",
  // ...state (Spread of new project data)
  "props": ["description"],
  "layers": // Conversion from an array to an object with layer indices as keys
}
```

**Tests:**

| Case | Expected Output | Test Status |
| --- | --- | --- |
| ID is of project user owns | Success | 🚧 |
| ID is of project user has been invited to | Success | 🚧 |
| ID is of project user does not have access to | Failure | 🚧 |
| ID is invalid | Failure | 🚧 |
| User is not authenticated | Failure | 🚧 |

### `/client/components`

```
Contains all React components.
Each file contains and (default) exports a React component.
Any documented state `xyz` has an undocumented setter named `setXyz`.
```

#### - [`App.tsx`](./client/components/App.tsx)

>Root component for the application.

Styled with [app.scss](#--appscss).

**Props:** None

**Data:**

| Data | Source | Type (default value) | Description |
| --- | --- | --- | --- |
| `location` | useLocation().key | string | Identifier for the current page |
| `user` | State | auth.currentUser | The current user, or `null` if not logged in |
| `isAuthLoaded` | State | boolean (`false`) | Whether the authentication state has been loaded |
| `isPageLoaded` | State | boolean (`false`) | Whether the page has been loaded |
| `showLoading` | State | boolean (`false`) | Whether the loading screen should be shown |
| `hasLoaded` | const | boolean (isAuthLoaded && isPageLoaded) | Whether all page data has been loaded |
| `loader` | const | setTimeout | Starts a loading screen if page has not loaded after 2 seconds |
| `page` | const | string (`"home"`) | uses `useOutlet()` to get the current page name |

**Effects:**

| Dependencies | Description |
| --- | --- |
| `loader`, `showLoading`, `auth.onAuthStateChanged` | Sets `user` and `isAuthLoaded` when authentication state changes, and clears a loading screen if it is shown |
| `location` | Resets `isPageLoaded` to `false` when entering a new page |
| `useScroll(isPageLoaded)` from [scroll.ts](#--scrollts) | Adds a scroll listener, if applicable, when the page has loaded |

**Returns:**

```
Uses `Helmet` to set the page title, favicon, and meta tags.
Shows a loading indicator, with `hasLoaded` being used to toggle it's class.
If authenticated, then user and loading providers are added, containing a div with an id of the page name, containing the outlet component.

`UserContext` and `LoadingContext` are exported for use in child components.
```

**Tests:** None

#### - [`NotFound.tsx`](./client/components/NotFound.tsx)

>Component for the 404 page.

Very basic containing only text.

#### - [`Home.tsx`](./client/components/Home.tsx)

>Component for the home page.

Styled with [home.scss](#--homescss).

**Props:** None

**Data:**

| Data | Source | Type (default value) | Description |
| --- | --- | --- | --- |
| `user` | Context (`UserContext` from [App.tsx](#--apptsx)) | User | The current user, used to determine if the user is logged in |
| `isPageLoaded` | Context (`LoadingContext` from [App.tsx](#--apptsx)) | boolean | Whether the page has loaded |

**Effects:**

| Dependencies | Description |
| --- | --- |
| `isPageLoaded`, `setIsPageLoaded` | Sets the page to loaded |

**Returns:**

```
Header containing the SeriesMingle logo and nav menu with links to 'About', 'Upcoming Features', and either 'Login or Register' or 'Dashboard' depending on if the user is logged in.

The main section contains several headers with features listed, showing an example behind each.
'Get Started' / 'Go to Dashboard' button at the bottom of each.

Upcoming features section has a list of planned features, no example or button.

Each section has a scroll indicator, except the last, which prompts the user to get started.
```

**Tests:** None

#### - [`Example.tsx`](./client/components/Example.tsx)

>Component showing example project actions for the home page.

Styled with [home.scss](#--homescss) and [project.scss](#--projectscss).

**Props:**

| Prop | Type | Description |
| --- | --- | --- |
| `id` | string | The id to give the example element |

**Data:** None

**Returns:**

```
A pre-rendered schedule containing two layers:
- Breaking Bad (All Episodes), El Camino, and Better Call Saul (All Episodes)
- House (All Episodes)

In future, I plan to add a third layer containing a long movie series (e.g. James Bond).

For notes on schedule generation, see [generateSchedule.ts](#--generateschedulets).
```

**Tests:** None

#### - [`Login.tsx`](./client/components/Login.tsx)

>Component for the login page.

Styled with [login.scss](#--loginscss).

**Props:** None

**Data:**

| Data | Source | Type (default value) | Description |
| --- | --- | --- | --- |
| `user` | Context (`UserContext` from [App.tsx](#--apptsx)) | User | The current user |
| `error` | State | string (`""`) | The error message to display |
| `creatingEmail` | State | boolean (`false`) | Whether the user is creating an account, or logging in |
| `emailRef` | Ref | HTMLInputElement | The email input element |
| `passwordRef` | Ref | HTMLInputElement | The password input element |
| `confirmPasswordRef` | Ref | HTMLInputElement | The confirm password input element |
| `isPageLoaded` | Context (`LoadingContext` from [App.tsx](#--apptsx)) | boolean | Whether the page has loaded |
| `onSubmit` | | function | Handles form submission, creating or logging in the user, and displaying errors |
| `SignInWithGoogle` | | function | Activates Google's sign in popup, and logs in the user (if successful) |

**Effects:** None

**Returns:**

```
Simple form with:
- SeriesMingle logo / heading
- Email input
- Password input (and confirm password input if creating an account)
- Submit button
- Sign in with Google button
- Span with error message
- Link to toggle form between login and create account configurations

User is redirected to the dashboard if they are logged in.
If user was redirected here from a protected route, they are redirected back after logging in.
```

#### - [`ProtectedRoute.tsx`](./client/components/ProtectedRoute.tsx)

>Component wrapping and protecting a route.

**Props:**

| Prop | Type | Description |
| --- | --- | --- |
| `children` | ReactNode | The component to render if conditions are met |
| `ifLoggedIn` | boolean (`true`) | Whether the user must be logged in to access the route (i.e. dashboard only if logged in, login only if not) |
| `redirectTo` | string (`"/login"`) | The route to redirect to if conditions are not met |
| `includeRedirect` | boolean (`false`) | Whether to include this route in the URL redirect (so the user can be redirected back here after logging in) |

**Data:**

| Data | Source | Type (default value) | Description |
| --- | --- | --- | --- |
| `user` | Context (`UserContext` from [App.tsx](#--apptsx)) | User | The current user |
| `searchParams` | useSearchParams() | URLSearchParams | The search parameters of the current URL |
| `from` | searchParams.get("from") | string | The route the user was redirected from |

**Returns:**

```
If includeRedirect is true, then redirectTo is given the current route as a search parameter (?from=...).
If not, and from is provided, then that is where the user is redirected to.

Finally, if the user's sign in status matches ifLoggedIn, then the children are rendered, otherwise the redirect is triggered.
```

**Tests:** None

#### - [`Dashboard.tsx`](./client/components/Dashboard.tsx)

>Component for the dashboard page.

Styled with [dash.scss](#--dashscss).

**Props:** None

**Data:**

| Data | Source | Type (default value) | Description |
| --- | --- | --- | --- |
| `user` | Context (`UserContext` from [App.tsx](#--apptsx)) | User | The current user |
| `isPageLoaded` | Context (`LoadingContext` from [App.tsx](#--apptsx)) | boolean | Whether the page has loaded |
| `ownedProjects` | State | Project[] (`[]`) | Projects owned by the user |
| `joinedProjects` | State | Project[] (`[]`) | Projects the user has joined |
| `navigate` | UseNavigate | function | Navigates to a new page |
| `db` | GetFirestore | function | Gets the Firestore database |
| `createProjectAndOpen` | | async function | Creates or clones a given project, and navigates to it |
| `deleteProjectAndRemove` | | async function | Deletes a given project from ID, and removes it from the displayed projects |
| `leaveProjectAndRemove` | | async function | Leaves a given project from ID, and removes it from the displayed projects |

**Effects:**

| Dependencies | Description |
| --- | --- |
| `user`, `db`, `setPageLoaded` | Fetches the user's owned and joined projects from the database, and then sets the page to loaded |

**Returns:**

```
Sign Out button on the top left, which signs out the user, directing them to the home page.

Dashboard heading is displayed, with two sections:
- Owned Projects, with a project card for each owned project, and a button to create a new project.
- Joined Projects, with a project card for each joined project.
```

**Tests:** None

#### - [`ProjectCard.tsx`](./client/components/ProjectCard.tsx)

>Used on the dashboard page to display a project card.

Styled with [dash.scss](#--dashscss).

**Props:**

| Prop | Type | Description |
| --- | --- | --- |
| `project` | Project | The data for the project to display |
| `owner` | boolean | Whether the user is the owner of the project |

**Data:**

| Data | Source | Type (default value) | Description |
| --- | --- | --- | --- |
| `contextMenu` | Document | HTMLElement | The context menu element |
| `deletePopup` | Document | HTMLElement | The delete popup element |
| `positionContextMenu(target)` | | function | Positions the context menu relative to the hovered card |

**Returns:**

```
Project card, linking to the project page, containing:
- Project title (or 'Untitled Schedule' if none)
- Project description (or 'No Description' if none)
- Ellipsis icon, opening a context menu with options to:
  - Delete Project (if owner is true)
  - Leave Project (if owner is false)
  - Clone Project
```

**Tests:** None

#### - [`Project.tsx`](./client/components/Project.tsx)

>Component for the project page.

Styled with [project.scss](#--projectscss).

**Props:** None

**Data:**

| Data | Source | Type (default value) | Description |
| --- | --- | --- | --- |
| `user` | Context (`UserContext` from [App.tsx](#--apptsx)) | User | The current user |
| `isPageLoaded` | Context (`LoadingContext` from [App.tsx](#--apptsx)) | boolean | Whether the page has loaded |
| `readOnly` | State | boolean (`true`) | Whether the user can edit the project |
| `id` | useParams().id | string | The id of the project to access |
| `uid` | user.uid | string | The id of the current user |
| `db` | GetFirestore | function | Gets the Firestore database |
| `initialState` |  | Project | Blank project configuration |
| `state` | State | Project(`initialState`) | The current project data |
| `activeEntry` | State | string(`null`) | Identifier for an entry being dragged |
| `tempLayers` | State | array(`[]`) | Stores temporary layers for drag and drop, to be set once dropped |
| `outlinePos` | State | string(`null`) | Identifier for the projected drop position of the dragged entry |
| `hasAccess` | State | boolean(`false`) | Whether the user has access to the project |
| `changedProps` | State | string[](`[]`) | The properties that have been changed |
| `saved` | State | boolean(`true`) | Whether the local project data has been saved |
| `sensors` | UseSensors | function | Gets the sensors for drag and drop |
| `savedJS` | State | object(`{}`) | Any decoded easter eggs to run |
| `shown` |  | tempLayers \|\| layers | The layers being displayed, showing the temp if they exist, otherwise the saved project layers |
| `addData(entry, layerId, entryId)` | | function | Adds show / movie data to the project, assigning a reference to that data in a specified layer and entry |
| `removeWatched` | | function | Removes all entries before the bookmark in the schedule |
| `scheduleData` | `generateSchedule(...state)` from [generateSchedule.ts](#--generateschedulets) | object | The schedule generated using the project data |
| ...state | `state` | Project | All project data is spread out into their own consts for easy access |
| `set{Prop}` | | function | Updates this value in the project data, adding it to the props changed list |
| `onDragStart(event)` | | function | Handles the start of a drag event, setting the active entry |
| `onDragEnd(event)` | | function | Handles the end of a drag event, setting the active entry, outline position, and temp layers to null, after setting the layers to the new order |
| `onDragOver(event)` | | function | Handles the drag over event, setting the outline position |
| `moveEntry(oldLayer, oldIndex, newLayer, newIndex)` | | function | Moves an entry from one layer to another, or within the same layer, used in onDragEnd |

**Effects:**

| Dependencies | Description |
| --- | --- |
| `saved` | If project hasn't saved, use a beforeunload listener to warn the user |
| `id`, `uid`, `db`, `setPageLoaded` | Fetches the project data from the database, and sets the page to loaded, listening for changes to the project data |
| `keys`, `savedJS` | Saves and runs any decoded easter eggs |
| `bookmark` | If the user has a bookmark, scroll to it |
| ...state | If the project data changes, update the project data in the database |

**Returns:**

```
If it has loaded, but you have no access, then it returns only "No Access" text.

If readonly, then you see 'READ-ONLY' at the top and all db calls are disabled.

In the top-left corner you will see some buttons:
- Back to Dashboard
- Share Schedule (if layers are not empty)
- Load Example (if layers are empty, sets the project to the example project)

At the top we see the title and description of the project.
This text is editable if the user has access.

There is then a layer container, with drag and drop contexts surrounding it.
The Layer component is rendered for each layer, with the layer data passed down.
After all the layers is a button to add a new layer.
And there is also one Entry component here, shown only during drag and drop, to follow the mouse as the user drags an entry.

Next are the schedule settings, including:
- Space Multi-Parters (Radio buttons: 'Normally', 'Closer', and 'Consecutively')
- Streak Duration (Number input, or blank if not set)
- Streaks per Session (Number input, or blank if not set, only shown if Streak Duration is set)
- Session duration (Number input, or blank if not set, only shown if Streak Duration is not set)
- Show Streaks (Checkbox, only shown if Streaks or Sessions exist)
- Group Streaks (Checkbox, only shown if Streaks or Sessions exist)

Finally, the schedule component is rendered, with the schedule data and user props passed down.
```

**Tests:** None