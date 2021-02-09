export class User {
    email: string;
    password: string;
    fullName: string = '';
    phoneNumber: string = '';
    address: string = '';
    city: string = '';
    country: string = '';
    favoriteItems: string[];
    currency: string = 'USD';
}