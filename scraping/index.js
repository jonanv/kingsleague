import { scrapedAndSave, SCRIPTING } from "./utils.js";

for (const infoToScrap of Object.keys(SCRIPTING)) {
  await scrapedAndSave(infoToScrap);
  console.log();
}