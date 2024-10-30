class Producto {
    constructor(data) {
        this.id = data.id;
        this.cantidad = data.cantidad;
        this.estado = data.estado;
        this.fecha = data.fecha;
        this.hrs = data.hrs;
        this.id_prod = data.id_prod;
        this.id_usu = data.id_usu;
    }
    set id(id) {
        this._id = id;
    }
    set cantidad(cantidad) {
        this._cantidad=cantidad;
    }
    set estado(estado) {
        this._estado = estado;
    }
    set fecha(fecha) {
        this._fecha = fecha;   
    }

    set hrs(hrs) {
        this._hrs=hrs;
    }
    set id_prod(id_prod) {
        this._id_prod = id_prod;
    }
    set id_usu(id_usu) {
        this._id_usu = id_usu;   
    }

    get id() {
        return this._id;
    }

    get cantidad() {
        return this._cantidad;
    }
    get estado() {
        return this._estado;
    }
    get fecha() {
        return this._fecha;
    }
    get hrs() {
        return this._hrs;
    }
    get id_prod() {
        return this._id_prod;
    }
    get id_usu() {
        return this._id_usu;
    }
    get getProducto() {
        const conid={
        id: this._id,
        cantidad: this.cantidad,
        estado: this.estado,
        fecha: this.fecha,
        hrs: this.hrs,
        id_prod: this.id_prod,
        id_usu: this.id_usu
        }
        const sinid={
            cantidad: this.cantidad,
            estado: this.estado,
            fecha: this.fecha,
            hrs: this.hrs,
            id_prod: this.id_prod,
            id_usu: this.id_usu
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