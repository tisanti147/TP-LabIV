import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formulario: FormGroup = this.formBuilder.group({
    username:['', [Validators.required]],
    password:['', [Validators.required]],
    id: 0
  })

  constructor(private formBuilder: FormBuilder, private LoginService: LoginService, private router: Router) { }

  agregarUser(){
    if(this.formulario.invalid) return;

    const user: User = {
      username: this.formulario.controls['username'].value,
      password: this.formulario.controls['password'].value,
      id: 0
    }
    this.LoginService.postUser(user).subscribe({
      next: (u)=>{
        alert(`Usuario ${u.username} creado con éxito`)
        this.router.navigate(['home'])
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  showPassword: boolean = false;

  toggleVisibility(){
    this.showPassword = !this.showPassword
  }

}
