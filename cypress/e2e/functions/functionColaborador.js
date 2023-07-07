const faker = require('faker-br');
const funcao = require("../functions/function.js")
const sistema = require("../funcoesSistema.js");
const urlHom = Cypress.env('urlHom')
const cpfColaborador = Cypress.env('cpfColaborador')
const nomeColaborador = Cypress.env('nomeColaborador')
const matriculaContrato = Cypress.env('matriculaContrato')
const dataDeAdmissao = Cypress.env('dataDeAdmissao')

var tenantAutenticado;
var colaboradorAutenticado;
var contratoColaboradorAutenticado;
// const alunoAutenticado = '5049210'

module.exports = {     
  loginDeProfessor: function () {
    cy.viewport(1600, 900)
    cy.visit(urlHom)
    cy.get('#usuario').type(cpfColaborador)
    cy.get('#senha').type(cpfColaborador)
    cy.get('#btn-entrar').click()
    cy.get('#menu-gestao > :nth-child(1) > a', { timeout: 20000 }).should('be.visible')
  },
  nomeColaborador: function () {
    return nomeColaborador;
  },  
  
  atualizarTenantAutenticado: function (tenantId) {
    tenantAutenticado = tenantId
  },
  atualizarColaboradorAutenticado: function (colaboradorId) {
    colaboradorAutenticado = colaboradorId
  },
  cadastroDeColaborador: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.contains('Colaborador', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-4.pull-right > button.btn').click()
    cy.contains('Adicionar Colaborador', { timeout: 25000 }).should('be.visible')
    cy.get('#PessoaNome').type(nomeColaborador)
    cy.get('#PessoaCPFFormatado').type(cpfColaborador)
    //aba de dados pessoais
    cy.get('#tabServidor > :nth-child(2) > a').click()
    cy.get('#PessoaDataNascimento').type('01/01/1999')
    cy.get('#PessoaSexo').select(3)
    cy.get('#CorRaca').select(1)
    cy.get('#PessoaNacionalidade').select(1)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
    // cy.intercept('GET','/Colaborador/GetCidadesPorUf?uf=GO').as('carregaCidades')
    // cy.wait('@carregaCidades', { timeout: 40000 })
    cy.request({
      method: 'GET',
      url: '/Colaborador/GetCidadesPorUf?uf=GO',
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
    cy.get('#tabServidor > :nth-child(4) > a').click()
    cy.get('#PessoaPessoaEnderecoCep').type('74810100')
    cy.get('#btnBuscarCep').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible')
    cy.contains('Informações de endereço do CEP obtidas com sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#PessoaPessoaEnderecoZona', { timeout: 40000 }).should('not.be.disabled')
    cy.wait(500)
    cy.get('#PessoaPessoaEnderecoZona').select(1)
    cy.get('#PessoaPessoaEnderecoLocalizacaoDiferenciada').select(1)
    cy.get('#tabServidor > :nth-child(5) > a').click()
    cy.get('#PessoaEmail').type("novocolaborador@cypress.com")
    cy.get('#btn-submitFormColaborador').click()
    cy.contains('span','Sucesso', { timeout: 20000 }).should('be.visible') 
    cy.get('#Id', { timeout: 20000 }).should('exist', { timeout: 50000})
    // this.verificarID()
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor = $input.val();
        return valor !== '' && valor !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        colaboradorAutenticado = $input.val();
        cy.log('Deu Bão, ID: ' + colaboradorAutenticado)
      });
    });
  },  
  consultaColaboradorNome: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.contains('Colaborador', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(nomeColaborador)
    // cy.get('#searchTerm').type('Fernando')
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'POST',
      url: '/colaborador/indexgrid?Length=11'
    }).then((response) => {
      // cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          // cy.get('tbody > tr').find('td','Fernando') 
          cy.get('tbody > tr').find('td',nomeColaborador).should('be.visible')
        } else {   
          cy.log('Deu Ruim.');
        }
    });

    
  },
  consultaColaboradorMatricula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.contains('Colaborador', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(matriculaContrato)
    // cy.get('#searchTerm').type('00000')
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'POST',
      url: '/colaborador/indexgrid?Length=11'
    }).then((response) => {
      // cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          // cy.get('tbody > tr').find('td','00000') 
          cy.get('tbody > tr').find('td', nomeColaborador).should('be.visible')
        } else {   
          cy.log('Deu Ruim.');
        }
    });

    
  },
  consultaColaboradorCpf: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.contains('Colaborador', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.contains('Consulta de Colaboradores', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(cpfColaborador)
    // cy.get('#searchTerm').type('00000')
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'POST',
      url: '/colaborador/indexgrid?Length=11'
    }).then((response) => {
      // cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => { 
        if (length <= 1) {
          cy.get('tbody > tr').find('td', nomeColaborador).should('be.visible')
        } else {   
          cy.log('Deu Ruim.');
        }
    });
  },
  cadastrarContratoColaborador: function (tenantId) {
    cy.log(colaboradorAutenticado)
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroColaborador(colaboradorAutenticado)
    cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.get('td > .btn').click()
    cy.get(':nth-child(2) > :nth-child(4) > .label', { timeout: 20000 }).should('be.visible')
    cy.get('#Matricula').type(matriculaContrato)
    cy.get('#DataAdmissao').type(dataDeAdmissao + '{enter}')
    cy.get('#s2id_NivelDoCargoCargoId > .select2-choice').type('Prof{enter}')
    cy.wait(2500)
    cy.get('#s2id_NivelDoCargoId > .select2-choice').type('1{enter}')
    cy.get('#s2id_TipoContratoDeTrabalho > .select2-choice').type('Contrato{enter}')
    cy.get('#s2id_HorarioContratoDeTrabalhoId > .select2-choice').type('Horário{enter}')
    cy.get('#QuantidadeHorasSemanais').type('44')
    cy.get('#QuantidadeAulasSemanais').type('20')
    cy.get('#btn-save').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('Contrato de trabalho foi salvo com sucesso.', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.wait(800)
    cy.get('#Id').then(($input) => {
      contratoColaboradorAutenticado = $input.val();     //Obter contrato de colaborador GP
    })
    cy.wait(500)
  },
  afastarColaborador: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroColaborador(colaboradorAutenticado)
    cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Professor', { timeout: 20000 }).click()
    cy.contains('Editar Contrato de trabalho', { timeout: 20000 }).should('be.visible')
    cy.get('#btn-afastar').click()
    cy.contains('Adicionar Afastamento', { timeout: 20000 }).should('be.visible')
    cy.get('.select2-choice').type('Ates{enter}')
    cy.get('#DataInicio').type('Cypress.io{enter}')
    cy.contains('span', 'Informação!', { timeout: 20000 }).should('be.visible')
    cy.contains('i', 'A Data Fim Prevista foi sugerida com base no prazo da justificativa.', { timeout: 20000 }).should('be.visible')
    cy.get('#form_afastamento > .smart-form > footer > .btn-primary').click()
    cy.contains('span','Sucesso', { timeout: 20000 }).should('be.visible')
    cy.contains('Editar Contrato de trabalho', { timeout: 20000 }).should('be.visible')
    cy.get('#formContratoDeTrabalho > footer > .btn-default').click()
    cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Afastado', { timeout: 20000 }).should('be.visible')
    cy.get('#tabServidor > :nth-child(8) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Atestado').parent().find('[class="removerAfastamentoColaborador"]').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('span', 'Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('i', 'Afastamento excluido com sucesso!', { timeout: 20000 }).should('be.visible')
  },
  rescindirContrato: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroColaborador(colaboradorAutenticado)
    cy.get('#tabServidor > :nth-child(6) > a', { timeout: 20000 }).should('be.visible').click()
    cy.contains('td', 'Professor', { timeout: 20000 }).click()
    cy.contains('Editar Contrato de trabalho', { timeout: 20000 }).should('be.visible')
    cy.get('#btn_rescindir').click()
    cy.contains('Justificativa de Rescisão', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_JustificativaId > .select2-choice').type('Ates{enter}')
    cy.get('#ModalDataRescisao').click()
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').type('Cypress.io{enter}')
    cy.get('#botao_confirmar_rescisao').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('Contrato rescindido com sucesso!', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#botao_estornar_rescisao').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('A rescisão do contrato foi estornada com sucesso!', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  cadastrarDiretrizAdministrativa: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get('#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(4) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(1) > .menu-2').click()
    cy.contains('Consulta de Diretrizes', { timeout: 20000 }).should('be.visible')
    cy.get('.col-lg-2 > .btn').click()
    cy.contains('Adicionar Diretriz', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('esc' + '{enter}')
    cy.get('#s2id_FuncaoId > .select2-choice').type('Diretor{enter}')
    cy.get('#QuantidadeHorasSemanais').type('44')
    cy.get('#QuantidadeDeVagas').type('1')
    cy.get('#form_diretriz > footer > .btn-primary').click()
    cy.contains('span','Sucesso', { timeout: 20000 }).should('be.visible')
  },  
  modulacaoAdministrativa: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get('#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(6) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(1) > .menu-2').click()
    cy.get('.col-lg-2 > .btn', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Modulação Administrativo', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_DiretrizEscolaId > .select2-choice').type('Esc{enter}')
    cy.request({
      method: 'GET',
      url: '/ModulacaoColaborador/GetFuncoesPorDiretrizJson?escolaId=9836&funcaoId=&turnoId='
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('#s2id_DiretrizFuncaoId > .select2-choice').type('Diretor{enter}')
    cy.get('#btnCarregarVagas').click()
    cy.contains('td', '44', { timeout: 20000 }).should('be.visible').parent().find('[class="select"]').find('[class="select2-container select2 criterioDeAcesso"]').type('eleitoral{enter}')
    cy.get('.p-row > :nth-child(1) > .checkbox > i', { timeout: 20000 }).should('be.visible').click()
    cy.get('.select2-choices').type('Matu{enter}')
    cy.get('#btnDecretoPortaria').click()
    cy.get('.modal-title', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('#DecretoPortaria').type(faker.random.number())
    cy.get('#DecretoPortariaData').click().type('01012023')
    cy.get('#btnSalvarDecretoPortaria').click()
    cy.get('#s2id_ContratoDeTrabalhoNivelDoCargoCargoId > .select2-choice').type('Professor{enter}')
    cy.wait(7000)
    cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type(nomeColaborador + '{enter}')
    // cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type('Farley{enter}')
    cy.wait(3000)
    cy.get('#s2id_ContratoDeTrabalhoId > .select2-choice').type('Professor{enter}')
    cy.get('#s2id_DepartamentoId > .select2-choice').type('Dire{enter}')
    cy.get('#DataInicio').click().type('Cypress.io{enter}')    
    cy.get('#btnModular').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  modulacaoMagisterio: function (tenantId) {
    const link = "'/modulacaoprofessor/editar'"
    funcao.logarTenantAutenticado(tenantId)    
    cy.get('#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(6) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(2) > .menu-2').click()
    cy.get('button[onclick="CarregarPaginaAjax('+ link + ')"]', { timeout: 20000 }).should('be.visible').click()
    cy.get('#s2id_AnoLetivoId > .select2-choice').type('2023{enter}')
    cy.get('#s2id_TipoDeModulacao > .select2-choice').type('Componente{enter}')
    cy.get('#s2id_TurmaEscolaId > .select2-choice').type('Esc{enter}')
    cy.get('#btnCarregarCargosDisponiveis').click()
    cy.get('#s2id_ContratoDeTrabalhoCargoId > .select2-choice').type('Profe{enter}')
    cy.wait(4500)
    cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type(nomeColaborador +'{enter}')
    // cy.get('#s2id_ContratoDeTrabalhoColaboradorId > .select2-choice').type('Lorena{enter}')
    cy.wait(4500)
    cy.get('#s2id_ContratoDeTrabalhoId > .select2-choice').type('Prof{enter}')
    cy.wait(4500)
    cy.get('#s2id_FuncaoId > .select2-choice').type('Prof{enter}')
    cy.get('#DataInicio').click().type('Cypress.io{enter}')
    cy.contains('td.p-descricao-turma', '1º ANO B', { timeout: 20000 }).should('be.visible').parent().find('[data-id]').find('[class="checkbox"]').click().parent().parent().find('[class="p-quantidade-aulas-assumidas somentenumerosmodulacao"]').clear().type('2')
    cy.contains('td.p-descricao-turma', '1º ANO', { timeout: 20000 }).should('be.visible').parent().find('[data-id]').find('[class="checkbox"]').click().parent().parent().find('[class="p-quantidade-aulas-assumidas somentenumerosmodulacao"]').clear().type('2')
    cy.get('#btnSalvarModular').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },  
  gerarFolha: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get('#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(7) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(2) > .menu-2').click()
    cy.contains('Horário > Espelho', { timeout: 30000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('Esc{enter}')
    cy.get('#s2id_ColaboradorId > .select2-choice', { timeout: 20000 }).should('not.have.text', '   Carregando...   ')
    cy.get('#s2id_ColaboradorId > .select2-choice').type(nomeColaborador +'{enter}')
    // cy.get('#s2id_ColaboradorId > .select2-choice').type('Zenglein Barros Franco Cypress' +'{enter}')
      cy.request({
      method: 'POST',
      url: '/Ponto/GetContratosPorColaborador'
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.wait(1000)
    });
    cy.get('#DataReferencia').click()
    cy.get('.datepicker-months > .table-condensed > tbody > tr > td > :nth-child(7)').click()
    cy.request({
      method: 'POST',
      url: '/Ponto/GetDatasPorPeriodo'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('#btnVerificarHorario').click()
    cy.get('.table-hover', { timeout: 20000 }).should('be.visible')
  },  
  imprimirFolha: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get('#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('[style="display: block;"] > :nth-child(7) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(2) > .menu-2').click()
    cy.contains('Horário > Espelho', { timeout: 30000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('Esc{enter}')
    cy.get('#s2id_ColaboradorId > .select2-choice', { timeout: 20000 }).should('not.have.text', '   Carregando...   ')
    cy.get('#s2id_ColaboradorId > .select2-choice').type(nomeColaborador +'{enter}')
    // cy.get('#s2id_ColaboradorId > .select2-choice').type('Claudionor Souza Moraes Cypress' +'{enter}')
      cy.request({
      method: 'POST',
      url: '/Ponto/GetContratosPorColaborador'
    }).then((response) => {
      expect(response.status).to.eq(200);
      cy.get('#s2id_ContratoDeTrabalhoId > .select2-choice', { timeout: 20000 }).should('not.be.empty')
      // cy.wait(5000)
    });
    cy.get('#DataReferencia').click()
    cy.get('.datepicker-months > .table-condensed > tbody > tr > td > :nth-child(7)').click()
    cy.request({
      method: 'POST',
      url: '/Ponto/GetDatasPorPeriodo'
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.get('#btnVerificarHorario').click()
    cy.get('.table-hover', { timeout: 20000 }).should('be.visible')
    cy.get('#btnImprimirHorario > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },  
  criarLoginColaborador: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)   
    funcao.autenticarCadastroColaborador(colaboradorAutenticado) 
    cy.get('.pull-right > .btn > .fa').click()
    cy.contains('Adicionar Usuário do Colaborador', { timeout: 20000 }).should('be.visible')
    cy.get('#Login').type(cpfColaborador)
    cy.get('#Senha').type(cpfColaborador)
    cy.get('#btnSalvar').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.contains('Usuário criado.', { timeout: 20000 }).should('be.visible')
  },  
  loginColaborador: function () {    
    cy.get('#logout > span > a > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#bot2-Msg1').click()
    cy.get('#usuario', { timeout: 20000 }).should('be.visible').type(cpfColaborador)
    cy.get('#senha').type(cpfColaborador)
    cy.get('#btn-entrar').click()
    cy.get('small > strong', { timeout: 20000 }).should('be.visible')
    cy.contains(nomeColaborador, { timeout: 20000 }).should('be.visible')
    return cpfColaborador;
  },
  apagaDiretriz: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)    
    cy.get('#menu-gestao > :nth-child(6) > :nth-child(1) > .menu-item-parent', { timeout: 20000 }).should('be.visible').click()
    cy.get('.menu.open > :nth-child(2) > :nth-child(4) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(1) > .menu-2').click()    
    cy.contains('Consulta de Diretrizes', { timeout: 20000 }).should('be.visible')
    cy.get('tbody > :nth-child(1) > :nth-child(4)').click()
    cy.contains('Editar Diretriz', { timeout: 20000 }).should('be.visible')
    cy.get('#btn_excluir').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')    
  },  
}
