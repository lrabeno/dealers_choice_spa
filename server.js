const express = require('express');
const path = require('path')
const { syncAndSeed, db} = require('./db')
const app = express();

app.use('/dist', express.static(path.join(__dirname, 'dist')))

app.use('/assets', express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.use('/api', require('./router'))

app.use((err, req, res, next) => {
  console.error(err)
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error.')
})


const init = async () => {
  try {
    await syncAndSeed()
    await db.authenticate()
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`))
  }
  catch(error) {
      console.log(error)
  }
}

init();