import { Hono } from 'hono';
import { serveStatic } from 'hono/serve-static.module';

// db
import leaderboard from '../db/leaderboard.json';
import teams from '../db/teams.json';
import presidents from '../db/presidents.json';
import mvp from '../db/mvp.json';
import topScorers from '../db/top_scorers.json';
import topAssists from '../db/top_assists.json';
import coaches from '../db/coaches.json';
import playersTwelve from "../db/players_twelve.json";

const app = new Hono();

app.get('/', (ctx) =>
  ctx.json([
    {
      endpoint: '/leaderboard',
      description: 'Returns Kings League leaderboard',
			parameters: [
				{
					name: 'team',
					endpoint: '/leaderboard/:teamId',
					description: 'Return Kings League leaderboard info from Team Id'
				}
			]
    },
    {
      endpoint: '/teams',
      description: 'Returns Kings League teams',
			parameters: [
				{
					name: 'id',
					endpoint: '/teams/:id',
					description: 'Return Kings League team by id'
				},
				{
					name: 'id',
					endpoint: '/teams/:id/player_twelve',
					description: 'Return Kings League player twelve by team id'
				}
			]
    },
    {
      endpoint: '/presidents',
      description: 'Returns Kings League presidents',
			parameters: [
				{
					name: 'id',
					endpoint: '/presidents/:id',
					description: 'Return Kings League president by id'
				}
			]
    },
		{
			endpoint: '/mvp',
			description: 'Returns Kings League Most Valuable Players'
		},
    {
      endpoint: '/top_scorers',
      description: 'Returns Kings League top scorer',
			parameters: [
				{
					name: 'rank',
					endpoint: '/top-scorers/:rank',
					description: 'Return Kings League top scorer by rank'
				}
			]
    },
    {
      endpoint: '/top_assists',
      description: 'Returns Kings League top assists',
			parameters: [
				{
					name: 'rank',
					endpoint: '/top-assists/:rank',
					description: 'Return Kings League top assister by rank'
				}
			]
    },
    {
      endpoint: '/coaches',
      description: 'Returns Kings League coaches',
			parameters: [
				{
					name: 'teamId',
					endpoint: '/coaches/:teamId',
					description: 'Return Kings League coach by teamId'
				}
			]
    },
		{
			endpoint: '/players_twelve',
			description: 'Returns Kings League Players Twelve'
		}
  ])
);

app.get('/leaderboard', (ctx) => {
  return ctx.json(leaderboard);
});

app.get('/leaderboard/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const foundTeam = leaderboard.find((stats) => stats.team.id === teamId)

	return foundTeam 
		? ctx.json(foundTeam) 
		: ctx.json({ message: 'Team not found' }, 404);
})

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

app.get('/teams/:id/player_twelve', (ctx) => {
  const id = ctx.req.param('id');
  const foundPlayerTwelve = playersTwelve.find((player) => player.team.id === id);

  return foundPlayerTwelve
    ? ctx.json(foundPlayerTwelve)
    : ctx.json({ message: 'Player twelve not found' }, 404);
});

app.get('/mvp', (ctx) => {
	return ctx.json(mvp);
});

app.get('/top_scorers', (ctx) => {
  return ctx.json(topScorers);
});

app.get('/top_scorers/:rank', (ctx) => {
	const rank = ctx.req.param('rank');
	const foundScorer = topScorers.find((scorer) => scorer.rank.toString() === rank.toString());

	return foundScorer 
		? ctx.json(foundScorer) 
		: ctx.json({ message: 'Top scorer not found' }, 404);
});

app.get('/top_assists', (ctx) => {
  return ctx.json(topAssists);
});

app.get('/top_assists/:rank', (ctx) => {
	const rank = ctx.req.param('rank');
	const foundAssister = topAssists.find((assister) => assister.rank.toString() === rank.toString());

	return foundAssister
		? ctx.json(foundAssister)
		: ctx.json({ message: 'Top assister not found' }, 404);
});

app.get('/coaches', (ctx) => {
  return ctx.json(coaches);
});

app.get('/coaches/:teamId', (ctx) => {
	const teamId = ctx.req.param('teamId')
	const teamName = teams.find((team) => team.id === teamId)
	const foundedCoach = coaches.find((coach) => coach.teamName === teamName)

	return foundedCoach 
		? ctx.json(foundedCoach) 
		: ctx.json({ message: 'Coach not found' }, 404)
})

app.get('/players_twelve', (ctx) => {
  return ctx.json(playersTwelve);
});

app.get('/static/*', serveStatic({ root: './' }));

app.notFound((c) => {
  const { pathname } = new URL(c.req.url);
  if (c.req.url.at(-1) === '/') {
    return c.redirect(pathname.slice(0, -1));
  }
  return c.json({ message: 'Not Found' }, 404);
});

export default app;
