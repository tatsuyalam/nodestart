# nodestart
A test project with nodejs - build up proxy server

### A - BASIC SERVER
1. Start server with command : `$ node index.js`
2. Test your server with curl : `$ curl http://127.0.0.1:8080/sub-uri`

### B - ECHO SERVER
1. Update with .pipe from Request
2. Test command:     `$ curl http://127.0.0.1:8080/sub-uri -d "hello there"`
                     `$ curl -v -X POST http://127.0.0.1:8080/new -d "hello me" -H "x-qwerty: yeap"`

### C - PROXY SERVER
1. Add request package : `$ npm install --save request`
2. Update proxy code
3. Test command:     `$ curl -v http://127.0.0.1:8001/org-uri -d "hello proxy"`

### D - Configuration with a CLI
1. Start test server:  `$ node index.js --port=8003`
2. Proxy command:      `$ curl -v http://127.0.0.1:8001/org-uri -d "request with a CLI"`

### Test result
![nodestart walkthrough](http://i.imgur.com/A1P175b.gif)
