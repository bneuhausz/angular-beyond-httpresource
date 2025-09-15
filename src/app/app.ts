import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>{{ title() }}</h1>
    <p>
      <a routerLink="/posts-resource">Posts with resource</a>
      <a routerLink="/posts-rxresource">Posts with rxResource</a>
    </p>

    <router-outlet />
  `,
  styles: [`
    a {
      margin-right: 15px;
    }
  `],
})
export class App {
  protected readonly title = signal('Angular - Beyond httpResource');
}
