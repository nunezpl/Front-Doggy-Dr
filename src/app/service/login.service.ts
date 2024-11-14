import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    console.log('user.document guardado:', user.document);
    return this.http.post(`${environment.backendURL}/login/client`, user, { responseType: 'text' });
  }

  Adminlogin(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${environment.backendURL}/login/admin`, body, { responseType: 'text' });
  }

  Vetlogin(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${environment.backendURL}/login/vet`, body);
  }

}

