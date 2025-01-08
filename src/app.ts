import { envs } from "./presentation/config/envs.plugin";
import { ServerApp } from "./presentation/serverApp";


(() => {
    main();
})();


function main() {

    new ServerApp({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
    })
    .start();

}