import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { User } from '../models/user.model';

import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  
  constructor(private afAuth: AngularFireAuth,
    private afs: AngularFirestore,private _snackBar: MatSnackBar) {
          this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
     }


  async webGoogleLogin(){
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
      this.updateUserData(credential.user);
  }

  async webfacebookLogin() {
    const provider = new auth.FacebookAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider)
    .then((credential) => {
      this.updateUserData(credential.user);
    })
    .catch((error) => {
      console.log(error);
          
       this.invalidLoginMsg(error);
    });
  }

  async signOut() {
    await this.afAuth.auth.signOut();
  }


    private updateUserData({ uid, email, displayName,
     photoURL,
     permiteNotificaciones = true }: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      email,
      displayName,
      photoURL,
      permiteNotificaciones
    };

    return userRef.set(data, { merge: true });
  }

  async invalidLoginMsg(error: any) {

    let message = '';

    switch (error.code) {
      case 'auth/email-already-in-use':
          message = 'Email ya en uso';
        break;

        case 'auth/invalid-email':
          message = 'Email no válido';
        break;

        case 'auth/weak-password':
          message = 'La contraseña debe tener al menos 6 caracteres';
        break;

        case 'auth/user-not-found':
          message = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          message = 'Contraseña no válida';
          break;
        case 'auth/too-many-requests':
          message = 'Contraseña no válida';
          break;
        case 'auth/account-exists-with-different-credential':
          message = 'Email ya asociado a otra cuenta';
          break;  
    }

    this._snackBar.open(message, 'OK', {
      duration: 3000,
    });
  }

  async logIn(authData){

   await this.afAuth.auth.signInWithEmailAndPassword(
    authData.email,
    authData.password
  ).then(result =>  {
    this.updateUserData(result.user);
    return true;
  }).catch(error => {
    console.log(error);
    
    this.invalidLoginMsg(error);
      
      return false;
    });
}

}
