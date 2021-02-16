import dotenv from 'dotenv'
import path from 'path'
import server from './app'

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const port = process.env.PORT || 3333
server.listen(port, () => {
  console.log(`Server open in port ${port}`)
})
