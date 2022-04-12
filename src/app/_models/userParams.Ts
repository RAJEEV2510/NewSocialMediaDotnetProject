import { User } from '../InterFaces/User';

export class UserParams {

    gender: string;
    pageNumber = 1;
    pageSize = 5;
    orderBy: string = 'lastActive'

    constructor(user: User) {
        this.gender = user.gender === "female" ? "male" : "female"

    }

}