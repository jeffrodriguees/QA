const faker = require('faker-br');
const funcao = require("./function.js")



module.exports = {
  ataDeReuniao: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(1) > a').click()
    cy.contains('Consulta de Atas de reunião', { timeout: 20000 }).should('be.visible')
  },
  calendarioEscolar: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(2) > a').click()
    cy.contains('Calendário Escolar', { timeout: 20000 }).should('be.visible')
    cy.get('#AnoLetivoId').select(1)
    cy.get('#CalendarioId', { timeout: 20000 }).should('not.have.text', '   Aguarde...   ')
    cy.get('#CalendarioId').select(1)
    cy.get('#divCalendario > :nth-child(1)', { timeout: 20000 }).should('be.visible')
  },
  conteudosCurriculares: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(3) > a').click()
    cy.contains('Objetos de Conhecimento', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_AnoLetivoId > .select2-choice').type('2023{enter}')
    cy.wait(1000)
    cy.get('#s2id_ComposicaoId > .select2-choice').type('Fundamental{enter}')
    cy.wait(1000)
    cy.get('#s2id_SerieId > .select2-choice').type('1º ANO{enter}')
    cy.get('#btnBuscar').click()
    cy.get('.displayGrade > :nth-child(1) > :nth-child(1)', { timeout: 20000 }).should('be.visible')
  },
  horarioProfessor: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(4) > a').click()
    cy.contains('Horário de aula do Professor', { timeout: 20000 }).should('be.visible')
    cy.get('#btn_visualizar').click()
    cy.get('#horario', { timeout: 20000 }).should('be.visible')
  },
  elaborarPlanoEnsino: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(5) > a').click()
    cy.contains('Consulta de Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('esc{enter}')
    cy.get('#s2id_TurmaId > .select2-choice').type('1º ANO B{enter}')
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('Portug{enter}')
    cy.get('#btnElaborar > .fa').click()
    cy.contains('Elaboração do Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.contains('Descrição').parent().find('[class="textarea"]').type('Descrição')
    cy.contains('Conclusão').parent().find('[class="textarea"]').type('Conclusão')
    cy.contains('Referências').parent().find('[class="textarea"]').type('Referências')
    cy.get('#btnPostElaborar > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#divElaboracoes', { timeout: 20000 }).should('be.visible')
  },
  editarElaboracaoPlanoEnsino: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(5) > a').click()
    cy.contains('Consulta de Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('esc{enter}')
    cy.get('#s2id_TurmaId > .select2-choice').type('1º ANO B{enter}')
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('Portug{enter}')
    cy.get('#btnBuscar > .fa').click()
    cy.get('#divElaboracoes', { timeout: 20000 }).should('be.visible')
    cy.contains('td', 'Não Enviado').parent().find('[data-content="Visualizar/editar elaboração"]').click()
    cy.contains('Elaboração do Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.contains('Descrição').parent().find('[class="textarea"]').clear().type('Descrição Editada')
    cy.contains('Conclusão').parent().find('[class="textarea"]').clear().type('Conclusão Editada')
    cy.contains('Referências').parent().find('[class="textarea"]').clear().type('Referências Editada')
    cy.get('#btnPostElaborar > .fa').click()
    cy.contains('Sucesso', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.get('#divElaboracoes', { timeout: 20000 }).should('be.visible')
    cy.contains('td', 'Não Enviado', { timeout: 20000 }).should('be.visible')
  },
  copiarElaboracaoPlanoEnsino: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(5) > a').click()
    cy.contains('Consulta de Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('esc{enter}')
    cy.get('#s2id_TurmaId > .select2-choice').type('1º ANO B{enter}')
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('Portug{enter}')
    cy.get('#btnBuscar > .fa').click()
    cy.get('#divElaboracoes', { timeout: 20000 }).should('be.visible')
    cy.contains('td', 'Não Enviado').parent().find('[data-content="Copiar essa elaboração para outras turmas"]').click()
    cy.contains('Copiar Elaboração', { timeout: 20000 }).should('be.visible')
    cy.contains('Turmas de Destino').parent().find('[class="input"]').type('1º ANO{enter}')
    cy.get('.modal-footer > .btn-primary').click()
    cy.get('.swal2-confirm').click()
  },
  excluirElaboracaoPlanoEnsino: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(5) > a').click()
    cy.contains('Consulta de Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('esc{enter}')
    cy.get('#s2id_TurmaId > .select2-choice').type('1º ANO{enter}')
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('Portug{enter}')
    cy.get('#btnBuscar > .fa').click()
    cy.get('#divElaboracoes', { timeout: 20000 }).should('be.visible')
    cy.contains('td', 'Não Enviado').parent().find('[data-content="Deletar elaboração"]').click()
    cy.contains('Atenção!', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  },
  enviarElaboracaoPlanoEnsino: function () {
    cy.get('#menu-gestao > :nth-child(1) > :nth-child(1) > .menu-item-parent').click()
    cy.get('[style="display: block;"] > :nth-child(5) > a').click()
    cy.contains('Consulta de Plano de Ensino', { timeout: 20000 }).should('be.visible')
    cy.get('#s2id_EscolaId > .select2-choice').type('esc{enter}')
    cy.get('#s2id_TurmaId > .select2-choice').type('1º ANO B{enter}')
    cy.get('#s2id_GradeEscolarId > .select2-choice').type('Portug{enter}')
    cy.get('#btnBuscar > .fa').click()
    cy.get('#divElaboracoes', { timeout: 20000 }).should('be.visible')
    cy.contains('td', 'Não Enviado').parent().find('[data-content="Enviar elaboração para aprovação da escola"]').click()
    cy.contains('Sucesso!', { timeout: 20000 }).should('be.visible')
    cy.get('.swal2-confirm').click()
  }
}
