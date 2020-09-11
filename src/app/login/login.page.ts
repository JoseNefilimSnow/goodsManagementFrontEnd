import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });;


  constructor(private formBuilder: FormBuilder, private logServ: LoginService, private nav: NavController, private router: Router) {
  }
  ionViewWillEnter() {
    localStorage.clear();
    this.loginForm.reset();
  }
  submit() {
    this.logServ.logIn(this.loginForm.value.username, this.loginForm.value.password).subscribe(res => {
      console.log("User Logged In", res);
      this.logServ.setTokens(res.id, this.loginForm.value.username, this.loginForm.value.password, res.permission);
      this.router.navigate(["/home"]);
    });
  }

}