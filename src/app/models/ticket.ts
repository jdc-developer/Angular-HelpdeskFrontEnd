import { User } from './user';

export class Ticket {
    constructor(
        public id: number,
        public number: number,
        public description: string,
        public title: string,
        public status: string,
        public priority: string,
        public imageThumb: string,
        public image: number[],
        public user: User,
        public assignedUser: User,
        public date: string,
        public changes: Array<string>
    ) { }
}
