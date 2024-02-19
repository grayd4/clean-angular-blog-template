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

@Injectable({
  providedIn: "root"
})
export class BlogPostService {
  constructor(private apiService: ApiService, private http: HttpClient) {}

  public GetPosts(sortBy: string = 'Created_date'): Observable<BlogPost[]> {

    // For using local posts
    const fileNames = ["post1", "post2"];

    const fileObservables = fileNames.map((fileName) =>
      this.readBlogPost(fileName)
    );
    return forkJoin(fileObservables).pipe(
      map((blogPosts) => {
        // Sort the blogPosts array based on the provided property
        // Defauly by date newest first
        return blogPosts.sort((a, b) => (b[sortBy] > a[sortBy] ? 1 : -1));
      })
    );

    // For using the API
    /* 
    return this.apiService.Get(environment.api.entries).pipe(
        map(json => {
            // Map API response to BlogPost objects
            return json.map(post => new BlogPost(post));
        })
    );
    */
  }

  // Read and parse a single blog post from a file
  private readBlogPost(fileName: string): Observable<BlogPost> {
    return this.http.get(`assets/posts/${fileName}.json`).pipe(
      map((jsonData) => new BlogPost(jsonData)),
      catchError((error) => {
        console.error(`Error reading file ${fileName}.json:`, error);
        return of(null); // Return an observable to continue processing other files
      })
    );
  }

  public GetPost(fileName: string): Observable<BlogPost> {
    
    // Local way
    return this.readBlogPost(fileName);

    // API way
    /*return this.apiService.Get(environment.api.entries + "/" + id).pipe(
      map(json => {
        return new BlogPost(json);
      })
    );*/
  }

  public CreatePost(post: BlogPost): Observable<any> {
    return this.apiService.Post(environment.api.entries, post);
  }

  public deletePost(id) {
    return this.apiService.Delete(environment.api.entries + "/" + id);
  }


}
