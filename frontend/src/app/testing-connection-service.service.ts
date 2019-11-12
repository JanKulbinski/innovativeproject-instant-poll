import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class TestingConnectionServiceService {

  private usersUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = '/test';
  }

  public testConnection(): Observable<String> {
    return this.http.get<String>(this.usersUrl);
  }
}