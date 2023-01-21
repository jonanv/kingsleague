import { writeDBFile, TEAMS } from '../db/index.js'

const INFO_COACHES_SELECTORS = {
  teamName: { selector: '.name.mt10', typeOf: 'string' },
  coach: { selector: '.name.mt20', typeOf: 'string' },
  coachImg: { selector: '.player-circle-box', typeOf: 'string' }
}

export async function getCoaches() {
  const $ = await scrape(URLS.coachs)
  const coachsTeam = $(INFO_COACHES_SELECTORS.coach.selector)
    .toArray()
    .map((coachName) => coachName.children[0].data)
  const coachsImgTeam = $(INFO_COACHES_SELECTORS.coachImg.selector)
    .toArray()
    .map((coachImg) => {
      const { attribs } = coachImg
      const { src } = attribs
      return src
    })
  const teamsName = $(INFO_COACHES_SELECTORS.teamName.selector)
    .toArray()
    .map((teamName) => teamName.children[0].data)
  const teamsWithCoach = coachsTeam.map((coach, i) => {
    return {
      name: coach,
      teamName: replaceFCOfTeamName(teamsName[i]),
      image: coachsImgTeam[i]
    }
  })
  return teamsWithCoach
}

async function getCoachesOfTeams() {
  const teamsWithCoach = await getCoaches()
  return TEAMS.map((team) => {
    const coachInfoTeam = teamsWithCoach.filter((teamWithCoach, i) => {
      const teamWithCoachFormatted = replaceFCOfTeamName(
        teamWithCoach.teamName.toLocaleUpperCase()
      )
      const teamFoundedFormatted = replaceFCOfTeamName(
        team.name.toLocaleUpperCase()
      )
      return teamWithCoachFormatted === teamFoundedFormatted
    })[0]

    return {
      ...team,
      coachInfo: {
        name: coachInfoTeam.coach,
        image: coachInfoTeam.coachImg
      }
    }
  })
}
const coachsInfo = await getCoaches()
const teamsInfoWithCoach = await getCoachesOfTeams()

writeDBFile('coachs', coachsInfo)
writeDBFile('teams', teamsInfoWithCoach)