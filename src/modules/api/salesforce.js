import axios from 'axios';
import { request } from 'utility/helper'

const BASE_URL = 'https://amecosolar.my.salesforce-sites.com/' + 'services/apexrest/QuoteCalculator/'

/**
 * This method will get the configuration
 */
export const getConfiguration = () => {
    return request(axios.get(BASE_URL + 'getQuoteCalculatorConfiguration'))
}

/**
 * This method will get the configuration
 */
export const getProductImage = async (id) => {
    return await request(axios.get(BASE_URL + 'getProductImage?id=' + encodeURI(id)))
}

export const saveCalulation = (data) => {
    const headers = {
        'Content-Type': 'application/json'
    }
    console.log(JSON.stringify(data));
    return request(axios.post(BASE_URL + 'saveQuoteCalculatorData', { data: JSON.stringify(data) }, headers))
}

