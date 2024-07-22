import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitcoinService } from '../bitcoin.service';
import { Chart, registerables } from 'chart.js';
import 'chartjs-chart-financial';
import { CandlestickController, CandlestickElement, OhlcController, OhlcElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables, CandlestickController, CandlestickElement, OhlcController, OhlcElement);

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

  constructor(private bitcoinService: BitcoinService) {}

  async ngOnInit(): Promise<void> {
    try {
      this.currentPrice = await this.bitcoinService.getCurrentPrice();
      console.log('Current Price:', this.currentPrice);

      this.historicalData = await this.bitcoinService.getHistoricalData();
      console.log('Historical Data:', this.historicalData);

      this.renderChart();
    } catch (error) {
      console.error('Error in ngOnInit:', error);
    }
  }

  renderChart(): void {
    const ctx = document.getElementById('priceChart') as HTMLCanvasElement;

    if (!ctx) {
      console.error('Could not find the canvas element with id "priceChart"');
      return;
    }

    const financialData = this.historicalData.map(data => ({
      x: new Date(data.date),
      o: data.open,
      h: data.high,
      l: data.low,
      c: data.close
    }));

    console.log('Financial Data:', financialData);

    new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: 'Bitcoin Price (USD)',
          data: financialData,
          borderColor: 'rgba(0, 0, 0, 1)',
          borderWidth: 1,
          barPercentage: 0.4, // Adjust barPercentage to control the width of the candlesticks
          categoryPercentage: 0.4 // Adjust categoryPercentage to control the spacing between candlesticks
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
              maxTicksLimit: 30,
              source: 'auto'
            }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Price (USD)'
            },
            min: Math.min(...financialData.map(d => d.l)) - 1000,
            max: Math.max(...financialData.map(d => d.h)) + 1000
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
