const BrandList = require('./brand-list');

class Sockets {
    constructor(io){
        this.io = io
        this.brandList = new BrandList();
        this.socketEvents()
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            console.log('Cliente conectado');

            // Emitir al cliente conectado, todas las bandas actuales
            socket.emit( 'current-brands' , this.brandList.getBrands() );

            // votar por la banda
            socket.on( 'votar-banda', ( id ) => {
                this.brandList.increaseVotes( id );
                this.io.emit( 'current-brands' , this.brandList.getBrands() );
            });

            // Borrar banda
            socket.on( 'borrar-banda', ( id ) => {
                this.brandList.removeBrand( id );
                this.io.emit( 'current-brands' , this.brandList.getBrands() );
            });

            // Cambiar nombre de la banda
            socket.on( 'cambiar-nombre-banda', ({ id, nombre }) => {
                this.brandList.changeName(id, nombre);
                this.io.emit( 'current-brands' , this.brandList.getBrands() );
            });

            // Crear una nueva banda
            socket.on( 'crear-banda', ({ nombre }) => {
                this.brandList.addBrand( nombre );
                this.io.emit( 'current-brands' , this.brandList.getBrands() );
            });
            
        
        });
    }
}

module.exports = Sockets