import * as cheerio from 'cheerio';

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
        leaderboard.push(Object.fromEntries(leardBoardEntries));
    });
    return leaderboard;
}

const leaderboard = await getLeaderBoard();
console.log(leaderboard);