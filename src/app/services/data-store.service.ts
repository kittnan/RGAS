import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  private store: any = {}

  constructor() { }

  private get(key: string) {
    return this.store[key]
  }
  private set(key: string, data: any) {
    return this.store[key] = data
  }

  getProfile() {
    return this.get('profile') ? this.get('profile') : null
  }
  setProfile(data: any) {
    this.set('profile', data)
  }
}
