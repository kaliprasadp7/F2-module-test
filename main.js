let recordsDisplay=document.getElementById("records");
let userbtn=document.getElementById("submit");
let btntext=userbtn.innerText;
let username=document.getElementById("name");
let useremail=document.getElementById("email");
let usergpa=document.getElementById("gpa");
let userage=document.getElementById("age");
let userdegree=document.getElementById("degree");
let userArray=[];
let edit_id= null;


let objstr=localStorage.getItem('users');
userArray=JSON.parse(objstr);
console.log(userArray);
displayInfo();


userbtn.addEventListener("click", function(){
    let name=username.value;
    let email=useremail.value;
    let gpa=usergpa.value;
    let age=userage.value;
    let degree=userdegree.value;

    if(edit_id != null){
        //edit
        userArray.splice(edit_id,1,{'name' : name, 'email' : email, 'gpa' : gpa, 'age' : age, 'degree': degree});
        edit_id=null;
    }else{
        //insert
        if(name!='' && email!='' && gpa!='' && age!='' && degree!=''){
            userArray.push({'name' : name, 'email' : email, 'gpa' : gpa, 'age' : age, 'degree': degree});
        }
    }
    saveInfo(userArray);
    // displayInfo();
    userbtn.innerText = btntext;
})

function saveInfo(){
    let str=JSON.stringify(userArray);
    localStorage.setItem('users', str);
    displayInfo();
}

function displayInfo(){
    let statement ='';
    userArray.forEach((user,i) => {
        statement += `<tr>
        <td>${i+1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.gpa}</td>
        <td>${user.age}</td>
        <td>${user.degree}
            <span class="icons">
                <span class="material-symbols-outlined"  onclick="editInfo(${i})">edit_square</span>
                <span class="material-symbols-outlined" onclick="deleteInfo(${i})">delete</span>
            </span>
        </td>
    </tr>`;
    });
    recordsDisplay.innerHTML = statement;
}

function editInfo(id){
    edit_id = id;
    username.value = userArray[id].name;
    useremail.value = userArray[id].email;
    usergpa.value = userArray[id].gpa;
    userage.value = userArray[id].age;
    userdegree.value = userArray[id].degree;
    userbtn.innerText = "Edit Student";
    userbtn.style.backgroundColor="black";
    userbtn.style.color="white";
}

function deleteInfo(id){
    userArray.splice(id,1);
    saveInfo(userArray);
}

function searchFunc(){
    let filter = document.getElementById("search").value.toUpperCase();

    let myTable = document.getElementById("mytable");
    let tr = myTable.getElementsByTagName('tr');

    for(var i=0;i<tr.length;i++){
        let td = tr[i].getElementsByTagName('td')[1] || tr[i].getElementsByTagName('td')[2] || tr[i].getElementsByTagName('td')[5];
        if(td){
        let textvalue = td.textContent || td.innerHTML;
        // alert(textvalue)
        if(textvalue.toUpperCase().indexOf(filter) > -1){
            tr[i].style.display = "";
        }else{
            tr[i].style.display = "none";
        }
    }
    }
}