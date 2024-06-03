import { Component, OnInit, Input } from '@angular/core';
import { PostPhoto } from '../models/post-photo';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  @Input() photo: PostPhoto;
  imgPath: string = "assets/images/post-images/"

  constructor() { }

  ngOnInit() {
  }

}
