// Array för att stoppa in alla värden som kommer skickas till LocalStorage
let users = getDataFromLocalStorage('users');

// Referens till loginformuläret
let loginFormRef = document.querySelector('#loginForm');

// Referens till registeringsformuläret
let registerFormRef = document.querySelector('#registerForm');
registerFormRef.classList.add('d-none');

// Referens till knappen för att registreraformuläret.
let toRegisterFormBtnRef = document.querySelector('#toRegisterFormBtn');

// Login sidan - Om användaren klickar på registrera konto så körs följande.
toRegisterFormBtnRef.addEventListener('click', (event) => {
    // Här göms loginformuläret och registreringsformuläret syns. 
    swapRegisterLoginForm(event);    
});

// Funktion för att toggla mellan klassen 'd-none' där den antingen lägger till eller tar bort klassen.
function swapRegisterLoginForm(event) {
    // Denna gör så att sidan inte laddas om efter submit. Parametern event behövs här för att funktionen ska köras.
    event.preventDefault();
    registerFormRef.classList.toggle('d-none');
    loginFormRef.classList.toggle('d-none');
}

// LOGIN-FORM //
const userNameLoginRef = document.querySelector('#userNameLogin');
const passwordLoginRef = document.querySelector('#passwordLogin');
const firstNameRef = document.querySelector('#firstName');


const loginBtnRef = document.querySelector('#loginBtn');
loginBtnRef.addEventListener('click', (event) => {
    event.preventDefault();

    
    if(validateLogin()) {
        // Gömmer loginformuläret
        loginFormRef.classList.toggle('d-none');
        // Skapar en välkomsmeddelande
        let welcomeMsg = document.createElement('h2');
        // Fyller den med namnet på den inloggade genom att skicka med godkända användarnamnet och får returnad ett namn från getLoginName().
        welcomeMsg.textContent = `Välkommen ${getLoginName(userNameLoginRef.value)}`;
        // Stoppa in nya elementet i bodyn så att den syns.
        let bodyRef = document.querySelector('body')
        bodyRef.appendChild(welcomeMsg);
    }
});

function validateLogin () { 
    let titleLoginRef = document.querySelector('#titleLogin').insertAdjacentElement('afterend', infoMsg)

    infoMsg.classList.add('error-msg');

    try {
        if(!doesUserExist(userNameLoginRef.value)) {
            throw {
                message: 'Det användarnamnet existerar inte',
                nodeRef: userNameLoginRef
            }
        }
        else if (isPasswordIncorrect(userNameLoginRef.value, passwordLoginRef.value)) {
            throw {
                message: 'Lösenordet stämmer inte med kontot',
                nodeRef: passwordLoginRef
            }
        }
        return true;
    } catch (error) {
        infoMsg.textContent = error.message
        error.nodeRef.focus();
    } return false;
};

// REGISTER-FORM //
const userNameRef = document.querySelector('#userName');
const passwordRef = document.querySelector('#password');
const passwordConfirmRef = document.querySelector('#passwordConfirm');
const checkboxRef = document.querySelector('#checkbox');
const registerBtnRef = document.querySelector('#registerBtn');

// Här skapas inforutan som p element.
const infoMsg = document.createElement('p');
infoMsg.id = 'infoMsgRef';


// Knapp för att registrera en ny användare. Det kommer göras en validering.
registerBtnRef.addEventListener('click', (event) => {
    // Förhindrar att formuläret uppdaterar sidan.
    event.preventDefault();
    if (validateRegistration()) {
        // Här körs funktion för att spara nya användaren i LocalStorage
        saveUserToLocalStorage()
        // Här töms alla värden när all validering gått igenom.
        infoMsgRef.classList.toggle('error-msg');      
        infoMsgRef.textContent = `Ditt konto ${userNameRef.value} är skapat`;
        userNameRef.value = '';
        passwordRef.value = '';
        passwordConfirmRef.value = '';
        checkboxRef.checked = false;
        // Här tas inforutan bort efter 4 s.
        removeElementTimer(infoMsgRef, 4000);        
    }
});

// Funktion som körs för att validera en ny registrering.
function validateRegistration() {
    // Lägger till infoMsg efter h2 i registerform. Först måste man hämta hem den första elementet och sedan tilldela .insertAdjacentElement
    let registerTitleRef = document.querySelector('#registerTitle').insertAdjacentElement('afterend', infoMsg);   
    // Lägger till den röda texten till infoMsg genom klassen 'error-msg'
    infoMsg.classList.add('error-msg');
    
    // Hämtar hem den senaste databasen.
    users = getDataFromLocalStorage('users');

    try {
        // Kontrollerar att användarnamnet inte är kortare än 6 texten.
        if (userNameRef.value.length < 6 || userNameRef.value.includes(' ')) {
            throw {
                message: 'Användarnamnet måste vara mer än 6 tecken och får inte innehålla mellanslag.',
                nodeRef: userNameRef,
            };
        }
        // Här används .some för att kolla över arrayen users som sparar all data från LocalStorage. 'user' är varje objekt i arrayen och kollar det objektets keyname 'userName' och jämför det med inputvalue från userNameRef.
        else if(users.some(user => user.userName === userNameRef.value)) {
            throw {
                message: 'Användarnamnet är upptagen, välj ett annat.',
                nodeRef: userNameRef
            }
        }
        // password måste bestå av minst 8 tecken
        else if (passwordRef.value.length < 8) {
            throw {
                message: 'Ditt lösenord är för kort. Du måste fylla i minst 8 tecken.',
                nodeRef: passwordRef,
            };
        } // password och password again måste vara identiska
        else if (!(passwordRef.value === passwordConfirmRef.value)) {
            throw {
                message: 'Ditt lösenord stämmer inte överens. Fyll i rätt lösenord.',
                nodeRef: passwordConfirmRef,
            };
        } // checkboxen måste vara checked
        else if (!checkboxRef.checked) {
            throw {
                message: 'Du måste godkänna för registring',
                nodeRef: checkboxRef,
            };
        }
        return true;
    } 
    catch (error) {
        // Ger felmeddelande beroende på vart den fastnar i trysatsen.        
        infoMsgRef.textContent = error.message;
        // Tömmer den specifika innehållet som den fastnar på.
        error.nodeRef.value = '';
        // Ger en fokusram runt där den ger error.
        error.nodeRef.focus();
    }
    return false;
}

console.log(users);

function saveUserToLocalStorage() {
    // Skapar ett tomt objekt varje gång för att lägga in den nya inputsen från användaren.
    let userObject = {};
    // Här sparas samtliga datainput som gjorts i ett nytt objekt.
    userObject.userName = userNameRef.value;
    userObject.password = passwordRef.value;
    userObject.passwordConfirmed = passwordConfirmRef.value;
    userObject.firstName = firstNameRef.value;
    
    // // Här läggs objekten in i arrayen users.
    // users.push(userObject);
    // Här hämtas den befintliga arrayen i localStorage och argumentetet 'users' som ska sökas efter.
    let usersArray = getDataFromLocalStorage('users')
    // Här läggs den nya objektet in i den befintliga arrayen i LocalStorage.
    usersArray.push(userObject);
    // Här skrivs det över den befintliga 'users' i LocalStorage.
    localStorage.setItem('users', JSON.stringify(usersArray));
}

// Funktionen tar in en input för att söka efter det keynamnet i LocalStorage. Har anget 'users' som skickas med som argument.
function getDataFromLocalStorage(input) {
    // Om 'users' inte finns med så kommer det istället tilldelas en tom array.
    const getData = localStorage.getItem(input) || '[]';
    // Då en hämtning från localstorage är i sträng så måste den omvandlas genom JSON.parse för att bli en array.    
    return JSON.parse(getData);
}

// En timer som tar bort ett element efter en viss angiven sekunder. Används för att ta bort p-elementet när ett konto har skapats.
function removeElementTimer(element, time) {
    setTimeout(() => {
        element.remove();
    }, time)
};

// Funktionen som kollar ifall användarnamnet finns i LocalStorage
function doesUserExist(input) {
    let storedData = JSON.parse(localStorage.getItem('users'));
   
    let name = storedData.map(user => user.userName);
    if (name.includes(input)) {
        return true
    } else {
        return false
    }
}

function isPasswordIncorrect(userName, password) {
    // Hämtar hem datan från local storage och sparar den i storeData som en array.
    let users = JSON.parse(localStorage.getItem('users'));

    // Här loopas det genom all för att se ifall det finns någon matchning i varje objekt
    for(let user of users) {
        // Om det matchas så skickas false då vi kontrollerar i denna funktion om lösenordet är inkorrekt.
        if(user.userName === userName && user.password === password) {
            return false
        }
    }
    // Om den inte matchar så kommer det returneras true och då kommer det att köras en error i validateLogin
    return true;

}

function getLoginName(userName) {
    const users = JSON.parse(localStorage.getItem('users'));

    for (let user of users) {
        if (user.userName === userName) {
            return user.firstName;
        }
    }
}