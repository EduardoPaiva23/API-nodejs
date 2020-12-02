const mongoose = require("mongoose");
//definindo como é o produto
let ProdutoShema = new mongoose.Schema({
    nome: { type: String },
    fabricante: { type: String },
    preco: { type: Number }
});

let Produto = mongoose.model("Produto", ProdutoShema);
module.exports = Produto; 