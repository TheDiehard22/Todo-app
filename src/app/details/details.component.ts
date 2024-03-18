import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';

import { CommentService } from '../comment.service';
import { DataService } from '../data.service';
import { TodoItem } from '../todo-item';
import { TodoService } from '../todo.service';

// Import ReactiveFormsModule if not already imported
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
    MatMenuModule,
    CommonModule
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
        <div>
          <span>Status:</span>
          <button mat-button [mat-menu-trigger-for]="menu" type="button">{{ todoService.currentTodo()?.status }}</button>

          <mat-menu #menu="matMenu">
            @for (status of ['Pending', 'In Progress', 'Completed']; track status) {
              <button (click)="todoService.updateItem(pageId(), { status })" mat-menu-item>{{ status }}</button>
            }
          </mat-menu>
        </div>
      </header>
      <main>
        <article class="container-top">
          <h2 class="title-list">Add a comment</h2>
          <form [formGroup]="commentForm" (submit)="addComment()">
            <textarea matInput placeholder="Share your thoughts..." formControlName="comment" maxlength="350"></textarea>
            <div>
              <button mat-raised-button color="primary" type="submit">Comment</button>
            </div>
          </form>
        </article>
        <article class="container-bottom">
          <h2 class="title-list">Comment list</h2>
          <div>
            <ul>
                @for (comment of todoService.currentTodo()?.comments; track comment) {
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
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DetailsComponent {

  todoItem: TodoItem | undefined;

  comment: string = ''; // Declare with an initial value
  comments: string[] = []; // Array to store user comments

  public pageId: WritableSignal<number> = signal(0);

  currentItem = computed(() => {
    console.log();

    return this.dataService.items2().find(item => item.id === this.pageId());
  });

  commentForm: FormGroup;

  // Injecteer services via constructor
  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private router: Router,
    private fb: FormBuilder,
    private commentService: CommentService,
    public todoService: TodoService
  ) {
    this.pageId.set(+this.route.snapshot.params['id'] ?? 0);
    this.todoItem = this.dataService.items2().find(item => item.id === this.pageId());
    this.todoService.currentTodoID.set(this.pageId());
    this.commentForm = this.fb.group({
      comment: ['', Validators.required], // Add the required validator
    });
    this.dataService.pageId.set(this.pageId());
  }

  ngOnInit() {
    // Retrieve comments from CommentService on component initialization
    this.comments = this.commentService.getComments(this.pageId());
    this.commentForm = this.fb.group({
      comment: ['', Validators.required], // Add the required validator
    });
  }

  addComment(comment?: string) {
    console.log('addCommnet', this.pageId(), { comment: this.commentForm.controls['comment'].value });
    this.todoService.updateItem(this.pageId(), { comment: this.commentForm.controls['comment'].value });
    console.log(this.todoService.items());
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

  updateItem(id: number, newItem: Partial<TodoItem>) {
    this.todoService.updateItem(id, newItem); // Update gedeelde state
  }

  goBack() {
    this.router.navigate(['/']); // Navigeer naar de homepage
  }

}
