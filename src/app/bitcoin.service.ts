import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment'; // Adjust the import path if necessary

@Injectable({
  providedIn: 'root'
})
export class BitcoinService {
  private historicalApiUrl = `${environment.apiUrl}/api/bitcoin/historical`;
  private currentApiUrl = `${environment.apiUrl}/api/bitcoin/current`;

  constructor() {}

  async getHistoricalData(): Promise<any[]> {
    try {
      const response = await axios.get(this.historicalApiUrl);
      console.log('API Response Data:', response.data); // Log raw data
      return response.data; // Directly return JSON data
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  }

  async getCurrentPrice(): Promise<number> {
    try {
      const response = await axios.get(this.currentApiUrl);
      return response.data.currentPrice;
    } catch (error) {
      console.error('Error fetching current price:', error);
      throw error;
    }
  }
}
