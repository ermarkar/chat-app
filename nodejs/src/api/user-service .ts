import { Controller, Get, Query, UrlParam } from "giuseppe";
import { UserResponse } from "../models/user";
import { UserFacade } from "../facade/user-facade ";

@Controller("user")
export class UserService {

    /**
     * To get all users or single user
     * @param userId Id of the user
     * @param searchText To search user
     * @param pageNo Page no
     * @param count number users from page no
     */
    @Get("getUsers/:userId")
    async getUsers(@UrlParam("userId") userId: number,
        @Query("searchText") searchText: string,
        @Query("pageNo") pageNo = 1,
        @Query("count") count = 50): Promise<UserResponse> {
        if (userId) {
            return UserFacade.getUser(userId);
        } else {
            searchText = searchText === null || searchText === "undefined" ? "" : searchText;
            return UserFacade.getUsers(searchText, pageNo, count);
        }
    }
}
