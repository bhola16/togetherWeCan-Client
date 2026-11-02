export interface IEvent {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  description: string;
  organizerEmail: string;
}

export interface JoinedEvent {
  _id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  userId: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  joinedAt: string | null;
  event: IEvent | null;
}

export interface IPastEvent {
  _id: string;
  title: string;
  eventType: string;
  eventDate: string;
  location: string;
  imageUrl: string;
  description: string;
}
