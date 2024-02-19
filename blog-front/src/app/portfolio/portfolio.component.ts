import { Component, OnInit } from '@angular/core';
import { BlogPostService } from "../service/blog-post.service";
import { BlogPost } from "src/app/models/blog-post";
import { PostType } from "../post-type.enum";


@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  loading: boolean = true;
  posts: BlogPost[];

  constructor(private postService: BlogPostService) { }

  ngOnInit() {
    this.getPosts();
  }

  private getPosts(): void {
    this.postService.GetPosts(PostType.PortfolioEntry).subscribe(posts => {
      this.posts = posts;
      this.loading = false;
    });
  }

}
