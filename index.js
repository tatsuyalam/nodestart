let http = require('http')
let request = require('request')
// Set a the default value for --host to 127.0.0.1
let url = require('url')
let argv = require('yargs').default('host', '127.0.0.1').argv
// Get the --port value
let port = argv.port || (argv.host === '127.0.0.1' ? 8080 : 80)
let desUrl = argv.url || url.format({
   protocol: 'http',
   hostname: argv.host,
   port
})

http.createServer((req, res) => {

  console.log(`\n\nEcho server received at: ${req.url}`)

  // Basic server
  // res.end('Hello world from NodeStart!\n')

  // Echo server
  for (let header in req.headers) {
    res.setHeader(header, req.headers[header])
  }
  req.pipe(res)

  // Basic logging
  process.stdout.write(JSON.stringify(req.headers) + '\n')
  req.pipe(process.stdout)

}).listen(port)
console.log(`Echo server: Listening on port ${port}...`)

http.createServer((req, res) => {

  console.log(`\n\nProxying request to: ${desUrl + req.url}`)

  // Proxy server
  let options = {
    headers: req.headers,
    url: `${desUrl}${req.url}`
  }
  options.method = req.method // use the same HTTP verb (for non-GET requests)
  let outRes = request(options)
  req.pipe(outRes) // streams are chainable

  // Logging
  process.stdout.write(JSON.stringify(outRes.headers) + '\n')
  outRes.pipe(process.stdout)
  outRes.pipe(res)

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

// D - Configuration with a CLI
// 1. Start test server:  `$ node index.js --port=8003`
// 2. Proxy command:      `$ curl -v http://127.0.0.1:8001/org-uri -d "request with a CLI"`
