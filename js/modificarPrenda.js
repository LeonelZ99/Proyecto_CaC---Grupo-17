document.addEventListener('DOMContentLoaded', function() {
    const prendaId = new URLSearchParams(window.location.search).get('id');
    if (prendaId) {
        fetch(`http://localhost:3000/prenda/${prendaId}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('nombrePrenda').textContent = data.nombre;
                document.getElementById('imagenPrenda').src = `../img/${data.imagen}`;
                document.getElementById('descripcionPrenda').textContent = data.descripcion;
                document.getElementById('categoriaPrenda').textContent = `Categoría: ${data.categoria_id}`;
                document.getElementById('autorPrenda').textContent = `Autor: ${data.autor_id}`;

                document.getElementById('editNombre').value = data.nombre;
                document.getElementById('editDescripcion').value = data.descripcion;
                document.getElementById('editCategoria_id').value = data.categoria_id;
                document.getElementById('editAutor_id').value = data.autor_id;
            })
            .catch(error => console.error('Error al obtener la prenda:', error));
    }

    document.getElementById('editButton').addEventListener('click', function() {
        document.querySelector('.post').style.display = 'none';
        document.getElementById('editFormContainer').style.display = 'block';
    });

    document.getElementById('editForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(this);
        if (!document.getElementById('editImagen').files.length) {
            formData.delete('imagen'); // Si no se seleccionó una nueva imagen, no incluirla en el FormData
        }

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
