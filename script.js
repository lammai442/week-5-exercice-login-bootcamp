// Referera till knappen och lägger in en klickare som anropar funktionen submitForm.

// Referens till formelementet
const formRef = document.querySelector('#form');
// Lägger en klickare på den och submit lyssnar efter när formuläret skickar iväg något. Här anropas submitForm som kollar en validering.
formRef.addEventListener('submit', submitForm);

// DOM-manipulation för att lägga in en knapp.
let removeLocaleStorage = document.createElement('button');
// Läägger till ID till knappen
removeLocaleStorage.id = 'removeLocalStorage';
// Lägger till textinnehåll till den. Annars är den tom.
removeLocaleStorage.textContent = 'Ta bort all data';
// Lägger in den i formelementet.
formRef.appendChild(removeLocaleStorage);

// Refererar till inputfältet för vilken keynamn som man vill ta bort.
let removeDataInputRef = document.querySelector('#removeDataInput');
// Lägger till en klickare på knappen och event behövs för att kunna köra preventDefault()
removeLocaleStorage.addEventListener('click', (event) => {
    // Denna gör så att formen inte uppdaterar sig själv.
    event.preventDefault();
    // Anropar funktionen som tar emot ett värde och rensar den.
    removeKeyFromLocalStorage(removeDataInputRef.value.toLowerCase());
});

// Funktionen gör så att sidan inte uppdaterar sig själv. Här kommer parametern att spela roll då den måste läggas en funktion på den inkommande lyssnaren.
function submitForm(event) {
    // Denna gör så att sidan inte uppdaterar sig själv.
    event.preventDefault();

    // Om valideringen är true så sparas den i localStorage
    if (validateForm()) {
        console.log('The form is complete!');
        // Här sparas det som finns i userInput i localStorage. Det sparas som en array genom att man måste ange JSON.stringify
        localStorage.setItem('more', JSON.stringify(userInput));

        // Om den är false så skickas inte formuläret
    } else {
        console.log('False! Du har inte angett allt korrekt!');
    }
    // Här loggas funktionen för att hämta en viss keynames value genom att ange vilket keyname i localStorage
    console.log(getDataFromLocalStorage('more'));
    console.log(getNameFromLocalStorage());
}
// lägger variabeln innehållande objektet utanför funktionen som ska senare sparas in i localStorage.
const userInput = {};

// Funktione för att validera formuläret
function validateForm() {
    const nameRef = document.querySelector('#name');
    const phoneRef = document.querySelector('#phone');
    const emailRef = document.querySelector('#email');
    const msgRef = document.querySelector('#msg');
    const checkBoxConditionsRef = document.querySelector('#checkBoxConditions');
    const removeLocalStorageRef = document.querySelector('#removeLocalStorage');

    userInput.name = nameRef.value;
    userInput.phone = phoneRef.value;
    userInput.email = emailRef.value;
    userInput.msg = msgRef.value;
    userInput.checkBoxConditions = checkBoxConditionsRef.checked;
    console.log(userInput);
    try {
        if (nameRef.value.length < 5) {
            throw {
                // Vilket meddelande som kommer skickas ner till catchdelen.
                message: 'För kort namn',
                // En referens till input-fältet som är kopplat till denna if-sats.
                nodeRef: nameRef,
            };
            // Här kontrolleras om BÅDA fälten är tomma då vi vill att det räcker med 1 är ifylld för att den ska gå vidare.
        } else if (!phoneRef.value === Number) {
            throw {
                message: 'Du får endast ange siffror',
                nodeRef: phoneRef,
            };
        } else if (phoneRef.value === '' && emailRef.value === '') {
            throw {
                // Vilket meddelande som kommer skickas ner till catchdelen.
                message: 'Du måste fylla i antingen telefon eller email.',
                // En referens till input-fältet som är kopplat till denna if-sats. Genom att skicka en array så kommer den kunna skicka med två referenser.
                nodeRef: [phoneRef, emailRef],
            };
        } else if (userInput.msg === '') {
            throw {
                message: 'Du måste fylla i ett meddelande',
                nodeRef: msgRef,
            };
            // Kollar om checkboxen inte är ikryssad.
        } else if (!userInput.checkBoxConditions) {
            throw {
                message: 'Du måste bocka i att du godkänner villkoren',
                nodeRef: checkBoxConditionsRef,
            };
        } else if (removeLocalStorageRef.value === '')
            // Här nollställs errorMsg då den har gått igenom alla kontroller.
            document.querySelector('#errorMsg').textContent = '';

        // Om alla ovanstående try går igenom och är falska så kommer denna metod att returnera true.
        return true;
    } catch (error) {
        // Här görs en kontroll ifall det är en array som skickas in. Och om det är det så går den in i denna ifsats som måste loopa igenom båda
        if (Array.isArray(error.nodeRef)) {
            error.nodeRef.forEach((ref) => {
                ref.value = ''; /* Tömmer först fältet */
            });
            // Här måste man lägga in vilket index som den ska fokusera på. Det går bara att lägga fokus på en åt gången.
            error.nodeRef[0].focus();
        }
        // För att kolla att nodeRefen är en checkbox.
        else if (error.nodeRef.type === 'checkbox') {
            error.nodeRef.focus();
        }
        // Denna else-sats kommer ta alla strängar då de två övriga tar arrayen och en tar checkbox.
        else {
            error.nodeRef.value = ''; /* Tömmer fältet för den trymetod som fångades */
            error.nodeRef.focus(); /* Sätter en focusram runt själva inputfältet */
        }
        document.querySelector('#errorMsg').textContent = error.message;
    }
}

// Funktionen som hämtar all data från localstorage
function getDataFromLocalStorage(input) {
    // Först måste datan hämtas hem till en variabel.
    let getData = localStorage.getItem(input);
    return JSON.parse(getData);
}

function getNameFromLocalStorage() {
    // Här hämtas det hem som en sträng som genom att leta efter keyname 'user'.
    let getData = localStorage.getItem('user');

    // Nu måste den göras om till ett objekt för att kunna returnera t ex keyname 'name'
    let user = JSON.parse(getData).name;
    return user;
}

// Funktion för att ta bort en specifik keyname genom inputfältet.
function removeKeyFromLocalStorage(input) {
    localStorage.removeItem(input);
}
