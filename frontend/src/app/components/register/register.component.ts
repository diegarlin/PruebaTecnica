import { JsonPipe, CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'register-component',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    ReactiveFormsModule,
    JsonPipe,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    MatButtonModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = signal<FormGroup>(
    new FormGroup(
      {
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [Validators.minLength(8), Validators.required]),
        username: new FormControl('', [Validators.required]),
      }, { updateOn: 'submit' }
    )
  );

  errorMessage: string | null = null;

  constructor(private http: HttpClient) { }

  onSubmit() {
    console.log('Form submitted');
    this.errorMessage = null; // Reinicia el mensaje de error al enviar el formulario

    if (this.form().valid) {
      console.log('Form valid');
      this.http.post('http://localhost:3000/api/register', this.form().value)
        .pipe(
          catchError((error) => {
            // Aquí puedes manejar los errores HTTP
            if (error.status === 400) {
              this.errorMessage = error.error.message;
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            return throwError(error); // Opcional: Si quieres propagar el error
          })
        )
        .subscribe(response => {
          console.log('Registration successful', response);
        }, error => {
          console.error('Registration failed', error);
        });
    }
  }
}
