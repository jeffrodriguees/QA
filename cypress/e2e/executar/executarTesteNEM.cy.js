const funcao = require("../functions/function.js");
const aluno = require("../functions/functionAluno.js");
const sistema = require("../funcoesSistema.js");

const alunoNome = aluno.nomeAluno()

let sus;

const tenantId = '111';

before(() => {
    cy.request('GET', 'https://geradorbrasileiro.com/api/faker/cns?limit=1')
      .then((response) => {
        const dados = response.body;
        sus = dados.values;
      })  
  });

beforeEach(() => {
    funcao.loginDeUsuario()
  });

  describe('Validações Aluno', () => {
    it('Cadastrar Aluno - ' + alunoNome, () => {
      aluno.cadastrarAluno(tenantId, `${sus}`)
    })

})