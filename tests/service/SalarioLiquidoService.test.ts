import { SalarioBrutoRequestModel } from "../../src/model/SalarioBrutoRequestModel";
import SalarioLiquidoService from "../../src/service/SalarioLiquidoService";

describe('SalarioLiquidoService - calcular Salário Líquido', () => {
    const salarioLiquidoService = new SalarioLiquidoService();

    it('Deve calcular o Salário líquido com sucesso', async () => {
        const result = await salarioLiquidoService.calcular(defaultRequest);

        const expectedResult = {
            inss: 551.33, 
            irrf: 1200, 
            outrosDescontos: 120.1, 
            salarioBruto: 5000.29
        }

        expect(result).toEqual(expectedResult);
    });
});

const defaultRequest = {
    salarioBruto: 5000.29,
    outrosDescontos: 120.10,
    numeroDependentes: 0,
} as SalarioBrutoRequestModel;