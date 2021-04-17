import { SalarioLiquidoRequestModel } from "../model/SalarioRequestRequestModel";
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

    public calcular(request: SalarioLiquidoRequestModel) {

        console.log(`JSON: ${JSON.stringify(request)}`);

        console.log(`Efetuando cálculo para R$ ${request.salarioBruto}`);

        const vlrContribuicaoINSS = this.inssService.calcular(request.salarioBruto);
        console.log(vlrContribuicaoINSS);

        const baseCalculo = obterBaseCalculo(vlrContribuicaoINSS, request);

        const vlrIRCalculado = this.impostoRendaService.calcular(baseCalculo);

        const totalOutrosDescontos = obterTotalOutrosDescontos(request);
        console.log(request)

        let salarioLiquido = (request.salarioBruto - vlrContribuicaoINSS - vlrIRCalculado - totalOutrosDescontos);
        salarioLiquido = Math.round((salarioLiquido + Number.EPSILON) * 100) / 100;

        return {
            salarioBruto: normalizarValor(request.salarioBruto),
            outrosDescontos: totalOutrosDescontos,
            inss: vlrContribuicaoINSS,
            irrf: vlrIRCalculado,
            salarioLiquido
        } as SalarioLiquidoResponseModel;
    }

}

const obterBaseCalculo = (vlrINSScalculado: number, request: SalarioLiquidoRequestModel) => {
    const resultado = request.salarioBruto - vlrINSScalculado - request.pensaoAlimenticia - (VLR_POR_DEPENDENTE * request.numeroDependentes)

    return normalizarValor(resultado);
}

const obterTotalOutrosDescontos = (request: SalarioLiquidoRequestModel) => {

    const outrosDescontos = request.outrosDescontos// ? request.outrosDescontos : 0;
    const pat = request.pat ? request.pat : 0;
    const planoSaude = request.planoSaude ? request.planoSaude : 0;

    const resultado = outrosDescontos + pat + planoSaude

    return normalizarValor(resultado);
}

const normalizarValor = (valor: number) => {
    return Math.round((valor + Number.EPSILON) * 100) / 100;
}

const VLR_POR_DEPENDENTE = 189.59;
