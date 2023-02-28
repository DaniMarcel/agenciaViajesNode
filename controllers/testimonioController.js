import { Testimonio } from '../models/Testimonios.js';

const guardarTestimonio = async (req, res) => {

    // Validar que todos los campos esten llenos
    let { nombre, correo, mensaje } = req.body;

    const errores = [];

    if(nombre.trim() === '') {
        errores.push({ mensaje: 'Agrega tu Nombre' });
    }

    if(correo.trim() === '') {
        errores.push({ mensaje: 'Agrega tu Correo' });
    }

    if(mensaje.trim() === '') {
        errores.push({ mensaje: 'Agrega tu Mensaje' });
    }

    if(errores.length > 0){

        // Consultar testimoniales existentes
        const testimonios = await Testimonio.findAll()

        // Mostrar la vista con errores
        res.render('testimonios', {
            pagina: 'Testimonios',
            errores,
            nombre,
            correo,
            mensaje,
            testimonios
        })
    } else {
        // Almacenarlo en la BD

        try {
            await Testimonio.create({
                nombre,
                correo,
                mensaje
            });
            res.redirect('/testimonios');
            
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonio
}