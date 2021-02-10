export class Order {
    _id: string;
    country: string;
    city: string;
    address: string;
    status: string;

    constructor(_id: string, country: string, city: string, address: string, status: string) {
        this._id = _id;
        this.country = country;
        this.city = city;
        this.address = address;
        this.status = status;
    }
}
