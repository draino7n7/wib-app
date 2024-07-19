import { Component } from '@angular/core';
import { BitcoinPriceChartComponent } from './bitcoin-price-chart/bitcoin-price-chart.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BitcoinPriceChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bitcoin-price-chart';
}
