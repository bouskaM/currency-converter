/** 
 * PROXY server https://github.com/bouskaM/currency-proxy-server is used to avoid CORS issues.
 * The server is deployed on Vercel - > https://currency-proxy-server.vercel.app
 */
const url = "https://currency-proxy-server.vercel.app/api/daily-rates"
export const fetchRates = async () => {
    const requestUrl = url;
    const response = await fetch(requestUrl)
    const text = await response.text();
    return text;
}