import express, { Router } from "express";
import { SalarioBrutoRequestModel } from "../model/SalarioBrutoRequestModel";
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

        const salarioBruto: SalarioBrutoRequestModel = req.body;
        
        const salarioLiquido: SalarioLiquidoResponseModel = await this.salarioLiquidoService.calcular(salarioBruto);

        return res.send(salarioLiquido);
    }

    getRouter(): Router {
        return this.router;
    }
}