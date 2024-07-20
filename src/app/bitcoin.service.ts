import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  //private historicalApiUrl = '/api/trades.csv?symbol=bitstampUSD';
  private historicalApiUrl = 'http://api.bitcoincharts.com/v1/trades.csv?symbol=bitstampUSD';

  constructor() {}

  async getHistoricalData(): Promise<any[]> {
    try {
      const response = await axios.get(this.historicalApiUrl);
      console.log('Raw CSV Data:', response.data); // Log raw CSV data
      return this.csvToJson(response.data);
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }

  async getCurrentPrice(): Promise<number> {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
      const currentPrice = response.data.bpi.USD.rate_float;
      return currentPrice;
    } catch (error) {
      console.error('Error fetching current price:', error);
      throw error;
    }
  }

  private csvToJson(csv: string): any[] {
    const lines = csv.split('\n');
    const result = [];

    for (let i = 0; i < lines.length; i++) {
      const currentline = lines[i].split(',');
      if (currentline.length >= 3) {
        result.push({
          timestamp: parseInt(currentline[0]),
          price: parseFloat(currentline[1]),
          volume: parseFloat(currentline[2])
        });
      }
    }
    return result;
  }
}
