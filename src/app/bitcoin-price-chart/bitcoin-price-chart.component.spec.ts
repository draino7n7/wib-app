import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BitcoinPriceChartComponent } from './bitcoin-price-chart.component';

describe('BitcoinPriceChartComponent', () => {
  let component: BitcoinPriceChartComponent;
  let fixture: ComponentFixture<BitcoinPriceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BitcoinPriceChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BitcoinPriceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
