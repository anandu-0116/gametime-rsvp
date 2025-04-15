import { Injectable } from '@angular/core';
import { Firestore, collection, doc, setDoc, query, where, getDocs, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { RsvpEntry, RsvpStatus, Player } from '../models/rsvp.model';

@Injectable({ providedIn: 'root' })
export class RsvpService {
  private rsvpCollection;
  private playersCollection;

  constructor(private firestore: Firestore) {
    // Initialize collections after injection
    this.rsvpCollection = collection(this.firestore, 'rsvps');
    this.playersCollection = collection(this.firestore, 'players');
  }

  // Add or update an RSVP
  async updateRsvp(player: Player, status: RsvpStatus): Promise<void> {
    const rsvpDocRef = doc(this.rsvpCollection, player.id);
    const playerDocRef = doc(this.playersCollection, player.id);
  
    await Promise.all([
      setDoc(rsvpDocRef, {
        playerId: player.id,
        status,
        updatedAt: new Date().toISOString(),
      }),
      setDoc(playerDocRef, {
        id: player.id,
        name: player.name,
        email: player.email, // if applicable
      }),
    ]);
  
    console.log(`RSVP updated and player saved: ${player.name}`);
  }

  // Get all confirmed attendees
  getConfirmedAttendees(): Observable<Player[]> {
    const confirmedRsvpsQuery = query(this.rsvpCollection, where('status', '==', 'Yes'));
    return new Observable<Player[]>((observer) => {
      getDocs(confirmedRsvpsQuery).then((rsvpsSnapshot) => {
        const confirmedPlayerIds = rsvpsSnapshot.docs.map((doc) => doc.data()['playerId']);
  
        const playerFetches = confirmedPlayerIds.map((id) => {
          const playerDocRef = doc(this.playersCollection, id);
          return getDoc(playerDocRef).then((docSnap) => docSnap.data() as Player);
        });
  
        Promise.all(playerFetches).then((players) => {
          observer.next(players);
        });
      });
    });
  }

  // Get response counts
  getResponseCounts(): Observable<{ total: number; confirmed: number; declined: number }> {
    return new Observable<{ total: number; confirmed: number; declined: number }>((observer) => {
      getDocs(this.rsvpCollection).then((snapshot) => {
        const rsvps = snapshot.docs.map((doc) => doc.data() as RsvpEntry);
        const counts = {
          total: rsvps.length,
          confirmed: rsvps.filter((rsvp) => rsvp.status === 'Yes').length,
          declined: rsvps.filter((rsvp) => rsvp.status === 'No').length,
        };
        observer.next(counts);
      });
    });
  }
}
