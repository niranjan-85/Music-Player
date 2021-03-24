// Dom elements 
console.log("Dasd")

const SubmitBtn = document.getElementById('submit');
const Username = document.getElementById('username');
const Password = document.getElementById('password');
const ConfirmPassword = document.getElementById('confirmpassword');
const Name = document.getElementById('name');
const ErrorElem = document.querySelector('.error');
const AlertElem = document.querySelector('.alert');
const MessageElem = document.getElementById('error-msg')

//Error messages
const INPUT_ERR = "Invalid Input";
const PASSWORD_ERR = "Password should be atleast 8 characters long";
const MATCH_ERR = "Passwords do not match"
const SUCCESS = "Successful"


function CheckError(password,cpass){
    if(password.length > 0){
        if(password.length < 8){
            PropogateMessage(0,PASSWORD_ERR)
        }
        else if (password != cpass){
            PropogateMessage(0,MATCH_ERR);
        }
    }
    else{
        PropogateMessage(0,INPUT_ERR);
    }
}

// Input invalid :

function PropogateMessage(isvalid,message){
    ErrorElem.style.display = "block";
    if(isvalid){
        AlertElem.classList.replace('alert-danger','alert-success');
    }
    MessageElem.innerHTML = message;
}

// Validation 

function isInvalid(username,password,cpassword,name){
    if(username === "" || password === "" || name.value ==="" || password.length < 8 || cpassword === "" || (password != cpassword)){
        CheckError(password,cpassword);
        return 1;
    }
    return 0;
}

SubmitBtn.addEventListener('submit',(event)=>{
    if(isInvalid(Username.value,Password.value,ConfirmPassword.value,Name.value)){
        event.preventDefault();
        event.stopPropagation();
    }
    else{
        PropogateMessage(1,SUCCESS)
    }
})
