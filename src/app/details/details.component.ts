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
          <h2 class="title-list">Description</h2>
          <div class="a-container">
            <form class="example-form">
              <textarea matInput placeholder="Type here your description..."></textarea>
              <div>
                <button mat-stroked-button color="primary">Save</button>
                <button mat-stroked-button color="warn">Clear</button>
              </div>
            </form>
          </div>
        </article>
        <article class="container-bottom">
          <h2 class="title-list">History</h2>
        </article>
      </main>
    </section>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  dataService = inject(DataService);
  todoItem: TodoItem | undefined;

  constructor(private router: Router) { // Injecteer de Router service
    const id = Number(this.route.snapshot.params['id']);
    this.todoItem = this.dataService.items2().find(item => item.id === id);
  }

  goBack() {
    this.router.navigate(['/']); // Navigeer naar de homepage
  }

}
