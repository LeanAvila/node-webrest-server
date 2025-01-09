import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
    routes: Router;
}

export class ServerApp {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

    constructor( options: Options){
        const { port, routes, public_path = 'public' } = options;

        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    start() {

        console.log('Server is started');

        //* Middlewares
        this.app.use( express.json() ); // raw in json
        this.app.use( express.urlencoded({ extended: true }) ); // x-www-form-urlencoded

        //* Public Folder
        this.app.use( express.static( this.public_path ) );

        //* Routes - Así específicamos que vamos a usar las rutas que definamos en otro archivo (delegamos responsabilidad)
        this.app.use( this.routes );

        

        //CUALQUIER OTRA RUTA ENTRA POR ACÁ (AYUDA A LAS SPA)
        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname , `../../${ this.public_path }/index.html`);
            res.sendFile(indexPath);
        });
        

        //EMPEZAMOS A ESCUCHAR SOLICITUDES
        this.app.listen(this.port, () => {
            console.log(`Server is listen in port ${ this.port }`);
        });
    }
}