let http = require('http')

http.createServer((req, res) => {

  console.log(`Request received at: ${req.url}`)

  // Basic server
  // res.end('Hello world from NodeStart!\n')

  // Echo server
  for (let header in req.headers) {
    res.setHeader(header, req.headers[header])
  }
  req.pipe(res)

}).listen(8080)

// A - BASIC SERVER
// 1. Start server with command : `$ node index.js`
// 2. Test your server with curl : `$ curl http://127.0.0.1:8080/sub-uri`

// B - ECHO SERVER
// 1. Update with .pipe from Request
// 2. Test command:     `$ curl http://127.0.0.1:8080/sub-uri -d "hello there"`
//                      `$ curl -v -X POST http://127.0.0.1:8080/new -d "hello me" -H "x-qwerty: yeap"`
