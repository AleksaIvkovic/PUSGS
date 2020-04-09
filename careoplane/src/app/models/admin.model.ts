export class Admin {
    constructor(
        public email: string,
        public pass: string,
        public sysAdmin: boolean,
        public company: any = ''
    ) {}
}