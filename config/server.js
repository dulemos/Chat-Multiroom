//importar o módulo do framework express
var express = require('express');

//importar o módulo do consign
var consign = require('consign');

//importar o módulo body-parser
var bodyParser = require('body-parser');

//importar o módulo do express validator
var expressValidator = require('express-validator');

//Iniciar o Objeto do express

var app = express();

//configurar EJS como engine de View
app.set('view engine', 'ejs');
app.set('views', './app/views');

//configurar a propriedade express.static
app.use(express.static('./app/public'));

//configurar o middleware body-parser
app.use(bodyParser.urlencoded({extend: true}));

// configurar o middleware express-validator
app.use(expressValidator());

//efetua o autoload das rotas, models e controllers para o objeto app
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);

//exportar o objeto app
module.exports = app;