// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener la cadena de consulta (query string) de la URL actual
    const queryString = window.location.search;
    
    // Crear un objeto URLSearchParams a partir de la cadena de consulta
    const urlParams = new URLSearchParams(queryString);
    
    // Obtener el valor del parámetro 'id' de la cadena de consulta
    const productId = urlParams.get('id');

    // Verificar si se proporcionó un identificador de producto válido
    if (productId) {
        // Aquí podrías tener una función para obtener la información del producto
        // por su identificador único (productId) y luego mostrar la información
        // en la página de detalles del producto

        // Por ejemplo, puedes utilizar el identificador para cargar dinámicamente
        // la información del producto en los elementos HTML de la página
        loadProductInfo(productId);
    } else {
        // Si no se proporcionó un identificador de producto válido, ocultar la publicación
        const postDiv = document.querySelector('.post');
        postDiv.style.display = 'none';
        // O mostrar un mensaje de error, etc., según sea necesario
    }
});

// Función para cargar dinámicamente la información del producto en la página
function loadProductInfo(productId) {
    // Aquí puedes realizar una solicitud AJAX para obtener la información del producto
    // desde un servidor o utilizar una base de datos local

    // Por ahora, solo como ejemplo, aquí estamos simulando la carga de información
    // del producto utilizando un objeto estático
    const productInfo = getProductInfo(productId);

    // Actualizar los elementos HTML de la página con la información del producto
    const productName = document.querySelector('.post h2');
    productName.textContent = productInfo.name;

    const productImage = document.querySelector('.post .card-img-top');
    productImage.src = productInfo.image;

    const productDescription = document.querySelector('.post .post-description');
    productDescription.textContent = productInfo.description;
}

// Función simulada para obtener la información del producto por su identificador único
function getProductInfo(productId) {
    // Esta es solo una simulación, deberías implementar la lógica real
    // para obtener la información del producto según tu configuración
    const products = {
        'boina-marron': {
            name: 'Boina Marrón',
            image: 'img/boina-marron.jpg',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit...'
        },
        // Otras entradas de productos aquí...
    };

    return products[productId];
}
