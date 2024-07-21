import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitcoinService } from '../bitcoin.service';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

@Component({
  selector: 'app-bitcoin-price-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bitcoin-price-chart.component.html',
  styleUrls: ['./bitcoin-price-chart.component.scss']
})
export class BitcoinPriceChartComponent implements OnInit {
  currentPrice: number = 0;
  historicalData: any[] = [];

  constructor(private bitcoinService: BitcoinService) {
    Chart.register(...registerables);
  }

  async ngOnInit(): Promise<void> {
    try {
      this.currentPrice = await this.bitcoinService.getCurrentPrice();
      console.log('Current Price:', this.currentPrice);

      this.historicalData = await this.bitcoinService.getHistoricalData();
      console.log('Historical Data:', this.historicalData); // Log historical data

      this.renderChart();
    } catch (error) {
      console.error('Error in ngOnInit:', error);
    }
  }

  renderChart(): void {
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;
    const prices = this.historicalData.map(data => data.close); // Use 'close' for daily closing prices
    const dates = this.historicalData.map(data => new Date(data.date));

    console.log('Prices:', prices);
    console.log('Dates:', dates);

    const minDate = Math.min(...dates.map(date => date.getTime()));
    const maxDate = Math.max(...dates.map(date => date.getTime()));

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const paddedMinPrice = minPrice;
    const paddedMaxPrice = maxPrice;

    console.log('Min Date:', new Date(minDate));
    console.log('Max Date:', new Date(maxDate));
    console.log('Min Price:', minPrice);
    console.log('Max Price:', maxPrice);
    console.log('Padded Min Price:', paddedMinPrice);
    console.log('Padded Max Price:', paddedMaxPrice);

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: 'Bitcoin Price (USD)',
          data: prices,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
          fill: false,
          yAxisID: 'y-left'
        }]
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              tooltipFormat: 'MMM dd, yyyy',
              displayFormats: {
                day: 'MMM dd, yyyy'
              }
            },
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 30
            }
          },
          'y-left': {
            type: 'linear',
            position: 'left',
            min: paddedMinPrice,
            max: paddedMaxPrice,
            title: {
              display: true,
              text: 'Price (USD)'
            }
          },
          'y-right': {
            type: 'linear',
            position: 'right',
            min: paddedMinPrice,
            max: paddedMaxPrice,
            grid: {
              drawOnChartArea: false // only want the grid lines for one axis
            },
            title: {
              display: true,
              text: 'Price (USD)'
            }
          }
        }
      }
    });
  }
}
