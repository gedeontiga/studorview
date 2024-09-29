import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterLoginService {

  readonly USER_API_URL = 'http://localhost:8080/user';
  readonly ENDPOINT_CHECK_EMAIL = '/check-email';
  readonly ENDPOINT_ALL_HOBBIES = '/all-hobbies';

  constructor(private http: HttpClient) { }

  checkEmailAlreadyExists(email: string) {
    return this.http.get(this.USER_API_URL + this.ENDPOINT_CHECK_EMAIL + '/' + email);
  }

  getAllHobbies() {
    return this.http.get(this.USER_API_URL + this.ENDPOINT_ALL_HOBBIES);
  }
}
