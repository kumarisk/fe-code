import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
    private apiUrl = 'http://104.211.229.17:8084';
    headers = new Headers();
    constructor(private http: HttpClient, private router: Router) { 
        this.headers.append('Content-Type', 'application/json');
    }
    private user: object;

    private subject = new Subject<any>();
    getRole(): Observable<any> {
        return this.subject.asObservable();
    }
    sendRole(role: string) {
        this.subject.next(role);
    }
    getUser() {
      return this.user;
    }
    private httpOptions: any;
    private authToken: string;
    getAuthToken() {
        const sessionUserToken = sessionStorage.getItem('currentUserToken');
        if(!this.user && sessionUserToken) {
          this.authToken = JSON.parse(sessionUserToken).accessToken;
        }
        return this.authToken;
    }
    login(username: string, password: string) {
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Basic Og=='
         })
       };
      
       let payload = { usernameOrEmail: username, password: password };
        return this.http.post<any>(`${this.apiUrl}/v1/user/signin`, payload, this.httpOptions)
            .pipe(map((user:any) => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    sessionStorage.setItem('currentUserToken', JSON.stringify(user.token));
                    sessionStorage.setItem('currentUserRole', user.role);
                    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    this.user = user;
                    let authToken = 'Bearer ' + user['token']['accessToken'];
                    this.authToken = authToken;
                   console.log('this.currentUser');
                   this.headers.append('Authorization', this.getAuthToken());
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUserToken');
        sessionStorage.removeItem('currentUserRole');
        this.router.navigate(['/login']);
    }
}