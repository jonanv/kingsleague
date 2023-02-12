import { apiURL } from "./config";

export const getAllTeams = async () => {
	try {
		const response = await fetch(`${ apiURL }/teams`);
		const teams = await response.json();
		return teams;
	} catch (error) {
		// Enviar error a servicio de reporte de errores
		return [];
	}
}

export const getPlayerTwelveByTeamId = async ({ teamId }) => {
	try {
		const response = await fetch(`${ apiURL }/teams/${ teamId }/player_twelve`);
		const playerTwelve = await response.json();
		return playerTwelve;
	} catch (error) {
		// Enviar error a servicio de reporte de errores
		return [];
	}
}
