const funcao = require("../functions/function.js")

const nomeAluno = Cypress.env('nomeAluno')
const cpfAluno = Cypress.env('cpfAluno')
const matricAluno = Cypress.env('matricAluno')
const rgAluno = Cypress.env('rgAluno')
const nomeAluno2 = Cypress.env('nomeAluno2')
const cpfAluno2 = Cypress.env('cpfAluno2')
const matricAluno2 = Cypress.env('matricAluno2')
const rgAluno2 = Cypress.env('rgAluno2')
const nomeResponsavel = Cypress.env('nomeResponsavel')
const cpfResponsavel = Cypress.env('cpfResponsavel')
// var tenantId;
var alunoAutenticado;
var alunoAutenticado2;
// const alunoAutenticado = '5049210'

module.exports = {
  idAluno: function () {
    return alunoAutenticado;
  },
  // nomeAluno: function () {
  //   return nomeAluno;
  // },
  // nomeAluno2: function () {
  //   return nomeAluno2;
  // },
  atualizarTenantAutenticado: function (tenantId) {
    tenantAutenticado = tenantId
  },
  atualizarAlunoAutenticado: function (alunoId) {
    alunoAutenticado = alunoId
  },
  atualizarAlunoAutenticado2: function (alunoId2) {
    alunoAutenticado2 = alunoId2
  },
  cadastrarAluno: function (tenantId, sus) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 30000 }).should('be.visible').type(matricAluno)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(nomeAluno)
    cy.get('#SerieEntradaId').select(1)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(1)
    cy.get('#s2id_EscolaId > .select2-choice').type('escola {enter}')
    cy.get('#PessoaNacionalidade').select(1)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
    // cy.intercept('GET','/Colaborador/GetCidadesPorUf?uf=GO').as('carregaCidades')
    // cy.wait('@carregaCidades', { timeout: 40000 })        
    cy.request({
      method: 'GET',
      url: 'Colaborador/GetCidadesPorUf?uf=GO',
    }).then((response) => {
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.wait(1500)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
    cy.get('#PessoaDataNascimento').type('01/01/2016')
    cy.get('#PessoaSexo').select(1)
    cy.get('#CorRaca').select(1)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(cpfAluno)
    cy.get('#NumeroSUS').type(sus)
    cy.get('#RG').type(rgAluno)
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type('74810100')
    cy.get('#btnBuscarCep').click()       
    cy.intercept('GET','/Aluno/GetCidadesPorUf?uf=GO').as('cep')
    cy.wait('@cep', { timeout: 40000 })
    // cy.request({
    //   method: 'GET',
    //   url: '/Aluno/ObtenhaEnderecoPeloCep?cep=74.810-100',
    // }).then((response) => {
    //   expect(response.status).to.eq(200, { timeout: 30000 });
    //   cy.wrap(null)
    // });
    cy.get('.swal2-confirm', { timeout: 30000 }).should('be.visible').click()
    cy.wait(2000)
    cy.get('#Pessoa_PessoaEndereco_Zona').select(1)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(2)
    cy.get('#btnSubmit').click()
    cy.contains('Sucesso', { timeout: 30000 }).should('be.visible').click()
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor = $input.val();
        return valor !== '' && valor !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        alunoAutenticado = $input.val();
        cy.log('Deu Bão, ID: ' + alunoAutenticado)
      });
    });
  },
  validarCamposAluno: function (camposDeValidacao, mensagem) {
    funcao.logarTenantAutenticado(camposDeValidacao.idTenant)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 30000 }).should('be.visible').type(camposDeValidacao.alunoMatric)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(camposDeValidacao.alunoNome)
    // cy.get('#SerieEntradaId').select(1)
    cy.get('#SerieEntradaId').select(camposDeValidacao.serie)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(camposDeValidacao.turno)
    cy.get('#s2id_EscolaId > .select2-choice').type(camposDeValidacao.escola + '{enter}' + '{esc}')
    cy.get('#PessoaNacionalidade').select(camposDeValidacao.nacionalidade)    
    cy.wait(1000)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type(camposDeValidacao.ufNaturalidade + '{enter}'+ '{esc}')
    // cy.intercept('GET','/Colaborador/GetCidadesPorUf?uf=GO').as('carregaCidades')
    // cy.wait('@carregaCidades', { timeout: 40000 })        
    cy.request({
      method: 'GET',
      url: 'Colaborador/GetCidadesPorUf?uf=' + camposDeValidacao.ufNaturalidade,
    }).then((response) => {
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.wait(1500)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type(camposDeValidacao.naturalidade + '{enter}' + '{esc}')
    cy.get('#PessoaDataNascimento').type(camposDeValidacao.dataNasc)
    cy.get('#PessoaSexo').select(camposDeValidacao.sexoAluno)
    cy.get('#CorRaca').select(camposDeValidacao.raca)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(camposDeValidacao.alunoCPF)
    cy.get('#NumeroSUS').type(camposDeValidacao.numSus)
    cy.get('#RG').type(camposDeValidacao.alunoRg)
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type(camposDeValidacao.cep)
    cy.get('#btnBuscarCep').click()       
    cy.intercept('GET','/Aluno/GetCidadesPorUf?uf=GO').as('cep')
    cy.wait('@cep', { timeout: 40000 })
    // cy.request({
    //   method: 'GET',
    //   url: '/Aluno/ObtenhaEnderecoPeloCep?cep=74.810-100',
    // }).then((response) => {
    //   expect(response.status).to.eq(200, { timeout: 30000 });
    //   cy.wrap(null)
    // });
    cy.get('.swal2-confirm', { timeout: 30000 }).should('be.visible').click()
    cy.wait(2000)
    cy.get('#Pessoa_PessoaEndereco_Zona').select(camposDeValidacao.zona)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(camposDeValidacao.locDifer)
    cy.get('#btnSubmit').click()
    // cy.contains('.alert-danger', 'Atenção', 'Verifique os dados informados', { timeout: 30000 }).should('be.visible')    
    cy.contains('.alert-danger','Verifique os dados informados', { timeout: 30000 }).should('be.visible')
    cy.contains(mensagem, { timeout: 30000 }).should('be.visible').click()    
  },
  validarCamposAlunoCPF: function (camposDeValidacao, mensagem) {
    funcao.logarTenantAutenticado(camposDeValidacao.idTenant)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Aluno', { timeout: 30000 }).should('be.visible')
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(camposDeValidacao.alunoCPF)
    cy.get('#CodigoInep').click()
    cy.get('.swal2-warning', { timeout: 30000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 30000 }).should('be.visible') 
  },
  validarCamposAlunoSUS: function (camposDeValidacao, mensagem) {
    funcao.logarTenantAutenticado(camposDeValidacao.idTenant)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Aluno', { timeout: 30000 }).should('be.visible')
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#NumeroSUS').type(camposDeValidacao.numSus)
    cy.get('#CodigoInep').click()
    cy.get('.swal2-warning', { timeout: 30000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 30000 }).should('be.visible') 
  },
  validarCamposAlunoCEP: function (camposDeValidacao, mensagem) {
    funcao.logarTenantAutenticado(camposDeValidacao.idTenant)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Adicionar Aluno', { timeout: 30000 }).should('be.visible')
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type(camposDeValidacao.cep)
    cy.get('#btnBuscarCep > .fa').click()
    cy.get('.swal2-error', { timeout: 30000 }).should('be.visible') 
    cy.contains(mensagem, { timeout: 30000 }).should('be.visible') 
  },
  validarAluno: function (tenantId, sus) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.contains('td', nomeAluno, { timeout: 20000 }).should('be.visible').click()
    // cy.contains('td', 'Itamar', { timeout: 20000 }).should('be.visible').click()
    
    cy.get('#MatriculaEscola', { timeout: 20000 }).should('have.value', matricAluno)
    // cy.get('#MatriculaEscola', { timeout: 20000 }).should('have.value', '57570')

    cy.get('#PessoaNome', { timeout: 20000 }).should('have.value', nomeAluno)
    // cy.get('#PessoaNome').should('have.value', 'Itamar Braga Santos Cypress')

    // cy.get('#Turma').should('have.value', '1º ANO - 1º ANO - Matutino/Manhã - FUNDAMENTAL I - 2023')  

    // cy.get('#EscolaNomeFantasia').should('have.text', sistema.nomeEscola)
    cy.get('#EscolaNomeFantasia', { timeout: 20000 }).should('have.value', 'Escola Municipal de Rosária (Cypress)')

    cy.get('#PessoaNacionalidade', { timeout: 20000 }).should('have.value','0')

    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice', { timeout: 20000 }).should('have.text', '   GO   ')
    
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').should('have.text','   Aparecida de Goiânia   ')

    cy.get('#PessoaDataNascimento').should('have.value','01/01/2016')

    cy.get('#PessoaSexo').should('have.value','0')

    cy.get('#CorRaca').should('have.value','Branca')

    cy.get('#tabAluno > :nth-child(2) > a').click()
    
    cy.get('#PessoaCPF').should('have.value', cpfAluno.substr(0, 3) + '.' + cpfAluno.substr(3, 3) + '.' + cpfAluno.substr(6, 3) + '-' + cpfAluno.substr(9, 2))
    // cy.get('#PessoaCPF').should('have.value','631.151.148-77')

    cy.get('#NumeroSUS').should('have.value', sus)
    // cy.get('#NumeroSUS').should('have.value', '901597786928082')

    cy.get('#RG').should('have.value', rgAluno)
    // cy.get('#RG').should('have.value', '39088')

    cy.get('#tabAluno > :nth-child(3) > a').click()

    cy.get('#s2id_Pessoa_PessoaEndereco_PaisId > .select2-choice').should('have.text', '   Brasil   ') 

    cy.get('#Pessoa_PessoaEndereco_Cep').should('have.value', '74.810-100')

    cy.get('#Pessoa_PessoaEndereco_Zona').should('have.value', '1')

    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').should('have.value', '0')
  },  
  cadastrarResponsavelAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#tabAluno > :nth-child(5) > a').click()
    cy.get('#btnAddNovoResponsavel').click()
    cy.contains('Pessoa Responsável', { timeout: 30000 }).should('be.visible')
    cy.get('#Pessoa_CPF').type(cpfResponsavel)
    cy.get('#Pessoa_DataNascimento').click()
    // cy.intercept('GET', '/Aluno/GetResponsavelCpf?cpf=' + cpfResponsavel).as('verificaResponsavel')
    // cy.wait('@verificaResponsavel', { timeout: 30000 })
    cy.request({
      method: 'GET',
      url: '/Aluno/GetResponsavelCpf?cpf=' + cpfResponsavel,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.wait(1000)
    cy.get('#Pessoa_DataNascimento').type('01/01/1989')
    cy.get('.ui-datepicker-days-cell-over > .ui-state-default').click()
    cy.wait(300)
    cy.get('#Pessoa_Nome').type(nomeResponsavel)
    cy.get('#s2id_Pessoa_Sexo > .select2-choice').type('Não{enter}')
    cy.get('#s2id_NivelParentesco > .select2-choice').type('Tio{enter}')
    cy.get('#Pessoa_Celular').type('62999999999')
    cy.get(':nth-child(1) > .toggle > .toggle-group > .active').click()
    cy.get('#btn-addnovoresponsavel').click()
    cy.wait(1000)
    cy.contains('Sucesso', { timeout: 30000 }).click()
    cy.get('.swal2-confirm').click()
  },
  vincularResponsavelAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno2(alunoAutenticado2)
    cy.wait(1000)
    cy.get('#tabAluno > :nth-child(5) > a').click()
    cy.wait(300)
    cy.get('.col > .btn-group > .dropdown-toggle').click()
    cy.get('#btnVincularNovoResponsavel').click()
    cy.get('#formVincularNovoResponsavel > fieldset > .row > .col > .label', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_Aluno > .select2-choice').type(nomeAluno)
    cy.get('tbody > tr > [valign="top"]', { timeout: 20000 }).should('be.visible').click()
    cy.get('#VincularResponsavel', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnVincular').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible')
  },
  consultarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.table', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(nomeAluno + '{enter}')
    cy.contains('td', nomeAluno, { timeout: 20000 }).should('be.visible')
  },
  consultaDeAlunoNome: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.table', { timeout: 40000 }).should('be.visible')
    cy.get('#searchTerm').type(nomeAluno)
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'GET',
      url: '/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm='+ nomeAluno +'&Matricula=&EscolaId=&TurmaId=&NomeResponsavel=&DataNascimento=&X-Requested-With=XMLHttpRequest'      
    }).then((response) => {
      cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          cy.get('tbody > tr').find('td',nomeAluno) 
        } else {   
          cy.log('Deu Ruim.');
        }
    });
  },
  consultaDeAlunoCPF: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.table', { timeout: 40000 }).should('be.visible')
    cy.get('#searchTerm').type(cpfAluno)
    cy.get('#btnSubmitSearch > .fa').click()
    // cy.intercept('GET','/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm='+ cpfAluno +'&Matricula=&EscolaId=&TurmaId=&NomeResponsavel=&DataNascimento=&X-Requested-With=XMLHttpRequest').as('carregaPorCPF')
    // cy.wait('@carregaPorCPF')
    cy.request({
      method: 'GET',
      url: '/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm='+ cpfAluno +'&Matricula=&EscolaId=&TurmaId=&NomeResponsavel=&DataNascimento=&X-Requested-With=XMLHttpRequest'
    }).then((response) => {
      cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          cy.get('tbody > tr').find('td', nomeAluno) 
        } else {   
          cy.log('Deu Ruim.');

        }
    });
  },
  consultaDeAlunoMatricula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.table', { timeout: 40000 }).should('be.visible')
    cy.get('#searchTerm').type(matricAluno)
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'GET',
      url: '/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm='+ matricAluno +'&Matricula=&EscolaId=&TurmaId=&NomeResponsavel=&DataNascimento=&X-Requested-With=XMLHttpRequest'
    }).then((response) => {
      cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          cy.get('tbody > tr').find('td', nomeAluno) 
        } else {   
          cy.log('Deu Ruim.');

        }
    });
  },
  consultaDeAlunoResponsavel: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.contains('Consulta de Alunos', { timeout: 30000 }).should('be.visible')
    cy.get('.table', { timeout: 40000 }).should('be.visible')
    cy.get('#btnFiltros').click()
    cy.get('#NomeResponsavel').type(nomeResponsavel)
    cy.get('#btnSubmitSearch > .fa').click()
    cy.request({
      method: 'GET',
      url: '/aluno/indexgrid?Length=5&adicional=%7B%22Matricula%22%3A%22%22%2C%22EscolaId%22%3A%22%22%2C%22TurmaId%22%3A%22%22%2C%22NomeResponsavel%22%3A%22'+ nomeResponsavel +'%22%2C%22DataNascimento%22%3A%22%22%7D&searchTerm=&Matricula=&EscolaId=&TurmaId=&NomeResponsavel='+ nomeResponsavel +'&DataNascimento=&X-Requested-With=XMLHttpRequest'
    }).then((response) => {
      cy.wait(5000)
      expect(response.status).to.eq(200, { timeout: 20000 });
    });
    cy.get('tbody tr').its('length').then((length) => {
        if (length <= 1) {
          cy.log('Só uma')
          cy.get('tbody > tr').find('td', nomeAluno) 
        } else {   
          cy.log('Deu Ruim.');

        }
    });
  },
  cadastrarAluno2: function (tenantId, suss) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.btn-expand > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#MatriculaEscola', { timeout: 20000 }).should('be.visible').type(matricAluno2)
    cy.get('#DataCadastro').click().type('Cypress.io{enter}')
    cy.get('#PessoaNome').type(nomeAluno2)
    cy.get('#SerieEntradaId').select(1)
    cy.get('[style="margin-left:180px;"] > :nth-child(3) > :nth-child(2) > .input > .toggle > .toggle-group > .btn-primary').click()
    cy.get('#TurnoEntrada').select(1)
    cy.get('#s2id_EscolaId > .select2-choice').type('escola {enter}')
    cy.get('#PessoaNacionalidade').select(1)
    cy.get('#s2id_PessoaNaturalidadeUf > .select2-choice').type('GO{enter}')
    cy.wait(3000)
    cy.get('#s2id_PessoaNaturalidadeId > .select2-choice').type('GOIÂNIA{enter}')
    cy.get('#PessoaDataNascimento').type('01/01/2016')
    cy.get('#PessoaSexo').select(1)
    cy.get('#CorRaca').select(1)
    cy.get('#tabAluno > :nth-child(2) > a').click()
    cy.get('#PessoaCPF').type(cpfAluno2)
    cy.get('#NumeroSUS').type(suss.replace(',', ''))
    cy.get('#RG').type(rgAluno2)
    cy.get('#tabAluno > :nth-child(3) > a').click()
    cy.get('#Pessoa_PessoaEndereco_Cep').type('74810100')
    cy.get('#btnBuscarCep').click()
    cy.wait(500)
    cy.get('.swal2-confirm').click()
    cy.wait(500)
    cy.get('#Pessoa_PessoaEndereco_Zona').select(1)
    cy.get('#Pessoa_PessoaEndereco_LocalizacaoDiferenciada').select(1)
    cy.get('#btnSubmit').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
    cy.waitUntil(() => {
      return cy.get('#Id').then(($input) => {
        const valor2 = $input.val();
        return valor2 !== '' && valor2 !== '0';
      });
    }, { timeout: 50000, interval: 1000 }).then(() => {
      cy.get('#Id').then(($input) => {
        alunoAutenticado2 = $input.val();
        cy.log('Deu Bão, ID: ' + alunoAutenticado)
      });
    });
  },
  loginAluno2: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.get('.table', { timeout: 20000 }).should('be.visible')
    cy.get('#searchTerm').type(nomeAluno2 + '{enter}')
    cy.contains('td', nomeAluno2, { timeout: 20000 }).should('be.visible').click()
    cy.contains('Editar Aluno', { timeout: 20000 }).should('be.visible')
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Usuário"]').click()
    cy.contains('Adicionar acesso ao Portal do Aluno', { timeout: 20000 }).should('be.visible')
    cy.get('#gerarLogin').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
    cy.get('.swal2-confirm').click()
  },
  acessoResponsavelApp: function () {
    cy.contains('td', nomeAluno).should('be.visible').click()
    cy.get('#tabAluno > :nth-child(5) > a').click()
    cy.get('.btn-editar-responsavel > .fa').click()
    cy.contains('Pessoa Responsável', { timeout: 20000 }).should('be.visible').click()
    cy.get('[rel="popover-hover"] > .input > .toggle').click()
    cy.get('#btn-addnovoresponsavel').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  loginResponsavel: function () {
    cy.get('#logout > span > a > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#bot2-Msg1').click()
    cy.get('#usuario', { timeout: 20000 }).should('be.visible').type(cpfResponsavel)
    cy.get('#senha').type(cpfResponsavel.substr(0, 5))
    cy.get('#btn-entrar').click()
    cy.get('small > strong', { timeout: 20000 }).should('be.visible')
  },
  vinculoResponsavel: function () {
    funcao.vinculeResponsavel(nomeAluno)
  },
  alocarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#AlocarNaTurmaTurmaId', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#RecebeEscolarizacaoEmOutroEspaco', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#btnSubmit').click()
    cy.wait(1000)
    cy.get('#dataAlocacao', { timeout: 20000 }).should('be.visible').click().type('Cypress.io{enter}')
    cy.get('.jconfirm-buttons > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
  },
  imprimirRelatorioComprovanteMatricula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnAbrirPopUp').click()
    cy.get('#dialogComprovanteMatricula > fieldset', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPrintComprovanteMatricula').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioComprovanteFrequência: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnAbrirPopUpFrequencia').click()
    cy.get('#dialogComprovanteFrequencia', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPrintComprovanteFrequencia').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('.swal2-confirm').click()    
  },
  imprimirRelatorioComprovantePreMatricula: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnAbrirPopUpPreMatricula').click()
    cy.get('#dialogComprovantePreMatricula', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnPrintComprovantePreMatricula').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.wait(500)
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioFichaAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnImprimirResumoDadosAluno').click()
    cy.get('#formParametroFichaDoAluno > fieldset', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btnImprimirFichaDoAluno > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioFichaIndividual: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnImprimirFichaIndividual').click()
    cy.get('#formParametroFichaIndividualDoAluno > fieldset', { timeout: 20000 }).should('be.visible').click()
    cy.get('.modal-footer > .btn-danger').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  imprimirRelatorioFichaMedica: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('#dropDownImpressoes > .btn > .fa').click()
    cy.get('#btnImprimirFichaMedica').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  remanejarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.get('.btn.pull-right > .fa').click()
    cy.contains('Alocar aluno na turma', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno).parent().find('[data-id]').find('[class="checkbox"]').click()
    cy.get('#btn_transferiraluno').click()
    cy.contains('Turma de destino', { timeout: 20000 }).should('be.visible')
    cy.get('.select2-choice').type('1º ANO B{enter}')
    cy.get('#btn_salvarRemanejar').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  reclassificarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.get('.btn.pull-right > .fa').click()
    cy.contains('Alocar aluno na turma', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno).parent().find('[data-id]').find('[class="checkbox"]').click()
    cy.get('#btn_transferiraluno').click()
    cy.contains('Turma de destino', { timeout: 20000 }).should('be.visible')
    cy.get('#dialog_trasferiraluno > [style="width:98%;"] > :nth-child(2) > .inline-group > :nth-child(2) > i').click()
    cy.wait(800)
    cy.get('.select2-choice').type('2º ANO{enter}')
    cy.get('#btn_salvarRemanejar').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  alocarAluno2: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('#AlocarNaTurmaTurmaId', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#RecebeEscolarizacaoEmOutroEspaco', { timeout: 20000 }).should('be.visible').select(1)
    cy.get('#btnSubmit').click()
    cy.wait(1000)
    cy.get('#dataAlocacao', { timeout: 20000 }).should('be.visible').click().type('Cypress.io{enter}')
    cy.wait(1000)
    cy.get('.jconfirm-buttons > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  matriculaTransferido: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child(1) > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    cy.get('#s2id_Motivo > .select2-choice').type('DECIS{enter}')
    cy.get('fieldset > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  matriculaDesistente: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child(2) > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  matriculaCancelado: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child(3) > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  matriculaEvadido: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child(4) > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    cy.get('#s2id_Motivo > .select2-choice').type('DECIS{enter}')
    cy.get('fieldset > footer > .btn-primary').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  matriculaFalecido: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child(5) > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  matriculaConcluido: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('a.btn.btn-primary.btn-small.btn-agrupador-toobar.btn-expand[title="Matrícula"]').click();
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('#btnRequisicao > .btn').click()
    cy.get(':nth-child(5) > .alterarStatus').click()
    cy.get('#bot2-Msg1', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  estornar: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get(':nth-child(11) > :nth-child(1) > :nth-child(2) > .btn > .fa').click()
    cy.contains('Movimentação de Matrículas', { timeout: 20000 }).should('be.visible')
    cy.get('.btnEstornar').click()
    cy.get('#bot2-Msg1').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  buscaUnificadaNome: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.get('#TermoDePesquisaUnificado', { timeout: 20000 }).should('be.visible').type(nomeAluno2)
    cy.get('.col > .btn').click()
    cy.get('#div_exibicao', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno2).should('be.visible')
  },
  buscaUnificadaCPF: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.get('#TermoDePesquisaUnificado', { timeout: 20000 }).should('be.visible').type(cpfAluno2)
    cy.get('.col > .btn').click()
    cy.get('#div_exibicao', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno2).should('be.visible')
  },
  buscaUnificadaSUS: function (tenantId, sus2) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.get('#TermoDePesquisaUnificado', { timeout: 20000 }).should('be.visible').type(sus2)
    cy.get('.col > .btn').click()
    cy.get('#div_exibicao', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno2).should('be.visible')
  },
  buscaUnificadaRG: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.get('#TermoDePesquisaUnificado', { timeout: 20000 }).should('be.visible').type(rgAluno2)
    cy.get('.col > .btn').click()
    cy.get('#div_exibicao', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno2).should('be.visible')
  },
  buscaUnificadaMatric: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.get('#menu-gestao > :nth-child(3) > :nth-child(1) > .collapse-sign > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.wait(300)
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.get('#TermoDePesquisaUnificado', { timeout: 20000 }).should('be.visible').type(matricAluno2)
    cy.get('.col > .btn').click()
    cy.get('#div_exibicao', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno2).should('be.visible')
  },
  lancarNotasAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.contains('td', nomeAluno).should('be.visible').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.window().then(win => win.$('.notaPrimeiro, .notaSegundo, .notaTerceiro, .notaQuarto').text('9').trigger('change'))
    cy.window().then(win => win.$('.faltaPrimeiro, .faltaSegundo, .faltaTerceiro, .faltaQuarto').text('5').trigger('change'))
    cy.get('#btnSubmitTable').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  lancarNotasAluno2: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.contains('td', nomeAluno2).should('be.visible').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
    cy.window().then(win => win.$('.notaPrimeiro, .notaSegundo, .notaTerceiro, .notaQuarto').text('9').trigger('change'))
    cy.window().then(win => win.$('.faltaPrimeiro, .faltaSegundo, .faltaTerceiro, .faltaQuarto').text('5').trigger('change'))
    cy.get('#btnSubmitTable').click()
    cy.get('.swal2-confirm', { timeout: 20000 }).should('be.visible').click()
  },
  desalocarAluno: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.get('.btn.pull-right > .fa').click()
    cy.contains('Alocar aluno na turma', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno).parent().find('[data-id]').find('[class="checkbox"]').click()
    cy.get('#btn_DesalocarAluno > .fa').click()
    cy.get('#dialog_desalocaAlunos > [style="width:98%;"] > :nth-child(2) > .inline-group > :nth-child(1) > i', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btn_salvarDesaloca > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  },
  desalocarAluno2: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    funcao.autenticarCadastroAluno(alunoAutenticado2)
    cy.get('.col-sm-6 > .input-group > .input-group-btn > .btn > .fa').click()
    cy.contains('Editar Turma de Escolarização', { timeout: 20000 }).should('be.visible')
    cy.get('#tabTurma > :nth-child(3) > a').click()
    cy.get('.btn.pull-right > .fa').click()
    cy.contains('Alocar aluno na turma', { timeout: 20000 }).should('be.visible')
    cy.contains('td', nomeAluno2).parent().find('[data-id]').find('[class="checkbox"]').click()
    cy.get('#btn_DesalocarAluno > .fa').click()
    cy.get('#dialog_desalocaAlunos > [style="width:98%;"] > :nth-child(2) > .inline-group > :nth-child(2) > i', { timeout: 20000 }).should('be.visible').click()
    cy.get('#btn_salvarDesaloca > .fa', { timeout: 20000 }).should('be.visible').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible').click()
  }
}