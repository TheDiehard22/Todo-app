import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TodoItem } from '../todo-item';
import { DataService } from '../data.service';

import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [MatListModule, FormsModule, MatFormFieldModule],
  template: `
    <section>
      <header>
        <h1>  {{ todoItem?.title }} </h1>
        <p> {{ todoItem?.status }} </p>
      </header>

      <article>
        <h2 class="title-list">Description</h2>
        <div>
          <form class="example-form">
            <textarea matInput placeholder="..."></textarea>
          </form>
        </div>
      </article>
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
