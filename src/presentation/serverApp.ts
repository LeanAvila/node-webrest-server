import express from 'express';
import path from 'path';

interface Options {
    port: number;
    public_path?: string;
}

export class ServerApp {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;

    constructor( options: Options){
        const { port, public_path = 'public' } = options;

        this.port = port;
        this.public_path = public_path;
    }

    start() {

        console.log('Server is started');

        //RUTA POR DEFECTO
        this.app.use( express.static( this.public_path ) );

        //CUALQUIER OTRA RUTA ENTRA POR ACÁ
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