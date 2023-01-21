import { writeDBFile, TEAMS, PRESIDENTS } from '../db/index.js';
import { URLS, cleanText, scrape } from './utils.js';

async function getLeaderBoard() {
  const $ = await scrape(URLS.leaderboard);
  const $rows = $('table tbody tr');

  const LEADERBOARD_SELECTORS = {
    team: { selector: '.fs-table-text_3', typeOf: 'string' },
    wins: { selector: '.fs-table-text_4', typeOf: 'number' },
    losses: { selector: '.fs-table-text_5', typeOf: 'number' },
    scoredGoals: { selector: '.fs-table-text_6', typeOf: 'number' },
    concededGoals: { selector: '.fs-table-text_7', typeOf: 'number' },
    yellowCards: { selector: '.fs-table-text_8', typeOf: 'number' },
    redCards: { selector: '.fs-table-text_9', typeOf: 'number' }
  }

  const getTeamFrom = ({ name }) => {
    const { presidentId, ...restOfTeam } = TEAMS.find((team) => team.name === name);
    const president = PRESIDENTS.find((president) => president.id === presidentId);
    return { ...restOfTeam, president };
  };

  const leaderBoardSelectorEntries = Object.entries(LEADERBOARD_SELECTORS);
  const leaderboard = [];
  $rows.each((_, el) => {
    const $el = $(el);

    const leaderBoardEntries = leaderBoardSelectorEntries.map(([key, { selector, typeOf }]) => {
      const rowValue = $el.find(selector).text();
      const cleanedValue = cleanText(rowValue);
      const value = (typeOf === 'number')
        ? Number(cleanedValue)
        : cleanedValue;
      return [key, value];
    });
    const { team: teamName, ...leaderboardForTeam } = Object.fromEntries(leaderBoardEntries);
    const team = getTeamFrom({ name: teamName });

    leaderboard.push({
      ...leaderboardForTeam,
      team
    });
  });
  return leaderboard;
}

const leaderboard = await getLeaderBoard();

await writeDBFile('leaderboard', leaderboard);