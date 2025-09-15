import { Component, inject, model } from "@angular/core";
import { PostService } from "./posts";
import { FormsModule } from "@angular/forms";
import { rxResource } from "@angular/core/rxjs-interop";
import { debouncedAndDistinctSignal } from "./signal-helper";
import { map } from "rxjs";

@Component({
  selector: 'app-posts-rx-resource',
  imports: [FormsModule],
  template: `
    <h2>Posts with rxResource</h2>

    <input [(ngModel)]="searchTerm" />
    <button (click)="this.searchTerm.set('')">Clear filter</button>
    <button (click)="reload()">Reload posts</button>

    @if (posts.isLoading()) {
      <p>Loading posts...</p>
    }
    @else if (posts.error()) {
      <p>Error loading posts: {{ posts.error()?.message }}</p>
    }
    @else {
      <ul>
        @for (post of posts.value(); track $index) {
          <li>{{ post.title }}</li>
        }
      </ul>
    }
    
    @if (alteredPosts.isLoading()) {
      <p>Loading posts...</p>
    }
    @else if (alteredPosts.error()) {
      <p>Error loading posts: {{ alteredPosts.error()?.message }}</p>
    }
    @else {
      <ul>
        @for (post of alteredPosts.value(); track $index) {
          <li>{{ post.title }}</li>
        }
      </ul>
    }
  `
})
export default class PostsRxResourceComponent {
  postsService = inject(PostService);

  searchTerm = model('');
  debouncedSearchTerm = debouncedAndDistinctSignal(this.searchTerm);

  posts = rxResource({
    params: () => this.debouncedSearchTerm(),
    stream: ({ params }) => {
      return this.postsService
        .getFilteredPostsObservable(params);
    },
    defaultValue: [],
  });

  alteredPosts = rxResource({
    params: () => this.debouncedSearchTerm(),
    stream: ({ params }) => {
      return this.postsService
        .getFilteredPostsObservable(params)
        .pipe(
          map(posts => posts.map(post => ({ ...post, title: post.title.toUpperCase() })))
        );
    },
    defaultValue: [],
  });

  reload() {
    this.posts.reload();
    this.alteredPosts.reload();
  }
}
