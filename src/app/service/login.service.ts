import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) {}

  login(document: number): Observable<any> {
    return this.http.post('http://localhost:8090/login/client', document);
  } 
  Adminlogin(username: String, password: String): Observable<any> {
    const body = { username: username, password: password };
    return this.http.post('http://localhost:8090/login/admin', body);
}

Vetlogin(username: String, password: String): Observable<any> {
  const body = { username: username, password: password };
  return this.http.post('http://localhost:8090/login/vet', body);
}

}
