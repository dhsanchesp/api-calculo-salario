import InssService from "../../src/service/InssService";

describe('InssService - calcular INSS', () => {
    const inssService = new InssService();

    it('Deve calcular o INSS com sucesso', async () => {
        const result = await inssService.calcular(5000.00);
    
        expect(result).toEqual(551.29);
    });
});