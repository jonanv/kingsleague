import { TEAMS } from '../db/index.js';
import { cleanText } from './common/utils.js';

const TOP_ASSISTS_SELECTORS = {
  team: { selector: '.fs-table-text_3', typeOf: 'string' },
  playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
  gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
  assists: { selector: '.fs-table-text_6', typeOf: 'number' }
}

export async function getTopAssists($) {
  const $rows = $('table tbody tr');

  const getImageFromTeam = ({ name }) => {
    const { image } = TEAMS.find((team) => team.name === name);
    return image;
  };

  const topAssistsSelectorEntries = Object.entries(TOP_ASSISTS_SELECTORS);
  const topAssists = [];

  $rows.each((index, el) => {
    const topAssistsEntries = topAssistsSelectorEntries.map(([key, { selector, typeOf }]) => {
      const rawValue = $(el).find(selector).text();
      const cleanedValue = cleanText(rawValue);

      const value = (typeOf === 'number')
        ? Number(cleanedValue)
        : cleanedValue;

      return [key, value];
    });

    const { team: teamName, ...topAssistsData } = Object.fromEntries(topAssistsEntries);
    const image = getImageFromTeam({ name: teamName });

    topAssists.push({
      rank: index + 1,
      ...topAssistsData,
      team: teamName,
      image
    });
  });

  return topAssists;
}
