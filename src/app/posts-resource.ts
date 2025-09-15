import { Component, inject, model, resource } from "@angular/core";
import { PostService } from "./posts";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-posts-resource',
  imports: [FormsModule],
  template: `
    <h2>Posts with Resource</h2>

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
      <p>Loading altered posts...</p>
    }
    @else if (alteredPosts.error()) {
      <p>Error loading altered posts: {{ alteredPosts.error()?.message }}</p>
    }
    @else {
      <ul>
        @for (post of alteredPosts.value(); track $index) {
          <li>{{ post.title }}</li>
        }
      </ul>
    }

    @if (alteredPostsAsync.isLoading()) {
      <p>Loading altered posts with async...</p>
    }
    @else if (alteredPostsAsync.error()) {
      <p>Error loading altered posts with async: {{ alteredPostsAsync.error()?.message }}</p>
    }
    @else {
      <ul>
        @for (post of alteredPostsAsync.value(); track $index) {
          <li>{{ post.title }}</li>
        }
      </ul>
    }
  `
})
export default class PostsResourceComponent {
  postsService = inject(PostService);

  searchTerm = model('');

  posts = resource({
    params: () => this.searchTerm(),
    loader: ({ params }) => this.postsService.getFilteredPosts(params),
    defaultValue: [],
  });

  alteredPosts = resource({
    params: () => this.searchTerm(),
    loader: ({ params }) => {
      return this.postsService
        .getFilteredPosts(params)
        .then(posts => posts.map(post => ({ ...post, title: post.title.toUpperCase() })));
    },
    defaultValue: [],
  });

  alteredPostsAsync = resource({
    params: () => this.searchTerm(),
    loader: async ({ params }) => {
      const posts = await this.postsService.getFilteredPosts(params);
      return posts.map(post => ({ ...post, title: post.title.toUpperCase() }));
    },
    defaultValue: [],
  });

  reload() {
    this.posts.reload();
    this.alteredPosts.reload();
    this.alteredPostsAsync.reload();
  }
}
