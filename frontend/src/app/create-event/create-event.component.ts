import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.scss'
})
export class CreateEventComponent {
  createEventForm = this.fb.group({
    organizerId : "",
    title: ['', Validators.required],
    description: [''],  // Not required as per schema
    location: ['', Validators.required],
    time: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder, 
    private appService: AppService, 
    private router: Router
  ) {}
  onSubmit() {
    console.log(this.createEventForm.value);
    let eventData = this.createEventForm.value;
    eventData.organizerId = localStorage.getItem("id");
    console.log(eventData);
    this.appService.createEvent(eventData).subscribe(
      (response) => {
        
        console.log('POST response:', response);
        alert(response.message)
        this.router.navigate(["/dashboard"]); 
      },
      (error) => {
        console.log('POST error:', error);
        alert(error.statusText);
      }
    );
  
  }
}
