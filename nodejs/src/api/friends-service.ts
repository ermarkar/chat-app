import { Controller, Get, UrlParam, Query } from "giuseppe";
import { UserResponse } from "../models/user";
import { FriendsFacade } from "src/facade/friends-facade";

/**
 * Controller to deal with friends
 */
@Controller("user/friends")
export class UserService {

    /**
     * To get Friends of User
     * @param userId User Id
     * @param pageNo Page No
     * @param count no of friends for a user
     */
    @Get("getFriends/:userId")
    async getFriends(@UrlParam("userId") userId: number,
        @Query("pageNo") pageNo = 1,
        @Query("count") count = 50): Promise<UserResponse> {
        return FriendsFacade.getFriends(userId, pageNo, count);
    }

    /**
     * Get all friends of friends of user
     * @param userId User Id
     * @param pageNo Page no
     * @param count No of friends
     */
    @Get("getFriendsOfFriends/:userId")
    async getFriendsOfFriends(@UrlParam("userId") userId: number,
        @Query("pageNo") pageNo = 1,
        @Query("count") count = 50): Promise<UserResponse> {
        return FriendsFacade.getFriendsOfFriends(userId, pageNo, count);
    }
}
