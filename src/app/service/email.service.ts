import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = `${environment.backendURL}/api/email/send`;  // URL del backend de Spring Boot

  constructor(private http: HttpClient) { }

  sendEmail(email: string, subject: string, message: string): Observable<any> {
    const emailData = { email, subject, message };
    return this.http.post(this.apiUrl, emailData);
  }
}
