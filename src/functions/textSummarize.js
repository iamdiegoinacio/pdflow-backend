const axios = require('axios').default
const { smmry_api_key } = require('../keys/keys.json')

function textSummarize(wikipediaURL, lenght = 7) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.get(`https://api.smmry.com/?SM_API_KEY=${smmry_api_key}&SM_LENGTH=${lenght}&SM_WITH_BREAK&SM_URL=${wikipediaURL}`)
      resolve(response.data)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = textSummarize