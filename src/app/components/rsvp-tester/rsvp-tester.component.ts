import { Component } from '@angular/core';
import { RsvpService } from '../../services/rsvp.service';
import { CommonModule } from '@angular/common'; // Add this import
import { FormsModule } from '@angular/forms'; // Add if using forms

@Component({
  selector: 'app-rsvp-tester',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './rsvp-tester.component.html',
  styleUrls: ['./rsvp-tester.component.css']
})
export class RsvpTesterComponent {
  attendees: any[] = [];
  responseCounts: any = {};

  constructor(private rsvpService: RsvpService) {}

  addOrUpdateRsvp(playerId: string, status: string) {
    const player = { id: playerId, name: `Player ${playerId}`, email: `${playerId}@example.com` };
    this.rsvpService.updateRsvp(player, status as 'Yes' | 'No' | 'Maybe').then(() => {
      console.log(`RSVP updated for ${player.name}`);
    });
  }

  fetchConfirmedAttendees() {
    this.rsvpService.getConfirmedAttendees().subscribe((attendees) => {
      this.attendees = attendees;
      console.log('Confirmed Attendees:', attendees);
    });
  }

  fetchResponseCounts() {
    this.rsvpService.getResponseCounts().subscribe((counts) => {
      this.responseCounts = counts;
      console.log('Response Counts:', counts);
    });
  }
}
