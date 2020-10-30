import { DB } from "../utilitis/db-connect";
import { DB_PROCS } from "../utilitis/procs";
import { Query } from "../models/query";
import { UserResponse } from "../models/user";

export class UserFacade {

    private static PROCS = DB_PROCS.USER;

    static async getUser(userId: number): Promise<UserResponse> {
        const procArguments = {
            id: userId
        };
        const query = new Query({
            name: this.PROCS.GET,
            arguments: procArguments
        });
        return DB.query(query).then((response) => response[0]);
    }

    static async getUsers(searchText: string, pageNo: number, count: number): Promise<UserResponse> {
        const procArguments = {
            searchText: searchText,
            pageNo: pageNo,
            count: count
        };
        const query = new Query({
            name: this.PROCS.GET,
            arguments: procArguments
        });
        return DB.query(query).then((response) => response[0]);
    }
}
