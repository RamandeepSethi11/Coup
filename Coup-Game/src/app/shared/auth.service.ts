import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { User } from "./user.model";
import { Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from "@angular/fire/auth";
import { NameCards } from './name-cards.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  nameCards:NameCards;
  count:number;
  constructor(public router: Router,
    public ngZone: NgZone,
    private http:HttpClient,
    public afAuth: AngularFireAuth) {
      this.afAuth.authState.subscribe(user => {
        this.user = user;
      })
     }
// Firebase SignInWithPopup
OAuthProvider(provider) {
  return this.afAuth.signInWithPopup(provider)
      .then((res) => {
          this.ngZone.run(() => {
            localStorage.setItem('user', JSON.stringify(res));
          })
      }).catch((error) => {
          window.alert(error)
      })
}

// Firebase Google Sign-in
SigninWithGoogle() {
  return this.OAuthProvider(new auth.GoogleAuthProvider())
      .then(res => {
        this.fetchUsers().subscribe(response=>{
          this.count=response;
          this.http.put<number>('https://coup-9f2fe.firebaseio.com/count.json',(this.count)+1).subscribe(response=>{
            this.router.navigate(['home']);
});
        });
      })
      .catch(error => {
          console.log(error)
      });
}

// Firebase Logout 
SignOut() {
  return this.afAuth.signOut().then(() => {
    localStorage.setItem('user', null);
      this.router.navigate(['login']);
  })
}

//Fetch Users
fetchUsers()
{
return this.http.get<number>('https://coup-9f2fe.firebaseio.com/users.json');
}

//Go to home
goToHome(name:string)
{
  localStorage.setItem('user', JSON.stringify(name));
  this.fetchUsers().subscribe(response=>{
    this.count=response;
    this.http.put<number>('https://coup-9f2fe.firebaseio.com/users.json',(this.count)+1).subscribe(response=>{
        this.nameCards={name:name,cards:[],image:[]};
        this.router.navigate(['home']);
  });
});
}
}
