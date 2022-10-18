
let cl = console.log;

// CRUD >> 
// Create
// Read
// Update
// Delete

// before JSON XML used.write in tag like html.
// JSON >> javaScript object notation.

// the only difference b/w jS object and JSON are in JSON keyes are stringify.

// there should not be " , " after last key:value pair.

let person = {
    fname : 'jhon',
    lname : 'Doe',
    fullName : function(){
        return `${this.fname} ${this.lname}`
    }
}



// to convert jS object  JSON to JSON.stringify(objet name to convert in to JSON) 

let jPerson =  JSON.stringify(person);
cl(jPerson)




// to convert JSON to jS object  JSON.parse(objet name to convert in to jS obj) 

let jSobj =  JSON.parse(jPerson);
cl(jSobj);


// ##################### CURD Webstorage ####################


const stdForm = document.getElementById('stdInfo');
const fnameControl = document.getElementById('fname');
const lnameControl = document.getElementById('lname');
const emailControl = document.getElementById('email');
const contactControl = document.getElementById('contact');
const info = document.getElementById('info');
const submitBtn = document.getElementById('submitBtn');
const updateBtn = document.getElementById('updateBtn');


let stdArr = [];

if(localStorage.getItem('stdArr')){
    stdArr = JSON.parse(localStorage.getItem('stdArr'))
    templating(stdArr)
    
} 

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


const onStdEdit = (ele) => {
   // cl(`Edited ${ele.getAttribute('data-id')}`)
    let getId = ele.getAttribute('data-id')
    cl(getId)
    localStorage.setItem('getId', JSON.stringify(getId));
    stdArr = JSON.parse(localStorage.getItem('stdArr'))
    updateBtn.classList.remove('d-none')
    submitBtn.classList.add('d-none')
    //let reqObj = stdArr.filter((ele) => ele.id === getId);
   // cl(stdArr)
    let reqObj = stdArr.find((obj) => obj.id === getId);
  // cl(reqObj);
    fnameControl.value = reqObj.fname;
    lnameControl.value = reqObj.lname;
    emailControl.value = reqObj.email;
    contactControl.value = reqObj.contact;
    
} 

const onStdDelete = (ele) => {
    let getDelete = ele.getAttribute('data-id')
    // cond array-condition-create new array
    stdArr = stdArr.filter(ele => {
     return   ele.id != getDelete
    })
    //cl(stdArr);
    localStorage.setItem('stdArr', JSON.stringify(stdArr));
    templating(stdArr)
}

const createTr = (obj) => {
    let tr = document.createElement('tr')
    tr.innerHTML = `
        <td>${stdArr.length}</td>
        <td>${obj.fname}</td>
        <td>${obj.lname}</td>
        <td>${obj.email}</td>
        <td>${obj.contact}</td>
        <td><button class="btn btn-success" data-id="${obj.id}" onClick="onStdEdit(this)"><i class="fa-regular fa-pen-to-square"></i></button></td>
        <td><button class="btn btn-danger" data-id="${obj.id}"onClick="onStdDelete(this)"><i class="fa-solid fa-trash"></i></button></td>
    `

    info.append(tr);
}

const onSubmit = (e) => {
    e.preventDefault()
    // cl(e)
    let obj={
        fname: fnameControl.value,
        lname: lnameControl.value,
        email: emailControl.value,
        contact: contactControl.value,
        id:uuid()
    }
    stdArr.push(obj);
    localStorage.setItem("stdArr", JSON.stringify(stdArr))
    createTr(obj);
    // let tr = document.createElement('tr')
    // tr.innerHTML = `
    //     <td>${stdArr.length}</td>
    //     <td>${obj.fname}</td>
    //     <td>${obj.lname}</td>
    //     <td>${obj.email}</td>
    //     <td>${obj.contact}</td>
    //     <td><button class="btn btn-primary"><i class="fa-regular fa-pen-to-square"></i></button></td>
    //     <td><button class="btn btn-danger"><i class="fa-solid fa-trash"></i><button></td>
    // `


    // let trContent =  `
    //     <td>${stdArr.length}</td>
    //     <td>${obj.fname}</td>
    //     <td>${obj.lname}</td>
    //     <td>${obj.email}</td>
    //     <td>${obj.contact}</td>
    // `
    // tr.append(trContent);
    //info.innerHTML =(tr)
     //info.append(tr);
     e.target.reset();
}


const onStdUpdate = (e) => {
    let getId = JSON.parse(localStorage.getItem('getId'));
   cl(getId)
    stdArr = JSON.parse(localStorage.getItem("stdArr"))
    cl(stdArr);
    stdArr.forEach(ele => {
        if(ele.id === getId){
            ele.fname =fnameControl.value;
            ele.lname = lnameControl.value;
            ele.email = emailControl.value;
            ele.contact = contactControl.value
        }
    })
    cl(stdArr);
        localStorage.setItem("stdArr", JSON.stringify(stdArr));
        templating(stdArr)
        updateBtn.classList.add('d-none')
        submitBtn.classList.remove('d-none')
        stdForm.reset();
}

 function templating(arr){
    let result = '';
    stdArr.forEach((std,i) => {
        result += `
            <tr>
                <td>${i + 1}</td>
                <td>${std.fname}</td>
                <td>${std.lname}</td>
                <td>${std.email}</td>
                <td>${std.contact}</td>
                <td><button class="btn btn-success" data-id="${std.id}" onClick="onStdEdit(this)"><i class="fa-regular fa-pen-to-square"></i></button></td>
                <td><button class="btn btn-danger" data-id="${std.id}"onClick="onStdDelete(this)"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `
    })
    info.innerHTML= result;
 }

// on page refresh >> is there a data in local storage
// then get that data and create tr using templating function.





stdForm.addEventListener("submit", onSubmit)
updateBtn.addEventListener("click", onStdUpdate)