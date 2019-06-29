import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MaterialComponent } from './pages/material/material.component';
import { FirebaseComponent } from './pages/firebase/firebase.component';
import { ToolsComponent } from './pages/tools/tools.component';
// Add your component here

//This is my case 
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'material', component: MaterialComponent},
  {path: 'firebase', component: FirebaseComponent},
  {path: 'tools', component: ToolsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }