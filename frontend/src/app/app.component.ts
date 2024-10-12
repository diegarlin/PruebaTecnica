import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButtonModule,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
  hasToken: boolean = false;

  constructor(private router: Router) {
    if (typeof window !== 'undefined') {
      this.hasToken = localStorage.getItem('token') !== null
    }
  }

  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.hasToken = false;
      this.router.navigate(['/login']);
    }
  }
}
