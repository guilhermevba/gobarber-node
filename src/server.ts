import express from 'express'
import routes from './routes'
import path from 'path'
import uploadConfig from './config/upload'
import './database'

const app = express();
app.use(express.json())

app.use('/images',express.static(uploadConfig.directory))
app.get('/', (req, res) => {
  console.log('im alive')
  res.send('im alive')
})
app.use('/', routes)

app.listen(3030, () => console.log('running'));
