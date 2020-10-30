export class Query {
    name: string;
    arguments: string;
    constructor(data: {
        name: string,
        arguments: any
    }) {
        this.name = data.name;
        this.arguments = data.arguments;
    }
}