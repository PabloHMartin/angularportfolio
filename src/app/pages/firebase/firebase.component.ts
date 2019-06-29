import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {AuthData} from '../../models/authData.model';

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent implements OnInit {

  constructor(public auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  signIn(f){
    this.auth.logIn(f.value);
  }

}
