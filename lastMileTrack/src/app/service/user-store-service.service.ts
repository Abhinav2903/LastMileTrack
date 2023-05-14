import { Injectable } from '@angular/core';
import { Storage, StorageConfig } from '@ionic/storage-angular';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root',
})
export class UserStoreServiceService {
  storageData: any=[];

  constructor(private storageVar: Storage, private file: File) {
    this.storageVar.create().then(() => console.log('storage Created'));
  }

  async setValue(key: string, value: any): Promise<void> {
    const storageConfig: StorageConfig = {
      name: 'LMT_DB',
      driverOrder: ['indexeddb', 'sqlite', 'websql'],
    };
    await this.storageVar.set(key, value);
  }

  async getValue(key: string) {
    return await this.storageVar.get(key);
  }

  async getAllData(): Promise<any[]> {
    const keys = await this.storageVar.keys();
    const promises = keys.map(async (key) => {
      const value = await this.storageVar.get(key);
      return { key, value };
    });
    return await Promise.all(promises);
  }

  async exportToCSV() {
    const keys = await this.storageVar.keys();
    // Get your storage data (replace with your own logic)
    this.storageData = await this.getAllData()
    console.log("KEYS",keys)
    // for (const keyValue in keys) {
    //   const promises = keys.map(async (key) => {
    //     const value = await this.storageVar.get(key);
    //     return {value}
    //   });
      
    //   // If the value is an array, iterate over its elements and store each element in a separate row
    //   if (Array.isArray(promises)) {
    //     for (const element of promises) {
    //       this.storageData.push([element]); // Store each element in a separate row
    //     }
    //   } else {
    //     this.storageData.push([promises]); // Store the value as a single-row array
    //   }
    // }

    console.log(this.storageData)
    // Convert data to CSV format
    const csvData = this.convertToCSV(this.storageData);
    console.log("CSV DATA",csvData)
    // Define the file path and name
    const filePath = this.file.externalDataDirectory;
    const fileName = 'LMT.csv';
    console.log("FilePath",filePath)
    // Write the CSV data to the file
    this.file
      .writeFile(filePath, fileName, csvData, { replace: true })
      .then((_) => console.log('CSV file created successfully'))
      .catch((err) => console.error('Error creating CSV file', err));
  }

  convertToCSV(data: any[]): string {
    // Convert data to CSV format (implement your own logic here)
    let csvContent = "Date,Year,Name,Show Icon,Timer,StartLat,StartLon,EndLat,EndLon\n"; // Header row

    data.forEach(obj => {
      const date = obj.key.split(',')[0];
      const tasks = obj.value;
      const year = obj.key.split(',')[1]
      tasks.forEach((task: { name: any; isShowIcon: any; timer: any;startLat:any;startLon:any;endLat:any;endLon:any }) => {
        const { name, isShowIcon, timer,startLat,startLon,endLat,endLon } = task;
        csvContent += `${date},${year},${name},${isShowIcon},${timer},${startLat},${startLon},${endLat},${endLon},\n`; // CSV row
      });
    });

    return csvContent;
  }
}
