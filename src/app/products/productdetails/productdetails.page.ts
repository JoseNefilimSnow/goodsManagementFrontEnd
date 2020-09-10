import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../product.service';
import { UserService } from 'src/app/users/user.service';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/dtos/product';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.page.html',
  styleUrls: ['./productdetails.page.scss'],
})
export class ProductdetailsPage implements OnInit {
  product: Product = new Product();
  constructor(private nav: NavController, private router: Router, private route: ActivatedRoute, private utils: UtilsService) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.product = this.router.getCurrentNavigation().extras.state.product;
      }
    });
  }

  ngOnInit() {
  }
  beautifyStatus(state) {
    switch (state) {
      case "ACTIVE":
        return "Activo"
      case "DISCOUNTED":
        return "Descartado"
    }
  }
}
