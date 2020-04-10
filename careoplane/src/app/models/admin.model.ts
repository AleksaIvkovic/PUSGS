export class Admin {
    constructor(
        public email: string,
        public pass: string,
        public type: string,
        public company: any = ''
    ) {}
}