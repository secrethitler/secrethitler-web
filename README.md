# secret-hitler

## Eingesetzte Technologien
- Vue.js, vue-router (Single-Page-App), vuex (State Management)
- Tailwindcss (CSS-Framework)
- pusher-js (Client Library für die Pusher Websocket Verbindung)
- axios (Client für HTTP Requests)

## Verwendung von Pusher
Sobald man einer Lobby beitreten möchte, verbinden sich der Client mir 3 Pusher Channels. Einem globalen, einem "presence" und einem "private" Channel.
Der Presence-Channel beinhaltet Information über User, die alle im Moment connected sind. Dies ist praktisch um sich die Lobby aufzubauen.
Auf dem Private-Channel werden Events ausgelöst, die nur einen bestimmten User betreffen, z.B. wenn der Präsident einen Kanzler ernennen soll.
Auf dem globalen Channel werden Events gesendet, die alle User betreffen.

in `src/views/Game.vue` werden alle Events registriert und gehandelt. Diese funktionieren ganz ähnlich wie ein typischer eventListener in JavaScript. In jedem Handler wird erst einmal die mitgegebenen Daten über vuex im global-state gespeichert. Anschließend wird auf eine Unterseite weitergeleitet, falls eine Useraktion erfordert ist.

