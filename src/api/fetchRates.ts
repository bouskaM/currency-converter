const url = "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt"
const proxy = "https://cors-anywhere.herokuapp.com/"

/**
 * Fetches the rates data from the CNB API.
 * @returns The rates data.
 * To avoid CORS issues in local development, the request is sent through a proxy server.
 */
export const fetchRates = async () => {
    const requestUrl = process.env.NODE_ENV === "development" ? `${proxy}${url}` : url;
    const response = await fetch(requestUrl);
    const text = await response.text();
    return text;
}