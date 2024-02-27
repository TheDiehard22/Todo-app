import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '../todo-item';
import { DataService } from '../data.service';

import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider';;

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatListModule, FormsModule, MatFormFieldModule, MatButtonModule, MatDividerModule],
  template: `
    <section>
      <header>
        <h1> Task: {{ todoItem?.title }} </h1>
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
                <button mat-stroked-button color="warn">Delete</button>
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

  constructor() {
    const id = Number(this.route.snapshot.params['id']);
    this.todoItem = this.dataService.items2().find(item => item.id === id);
  }

}
