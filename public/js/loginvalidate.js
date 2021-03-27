const SubmitBtn = document.getElementById('submit');
const Username = document.getElementById('username');
const Password = document.getElementById('password');
const ErrorElem = document.querySelector('.error');
const AlertElem = document.querySelector('.alert');
const MessageElem = document.getElementById('error-msg')

//Error messages
const INPUT_ERR = "Invalid Input";

function PropogateMessage(message){
    ErrorElem.style.display = "block";
    MessageElem.innerHTML = message;
}

function isInvalid(username,password){
    if(username && password) return 0;
    return 1;
}

SubmitBtn.addEventListener('submit',(event)=>{
    if(isInvalid(Username.value,Password.value)){
        PropogateMessage(INPUT_ERR);
        event.preventDefault();
        event.stopPropagation();
    }
})
