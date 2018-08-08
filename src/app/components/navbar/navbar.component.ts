import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  textLogo: string = " Add Post | HW4 | Sergey Zhmailo | Angular Online";

  constructor() { }

  ngOnInit() {
  }

}
