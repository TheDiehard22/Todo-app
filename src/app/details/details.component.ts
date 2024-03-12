import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '../todo-item';
import { DataService } from '../data.service';
import { CommentService } from '../comment.service';
import { Router } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms'; // Only if you're using template-driven forms
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

// Import ReactiveFormsModule if not already imported
import { ReactiveFormsModule } from '@angular/forms';

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
    ReactiveFormsModule,
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
          <form [formGroup]="commentForm" (ngSubmit)="addComment()">
            <textarea matInput placeholder="Share your thoughts..." formControlName="comment" maxlength="350" (keydown)="onKeyDown($event)"></textarea>
            <div>
              <button mat-raised-button color="primary" type="submit">Comment</button>
            </div>
          </form>
        </article>
        <article class="container-bottom">
          <h2 class="title-list">Comment list</h2>
          <div>
            <ul>
                @for (comment of comments; track comment){
                  <div class="comment-item">
                    <li>
                      <div>
                        <p>{{ comment }}</p>
                        <button mat-icon-button (click)="removeComment(comment)">
                          <mat-icon>delete</mat-icon>
                        </button>
                      </div>
                    </li>
                </div>
                }
            </ul>
          </div>
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
    private fb: FormBuilder,
    private commentService: CommentService,) {
      const id = Number(this.route.snapshot.params['id']);
      this.todoItem = this.dataService.items2().find(item => item.id === id);
      this.pageId = this.route.snapshot.params['id'] ?? 0;
      this.commentForm = this.fb.group({
        comment: ['', Validators.required], // Add the required validator
      });
  }

  addComment() {
    if (this.commentForm.valid) {
      const comment = this.commentForm.value.comment;
      // Add the comment to CommentService
      this.commentService.addComment(this.pageId, comment);
      this.commentForm.reset(); // Reset the form after successful submission
      // Refresh the comments list
      this.comments = this.commentService.getComments(this.pageId);
    } else {
      // Handle invalid form (optional)
      console.log("Form is invalid!");
    }
  }

  removeComment(comment: string) {
    const index = this.comments.indexOf(comment);
    if (index > -1) {
      this.comments.splice(index, 1); // Remove the comment from the array
    }
  }

  onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Enter' && !event.ctrlKey && !event.altKey && !event.shiftKey) {
    event.preventDefault(); // Prevent default form submission
    if (this.commentForm.valid) {
      this.addComment();
    }
  }
}
  
  ngOnInit() {
    // Retrieve comments from CommentService on component initialization
    this.pageId = Number(this.route.snapshot.params['id']);
    this.comments = this.commentService.getComments(this.pageId);
    this.commentForm = this.fb.group({
      comment: ['', Validators.required], // Add the required validator
    });
  }

  commentForm: FormGroup;
  
  goBack() {
    this.router.navigate(['/']); // Navigeer naar de homepage
  }

}
