import { DB } from "../utilitis/db-connect";
import { DB_PROCS } from "../utilitis/procs";
import { Query } from "../models/query";
import { UserResponse } from "../models/user";

export class FriendsFacade {

    private static PROCS = DB_PROCS.FRIENDS;

    static async getFriends(userId: number, pageNo: number, count: number): Promise<UserResponse> {
        const procArguments = {
            id: userId,
            pageNo: pageNo,
            count: count
        };
        const query = new Query({
            name: this.PROCS.GET,
            arguments: procArguments
        });
        return DB.query(query).then((response) => response[0]);
    }

    static async getFriendsOfFriends(userId: number, pageNo: number, count: number): Promise<UserResponse> {
        const procArguments = {
            id: userId,
            pageNo: pageNo,
            count: count
        };
        const query = new Query({
            name: this.PROCS.GET_FRIENDS_OF_FRIENDS,
            arguments: procArguments
        });
        return DB.query(query).then((response) => response[0]);
    }

}
