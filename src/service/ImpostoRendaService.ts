export default class ImpostoRendaService {

    /**
     * 
     * @param salarioBruto valor do salário Bruto
     * @param valorINSS valor da contribuição INSS calculado
     * @param pensaoAlimenticia valor da pensão alimentícia
     * @param qtdDependentes número de dependentes
     * @returns 
     */
    public calcular(salarioBruto: number, valorINSS: number, pensaoAlimenticia: number, qtdDependentes: number): number {
        
        const baseCalculo = ((salarioBruto - valorINSS) - pensaoAlimenticia) - this.calculaValorDependentes(qtdDependentes);

        let salarioLiquido = 0;

        if (baseCalculo < tabelaIRRFNormal[0].de) {
            salarioLiquido = baseCalculo + this.calculaValorDependentes(qtdDependentes);
        }

        tabelaIRRFNormal.forEach(element => {
            if (baseCalculo >= element.de && baseCalculo <= element.ate) {

                salarioLiquido = (baseCalculo * element.aliquota)-element.deducao;
            }
        });

        if (salarioLiquido === 0) {
            salarioLiquido = (baseCalculo * tabelaIRRFExcecoes.aliquota) - tabelaIRRFExcecoes.deducao;
        }

        return Math.round((salarioLiquido + Number.EPSILON) * 100) / 100;
    }

    private calculaValorDependentes(qtdDependentes) {
        return qtdDependentes * VLR_POR_DEPENDENTE;
    }
    
}


const tabelaIRRFNormal = [
    {
        de: 1903.99,
        ate: 2826.65,
        deducao: 142.80,
        aliquota: 0.075
    },
    {
        de: 2826.66,
        ate: 3751.05,
        deducao: 354.80,
        aliquota: 0.15
    },
    {
        de: 3751.06,
        ate: 4664.68,
        deducao: 636.13,
        aliquota: 0.225
    }
];

const tabelaIRRFExcecoes = 
    {
        de: 4664.69,
        deducao: 869.36,
        aliquota: 0.275
    };


const VLR_POR_DEPENDENTE = 189.59;
