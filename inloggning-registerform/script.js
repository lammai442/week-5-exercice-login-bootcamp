let startFormRef = document.querySelector('#startForm');

startFormRef.addEventListener('submit', (event) => {
    // Denna förhindrar att sidan laddar om sig efter att ha lyssnat på 'submit'
    event.preventDefault();
    // Gömmer startFormen genom att lägga en d-none klass.
    startFormRef.classList.add('d-none');
});
