import { TOUser } from '../t-o-models/t-o-user.model';

export class User {
    constructor(
        public role: string,
        public userName: string,
        public email: string,
        public password: string,
        public name: string,
        public surname: string,
        public city: string,
        public phoneNumber: string,
        public reservations: any[] = [],
        public company: string = '',
        public requests: any[] = [],
        public friends: any[] = [],
    ) {}

    public ToTO(): TOUser {
        return new TOUser(
            this.password,
            this.name,
            this.surname,
            this.city,
            this.phoneNumber
        );
    }
}