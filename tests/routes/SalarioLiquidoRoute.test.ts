import SalarioLiquidoRoute from "../../src/routes/SalarioLiquidoRoute";
import SalarioLiquidoService from "../../src/service/SalarioLiquidoService";
import { env } from "../../src/env";
import HttpResponseMock from "./mock/HttpResponseMock";

jest.mock('../../src/service/SalarioLiquidoService')

const mockedEnv = env as jest.Mocked<typeof env>;

describe('SalarioLiquidoRoute', () => {

  it('Deve ser possivel calcular o salário Líquido com sucesso.', async () => {
    const httpResponseMock = new HttpResponseMock();

    SalarioLiquidoService.prototype.calcular = jest.fn().mockImplementationOnce(() => {return axiostReponseMock});

    const salarioLiquidoRoute = new SalarioLiquidoRoute();
    await salarioLiquidoRoute.calculaSalarioLiquido(mockedHttpRequest, httpResponseMock);

    expect(httpResponseMock.data).toEqual(axiostReponseMock);    
  }); 

});

const valueMock = {
  salarioBruto: 5000.00,
  outrosDescontos: 120.00,
  inss: 123.00,
  irrf: 1200.00,
};

const axiostReponseMock = {
  data: valueMock
};

const mockedHttpRequest = {
  status: 200,
  body: {
    salarioBruto: 5000.00,
    outrosDescontos: 120.00,
    numeroDependentes: 1,
  }
};
