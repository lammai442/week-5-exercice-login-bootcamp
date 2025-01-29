let registerFormRef = document.querySelector('#registerForm');
registerFormRef.classList.add('d-none');

let loginFormRef = document.querySelector('#loginForm');

let registerAccountBtnRef = document.querySelector('#registerAccountBtn');

// Login sidan - Om användaren klickar på registrera konto så körs följande.
loginFormRef.addEventListener('submit', (event) => {
    // Här göms loginformuläret och den andra syns. Event skickas med då .preventDefault() kräver det för att köras i nedanstående funktion.
    swapRegisterLoginForm(event);
});

// Register sidan - Om användaren klickar på 'Till logga in' så körs följande.
registerFormRef.addEventListener('submit', (event) => {
    // Här göms registerformuläret och den andra syns. Event skickas med då .preventDefault() kräver det för att köras i nedanstående funktion.
    swapRegisterLoginForm(event);
});

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

registerBtnRef.addEventListener('click', () => {
    if (validateRegistration()) {
        // lagra innehållet ti
    }
});

function validateRegistration() {
    // username måste bestå av minst 6 tecken
    // username får inte vara upptaget
    // password måste bestå av minst 8 tecken
    // password och password again måste vara identiska
    // checkboxen måste vara checked
    console.log('validateRegistration');
}
