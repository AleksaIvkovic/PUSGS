export class User {
    constructor(
        public email: string,
        public password: string,
        public name: string,
        public surname: string,
        public city: string,
        public phoneNumber: string,
    ) {}
}