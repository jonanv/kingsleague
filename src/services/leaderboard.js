const api_url = 'https://kingsleague.jonanv.workers.dev';

export const getLeaderboardBy = async ({ teamId }) => {
	try {
		const response = await fetch(`${ api_url }/leaderboard/${ teamId }`)
		const teamStats = await response.json()
		return teamStats
	} catch (error) {
		// enviar el error a un servicio de reporte de errores
		return null
	}
}
