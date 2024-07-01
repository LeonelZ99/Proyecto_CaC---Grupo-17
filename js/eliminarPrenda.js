document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function() {
        const prendaId = this.dataset.id;

        fetch(`http://localhost:3000/prenda/${prendaId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Prenda eliminada:', data);
            alert('Prenda eliminada exitosamente');
            window.location.reload(); // Recargar la página para actualizar la lista de prendas
        })
        .catch(error => {
            console.error('Error al eliminar la prenda:', error);
            alert('Error al eliminar la prenda');
        });
    });
});
