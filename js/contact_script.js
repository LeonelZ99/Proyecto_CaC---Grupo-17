window.addEventListener('load', ()=>{
    const form = document.getElementById('formm-contact');
    const nombre = document.getElementById('floatingInputGridNom');
    const apellido = document.getElementById('floatingInputGridApe');
    const email = document.getElementById('floatingInputGridmail');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        validaCampos()
    })
    const validaCampos = ()=> {
        // capturar lo ingresado por el ususario
        const validNombre = nombre.value;
        const validApellido = apellido.value;
        const validEmail = email.value;
        

        if (!validNombre){
            console.log('Ingrese su Nombre')
            alert ('Ingrese su nombre');
            
        }else{
            console.log(validNombre)
        }

        if (!validApellido){
            console.log('Ingrese su Apellido')
            alert ('Ingrese su apellido');
            
        }else{
            console.log(validApellido)
        }

    }
})



// form.submit