import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { TOFriend } from 'src/app/t-o-models/t-o-friend.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  @Input() type = "";
  user: User = new User(null,null,null,null,null,null,null,null,[],null);
  friends: TOFriend[] = [];
  users: User[] = []

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    if(this.type == "requests"){
      this.userService.requestUser.subscribe(
        result => {
          this.user = result;
          for(let friend of this.user.tOFriendsB){
            if(friend.status == 'pending'){
              this.friends.push(friend);
            }
          }
        }
      )
    }

    if(this.type == "friends"){
      this.userService.friendsUser.subscribe(
        result => {
          this.user = result;
          for(let friend of this.user.tOFriendsA){
            if(friend.status == 'accepted'){
              this.friends.push(friend);
            }
          }
          for(let friend of this.user.tOFriendsB){
            if(friend.status == 'accepted'){
              this.friends.push(friend);
            }
          }
        }
      )
    }

    if(this.type == "search"){
      this.userService.searchUser.subscribe(
        response => {
          this.user = response;

          this.userService.getAllUsers().subscribe(
            response => {
              this.users = response;

              let id = this.users.indexOf(this.user);
              this.users.splice(id,1);

              for(let friend of this.user.tOFriendsA){
                id = this.users.indexOf(friend.friendB);
                this.users.splice(id,1);
              }

              for(let friend of this.user.tOFriendsB){
                id = this.users.indexOf(friend.friendA);
                this.users.splice(id,1);
              }
            }
          );
        } 
      )
    }
  }
}
