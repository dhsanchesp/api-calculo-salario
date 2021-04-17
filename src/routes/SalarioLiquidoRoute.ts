import express, { Router } from "express";
import { SalarioLiquidoRequestModel as SalarioLiquidoRequestModel } from "../model/SalarioRequestRequestModel";
import { SalarioLiquidoResponseModel } from "../model/SalarioLiquidoResponseModel";
import SalarioLiquidoService from "../service/SalarioLiquidoService";

export default class SalarioLiquidoRoute {
    router: Router;
    salarioLiquidoService: SalarioLiquidoService;

    constructor() {
        this.router = express.Router();
        this.router.use(express.json());
        this.router.post(`/salario-liquido`, this.calculaSalarioLiquido.bind(this));
        this.salarioLiquidoService = new SalarioLiquidoService();
    }

    async calculaSalarioLiquido(req, res) {

        const salarioBruto: SalarioLiquidoRequestModel = req.body;

        const salarioLiquido: SalarioLiquidoResponseModel = this.salarioLiquidoService.calcular(salarioBruto);

        return res.send(salarioLiquido);
    }

    getRouter(): Router {
        return this.router;
    }
}