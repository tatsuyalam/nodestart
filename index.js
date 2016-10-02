let http = require('http')
let request = require('request')
let desUrl = '127.0.0.1:8080'

http.createServer((req, res) => {

  console.log(`Echo server received at: ${req.url}`)

  // Basic server
  // res.end('Hello world from NodeStart!\n')

  // Echo server
  for (let header in req.headers) {
    res.setHeader(header, req.headers[header])
  }
  req.pipe(res)

}).listen(8080)
console.log('Echo server: Listening on port 8080...')

http.createServer((req, res) => {

  console.log(`Proxying request to: ${desUrl + req.url}`)

  // Proxy server
  let options = {
    headers: req.headers,
    url: `http://${desUrl}${req.url}`
  }
  options.method = req.method // use the same HTTP verb (for non-GET requests)
  req.pipe(request(options)).pipe(res) // streams are chainable

}).listen(8001)
console.log('Proxy server: Listening on port 8001...')

// A - BASIC SERVER
// 1. Start server with command : `$ node index.js`
// 2. Test your server with curl : `$ curl http://127.0.0.1:8080/sub-uri`

// B - ECHO SERVER
// 1. Update with .pipe from Request
// 2. Test command:     `$ curl http://127.0.0.1:8080/sub-uri -d "hello there"`
//                      `$ curl -v -X POST http://127.0.0.1:8080/new -d "hello me" -H "x-qwerty: yeap"`

// C - PROXY SERVER
// 1. Add request package : `$ npm install --save request`
// 2. Update proxy code
// 3. Test command:     `$ curl -v http://127.0.0.1:8001/org-uri -d "hello proxy"`
