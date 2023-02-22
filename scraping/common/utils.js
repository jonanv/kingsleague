import * as cheerio from 'cheerio';

import { writeDBFile } from '../../db/index.js';
import { logError, logInfo, logSuccess } from './log.js';

import { getLeaderBoard } from '../leaderboard.js';
import { getMvp } from '../mpv.js';
import { getTopScorers } from '../top_scorers.js';
import { getTopAssists } from '../top_assists.js';
import { getTopStatistics } from '../top_statistics.js';
import { getCoaches } from '../coaches.js';
import { getSchedule } from '../schedule.js'
import { getPlayersTwelve } from '../players_twelve.js'

export const SCRAPINGS = {
  leaderboard: {
    url: 'https://kingsleague.pro/estadisticas/clasificacion/',
    scraper: getLeaderBoard
  },
  mvp: {
    url: 'https://kingsleague.pro/estadisticas/mvp/',
    scraper: getMvp
  },
  top_scorers: {
    url: 'https://kingsleague.pro/estadisticas/goles/',
    scraper: getTopScorers
  },
  top_assists: {
    url: 'https://kingsleague.pro/estadisticas/asistencias/',
    scraper: getTopAssists
  },
  top_statistics: {
    scraper: getTopAssists
  },
  coaches: {
    url: 'https://kingsleague.pro/estadisticas/coaches/',
    scraper: getCoaches
  },
  schedule: {
    url: 'https://kingsleague.pro/partidos/',
    scraper: getSchedule
  },
  players_twelve: {
    url: 'https://kingsleague.pro/jugador-12/',
    scraper: getPlayersTwelve
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
}

export async function scrapedAndSave(name) {
  const start = performance.now();
  try {
    const { scraper, url } = SCRAPINGS[name];

    logInfo(`Scraping [${name}] list...`);
    const $ = url ? await scrape(url) : null;
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
    logInfo(`[${name}] scraped in ${time} seconds`);
  }
}
