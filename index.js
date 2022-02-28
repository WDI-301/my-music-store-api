const http = require("http");

const server = http.createServer(function(req, res) {

  console.log('request body: ', req.body);

  console.log('req: ', req.url);

  if(req.url === '/route1'){
    console.log('route one was hit');
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>route 1 was hit</h1>');
    return
  }
  
  if(req.url === '/route2'){
    console.log('route 2 was hit');
    res.end('route 2 was hit');
    return;
  }

  console.log('server was hit!')

  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, {'Content-Type': 'text/plain'});

  // Send the response body "Hello World"
  res.end('Hello World\n');
});

server.listen(5100, () => { console.log('running on port 5000')})