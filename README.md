# **Kings League**

Proyecto de uso didactivo siguiendo la iniciativa de **[Midudev](https://twitter.com/midudev)** en su canal de Twich de **[Midudev](https://www.twitch.tv/midudev)**

Puedes seguir a **midudev** en **[Twitter](https://twitter.com/midudev)** También puedes ver sus directos en **[Twitch](https://www.twitch.tv/midudev)** *(L-J a las 20h horarios habituales, pueden cambiar)* o en su canal de **[YouTube](https://www.youtube.com/c/midudev)**
Además te puedes unir a su comunidad en **[Discord](https://t.co/XruHkD62j3).**

## **⚡️ Tecnologías**

- Node
- Cheerio for scraping
- Cloudflare Workers
- Hono
- GitHub actions Cronjob


# Deploy dev
```js
npm run dev:api
```

# Deploy publish
```js
npm run publish:api
```

## API

Dirección: https://api.kingsleague.dev/

Los endpoints disponibles son:

- GET `/leaderboard`: Devuelve la clasificación de la Kings League.
- GET `/teams`: Devuelve todos los equipos de la Kings League.
- GET `/teams/:id`: Devuelve un equipo de la Kings League.
- GET `/presidents`: Devuelve todos los presidentes de la Kings League.
- GET `/presidents/:id`: Devuelve un presidente de un equipo de la Kings League.