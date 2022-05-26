let form = document.querySelector('form');
let inputs = form.querySelectorAll('input');

let email = form.querySelector('#email');
let tel = form.querySelector('#tel');
let pswd = form.querySelector('#password');
let conf = form.querySelector('#confpassword');

let etChecklist = form.querySelector('.email.tel.checklist');
let pswdChecklist = form.querySelector('.password.checklist');
let etHeight = etChecklist.children[1].offsetHeight*2 + 'px';
let pswdHeight = pswdChecklist.children[1].offsetHeight*5 + 'px';

let emailValid = etChecklist.querySelector('.email');
let telTenDigit = etChecklist.querySelector('.ten-digit');

let pswdMin = pswdChecklist.querySelector('.min');
let pswdUpper = pswdChecklist.querySelector('.upper');
let pswdLower = pswdChecklist.querySelector('.lower');
let pswdNum = pswdChecklist.querySelector('.num');
let pswdMatch = pswdChecklist.querySelector('.match');

function checkEmail() {
    let valid = email.checkValidity();
    
    emailValid.classList.remove('error');
    
    if(!valid) emailValid.classList.add('error');
    return valid;
}

function checkTel() {
    let valid = true;
    
    telTenDigit.classList.remove('error');
    
    let value = tel.value;
    if(value.length != 10 || !/^[0-9]+$/.test(value)) {
        telTenDigit.classList.add('error');
        valid = false;
    }
    
    return valid;
}

function checkPswd() {
    let valid = true;

    pswdMin.classList.remove('error');
    pswdUpper.classList.remove('error');
    pswdLower.classList.remove('error');
    pswdNum.classList.remove('error');
    pswdMatch.classList.remove('error');

    let value = pswd.value;
    if(value.length < 8) {pswdMin.classList.add('error'); valid = false;}
    if(!/[A-Z]/.test(value)) {pswdUpper.classList.add('error'); valid = false;}
    if(!/[a-z]/.test(value)) {pswdLower.classList.add('error'); valid = false;}
    if(!/[0-9]/.test(value)) {pswdNum.classList.add('error'); valid = false;}
    if(value != conf.value) {pswdMatch.classList.add('error'); valid = false;}

    return valid;
}

function toggleList(id) {
    switch(id) {
        case 'password':
            if(checkPswd() || (!pswd.value && !conf.value))
                pswdChecklist.style.height = 0;
            else
                pswdChecklist.style.height = pswdHeight;
            break;
        case 'email':
        case 'tel':
            if((checkEmail() && checkTel()) || (!email.value && !tel.value))
                etChecklist.style.height = 0;
            else
                etChecklist.style.height = etHeight;
            break;
        default:
            console.log('Unknown list id!');
            break;
    }
}

function submitForm() {
    for(let i=0; i<inputs.length; ++i)
        if(!inputs[i].reportValidity())
            return;

    if(checkTel() && checkPswd())
        form.submit();
}