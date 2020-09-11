import { Component, OnInit } from '@angular/core';
import { Supplier } from '../dtos/supplier';
import { UtilsService } from '../utils/utils.service';
import { SupplierService } from './supplier.service';
import { NavigationExtras, Router } from '@angular/router';

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


  formSupplier(operation, supplier) {
    switch (operation) {
      case 'add':
        this.route.navigate(['/suppliers/form']);
        break;
      case 'edit':

        let params: NavigationExtras = {
          state: {
            supplier: supplier
          }
        }
        this.route.navigate(['/suppliers/form'], params);
        break;
    }
  }

  delete(id) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea eliminar este proveedor?", [
      { text: "Cancelar" },
      {
        text: "Eliminar", handler: _ => {
          this.supplierServ.deleteSupplier(id).subscribe(res => {
            this.utils.presentToast("Proveedor Eliminado", 3000, "top");
            this.ionViewWillEnter();
          }
          );
        }
      }
    ])

  }


}
