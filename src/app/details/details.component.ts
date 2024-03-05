import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '../todo-item';
import { DataService } from '../data.service';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    MatListModule,
    FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  template: `
    <section>
      <header>
        <div>
          <button mat-button (click)="goBack()" class="btn-previous">
            <mat-icon>arrow_back</mat-icon>
          </button>
          <h1> {{ todoItem?.title }} </h1>
        </div>
        <p> Status: <span>{{ todoItem?.status }}</span> </p>
      </header>
      <main>
        <article class="container-top">
          <h2 class="title-list">Add a comment</h2>
          <div class="a-container">
              <textarea placeholder="Share your thoughts..." [(ngModel)]="comment" maxlength="350" ></textarea>
              <div>
                <button mat-stroked-button color="primary" (click)="addComment()">Comment</button>
              </div>
          </div>
        </article>
        <article class="container-bottom">
          <h2 class="title-list">Comment list</h2>
          <ul class="comment-list list-discs"l>
              @for (comment of comments; track comment){
                <li>
                  <p>{{ comment }}</p>
                  <button mat-icon-button (click)="removeComment(comment)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </li>
              }
          </ul>
        </article>
      </main>
    </section>
  `,
styleUrls: ['./details.component.css'],
})

export class DetailsComponent {

  todoItem: TodoItem | undefined;

  comment: string = ''; // Declare with an initial value
  comments: string[] = []; // Array to store user comments

  private pageId: number;

  // Injecteer services via constructor
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService, 
    private router: Router,
    private commentService: CommentService,) {
      const id = Number(this.route.snapshot.params['id']);
      this.todoItem = this.dataService.items2().find(item => item.id === id);
      this.pageId = this.route.snapshot.params['id'] ?? 0;
  }

  addComment() {
    // Add the comment to CommentService
    this.commentService.addComment(this.pageId, this.comment);
    this.comment = ''; // Clear the input field
    // Refresh the comments list
    this.comments = this.commentService.getComments(this.pageId);
  }

  removeComment(comment: string) {
    const index = this.comments.indexOf(comment);
    if (index > -1) {
      this.comments.splice(index, 1); // Remove the comment from the array
    }
  }
  
  ngOnInit() {
    // Retrieve comments from CommentService on component initialization
    this.pageId = Number(this.route.snapshot.params['id']);
    this.comments = this.commentService.getComments(this.pageId);
  }
  
  goBack() {
    this.router.navigate(['/']); // Navigeer naar de homepage
  }

}
