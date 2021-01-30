import express from 'express'

import discoveryRouter from './routers/discovery'

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello again!')
})

app.use('/discovery', discoveryRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})