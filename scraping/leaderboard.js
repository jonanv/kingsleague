import * as cheerio from 'cheerio';
import { writeFile, readFile } from 'node:fs/promises';
import path from 'node:path';

const DB_PATH = path.join(process.cwd(), './db/');
const TEAMS = await readFile(`${DB_PATH}/teams.json`, 'utf-8').then(JSON.parse);

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

  const getTeamIdFrom = ({ name }) => TEAMS.find((team) => team.name === name);

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

await writeFile(`${DB_PATH}/leaderboard.json`, JSON.stringify(leaderboard, null, 2), 'utf-8');