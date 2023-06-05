import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockedAPIService {
  constructor(private httpClient: HttpClient) {}

  getData(): Observable<any> {
    let headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.httpClient
      .get(
        'https://64774db99233e82dd53b685c.mockapi.io/api/nextcare-test/data',
        { headers: headers }
      ) //dummy data https://64774db99233e82dd53b685c.mockapi.io/api/nextcare-test/data
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
