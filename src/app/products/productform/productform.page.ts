import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/dtos/product';
import { ProductService } from '../product.service';
import { User } from 'src/app/dtos/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from 'src/app/users/user.service';
import { EnumProductState } from 'src/app/enums/enum-product-state.enum';
import { UtilsService } from 'src/app/utils/utils.service';

@Component({
  selector: 'app-productform',
  templateUrl: './productform.page.html',
  styleUrls: ['./productform.page.scss'],
})
export class ProductformPage implements OnInit {
  operation;
  oldProduct: Product = new Product();
  productForm: FormGroup = this.formBuilder.group({
    code: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    price: ['', [Validators.required]]
  });

  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private prodServ: ProductService, private userServ: UserService, private nav: NavController, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        let product: Product = this.router.getCurrentNavigation().extras.state.product;
        let creator: User = this.router.getCurrentNavigation().extras.state.creator;
        this.productForm.controls.code.setValue(product.code);
        this.productForm.controls.desc.setValue(product.description);
        this.productForm.controls.price.setValue(product.price);
        this.oldProduct.id = product.id;
        this.oldProduct.code = product.code;
        this.oldProduct.description = product.description;
        this.oldProduct.state = product.state;
        this.oldProduct.creationDate = product.creationDate;
        this.oldProduct.creator = creator;
        this.oldProduct.price = product.price;
        this.oldProduct.priceReductions = product.priceReductions;
        this.oldProduct.suppliers = product.suppliers;

        this.operation = "edit";

      } else {
        this.operation = "add";
      }
    });
  }

  ngOnInit() {
    console.log(this.operation)
  }
  productSubmit() {
    switch (this.operation) {
      case "add":
        let newProduct: Product = new Product();
        newProduct.code = this.productForm.value.code;
        newProduct.description = this.productForm.value.desc;
        newProduct.price = this.productForm.value.price;
        newProduct.creationDate = new Date();
        newProduct.state = EnumProductState.ACTIVE;
        this.userServ.getUser(JSON.parse(localStorage.getItem("currentUserToken")).id).subscribe(user => {
          console.log("user retrieved", user)
          let newUser: User = new User();
          newUser.id = user.id;
          newUser.username = user.username;
          newUser.password = user.password;
          newUser.permission = user.permission;
          newUser.enabled = user.enabled;
          newProduct.creator = newUser;
          newProduct.suppliers = [];
          newProduct.priceReductions = [];
          this.prodServ.createProduct(newProduct).subscribe(res => {
            this.utils.presentToast("Producto Creado", 3000, "top");
            this.cancel();
          })
        })
      case "edit":
        let oldCreator: User = new User();
        oldCreator.id = this.oldProduct.creator.id;
        oldCreator.username = this.oldProduct.creator.username;
        oldCreator.password = this.oldProduct.creator.password;
        oldCreator.permission = this.oldProduct.creator.permission;
        oldCreator.enabled = this.oldProduct.creator.enabled;

        let newEditedProduct: Product = new Product();
        newEditedProduct.code = this.productForm.value.code;
        newEditedProduct.description = this.productForm.value.desc;
        newEditedProduct.price = this.productForm.value.price;
        newEditedProduct.creationDate = this.oldProduct.creationDate;
        newEditedProduct.creator = oldCreator;
        newEditedProduct.state = this.oldProduct.state;
        newEditedProduct.id = this.oldProduct.id;
        newEditedProduct.priceReductions = this.oldProduct.priceReductions;
        newEditedProduct.suppliers = this.oldProduct.suppliers;

        console.log("EDITED", newEditedProduct);

        this.prodServ.updateProduct(newEditedProduct.id, newEditedProduct).subscribe(res => {

          this.utils.presentToast("Producto Editado", 3000, "top");
          this.cancel();
        }
        );



    }
  }
  cancel() {
    this.productForm.reset;
    this.nav.pop();
  }
}
