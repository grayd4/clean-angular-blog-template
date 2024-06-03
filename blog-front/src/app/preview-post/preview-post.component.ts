import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { BlogPost } from "../models/blog-post";
import { BlogPostService } from "../service/blog-post.service";
import { PostPhoto } from "../models/post-photo";

@Component({
  selector: "app-preview-post",
  templateUrl: "./preview-post.component.html",
  styleUrls: ["./preview-post.component.css"]
})
export class PreviewPostComponent implements OnInit {
  @Input() post: BlogPost;
  photo: PostPhoto;
  loadingPhoto: Boolean = true;

  constructor(private router: Router,     private postService: BlogPostService
  ) {}
  ngOnInit() {
    this.getFirstPhoto();
  }

  public go(): void {
    this.router.navigateByUrl("/post/" + this.post._id);
  }

  private getFirstPhoto(): void {
    // Retrieve photo details
    // Arrow function allows use of "this" keyword
    if (this.post.photoIds.length > 0) {
      this.postService.GetPhoto(this.post.photoIds[0]).subscribe(photo => {
        console.log("photo: " + JSON.stringify(photo));
        this.photo = photo;
        this.loadingPhoto = false;
      });
    }
  }
}
