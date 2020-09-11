import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { PriceReduction } from 'src/app/dtos/price-reduction';
import { UtilsService } from 'src/app/utils/utils.service';
import { PriceReductionService } from '../price-reduction.service';

@Component({
  selector: 'app-price-reductionform',
  templateUrl: './price-reductionform.page.html',
  styleUrls: ['./price-reductionform.page.scss'],
})
export class PriceReductionformPage implements OnInit {
  operation;
  oldPriceReduction: PriceReduction = new PriceReduction();
  priceReductionForm: FormGroup = this.formBuilder.group({
    startingDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    reducedPrice: ['', []]
  });

  constructor(private utils: UtilsService, private formBuilder: FormBuilder, private prServ: PriceReductionService, private nav: NavController, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        console.log(this.router.getCurrentNavigation().extras.state.priceReduction);
        this.operation = "edit";
        let priceReduction: PriceReduction = this.router.getCurrentNavigation().extras.state.priceReduction;
        this.priceReductionForm.controls.startingDate.setValue(priceReduction.startingDate);
        this.priceReductionForm.controls.endDate.setValue(priceReduction.endDate);
        this.priceReductionForm.controls.reducedPrice.setValue(priceReduction.reducedPrice);
        this.oldPriceReduction.id = priceReduction.id;
        this.oldPriceReduction.startingDate = priceReduction.startingDate;
        this.oldPriceReduction.endDate = priceReduction.endDate;
        this.oldPriceReduction.reducedPrice = priceReduction.reducedPrice;


      } else {
        this.operation = "add";
      }
    });
  }

  ngOnInit() {
  }
  priceReductionSubmit() {
    switch (this.operation) {
      case "add":
        let newPriceReduction: PriceReduction = new PriceReduction();
        newPriceReduction.startingDate = this.priceReductionForm.value.startingDate;
        newPriceReduction.endDate = this.priceReductionForm.value.endDate;
        newPriceReduction.reducedPrice = this.priceReductionForm.value.reducedPrice;

        this.prServ.createPriceReduction(newPriceReduction).subscribe(res => {
          this.utils.presentToast("Descuento Creado", 3000, "top");
          this.cancel();

        })
        break;
      case "edit":

        let newEditedPriceReduction: PriceReduction = new PriceReduction();
        newEditedPriceReduction.startingDate = this.priceReductionForm.value.startingDate;
        newEditedPriceReduction.endDate = this.priceReductionForm.value.endDate;
        newEditedPriceReduction.reducedPrice = this.priceReductionForm.value.reducedPrice;
        newEditedPriceReduction.id = this.oldPriceReduction.id;


        console.log("EDITED", newEditedPriceReduction);

        this.prServ.updatePriceReduction(newEditedPriceReduction.id, newEditedPriceReduction).subscribe(res => {
          this.utils.presentToast("Descuento Editado", 3000, "top");
          this.cancel();
        }

        );
        break;



    }
  }
  cancel() {
    this.priceReductionForm.reset;
    this.nav.pop();
  }
}
