import { Injectable } from '@angular/core';
import { User } from '../../model/User_model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _userKey = 'currentUser';

  setUser(userData: User): void {
    localStorage.setItem(this._userKey, JSON.stringify(userData));
  }

  getUser(): User | null {
    const userData = localStorage.getItem(this._userKey);
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  }

  clearUser(): void {
    localStorage.removeItem(this._userKey);
  }
}


