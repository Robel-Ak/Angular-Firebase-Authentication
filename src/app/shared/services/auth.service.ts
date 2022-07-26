import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(public afAuth: AngularFireAuth,public router: Router) { }
  SignUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  SignIn(email, password) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        
        window.alert('You have successfully Logged in!');
        this.isLoggedIn = true;
        console.log(result);
        
      this.router.navigate(['dashboard']);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignOut() {
    return this.afAuth.signOut().then((result) => {
        
      window.alert('You have successfully Logged out!');
      this.isLoggedIn = false;
      console.log(result);
      
    })
    .catch((error) => {
      window.alert(error.message);
    });
  }
  isAuthenticated(){
    return this.isLoggedIn;
  }
}
