import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(user: User): Observable<string> {
    return this.http.post('http://localhost:8090/login/client', user, { responseType: 'text' });
  }

  Adminlogin(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post('http://localhost:8090/login/admin', body, { responseType: 'text' });
  }

  Vetlogin(username: string, password: string): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post('http://localhost:8090/login/vet', body, { responseType: 'text' });
  }
}
