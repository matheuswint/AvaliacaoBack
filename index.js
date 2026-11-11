const express = require('express');
const app = express();
 
app.use(express.json());
 
const db = [];
 
let id = 1;

app.post('/api/v1/tarefa', (req, res) => {
    const { descricao, data } = req.body;
 
    if (!descricao || !data) {
        return res.status(400).send({ message: 'Preencha os campos.' });
    }
 
    const tarefa = {
        id: id++,
        descricao: descricao,
        data: data,
        concluido: false
    };
 
    db.push(tarefa);
 
    res.status(201).send(tarefa);
});
 
app.get('/api/v1/tarefa', (req, res) => {
    res.status(200).send(db);
});

app.get('/api/v1/tarefa/pendente', (req, res) => {
    const tarefas = db.filter(p => p.concluido == false);
 
    res.status(200).send(tarefas);
});

app.get('/api/v1/tarefa/:id', (req, res) => {
    const { id } = req.params;
 
    const tarefa = db.find(p => p.id == id);
 
    if (!tarefa) {
        return res.status(404).send({ message: 'Tarefa não achada' });
    }
 
    res.status(200).send(tarefa);
});

app.put('/api/v1/tarefa/:id', (req, res) => {
    const { id } = req.params;
    const { descricao, data } = req.body;
 
    const tarefa = db.find(p => p.id == id);
 
    if (!tarefa) {
        return res.status(404).send({ message: 'Tarefa não achada.' });
    }
 
    if (!descricao || !data) {
        return res.status(400).send({ message: 'Informar a descrição e a data.' });
    }
 
    tarefa.descricao = descricao;
    tarefa.data = data;
 
    res.status(200).send(tarefa);
});

app.put('/api/v1/tarefa/:id/alternar', (req, res) => {
    const { id } = req.params;
 
    const tarefa = db.find(p => p.id == id);
 
    if (!tarefa) {
        return res.status(404).send({ message: 'Tarefa não achada.' });
    }
 
    tarefa.concluido = !tarefa.concluido;

    //ele muda o boolean para dizer que a tarefa foi concluida entao ele muda de false para true
 
    res.status(200).send(tarefa);
});

app.delete('/api/v1/tarefa/:id', (req, res) => {
    const { id } = req.params;
 
    const index = db.findIndex(p => p.id == id);
 
    if (index == -1) {
        return res.status(404).send({ message: 'Tarefa não achada.' });
    }
 
    db.splice(index, 1);
 
    res.status(200).send({ message: 'Tarefa excluída' });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});