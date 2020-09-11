import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/dtos/user';
import { UtilsService } from 'src/app/utils/utils.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.page.html',
  styleUrls: ['./userform.page.scss'],
})
export class UserformPage implements OnInit {
  userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    permission: ['', [Validators.required]]
  });


  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private userServ: UserService, private nav: NavController, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  userSubmit() {
    let newUser: User = new User();
    newUser.username = this.userForm.value.username;
    newUser.password = this.userForm.value.password;
    newUser.enabled = true;
    newUser.permission = this.userForm.value.permission;
    this.userServ.createUser(newUser).subscribe(res => {
      this.utils.presentToast("Usuario Creado", 3000, "top");
      this.cancel();
    })

  }

  cancel() {
    this.userForm.reset;
    this.nav.pop();
  }

}
