document.addEventListener('DOMContentLoaded', function() {
    const prendaId = new URLSearchParams(window.location.search).get('id');

    fetch(`http://localhost:3000/prenda/${prendaId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('nombrePrenda').textContent = data.nombre;
            document.getElementById('imagenPrenda').src = `./img/${data.imagen}`;
            document.getElementById('descripcionPrenda').textContent = data.descripcion;
            document.getElementById('categoriaPrenda').textContent = data.categoria_id;
            document.getElementById('autorPrenda').textContent = data.autor_id;
        })
        .catch(error => console.error('Error al obtener la prenda:', error));

    document.getElementById('deleteButton').addEventListener('click', function() {
        if (confirm('¿Estás seguro de que deseas eliminar esta prenda?')) {
            fetch(`http://localhost:3000/prenda/${prendaId}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('Prenda eliminada exitosamente');
                window.location.href = './index.html';
            })
            .catch(error => {
                console.error('Error al eliminar la prenda:', error);
                alert('Error al eliminar la prenda');
            });
        }
    });
});
