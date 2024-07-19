import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitcoinService } from '../bitcoin.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-bitcoin-price-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitcoin-price-chart.component.html',
  styleUrls: ['./bitcoin-price-chart.component.scss'] // Change this line
})
export class BitcoinPriceChartComponent implements OnInit {
  currentPrice: number = 0;
  historicalData: any[] = [];

  constructor(private bitcoinService: BitcoinService) {
    Chart.register(...registerables);
  }

  async ngOnInit(): Promise<void> {
    this.currentPrice = await this.bitcoinService.getCurrentPrice();
    this.historicalData = await this.bitcoinService.getHistoricalData();
    this.renderChart();
  }

  renderChart(): void {
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;
    const prices = this.historicalData.map(data => data[1]);
    const dates = this.historicalData.map(data => new Date(data[0]));

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Bitcoin Price (USD)',
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'month'
            }
          },
          y: {
            beginAtZero: false
          }
        }
      }
    });
  }
}
