import { Injectable } from '@angular/core';
import { Storage, StorageConfig } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserStoreServiceService {

  constructor(private storageVar:Storage) {
    this.storageVar.create().then(()=>console.log("storage Created"));
  }

  async setValue(key: string,value: any): Promise<void>{
    const storageConfig: StorageConfig = {
      name: 'LMT_DB',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    };
    await this.storageVar.set(key,[value])
  }

  async getValue(key: string){
    return await this.storageVar.get(key)
  }
}



