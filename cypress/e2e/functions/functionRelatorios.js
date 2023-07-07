const faker = require('faker-br');
const funcao = require("./function.js")


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
  listaDeAlunos: function (tenantId) {
    funcao.logarTenantAutenticado(tenantId)
    cy.log('Lista de Alunos')
    cy.get('#menu-gestao > :nth-child(8) > :nth-child(1)').click()
    cy.get('[style="display: block;"] > :nth-child(4) > :nth-child(1)').click()
    cy.get('.open > ul > :nth-child(7) > .menu-2').click()
    cy.contains('Relatório Lista de Alunos', {timeout: 20000}).should('be.visible')
    cy.get('#s2id_AnoLetivoId > .select2-choice').type('2023{enter}')
    cy.get('#btn_submit').click()
    cy.contains('Sucesso!', {timeout: 20000}).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#activity2 > .fa').click()
    cy.get('[style="width: 110px;"]').click()
    cy.get('.swal2-confirm', {timeout: 20000}).should('be.visible').click()
    cy.contains('Histórico de Processos', {timeout: 20000}).should('be.visible')   
    // cy.get('#div_relatorios_processamento')
    //   .find('td', 'Lista de Alunos')
    //   .parent()
    //   .find('[title="Processando"]')
    //   .should('be.visible')
    //     cy.waitUntil(() => {
    //       cy.intercept('GET', '/GerenciadorDeProcessos/ObtenhaDadosParaAtualizar').as('atualizaTela');
    //       cy.wait('@atualizaTela', { timeout: 20000 })
    //       return cy.get('#div_relatorios_processamento').then(($input) => {
    //         const valor = $input;
    //         return valor !== '<td.empty-grid>';
    //       })
    //     }, { timeout: 60000, interval: 1000 })
    //     cy.get('#div_ultimos_relatorios')
    //     .find('td', 'Lista de Alunos')
    //     .parent()
    //     .find('[title="Concluído com sucesso."]')
    //     .should('be.visible')
    //   }
    cy.get('#div_relatorios_processamento')
      .find('td', 'Lista de Alunos')
      .parent()
      .find('[title="Processando"]')
      .should('be.visible')
        cy.waitUntil(() => {
          cy.intercept('GET', '/GerenciadorDeProcessos/ObtenhaDadosParaAtualizar').as('atualizaTela');
          cy.wait('@atualizaTela', { timeout: 20000 })
          const valor = cy.get('#div_relatorios_processamento')
          cy.log(valor)
          // return cy.get('#div_relatorios_processamento').then(($input) => {
          //   const valor = $input;
          //   return valor !== '<td.empty-grid>';
          // })
        }, { timeout: 60000, interval: 1000 })
        // cy.get('#div_ultimos_relatorios')
        // .find('td', 'Lista de Alunos')
        // .parent()
        // .find('[title="Concluído com sucesso."]')
        // .should('be.visible')
      }
}
