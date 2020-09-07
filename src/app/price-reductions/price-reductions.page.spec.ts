import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PriceReductionsPage } from './price-reductions.page';

describe('PriceReductionsPage', () => {
  let component: PriceReductionsPage;
  let fixture: ComponentFixture<PriceReductionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceReductionsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PriceReductionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
