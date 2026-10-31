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
  userId: string;
  userName: string;
  userEmail: string;
  joinedAt: string;
}
