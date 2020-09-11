import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/dtos/product';
import { User } from 'src/app/dtos/user';
import { PriceReductionService } from 'src/app/price-reductions/price-reduction.service';
import { SupplierService } from 'src/app/suppliers/supplier.service';
import { UtilsService } from 'src/app/utils/utils.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-assign',
  templateUrl: './assign.page.html',
  styleUrls: ['./assign.page.scss'],
})
export class AssignPage implements OnInit {

  form = [];
  mode;
  creator: User = new User();
  product: Product = new Product;

  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private prodServ: ProductService, private prServ: PriceReductionService, private supServ: SupplierService, private nav: NavController, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.form = [];
      if (this.router.getCurrentNavigation().extras.state) {
        this.mode = this.router.getCurrentNavigation().extras.state.mode;
        this.creator = this.router.getCurrentNavigation().extras.state.creator;
        this.product = this.router.getCurrentNavigation().extras.state.product;


        switch (this.mode) {
          case "priceReduction":
            this.prServ.getPriceReductions().subscribe(priceReductions => {
              for (let priceReduction of priceReductions) {
                this.form.push({ val: priceReduction, isChecked: false })
              }
              for (let pr of this.product.priceReductions) {
                for (let assignedPR of this.form) {
                  if (assignedPR.val.id == pr.id) {
                    assignedPR.isChecked = true;
                  }
                }
              }

            })
            break;
          case "supplier":
            this.supServ.getSuppliers().subscribe(suppliers => {
              for (let supplier of suppliers) {
                this.form.push({ val: supplier, isChecked: false })
              }
              for (let sp of this.product.suppliers) {
                for (let assignedSP of this.form) {
                  if (assignedSP.val.id == sp.id) {
                    assignedSP.isChecked = true;
                  }
                }

              }
            })
            break;

        }
      }
    })

  }

  ngOnInit() {
  }

  ionViewDidEnter() {

  }
  beautifyTitle() {
    switch (this.mode) {
      case "priceReduction":
        return "Descuentos";
        break;
      case "supplier":
        return "Proveedores";
        break;
    }
  }

  assign() {
    switch (this.mode) {
      case "priceReduction":
        let priceReductionsAssigned = [];
        for (let entry of this.form) {
          if (entry.isChecked) {
            priceReductionsAssigned.push(entry.val);
          }
        }
        this.product.creator = this.creator;
        this.prServ.checkDates(priceReductionsAssigned).subscribe(res => {
          if (res) {
            this.product.priceReductions = priceReductionsAssigned;
            this.prodServ.updateProduct(this.product.id, this.product).subscribe(prod => {
              this.utils.presentToast("Descuentos Asignados", 3000, "top");
              this.cancel();
            });
          } else {
            this.utils.presentAlert("Error", "No se pueden asignar descuentos que se solapen en las fechas", [{ text: 'Entendido' }])
          }
        })
        break;
      case "supplier":
        let suppliersAssigned = [];
        for (let entry of this.form) {
          if (entry.isChecked) {
            suppliersAssigned.push(entry.val);
          }
        }
        this.product.creator = this.creator;
        this.product.suppliers = suppliersAssigned;
        this.prodServ.updateProduct(this.product.id, this.product).subscribe(prod => {
          this.utils.presentToast("Proveedores Asignados", 3000, "top");
          this.cancel();
        });
        break;
    }
  }
  cancel() {
    this.nav.pop();
  }
}
