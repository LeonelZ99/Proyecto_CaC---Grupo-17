document.addEventListener('DOMContentLoaded', function() {
    // Función para limpiar los datos en el DOM
    function limpiarDatos() {
        document.getElementById('nombrePrenda').textContent = '';
        document.getElementById('imagenPrenda').src = '';
        document.getElementById('descripcionPrenda').textContent = '';
        document.getElementById('categoriaPrenda').textContent = '';
        document.getElementById('autorPrenda').textContent = '';
        document.getElementById('editNombre').value = '';
        document.getElementById('editDescripcion').value = '';
        document.getElementById('editCategoria_id').value = '';
        document.getElementById('editAutor_id').value = '';
    }

    // Función para cargar los datos del post
    function cargarDatosPost(prendaId) {
        fetch(`http://localhost:3000/prenda/${prendaId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nombrePrenda').textContent = data.nombre;
                document.getElementById('imagenPrenda').src = `./img/${data.imagen}`;
                document.getElementById('descripcionPrenda').textContent = data.descripcion;
                document.getElementById('categoriaPrenda').textContent = `Categoría: ${data.categoria_nombre}`;
                document.getElementById('autorPrenda').textContent = `Autor: ${data.autor_nombre} ${data.autor_apellido}`;

                // Llenar el formulario de edición con los datos actuales
                document.getElementById('editNombre').value = data.nombre;
                document.getElementById('editDescripcion').value = data.descripcion;
                document.getElementById('editCategoria_id').value = data.categoria_id;
                document.getElementById('editAutor_id').value = data.autor_id;
            })
            .catch(error => console.error('Error al obtener la prenda:', error));
    }

    // Limpiar los datos al cargar la página
    limpiarDatos();

    // Obtener el ID de la prenda desde la URL
    const prendaId = new URLSearchParams(window.location.search).get('id');

    // Cargar los datos del post inicial si hay un ID de prenda
    if (prendaId) {
        cargarDatosPost(prendaId);
    }

    // Manejador para el botón de eliminar
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

    // Manejador para el botón de editar
    document.getElementById('editButton').addEventListener('click', function() {
        document.getElementById('editFormContainer').style.display = 'block';
    });

    // Manejador para el formulario de edición
    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        fetch(`http://localhost:3000/prenda/${prendaId}`, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            alert('Prenda actualizada exitosamente');
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al actualizar la prenda:', error);
            alert('Error al actualizar la prenda');
        });
    });
});
