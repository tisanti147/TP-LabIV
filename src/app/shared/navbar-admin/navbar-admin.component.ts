import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent {

  constructor(private authService: AuthService, private router: Router){ }

  get getUser():User | undefined{
    return this.authService.currentUser;
  }
  
  onLogOut(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
