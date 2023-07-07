const faker = require('faker-br');
const funcao = require("../e2e/functions/function.js")

const urlHom2 = Cypress.env('urlHom2')

const tenant = Cypress.env('tenant')
const tenantAlterado = Cypress.env('tenantAlterado')
const escola = Cypress.env('escola')
const cidade = Cypress.env('cidade')
const cidadeAlterada = Cypress.env('cidadeAlterada')
const cep = Cypress.env('cep')
const cepAlterado = Cypress.env('cepAlterado')
const anoLetivo = Cypress.env('anoLetivo')
const cpfColaboradorGP = Cypress.env('cpfColaboradorGP')
const qtdHorasGP = Cypress.env('qtdHorasGP')
const InicioPrimeiroBimestre = Cypress.env('InicioPrimeiroBimestre') + anoLetivo
const FimPrimeiroBimestre = Cypress.env('FimPrimeiroBimestre') + anoLetivo
const InicioSegundoBimestre = Cypress.env('InicioSegundoBimestre') + anoLetivo
const FimSegundoBimestre = Cypress.env('FimSegundoBimestre') + anoLetivo
const InicioTerceiroBimestre = Cypress.env('InicioTerceiroBimestre') + anoLetivo
const FimTerceiroBimestre = Cypress.env('FimTerceiroBimestre') + anoLetivo
const InicioQuartoBimestre = Cypress.env('InicioQuartoBimestre') + anoLetivo
const FimQuartoBimestre = Cypress.env('FimQuartoBimestre') + anoLetivo
const composicao = Cypress.env('composicao')
const composicaoAb = Cypress.env('composicaoAb')

var loginDeUsuarioGP = cpfColaboradorGP
var senhaDeUsuarioGP = cpfColaboradorGP
var tenantAutenticado;
var tenantAutenticadoGP;
var alunoAutenticado;
var alunoAutenticado2;
var colaboradorAutenticadoGP;
var contratoColaboradorAutenticadoGP;

module.exports = {
  nomeTenant: function () {
    return tenant;
  },
  nomeEscola: function () {
    return escola;
  },  
  atualizarTenantAutenticado: function (tenantId) {
    tenantAutenticado = tenantId
  },

  atualizarAlunoAutenticado: function (alunoId) {
    alunoAutenticado = alunoId
  },

  cadastrarTenant: function () {    
    cy.contains('Cadastro', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Secretaria').click()
    cy.contains('Adicionar').click()
    cy.get('#Nome').type(tenant)
    cy.get('#s2id_Estado > .select2-choice').type('GOI{enter}')
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('#s2id_Cidade2Id > .select2-choice').type(cidade+'{enter}')
    cy.get('#Latitude').type(faker.address.latitude())
    cy.get('#Longitude').type(faker.address.longitude())
    cy.get('#ServerUrl').type(urlHom2)
    cy.get('#Dns').type(urlHom2)
    cy.get('#tabConfiguracoes').click()
    cy.get('#s2id_FusoHorario > .select2-choice').type('bras{enter}')
    cy.get('#s2id_RedeAtendimento > .select2-choice').type('muni{enter}')    
    cy.get(':nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .active').click()
    cy.wait(500)
    cy.get('#btn-save').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(800)  
    cy.get('#Id').then(($input) => {
      tenantAutenticado = $input.val();     //Obter Id Tenant           
    })
    cy.wait(800) 
  },
  
  alterarDadosTenant: function () {
    cy.window().then(win => win.CarregarPaginaAjax('/Tenant/Editar/' + tenantAutenticado))
    cy.contains('Editar Tenant', { timeout: 20000 }).should('be.visible').click()
    cy.wait(1000)
    cy.get('#Nome').clear().type(tenantAlterado)
    cy.get('#s2id_Estado > .select2-choice').type('Tocan{enter}')
    cy.wait(1000)
    cy.get('#s2id_Cidade2Id > .select2-choice').type(cidadeAlterada+'{enter}')
    cy.get('#Latitude').clear().type(faker.address.latitude())
    cy.get('#Longitude').clear().type(faker.address.longitude())
    cy.get('#tabConfiguracoes').click()
    cy.get('#s2id_RedeAtendimento > .select2-choice').type('Esta{enter}')
    cy.wait(500)
    cy.get('#btn-save').click()
    cy.wait(500)
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()    
  },
  
  cadastrarUnidades: function () {

    //Localica o Tenant Criado para adicionar uma unidade.    
    cy.window().then(win => win.CarregarPaginaAjax('/Tenant/Editar/' + tenantAutenticado))
    cy.get(':nth-child(2) > div > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Unidade Escolar', { timeout: 20000 }).should('be.visible')
    cy.get('#Nome').type(escola).should('not.have.value', '')
    cy.get('#NomeFantasia').type(escola).should('not.have.value', '')
    cy.get('#TipoDeUnidade').select(3).should('not.have.value', '')
    cy.get('#DependenciaAdministrativa').select(3).should('not.have.value', '')
    cy.get('#tabEscola > :nth-child(2) > a').click()
    cy.get('#Cep').type(cep).should('not.have.value', '')
    cy.get('#btnBuscarCep > .fa').click()
    cy.wait(800)
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Endereco', { timeout: 20000 }).should('not.have.value', '')
    cy.get('#s2id_LocalizacaoDiferenciada > .select2-choice').type('Não {enter}')
    cy.get('#Email').type('escola@teste.com')
    cy.wait(200)
    cy.get('#TipoTelefone').select(2)
    cy.get('#DDD').select(52)
    cy.get('#NumeroTelefone').type(faker.phone.phoneNumber())
    cy.get('#TipoTelefoneParaEnvioEducaCenso').select(1)
    cy.get('.btn-primary > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  
    /**
     * Cadastra um Ano Letivo
     * 
     * @returns {tenantAutenticado}
     */   
  cadastroAnoLetivo: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.contains('Ensino').click()
    cy.get('[style="display: block;"] > :nth-child(1) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Ano', { timeout: 20000 }).should('be.visible').type(anoLetivo)
    cy.get('#MetaAproveitamento').type('6000')
    cy.get('#MetaMedia').type('7,0')
    cy.get(':nth-child(7) > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
    return tenantAutenticado;
  },
  cadastroCalendário: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.contains('Ensino').click()
    cy.get('[style="display: block;"] > :nth-child(2) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar', { timeout: 20000 }).click()
    cy.get('#AnoLetivoId').select(1)
    cy.get('#Descricao').type('Calendário' + " " + anoLetivo)
    cy.get('#InicioPrimeiroBimestre').type(InicioPrimeiroBimestre)
    cy.get('#FimPrimeiroBimestre').type(FimPrimeiroBimestre)
    cy.get('#InicioSegundoBimestre').type(InicioSegundoBimestre)
    cy.get('#FimSegundoBimestre').type(FimSegundoBimestre)
    cy.get('#InicioTerceiroBimestre').type(InicioTerceiroBimestre)
    cy.get('#FimTerceiroBimestre').type(FimTerceiroBimestre)
    cy.get('#InicioQuartoBimestre').type(InicioQuartoBimestre)
    cy.get('#FimQuartoBimestre').type(FimQuartoBimestre)
    cy.get('#FimPrimeiroSemestre').type(FimSegundoBimestre)
    cy.get('#FimSegundoSemestre').type(FimQuartoBimestre)
    cy.get('#formCalendarioEscolar > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('#btn_excluir > .fa', { timeout: 20000 }).should('be.visible')
    cy.get('.btn-info > .fa').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabCalendarioEscolar > :nth-child(3) > a').click()
    cy.get('#dropDownPreencher > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPreencherAutomatico').click()
    cy.contains('Preencher dias letivos automático', { timeout: 20000 }).should('be.visible')
    cy.get('section > :nth-child(3) > i').click()
    cy.get('#btnIniciarPreencherAutomatico').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  cadastroComposição: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(5) > [href="#"] > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('.open > ul > :nth-child(2) > .menu-2').click()
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Descricao', { timeout: 20000 }).should('be.visible').type(composicao)
    cy.get('#CodigoParaGeracaoDaTurma').type(composicaoAb)
    cy.get('#s2id_NivelModalidadeEnsino > .select2-choice').type('fundam{enter}')
    cy.wait(1500)
    cy.get('#s2id_Modalidade').type('regular{enter}')
    cy.get('#form_composicaoensino > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  cadastroAnosEscolares: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.cadastrarAnosEscolares()
  },
  cadastroComponentesCurriculares: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.cadastrarComponentesCurriculares()
  },
  cadastroCargo: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1)').click()
    cy.get('[style="display: block;"] > :nth-child(2) > [href="#"]').click()
    cy.get('.open > ul > :nth-child(1) > .menu-2').click()
    cy.contains('Consulta de Cargos', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('#Descricao').type('Professor')
    cy.get('#Tipo').select(1)
    cy.get(':nth-child(5) > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(1000)
    cy.get('fieldset > :nth-child(1) > footer > .btn').click()
    cy.contains('Adicionar Nível do cargo', { timeout: 20000 }).should('be.visible')
    cy.get('#Descricao').type('Nível 1')
    cy.get('#form_nivelcargo > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
  },
  cadastroFuncao: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1)').click()
    cy.get('[style="display: block;"] > :nth-child(2) > [href="#"]').click()
    cy.get('.open > ul > :nth-child(5) > .menu-2').click()
    cy.contains('Consulta de Funções', { timeout: 20000 }).should('be.visible')

    this.cadastrarFuncao()
  },
  cadastrarFuncao: function () {
    this.cadastrarFuncoes('Professor', 'Prof', 'Docente', 'Professor','Profe')
    this.cadastrarFuncoes('Diretor', 'Dire', 'Diretor', 'Diretor', 'Profe')
  },
  cadastrarFuncoes: function (descFuncao, abrevFuncao, tipoFuncao, tdFuncao, cargoFuncao) {
    cy.get(':nth-child(3) > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Função', { timeout: 20000 }).should('be.visible')
    cy.get('.col-4 > .input > #Nome').type(descFuncao)
    cy.get('#Abreviacao').type(abrevFuncao)
    cy.get('#s2id_TipoFuncionario > .select2-choice').type(tipoFuncao + '{enter}')
    cy.get('#CargaHoraria').clear().type('20')
    cy.get(':nth-child(3) > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(1000)
    cy.contains('Consulta de Funções', { timeout: 20000 }).should('be.visible')
    cy.contains('td', tdFuncao).should('be.visible').click()
    cy.contains('Editar Função', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_CargoId > .select2-choice').type(cargoFuncao + '{enter}')
    cy.wait(800)
    cy.get('#btnAdicionarCargo').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(5) > .btn-default').click()
  },
  habilitarModularProfessor: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)    
    cy.get('#menu-gestao > :nth-child(9) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(5) > a').click()
    cy.get('#NomePrefeitura', { timeout: 20000 }).should('be.visible').type(tenant)
    cy.get('#tabConfiguracoes > :nth-child(2) > a').click()
    cy.get('#CpfResponsavel').type(faker.br.cpf())
    cy.wait(500)
    cy.get('#CpfGestor').type(faker.br.cpf())
    cy.get('#tabConfiguracoes > :nth-child(4) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(12) > .input > .toggle > .toggle-group > .active').click()
    cy.get('#form_config > footer > [type="submit"]').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  cadastroDepartamento: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)    
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(2) > [href="#"] > .menu-item-parent').click()
    cy.get('.open > ul > :nth-child(3) > .menu-2').click()
    cy.contains('Consulta de Departamentos', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('.col-xs-9 > .input > #Nome', { timeout: 20000 }).should('be.visible').type('Direção')
    cy.get('#Abreviacao').type('Dir')
    cy.get('#btn_salvar').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#form_departamento > footer > .btn-default').click()
    cy.contains('Consulta de Departamentos', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.get('.col-xs-9 > .input > #Nome', { timeout: 20000 }).should('be.visible').type('Sala de Aula')
    cy.get('#Abreviacao').type('Sala')
    cy.get('#btn_salvar').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  cadastroFormulaAprovacao: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.contains('Ensino').click()
    cy.contains('Fórmula de Aprovação', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()
    cy.get('#Descricao', { timeout: 20000 }).should('be.visible').type('Fórmula de Aprovação ' + composicao)
    cy.get('#FrequenciaMinima').type('75')
    cy.get('#ArredondamentoNota').select(1)
    cy.get('#DropDownConselhoDeClasse').select(1)
    cy.get('#DropDownLancamentos').select(1)
    cy.get('#FormulaDeAprovacao').type('(NB1+NB2+NB3+NB4)/4')
    cy.get('#FormulaDeAprovacaoConceito').type('(NB1+NB2+NB3+NB4)/4')
    cy.get('#NotaMaximaMediaFinal').type('10')
    cy.get('#MediaAprovacao').type('7')
    cy.get('#QuantidadeDisciplinaRecuperacao').type('3')
    cy.get('.modal-footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  configurarComposicaoEnsino: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.contains('Ensino').click()
    cy.wait(100)
    cy.get('[style="display: block;"] > :nth-child(3) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar', { timeout: 20000 }).should('be.visible').click()
    cy.get('#CalendarioEscolarAnoLetivoId').select(1)
    cy.get('#CalendarioEscolarId').select(1)
    cy.get('#ComposicaoEnsinoId').select(1)
    cy.get('#TipoAtendimento').select(1)
    cy.get('#Periodicidade').select(1)
    cy.get('#MateriaEscolar').select(1)
    cy.get('#OrigemCargaHoraria').select(1)
    cy.get('.select2-choice').type(composicao + '{enter}')
    cy.get('#formComposicaoCalendario > footer > .btn-primary > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  adicionarAnosEscolaresAComposicao: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.adicionarAnosEscolaresComposicaodeEnsino()
  },
  configurarPlanoDeEnsino: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.configurarPlanoDeEnsino()
  },
  adicionarEstruturaCurricularAnosEscolares: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.adicionarEstruturasCurriculares()
  },
  configurarAnosEscolaresUnidade: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get('tbody > tr > :nth-child(3)', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabEscola > :nth-child(3) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabSeries > fieldset > footer > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(3) > section > .checkbox > i', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(4) > section > .checkbox > i').click()
    cy.get(':nth-child(5) > section > .checkbox > i').click()
    cy.get(':nth-child(6) > section > .checkbox > i').click()
    cy.get('.recipiente-pagina > #form0 > footer > .btn-primary > .fa').click();
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  adicionarTurnosUnidade: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.adicioneTurno()
  },
  cadastrarMovimentação: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(17) > a').click()
    cy.contains('Consulta de Motivos de Movimentação', { timeout: 20000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn > .fa').click()
    cy.contains('Adicionar Motivo de Movimentação', { timeout: 20000 }).should('be.visible')
    cy.get('#Descricao').type('DECISÃO DOS PAIS')
    cy.get('#form_motivo > footer > .btn-primary > .fa').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
  },
  cadastrarJustificativa: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(21) > [href="#"]').click()
    cy.get('.open > ul > :nth-child(4) > .menu-2').click()
    cy.contains('Consulta de Justificativa', { timeout: 30000 }).should('be.visible')
    cy.get(':nth-child(3) > .btn').click()
    cy.contains('Adicionar Justificativa', { timeout: 30000 }).should('be.visible')
    cy.get('#Descricao').type('Atestado')
    cy.get('#Sigla').type('ATE')
    cy.get('#Prazo').type('30')
    cy.get('#form_justificativa > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  cadastrarPeriodo: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(21) > [href="#"]').click()
    cy.get('.open > ul > :nth-child(5) > .menu-2').click()
    cy.contains('Consulta de Períodos', { timeout: 30000 }).should('be.visible')    
    cy.get(':nth-child(3) > .btn').click()
    cy.contains('Adicionar Período', { timeout: 30000 }).should('be.visible')
    cy.get('#Descricao').type('Padrão')
    cy.get('.select2-choice').type('1{enter}')
    cy.get('#form_pontoperiodo > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('O período foi salvo com sucesso.', { timeout: 20000 }).should('be.visible')
  },
  cadastrarHorario: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    cy.get('#menu-gestao > :nth-child(7) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get(':nth-child(21) > [href="#"]').click()
    cy.get('.open > ul > :nth-child(3) > .menu-2').click()
    cy.contains('Consulta de Horários', { timeout: 30000 }).should('be.visible')    
    cy.get(':nth-child(3) > .btn').click()
    cy.contains('Adicionar Horário', { timeout: 30000 }).should('be.visible')
    cy.get('#Descricao').type('Horário Geral')
    cy.get('#s2id_TipoCargaHoraria > .select2-choice').type('Mensal{enter}')
    cy.get('#form_pontoHorario > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('O horário foi salvo com sucesso.', { timeout: 20000 }).should('be.visible')
  },
  adicionarTurmas: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.adicioneTurma()
  },
  adicionarHorarioAula: function () {
    funcao.logarTenantAutenticado(tenantAutenticado)
    funcao.horarioAula()
  },
  
  


   //----------------------------------- DEFINIÇÕES INICIAIS ---------------------------
  adicionarUnidadeDeMedida: function (){
    funcao.logarTenantAutenticadoGP(tenantId)
    funcao.cadastrarUnidadeDeMedida()
  },

  //----------------------------------- ALIMENTAÇÃO ESCOLAR ---------------------------
  adicionarAlimento: function (tenantId) {
    //funcao.logarTenantAutenticadoGP(tenantAutenticadoGP)
    funcao.logarTenantAutenticadoGP(tenantId)
    cy.get('[title="Alimentação escolar"]').click()    
    cy.contains('Alimentação Escolar', { timeout: 20000 }).should('be.visible')
    //cy.get('[style="display: block;"] > :nth-child(2) > a', { timeout: 20000 }).should('be.visible').click()
    cy.window().then(win => win.CarregarPaginaAjax('/produto'))
    cy.contains('Alimentos', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-3.pull-right > .btn').click()
    cy.contains('Cadastro de Alimentos', { timeout: 20000 }).should('be.visible')
    cy.get('#OrigemInformacoesNutricionais').select(1)
    cy.get('.col-lg-10 > .input > #Nome').type(faker.name.firstName())
    cy.get('#Tipo').select(1)
    cy.get('#Classificacao').select(1)
    cy.get('#FonteDeFerro').select(1)
    cy.get('#TipoDeAcucar').select(1)
    cy.get('#tabProduto > :nth-child(3) > a').click()
  }

}
