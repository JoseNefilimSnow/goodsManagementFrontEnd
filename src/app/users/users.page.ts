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

  beautifyEnabled(enabled) {
    if (enabled) {
      return "Si"
    } else {
      return "No"
    }
  }
  delete(id, user) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea borrar este usuario? (Los elementos creados por el mismo se verán eliminados, se recomienda deshabilitar)", [
      { text: "Cancelar" },
      {
        text: "Deshabilitar", handler: _ => {
          let newUser = new User();
          newUser.id = user.id;
          newUser.username = user.username;
          newUser.password = user.password;
          newUser.permission = user.permission;
          newUser.enabled = false;
          this.userServ.updateUser(id, newUser).subscribe(res => {
            this.utils.presentToast("Usuario Deshabilitado", 3000, "top");
            this.ionViewWillEnter();
          }
          );
        }
      },
      {
        text: "Confirmar Borrado", handler: _ => {
          this.userServ.deleteUser(id).subscribe(res => {
            this.utils.presentToast("Usuario Eliminado", 3000, "top");
            this.ionViewWillEnter();
          }
          );
        }
      },
    ])

  }
  reactivate(id, user) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea activar este usuario? ", [
      { text: "Cancelar" },
      {
        text: "Reactivar", handler: _ => {
          let newUser = new User();
          newUser.id = user.id;
          newUser.username = user.username;
          newUser.password = user.password;
          newUser.permission = user.permission;
          newUser.enabled = true;
          this.userServ.updateUser(id, newUser).subscribe(res => {
            this.utils.presentToast("Usuario Reactivado", 3000, "top");
            this.ionViewWillEnter();
          }
          );
        }
      }
    ])

  }

}
