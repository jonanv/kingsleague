import { apiURL } from "./config"

export const getLeaderboardBy = async ({ teamId }) => {
	try {
		const response = await fetch(`${ apiURL }/leaderboard/${ teamId }`)
		const teamStats = await response.json()
		return teamStats
	} catch (error) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
