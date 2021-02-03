import { SalarioBrutoRequestModel } from "../model/SalarioBrutoRequestModel";
import { SalarioLiquidoResponseModel } from "../model/SalarioLiquidoResponseModel";
import InssService from "./InssService";

/**
 * Serviços da API de Salário Líquido
 */
export default class SalarioLiquidoService {
    private inssService: InssService;

    constructor() {
        this.inssService = new InssService();
    }
    
    async calcular(request: SalarioBrutoRequestModel) {

        console.log(`JSON: ${JSON.stringify(request)}`);

        console.log(`Efetuando cálculo para R$ ${request.salarioBruto}`);
        
        const vlrINSScalculado = await this.inssService.calcular(request.salarioBruto);
        console.log(vlrINSScalculado);

        return {
            salarioBruto: request.salarioBruto,
            outrosDescontos: request.outrosDescontos,
            inss: vlrINSScalculado,
            irrf: 1200,

        } as SalarioLiquidoResponseModel;
    }
}

