import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'; // Added here

import {MatButtonModule} from '@angular/material/button';
import { ScaffoldComponent } from './scaffold/scaffold.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MaterialModule } from './material';
import { HomeComponent } from './pages/home/home.component';
import { MaterialComponent } from './pages/material/material.component';
import { FirebaseComponent } from './pages/firebase/firebase.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    ScaffoldComponent,
    HomeComponent,
    MaterialComponent,
    FirebaseComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
     AngularFireModule.initializeApp(environment),
     AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
