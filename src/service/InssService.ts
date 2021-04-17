/**
 * Serviços da API de Salário Líquido
 */
export default class SalarioLiquidoService {

    public calcular(salarioBruto: number): number {
        let contribuicaoInss = 0;

        console.log(`VALOR BASE: ${salarioBruto}`)

        let index = 0;

        while (index <= 3 && tabelaINSS[index].ate < salarioBruto) {
            const faixaInss = tabelaINSS[index];

            contribuicaoInss += (faixaInss.ate - faixaInss.de) * faixaInss.aliquota;
            index++
        }

        if (index <= 3) {
            const faixa = tabelaINSS[index];
            contribuicaoInss += (salarioBruto - faixa.de) * faixa.aliquota;
        }

        return Math.round((contribuicaoInss + Number.EPSILON) * 100) / 100;
    }
}

const tabelaINSS = [
    {
        faixa: 1,
        de: 0.00,
        ate: 1100.00,
        range: 1100.00,
        aliquota: 0.075
    },
    {
        faixa: 2,
        de: 1100.01,
        ate: 2203.48,
        range: 1103.47,
        aliquota: 0.09
    },
    {
        faixa: 3,
        de: 2203.49,
        ate: 3305.22,
        range: 1101.73,
        aliquota: 0.12
    },
    {
        faixa: 4,
        de: 3305.23,
        ate: 6433.57,
        range: 3128.34,
        aliquota: 0.14
    },
]