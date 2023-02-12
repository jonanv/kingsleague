import { apiURL } from "./config";

export const getPresidentById = async ({ id }) => {
	try {
		const response = await fetch(`${ apiURL }/presidents/${ id }`);
		const president = await response.json();
		return president;
	} catch (error) {
		// Enviar error a servicio de reporte de errores
		return [];
	}
}
