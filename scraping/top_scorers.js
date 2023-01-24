import { TEAMS } from '../db/index.js';
import { cleanText } from './common/utils.js';

const TOP_SCORERS_SELECTORS = {
  team: { selector: '.fs-table-text_3', typeOf: 'string' },
  playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
  gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
  goals: { selector: '.fs-table-text_6', typeOf: 'number' }
};

export async function getTopScorers($) {
  const $rows = $('table tbody tr');

  const getImageFromTeam = ({ name }) => {
    const { image } = TEAMS.find((team) => team.name === name);
    return image;
  }

  const topScorersSelectorEntries = Object.entries(TOP_SCORERS_SELECTORS);
  const topScorers = [];

  $rows.each((index, el) => {
    const $el = $(el);

    const topScorersEntries = topScorersSelectorEntries.map(([key, { selector, typeOf }]) => {
      const rawValue = $el.find(selector).text();
      const cleanedValue = cleanText(rawValue);

      const value = (typeOf === 'number')
        ? Number(cleanedValue)
        : cleanedValue;

      return [key, value];
    });

    const { team: teamName, ...topScorersData } = Object.fromEntries(topScorersEntries);
    const image = getImageFromTeam({ name: teamName });

    topScorers.push({
      rank: index + 1,
      ...topScorersData,
      team: teamName,
      image
    });
  });

  return topScorers;
}
