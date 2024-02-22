import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';

import { DataService } from '../data.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule],
  template: `
    <article>
      <h2>Todo List</h2>
      <div>
        <ul>
          <mat-list>
            @for (item of dataService.items2(); track item.id){
            <mat-list-item>
                <span matListItemTitle>{{ item.title }}</span>
                <span matListItemLine>{{ item.status }}</span>
              </mat-list-item>
            }
          </mat-list>
        </ul>
      </div>
    </article>

    <!-- @for (housingLocation of filteredLocationList; track housingLocation.id){ -->
  `,
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {

  }
}
