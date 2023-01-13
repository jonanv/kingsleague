import path from "node:path";

const DB_PATH = path.join(process.cwd(), './db/');
const TEAMS = await readFile(`${DB_PATH}/teams.json`, 'utf-8').then(JSON.parse);
