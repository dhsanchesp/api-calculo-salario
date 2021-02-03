/**
 * Serviços da API de Salário Líquido
 */
export default class SalarioLiquidoService {

    async calcular(salarioBruto: number) {
        let valorINSS: number = 0.0;
        let valorINSSIteracao: number = 0.0;
    
        if (salarioBruto <= 1100.00) {
            console.log(`FAIXA 1 - 7.5%`);
            valorINSS = calcularValorAliquota(salarioBruto, 0.075);
        } else if (salarioBruto >= 1100.01 && salarioBruto <= 2203.48) {
            console.log(`FAIXA 2 - 9.0%`);
            valorINSS = calcularValorAliquota(tabelaINSS[0].range, tabelaINSS[0].aliquota);
            valorINSS += calcularValorAliquota(salarioBruto-1100.01,0.09);
        } else if (salarioBruto >= 2203.49 && salarioBruto <= 3305.22) {
            console.log(`FAIXA 3 - 12%`);
            valorINSS = calcularValorAliquota(tabelaINSS[0].range, tabelaINSS[0].aliquota);
            valorINSS += calcularValorAliquota(tabelaINSS[1].range, tabelaINSS[1].aliquota);
            valorINSS += calcularValorAliquota(salarioBruto-2203.49,0.12);
        } else if (salarioBruto >= 3305.23 && salarioBruto <= 6433.57) {
            console.log(`FAIXA 4 - 14%`);
            valorINSS = calcularValorAliquota(tabelaINSS[0].range, tabelaINSS[0].aliquota);
            valorINSS += calcularValorAliquota(tabelaINSS[1].range, tabelaINSS[1].aliquota);
            valorINSS += calcularValorAliquota(tabelaINSS[2].range, tabelaINSS[2].aliquota);
            valorINSS += calcularValorAliquota(salarioBruto-3305.23,0.14);
        } else {
            console.log(`TETO - 14%`);
            valorINSS = calcularValorAliquota(tabelaINSS[0].range, tabelaINSS[0].aliquota);
            valorINSS += calcularValorAliquota(tabelaINSS[1].range, tabelaINSS[1].aliquota);
            valorINSS += calcularValorAliquota(tabelaINSS[2].range, tabelaINSS[2].aliquota);
            valorINSS += calcularValorAliquota(tabelaINSS[3].range, tabelaINSS[3].aliquota);
        }
    
        tabelaINSS.forEach(element => {
            valorINSSIteracao += calcularValorAliquota(element.range, element.aliquota);
        });
    
        console.log(`Valor INSS: ${valorINSS}`);
        console.log(`Valor INSS pela iteração: ${valorINSSIteracao}`);
    
        return Math.round((valorINSS + Number.EPSILON) * 100) / 100;

    }
}

const obtemRangeINSS = () => {
    let range = [];

    tabelaINSS.forEach(element => {
        range.push(calcularRange(element.de, element.ate));
    });
    range.forEach(item => {
        console.log(`Range: ${item}`)
    })

    return range;

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

const calcularRange = (valorDe: number, valorAte: number) => {
    const resultado = valorAte - valorDe;

    return Math.round((resultado + Number.EPSILON) * 100) / 100;
}

const calcularValorAliquota = (valor: number, aliquota: number) => {
    const resultado = valor * aliquota;
    
    return Math.round((resultado + Number.EPSILON) * 100) / 100;
}