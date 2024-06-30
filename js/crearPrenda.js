document.getElementById('createForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);

    fetch('http://localhost:3000/prenda', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Prenda creada:', data);
        alert('Prenda creada exitosamente');
        window.location.href = './index.html'; // Redirigir a la página principal después de crear la prenda
    })
    .catch(error => {
        console.error('Error al crear la prenda:', error);
        alert('Error al crear la prenda');
    });
});
