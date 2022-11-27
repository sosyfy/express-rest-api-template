import http from 'node:http'

import app from '#lib/server'
import config from '#config'
import dotenv from 'dotenv'
import * as database from '#lib/database'
import * as email from '#lib/email'

dotenv.config()

const { port } = config
const server = http.createServer(app)

async function main() {
    try {
      await startServer()
    } catch (err) {
      console.log(err);
      process.exit(1)
    }
  }
  
async function startServer() {
    database.connect(config.mongo.uri)
    server.listen(port, onListening )
  }
  
function onListening() {
    console.log({ msg: `listening on http://localhost:${port}` })
  }

await main()
