import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static.module';

// db
import leaderboard from '../db/leaderboard.json';
import teams from '../db/teams.json';
import presidents from '../db/presidents.json';
import top_scorer from '../db/top_scorer.json';
import assists from '../db/assists.json';
// import coachs from '../db/coachs.json';

const app = new Hono();

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns Kings League leaderboard'
    },
    {
      endpoint: '/teams',
      description: 'Returns Kings League teams'
    },
    {
      endpoint: '/presidents',
      description: 'Returns Kings League presidents'
    },
    {
      endpoint: '/top_scorer',
      description: 'Returns Kings League top scorer'
    },
    {
      endpoint: '/assists',
      description: 'Returns Kings League assists'
    },
    // {
    //   endpoint: '/coachs',
    //   description: 'Returns Kings League coachs'
    // }
  ])
);

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard);
});

app.get('/presidents', (ctx) => {
  return ctx.json(presidents);
});

app.get('/presidents/:id', (ctx) => {
  const id = ctx.req.param('id');
  const foundPresident = presidents.find((president) => president.id === id);

  return foundPresident
    ? ctx.json(foundPresident)
    : ctx.json({ message: 'President not found' }, 404);
})

app.get('/teams', (ctx) => {
  return ctx.json(teams);
});

app.get('/teams/:id', (ctx) => {
  const id = ctx.req.param('id');
  const foundTeam = teams.find((team) => team.id === id);

  return foundTeam
    ? ctx.json(foundTeam)
    : ctx.json({ message: 'Team not found' }, 404);
});

app.get('/top_scorer', (ctx) => {
  return ctx.json(top_scorer);
});

app.get('/assists', (ctx) => {
  return ctx.json(assists);
});

// app.get('/coachs', (ctx) => {
//   return ctx.json(coachs);
// });

app.get('/static/*', serveStatic({ root: './' }));

app.notFound((c) => {
  const { pathname } = new URL(c.req.url);
  if (c.req.url.at(-1) === '/') {
    return c.redirect(pathname.slice(0, -1));
  }
  return c.json({ message: 'Not Found' }, 404);
});

export default app;