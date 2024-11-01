let input1=document.getElementById("input1")
let input2=document.getElementById("input2")
let input3=document.getElementById("input3")
let input4=document.getElementById("input4")


let InvalidInput1=document.getElementById("InvalidInput1")
let InvalidInput2=document.getElementById("InvalidInput2")
let InvalidInput3=document.getElementById("InvalidInput3")
let InvalidInput4=document.getElementById("InvalidInput4")



let btn=document.getElementById("btn")

let search=document.getElementById("search")

let clear=document.getElementById("clear")

let tBody=document.getElementById("tbody")


let arr;

////////////////////////////////////////////

if(localStorage.getItem("arr")==null){
arr=[]
}
else
{
    arr=JSON.parse(localStorage.getItem("arr"))
    display(arr)
}


////////////////////////////////////////////   forming the array of objects an keepong it in local storage

btn.onclick=function(e){



 if(Namevalidate()==true && Pricevalidate()==true &&  Catvalidate()==true && Descvalidate()==true){

    let product={
        name:input1.value,
        price:input2.value,
        cat:input3.value,
        desc:input4.value,
        
    }

    arr.push(product)
    localStorage.setItem("arr",JSON.stringify(arr))
    display(arr)
    
    empty()
 }
   
 else{
    
    Namevalidate();
    Pricevalidate();
    Catvalidate();
    Descvalidate();
    e.preventDefault()
}


}

///////////////////////////////////////////// clearing input

function empty() {
    input1.value=""
    input2.value=""
    input3.value=""
    input4.value=""
}
//////////////////////////////////////////// displaying elements in the table

function display(array) {
    let rows=""
    for(let i=0; i<array.length;i++){
        rows+=`  
        <tr>
        <td>${i+1}</td>
        <td>${array[i].name}</td>
        <td>${array[i].price}</td>
        <td>${array[i].cat}</td>
        <td>${array[i].desc}</td>
        <td>  <button class="btn btn-danger" class="delete" onclick="del(${i})">delete</button></td>
        <td> <button class="btn btn-primary" onclick="update(${i})">update</button></td>
        </tr>`
 
    }
    tBody.innerHTML=rows
}


///////////////////////////////////////////////////////////////////// delete



function del(i) {
    arr.splice(i,1)
    localStorage.setItem("arr",JSON.stringify(arr))
    display(arr)
   
}


///////////////////////////////////////////////////////////////////// update



function update(i) {
    
    input1.value=arr[i].name
    input2.value=arr[i].price
    input3.value=arr[i].cat
    input4.value=arr[i].desc

    btn.innerText="Update"

    btn.onclick=function(e){
    //    e.preventDefault()

        arr[i].name=input1.value
        arr[i].price=input2.value
        arr[i].cat=input3.value
        arr[i].desc=input4.value

        display(arr)

        localStorage.setItem("arr",JSON.stringify(arr))

        btn.innerText="Add Product"
        empty()
    }
}


///////////////////////////////////////////////////////////////////// search

search.oninput=function(e){
    e.preventDefault()
    let searchArr=[]
    for(let i=0; i<arr.length;i++){

        if(arr[i].name.toLowerCase().includes(search.value.toLowerCase())==true){
         searchArr.push(arr[i])
        }
       
    }
    display(searchArr)
}

///////////////////////////////////////////////////////////////////// clear products 

clear.onclick=function(){
    localStorage.clear()
    display(arr)
}




///////////////////////////////////////////////////////////////////// validation


function Namevalidate() {
    
if(/^[a-z]{3,}$/i.test(input1.value)!=true){
    input1.classList.add("is-invalid")
    input1.classList.remove("is-valid")
    InvalidInput1.classList.remove("d-none")
    return false ;
}
else
{
    input1.classList.add("is-valid")
    input1.classList.remove("is-invalid")
    InvalidInput1.classList.add("d-none")
    return true ;   
}
}


function Pricevalidate() {
    
if(/^\d{4,}$/i.test(input2.value)!=true){
    input2.classList.add("is-invalid")
    input2.classList.remove("is-valid")
    InvalidInput2.classList.remove("d-none")
    return false ;
}
 
  else{
    input2.classList.add("is-valid")
    input2.classList.remove("is-invalid")
    InvalidInput2.classList.add("d-none")
    return true ; 
  }
 
        
 }


 function Catvalidate() {
    
if(/^\w+$/i.test(input3.value)!=true){
    input3.classList.add("is-invalid")
    input3.classList.remove("is-valid")
    InvalidInput3.classList.remove("d-none")
    return false ;
}
 
  else{
    input3.classList.add("is-valid")
    input3.classList.remove("is-invalid")
    InvalidInput3.classList.add("d-none")
    return true ; 
  }
 
}


 function Descvalidate() {
    
if(/^\w{5,}$/i.test(input4.value)!=true){
input4.classList.add("is-invalid")
input4.classList.remove("is-valid")
InvalidInput4.classList.remove("d-none")
return false ;
}

else{
input4.classList.add("is-valid")
input4.classList.remove("is-invalid")
InvalidInput4.classList.add("d-none")
return true ; 
}

}
