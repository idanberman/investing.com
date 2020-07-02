const axios = require('axios')

class HttpClient {
  constructor() {
    this.apiUrl = 'http://localhost:3001/api/'
  }

  async performRequest(path, method) {
    return new Promise((resolve, reject) => {
      axios({
        method,
        url: this.apiUrl + path,
      })
        .then((response) => {
          if (response.data) {
            return resolve(response.data)
          }
          return resolve()
        })
        .catch((err) => reject())
    })
  }

  async getSelectedInstruments() {
    return await this.performRequest('selected-instrument', 'get')
  }

  async setSelectedInstrument(instrumentId, newState) {
    return await this.performRequest(
      'selected-instrument/' + instrumentId,
      newState ? 'put' : 'delete'
    )
  }
}

export default new HttpClient()
