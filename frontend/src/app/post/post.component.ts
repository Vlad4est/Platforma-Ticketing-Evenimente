import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  @Input() event: any;
  likeCount: number = 0;
  isLiked: boolean = false;
  imageURL: string = "";
  userAvatarUrl =
    'https://aui.atlassian.com/aui/9.1/docs/images/avatar-person.svg';
  

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.imageURL = this.event?.imageURL;
    this.likeCount = this.event?.likes?.length;
    let username = localStorage.getItem("username");
    if(this.event?.likes?.includes(username)) {
      this.isLiked = true;
    }
    else {
      this.isLiked = false;
    }
  }
  likePost(): void {}

  

}
