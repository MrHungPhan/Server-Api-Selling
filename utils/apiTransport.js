var axios = require('axios');

module.exports = function callApi(endpoint, method ='GET', body){
      return axios({ // tra ve promise
        method : method,
        url : `${process.env.URL_TRANSPORT}/${endpoint}`,
        data : body
    }).catch( err => {
        console.log(err)
    })
}