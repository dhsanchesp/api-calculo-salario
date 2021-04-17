export default class ImpostoRendaService {

    /**
     *
     * @param baseCalculo valor do salário Bruto
     * @returns o valor do Imposto de Renda calculado
     */
    public calcular(baseCalculo: number): number {

        let vlrImpostoRenda = 0;

        tabelaIRRFNormal.forEach(element => {
            if (baseCalculo >= element.de && baseCalculo <= element.ate) {
                vlrImpostoRenda = (baseCalculo * element.aliquota) - element.deducao;
            }
        });

        if (vlrImpostoRenda === 0) {
            vlrImpostoRenda = (baseCalculo * tabelaIRRFExcecoes.aliquota) - tabelaIRRFExcecoes.deducao;
        }

        return Math.round((vlrImpostoRenda + Number.EPSILON) * 100) / 100;
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
