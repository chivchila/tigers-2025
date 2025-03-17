import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Customer } from '../../../shared/types';

@Injectable()
export class DBService {
  readFile(): Customer[] {
    const filePath = path.resolve(__dirname, '../../../data.json'); // Use resolve for cross-platform compatibility
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data) as Customer[];
    } catch (error) {
      throw new Error(`Error reading the data file at ${filePath}: ${error}`);
    }
  }

  getCustomers(): Customer[] {
    return this.readFile();
  }

  getCustomerById(userId: string): Customer | undefined {
    const allCustomers = this.readFile();
    return allCustomers.find(customer => customer.id === userId);
  }
}
