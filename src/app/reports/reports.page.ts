import { Component, OnInit } from '@angular/core';
import { Report } from '../dtos/report';
import { UtilsService } from '../utils/utils.service';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../dtos/user';
import { ReportService } from './report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  reports: Report[] = [];

  currentUser = JSON.parse(localStorage.getItem("currentUserToken"));
  constructor(private utils: UtilsService, private reportServ: ReportService, private route: Router) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.reports = [];
    this.reportServ.getReports().subscribe(reports => {
      this.reports = reports;

    })


  }

  checkPermissions() {
    return (this.currentUser.permission === 'ADMIN') ? true : false;
  }


  delete(id) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea eliminar este informe?", [{
      text: "Confirmar", handler: _ => {
        this.reportServ.deleteReport(id).subscribe(res => {
          this.utils.presentToast("Reporto Eliminado", 3000, "top");
          this.ionViewDidEnter();
        }
        );
      }
    },
    { text: "Cancelar" }])

  }

}
