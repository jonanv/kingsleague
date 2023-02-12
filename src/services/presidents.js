const apiUrl = 'https://kingsleague.jonanv.workers.dev';

export const getPresidentById = async ({ id }) => {
	try {
		const response = await fetch(`${ apiUrl }/presidents/${ id }`);
		const president = await response.json();
		return president;
	} catch (error) {
		// Enviar error a servicio de reporte de errores
		return [];
	}
}
