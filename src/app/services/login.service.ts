import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = environments.baseUrl

  constructor(private http: HttpClient) { }

  postUser (user: User): Observable<User>{
    return this.http.post<User>(this.url, user, {headers: {'Content-type': 'application/json'}})
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.url}/${id}`)
  }
}
