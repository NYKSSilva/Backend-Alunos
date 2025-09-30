const API = 'http://localhost:3000/alunos'

const inputNome = document.getElementById("nome")
const inputCpf = document.getElementById("cpf")
const inputCep = document.getElementById("cep")
const inputUf = document.getElementById("uf")
const inputRua = document.getElementById("rua")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")
const formAluno = document.getElementById("form-aluno")


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

formAluno.addEventListener("submit",salvar)
