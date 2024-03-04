import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {

  constructor() { }

  saveLocalStore(key: string, value: string) {
    localStorage.setItem(key, value)
  }
  removeLocalStore(key: string) {
    localStorage.removeItem(key)
  }
  removeAllLocalStore() {
    let len = localStorage.length
    for (let i = 0; i < len; i++) {
      let key = localStorage.key(i)
      if (key?.includes("RGAS")) {
        localStorage.removeItem(key)
      }
    }
  }

  // todo auth
  getAuth() {
    return localStorage.getItem('RGAS_auth')
  }
  setAuth(data: any) {
    localStorage.setItem('RGAS_auth', data)
  }

  // todo profile
  getProfile() {
    let item: any = localStorage.getItem('RGAS_profile')
    return JSON.parse(item)
  }
  setProfile(data: any) {
    localStorage.setItem('RGAS_profile', JSON.stringify(data))
  }

  // todo dark theme
  getDarkTheme() {
    return localStorage.getItem('RGAS_dark_theme')
  }
  setDarkTheme(data: any) {
    localStorage.setItem('RGAS_dark_theme', JSON.stringify(data))
  }

  // todo token
  getToken(): string | null {
    return localStorage.getItem('RGAS_access_token')
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('RGAS_refresh_token')
  }
  setToken(value: string) {
    localStorage.setItem('RGAS_access_token', value)
  }
  setRefreshToken(value: string) {
    localStorage.setItem('RGAS_refresh_token', value)
  }

}
