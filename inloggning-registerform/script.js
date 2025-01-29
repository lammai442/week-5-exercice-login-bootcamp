const users = [];
let registerFormRef = document.querySelector('#registerForm');
registerFormRef.classList.add('d-none');

let loginFormRef = document.querySelector('#loginForm');

let registerAccountBtnRef = document.querySelector('#registerAccountBtn');

// Login sidan - Om användaren klickar på registrera konto så körs följande.
registerAccountBtnRef.addEventListener('click', (event) => {
    // Här göms loginformuläret och den andra syns. Event skickas med då .preventDefault() kräver det för att köras i nedanstående funktion.
    swapRegisterLoginForm(event);
});

// Register sidan - Om användaren klickar på 'Till logga in' så körs följande.
// registerFormRef.addEventListener('submit', (event) => {
//     // Här göms registerformuläret och den andra syns. Event skickas med då .preventDefault() kräver det för att köras i nedanstående funktion.
//     swapRegisterLoginForm(event);
// });

// Funktion för att toggla mellan klassen 'd-none' där den antingen lägger till eller tar bort klassen.
function swapRegisterLoginForm(event) {
    // Denna gör så att sidan inte laddas om efter submit. Parametern event behövs här för att funktionen ska köras.
    event.preventDefault();
    registerFormRef.classList.toggle('d-none');
    loginFormRef.classList.toggle('d-none');
}

////REGISTER////
const userNameRef = document.querySelector('#userName');
const passwordRef = document.querySelector('#password');
const passwordConfirmRef = document.querySelector('#passwordConfirm');
const checkboxRef = document.querySelector('#checkbox');
const registerBtnRef = document.querySelector('#registerBtn');

// Knapp för att registrera en ny användare. Det kommer göras validering
registerBtnRef.addEventListener('click', (event) => {
    // Förhindrar att formuläret uppdaterar sidan.
    event.preventDefault();
    if (validateRegistration()) {
        // lagra innehållet till databasen med user
        console.log('Formuläret är skickat');
    } else {
        console.log('Du har fått fel');
    }
});

function validateRegistration() {
    const userNameRef = document.querySelector('#userName');
    const passwordRef = document.querySelector('#password');
    const passwordConfirmRef = document.querySelector('#passwordConfirm');
    const checkboxRef = document.querySelector('#checkbox');
    const registerBtnRef = document.querySelector('#registerBtn');
    const errorMsgRef = document.querySelector('#errorMsg-register');
    const labelRef = document.querySelector('#label');

    try {
        // Kontrollerar att användarnamnet inte är kortare än 6 texten.
        if (userNameRef.value.length < 6) {
            throw {
                message: 'Du måste ange mer än 6 tecken',
                nodeRef: userNameRef,
            };
        } // password måste bestå av minst 8 tecken
        else if (passwordRef.value.length < 8) {
            throw {
                message: 'Ditt lösenord är för kort. Du måste fylla i minst 8 tecken.',
                nodeRef: passwordRef,
            };
        } // password och password again måste vara identiska
        else if (!(passwordRef.value === passwordConfirmRef.value)) {
            throw {
                message: 'Dina lösenord stämmer inte överens. Fyll i rätt lösenord.',
                nodeRef: passwordConfirmRef,
            };
        } // checkboxen måste vara checked
        else if (!checkboxRef.checked) {
            throw {
                message: 'Du måste godkänna för registring',
                nodeRef: checkboxRef,
            };
        }
        userNameRef.value = '';
        passwordRef.value = '';
        passwordConfirmRef.value = '';
        checkboxRef.checked = false;

        return true;
    } catch (error) {
        errorMsgRef.textContent = error.message;
        error.nodeRef.value = '';
        console.log(error);

        error.nodeRef.focus();
    }
    return false;

    // username får inte vara upptaget

    console.log('validateRegistration');
}
