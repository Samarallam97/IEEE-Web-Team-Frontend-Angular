// index page (login)

let logMail=document.getElementById("logMail");
let logPass=document.getElementById("logPass");
let loginBtn=document.getElementById("loginBtn");
let signAnchor=document.getElementById("signAnchor");

let logMsg=document.getElementById("logMsg");

let emptyLog=document.getElementById("emptyLog");
// signup page (signup)

let sinName=document.getElementById("sinName");
let sinMail=document.getElementById("sinMail");
let sinPass=document.getElementById("sinPass");
let sinBtn=document.getElementById("sinBtn");
let logAnchor=document.getElementById("logAnchor");


let sucSin=document.getElementById("sucSin");
let sinin=document.getElementById("sinin")
//RegEx
let invalidName=document.getElementById("invalidName");

let invalidMail=document.getElementById("invalidMail");

let invalidPass=document.getElementById("invalidPass");


// exist mail
let existMail=document.getElementById("existMail");

// welcome

let welcome=document.getElementById("welcome")

// logout
let logout=document.getElementById("logout")
/////////////////////////////////////////////////////////// localStorage

let arr;

if(localStorage.getItem("arr") ==null){
    arr=[{name:"",mail:"name@example.com",pass:""}];
    localStorage.setItem("arr",JSON.stringify(arr))
    
}

else{
    arr= JSON.parse(localStorage.getItem("arr"));
}


///////////////////////////////////////////////////////////// signing up

function Sign(event){
 event.preventDefault();

 nameValidate();
 mailValidate();
 passValidate();
if(mailValidate() ==true){
    isExist();
}

 if(nameValidate() ==true && mailValidate() == true && passValidate() == true
 && isExist() == true){

     let user={
         name:sinName.value,
         mail:sinMail.value,
         password:sinPass.value,
     }
     
     arr.push(user);
     localStorage.setItem("arr",JSON.stringify(arr));
     sucSin.classList.remove("d-none")
     sinin.classList.remove("d-none");
     clear()
 }
// return false;
}

/////////////////////////////////////////////////////////// clearing inputs

function clear() {
    sinName.value="";
    sinMail.value="";
    sinPass.value="";
}
///////////////////////////////////////////////////////////// validation

function nameValidate() {
    let RegEx=/^[a-z]{3,10}[\s\.-]?([a-z]{3,10})?$/i
    if(RegEx.test(sinName.value)!=true){
        sinName.classList.add("is-invalid")
        sinName.classList.remove("is-valid")
        invalidName.classList.remove("d-none")
        return false
    }
    else{
        sinName.classList.add("is-valid")
        sinName.classList.remove("is-invalid")
        invalidName.classList.add("d-none")
        return true
    }
}


function mailValidate() {
    let RegEx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(RegEx.test(sinMail.value)!=true){
        sinMail.classList.add("is-invalid")
        sinMail.classList.remove("is-valid")
        invalidMail.classList.remove("d-none")
        return false
    }
    else{
        sinMail.classList.add("is-valid")
        sinMail.classList.remove("is-invalid")
        invalidMail.classList.add("d-none")
        return true
    }
}

function passValidate() {
    let RegEx=/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
    if(RegEx.test(sinPass.value)!=true){
        sinPass.classList.add("is-invalid")
        sinPass.classList.remove("is-valid")
        invalidPass.classList.remove("d-none")
        return false
    }
    else{
        sinPass.classList.add("is-valid")
        sinPass.classList.remove("is-invalid")
        invalidPass.classList.add("d-none")
        return true
    }
}

///////////////////////////////////////////////////////////// signUp checking existance

function isExist(){

let ex=arr.some(function(e){
    if(e.mail==sinMail.value){
        return true;
    }
})

if(ex==true){
    existMail.classList.remove("d-none");
    sinMail.classList.add("is-invalid");
    sinMail.classList.remove("is-valid");
    return false;
}
else{
    existMail.classList.add("d-none");
    sinMail.classList.add("is-valid");
     sinMail.classList.remove("is-invalid");
     return true;
}

}

///////////////////////////////////////////////////////////// login


function login(event){  

// checking if the email and password exist

        let fn=arr.some(function(e){
            if(e.mail== logMail.value && e.password==logPass.value){
                  localStorage.setItem("name",e.name) ;
                  
                return true
            }
           
             })    

             if(fn==false){
                logMsg.classList.remove("d-none")
                logMail.classList.add("is-invalid")  
                logPass.classList.add("is-invalid") 
                event.preventDefault(); 

             }



             else{
                logMsg.classList.add("d-none")
                logMail.classList.add("is-valid")  
                logPass.classList.add("is-valid")
                logMail.classList.remove("is-invalid")  
                logPass.classList.remove("is-invalid")
                loginBtn.setAttribute("href","welcome.html")
                
             }

             
             
}

//////////////////////////////////////// welcome message

function welcomeUser() {
    welcome.innerHTML=`Welcome ${localStorage.getItem("name")}`
}

//////////////////////////////////////// logout

function logOut(){
    // window.location.href = "index.html";
    window.open("index.html")
}