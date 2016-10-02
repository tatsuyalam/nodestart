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

  let overrideUrl = req.headers['x-destination-url'] || desUrl

  // Proxy server
  let options = {
    headers: req.headers,
    url: `${overrideUrl}${req.url}`
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
