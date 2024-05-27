window.addEventListener('load', ()=>{
    const form = document.getElementById('formm-contact');
    const nombre = document.getElementById('floatingInputGridNom');
    const apellido = document.getElementById('floatingInputGridApe');
    const email = document.getElementById('floatingInputGridmail');
    const texto = document.getElementById('floatingTextarea2');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        validaCampos()
    })
    const validaCampos = ()=> {
        // capturar lo ingresado por el ususario
        const validNombre = nombre.value;
        const validApellido = apellido.value;
        const validEmail = email.value;
        const validText = texto.value;

        if (!validNombre){
            console.log('Ingrese su Nombre')
            alert ('Ingrese su Nombre');
            
        }else{
            console.log(validNombre)
        }

        if (!validApellido){
            console.log('Ingrese su Apellido')
            alert ('Ingrese su Apellido');
            
        }else{
            console.log(validApellido)
        }
        
        if (!validEmail){
            console.log('Ingrese su Mail')
            alert ('Ingrese su E-mail');
            
        }else{
            console.log(validEmail)
        }

        if (!validText){
            console.log('Ingrese su Texto')
            alert ('Escriba su Mensaje');
            
        }else{
            console.log(validText)
        }
    }



})
