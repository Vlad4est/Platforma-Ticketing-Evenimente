import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent {
  username = 'Andrei';
  isOrganizer: boolean = localStorage.getItem("isOrganizer") === "true";
  
  events: any;
    constructor( private appService: AppService, private router: Router) {
      if(this.isOrganizer) {
        this.router.navigate(["dashboard"]);
      }
      // this.events = [
      //   {
      //     id: 1,
      //     title: 'Tech Conference 2025',
      //     description: 'Join us for an exciting three-day conference featuring the latest in AI, blockchain, and cloud computing. Network with industry leaders and participate in hands-on workshops.',
      //     location: 'Convention Center, New York',
      //     dateTime: new Date('2025-03-15T09:00:00'),
      //     totalSeats: 500,
      //     availableSeats: 123
      //   },
      //   {
      //     id: 2,
      //     title: 'Startup Networking Mixer',
      //     description: 'Connect with fellow entrepreneurs and investors in a casual setting. Perfect opportunity to pitch your ideas and find potential collaborators.',
      //     location: 'WeWork Downtown, San Francisco',
      //     dateTime: new Date('2025-02-28T18:30:00'),
      //     totalSeats: 100,
      //     availableSeats: 45
      //   },
      //   {
      //     id: 3,
      //     title: 'Data Science Workshop',
      //     description: 'Hands-on workshop covering Python, pandas, and machine learning basics. Bring your laptop and prepare to dive into real-world data analysis.',
      //     location: 'Central Library, Boston',
      //     dateTime: new Date('2025-04-10T10:00:00'),
      //     totalSeats: 50,
      //     availableSeats: 15
      //   },
      //   {
      //     id: 4,
      //     title: 'Design Systems Symposium',
      //     description: 'Explore the latest trends in design systems. Learn from industry experts about scaling design across large organizations.',
      //     location: 'Design Museum, London',
      //     dateTime: new Date('2025-05-20T09:30:00'),
      //     totalSeats: 200,
      //     availableSeats: 82
      //   },
      //   {
      //     id: 5,
      //     title: 'Mobile Dev Meetup',
      //     description: 'Monthly meetup for mobile developers. This month featuring talks on Swift UI and Jetpack Compose. Food and drinks provided!',
      //     location: 'Google Campus, Seattle',
      //     dateTime: new Date('2025-02-15T17:00:00'),
      //     totalSeats: 150,
      //     availableSeats: 33
      //   },
      //   {
      //     id: 6,
      //     title: 'Women in Tech Summit',
      //     description: 'Annual summit celebrating women in technology. Featuring keynote speakers, panel discussions, and networking opportunities.',
      //     location: 'Tech Hub, Austin',
      //     dateTime: new Date('2025-06-12T08:00:00'),
      //     totalSeats: 300,
      //     availableSeats: 175
      //   },
      //   {
      //     id: 7,
      //     title: 'Cybersecurity Forum',
      //     description: 'Expert-led sessions on the latest in cybersecurity. Topics include zero-trust architecture, threat detection, and incident response.',
      //     location: 'Security Center, Washington DC',
      //     dateTime: new Date('2025-04-25T09:00:00'),
      //     totalSeats: 250,
      //     availableSeats: 98
      //   },
      //   {
      //     id: 8,
      //     title: 'Game Dev Expo',
      //     description: 'Showcase your games, meet publishers, and learn about the latest in game development technologies. Includes VR demo area!',
      //     location: 'Game Arena, Los Angeles',
      //     dateTime: new Date('2025-07-30T10:00:00'),
      //     totalSeats: 400,
      //     availableSeats: 220
      //   },
      //   {
      //     id: 9,
      //     title: 'IoT Innovation Day',
      //     description: 'Full-day event focused on Internet of Things innovations. See the latest smart devices and learn about emerging IoT platforms.',
      //     location: 'Smart City Center, Toronto',
      //     dateTime: new Date('2025-03-28T09:00:00'),
      //     totalSeats: 150,
      //     availableSeats: 67
      //   },
      //   {
      //     id: 10,
      //     title: 'Cloud Architecture Summit',
      //     description: 'Deep dive into modern cloud architecture. Sessions on microservices, serverless, and multi-cloud strategies.',
      //     location: 'AWS Office, Chicago',
      //     dateTime: new Date('2025-05-15T08:30:00'),
      //     totalSeats: 200,
      //     availableSeats: 142
      //   },
      //   {
      //     id: 11,
      //     title: 'Web Performance Workshop',
      //     description: 'Learn techniques for optimizing web application performance. Covers bundling, lazy loading, and modern browser APIs.',
      //     location: 'Mozilla Office, Portland',
      //     dateTime: new Date('2025-04-05T10:00:00'),
      //     totalSeats: 75,
      //     availableSeats: 28
      //   },
      //   {
      //     id: 12,
      //     title: 'Blockchain Developer Conference',
      //     description: 'Two days of blockchain development talks and workshops. Focus on smart contracts, DeFi, and Web3 technologies.',
      //     location: 'Crypto Center, Miami',
      //     dateTime: new Date('2025-06-20T09:00:00'),
      //     totalSeats: 300,
      //     availableSeats: 183
      //   }
      // ];

      this.appService.getEvents().subscribe((events) => {
        this.events = events;
        console.log(this.events);
      });
    }

    getUser() {}
  
    getPosts() {}

    onClickBtn ()
    {
      console.log("clicked");
    }
}
