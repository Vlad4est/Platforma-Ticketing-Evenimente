import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private domain: string;


  constructor(private http: HttpClient){ 
    //this.domain = "https://friender-backend-ir3eegisoa-ey.a.run.app";
    this.domain = "http://localhost:3000";
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  getUserByUsername(username: string): Observable<any> {
    return this.http.get(`${this.domain}/users/${username}`, { observe: "response" });
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.domain}/auth/login`, userData, { observe: "response"} );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.domain}/auth/register`, userData, { observe: "response"} );
  }

  getEvents(): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.http.get(`${this.domain}/events`, { headers });

  }
  getRequestsByOrganizerId(): Observable<any> {
    const token = localStorage.getItem("token");
    const organizerId = localStorage.getItem("id");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.http.get(`${this.domain}/events/${organizerId}`, { headers });
  }

  getEventByCurrentUserId(): Observable<any> {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    })
    return this.http.get(`${this.domain}/events/${id}`, { headers });
  }

  createEvent(eventData: any): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.http.post(`${this.domain}/events`, eventData, { headers });
  }

  requestInvite(eventId: string): Observable<any> {
    const token = localStorage.getItem("token");
    console.log(token);
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    return this.http.post(`${this.domain}/events/${eventId}`, {eventId} ,{ headers });
  }

  acceptRequest(eventId: string, username: string): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    console.log({eventId, username});
    return this.http.post(`${this.domain}/events/accept`, {eventId, username} , { headers });
  }

  declineRequest(eventId: string, username: string): Observable<any> {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`
    });
    console.log({eventId, username});
    return this.http.post(`${this.domain}/events/decline`, {eventId, username} , { headers });
  }

}
