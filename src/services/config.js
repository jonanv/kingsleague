export const isDevelopment = import.meta.env.MODE !== 'production';
// console.log('🚀isDevelopment:', isDevelopment);
export const apiURL = isDevelopment 
	? 'http://127.0.0.1:8787' 
	: 'https://kingsleague.jonanv.workers.dev';
