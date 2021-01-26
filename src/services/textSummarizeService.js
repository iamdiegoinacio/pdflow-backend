import * as ax from 'axios'
import { smmry_api_key } from '../keys/keys.json'

const axios = ax.default

export default (URL, lenght = 7) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://api.smmry.com/?SM_API_KEY=${smmry_api_key}&SM_LENGTH=${lenght}&SM_WITH_BREAK&SM_URL=${URL}`)

      if (data.sm_api_error) {
        if (data.sm_api_message === 'THE PAGE IS IN AN UNRECOGNISABLE FORMAT') {
          reject({ status: 400, message: 'Invalid page to create a summary' })
        } else {
          reject({ status: 500, message: 'Error generating summary' })
        }
      } else {
        resolve(data)
      }

    } catch (error) {
      reject({ status: 500, message: 'Error generating summary' })
    }
  })
}
