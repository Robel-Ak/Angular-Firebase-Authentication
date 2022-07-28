import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  isUser = false; 
  role;
  constructor(public afAuth: AngularFireAuth,public router: Router,private afs:AngularFirestore) { }
  SignUp(email, password) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        let user = {
          id: result.user.uid,
          username: result.user.email,
          role: "Admin",
         }
        this.afs.collection('users').add(user)
        .then(() => { 
          window.alert("data added ")})
        .catch((error)=> {
          window.alert(error.message);
        });
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
        this.afs.collection('users').snapshotChanges().subscribe(data => {
          data.forEach((element:any) => {
            let status = element.payload.doc.data();
            if (status && status.role && status.username == email ){
              this.role = status.role;
              this.isLoggedIn = true;
              if (this.role == 'user'){  
                window.alert('You have successfully Logged in As a user!');       
                this.router.navigate(['dashboard']);
              }
              else if(this.role == 'Admin') {
                
                window.alert('You have successfully Logged in As an Admin!');  
                debugger
                this.router.navigate(['admindashboard']);
              }
            }
          
          });
        })
        
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
  getAuthenticatedPrinciple(){
    let principle = {'isLoggedIn':this.isLoggedIn, 'role':this.role};
    return principle;
  }
}
