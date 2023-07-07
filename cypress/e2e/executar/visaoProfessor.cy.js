const funcao = require("../functions/function.js");
const professor = require("../functions/functionProfessor.js")

beforeEach(() => {
  funcao.loginDeProfessor()
});

describe('Validações Visão de Professor', () => {
  it('Tela Ata de Reunião', () => {       
    professor.ataDeReuniao()
  })
  it('Visualizar Calendário Escolar', () => {
    professor.calendarioEscolar()
  })
  it('Visualizar Conteúdos Curriculares', () => {
    professor.conteudosCurriculares()
  })
  it('Visualizar horário de Professor', () => {
    professor.horarioProfessor()
  })
  it('Elaborar Plano de Ensino', () => {
    professor.elaborarPlanoEnsino()
  })
  it('Editar Elaboração de Plano de Ensino', () => {
    professor.editarElaboracaoPlanoEnsino()
  })
  it('Copiar Elaboração de Plano de Ensino', () => {
    professor.copiarElaboracaoPlanoEnsino()
  })
  it('Excluir Elaboração de Plano de Ensino', () => {
    professor.excluirElaboracaoPlanoEnsino()
  })
  it('Enviar Elaboração de Plano de Ensino', () => {
    professor.enviarElaboracaoPlanoEnsino()
  })
})