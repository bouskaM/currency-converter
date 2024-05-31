/** 
 * This code uses a proxy server to avoid CORS issues.
 * The proxy server is hosted on Vercel at https://currency-proxy-server.vercel.app.
 * When running locally, the server fetches data from localhost:3001.
 * To run the server locally, follow the instructions at https://github.com/bouskaM/currency-proxy-server.
 */
const url = "https://currency-proxy-server.vercel.app/api/daily-rates"
const localUrl = "http://localhost:3001/api/daily-rates"

export const fetchRates = async () => {
    const requestUrl = process.env.NODE_ENV === 'development' ? localUrl : url;
    const response = await fetch(requestUrl)
    const text = await response.text();
    return text;
}