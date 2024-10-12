import { JsonPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

interface LoginResponse {
  token: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = signal<FormGroup>(
    new FormGroup(
      {
        password: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
      }, { updateOn: 'submit' }
    )
  );

  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  onSubmit() {
    console.log('Form submitted');
    this.errorMessage = null; // Reinicia el mensaje de error al enviar el formulario

    if (this.form().valid) {
      console.log('Form valid');
      this.http.post<LoginResponse>('http://localhost:3000/api/login', this.form().value)
        .pipe(
          catchError((error) => {
            if (error.status === 400) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            return throwError(error);
          })
        )
        .subscribe((response: LoginResponse) => {
          console.log('Login succesful', response);
          localStorage.setItem('token', response.token);
          alert('Login successful!');
          this.router.navigateByUrl('/successful').then(() => {
            window.location.reload();
          });
        }, error => {
          console.error('Login successful', error);
        });
    }
  }
}
