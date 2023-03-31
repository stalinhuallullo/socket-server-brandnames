const Brand = require("./brand")

class BrandList {
    constructor() {
        this.brands = [
            new Brand('Taylor Swift'),
            new Brand('Hombres G')
        ]
    }

    addBrand(name) {
        const brand = new Brand(name)
        this.brands.push(brand)
        return this.brands
    }

    removeBrand(id) {
        this.brands = this.brands.filter((brand) => brand.id !== id )
    }

    getBrands() {
        return this.brands;
    }

    increaseVotes( id ) {
        this.brands = this.brands.map( band => {

            if ( band.id === id ) {
                band.votes += 1;
            }

            return band;

        })
    }

    changeName( id, newName ) {
        this.brands = this.brands.map( band => {

            if ( band.id === id ) {
                band.name = newName;
            }

            return band;

        })
    }
}

module.exports = BrandList