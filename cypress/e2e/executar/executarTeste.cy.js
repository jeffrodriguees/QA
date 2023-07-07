import 'cypress-wait-until';
const funcao = require("../functions/function.js");
const aluno = require("../functions/functionAluno.js");
const sistema = require("../funcoesSistema.js");
const colaborador = require("../functions/functionColaborador.js")
const relatorio = require("../functions/functionRelatorios.js")
const nomeColaborador = Cypress.env('nomeColaborador')
const nomeAluno = Cypress.env('nomeAluno')
const nomeAluno2 = Cypress.env('nomeAluno2')
const tenant = Cypress.env('tenant')
const escola = Cypress.env('escola')



// Cypress._.times(10, () => {
// })
// const escolaNome = sistema.nomeEscola()
// const tenantNome = sistema.nomeTenant()
// const alunoNome = aluno.nomeAluno()
// const alunoNome2 = aluno.nomeAluno2()
// const colabNome = colaborador.nomeColaborador()
let sus;
let suss;

var tenantId;

// const tenantId = '419';
// const alunoId = '5049456'
// const alunoId2 = '5049358'
// const colaboradorId = '5049595'

  

before(() => {
  cy.request('GET', 'https://geradorbrasileiro.com/api/faker/cns?limit=1')
    .then((response) => {
      const dados = response.body;
      sus = dados.values;
    })  
  cy.request('GET', 'https://geradorbrasileiro.com/api/faker/cns?limit=1')
    .then((response) => {
      const dados = response.body;
      suss = dados.values;
    })
Cypress.env('urlHom')
});

beforeEach(() => {
  funcao.loginDeUsuario()
});

describe('Validações Configurações Iniciais', () => {
  it('Cadastrar Tenant - ' + tenant, () => {
    sistema.cadastrarTenant()
  })
  it('Cadastro de unidade - ' + escola, () => {
    sistema.cadastrarUnidades()
  })
  it('Cadastro de Ano Letivo', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    tenantId = sistema.cadastroAnoLetivo()
  })
  it('Cadastro de Calendário Escolar', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroCalendário()
  })
  it('Cadastro de Composição de Ensino', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroComposição()
  })
  it('Cadastro de Anos Escolares', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroAnosEscolares()
  })
  it('Cadastrar Cargo e Nível', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroCargo()
  })
  it('Cadastrar Função e vincular ao Cargo', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroFuncao()
  })
  it('Cadastrar Departamento', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroDepartamento()
  })
  it('Cadastro de Componentes Curriculares', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroComponentesCurriculares()
  }) 
  it('Habilitar Modular Professor como Administrativo', () => {
      // sistema.atualizarTenantAutenticado(tenantId)
      sistema.habilitarModularProfessor()
  })
  it('Cadastro de Fórmula de Aprovação', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastroFormulaAprovacao()
  })
  it('Configurar Composição de Ensino', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.configurarComposicaoEnsino()
  })
  it('Adicionar Anos Escolares a Composição de Ensino', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.adicionarAnosEscolaresAComposicao()
  })
  it('Adicionar Estrutura Curricular aos Anos Escolares', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.adicionarEstruturaCurricularAnosEscolares()
  })
  it('Configurar Plano de Ensino', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.configurarPlanoDeEnsino()
  })
  it('Configurar Anos Escolares (Cadastro da Escola)', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.configurarAnosEscolaresUnidade()
  })
  it('Adicionar Turnos (Cadastro da Escola)', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.adicionarTurnosUnidade()
  })
  it('Cadastro de Movimentação', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastrarMovimentação()
  })
  it('Cadastro de Justificativa', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastrarJustificativa()
  })
  it('Cadastro de Período', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastrarPeriodo()
  }) 
  it('Cadastro de Horário de Trabalho', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.cadastrarHorario()
  })
  it('Adicionar Turmas', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.adicionarTurmas()
  })
  it('Horário de Aula', () => {
    // sistema.atualizarTenantAutenticado(tenantId)
    sistema.adicionarHorarioAula()
  })
})

describe('Validações Aluno', () => {
  it('Cadastrar Aluno - ' + nomeAluno, () => {
    aluno.cadastrarAluno(tenantId, `${sus}`)
  })  
  // it('Validar Dados do Aluno - ' + nomeAluno, () => {
  //   aluno.validarAluno(tenantId, `${sus}`)
  // })
  it('Cadastrar Responsável', () => {
    aluno.cadastrarResponsavelAluno(tenantId)
  })
  it('Consultar Aluno Por Nome', () => {
    aluno.consultaDeAlunoNome(tenantId)
  })
  it('Consultar Aluno Por CPF', () => {
    aluno.consultaDeAlunoCPF(tenantId)
  })
  it('Consultar Aluno Por Matrícula', () => {
    aluno.consultaDeAlunoMatricula(tenantId)
  })
  it('Consultar Aluno Por Responsável' , () => {
    aluno.consultaDeAlunoResponsavel(tenantId)
  })
  it('Cadastrar aluno 2 - ' + nomeAluno2, () => {
    aluno.cadastrarAluno2(tenantId, `${suss}`)
  })    
  it('Liberar acesso do APP ao responsável', () => {
    aluno.consultaDeAlunoResponsavel(tenantId)
    aluno.acessoResponsavelApp()
  })
  it('Acesso do responsável ao APP', () => {
    aluno.loginResponsavel()
  })
  it('Vincular Responsável Existente no aluno - alunoNome2', () => {
    aluno.vincularResponsavelAluno(tenantId)
  })
  it('Vínculo de tipos diferentes de responsável', () => {
    aluno.consultarAluno(tenantId)
    aluno.vinculoResponsavel()
  })
  it('Alocar Aluno', () => {
    aluno.alocarAluno(tenantId)
  })  
  it('Imprimir Declaração de Matrícula', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)    
    aluno.imprimirRelatorioComprovanteMatricula(tenantId)
  })
  it('Imprimir Declaração de Frequência', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)        
    aluno.imprimirRelatorioComprovanteFrequência(tenantId)
  })
  it('Imprimir Declaração de Pré-Matrícula', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioComprovantePreMatricula(tenantId)
  })
  it('Imprimir Ficha do Aluno', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioFichaAluno(tenantId)
  })
  it('Imprimir Ficha Individual', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioFichaIndividual(tenantId)
  })
  it('Imprimir Ficha Médica', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)       
    aluno.imprimirRelatorioFichaMedica(tenantId)
  })
  it('Remanejar Aluno', () => {
    aluno.remanejarAluno(tenantId)
  })
  it('Reclassificar Aluno', () => {
    aluno.reclassificarAluno(tenantId)
  })
  it('Alocar 2º Aluno', () => {
    aluno.alocarAluno2(tenantId)
  })
  it('Criar Login Portal do Aluno', () => {
    aluno.loginAluno2(tenantId)
  })
  it('Busca Unificada - Por Nome', () => {
    aluno.buscaUnificadaNome(tenantId)
  })
  it('Busca Unificada - Por CPF', () => {
    aluno.buscaUnificadaCPF(tenantId)
  })
  it('Busca Unificada - Por SUS', () => {
    aluno.buscaUnificadaSUS(tenantId, `${suss}`)
  })
  it('Busca Unificada - Por RG', () => {
    aluno.buscaUnificadaRG(tenantId)
  })
  it('Busca Unificada - Por Matrícula', () => {
    aluno.buscaUnificadaMatric(tenantId)
  })
  it('Lançamento de Notas para Aluno', () => {
    aluno.lancarNotasAluno(tenantId)
  })
  it('Lançamento de Notas para Aluno2', () => {
    aluno.lancarNotasAluno2(tenantId)
  })
  it('Desalocar Aluno 1 - Excluindo histórico', () => {
    aluno.desalocarAluno(tenantId)
  })
  it('Desalocar Aluno 2 - Mantendo histórico', () => {
    aluno.desalocarAluno2(tenantId)
  })
})

describe('Validações de Movimentações de Matrículas', () => {
  it('Status Transferido', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.matriculaTransferido(tenantId)
  })
  it('Estornar Transferência', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Desistente', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.matriculaDesistente(tenantId)
  })
  it('Estornar Desistente', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Cancelado', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.matriculaCancelado(tenantId)
  })
  it('Estornar Cancelado', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Evadido', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.matriculaEvadido(tenantId)
  })
  it('Estornar Evadido', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Falecido', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.matriculaFalecido(tenantId)
  })
  it('Estornar Falecido', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.estornar(tenantId)
  })
  it('Status Concluído', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.matriculaFalecido(tenantId)
  })
  it('Estornar Concluído', () => {
    // aluno.atualizarAlunoAutenticado(alunoId)
    aluno.estornar(tenantId)
  })
})

describe('Validações Colaboradores', () => {
  it('Cadastrar Colaborador - ' + nomeColaborador , () => {
    colaborador.cadastroDeColaborador(tenantId)
  })    
  it('Cadastrar Contrato do Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.cadastrarContratoColaborador(tenantId)
  })
  it('Consulta de Colaborador - Por Nome', () => {
    colaborador.consultaColaboradorNome(tenantId)
  })  
  it('Consulta de Colaborador - Por Matrícula', () => {
    colaborador.consultaColaboradorMatricula(tenantId)
  })    
  it('Consulta de Colaborador - Por CPF', () => {
    colaborador.consultaColaboradorCpf(tenantId)
  })    
  it('Afastar Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.afastarColaborador(tenantId)
  })  
  it('Rescindir Contrato', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.rescindirContrato(tenantId)
  })  
  it('Cadastrar Diretriz Administrativa', () => {
    colaborador.cadastrarDiretrizAdministrativa(tenantId)
  })  
  it('Modulação Administrativa', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.modulacaoAdministrativa(tenantId)
  })  
  it('Modulação Magistério', () => {
    colaborador.modulacaoMagisterio(tenantId)
  })  
  it('Gerar Folha de Ponto', () => {
    colaborador.gerarFolha(tenantId)
  })  
  it('Imprimir Folha de Ponto', () => {
    colaborador.imprimirFolha(tenantId)
  })  
  it('Criar Login de Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.criarLoginColaborador(tenantId)
  })  
  it('Login de Colaborador', () => {
    // colaborador.atualizarColaboradorAutenticado(colaboradorId)
    colaborador.loginColaborador()
  })  
})

describe ('Validações Relatórios', () => {
  // it('Gerar Lista de Alunos', () => {
  //   relatorio.listaDeAlunos(tenantId)
  // })
})

describe ('Definições Iniciais', () => {
  // it('Adicionar Unidade de Medida', () => {
  //   sistema.adicionarUnidadeDeMedida(tenantId)
  // })
})

describe('Validações Alimentação Escolar', () => {
  // it('Adicionar Alimento', () => {
  //   sistema.adicionarAlimento(tenantId)
  // })
})