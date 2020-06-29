import express from 'express'
import routes from './routes'
import './database'

const app = express();
app.use(express.json())
app.get('/', (req, res) => {
  console.log('im alive')
  res.send('im alive')
})
app.use('/', routes)

app.listen(3030, () => console.log('running'));
