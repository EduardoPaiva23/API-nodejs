const app = require("express")();
const mongoose = require("mongoose");
const moment = require("moment");
const bodyparser = require("body-parser");
const ProdutoModel = require("./Models/Produto");
// const Produto = mongoose.model("Produto");

app.use(bodyparser.json());
//conectando ao bando mongo e deixando a conexão ativa (so deveria conectar se fosse usar e depois desconectar)
mongoose.connect("mongodb+srv://admin:123@cluster0-h4ia5.mongodb.net/test?retryWrites=true&w=majority", {
   useNewUrlParser: true
}, () => {
   console.log("Banco de dados conectado");

});

//Endpoints
//cadastro
app.post("/produto", async (req, res) => {
   //toda vez que tiver chamando vai criar um novo registro igual a esse
   let produto = new ProdutoModel({ nome: "Xolinha", fabricante: "XolaSystem", preco: 2 });
   //salvando o produto
   await produto.save(function (error, resultado) {
      console.log("Produto salvo", resultado);
      res.statuscode = 200;
      res.send(resultado);
   });
});

//listando todos
app.get("/produto", async (req, res) => {
   //obtendo todos os produtos
   await ProdutoModel.findById(req.query.id).exec(function (error, resultado) {
      if (error) {
         //aconteceu alguma falha
         console.log(error);
         res.statuscode = 201;
         res.send();
      } else {
         console.log(resultado);
         res.statuscode = 200;
         res.send(resultado);
      }
   });
});

//Listagem por id

app.get("/produtos", async (req, res) => {
   await ProdutoModel.find().exec(function (error, resultado) {
      if (error) {
         //aconteceu alguma falha
         console.log(error);
         res.statuscode = 201;
         res.send();
      } else {
         console.log(resultado);
         res.statuscode = 200;
         res.send(resultado);
      }
   });
})

//deletar

app.delete("/produto/", async (req, res) => {
   await ProdutoModel.findByIdAndDelete({ _id: req.query.id }).exec(function (error, resultado) {
      if (error) {
         //aconteceu alguma falha
         console.log(error);
         res.statuscode = 201;
         res.send();
      } else {
         console.log(resultado);
         res.statuscode = 200;
         res.send(resultado[0]);
      }
   });
});

app.get("/calcular", async (req, res) => {
   //receber do postman o ano de nascimento
   // 2020 - 1989 = 30
   //pegar o que passou no link req.query.
   // devolver o resultado res.send(resultado);
   function idade(ano_nascimento, mes_nascimento, dia_nascimento) {
      ano_atual = new Date;
      ano_atual = ano_atual.getFullYear();
      mes_atual = new Date().getMonth() + 1
      dia_atual = new Date().getDate()
      if (mes_atual < mes_nascimento || mes_atual == mes_nascimento && dia_atual < dia_nascimento) {
         ano_atual -= 1
      }
      return ano_atual - ano_nascimento;

   }
   res.send({ resultado: idade(req.query.ano_nascimento, req.query.mes_nascimento, req.query.dia_nascimento) });
   return resultado
});

app.get("/calcularMenor", async (req, res) => {
   hoje = new Date();
   ano_atual = hoje.getFullYear();
   mes_atual = hoje.getMonth() + 1;
   dia_atual = hoje.getDate();

   let { ano_nascimento, mes_nascimento, dia_nascimento } = req.query;
   if (mes_atual < mes_nascimento || mes_atual == mes_nascimento && dia_atual < dia_nascimento) {
      ano_atual -= 1
   }
   idade = ano_atual - ano_nascimento;

   res.send({ idade });
});

app.get("/calcularNode", async (req, res) => {
   hoje = moment();

   if (req.query.data_nascimento) {


      let dataInformada = moment(req.query.data_nascimento);
      idade = moment().diff(moment(req.query.data_nascimento), "years");
   } else {
      idade = { msg: "Informe data_nascimento" };
   }
   res.send({ idade });
});

app.listen(8080, () => {
   console.log("API rodando!");
})