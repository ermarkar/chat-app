import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from "./user.service";

@Component({
    selector: 'user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

    users: User[];

    selectedUser: User;

    // list of friends of selected user
    selectedUserFriends: User[];

    show: { loader: boolean } = { loader: true };

    // to show messages to user
    message: string;

    constructor(private userService: UserService) { }

    ngOnInit(): void {
        this._loadUsers("");
    }

    async showUserFriends(user: User): Promise<any> {
        const _frinedsInfo = await this.userService.getUserFriends(user.id).toPromise();
        this.selectedUserFriends = _frinedsInfo.data;

        const _names = this.selectedUserFriends.map((_user) => _user.fullName);
        alert(_names);
    }

    showUser(user: User): void {
        this.selectedUser = user;
    }

    /**
     * Load users
     * @param searchText Search text
     * @param pageNo Page no
     * @param count count of users
     */
    private async _loadUsers(searchText: string, pageNo?: number, count?: number): Promise<any> {
        this.show.loader = true;
        try {
            const _usersInfo: { data: User[] } = await this.userService.getUsers("", pageNo, count).toPromise();
            this.users = _usersInfo.data;
            this.message = null;
        } catch {
            console.log("Unable to load users");
            this.message = "Unable to load users";
        } finally {
            this.show.loader = false;
        }
    }
}
