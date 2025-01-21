import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { RegisterComponent } from './register/register.component';
import { EventComponent } from './event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestCardComponent } from './request-card/request-card.component';
import { CreateEventComponent } from './create-event/create-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    TopNavbarComponent,
    PostComponent,
    CreatePostComponent,
    RegisterComponent,
    EventComponent,
    DashboardComponent,
    RequestCardComponent,
    CreateEventComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
