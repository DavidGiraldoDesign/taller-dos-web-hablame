function controlador(vista, botones) {


	var formularioIngreso = vista.getIngreso();
	var formularioRegistro = vista.getRegistro();


	vista.onIngreso = (mail, psw) => {
		console.log(mail + " " + psw);
		// var params = new URLSearchParams();
		var params = new FormData();
		params.set('mail', mail);
		params.set('psw', psw);

		fetch(`${location.origin}/ingreso`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje == "in") {
					console.log(res);
					vista.setUsuario(res.usuario);
					vista.setUsuarios(res.contactos);
					vista.setPublicaciones(res.publicaciones);
					vista.renderHome();
				} else {
					vista.renderFormulario(formularioIngreso);
				}

			});

		//vista.renderIngreso();

	};

	vista.onIrRegistro = () => {
		//vista.renderRegistro();
		vista.renderFormulario(formularioRegistro);
	};

	vista.onIrIngreso = () => {
		//vista.renderIngreso();
		vista.renderFormulario(formularioIngreso);
	};

	vista.onRegistro = (name, mail, psw) => {
		//console.log(name + " " + mail + " " + psw);

		var params = new FormData();
		params.set('name', name);
		params.set('mail', mail);
		params.set('psw', psw);

		fetch(`${location.origin}/registro`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje == "in") {
					console.log(res);
					vista.setUsuario(res.usuario);
					vista.setUsuarios(res.contactos);
					vista.setPublicaciones(res.publicaciones);
					vista.renderHome();
				}

			});

		vista.renderRegistro();

	};

	vista.onModalCreaPublicacion = () => {



	};

	vista.onUpLoad = (mail, name, titulo, contenido, photo, fecha) => {
		console.log("entra a onUpLoad()");
		var date = new Date().toString().split(" ").splice(1, 3).join(" ");
		var params = new FormData();
		params.set('mail', mail);
		params.set('date', date);
		params.set('name', name);
		params.set('titulo', titulo);
		params.set('contenido', contenido);
		params.set('photo', photo);




		fetch(`${location.origin}/upload`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje === "filesave") {
					console.log("ReFresh");
					vista.setPublicaciones(res.publicaciones);
					//vista.upDatePublicaciones(res.publicacion);
					vista.renderHome();

				}


			});

	};

	vista.onComentar = (id, name, cont) => {
		//var date = new Date().toString().split(" ").splice(1,3).join(" ");
		var params = new FormData();
		params.set('id', id);
		//params.set('date',date);
		params.set('name', name);
		params.set('cont', cont);

		fetch(`${location.origin}/updatecoment`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje === "update") {
					console.log("OnComentar: " + res.publicaciones);
					vista.setPublicaciones(res.publicaciones);
					vista.renderHome();
				}

			});

	};

	vista.onLike = (id, name, mail) => {
		var params = new FormData();
		params.set('id', id);
		params.set('name', name);
		params.set('mail', mail);
		

		fetch(`${location.origin}/updatelike`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje === "update") {
					console.log("OnComentar: " + res.publicaciones);
					vista.setPublicaciones(res.publicaciones);
					vista.renderHome();
				}

			});

	};
	
	vista.onDisLike = (id, name, mail) => {
		var params = new FormData();
		params.set('id', id);
		params.set('name', name);
		params.set('mail', mail);
	

		fetch(`${location.origin}/updatedislike`, {
				method: 'POST',
				body: params
			})
			.then((res) => res.json())
			.then((res) => {

				if (res.mensaje === "update") {
					console.log("OnComentar: " + res.publicaciones);
					vista.setPublicaciones(res.publicaciones);
					vista.renderHome();
				}

			});

	}



	vista.onReFresh = function onReFresh() {
		console.log("estoy en ReFresh");
		fetch(`${location.origin}/home`, {
				method: 'GET'
			})
			.then((res) => res.json())
			.then((res) => {
				if (res.mensaje == "ok") {
					console.log("Click onRefresh" + res.publicaciones);
					vista.setPublicaciones(res.publicaciones);
					vista.setUsuarios(res.usuarios);
					vista.renderHome();
				}
			});
	}

	vista.onLogOut = () => {
		localStorage.removeItem("localUser");
		localStorage.removeItem("localContacts");
		localStorage.removeItem("localNews");
		vista.renderFormulario(formularioIngreso);
	};




	vista.renderFormulario(formularioIngreso);

}


controlador(vista, botones);
