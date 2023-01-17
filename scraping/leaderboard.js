import * as cheerio from 'cheerio';
import { writeDBFile, TEAMS, PRESIDENTS } from '../db/index.js';

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
};

async function scrape(url) {
  const request = await fetch(url);
  const html = await request.text();
  return cheerio.load(html);
}

async function getLeaderBoard() {
  const $ = await scrape(URLS.leaderboard);
  const $rows = $('table tbody tr');

  const LEADERBOARD_SELECTORS = {
    team: { selector: '.fs-table-text_3', typeOf: 'string' },
    victories: { selector: '.fs-table-text_4', typeOf: 'number' },
    loses: { selector: '.fs-table-text_5', typeOf: 'number' },
    scoredGoals: { selector: '.fs-table-text_6', typeOf: 'number' },
    concededGoals: { selector: '.fs-table-text_7', typeOf: 'number' },
    yellowCards: { selector: '.fs-table-text_8', typeOf: 'number' },
    redCards: { selector: '.fs-table-text_9', typeOf: 'number' }
  }

  const getTeamIdFrom = ({ name }) => {
    const { presidentId, ...restOfteam } = TEAMS.find(team => team.name === name);
    const president = PRESIDENTS.find(president => president.id === presidentId);
    return { ...restOfteam, president }
  };

  const cleanText = text => text
    .replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim();

  const leaderBoardSelectorsEntries = Object.entries(LEADERBOARD_SELECTORS);
  const leaderboard = [];
  $rows.each((_, el) => {
    const $el = $(el);

    const leardBoardEntries = leaderBoardSelectorsEntries.map(([key, { selector, typeOf }]) => {
      const rowValue = $el.find(selector).text();
      const valueCleaned = cleanText(rowValue);
      const value = (typeOf === 'number')
        ? Number(valueCleaned)
        : valueCleaned;
      return [key, value];
    });
    const { team: teamName, ...leaderboardForTeam } = Object.fromEntries(leardBoardEntries);
    const team = getTeamIdFrom({ name: teamName });

    leaderboard.push({
      ...leaderboardForTeam,
      team
    });
  });
  return leaderboard;
}

const leaderboard = await getLeaderBoard();

await writeDBFile('leaderboard', leaderboard);