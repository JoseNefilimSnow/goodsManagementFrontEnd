import { Component, OnInit } from '@angular/core';
import { Supplier } from '../dtos/supplier';
import { UtilsService } from '../utils/utils.service';
import { SupplierService } from './supplier.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.page.html',
  styleUrls: ['./suppliers.page.scss'],
})
export class SuppliersPage implements OnInit {

  suppliers: Supplier[] = [];


  currentUser = JSON.parse(localStorage.getItem("currentUserToken"));
  constructor(private utils: UtilsService, private supplierServ: SupplierService, private route: Router) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.suppliers = [];
    this.supplierServ.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;

    })


  }

  checkPermissions() {
    return (this.currentUser.permission === 'ADMIN') ? true : false;
  }


  delete(id) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea eliminar este informe?", [{
      text: "Confirmar", handler: _ => {
        this.supplierServ.deleteSupplier(id).subscribe(res => {
          this.utils.presentToast("Suppliero Eliminado", 3000, "top");
          this.ionViewWillEnter();
        }
        );
      }
    },
    { text: "Cancelar" }])

  }


}
