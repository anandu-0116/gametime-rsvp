import { Timestamp } from 'firebase/firestore';

export type RsvpStatus = 'Yes' | 'No' | 'Maybe';

export interface Player {
  id: string;
  name: string;
  email: string;
}

export interface RsvpEntry {
  playerId: Player['id'];
  status: RsvpStatus;
  updatedAt: Timestamp;
}
