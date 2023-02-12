const apiUrl = 'https://kingsleague.jonanv.workers.dev';

export const getAllTeams = async () => {
	try {
		const response = await fetch(`${ apiUrl }/teams`);
		const teams = await response.json();
		return teams;
	} catch (error) {
		// Enviar error a servicio de reporte de errores
		return [];
	}
}
