import * as cheerio from 'cheerio';

import { writeDBFile } from '../db/index.js';
import { logError, logInfo, logSuccess } from './log.js';

import { getLeaderBoard } from './leaderboard.js';
import { getMvp } from './mpv.js';

export const SCRIPTING = {
  leaderboard: {
    url: 'https://kingsleague.pro/estadisticas/clasificacion/',
    scraper: getLeaderBoard
  },
  mvp: {
    url: 'https://kingsleague.pro/estadisticas/mvp/',
    scraper: getMvp
  }
};

export const cleanText = (text) =>
  text.replace(/\t|\n|\s:/g, '')
    .replace(/.*:/g, ' ')
    .trim();

export async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text();
  return cheerio.load(html);
};

export async function scrapedAndSave(name) {
  const start = performance.now();
  try {
    const { scraper, url } = SCRIPTING[name];

    logInfo(`Scraping [${name}] list...`);
    const $ = await scrape(url);
    const content = await scraper($);
    logSuccess(`[${name}] list scraped successfully...`);

    logInfo(`Writing [${name}] list to database...`);
    await writeDBFile(name, content);
    logSuccess(`[${name}] list written successfully...`);
  } catch (error) {
    logError(`Error scraping [${name}] list`);
    logError(error);
  } finally {
    const end = performance.now();
    const time = (end - start) / 1000;
    console.log(`[${name}] scraped in ${time} seconds`);
  }
};