import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';
import { EventComponent } from './event/event.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateEventComponent } from './create-event/create-event.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "homepage",
    component: HomepageComponent,
    canActivate: [authGuard]
  },
  {
    path: "createPost",
    component: CreatePostComponent,
    canActivate: [authGuard]
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {path: "dashboard", 
    component: DashboardComponent
  },
  {
    path: "createEvent",
    component: CreateEventComponent
  },
  {
    path: "**",
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
