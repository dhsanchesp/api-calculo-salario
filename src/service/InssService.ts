/**
 * Serviços da API de Salário Líquido
 */
export default class SalarioLiquidoService {

    public calcular(salarioBruto: number): number {
        let valorINSS: number = 0.0;
        let faixa:string;

        if (salarioBruto <= 1100.00) {
            faixa = `01 | Alíquota 7.5%`;
            valorINSS = calcularValorAliquota(salarioBruto, tabelaINSS[0].aliquota);
        } else if (salarioBruto >= 1100.01 && salarioBruto <= 2203.48) {
            faixa = `02 | Alíquiota 9.0%`;
            valorINSS = calcularValorAliquota(tabelaINSS[0].range, tabelaINSS[0].aliquota);
            valorINSS += calcularValorAliquota(salarioBruto-1100.01,0.09);
        } else if (salarioBruto >= 2203.49 && salarioBruto <= 3305.22) {
            faixa = `03 | Alíquiota 12%`;
            valorINSS = calcularValorAliquota(tabelaINSS[0].range, tabelaINSS[0].aliquota);
            valorINSS += calcularValorAliquota(tabelaINSS[1].range, tabelaINSS[1].aliquota);
            valorINSS += calcularValorAliquota(salarioBruto-2203.49,0.12);
        } else if (salarioBruto >= 3305.23 && salarioBruto <= 6433.57) {
            faixa = `04 | Alíquota 14%`;

            for (let index = 0; index < 3; index++) {
                valorINSS += calcularValorAliquota(tabelaINSS[index].range, tabelaINSS[index].aliquota);
            }
            valorINSS += calcularValorAliquota(salarioBruto-3305.23,0.14);
        } else {
            faixa = 'TETO';

            tabelaINSS.forEach(element => {
                valorINSS += calcularValorAliquota(element.range, element.aliquota);
            });
        }

        console.log(`Salário R$ ${salarioBruto} | FAIXA ${faixa} | Valor INSS R$ ${valorINSS}`);

        return Math.round((valorINSS + Number.EPSILON) * 100) / 100;
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

const calcularValorAliquota = (valor: number, aliquota: number) => {
    const resultado = valor * aliquota;

    return Math.round((resultado + Number.EPSILON) * 100) / 100;
}