document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const prendaId = urlParams.get('id');
    console.log(prendaId);

    if (!prendaId) {
        console.error('ID de prenda no encontrado en la URL');
        
        // window.location.href = './index.html';
        return;
    }

    fetch(`http://localhost:3000/prenda/${prendaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se encontró la prenda');
            }
            return response.json();
        })
        .then(prenda => {
            // Actualiza el contenido HTML con los datos de la prenda
            document.getElementById('nombrePrenda').textContent = prenda.nombre;
            document.getElementById('imagenPrenda').src = `./img/${prenda.imagen}`;
            document.getElementById('descripcionPrenda').textContent = prenda.descripcion;
            document.getElementById('categoriaPrenda').textContent = `Categoría: ${prenda.categoria}`;
            document.getElementById('autorPrenda').textContent = `Autor: ${prenda.autor}`;
            
        })
        .catch(error => console.error('Error al obtener los detalles de la prenda:', error));
});
