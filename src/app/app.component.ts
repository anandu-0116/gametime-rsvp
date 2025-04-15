import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RsvpTesterComponent } from "./components/rsvp-tester/rsvp-tester.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RsvpTesterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gametime-rsvp';
}
