import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getDogBreeds() {
    const url = 'https://dog.ceo/api/breeds/list/all';
    return this.http.get<any>(url).pipe(map((res) => Object.keys(res.message)));
  }
}
