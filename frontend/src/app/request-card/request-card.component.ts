import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrl: './request-card.component.scss'
})
export class RequestCardComponent {
  @Input() request!: any;
  @Output() requestProcessed = new EventEmitter<any>();
  constructor(private appService: AppService) {}

 
  onAccept(): void {
    console.log(this.request.event.id, this.request.username);
    this.appService.acceptRequest(this.request.event.id, this.request.username).subscribe(
      (response) => {
        console.log('POST response:', response);
        this.requestProcessed.emit(this.request);
      },
      (error) => {
        console.log('POST error:', error);
      }
    );
  }

  onDecline(): void {
    this.appService.declineRequest(this.request.event.id, this.request.username).subscribe(
      (response) => {
        console.log('POST response:', response);
        this.requestProcessed.emit(this.request);
      },
      (error) => {
        console.log('POST error:', error);
      }
    )
  }
}
