import { writeDBFile } from '../db/index.js';
import { getShortNameTeams } from './short_name_teams.js';
// import { getTeams } from './teams.js';
import { getURLTeams } from './url_teams.js';
import { scrapedAndSave, SCRIPTING } from "./common/utils.js";

// get first parameter from line
const [, , scrapeParameter] = process.argv;
console.log('🚀', scrapeParameter);

if (scrapeParameter) {
	// Scrape specific data
	await scrapedAndSave(scrapeParameter);
} else {
	// Scraping all data
	for (const infoToScrape of Object.keys(SCRIPTING)) {
		await scrapedAndSave(infoToScrape);
	}

	// const teamsWithUrl = await getTeams();
	const teamsWithUrl = await getURLTeams();
	await writeDBFile('teams', teamsWithUrl);
	
	// Update file of teams.json with short name of each team
	await writeDBFile('teams', getShortNameTeams());
}
