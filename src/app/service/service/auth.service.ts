import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    // Verifica si hay un token en el local storage
    return !!localStorage.getItem('authToken');
  }

  login(token: string) {
    // Guarda el token en el local storage
    localStorage.setItem('authToken', token);
  }

  logout() {
    // Elimina el token del local storage
    localStorage.removeItem('authToken');
  }
}
