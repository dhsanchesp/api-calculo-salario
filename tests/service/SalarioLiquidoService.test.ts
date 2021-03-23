import { SalarioBrutoRequestModel } from "../../src/model/SalarioBrutoRequestModel";
import SalarioLiquidoService from "../../src/service/SalarioLiquidoService";

describe('SalarioLiquidoService - calcular Salário Líquido', () => {
    const salarioLiquidoService = new SalarioLiquidoService();

    it('Deve calcular o Salário líquido com sucesso', () => {
        const result = salarioLiquidoService.calcular(defaultRequest);

        const expectedResult = {
            inss: 551.33, 
            irrf: 364.89, 
            outrosDescontos: 120.1, 
            salarioBruto: 5000.29,
            salarioLiquido: 3963.97
        }

        expect(result).toEqual(expectedResult);
    });
});

const defaultRequest = {
    salarioBruto: 5000.29,
    outrosDescontos: 120.10,
    pensaoAlimenticia: 0.00,
    numeroDependentes: 0,
} as SalarioBrutoRequestModel;