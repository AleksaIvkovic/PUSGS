import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { TOFriend } from 'src/app/t-o-models/t-o-friend.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @Input() user: User = new User(null,null,null,null,null,null,null,null,[],null);
  @Input() friend: TOFriend = new TOFriend();
  @Input() type: string = "";

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.friend.friendA.userName == this.user.userName){
      this.user = this.friend.friendB;
    }
    else{
      this.user = this.friend.friendA;
    }
  }

  Add(){
    this.userService.MakeRequest(JSON.parse(localStorage.getItem('user')),this.user).subscribe(
      result =>{

      },
      error => {

      }
    )
  }

  Decline(){
    this.userService.DeclineRequest(this.friend.id).subscribe(
      result =>{

      },
      error => {
        
      }
    )
  }

  Accept(){
    this.userService.UpdateStatus(this.friend.id, "accepted").subscribe(
      result =>{

      },
      error => {
        
      }
    )
  }

  Remove(){
    this.userService.DeclineRequest(this.friend.id).subscribe(
      result =>{

      },
      error => {
        
      }
    )    
  }
}
