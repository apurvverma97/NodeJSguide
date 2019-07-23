const http = require('http');
const fs = require('fs');
const url = require('url');
const queryString = require('querystring');
const hostname = '127.0.0.1';
const port = 8000;

function compute(req,res){
      const contentLength = parseInt(req.headers['content-length']);
      let requestBody = '';
      req.on('data',function(chunk){
        requestBody = requestBody + chunk.toString();

        if(requestBody.length >= contentLength){
          const bodyObj = queryString.parse(requestBody);
          const result = parseInt(bodyObj.number1) + parseInt(bodyObj.number2);
          res.end(result.toString());
        }
      });

      
      }
      
function onRequest(req,res){
  console.log('Request path: req.url');
  const urlParts = url.parse(req.url);
  if(urlParts.pathname === '/'){
      stream = fs.createReadStream(__dirname +'/index.html','utf8');
      stream.pipe(res);
  }
  else if(urlParts.pathname === '/add'){
      stream = fs.createReadStream(__dirname +'/add.html','utf8');
      stream.pipe(res);
  }
  else if(urlParts.pathname === '/add/compute'){
    compute(req,res);
  }
  else{
      stream = fs.createReadStream(__dirname +'/404.html','utf8');
      stream.pipe(res);
  }
  // const htmlString = readFileSync(__dirname +'/index.html','utf8');
    // fs.readFile(__dirname +'/index.html','utf8',
    //   function(err,htmlString){
    //     console.log('readfile callback failed');
    //     if(err){
    //       res.end('An error occured');
    //     }
    //     else{
    //       res.end(htmlString);
    //     }
      
    // });
    
}
const server = http.createServer(onRequest); 

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});