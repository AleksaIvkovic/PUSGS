import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {

  constructor(private router: Router, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.activeRoute.params
    // .subscribe(
    //   () => {
    //     this.router.navigate(['list'], {relativeTo: this.activeRoute});
    //   }
    // );
  }

}
