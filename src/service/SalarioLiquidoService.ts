import { SalarioBrutoRequestModel } from "../model/SalarioBrutoRequestModel";
import { SalarioLiquidoResponseModel } from "../model/SalarioLiquidoResponseModel";
import InssService from "./InssService";
import ImpostoRendaService from "./ImpostoRendaService";

/**
 * Serviços da API de Salário Líquido
 */
export default class SalarioLiquidoService {
    private inssService: InssService;
    private impostoRendaService: ImpostoRendaService;

    constructor() {
        this.inssService = new InssService();
        this.impostoRendaService = new ImpostoRendaService();
    }
    
    public calcular(request: SalarioBrutoRequestModel) {

        console.log(`JSON: ${JSON.stringify(request)}`);

        console.log(`Efetuando cálculo para R$ ${request.salarioBruto}`);
        
        const vlrINSScalculado = this.inssService.calcular(request.salarioBruto);
        console.log(vlrINSScalculado);

        const vlrIRCalculado = this.impostoRendaService.calcular(request.salarioBruto, vlrINSScalculado, request.pensaoAlimenticia, request.numeroDependentes);

        let salarioLiquido = (request.salarioBruto - vlrINSScalculado - vlrIRCalculado - request.outrosDescontos - request.pensaoAlimenticia);
        salarioLiquido = Math.round((salarioLiquido + Number.EPSILON) * 100) / 100;

        return {
            salarioBruto: request.salarioBruto,
            outrosDescontos: request.outrosDescontos,
            inss: vlrINSScalculado,
            irrf: vlrIRCalculado,
            salarioLiquido: salarioLiquido
        } as SalarioLiquidoResponseModel;
    }

}
