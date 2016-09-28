let http = require('http')

http.createServer((req, res) => {
  console.log(`Request received at: ${req.url}`)
  res.end('Hello world from NodeStart!\n')
}).listen(8080)

// A - BASIC SERVER
// 1. Start server with command : `$ node index.js`
// 2. Test your server with curl : `$ curl http://127.0.0.1:8080/sub-uri`
