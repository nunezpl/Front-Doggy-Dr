import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8090/api/email/send';  // URL del backend de Spring Boot

  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, message: string): Observable<any> {
    const emailData = { email, subject, message };
    return this.http.post(this.apiUrl, emailData);
  }
}
