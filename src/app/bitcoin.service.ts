import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  private apiUrl = 'https://api.coingecko.com/api/v3';

  constructor() {}

  async getCurrentPrice(): Promise<number> {
    try {
      const response = await axios.get(`${this.apiUrl}/simple/price?ids=bitcoin&vs_currencies=usd`);
      return response.data.bitcoin.usd;
    } catch (error) {
      console.error('Error fetching current price:', error);
      throw error;
    }
  }

  async getHistoricalData(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.apiUrl}/coins/bitcoin/market_chart?vs_currency=usd&days=max`);
      return response.data.prices;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }
}
