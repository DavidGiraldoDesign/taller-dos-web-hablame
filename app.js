// requerimos los modulos
var express = require("express"),
	bodyparser = require("body-parser"),
	mongo = require("mongodb"),
	fileUpload = require("express-fileupload"),
	test = require("assert"),
	ObjectID = require('mongodb').ObjectID;

//================================================
// Middlewares
var app = express();
app.use(fileUpload());
app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());

//================================================

var url = 'mongodb://josedavidgm1995:Lespaul#1952@clusterdesign-shard-00-00-kmsdl.mongodb.net:27017,clusterdesign-shard-00-01-kmsdl.mongodb.net:27017,clusterdesign-shard-00-02-kmsdl.mongodb.net:27017/redsocial?ssl=true&replicaSet=ClusterDesign-shard-0&authSource=admin';

var mongoClient = mongo.MongoClient;

var db = null // global variable to hold the database
var usuarios = null; // global variable to hold the collection
var that = this;
//date.toString().split(" ").splice(1,3).join(" ");

mongoClient.connect(url, (err, database) => {
	if (!err) {

		console.log("Database connected!");
		db = database;
		/*
		db.createCollection("usuarios", function (err, res) {
			if (err) throw err;
			console.log("Collection Usuarios created!");
		});
		
		db.createCollection("publicaciones", function (err, res) {
			if (err) throw err;
			console.log("Collection Publicaciones created!");
		});

*/
		/*
				var publicacionEjemplo = {
					date: "Oct 31 2017",
					autor_mail: "josedavidgm1995@gmail.com",
					autor_name: "Jose David",
					titulo: "¿Donde?",
					contenido: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec auctor nisi. Ut ut purus egestas, tempus nulla feugiat, molestie nulla. Aliquam erat volutpat.",
					ruta_foto: "./public/fotos/received_10154988975683314.jpeg",
					likes: [
						{
							name: "Camilo Montoya",
							mail: "cajomo@gmail.com"
								},
						{
							name: "Nathalia Barona",
							mail: "nb@gmail.com"
								},
						{
							name: "Arturo Gomez",
							mail: "gomezardi@gmail.com"
								},

							],
					comentarios: [{
						name: "Camilo Montoya",
						contenido: "Ut nec auctor nisi. Ut ut purus egestas, tempus nulla feugiat, molestie nulla.",
							}, {
						name: "Arturo Gomez",
						contenido: "Hey :v, Ut nec auctor nisi. Ut ut purus egestas, tempus nulla feugiat, molestie nulla.",
							}],

				};

				db.collection("publicaciones").insertOne(publicacionEjemplo, function (err, res) {
					if (err) throw err;
					console.log("Number of publicaciones inserted: " + res.insertedCount);
					db.close();
				});
		*/

		/*
						var primerosusuarios = [
							{
								name: "Jose David",
								mail: "josedavidgm1995@gmail.com",
								psw: "p"
									}, {
								name: "Camilo Montoya",
								mail: "cajomo@gmail.com",
								psw: "p"
									}, {
								name: "Arturo Gomez",
								mail: "gomezardi@gmail.com",
								psw: "p"
									}, {
								name: "Nathalia Barona",
								mail: "nb@gmail.com",
								psw: "p"
									}
								        ];



						
						db.collection("usuarios").insertMany(primerosusuarios, function (err, res) {
							if (err) throw err;
							console.log("Number of users inserted: " + res.insertedCount);
							db.close();
						});

						/*/
		/*


				db.collection("publicaciones").deleteMany({}, function (err, obj) {
					if (err) throw err;
					console.log(obj.result.n + " publicaciones borradas");
					db.close();
				});

				db.collection("usuarios").deleteMany({}, function (err, obj) {
					if (err) throw err;
					console.log(obj.result.n + " usuarios borrados");
					db.close();
				});

		/*/
		/*
				db.collection("usuarios").find({}).toArray(function (err, result) {
					console.log("================================== retorna todos los usuarios");
					if (err) throw err;
					console.log(result);
				});

				db.collection("publicaciones").find({}).toArray(function (err, result) {
					console.log("================================== retorna todas las publicaciones");
					if (err) throw err;
					console.log(result);
				});
		*/
	}
});




app.get("/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});


app.get("/home", function (req, res) {

	var noIncluir = {
		psw: false
	}

	db.collection("usuarios").find({}, noIncluir).toArray((err, users) => {
		if (err) throw err;

		db.collection("publicaciones").find({}).toArray((error, news) => {
			if (error) throw error;
			res.json({
				mensaje: 'ok',
				usuarios: users,
				publicaciones: news
			});
		});


	});


});


app.post("/upload", (req, res) => {
	if (req.files) {
		//console.log("LLega el archivo: " + req.files + " desde el correo: " + req.body.mail);
		console.log(req.files);
		var mail = req.body.mail;
		var name = req.body.name;
		var titulo = req.body.titulo;
		var contenido = req.body.contenido;
		var photo = req.files.photo;
		var fecha = req.body.date;

		var photoName = photo.name;

		photo.mv("./public/fotos/" + photoName, (err) => {
		//photo.mv("./fotos/" + photoName, (err) => {
			if (err) {
				res.json({
					mensaje: 'error',
					error: err
				});

			} else {
				var nuevaPublicacion = {
					date: fecha,
					autor_mail: mail,
					autor_name: name,
					titulo: titulo,
					contenido: contenido,
					ruta_foto: "./public/fotos/" + photoName,
					likes: [],
					comentarios: []
				}
				db.collection("publicaciones").insertOne(nuevaPublicacion, (err, result) => {
					if (err) throw err;
					console.log("se agregó una nueva publicacion");
					db.collection("publicaciones").find({}).toArray((error, news) => {
						if (error) throw error;
						res.json({
							mensaje: 'filesave',
							publicaciones: news,

						});
					});

				});
			}

		});
		
		
		
		
	}
});

app.post("/updatecoment", (req, res) => {

	var id = req.body.id;
	var user = req.body.name;
	var cont = req.body.cont;

	var buscar = {
		_id: new ObjectID(id.toString())
	}

	var coment = {
		name: user,
		contenido: cont
	}

	var nuevoComent = {

		$push: {
			comentarios: coment
		}

	}

	db.collection("publicaciones").updateOne(buscar, nuevoComent, (err, result) => {
		if (err) throw err;
		//	console.log(id + " Estado de la actulziacion" + result);

		db.collection("publicaciones").find({}).toArray((error, news) => {
			if (error) throw error;
			res.json({
				mensaje: 'update',
				publicaciones: news
				//publicaciones: result
			});
		});

	});

});

app.post("/updatelike", (req, res) => {

	var id = req.body.id;
	var userName = req.body.name;
	var userMail = req.body.mail;
	var hit = req.body.hit;

	var buscar = {
		_id: new ObjectID(id.toString()),

	}

	var like = {
		name: userName,
		mail: userMail
	}

	var insertarLike = {

		$addToSet: {
			likes: like
		}
	}

	db.collection("publicaciones").updateOne(buscar, insertarLike, (err, result) => {
		if (err) throw err;
		//console.log(result);

		db.collection("publicaciones").find({}).toArray((error, news) => {
			if (error) throw error;

			res.json({
				mensaje: 'update',
				publicaciones: news
			});
		});


	});



});

app.post("/updatedislike", (req, res) => {

	var id = req.body.id;
	var userName = req.body.name;
	var userMail = req.body.mail;
	var hit = req.body.hit;

	var buscar = {
		_id: new ObjectID(id.toString()),

	}

	var like = {
		name: userName,
		mail: userMail
	}

	var retirarLike = {

		$pull: {

			likes: {
				name: userName,
				mail: userMail
			}

		}
	}

	db.collection("publicaciones").updateOne(buscar, retirarLike, (err, result) => {
		if (err) throw err;
		console.log(result);

		db.collection("publicaciones").find({}).toArray((error, news) => {
			if (error) throw error;

			res.json({
				mensaje: 'update',
				publicaciones: news
			});
		});


	});



});


app.post("/ingreso", (req, res) => {

	var targetUser = {
		mail: req.body.mail,
		psw: req.body.psw
	};

	var noIncluir = {
		psw: false
	}

	db.collection("usuarios").find(targetUser).toArray((err, coincidencias) => {
		if (err) throw err;
		if (coincidencias.length > 0) {

			db.collection("usuarios").find({}, noIncluir).toArray((err, result) => {
				if (err) throw err;


				db.collection("publicaciones").find({}).toArray((error, news) => {
					if (error) throw error;

					res.json({
						mensaje: 'in',
						usuario: coincidencias[0],
						contactos: result,
						publicaciones: news
					});

				});

			});

		} else {
			res.json({
				mensaje: 'usuario o contraseña incorrecto'
			});
		}
	});

});

app.post("/registro", (req, res) => {
	var targetUser = {
		mail: req.body.mail
	};
	db.collection("usuarios").find(targetUser).toArray((err, coincidencias) => {
		if (!err && coincidencias.length == 0) {
			var usuarioEntrante = {
				name: req.body.name,
				mail: req.body.mail,
				psw: req.body.psw
			};
			db.collection("usuarios").insertOne(usuarioEntrante, (err, result) => {
				if (err) {
					throw err;
					res.json({
						mensaje: 'err'
					});
				} else {
					var noIncluir = {
						psw: false
					}
					db.collection("usuarios").find({}, noIncluir).toArray((err, contacts) => {
						if (err) throw err;
						db.collection("publicaciones").find({}).toArray((error, news) => {
							if (error) throw error;
							res.json({
								mensaje: 'in',
								usuario: usuarioEntrante,
								contactos: contacts,
								publicaciones: news
							});

						});

					});
				}
			});
		} else {
			res.json({
				mensaje: "out"
			});

		}

	});
});

app.use("/public", express.static("public"));
app.use("/js", express.static('public/js'));
app.use("/fotos", express.static('public/fotos'));
app.use("/imgs", express.static('public/imgs'));
app.use("/css", express.static('public/css'));

//app.listen(8081);
app.listen(process.env.PORT || 5000);
