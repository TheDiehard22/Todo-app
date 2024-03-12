import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { Router, RouterModule } from '@angular/router';

import { DataService } from '../data.service';
import { TodoItem } from '../todo-item';
import { TodoService } from '../todo.service';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule, RouterModule, MatIconModule],
  template: `
    <article>
      <h2 class="title-list">Task manager</h2>
      <div class="a-container">
        <ol>
          @for (item of todoService.items(); track item.id){
            <div class="list-item">
              <a [routerLink]="['/details', item.id]" matListItemTitle>
                <li>
                  <div>
                    <p>{{ item.title }}</p>
                    <p matListItemLine>{{ item.status }}</p>
                  </div>
                </li>
              </a>
              <button mat-icon-button (click)="deleteItem(item)">
                <mat-icon class="trash-icon">delete</mat-icon>
              </button>
            </div>
          }
        </ol>
      </div>
    </article>
  `,
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  constructor(
    public dataService: DataService,
    public todoService: TodoService,
    private router: Router) { }

  ngOnInit() { }
  deleteItem(item: TodoItem) {
    const itemId = item?.id; // Use optional chaining to get the id
    if (itemId !== undefined) { // Check if the id is not undefined
      this.dataService.deleteItem(itemId);
      this.router.navigate(['/']);
    }
  }
}
