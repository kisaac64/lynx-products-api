import { UsdCadCurrencyResponse } from './currency.model'
import axios from 'axios'

/**
 * Fetches USD and CAD conversion rate from public currency api.
 *
 * @returns Conversion multiplier from USD -> CAD.
 */
export const usdToCadRate = async () => {
    const url =
        'https://api.apilayer.com/currency_data/live?base=USD&symbols=USD,CAD'
    const headers = { apikey: process.env["API_LAYER_API_KEY"]!, 'Accept-Encoding': '*' }

    const { data } = await axios.get<UsdCadCurrencyResponse>(url, { headers })

    return data.quotes.USDCAD
}

/**
 * Exported object containing all currency service functions.
 *
 * @property {@link usdToCadRate}
 */
export const CurrencyService = { usdToCadRate }
