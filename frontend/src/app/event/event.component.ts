import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit{
  @Input() event: any;
  requestSent = false;
  username = localStorage.getItem("username");
  constructor(private appService: AppService) {
    
  }
  ngOnInit(): void {
    if(this.event.pendingInvitations.includes(this.username) || this.event.declinedInvitations.includes(this.username)
       || this.event.participants.includes(this.username)) {
      this.requestSent = true;
    }
  }
  onRequestInvite(): void {
      this.appService.requestInvite(this.event.id).subscribe(
        (response) => {
          console.log('POST response:', response);
          this.requestSent = true;
        },
        (error) => {
          console.log('POST error:', error);
        }
      )
  }

}

