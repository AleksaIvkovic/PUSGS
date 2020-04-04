import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';


const routes: Routes = [
  {path: '', redirectTo: '/main'},
  {path: 'main', component: MainComponent, children: [
    {path: 'list', component: },
    {path: ':id/details', component: },
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
