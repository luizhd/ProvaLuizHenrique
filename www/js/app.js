document.getElementById("butConcluir").addEventListener("click", criarContato);
document.getElementById("listarContatos").addEventListener("click", listarContatos);
document.getElementById("listarDuplicados").addEventListener("click", listarDuplicados);
document.getElementById("butCancelar").addEventListener("click", limparCampos);

function criarContato() {
   var name = document.getElementById("nome").value;
   var numero = document.getElementById("numero").value;
   var novoContato = navigator.contacts.create({"displayName": name});
   var telefones = [];
   telefones[1] = new ContactField('mobile', numero, true);
   novoContato.phoneNumbers = telefones;
   novoContato.save(ok, erro);
    
   function ok() {
      alert("Contato Salvo!")
   }
  
   function erro(message) {
      alert('falha: ' + message);
   }
  
}

function limparCampos() {
   document.getElementById("nome").value = '';
   document.getElementById("numero").value = '';
}

function listarContatos() {
   var options = new ContactFindOptions();
   options.filter = "";
   options.multiple = true;

   fields = ["displayName", "phoneNumbers"];
   navigator.contacts.find(fields, sucesso, falha, options);
    
   contatoDiv = document.querySelector("#listContatos");
   contatoDiv.innerHTML = "";
   function sucesso(contacts) {
      for (var i = 0; i < contacts.length; i++) {
         contatoDiv.innerHTML += "<b>" + contacts[i].displayName+"</b><br/>"+contacts[i].phoneNumbers[0].value+"<br/>";
      }
   }

  
   function falha(message) {
      alert('Falha: ' + message);
   }
  
}


function listarDuplicados () {
	
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;

	fields = ["displayName", "phoneNumbers"];
	navigator.contacts.find(fields, sucesso, falha, options);
    
	contatoDiv = document.querySelector("#listDuplicados");
	contatoDiv.innerHTML = "";
	function sucesso(contacts) {
      for (var i = 0; i < contacts.length; i++) {
		  cont = 0;
		  for (var j = 0; j< contacts.length; j++){
			  if(contacts[i].displayName == contacts[j].displayName){
				  cont++;
			  }
		  }
		  if (cont > 1){
				contatoDiv.innerHTML += "<b>" + contacts[i].displayName+"</b><br/>"+contacts[i].phoneNumbers[0].value+"<br/>";
		  }
	  }
	}


	/*document.getElementById("principal").style.visibility = "block";
	document.getElementById("listDuplicados").style.visibility= "none" ;
	
	var cont =0;
	var options = new ContactFindOptions();
		options.filter = "";
		options.multiple = true;
		
	fields = ["displayName", "phoneNumbers"];
	navigator.contacts.find(fields, sucesso, falha, options);
    
	contatoDiv = document.querySelector("#listDuplicados");
	contatoDiv.innerHTML = "";
	
	function sucesso(contacts) {
      for (var i = 0; i < contacts.length; i++) {
		  cont = 0;
		  for (var j = 0; j< contacts.length; j++){
			  if(contacts[i].displayName == contacts[j].displayName){
				  cont++;
			  }
		  }
		  if (cont > 1){
				contatoDiv.innerHTML += "<b>" + contacts[i].displayName+"</b><br/>"+contacts[i].phoneNumbers[0].value+"<br/>";
		  }
	  }
	}*/
	function falha(message) {
		alert('Falha :' + message);
	}
}