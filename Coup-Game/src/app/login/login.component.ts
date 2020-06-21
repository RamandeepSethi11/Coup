import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }
  imageObject: Array<object> = [
    {
    image: 'assets/images/Captain.png',
    thumbImage: 'assets/images/Captain.png',
    alt: 'alt of image',
    title: 'CAPTAIN'
  }, {
    image: 'assets/images/Duke.png',
    thumbImage: 'assets/images/Duke.png',
    title: 'DUKE',
    alt: 'Image alt'
  }, {
    image: 'assets/images/Assassin.png',
    thumbImage: 'assets/images/Assassin.png',
    title: 'ASSASSIN',
    alt: 'Image alt'
  }, {
    image: 'assets/images/Contessa.png',
    thumbImage: 'assets/images/Contessa.png',
    title: 'CONTESSA',
    alt: 'Image alt'
  }
  , {
    image: 'assets/images/Ambassador.png',
    thumbImage: 'assets/images/Ambassador.png',
    title: 'AMBASSADOR',
    alt: 'Image alt'
  }
  ];

  ngOnInit(): void {
  }

}
