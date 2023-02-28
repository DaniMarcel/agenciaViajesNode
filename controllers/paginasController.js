import { Viaje } from '../models/Viaje.js'
import { Testimonio } from '../models/Testimonios.js'

const paginaInicio = async (req, res) => { // req: lo que envia el cliente, res: lo que responde el servidor

    const promiseDB = [] // Arreglo de promesas

    promiseDB.push( Viaje.findAll({ limit: 3 }) )
    promiseDB.push( Testimonio.findAll({ limit: 3 }) )

    // Consultar 3 viajes del modelo viaje
    try {
        const resultado = await Promise.all(promiseDB)

        res.render('inicio',{
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1]
        }) 
    } catch (error) {
        console.log(error)
    }


    
}

const paginaNosotros = (req, res) => { // req: lo que envia el cliente, res: lo que responde el servidor
    res.render('Nosotros', {
        pagina: 'Nosotros'
    }) 
}

const paginaViajes = async (req, res) => { // req: lo que envia el cliente, res: lo que responde el servidor
    // Consultar BD
    const viajes = await Viaje.findAll()
    console.log(viajes)

    res.render('viajes', {
        pagina: 'Proximos Viajes',
        viajes
    }) 
}

const paginaTestimonios = async (req, res) => {
    try {
        const testimonios = await Testimonio.findAll()
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios
        }) 
    } catch (error) {
        console.log(error)
    }
    
}

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
   const { slug } =  req.params

   try {
        const viaje = await Viaje.findOne({ where: { slug } })

        res.render('viaje', {
           pagina: 'Informacion Viaje',
           viaje 
        })
   } catch (error) {
        console.log(error)
   }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    paginaDetalleViaje,

}