const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios')
// const app = require('express')

const app = express();

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const exchangeRateApiKey = 'd2594171f5fb6ccba6116a4d';

app.get('/convert', async(req, res) => {
  console.log('REQ')
  console.log(req)
  const {baseCurrency, quoteCurrency, baseAmount} = req.query;
  axios.get(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/pair/${baseCurrency}/${quoteCurrency}/${baseAmount}`).then(response => {
    console.log('Convert Response')
    console.log(typeof response.data)
    console.log(response.data)

    const final = {
      exchangeRate: response.data.conversion_rate,
      quoteAmount: response.data.conversion_result
    }
    res.json(final)
  })
})

app.listen(process.env.PORT || 8081)