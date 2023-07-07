import 'cypress-wait-until';
const funcao = require("../functions/function.js");
const aluno = require("../functions/functionAluno.js")

let numSus;
var camposDeValidacao = {
idTenant: '423',
alunoMatric:  Cypress.env('matricAluno'),
alunoNome: Cypress.env('nomeAluno') ,
serie: 1,
turno: 1,
escola: 'Escola',
nacionalidade:  1,
ufNaturalidade: 'GO',
naturalidade: 'Goiânia',
dataNasc: '01012016',
sexoAluno: 1,
raca: 1,
alunoCPF:  Cypress.env('cpfAluno'),
numSus: '874959850656979',
alunoRg: Cypress.env('rgAluno') ,
cep: '74810180',
zona: 1,
locDifer: 2,
};

// before(() => {
// cy.request('GET', 'https://geradorbrasileiro.com/api/faker/cns?limit=1')
//     .then((response) => {
//       const dados = response.body;
//       numSus = dados.values;
//     })
//   });

beforeEach(() => {
  funcao.loginDeUsuario()
});

describe('Validações de Campos do Cadastro do Aluno', () => {
  it('Validar Campo Matrícula.', () => {      
    camposDeValidacao.alunoMatric = ' ';
    aluno.validarCamposAluno(camposDeValidacao, 'Matricula é obrigatória.')
    camposDeValidacao.alunoMatric = Cypress.env('matricAluno');
  })
  it('Validar Campo Nome.', () => {       
    camposDeValidacao.alunoNome = ' ';
    aluno.validarCamposAluno(camposDeValidacao, 'Nome é obrigatório.')
    camposDeValidacao.alunoNome = Cypress.env('nomeAluno');
  })  
  it('Validar Campo Ano Escolar de Entrada.', () => {    
    camposDeValidacao.serie = '';   
    aluno.validarCamposAluno(camposDeValidacao, 'Serie de entrada é obrigatória para cadastro de aluno.')  
    camposDeValidacao.serie = 1;  
  });
  it('Validar Campo Turno.', () => {    
    camposDeValidacao.turno = '';   
    aluno.validarCamposAluno(camposDeValidacao, 'Turno entrada é obrigatório.')
    camposDeValidacao.turno = 1;   
  }) 
  it('Validar Campo Escola.', () => {    
    camposDeValidacao.escola = 'xxx';   
    aluno.validarCamposAluno(camposDeValidacao, 'Escola é obrigatória.')
    camposDeValidacao.escola = 'Escola';   
  })
  it('Validar Campo Tipo Nacionalidade.', () => {    
    camposDeValidacao.nacionalidade = '';   
    aluno.validarCamposAluno(camposDeValidacao, 'A nacionalidade é obrigatória.')
    camposDeValidacao.nacionalidade = 1;   
  })
  it('Validar Campo UF Naturalidade.', () => {    
    camposDeValidacao.ufNaturalidade = ' ';   
    camposDeValidacao.naturalidade = 'xxx';   
    aluno.validarCamposAluno(camposDeValidacao, 'A UF de nascimento é obrigatória.')
    camposDeValidacao.ufNaturalidade = 'GO';   
    camposDeValidacao.ufNaturalidade = 'Goiânia';   
  })
  it('Validar Campo Naturalidade.', () => {    
    camposDeValidacao.naturalidade = 'xxx';   
    aluno.validarCamposAluno(camposDeValidacao, 'O município de nascimento é obrigatório.')
    camposDeValidacao.naturalidade = 'Goiânia';   
  })
  it('Validar Campo Data de Nascimento.', () => {    
    camposDeValidacao.dataNasc = ' ';   
    aluno.validarCamposAluno(camposDeValidacao, 'Data de Nascimento é obrigatório.')
    camposDeValidacao.dataNasc = '01012016';   
  })
  it('Validar Campo Sexo.', () => {    
    camposDeValidacao.sexoAluno = '';   
    aluno.validarCamposAluno(camposDeValidacao, 'Sexo é obrigatório.')
    camposDeValidacao.sexoAluno = 1;   
  })
  it('Validar Campo Raça.', () => {    
    camposDeValidacao.raca = '';   
    aluno.validarCamposAluno(camposDeValidacao, 'A Cor/Raça é obrigatória.')
    camposDeValidacao.raca = 1;   
  })
  it('Validar Campo CPF.', () => {    
    camposDeValidacao.alunoCPF = ' ';   
    aluno.validarCamposAluno(camposDeValidacao, 'O CPF é obrigatório.')
    camposDeValidacao.alunoCPF = Cypress.env('cpfAluno');   
  })
  it('Validar Campo CPF - Número Inválido.', () => {    
    camposDeValidacao.alunoCPF = '123432165156151';   
    aluno.validarCamposAlunoCPF(camposDeValidacao, 'Informe um CPF válido.')
    camposDeValidacao.alunoCPF = Cypress.env('cpfAluno');   
  })
  it('Validar Campo SUS - Número Inválido.', () => {    
    camposDeValidacao.numSus = '123432165156151';   
    aluno.validarCamposAlunoSUS(camposDeValidacao, 'Informe um número SUS válido.')
    camposDeValidacao.numSus = '874959850656979';   
  })
  it('Validar Campo CEP - CEP Inválido.', () => {    
    camposDeValidacao.cep = '75748468';   
    aluno.validarCamposAlunoCEP(camposDeValidacao, 'Endereço não encontrado para o cep informado')
    camposDeValidacao.cep = '74810180';   
  })
  it('Validar Campo Zona Residencial.', () => {    
    camposDeValidacao.zona = '';   
    aluno.validarCamposAluno(camposDeValidacao, 'A localização/Zona de residência deve ser informada.')
    camposDeValidacao.zona = 1;   
  })
  it('Validar Campo Localização Diferenciada de Residência.', () => {    
    camposDeValidacao.locDifer = '';   
    aluno.validarCamposAluno(camposDeValidacao, 'A localização diferenciada de residência deve ser informada.')
    camposDeValidacao.locDifer = 2;   
  })
  // it('Validar Campo Turno.', () => {    
  //   camposDeValidacao.turno = '';   
  //   aluno.validarCamposAluno(camposDeValidacao, 'Turno entrada é obrigatório.')
  //   camposDeValidacao.turno = 1;   
  // })
})