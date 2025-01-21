import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { CustomRequest } from '../models/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    requests: any;
    isOrganizer: boolean = localStorage.getItem("isOrganizer") === "true";

    constructor(private appService: AppService, private router: Router) {
      if(!this.isOrganizer) {
        this.router.navigate(["homepage"]);
      }
      this.appService.getRequestsByOrganizerId().subscribe((response: any) => {
        console.log(response);
        
        this.requests = response;
        
        
      });
    }
    loadRequests() {
      this.appService.getRequestsByOrganizerId().subscribe((response: any) => {
        console.log(response);
        this.requests = response;
      });
    }

    onRequestProcessed(processedRequest: CustomRequest) {
      this.requests = this.requests.filter((req: CustomRequest) => 
        req.event.id !== processedRequest.event.id || 
        req.username !== processedRequest.username
      );
    }

}
