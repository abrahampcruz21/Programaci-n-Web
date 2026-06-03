import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss'],
})
export class WelcomeComponent {}
