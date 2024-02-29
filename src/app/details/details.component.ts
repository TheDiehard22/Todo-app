import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '../todo-item';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatListModule, FormsModule, MatFormFieldModule, MatButtonModule, MatDividerModule, MatIconModule],
  template: `
    <section>
      <header>
        <div>
          <button mat-button (click)="goBack()" class="btn-previous">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1> {{ todoItem?.title }} </h1>
        </div>
        <p> Status: {{ todoItem?.status }} </p>
      </header>
      <main>
        <article class="container-top">
          <h2 class="title-list">Add a comment</h2>
          <div class="a-container">
              <textarea placeholder="Share your thoughts..." [(ngModel)]="comment" maxlength="300" ></textarea>
              <div>
                <button mat-stroked-button color="primary" (click)="onSubmit()">Comment</button>
              </div>
          </div>
        </article>
        <article class="container-bottom">
          <h2 class="title-list">Comment list</h2>
          <ul>
              @for (comment of comments; track comment){
                <li>
                  <p>{{ comment }}</p>
                  <button mat-icon-button (click)="onDeleteComment(comment)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </li>
              }
          </ul>
        </article>
      </main>
    </section>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  // Injecteer services met dependency injection
  route: ActivatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService);
  todoItem: TodoItem | undefined;

  constructor(private router: Router) { // Injecteer de Router service
    const id = Number(this.route.snapshot.params['id']); // Haal de ID op uit de route parameter
    this.todoItem = this.dataService.items2().find(item => item.id === id); // Zoek het TodoItem object met de opgehaalde ID
  }

  goBack() {
    this.router.navigate(['/']); // Navigeer naar de homepage
  }

  comment: string = ''; // Declare with an initial value
  comments: string[] = []; // Array to store user comments

  onSubmit() {
    this.comments.push(this.comment); // Add new comment to the array
    this.comment = ""; // Reset textarea after submission
  }

  onDeleteComment(comment: string) {
    const index = this.comments.indexOf(comment);
    if (index > -1) {
      this.comments.splice(index, 1); // Remove the comment from the array
    }
  }
}



