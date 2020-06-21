import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userDetails:any;
member:string;
  constructor(private authService:AuthService) {
   }

  ngOnInit() {
    this.userDetails=JSON.parse(localStorage.getItem('user'));
    this.authService.fetchUsers().subscribe(response=>{
      this.authService.count=response;
      switch(this.authService.count)
    {
      case 1:
      {
        this.member='You are first one to join the game';
        break;
      }
      case 2:
      {
        this.member='You are second one to join the game';
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
