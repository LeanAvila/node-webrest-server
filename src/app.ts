import { envs } from "./config/envs.plugin";
import { AppRoutes } from "./presentation/routes";
import { ServerApp } from "./presentation/serverApp";


(() => {
    main();
})();


function main() {

    new ServerApp({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: AppRoutes.routes,
    })
    .start();

}