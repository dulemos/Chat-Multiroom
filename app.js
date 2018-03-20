//importar as configurações do servidor
var app = require('./config/server');

//parametrizar a porta de escuta
var server = app.listen(80, function(){
	console.log('servidor online');
})

var io = require('socket.io').listen(server);

app.set('io', io);

//criar a conexão por websocket
io.on('connection', function(socket){
	console.log('Usuário Conectou');


	socket.on('disconnect', function(socket){
		console.log('Usuário desconectou!!');
	});

	socket.on('msgParaServidor', function(data){

		//dialogo
		socket.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		socket.broadcast.emit(
			'msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem}
		);

		//participantes
		if(parseInt(data.apelido_atualizado) == 0){
			socket.emit(
					'participantesParaCliente', 
					{apelido: data.apelido}
				);
	
			socket.broadcast.emit(
				'participantesParaCliente', 
				{apelido: data.apelido}
			);
		}

	});
});