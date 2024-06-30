document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/prenda')
        .then(response => response.json())
        .then(prendas => {
            const prendasContainer = document.getElementById('prendas');
            prendas.forEach(prenda => {
                const card = document.createElement('a');
                card.href = `post.html?id=${prenda.id_prenda}`;
                card.className = 'col-md-4 mb-3';
                card.innerHTML = `
                    <div class="card text-center" style="width: 18rem">
                        <img src="./img/${prenda.imagen}" class="card-img-top" alt="${prenda.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${prenda.nombre}</h5>
                        </div>
                    </div>`;
                prendasContainer.appendChild(card);
            });
        })
        .catch(error => console.error('Error al obtener las prendas:', error));
});
