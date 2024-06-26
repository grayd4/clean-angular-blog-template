import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";
import { map, catchError, mergeMap} from "rxjs/operators";
import { ApiService } from "./api.service";
import { environment } from "../../environments/environment";
import { BlogPost } from "../models/blog-post";
import { Observable, from, forkJoin, of } from "rxjs";
import * as fs from "file-system";
import * as path from "path";
import { HttpClient } from '@angular/common/http';
import { PostType } from "../post-type.enum";
import { PostPhoto } from "../models/post-photo";

@Injectable({
  providedIn: "root"
})
export class BlogPostService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  public GetPosts(postType: PostType = PostType.BlogEntry, sortBy: string = 'Created_date'): Observable<BlogPost[]> {

    // For using local posts
    const fileNames = ["post1", "post2", "post3", "post4", "post5"];

    const fileObservables = fileNames.map((fileName) =>
      this.readBlogPost(postType, fileName)
    );
    return forkJoin(fileObservables).pipe(
      map((blogPosts) => {
        // Sort the blogPosts array based on the provided property
        // Defauly by date newest first
        if (null == postType) {
          return blogPosts.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
        } else return blogPosts.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1)).filter((post) => post.postType === postType);
      })
    );
  }

  public GetPost(postType: PostType = PostType.BlogEntry, fileName: string): Observable<BlogPost> {
    
    // Local way
    return this.readBlogPost(postType, fileName);
  }

  public GetPhoto(fileName: string): Observable<PostPhoto> {
    
    // Local way
    return this.readPhoto(fileName);
  }

  public CreatePost(post: BlogPost): Observable<any> {
    return this.apiService.Post(environment.api.entries, post);
  }

  public deletePost(id) {
    return this.apiService.Delete(environment.api.entries + "/" + id);
  }

  // Read and parse a single blog post from a file
  private readBlogPost(postType: PostType = PostType.BlogEntry, fileName: string): Observable<BlogPost> {

    return this.http.get(`assets/posts/${fileName}.json`).pipe(
      map((jsonData) => new BlogPost(jsonData)),
      catchError((error) => {
        console.error(`Error reading file ${fileName}.json:`, error);
        return of(null); // Return an observable to continue processing other files
      })
    );
  }

  // Read and parse a single blog photo from a file
  private readPhoto(fileName: string): Observable<PostPhoto> {

    return this.http.get(`assets/post-photos/${fileName}.json`).pipe(
      map((jsonData) => new PostPhoto(jsonData)),
      catchError((error) => {
        console.error(`Error reading file ${fileName}.json:`, error);
        return of(null); // Return an observable to continue processing other files
      })
    );
  }
}
