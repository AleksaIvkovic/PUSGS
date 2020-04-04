import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AirlinesListComponent } from './main/airlines/airlines-list/airlines-list.component';
import { AirlineDetailsComponent } from './main/airlines/airline-details/airline-details.component';
import { AirlinesComponent } from './main/airlines/airlines.component';


const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {path: 'main', component: MainComponent, children: [
    {path: '', redirectTo: '/main/airlines', pathMatch: 'full'},
    {path: 'airlines', component:AirlinesComponent, children: [
      {path: 'list', component: AirlinesListComponent},
      {path: ':id/details', component: AirlineDetailsComponent}
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
