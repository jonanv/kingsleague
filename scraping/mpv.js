import { writeDBFile, TEAMS } from '../db/index.js';
import { logError, logInfo, logSuccess } from './log.js';
import { URLS, cleanText, scrape } from './utils.js';

async function getMvp() {
  const $ = await scrape(URLS.mvp);
  const $rows = $('table tbody tr');

  const MVP_SELECTORS = {
    team: { selector: '.fs-table-text_3', typeOf: 'string' },
    playerName: { selector: '.fs-table-text_4', typeOf: 'string' },
    gamesPlayed: { selector: '.fs-table-text_5', typeOf: 'number' },
    mvps: { selector: '.fs-table-text_6', typeOf: 'number' },
  };

  const getImageFromTeam = ({ name }) => {
    const { image } = TEAMS.find((team) => team.name === name);
    return image;
  };

  const mvpSelectorEntries = Object.entries(MVP_SELECTORS);
  const mvp = [];
  $rows.each((index, el) => {
    const mvpEntries = mvpSelectorEntries.map(([key, { selector, typeOf }]) => {
      const rawValue = $(el).find(selector).text();
      const cleanedValue = cleanText(rawValue);
      const value = (typeOf === 'number')
        ? Number(cleanedValue)
        : cleanedValue;
      return [key, value];
    });
    const { team: teamName, ...mvpData } = Object.fromEntries(mvpEntries);
    const image = getImageFromTeam({ name: teamName });

    mvp.push({
      rank: index + 1,
      ...mvpData,
      team: teamName,
      image
    });
  });
  return mvp;
}

try {
  logInfo('Scraping MVP list...');
  const mvp = await getMvp();
  logSuccess('MVP list scraped successfully...');

  logInfo('Writing MVP list to database...');
  await writeDBFile('mvp', mvp);
  logSuccess('MVP list written successfully...');
} catch (error) {
  logError('Error scraping MVP list');
  logError(error);
}