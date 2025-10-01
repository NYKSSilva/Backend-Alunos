const API = 'http://localhost:3000/alunos'

const urlParametro = new URLSearchParams(window.location.search)
const id = urlParametro.get("id")

console.log("Id do aluno:", id)

const inputID = document.getElementById("id")
inputID.value = id


async function carregarAluno() {
        if(!id){
            alert("Nenhum aluno selecionado para a edição")
            return
        }
        const resposta = await fetch(`${API}/${id}`);
        const ALUNO = await resposta.json();
        console.log(ALUNO)

        document.getElementById("nome").value = ALUNO[0].nome;
        document.getElementById("cpf").value = ALUNO[0].cpf;
        document.getElementById("cep").value = ALUNO[0].cep;
        document.getElementById("uf").value = ALUNO[0].uf;
        document.getElementById("rua").value = ALUNO[0].rua;
        document.getElementById("numero").value = ALUNO[0].numero;
        document.getElementById("complemento").value = ALUNO[0].complemento;

}
async function salvar(e) {
    e.preventDefault();
    console.log("Salvando aluno");
    const nome = inputNome.value.trim();
    const cpf = inputCpf.value.trim();
    const cep = inputCep.value.trim();
    const uf = inputUf.value.trim();
    const rua = inputRua.value.trim();
    const numero = inputNumero.value.trim();
    const complemento = inputComplemento.value.trim();
    if(!nome && !cpf && !numero){
        alert("Por gentileza preencha os campos obrigatorios")
    }
    const novoAluno = {
        nome, cpf, cep, uf, rua, numero, complemento
    }
   
   
    try {
        const requisicao = await fetch(API,{
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: novoAluno? JSON.stringify(novoAluno): undefined
    })
        requisicao.status === 201? console.log(requisicao.json()): console.log("erro na requisição")
    } catch (error) {
        console.error(error)
    }
    
    carregarTabela()
}

const formEdicao = document.getElementById("form-edicao");

formEdicao.addEventListener("submit", async function(e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const cpf = document.getElementById("cpf").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const uf = document.getElementById("uf").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const complemento = document.getElementById("complemento").value.trim();

    const alunoAtualizado = { nome, cpf, cep, uf, rua, numero, complemento };

    const resposta = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alunoAtualizado)
    });

    if (resposta.ok) {
        alert("Aluno atualizado com sucesso!");
    } else {
        alert("Erro ao atualizar aluno!");
    }
});

carregarAluno()

formEdicao.addEventListener("button", salvar);
    const btnLimpar = document.getElementById("Limpar");
    if (btnLimpar) {
        btnLimpar.addEventListener("click", () => {
            formAluno.reset();
        });
}