/* ------------------------------------ Click on login and Sign Up to  changue and view the effect
---------------------------------------
*/

function cambiar_login() {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login";  
document.querySelector('.cont_form_login').style.display = "block";
document.querySelector('.cont_form_sign_up').style.opacity = "0";               

setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);  
  
setTimeout(function(){    
document.querySelector('.cont_form_sign_up').style.display = "none";
},200);  
  }

function cambiar_sign_up(at) {
  document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up";
  document.querySelector('.cont_form_sign_up').style.display = "block";
document.querySelector('.cont_form_login').style.opacity = "0";
  
setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
},100);  

setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
},400);  


}    



function ocultar_login_sign_up() {

document.querySelector('.cont_forms').className = "cont_forms";  
document.querySelector('.cont_form_sign_up').style.opacity = "0";               
document.querySelector('.cont_form_login').style.opacity = "0"; 

setTimeout(function(){
document.querySelector('.cont_form_sign_up').style.display = "none";
document.querySelector('.cont_form_login').style.display = "none";
},500);  
  
  }

$("#loginSubmit").on("click", (event)=>{
  event.preventDefault();
    let user = {
    email: $("#loginEmail").val().trim(),
    password: $("#loginPass").val().trim(),
  };
  $.post("/api/login", user, (res)=>{
  		if (!res) alert("Incorrect Email or Password");
		else window.location.replace(`/buildresume/${res.id}`);
	});
});

$("#registerSubmit").on("click", (event)=>{
  event.preventDefault();
 	let pwOne = $("#registerPassOne").val().trim(), pwTwo = $("#registerPassTwo").val().trim();
 	if (pwOne != pwTwo) {
        alert("Please make sure the passwords match");
        return false;
    };
    let user = {
    email: $("#registerEmail").val().trim(),
    password: $("#loginPass").val().trim(),
    firstName: $("#registerFirst").val().trim(),
    lastName: $("#registerLast").val().trim(),
    password: $("#registerPassOne").val().trim()
  };
  $.post("/api/register", user, (res)=>{
  		if (!res) alert("That email is already taken");
		else window.location.replace(`/buildresume/${res.id}`);
	});
});











