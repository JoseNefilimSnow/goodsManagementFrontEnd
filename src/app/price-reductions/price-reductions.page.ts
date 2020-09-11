import { Component, OnInit } from '@angular/core';
import { PriceReduction } from '../dtos/price-reduction';
import { UtilsService } from '../utils/utils.service';
import { PriceReductionService } from './price-reduction.service';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-price-reductions',
  templateUrl: './price-reductions.page.html',
  styleUrls: ['./price-reductions.page.scss'],
})
export class PriceReductionsPage implements OnInit {
  priceReductions: PriceReduction[] = [];

  currentUser = JSON.parse(localStorage.getItem("currentUserToken"));
  constructor(private utils: UtilsService, private priceReductionServ: PriceReductionService, private route: Router) {

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.priceReductions = [];
    this.priceReductionServ.getPriceReductions().subscribe(priceReductions => {
      this.priceReductions = priceReductions;

    })


  }

  checkPermissions() {
    return (this.currentUser.permission === 'ADMIN') ? true : false;
  }

  formPriceReduction(operation, priceReduction) {
    switch (operation) {
      case 'add':
        this.route.navigate(['/price-reductions/form']);
        break;
      case 'edit':

        let params: NavigationExtras = {
          state: {
            priceReduction: priceReduction
          }
        }
        this.route.navigate(['/price-reductions/form'], params);
        break;
    }
  }

  delete(id) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea eliminar este descuento?", [
      { text: "Cancelar" },
      {
        text: "Eliminar", handler: _ => {
          this.priceReductionServ.deletePriceReduction(id).subscribe(res => {
            this.utils.presentToast("Descuento Eliminado", 3000, "top");
            this.ionViewWillEnter();
          }
          );
        }
      }
    ])

  }

}
