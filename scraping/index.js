import { writeDBFile } from '../db/index.js';
import { getShortNameTeams } from './short_name_teams.js';
import { getURLTeams } from './url_teams.js';
import { scrapedAndSave, SCRIPTING } from "./common/utils.js";

for (const infoToScrap of Object.keys(SCRIPTING)) {
	await scrapedAndSave(infoToScrap);
}

const teamsWithUrl = await getURLTeams();
await writeDBFile('teams', teamsWithUrl);

// Update file of teams.json with short name of each team
await writeDBFile('teams', getShortNameTeams());
