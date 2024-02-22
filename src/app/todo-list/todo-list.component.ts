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
            <mat-list-item>
              @for (item of items; track item.id){
                <ng-container matListItemTitle>
                <div class="todo-task">
                  <span matListItemTitle>{{ item.title }}</span>
                  <span matListItemLine>{{ item.status }}</span>
                </div>
                </ng-container>
              }
            </mat-list-item>
          </mat-list>
        </ul>
      </div>
    </article>

    <!-- @for (housingLocation of filteredLocationList; track housingLocation.id){ -->
  `,
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  items: any[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.itemAdded.subscribe(item => {
      this.items.push(item);
    });
  }
}