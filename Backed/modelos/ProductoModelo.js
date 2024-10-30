class Producto {
    constructor(data) {
        this.id = data.id;
        this.nombreP = data.nombreP;
        this.cantidad = data.cantidad;
        this.precio = data.precio;
    }
    set id(id) {
        this._id = id;
    }
    set nombreP(nombreP) {
        this._nombreP=nombreP;
    }
    set cantidad(cantidad) {
        this._cantidad = cantidad;
    }
    set precio(precio) {
        this._precio = precio;   
    }

    get id() {
        return this._id;
    }

    get nombreP() {
        return this._nombreP;
    }
    get cantidad() {
        return this._cantidad;
    }
    get precio() {
        return this._precio;
    }
    get getProducto() {
        const conid={
            id: this._id,
            nombreP: this.nombreP,
            cantidad: this.cantidad,
            precio: this.precio
        }
        const sinid={
            nombreP: this.nombreP,
            cantidad: this.cantidad,
            precio: this.precio
        }
        if (this.id==undefined) {
            return sinid;
        }
        else{
            return conid;
        }
    }
}

module.exports = Producto;