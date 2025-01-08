import fs from 'fs';
import http2 from 'http2';

const server = http2.createSecureServer({
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
},
(req, res) => {

    // res.writeHead(200, { 'Content-Type' : 'text/html'});
    // res.write('<h1> Hola mundo </h1>');
    // res.end();

    // const data = { name: 'Leandro Avila', age: 24, city: 'Buenos Aires'};
    // res.writeHead(200, { 'content-type' : 'application/json'} );
    // res.end( JSON.stringify(data) ); // es lo mismo que utilizar previamente res.write( JSON.stringify(data) )

    switch(req.url){
        case '/':
            const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
            res.writeHead(200, { 'Content-Type' : 'text/html'});
            res.end( htmlFile );
        break;

        case '/css/style.css':
            const cssFile = fs.readFileSync('./public/css/style.css', 'utf-8');
            res.writeHead(200, { 'Content-Type' : 'text/css'});
            res.end( cssFile );
        break;

        case '/js/app.js':
            const jsFile = fs.readFileSync('./public/js/app.js', 'utf-8');
            res.writeHead(200, { 'Content-Type' : 'application/javascript'});
            res.end( jsFile );
        break;

        default:
            res.writeHead(404, { 'content-type' : 'text/html'});
            res.end();
    }
});

server.listen(8080, ()=> {
    console.log('server running on port 8080');
});