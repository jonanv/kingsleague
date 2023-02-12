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
		const response = await fetch(`${ apiURL }/${ teamId }/player_twelve`);
		const playersTwelve = await response.json();
		return playersTwelve;
	} catch (error) {
		// Enviar error a servicio de reporte de errores
		return [];
	}
}
