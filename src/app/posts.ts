import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface Post {
  id: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[] =
    [
      {
        id: 1,
        title: 'Post 1',
      },
      {
        id: 2,
        title: 'Post 2',
      },
    ];

  getFilteredPosts(searchTerm: string): Promise<Post[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const term = searchTerm.toLowerCase();
        const filteredPosts = this.posts.filter(post =>
          post.title.toLowerCase().includes(term)
        );
        resolve(filteredPosts);
      }, 1000);
    });
  }

  getFilteredPostsObservable(searchTerm: string): Observable<Post[]> {
    const term = searchTerm.toLowerCase();
    const filteredPosts = this.posts.filter(post =>
      post.title.toLowerCase().includes(term)
    );
    return of(filteredPosts).pipe(delay(1000));
  }
}