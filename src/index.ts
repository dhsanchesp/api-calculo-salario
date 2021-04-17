import * as healthMid from "@cloudnative/health-connect";
import express from "express";
import { healthCheck } from './routes/HealthCheckRoute';
import SalarioLiquidoRoute from './routes/SalarioLiquidoRoute';

class App {
    public app: express.Application;
    private salarioLiquidoRoute : SalarioLiquidoRoute;

    constructor() {
        this.app = express();
        this.salarioLiquidoRoute = new SalarioLiquidoRoute();
        this.config();
    }

    private config(): void {
        this.app.use((_, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            res.header("Access-Control-Allow-Credentials", "true");
            res.header("Access-Control-Allow-Methods", "GET, OPTIONS, HEAD, POST");
            res.header("Access-Control-Max-Age", "1209600");
            res.header("Access-Control-Expose-Headers", "Authorization");
            next();
        });

        this.app.set("case sensitive routing", true);
        this.app.use("/health", healthMid.HealthEndpoint(healthCheck));
        this.app.use(this.salarioLiquidoRoute.getRouter());
        this.app.use(express.json());

        const port = 3000;
        this.app.set("port", port);

        this.app.listen(port, () => {
            console.info(`Aplicação executando na porta ${port}`);
        }).on("error", (error: ServerException) => {
            console.error(error.message);
        });
    }
}

export interface ServerException extends Error {
    errno?: string;
    code?: string;
    port?: number;
}

export default new App().app;