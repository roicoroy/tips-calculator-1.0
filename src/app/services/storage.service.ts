import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';


@Injectable({
  providedIn: 'root'
})


export class StorageService {

  constructor() { }

  public async set(key: any, value: any) {
    return await Storage.set({ key, value })
      .then(value => {
        return true
      })
      .catch(error => {
        return false
      });
  }

  public async get(key: any) {
    return await Storage.get({ key })
      .then((data: any) => {
        return JSON.parse(data.value)
      })
      .catch(error => {
        return error
      });
  }

  public async remove(key: any) {
    return await Storage.remove({ key })
      .then(value => {
        return true
      })
      .catch(error => {
        return false
      });
  }
}
