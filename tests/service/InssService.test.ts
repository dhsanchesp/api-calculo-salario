import InssService from "../../src/service/InssService";

describe('InssService - calcular INSS - Faixa 01', () => {
    const inssService = new InssService();

    it('Deve calcular o valor do INSS para um salário menor que R$ 1.100,00', async () => {
        const result = await inssService.calcular(982.87);
    
        expect(result).toEqual(73.72);
    });

    it('Deve calcular o valor do INSS para um salário igual a R$ 1.100,00', async () => {
        const result = await inssService.calcular(1105.01);
    
        expect(result).toEqual(82.95);
    });
});

describe('InssService - calcular INSS - Faixa 02', () => {
    const inssService = new InssService();

    it('Deve calcular o valor do INSS para um salário maior que R$ 1.100,00', async () => {
        const result = await inssService.calcular(1110.01);
    
        expect(result).toEqual(83.40);
    });

    it('Deve calcular o valor do INSS para um salário entre R$ 1.100,01 e R$ 2.203,48', async () => {
        const result = await inssService.calcular(1578.98);
    
        expect(result).toEqual(125.61);
    });

    it('Deve calcular o valor do INSS para um salário igual a R$ 2.203,48', async () => {
        const result = await inssService.calcular(2203.48);
    
        expect(result).toEqual(181.81);
    });
});

describe('InssService - calcular INSS - Faixa 03', () => {
    const inssService = new InssService();

    it('Deve calcular o valor do INSS para um salário maior que R$ 2.203,48', async () => {
        const result = await inssService.calcular(2213.49);
    
        expect(result).toEqual(183.01);
    });

    it('Deve calcular o valor do INSS para um salário entre R$ 2.203,49 e R$ 3.305,22', async () => {
        const result = await inssService.calcular(3128.55);
    
        expect(result).toEqual(292.82);
    });

    it('Deve calcular o valor do INSS para um salário igual a R$ 3.305,22', async () => {
        const result = await inssService.calcular(3305.22);
    
        expect(result).toEqual(314.02);
    });
});

describe('InssService - calcular INSS - Faixa 04', () => {
    const inssService = new InssService();

    it('Deve calcular o valor do INSS para um salário maior que R$ 3.305,22', async () => {
        const result = await inssService.calcular(3305.23);
    
        expect(result).toEqual(314.02);
    });

    it('Deve calcular o valor do INSS para um salário entre R$ 3.305,23 e R$ 6.433,57', async () => {
        const result = await inssService.calcular(4456.98);
    
        expect(result).toEqual(475.26);
    });

    it('Deve calcular o valor do INSS para um salário igual a R$ 6.433,57', async () => {
        const result = await inssService.calcular(6433.57);
    
        expect(result).toEqual(751.99);
    });
});

describe('InssService - calcular INSS - TETO', () => {
    const inssService = new InssService();

    it('Deve calcular o valor do INSS para um salário acima de R$ 6.433,57', async () => {
        const result = await inssService.calcular(6525.56);
    
        expect(result).toEqual(751.99);
    });

    it('Deve calcular o valor do INSS para um salário acima de R$ 9.000,00', async () => {
        const result = await inssService.calcular(9287.89);
    
        expect(result).toEqual(751.99);
    });
});