// --- Exercício 1: Classe Funcionario ---
class Funcionario {
    constructor(id, nome, idade, cargo, salario) {
        this._id = id;
        this._nome = nome;
        this._idade = idade;
        this._cargo = cargo;
        this._salario = salario;
    }

    // Métodos get
    get id() { return this._id; }
    get nome() { return this._nome; }
    get idade() { return this._idade; }
    get cargo() { return this._cargo; }
    get salario() { return this._salario; }

    // Métodos set
    set nome(novoNome) { this._nome = novoNome; }
    set idade(novaIdade) { this._idade = novaIdade; }
    set cargo(novoCargo) { this._cargo = novoCargo; }
    set salario(novoSalario) { this._salario = novoSalario; }

    // Método toString
    toString() {
        return `ID: ${this._id}, Nome: ${this._nome}, Idade: ${this._idade}, Cargo: ${this._cargo}, Salário: R$ ${this._salario.toFixed(2)}`;
    }
}

// Espera o HTML carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // --- Variáveis Globais ---
    let listaFuncionarios = [];
    let proximoId = 1;
    let idEmEdicao = null;

    // --- Referências do DOM ---
    const form = document.getElementById('formFuncionario');
    const inputId = document.getElementById('funcionarioId');
    const inputNome = document.getElementById('nome');
    const inputIdade = document.getElementById('idade');
    const inputCargo = document.getElementById('cargo');
    const inputSalario = document.getElementById('salario');
    const btnSubmit = document.getElementById('btnSubmit');
    const tabelaBody = document.getElementById('tabelaFuncionariosBody');
    const reportsOutput = document.getElementById('reportsOutput');

    // --- Exercício 1 e 2: Funções Principais (Cadastro, Listagem) ---
    
    /**
     * Renderiza a tabela de funcionários no HTML
     */
    function renderizarTabela() {
        tabelaBody.innerHTML = ''; // Limpa a tabela

        // Exercício 3: Usando for..of
        for (const func of listaFuncionarios) {
            const tr = document.createElement('tr');
            
            tr.innerHTML = `
                <td>${func.nome}</td>
                <td>${func.idade}</td>
                <td>${func.cargo}</td>
                <td>R$ ${func.salario.toFixed(2)}</td>
                <td>
                    <button class="btn-acao btn-editar">Editar</button>
                    <button class="btn-acao btn-excluir">Excluir</button>
                </td>
            `;

            // --- Exercício 2 e 3: Eventos de Excluir e Editar ---

            // Usando função anônima tradicional
            tr.querySelector('.btn-editar').onclick = function() {
                carregarParaEdicao(func.id);
            };

            // Usando arrow function (função lambda)
            tr.querySelector('.btn-excluir').onclick = () => {
                excluirFuncionario(func.id);
            };

            tabelaBody.appendChild(tr);
        }
    }

    /**
     * Limpa o formulário e reseta o modo de edição
     */
    function resetarFormulario() {
        form.reset();
        idEmEdicao = null;
        inputId.value = '';
        btnSubmit.textContent = 'Cadastrar';
    }

    // --- Exercício 3: Evento de Submit com Função Anônima (Arrow Function) ---
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página

        // Pega os valores do formulário
        const nome = inputNome.value;
        const idade = parseInt(inputIdade.value);
        const cargo = inputCargo.value;
        const salario = parseFloat(inputSalario.value);

        if (idEmEdicao) {
            // --- Modo Edição (Exercício 2) ---
            
            // Exercício 3: Busca com arrow function (find)
            const func = listaFuncionarios.find(f => f.id === idEmEdicao);

            if (func) {
                // Atualiza usando os métodos set
                func.nome = nome;
                func.idade = idade;
                func.cargo = cargo;
                func.salario = salario;
            }

        } else {
            // --- Modo Cadastro (Exercício 1) ---
            const novoFuncionario = new Funcionario(proximoId, nome, idade, cargo, salario);
            listaFuncionarios.push(novoFuncionario);
            proximoId++;
        }

        renderizarTabela();
        resetarFormulario();
    });

    // --- Exercício 2: Funções de Edição e Exclusão ---

    /**
     * Carrega os dados de um funcionário no formulário para edição
     * @param {number} id - ID do funcionário a editar
     */
    function carregarParaEdicao(id) {
        // Exercício 3: Busca com arrow function (find)
        const func = listaFuncionarios.find(f => f.id === id);
        
        if (!func) return;

        // Preenche o formulário
        inputId.value = func.id;
        inputNome.value = func.nome;
        inputIdade.value = func.idade;
        inputCargo.value = func.cargo;
        inputSalario.value = func.salario;

        // Configura o modo de edição
        idEmEdicao = func.id;
        btnSubmit.textContent = 'Atualizar';
    }

    /**
     * Exclui um funcionário da lista
     * @param {number} id - ID do funcionário a excluir
     */
    function excluirFuncionario(id) {
        if (confirm('Tem certeza que deseja excluir este funcionário?')) {
            // Exercício 3: Reescreve a lista usando filter (arrow function)
            listaFuncionarios = listaFuncionarios.filter(f => f.id !== id);
            
            renderizarTabela();
            // Se o funcionário excluído era o que estava em edição, reseta o form
            if (idEmEdicao === id) {
                resetarFormulario();
            }
        }
    }

    // --- Exercício 4: Relatórios com Métodos de Array ---

    function exibirRelatorio(titulo, dados) {
        // Formata os dados para exibição
        let conteudoFormatado;
        if (Array.isArray(dados)) {
            conteudoFormatado = dados.length > 0 ? dados.join('\n') : 'Nenhum resultado encontrado.';
        } else {
            conteudoFormatado = dados.toString();
        }
        reportsOutput.innerHTML = `<strong>${titulo}:</strong>\n${conteudoFormatado}`;
    }

    // 1. Listar salários > 5000 (filter e map)
    document.getElementById('btnRelatorioSalario').onclick = () => {
        const filtro = listaFuncionarios.filter(f => f.salario > 5000);
        const resultado = filtro.map(f => `${f.nome} (Cargo: ${f.cargo}, Salário: R$ ${f.salario.toFixed(2)})`);
        exibirRelatorio("Funcionários com Salário > R$ 5000", resultado);
    };

    // 2. Média salarial (reduce)
    document.getElementById('btnRelatorioMediaSalarial').onclick = () => {
        if (listaFuncionarios.length === 0) {
            exibirRelatorio("Média Salarial", "Nenhum funcionário cadastrado.");
            return;
        }
        const totalSalarios = listaFuncionarios.reduce((acumulador, func) => acumulador + func.salario, 0);
        const media = totalSalarios / listaFuncionarios.length;
        exibirRelatorio("Média Salarial", `R$ ${media.toFixed(2)}`);
    };

    // 3. Listar cargos únicos (map e Set)
    document.getElementById('btnRelatorioCargosUnicos').onclick = () => {
        const todosOsCargos = listaFuncionarios.map(f => f.cargo);
        const cargosUnicos = [...new Set(todosOsCargos)]; // Converte o Set de volta para Array
        exibirRelatorio("Cargos Únicos na Empresa", cargosUnicos);
    };

    // 4. Lista de nomes em maiúsculo (map)
    document.getElementById('btnRelatorioNomesMaiusculos').onclick = () => {
        const nomesMaiusculos = listaFuncionarios.map(f => f.nome.toUpperCase());
        exibirRelatorio("Nomes dos Funcionários (em maiúsculo)", nomesMaiusculos);
    };

    // --- Inicialização ---
    // Adiciona alguns dados de exemplo
    listaFuncionarios.push(new Funcionario(proximoId++, 'Ana Silva', 30, 'Desenvolvedora Sênior', 7500.00));
    listaFuncionarios.push(new Funcionario(proximoId++, 'Bruno Costa', 25, 'Desenvolvedor Pleno', 5000.00));
    listaFuncionarios.push(new Funcionario(proximoId++, 'Carla Lima', 22, 'Estagiária', 1500.00));
    listaFuncionarios.push(new Funcionario(proximoId++, 'Davi Martins', 35, 'Gerente de Projetos', 10000.00));
    listaFuncionarios.push(new Funcionario(proximoId++, 'Elisa Borges', 28, 'Desenvolvedora Pleno', 5000.00));

    // Renderiza a tabela inicial
    renderizarTabela();

}); // Fim do 'DOMContentLoaded'