import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-friends-list',
  templateUrl: './friends-list.component.html',
  styleUrls: ['./friends-list.component.scss']
})
export class FriendsListComponent implements OnInit {
  user: User = new User(null,null,null,null,null,null,null,null,[],null);
  constructor() { }

  ngOnInit(): void {
    
  }

}
