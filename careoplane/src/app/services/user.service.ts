import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Admin } from '../models/admin.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private user: User = new User(
        'test@gmail.com',
        'pass',
        'Name',
        'Surname',
        'City',
        '123456789'
    );

    private rentACarAdmin: Admin = new Admin(
        'admin@gmail.com',
        'admin',
        false,
        'UNI LINE TTR'
    );

    getMockUpUser(): User {
        return this.user;
    }

    getMockUpRentACarAdmin(): Admin {
        return this.rentACarAdmin;
    }
}