import { Component, OnInit } from '@angular/core';
import { User } from '../dtos/user';
import { UtilsService } from '../utils/utils.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: User[] = [];


  currentUser = JSON.parse(localStorage.getItem("currentUserToken"));
  constructor(private utils: UtilsService, private userServ: UserService, private route: Router) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.users = [];
    this.userServ.getUsers().subscribe(users => {
      this.users = users;

    })


  }

  checkPermissions() {
    return (this.currentUser.permission === 'ADMIN') ? true : false;
  }


  delete(id) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea eliminar este informe?", [{
      text: "Confirmar", handler: _ => {
        this.userServ.deleteUser(id).subscribe(res => {
          this.utils.presentToast("Usero Eliminado", 3000, "top");
          this.ionViewWillEnter();
        }
        );
      }
    },
    { text: "Cancelar" }])

  }


}
