import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = environments.baseUrl
  private user?: User;

  constructor(private http: HttpClient, private router: Router) { }

  get currentUser(): User | undefined {
    if(!this.user) return undefined
    return {...this.user}
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.url)
  }

  verificarUserAndPass(user: string, pass: string){
    this.getUsers().subscribe(users=> {
      users.find(u => {
        if (u.password === pass && u.username === user){
          this.user = u
          localStorage.setItem('token', u.id.toString())
          this.router.navigate(['/private'])
        }
      })
    })
  }

  checkStatusAutenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      return of(false)
    }
    return this.http.get<User>(`${this.url}/${token}`)
      .pipe(
        tap(u => this.user = u),
        map(u => !!u),
        catchError(err => of(false))
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear()
  }
}
