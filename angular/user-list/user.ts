export class User {
    id: number;
    firstName: string;
    lastName: string;
    avatarUrl: string;
    fullName?: string;
    constructor(data: {
        id: number,
        firstName: string,
        lastName: string,
        avatarUrl: string,
        fullName?: string,
    }) {
        this.id = data.id;
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.avatarUrl = data.avatarUrl;

        this.fullName = data.firstName;

        if (this.lastName) {
            this.fullName = `${this.fullName} ${this.lastName}`;
        }
    }
}

export class UserResponse {
    data: User[];
    dataCount: number;

    constructor(data:{data:User[],dataCount:number}) {
        this.data = data.data;
        this.dataCount = data.dataCount;
    }
}
