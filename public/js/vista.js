var vista = {

	body: document.querySelector("body"),

	usuario: null,
	usuarios: null,
	publicaciones: null,
	localUse: false,

	setUsuario: function setUsuario(ref) {

		this.usuario = ref;
		localStorage.setItem("localUser", JSON.stringify(this.usuario));
	},

	setUsuarios: function setUsuarios(ref) {
		this.usuarios = ref;
		localStorage.setItem("localContacts", JSON.stringify(this.usuarios));
	},

	setPublicaciones: function setPublicaciones(ref) {
		this.publicaciones = ref;
		localStorage.setItem("localNews", JSON.stringify(ref));
	},
	//------------------------------------------------------------------------------------- metodos de ingreso
	getIngreso: function getIngreso() {

		var section = document.createElement("div");
		section.id = "ingreso";
		section.innerHTML = `
			  
			  <form class="row" action="/ingreso" method="post">
			
				<input class="col-12 col-l-12 col-m-12 col-s-12" id="e" type="email" placeholder="Correo" name="mail" required>
				
				<input input class="col-12 col-l-12 col-m-12 col-s-12" id="p" type="password" placeholder="Contraseña" name="psw" required>

				<button class="col-12 col-l-12 col-m-12 col-s-12" id="ingreso-btn" type="submit">Iniciar sesión</button>

			</form>
			<button class="col-12 col-l-12 col-m-12 col-s-12" id="ir-registro">No estoy registrado</button>`;
		var that = this;
		//<button class="col-12 col-l-12 col-m-12 col-s-12" id="ingreso-btn" type="submit">Iniciar sesión</button>
		section.querySelector("#ir-registro").addEventListener("click", function (e) {
			that.onIrRegistro();
		});

		var inputs = section.querySelectorAll("input");
		var form = section.querySelector("form");

		/*section.querySelector("#ingreso-btn").addEventListener("click", function (e) {
			e.preventDefault();
			that.onIngreso(inputs[0].value, inputs[1].value);
		});*/

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			that.onIngreso(inputs[0].value, inputs[1].value);
		});

		return section;

	},

	getRegistro: function getRegistro() {

		var section = document.createElement("div");
		section.id = "registro";
		section.innerHTML = `
			  
			  <form action="/registro" method="post">
								
				<input class="col-12 col-l-12 col-m-12 col-s-12"  type="text" placeholder="Nombre y apellido" name="name" required>
				<input class="col-12 col-l-12 col-m-12 col-s-12"  type="email" placeholder="Correo" name="mail" required>
			    <input class="col-12 col-l-12 col-m-12 col-s-12"  type="password" placeholder="Contraseña" name="psw" required>
				<button id="registrarme" class="col-12 col-l-12 col-m-12 col-s-12" type="submit">Registrarme</button>

			</form>
			<button class="col-12 col-l-12 col-m-12 col-s-12" id="registro-btn" >Ya estoy registrado</button>`;
		var that = this;

		section.querySelector("#registro-btn").addEventListener("click", function (e) {
			that.onIrIngreso();
		});

		var that = this;
		var inputs = section.querySelectorAll("input");
		var form = section.querySelector("form");

		form.addEventListener("submit", (e) => {
			e.preventDefault();
			that.onRegistro(inputs[0].value, inputs[1].value, inputs[2].value);
		});

		return section;


	},

	//------------------------------------------------------------------------------------- FIN metodos de ingreso
	//------------------------------------------------------------------------------------- metodos de formulario


	getFormulario: function getFormulario(tipoFormulario) {
		var aside = document.createElement("aside");
		aside.className = "col-3 col-l-3 col-m-4 col-s-12";
		aside.id = "formulario";
		aside.innerHTML = `<h1>Hablame</h1>
				<p id="copy" >Comunidad de aprendizaje cultural para una mejor experiencia de intercambio académico</p>
				<div id="tipoForm" class="row col-12 col-l-12 col-m-12 col-s-12 "></div>`;

		aside.querySelector("#tipoForm").appendChild(tipoFormulario);

		var btnAppStores = document.createElement("div")

		btnAppStores.innerHTML = `
		                <div class="row">
					        <a class="col-6 col-l-6 col-m-12 col-s-12"><img class="app" alt="appstore" src="imgs/appstore.png"></a>
					        <a class="col-6 col-l-6 col-m-12 col-s-12"><img class="app" alt="playstore" src="imgs/playstore.png"></a>
				        </div> `;

		aside.appendChild(btnAppStores);

		return aside;
	},


	getPaginaIngreso: function getPaginaIngreso() {
		var section = document.createElement("section");
		section.className = "row col-12";

		section.innerHTML = `
	                <div id="pag-ingreso" class="row col-8 col-l-10 col-m-12 col-s-12">
	                
	                    <article class="col-9 col-l-9 col-m-8" id="portada">
				            <img alt="intro" src="imgs/fondo.png">
		            	</article>
		            	
		            	
		            </div>`;

		return section;

	},

	getFooter: function getFooter() {
		var footer = document.createElement("footer");
		footer.className = "row col-12 col-l-12 col-m-12 col-s-12";
		footer.innerHTML = `
                            <nav class="row col-12">
			                    <ul id="menu-admi" class="col-6 col-l-7 col-m-10 col-s-12">
                    				<li class="col-2 col-l-2 col-m-6 col-s-12">Contacto</li>
                    				<li class="col-2 col-l-2 col-m-6 col-s-12">Estudiantes</li>
                    				<li class="col-2 col-l-2 col-m-6 col-s-12">Profesores</li>
                    				<li class="col-2 col-l-2 col-m-6 col-s-12">Universidades</li>
                    				<li class="col-2 col-l-2 col-m-6 col-s-12">Idioma</li>
			                    </ul>
			                    <span class="col-2 col-l-2 col-m-12 col-s-12">© 2017 HABLAME</span>
		                    </nav>`;
		return footer;
	},
	//------------------------------------------------------------------------------------- FIN metodos de formulario
	//------------------------------------------------------------------------------------- Botonoes svg	
	//-------------------------------------------------------------------------------------

	getBtnHome: function getBtnHome() {
		var button = document.createElement("button");
		button.className = "btn-menu";
		button.id = "home-btn";
		button.innerHTML = `<svg id="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 503.87 448.52">
        
                            <g id="Capa_2" data-name="Capa 2"><g id="Capa_4" data-name="Capa 4">
                                
                                <path class="off" d="M454.44,161.64h0L237.46,2.21A11.37,11.37,0,0,0,226.53.8a11.35,11.35,0,0,0-4,1.82L4.84,161.09a11.38,11.38,0,0,0-2.77,15.86c3.61,5.14,11,4.81,16,4.81,11.09,0,8.9.08,9,0H49.35V408.46H191.43V276.86c0-33.56,26-37.18,37.18-37.18,11.37,0,37.79,3.64,37.79,37.79v131H410.91V181.75h27.2c7.65,0,15,.87,18.77-4.2A11.38,11.38,0,0,0,454.44,161.64Z"/>
                                
                                </g></g>
                            
                            </svg>`;
		return button;
	},

	getBtnPreguntar: function getBtnPreguntar() {
		var button = document.createElement("button");
		button.className = "btn-menu";
		button.id = "pregunta-btn";
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 485.67 495.41">
                                
                           <g id="Capa_2" data-name="Capa 2"><g id="Capa_3" data-name="Capa 3">
                               
                               <path class="off" d="M395.51,297.81h0A204.73,204.73,0,0,0,417.17,206c0-113.59-92.41-206-206-206s-206,92.41-206,206A205,205,0,0,0,52.1,336.74c-8.44,15.54-25.47,42.88-40.22,50.6-10,5.22-12,11.89-11.87,16.57,0,2.88,1.14,10,10,14.27,5.07,2.42,12.54,3.63,21.4,3.63a134.24,134.24,0,0,0,27.77-3.21,170.83,170.83,0,0,0,62.09-27.26,205.74,205.74,0,0,0,84.06,20.55V345.14A25.13,25.13,0,0,1,188,337.23a27.3,27.3,0,0,1-7.58-19.64q0-12.06,7.58-19.64a25.71,25.71,0,0,1,17.33-7.57V260.45A17.57,17.57,0,0,1,191.92,237l.08-.2a59.17,59.17,0,0,1,9.63-16.88q5.7-6.68,15-15.68,11-10,16.2-17.4T238,168.39q.08-12.16-7.16-18.16t-20.33-6q-23.05,0-28.8,19.6a17.91,17.91,0,0,1-17.41,12.66h-5.93a17.75,17.75,0,0,1-17.28-21.4q4.58-21,18.43-34.59,20.33-20,55.48-20,33.73,0,53.2,15.5t19.42,44.11a56,56,0,0,1-4.48,23.09,61.89,61.89,0,0,1-10.85,16.89,225.72,225.72,0,0,1-17.06,16.2Q241.1,228.7,234.38,238a33.92,33.92,0,0,0-5,10.33,17.61,17.61,0,0,1-17,12.41h-3.9c-.5,0-2.66,0-3.15-.06v29.7c7.81,0,15.86,2.51,20.8,7.57s7.41,11.6,7.41,19.64-2.46,14.65-7.41,19.82-13,7.69-20.8,7.69v66.78c27.31.55,56.41-4.26,82.32-14.63a99,99,0,0,0,99,98.15V457.59h-7.34V403.08h-52v-13.8h52v-54H394v54h52v13.8H394v54.51h-7.35V495.4c54.44-.73,99.46-45.33,99-99.83A99,99,0,0,0,395.51,297.81Z"/></g></g>
                            
                            </svg>`;
		return button;
	},

	getBtnLike: function getBtnLike() {
		var button = document.createElement("button");
		button.className = "btn-menu";
		button.id = "like-btn";
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.47 458.34">
      
                            <g id="Capa_2" data-name="Capa 2"><g id="Capa_5" data-name="Capa 5">
                                <path class="off" d="M483.41,97.58C472.49,60.33,448,30.83,412.54,12.26,373.84-8,330.49-3.08,287.18,26.52a245.36,245.36,0,0,0-42.45,37.42,245.37,245.37,0,0,0-42.45-37.42C159-3.08,115.63-8,76.94,12.26,41.49,30.83,17,60.33,6.06,97.58c-9.81,33.48-7.65,70.59,6.09,104.49,34.71,85.6,216.6,246.35,224.32,253.15.22.2.45.37.68.55l.3.23a9.4,9.4,0,0,0,1,.63l.37.2c.25.13.49.26.75.38l.4.17.76.29.4.13q.4.12.81.21l.39.09c.29.06.59.1.89.14h.33c.4,0,.81.06,1.21.06a8.17,8.17,0,0,0,1.21-.06h.33a4.36,4.36,0,0,0,.88-.14l.39-.09.8-.21.41-.13c.25-.09.5-.18.75-.29l.41-.17a7.38,7.38,0,0,0,.74-.38l.37-.2q.5-.29,1-.63l.27-.21c.24-.18.48-.36.71-.57,7.73-6.8,189.62-167.55,224.32-253.15C491.06,168.17,493.23,131.06,483.41,97.58Z"/></g></g>
                            </svg>`;
		return button;
	},

	getBtnDisLike: function getBtnDisLike() {
		var button = document.createElement("button");
		button.className = "btn-menu";
		button.id = "like-btn";
		button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.47 458.34">
                           <g id="Capa_2" data-name="Capa 2"><g id="Capa_5" data-name="Capa 5">
                               <path class="off" d="M483.41,97.58C472.49,60.33,448,30.83,412.54,12.26c-28.82-15.1-60.22-16.19-92.27-3.55A12.46,12.46,0,0,0,312.36,14L240.94,120.42l86.82,50.73-82.16,86,12.13-65.88-86.1-50.11L212.7,46.57A12.49,12.49,0,0,0,207.86,31l.18-.4c-1.88-1.38-3.79-2.74-5.75-4.09C159-3.08,115.63-8,76.94,12.26,41.49,30.83,17,60.33,6.06,97.58c-9.81,33.48-7.65,70.59,6.09,104.49,34.71,85.6,216.6,246.35,224.32,253.15.22.2.45.37.68.55l.3.23a9.41,9.41,0,0,0,1,.63l.37.2c.25.13.49.26.75.38l.4.17.76.29.4.13q.41.12.81.21l.39.09c.29.06.59.1.89.14h.33c.4,0,.81.06,1.21.06h0a8.18,8.18,0,0,0,1.21-.06h.33a4.36,4.36,0,0,0,.88-.14l.39-.09.8-.21.41-.13c.25-.09.5-.18.75-.29l.41-.17a7.38,7.38,0,0,0,.74-.38l.37-.2q.5-.29,1-.63l.27-.21c.24-.18.48-.36.71-.57,7.73-6.8,189.62-167.55,224.32-253.15C491.06,168.17,493.23,131.06,483.41,97.58Z"/></g></g>
                         </svg>`;
		return button;
	},
	//-------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------
	//------------------------------------------------------------------------------------- Metodos del MENU navagacion


	getNavMovil: function getNavMovil() {
		var navMovil = document.createElement("nav");
		navMovil.id = "movil";
		navMovil.className = "col-s-12";
		navMovil.innerHTML = `
								<ul  class="col-s-12">
									<li id="refresh" class="col-s-4"></li>
									<li class="col-s-4"></li>
									<li class="col-s-4"></li>
								</ul>`;
		var items = navMovil.querySelectorAll("li");

		items[1].addEventListener("click", (e) => {
			this.onModalCreaPublicacion();
			this.modalCreaPublicacion.style.display = "block";
		});

		navMovil.querySelector("#refresh").addEventListener("click", (e) => {
			this.onReFresh();
		});

		items[0].appendChild(this.getBtnHome());
		items[1].appendChild(this.getBtnPreguntar());
		items[2].appendChild(this.getBtnLike());

		return navMovil;
	},


	getNavPc: function getNavPc() {
		var navPc = document.createElement("nav");
		navPc.id = "pc";
		navPc.className = "col-4 col-l-4 col-m-3";
		navPc.innerHTML = `
							<ul  class="col-12 col-l-12 col-m-12">
								<li id="refresh" class="col-3 col-l-3 col-m-3"></li>
								<li class="col-3 col-l-3 col-m-3"></li>
								<li class="col-3 col-l-3 col-m-3"></li>
							</ul>`;


		var items = navPc.querySelectorAll("li");

		items[1].addEventListener("click", (e) => {
			this.onModalCreaPublicacion();
			this.modalCreaPublicacion.style.display = "block";
		});



		navPc.querySelector("#refresh").addEventListener("click", (e) => {
			this.onReFresh();
		});

		items[0].appendChild(this.getBtnHome());
		items[1].appendChild(this.getBtnPreguntar());
		items[2].appendChild(this.getBtnLike());

		return navPc;
	},

	getContenedorMenu: function getContenedorMenu(perfilUsuario, contactos, menuPc) {
		var div = document.createElement("div");
		div.id = "contenedor-menu";
		div.className = "col-6 col-l-6 col-m-8";
		div.innerHTML = `						
								<button id="logout" class="row col-2 col-l-2 col-m-2 col-s-4">LogOut</button><h2 class="col-2 col-l-2 col-m-4 col-s-4">${perfilUsuario.name} <p>Tienes ${contactos.length-1} amigos</p></h2>							
								<h1 class="col-4 col-l-3 col-m-2 col-s-4" id="logo-inicio">Hablame</h1>
																
								
								
							`;

		div.appendChild(menuPc);


		div.querySelector("#logout").addEventListener("click", (e) => {
			this.onLogOut();
		});

		return div;

	},

	getHeader: function getHeader(perfilUsuario, contactos) {
		var header = document.createElement("header");
		header.className = "row col-12 col-l-12 col-m-12 col-s-12";


		return header;
	},
	//------------------------------------------------------------------------------------- FIN Metodos del MENU navagacion
	//------------------------------------------------------------------------------------- Metodos crear Publicacion
	getCreaPublicacion: function getCreaPublicacion() {
		var div = document.createElement("div");
		div.className = "modal-crea-publicacion";
		div.innerHTML = `<div class="modal-contenido  col-4 col-l-4 col-m-6 col-s-11">
							<form class="hacer-publicacion row col-12 col-l-12 col-m-12 col-s-12">
							<span class="close">&times;</span>
							<h2 class="col-12 col-l-12 col-m-12 col-s-12">Haz una nueva pregunta</h2>
							<select class="select-registro col-12 col-l-12 col-m-12 col-s-12" required>
													  <option value="">Selecciona una pregunta</option>
													  <option value="¿Dónde puedo encontrar?">¿Dónde puedo encontrar?</option>
													  <option value="¿Cuánto cuesta?">¿Cuánto cuesta?</option>
													  <option value="¿Cómo llegar?">¿Cómo llegar?</option>
													  <option value="¿Qué significa?">¿Qué significa?</option>
													  <option value="¿Cómo se dice?">¿Cómo se dice?</option>
													  <option value="¿Cómo se pronuncia?">¿Cómo se pronuncia?</option>
													</select>
							<textarea id="textArea" class="col-12 col-l-12 col-m-12 col-s-12" placeholder="Escribe la pregunta" rows="4" cols="50" name="contenido" required></textarea>
						
							<input  class="col-12 col-l-12 col-m-12 col-s-12" id="file-intup" type="file" name="photo" value=" " required>
							<input class="col-12 col-l-12 col-m-12 col-s-12" type="submit" value="Publicar" id="publicar">
							</form>
						</div>`;

		var intups = div.querySelectorAll("input");
		var s = div.querySelector("select");
		var textArea = div.querySelector("#textArea");

		div.querySelector("form").addEventListener("submit", (e) => {
			if (intups[0].value !== " ") {
				e.preventDefault();
				this.onUpLoad(this.usuario.mail, this.usuario.name, s.value, textArea.value, intups[0].files[0], Date.now());
				//e.target.photo.files[0]
				intups[0].value = null;

			} else {
				this.modalCreaPublicacion.style.display = "none";
			}

		});

		var span = div.querySelector(".close");
		span.addEventListener("click", (e) => {
			this.modalCreaPublicacion.style.display = "none";
		});


		return div;

	},
	//------------------------------------------------------------------------------------- FIN Metodos crear Publicacion
	//------------------------------------------------------------------------------------- 

	contenedorPublicaciones: null,

	getHome: function getHome(perfilUsuario, contactos, publicaciones) {
		var section = document.createElement("section");
		section.innerHTML = `
					  	<article id="contenedorPublicaciones" class= "row col-4 col-l-4 col-m-6 col-s-11">
						</article>`;

		this.contenedorPublicaciones = section.querySelector("article");

		for (var i = publicaciones.length - 1; i > -1; i--) {
			this.contenedorPublicaciones.appendChild(this.getPublicacion(publicaciones[i]));
		}

		return section;

	},

	getNoticias: function getNoticias(contacto) {
		var article = document.createElement("div");
		article.innerHTML = `
								<h3>${contacto.autor_name}</h3>						
								<p>Comentario</p>
								<img>
								`;
		return article;


	},
	//================================================================================================= publicaciones
	getPublicacion: function getPublicacion(publicacion) {
		var div = document.createElement("div");
		div.className = "publicacion row col-12 col-l-12 col-m-12 col-s-12"
		div.innerHTML = `
						<div class= "publicacion-info row col-12 col-l-12 col-m-12 col-s-12">

						<div class= "row col-12 col-l-12 col-m-12 col-s-12 name-date">
						<h3 class="col-6 col-l-6 col-m-6 col-s-6">${publicacion.autor_name}</h3>
						<p class="col-6 col-l-6 col-m-6 col-s-6 date-post">${publicacion.date}</p>
						</div>
						

						<h2 class="col-12 col-l-12 col-m-12 col-s-12">${publicacion.titulo}</h4>
						<div class="publicacion-texto row col-12 col-l-12 col-m-12 col-s-12">
						<p>${publicacion.contenido}</p>
						</div>
						</div>
						`;

		var ruta = publicacion.ruta_foto.split(".");
		var formato = ruta[ruta.length - 1];
		var contenedorMultiMedia = document.createElement("div");

		contenedorMultiMedia.className = "publicacion-img row col-12 col-l-12 col-m-12 col-s-12";
		if (formato == "JPG" || formato == "PNG" || formato == "jpg" || formato == "png" || formato == "jpeg") {
			var img = document.createElement("img");
			img.setAttribute("src", publicacion.ruta_foto);
			img.setAttribute("width", "100%");
			img.setAttribute("height", "auto");
			contenedorMultiMedia.appendChild(img);
		} else if (formato == "mp4" || formato == "mov" || formato == "MP4" || formato == "MOV") {
			var video = document.createElement("video");
			video.controls = true;
			video.setAttribute("width", "100%");
			video.setAttribute("height", "auto");
			video.innerHTML = `<source src="${publicacion.ruta_foto}" type="video/mp4">`;
			contenedorMultiMedia.appendChild(video);
		}
		div.appendChild(contenedorMultiMedia);

		//=================================================================== like
		var likediv = document.createElement("div");
		likediv.className = "row col-12 col-l-12 col-m-12 col-s-12"

		var like = this.getBtnLike();
		like.className = "col-1 col-l-1 col-m-1 col-s-1 btn-like-coment";
		var plike = like.querySelector("path");
		var hitLike;

		for (var i = 0; i < publicacion.likes.length; i++) {
			if (publicacion.likes[i].mail == this.usuario.mail) {
				console.log(publicacion.likes[i].mail+" "+this.usuario.mail);
				hitLike = true;
				plike.style.fill = "#f66161";
				break;
			}
		}


		like.addEventListener("click", (e) => {
			hitLike = !hitLike;
			if (hitLike) {
				plike.style.fill = "#f66161";
				this.onLike(publicacion._id, this.usuario.name, this.usuario.mail);

			} else {
				this.onDisLike(publicacion._id, this.usuario.name, this.usuario.mail);
				plike.style.fill = "#c8c8c8";
			}
		});



		var likeCount = document.createElement("p");
		likeCount.innerHTML = `${publicacion.likes.length}`;
		likeCount.className = "col-2 col-l-2 col-m-2 col-s-2";


		likediv.appendChild(like);
		likediv.appendChild(likeCount);


		div.appendChild(likediv);
		//=================================================================== like

		var insertarComent = document.createElement("div");
		insertarComent.innerHTML = `
									<form class= "hacer-comentario row col-12 col-l-12 col-m-12 col-s-12">
									<input class="entrada-comentario col-9 col-l-9 col-m-9 col-s-9" type="text" name="comentario" value=" " required>
									<input class="envia-comentario col-3 col-l-3 col-m-3 col-s-3" type="submit" value="Responder">
									</form>`;
		var intups = insertarComent.querySelectorAll("input");

		insertarComent.querySelector("form").addEventListener("submit", (e) => {
			e.preventDefault();
			if (intups[0].value !== " ") {
				this.onComentar(publicacion._id, this.usuario.name, intups[0].value);
				console.log("Actulizar la publicacion: " + publicacion._id);
				intups[0].value = null;
			}
		});


		div.appendChild(insertarComent);

		var contenedorComentarios = document.createElement("div");
		contenedorComentarios.className = "publicacion-comentarios row col-12 col-l-12 col-m-12 col-s-12";
		contenedorComentarios.innerHTML = `  
											<div class="col-12 col-l-12 col-m-12 col-2-12">
												 <h3>Respuestas ${publicacion.comentarios.length}</h3>
											</div>`;

		for (var i = 0; i < publicacion.comentarios.length; i++) {
			contenedorComentarios.appendChild(this.getComentario(publicacion.comentarios[i], i, publicacion._id));
		}

		div.appendChild(contenedorComentarios);

		return div;

	},

	getComentario: function getComentario(comentario, index, post_id) {
		var div = document.createElement("div");
		div.className = "comentario row col-12 col-l-12 col-m-12 col-s-12";
		div.innerHTML = `
					
						<h4 class= "row col-12 col-l-12 col-m-12 col-s-12" >${comentario.name}</h4>
						
						
						<div class="comentario-contenido col-12 col-l-12 col-m-12 col-s-12">
  						<p>${comentario.contenido}</p> </div>
							`;



		return div;

	},

	//========================= LocalStorage

	guardarEnLocal: function guardarEnLocal(localUser, localContacts, localNews) {
		if (this.localUse == false) {
			localStorage.setItem("localUser", JSON.stringify(localUser));
			localStorage.setItem("localContacts", JSON.stringify(localContacts));
			localStorage.setItem("localNews", JSON.stringify(localNews));
			console.log("Entra a guardarLocal y guarda");
			this.localUse = true;
		}
	},
	asignaLocal: function asignaLocal() {

		this.usuario = JSON.parse(localStorage.getItem("localUser"));
		this.usuarios = JSON.parse(localStorage.getItem("localContacts"));
		this.publicaciones = JSON.parse(localStorage.getItem("localNews"));
		console.log("Asigna lo guardado");

	},

	//===================================================================
	//===== Metodos de render
	//===================================================================

	renderFormulario: function renderFormulario(tipoFormulario) {
		if (JSON.parse(localStorage.getItem("localUser")) == null) {

			this.body.innerHTML = "";
			this.body.appendChild(this.getPaginaIngreso());
			this.body.appendChild(this.getFooter());
			this.body.querySelector("#pag-ingreso").appendChild(this.getFormulario(tipoFormulario));

		} else {
			this.asignaLocal();
			this.renderHome();
		}


	},

	modalCreaPublicacion: null,

	renderHome: function renderHome() {
		console.log("entra al metodo home");
		if (this.usuario != null && this.usuarios != null) {
			this.guardarEnLocal(this.usuario, this.usuarios, this.publicaciones);
			console.log("Usuario " + this.usuario);
			this.body.innerHTML = "";

			//nuevo
			var header = this.getHeader();
			this.modalCreaPublicacion = this.getCreaPublicacion();
			header.appendChild(this.getContenedorMenu(this.usuario, this.usuarios, this.getNavPc()));
			this.body.appendChild(header);

			this.body.appendChild(this.modalCreaPublicacion);
			this.body.appendChild(this.getNavMovil());
			//nuevo

			this.body.appendChild(this.getHome(this.usuario, this.usuarios, this.publicaciones));
		}

	}

}
