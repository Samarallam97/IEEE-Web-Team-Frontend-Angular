//input1

let input1=document.getElementById("input1")

let emptyInput1=document.getElementById("emptyInput1")

let invalidInput1=document.getElementById("invalidInput1")

//input2
let input2=document.getElementById("input2")

let emptyInput2=document.getElementById("emptyInput2")

let invalidInput2=document.getElementById("invalidInput2")

let usedUrl=document.getElementById("usedUrl")

// submition
let submit=document.getElementById("submit")

//display()

let tbody=document.getElementById("tbody")
//search()

let search=document.getElementById("search")

// link eye

let link =document.getElementById("go")
////////////////////////////////////////// checking local storage 


let websites;

if(localStorage.getItem("websites")==null){
    websites=[];
}
else{
    websites=JSON.parse(localStorage.getItem("websites")) 
    display(websites)
}

////////////////////////////////////////// creating  websites array
submit.onclick=function (event) {
    event.preventDefault();

    nameValidation ()
    urlValidation ()
    // isExist()
    //   &&  isExist()==true

    if(nameValidation ()==true && urlValidation ()==true){
        let site={
            name:input1.value,
            url:input2.value,
        }
    
        websites.push(site);
        localStorage.setItem("websites",JSON.stringify(websites))
        display(websites)
        clear() 
    }
    // else{
    //     event.preventDefault();
    // }
    
}

////////////////////////////////////////// display

function display(arr) {
    let box="";
    for(let i=0;i<arr.length ;i++){
    box+=`<tr>
    <td id="higlight" >${arr[i].name}</td>
    <td>${arr[i].url}</td>
    <td><a id="go"  onclick="go(event,${i},this)"><i class="go fa-regular fa-eye border border-1 p-2 border-dark rounded-2 text-dark "></i></a>
         <a href=""><i class="fa-solid fa-pen-to-square border border-1 p-2 border-warning rounded-2 text-warning" id="update" onclick="update(event,${i})"></i></a>
         <a href=""><i class="fa-solid fa-trash-can border border-1 p-2 border-danger rounded-2 text-danger" id="delete" onclick="del(event,${i})"></i></a>
        </td>
</tr>`
    }
tbody.innerHTML=box;
}

////////////////////////////////////////// delete

function del(event,i) {
    event.preventDefault()
    
    websites.splice(i,1)
    localStorage.setItem("websites",JSON.stringify(websites))
    display(websites)
}

////////////////////////////////////////// clear inputs

function clear() {
    input1.value="";
    input2.value="";
   
}

////////////////////////////////////////// update

function update(event,i) {
    event.preventDefault()
    input1.value=websites[i].name
    input2.value=websites[i].url
    submit.value="update"
    submit.classList.add("bg-warning")

    submit.onclick=function(e) {
       
        websites[i].name=input1.value;
        websites[i].url=input2.value;
        submit.value="Add Bookmark"
        localStorage.setItem("websites",JSON.stringify(websites))
        display(websites)
        clear()
    }
}


////////////////////////////////////////// go

function go(event,i,link) {
    link.setAttribute("href",websites[i].url);   
}


////////////////////////////////////////// search

search.oninput=function (e) {
    let searchArr=[]
    for (let i = 0; i < websites.length; i++) {
        if(websites[i].name.includes(search.value)){
            searchArr.push(websites[i]); 
                                
        }             
    }  
   
    display(searchArr);
}


////////////////////////////////////////// validation 


function nameValidation() {
    let regex=/^\w{3,}$/;
    //empty
    if(input1.value ==""){
    emptyInput1.classList.remove("d-none")
    input1.classList.add("is-invalid")
    return false
    }
    // regex
    else if(regex.test(input1.value) == false){
    invalidInput1.classList.remove("d-none")
    emptyInput1.classList.add("d-none")
    input1.classList.add("is-invalid")
    return false
    }
    else{
        invalidInput1.classList.add("d-none")
        emptyInput1.classList.add("d-none")
        input1.classList.remove("is-invalid")
        return true
    }   
}


function urlValidation() {
    //existance 
    let fn=websites.some(function(e){
        if(input2.value ==e.url){ 
            console.log(input2.value);                 
             return true
        }
               
        })   
 

    let regex=/^\w+@\w+$/;
    //////////////////////////empty
    if(input2.value ==""){
    emptyInput2.classList.remove("d-none")
    input2.classList.add("is-invalid")
    return false
    }
    //////////////////// regex
    else if(regex.test(input2.value) == false){
    invalidInput2.classList.remove("d-none")
    emptyInput2.classList.add("d-none")
    input2.classList.add("is-invalid")
    return false
    }
    /////////////////exist
    else if(fn==true){
        emptyInput2.classList.add("d-none")
        invalidInput2.classList.add("d-none")
        input2.classList.add("is-invalid")
        input2.classList.remove("is-valid")
        usedUrl.classList.remove("d-none") 
        return false
    }
    else{
        invalidInput2.classList.add("d-none")
        emptyInput2.classList.add("d-none")
        usedUrl.classList.add("d-none")
        input2.classList.remove("is-invalid")
        return true
    }   
}


