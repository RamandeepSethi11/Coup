import { Component, OnInit, ɵConsole } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { CardsNo } from '../shared/cards-no.model';
import { NameCards } from '../shared/name-cards.model';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userDetails:any;
member:string;
nameCards:NameCards;
firstCardImage:string;
secondCardImage:string;
totalCards:number[]=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
randomNumber1:number;
randomNumber2:number;
names;
cards=[
  'Contessa','Contessa','Contessa',
  'Captain','Captain','Captain',
  'Assassin','Assassin','Assassin',
  'Duke','Duke','Duke',
  'Ambassador','Ambassador','Ambassador'
];
  constructor(private authService:AuthService, private http:HttpClient, public db:AngularFireDatabase) {
   }

  ngOnInit() {
    this.userDetails=JSON.parse(localStorage.getItem('user'));
 this.http.get<number[]>('https://coup-9f2fe.firebaseio.com/leftCards.json').subscribe(Cards=>{
    this.http.put<number[]>('https://coup-9f2fe.firebaseio.com/leftCards.json',this.totalCards).subscribe(Total=>{ 
      if(Cards==null)
      {
       Cards=Total;
      }
      this.totalCards=Cards;
      this.randomNumber1=this.totalCards[(Math.floor(Math.random() * (this.totalCards).length))];
  this.totalCards=this.totalCards.filter(v=>v!=this.randomNumber1);
  this.randomNumber2=this.totalCards[(Math.floor(Math.random() * (this.totalCards).length))];
  switch(this.randomNumber1)
    {
      case 0:
      case 1:
      case 2:
      {
        this.firstCardImage='assets/images/Contessa.png';
        break;
      }
      case 3:
        case 4:
          case 5:
      {
        this.firstCardImage='assets/images/Captain.png';
        break;
      }
      case 6:
        case 7:
          case 8:
      {
        this.firstCardImage='assets/images/Assassin.png';
        break;
      }
      case 9:
        case 10:
          case 11:
      {
        this.firstCardImage='assets/images/Duke.png';
        break;
      }
      case 12:
        case 13:
          case 14:
      {
        this.firstCardImage='assets/images/Ambassador.png';
        break;
      }
    }

    switch(this.randomNumber2)
    {
      case 0:
      case 1:
      case 2:
      {
        this.secondCardImage='assets/images/Contessa.png';
        break;
      }
      case 3:
        case 4:
          case 5:
      {
        this.secondCardImage='assets/images/Captain.png';
        break;
      }
      case 6:
        case 7:
          case 8:
      {
        this.secondCardImage='assets/images/Assassin.png';
        break;
      }
      case 9:
        case 10:
          case 11:
      {
        this.secondCardImage='assets/images/Duke.png';
        break;
      }
      case 12:
        case 13:
          case 14:
      {
        this.secondCardImage='assets/images/Ambassador.png';
        break;
      }
    }
  this.totalCards=this.totalCards.filter(v=>v!=this.randomNumber2);
  this.nameCards={name:this.userDetails,cards:[this.randomNumber1,this.randomNumber2],image:[this.firstCardImage,this.secondCardImage]};
  this.db.list('/nameCards').valueChanges().subscribe(namesReturn=>
    {this.names=namesReturn;
    })
    
  this.http.post<NameCards[]>('https://coup-9f2fe.firebaseio.com/nameCards.json',this.nameCards).subscribe(response=>{
  this.http.put('https://coup-9f2fe.firebaseio.com/leftCards.json',this.totalCards).subscribe(response=>{
  });
});
    this.db.list('/CardsNo').valueChanges().subscribe(response=>{
      if(response==null)
      {
        this.http.put('https://coup-9f2fe.firebaseio.com/CardsNo.json',this.cards).subscribe(response=>{
        });
      }
    });
    });
        });
    this.authService.fetchUsers().subscribe(response=>{
      this.authService.count=response;
      switch(this.authService.count)
    {
      case 1:
      {
        this.member='First Player';
        break;
      }
      case 2:
      {
        this.member='Second Player';
        break;
      }
      case 3:
      {
        this.member='Third Player';
        break;
      }
      case 4:
      {
        this.member='Forth Player';
        break;
      }
      case 5:
      {
        this.member='Fifth Player';
        break;
      }
      case 6:
      {
        this.member='Sixth Player';
        break;
      }
      default:
      {
        this.member='Maximum players have joined the game';
        break;
      }
    }
    });
     }
}
