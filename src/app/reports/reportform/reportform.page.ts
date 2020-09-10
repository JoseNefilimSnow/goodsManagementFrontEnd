import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/dtos/report';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilsService } from 'src/app/utils/utils.service';
import { ReportService } from '../report.service';
import { UserService } from 'src/app/users/user.service';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/dtos/user';
import { Product } from 'src/app/dtos/product';

@Component({
  selector: 'app-reportform',
  templateUrl: './reportform.page.html',
  styleUrls: ['./reportform.page.scss'],
})
export class ReportformPage implements OnInit {

  affectedProduct: Product = new Product();
  reportForm: FormGroup = this.formBuilder.group({
    reason: ['', [Validators.required]]
  });


  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private prodServ: ReportService, private userServ: UserService, private nav: NavController, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.product);
        this.affectedProduct = this.router.getCurrentNavigation().extras.state.product;
      }
    });
  }

  ngOnInit() {
  }

  reportSubmit() {
    let newReport: Report = new Report();
    newReport.reason = this.reportForm.value.reason;
    this.userServ.getUser(JSON.parse(localStorage.getItem("currentUserToken")).id).subscribe(user => {
      console.log("user retrieved", user)
      let newUser: User = new User();
      newUser.id = user.id;
      newUser.username = user.username;
      newUser.password = user.password;
      newUser.permission = user.permission;
      newUser.enabled = user.enabled;
      newReport.creator = newUser;
      newReport.productCode = this.affectedProduct.code;
      console.log(newReport);
      this.prodServ.createReport(newReport).subscribe(res => {
        console.log(res)
        this.utils.presentToast("Informe Creado", 3000, "top");
        this.cancel();
      })
    })

  }

  cancel() {
    this.reportForm.reset;
    this.nav.pop();
  }
}
