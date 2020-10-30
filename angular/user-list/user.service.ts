import { Injectable } from "@angular/core";
import { Observable, Subject } from 'rxjs';
import { User, UserResponse } from './user';

@Injectable({
    providedIn: "root"
})
export class UserService {
    users: User[] = [
        new User({
            id: 1,
            firstName: "Sunny",
            lastName: null,
            avatarUrl: null
        }),
        new User({
            id: 2,
            firstName: "Rahul",
            lastName: "Singh",
            avatarUrl: null
        }),
        new User({
            id: 3,
            firstName: "Dev",
            lastName: "Patel",
            avatarUrl: null
        })
    ];

    getUsers(searchText: string, pageNo = 1, count = 50): Observable<UserResponse> {
        // to avoid ts-list errors but it will be useed in server api call
        console.log(pageNo, count);
        const _response$ = new Subject<UserResponse>();
        setTimeout(() => {
            _response$.next(new UserResponse({
                data: this.users,
                dataCount: this.users.length
            }));
            _response$.complete();
        }, 2000);
        return _response$;
    }

    /**
     * Get friends of user
     * @param userId Id of the user
     */
    getUserFriends(userId: number): Observable<UserResponse> {
        const _response$ = new Subject<UserResponse>();
        setTimeout(() => {
            const _users = this.users.filter((_user) => _user.id !== userId);
            _response$.next(new UserResponse({
                dataCount: _users.length,
                data: _users
            }));
            _response$.complete()

        }, 2000);
        return _response$;
    }
}