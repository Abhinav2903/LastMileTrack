import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage:Storage) { }


  async setValue(key: string,value: any){
    await this.storage.set(key,[value])
  }

  async getValue(key: string){
    await this.storage.get(key)
  }
}
