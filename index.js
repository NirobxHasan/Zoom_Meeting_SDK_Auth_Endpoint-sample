require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const cors = require('cors')
const KJUR = require('jsrsasign')

const app = express()
const port = process.env.PORT || 4000

app.use(bodyParser.json(), cors())
app.options('*', cors())

app.post('/', (req, res) => {
  console.log(req.body)

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: 'xjN8eqKS1Xfgxm7kcM4w',
    sdkSecret:'z5F3zcAtjFc7yUaqUi4qim3UarXamoLt',
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: 'xjN8eqKS1Xfgxm7kcM4w',
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, 'xjN8eqKS1Xfgxm7kcM4w')

  res.json({
    signature: signature
  })
})

app.listen(port, () => console.log(`Zoom Meeting SDK Auth Endpoint Sample Node.js listening on port ${port}!`))
