class Despesa {

    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }

        return true;
    }

}

class BD {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getProximoID() {
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1; //null
    }

    gravar(d) {
        let id = this.getProximoID();
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id', id);
    }

    recuperarTodosRegistros() {

        let despesas = Array();
        let id = localStorage.getItem('id');

        for (let i = 1; i <= id; i++) {
            let despesa = JSON.parse(localStorage.getItem(i));

            if (despesa === null) {
                continue
            }

            despesas.push(despesa);
        }

        return despesas;
    }
}

let bd = new BD;

function cadastrarDespesa() {

    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);

    if (despesa.validarDados()) {
        bd.gravar(despesa);
        $("#modalRegistraDespesa").modal('show');
        document.getElementById('modalHeader').className = 'modal-header text-success';
        document.getElementById('exampleModalLabel').innerHTML = 'Registro Inserido com Sucesso!';
        document.getElementById('modalBody').innerHTML = 'A despesa foi cadastrada com sucesso!';
        document.getElementById('buttonVoltar').className = 'btn btn-success';
        document.getElementById('buttonVoltar').innerHTML = 'Voltar';

    } else {
        $("#modalRegistraDespesa").modal('show');
        document.getElementById('modalHeader').className = 'modal-header text-danger';
        document.getElementById('exampleModalLabel').innerHTML = 'Erro na Gravação';
        document.getElementById('modalBody').innerHTML = 'Existem campos com informações incorretas!';
        document.getElementById('buttonVoltar').className = 'btn btn-danger';
        document.getElementById('buttonVoltar').innerHTML = 'Voltar e corrigir';

    }
}

function carregaListaDespesas() {
    let despesas = Array();
    despesas = bd.recuperarTodosRegistros();

    let listaDespesas = document.getElementById("listaDespesas");

    despesas.forEach((d) => {
        console.log(d);

        let linha = listaDespesas.insertRow();
        linha.insertCell(0).innerHTML = `${d['dia']}/${d['mes']}/${d['ano']}`;

        switch (d['tipo']) {
            case '1':
                d['tipo'] = 'Alimentação';
                break;
            case '2':
                d['tipo'] = 'Educação';
                break;
            case '3':
                d['tipo'] = 'Lazer';
                break;
            case '4':
                d['tipo'] = 'Saúde';
                break;
            case '5':
                d['tipo'] = 'Transporte';
                break;
        }

        linha.insertCell(1).innerHTML = d['tipo'];
        linha.insertCell(2).innerHTML = d['descricao'];
        linha.insertCell(3).innerHTML = d['valor'];

    });
}
