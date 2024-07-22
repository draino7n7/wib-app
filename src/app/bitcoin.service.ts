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

  async getHistoricalData(start?: string, end?: string, interval?: string): Promise<any[]> {
    try {
      // Default values
      const defaultStart = new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0];
      const defaultEnd = new Date().toISOString().split('T')[0];
      const defaultInterval = '1d';

      // Use provided values or defaults
      const queryStart = start || defaultStart;
      const queryEnd = end || defaultEnd;
      const queryInterval = interval || defaultInterval;

      // Ensure the interval is valid
      const validIntervals = ['1d', '1wk', '1mo'];
      if (!validIntervals.includes(queryInterval)) {
        throw new Error(`Invalid interval. Valid intervals are: ${validIntervals.join(', ')}`);
      }

      // Construct query string
      const queryParams = `?start=${queryStart}&end=${queryEnd}&interval=${queryInterval}`;

      const response = await axios.get(`${this.historicalApiUrl}${queryParams}`);
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
