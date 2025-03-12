import { Component } from '@angular/core';
import { HeaderComponent } from './shared/ui/header/header.component';
import {FormTaskComponent} from './task/ui/form-task/form-task.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FormTaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
