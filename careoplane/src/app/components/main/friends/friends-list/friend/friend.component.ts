import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  @Input() user: User = new User(null,null,null,null,null,null,null,null,[],null);
  @Input() friend: boolean = false;
  @Input() request: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  Add(){

  }

  Decline(){

  }

  Accept(){

  }

  Remove(){
    
  }
}
