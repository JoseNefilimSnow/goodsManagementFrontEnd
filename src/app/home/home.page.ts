import { Component, OnInit } from '@angular/core';
import { User } from '../dtos/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  currentUser = JSON.parse(localStorage.getItem("currentUserToken"));
  constructor() {

  }

  ngOnInit() {

  }

}
