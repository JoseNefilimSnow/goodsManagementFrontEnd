import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Supplier } from 'src/app/dtos/supplier';
import { User } from 'src/app/dtos/user';
import { EnumProductState } from 'src/app/enums/enum-product-state.enum';
import { UtilsService } from 'src/app/utils/utils.service';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-supplierform',
  templateUrl: './supplierform.page.html',
  styleUrls: ['./supplierform.page.scss'],
})
export class SupplierformPage implements OnInit {
  oldSupp: Supplier = new Supplier();
  operation;
  supplierForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    country: ['', [Validators.required]]
  });


  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private supServ: SupplierService, private nav: NavController, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.supplier);
        this.supplierForm.controls.name.setValue(this.router.getCurrentNavigation().extras.state.supplier.name)
        this.supplierForm.controls.country.setValue(this.router.getCurrentNavigation().extras.state.supplier.country)
        this.operation = "edit";
        this.oldSupp = this.router.getCurrentNavigation().extras.state.supplier;
      } else {
        this.operation = "add";
      }
    });
  }

  ngOnInit() {
  }

  supplierSubmit() {
    switch (this.operation) {
      case "add":
        let newSupplier: Supplier = new Supplier();
        newSupplier.name = this.supplierForm.value.name;
        newSupplier.country = this.supplierForm.value.country;
        this.supServ.createSupplier(newSupplier).subscribe(res => {
          this.utils.presentToast("Proveedor Creado", 3000, "top");
          this.cancel();
        })
        break;
      case "edit":
        let updateSupplier: Supplier = new Supplier();
        updateSupplier.name = this.supplierForm.value.name;
        updateSupplier.country = this.supplierForm.value.country;
        this.supServ.updateSupplier(this.oldSupp.id, updateSupplier).subscribe(res => {
          this.utils.presentToast("Proveedor Editado", 3000, "top");
          this.cancel();
        })
        break;
    }

  }

  cancel() {
    this.supplierForm.reset;
    this.nav.pop();
  }

}
