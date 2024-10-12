
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface successfulResponse {
  message: string;
  user: JSON;
}

@Component({
  selector: 'app-successful',
  standalone: true,
  imports: [],
  templateUrl: './successful.component.html',
  styleUrl: './successful.component.css'
})
export class SuccessfulComponent {


  token: string | null = null;
  errorMessage: string | null = null;
  message: string | null = null;

  //método que se ejecuta al cargar el componente y sirve para configuración inicial
  constructor(private http: HttpClient) {
    // verifica que se este ejecutando en el navegador y carga localStorage
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
      this.http.get<successfulResponse>('http://localhost:3000/perfil', { headers: { Authorization: `Bearer ${this.token}` } })
        .pipe(
          catchError((error) => {
            if (error.status === 400) {
              this.errorMessage = 'No se ha podido verificar la sesión. Por favor, inicie sesión nuevamente.';
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            return throwError(error);
          })
        )
        .subscribe((response: successfulResponse) => {
          console.log('token correcto', response);
          this.message = response.message;
        }, error => {
          console.error('Login successful', error);
        });
    } else {
      this.token = null;
    }
  }
}
