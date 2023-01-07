import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static.module';

// db
import leaderboard from '../db/leaderboard.json';
import teams from '../db/teams.json';
import presidents from '../db/presidents.json';

const app = new Hono();

app.get('/', (context) => {
  return context.json([
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
    }
  ]);
});

// Endpoints
app.get('/leaderboard', (context) => {
  return context.json(leaderboard);
});

app.get('/teams', (context) => {
  return context.json(teams);
});

app.get('/teams/:id', (context) => {
  const id = context.req.param('id');
  const foundTeam = teams.find(team => team.id === id);

  return foundTeam
    ? context.json(foundTeam)
    : context.json({ message: 'Team not found' }, 404)
});

app.get('/presidents', (context) => {
  return context.json(presidents);
});

app.get('/presidents/:id', (context) => {
  const id = context.req.param('id');
  const foundPresident = presidents.find(president => president.id === id);

  return foundPresident
    ? context.json(foundPresident)
    : context.json({ message: 'President not found' }, 404)
});

app.get('/static/*', serveStatic({ root: './' }));

export default app;
