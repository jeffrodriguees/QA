const funcao = require("../functions/function")
const sistema = require("../funcoesSistema")
const funcGP = require('../functions/functionColaboradorGP')
const tenantIdGP = '89'
var tenantAutenticadoGP;
const colaboradorGp = '180811'

describe('Cadastro de Tenant e Unidade', () => {

  it('Cadastra Tenant GP', () => {
    funcao.loginDeUsuarioGP()
    funcGP.cadastrarTenantGP()
  })

  it('Cadastrar Unidade GP', () => {
    funcao.loginDeUsuarioGP()
    funcGP.cadastrarUnidadesGP()
  })

  it('Configurar Tenant Criado GP', () => {
    funcao.loginDeUsuarioGP()
    funcGP.configurarTenantCriado()
  })

})

describe('Cadastros básicos de Contrato', () => {

  it('Cadastrar Período', () => {
    funcao.loginDeUsuarioGP()
    funcGP.cadastroDePeriodoeHorarioGP()
  })
  it('Cadastrar Horário', () => {
    funcao.loginDeUsuarioGP()
    funcGP.cadastroDeHorarioGP()
  })
  it('Cadastrar Cargo', () => {
    funcao.loginDeUsuarioGP()
    funcGP.cadastroDeCargoGP()
  })
  it('Cadastrar Função', () => {
    funcao.loginDeUsuarioGP()
    funcGP.cadastroDeFuncaoGP()
  })

})

describe('Testes Básicos de Colaborador', () => {


  it('Cadastrar Colaborador', () => {
    funcao.loginDeUsuarioGP()
    // funcGP.atualizarTenantAutenticadoGP(tenantIdGP)
    funcGP.cadastroDeColaboradorGP()
  })

  it('Víncular Contrato de Colaborador', () => {
    funcao.loginDeUsuarioGP()
    // funcGP.atualizarTenantAutenticadoGP(tenantIdGP)
    funcGP.cadastrarContratoColaboradorGP()
  })

  it('Víncular de Unidade ao Contrato de Trabalho', () => {
    funcao.loginDeUsuarioGP()
    // funcGP.atualizarTenantAutenticadoGP(tenantIdGP)
    funcGP.lotarColaboradorGP()
  })

  it('Criar Usuário Padrão para Colaborador', () => {
    funcao.loginDeUsuarioGP()
    // funcGP.atualizarTenantAutenticadoGP(tenantIdGP)
    funcGP.criarUsuarioDeColaboradorGP()
  })

  it('Acessar como Colaborador e Lançar Justificativa', () => {
    funcGP.loginDeColaboradorGP()
    funcGP.lancaJustiColaboradorGP()
  })

  it('Analisa Lançamentos do Colaborador', () => {
    funcao.loginDeUsuarioGP()
    // funcGP.atualizarTenantAutenticadoGP(tenantIdGP)
    funcGP.analisaJustiDeColaboradorGP()
  })

})