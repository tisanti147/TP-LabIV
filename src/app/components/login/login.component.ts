import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private formBuilder: FormBuilder = inject(FormBuilder)
  private auth: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  formulario: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  })

  iniciarSesion() {
    if (this.formulario.invalid) return;

    this.auth.verificarUserAndPass(
      this.formulario.controls['username'].value,
      this.formulario.controls['password'].value)
  }

  showPassword: boolean = false;

  toggleVisibility(){
    this.showPassword = !this.showPassword
  }
}
