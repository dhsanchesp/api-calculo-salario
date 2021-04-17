export interface SalarioLiquidoRequestModel {
    salarioBruto: number,
    numeroDependentes: number,
    pensaoAlimenticia?: number,
    pat?: number,
    planoSaude?: number,
    outrosDescontos: number,
}