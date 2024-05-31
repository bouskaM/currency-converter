import { CurrencyRate } from "../types";
/**
 * Parses the rates data and returns an array of CurrencyRate objects and the date.
 * @param data - The rates data to parse.
 * @returns An array containing the parsed CurrencyRate objects and the date.
 * @example
 * ```typescript
 * const data = `Rates for 2024-29-05
 * Country|Currency|Amount|Code|Rate
 * USA|dollar|1|USD|22.775
 * EMU|euro|1|EUR|24.725`;
 * const [rates, date] = parseRates(data);
 * 
 * console.log(rates); // [{ country: 'USA', currency: 'dollar', amount: 1, code: 'USD', rate: 22.775, date: Date },
 * { country: 'EMU', currency: 'euro', amount: 1, code: 'EUR', rate: 24.725, date: Date }]
 * console.log(date); // Date object representing 'Wed May 29 2024 00:00:00 GMT+0200 (Central European Summer Time)'
 * ```
 */
export function parseRates(data: string): [CurrencyRate[], Date] {
    const lines = data.split("\n")
    const [date, ...rateLines] = lines;
    const [day, month, year] = date?.split(" ");
    const rates = rateLines.slice(1, rateLines.length - 1).map((line) => {
        const [country, currency, amount, code, rate] = line.split("|");
        return {
            country,
            currency,
            amount: Number(amount),
            code,
            rate: Number(rate),
        };
    });
    return [rates, new Date(`${year} ${month} ${day}`)];
}
