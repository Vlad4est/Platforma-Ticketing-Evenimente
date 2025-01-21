export interface Event {
    id: string | number;
    title: string;
    dateTime: Date | string;
  }
  
  export interface CustomRequest {
    username: string;
    event: Event;
  }