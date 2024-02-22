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
              @for (item of dataService.items2(); track item.id){
                <ng-container matListItemTitle>
                  <span matListItemTitle>{{ item.title }}</span>
                  <span matListItemLine>{{ item.status }}</span>
                </ng-container>
              }
            </mat-list-item>
          </mat-list>
        </ul>
      </div>
    </article>
  `,
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  items: any[] = [];

  constructor(public dataService: DataService) {}

  ngOnInit() {
    this.dataService.itemAdded.subscribe(item => {
      this.items.push(item);
    });
  }
}