const express = require('express')
const path = require('path')

const PORT= 4200

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'dist/ISalePro-angular-test')))

app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, 'dist/ISalePro-angular-test', 'index.html'))
})

app.listen(PORT)
