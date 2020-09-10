import { Component, OnInit } from '@angular/core';
import { Product } from '../dtos/product';
import { User } from '../dtos/user';
import { PriceReduction } from '../dtos/price-reduction';
import { UtilsService } from '../utils/utils.service';
import { ProductService } from './product.service';
import { Router, NavigationExtras } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { allowedNodeEnvironmentFlags } from 'process';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products: Product[] = [];
  productsActive: Product[] = [];
  productsDiscounted: Product[] = [];
  auxProducts: Product[] = [];
  filter = "all";

  currentUser = JSON.parse(localStorage.getItem("currentUserToken"));
  constructor(private utils: UtilsService, private productServ: ProductService, private route: Router) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.productServ.getProducts().subscribe(products => {
      this.products = products;

      for (let product of this.products) {
        if (product.state.toString() === "ACTIVE") {
          this.productsActive.push(product);
        } else {
          this.productsDiscounted.push(product);
        }
      }
      this.filterProducts();
    })


  }

  checkPermissions() {
    return (this.currentUser.permission === 'ADMIN') ? true : false;
  }

  filterProducts() {
    switch (this.filter) {
      case "all":
        this.auxProducts = this.products;

        break;
      case "active":
        this.auxProducts = this.productsActive;

        break;

      case "discounted":
        this.auxProducts = this.productsDiscounted;

        break;

    }
  }

  beautifyStatus(state) {
    switch (state) {
      case "ACTIVE":
        return "Activo"
      case "DISCOUNTED":
        return "Descartado"
    }
  }
  toDetails(product) {
    let params: NavigationExtras = {
      state: {
        product: product
      }
    }
    this.route.navigate(["products/details"], params)
  }

  formProduct(operation, product) {
    switch (operation) {
      case 'add':
        this.route.navigate(['/products/form']);
        break;
      case 'edit':
        let creator: User = new User();
        creator.username = product.creator.username;
        creator.password = product.creator.password;
        creator.id = product.creator.id;
        creator.permission = product.creator.permission;
        creator.enabled = product.creator.enabled;

        let params: NavigationExtras = {
          state: {
            product: product,
            creator: creator
          }
        }
        this.route.navigate(['/products/form'], params);
        break;
    }
  }

  delete(id) {
    this.utils.presentAlert("Atención", "¿Está seguro que desea eliminar este producto?", [{
      text: "Confirmar", handler: _ => {
        this.productServ.deleteProduct(id).subscribe(res => {
          this.utils.presentToast("Producto Eliminado", 3000, "top");
          this.ionViewDidEnter();
        }
        );
      }
    },
    { text: "Cancelar" }])

  }
  report(product) {
    let params: NavigationExtras = {
      state: {
        product: product
      }
    }
    this.route.navigate(['/reports/form'], params);
  }
}
