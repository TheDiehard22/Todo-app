import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatListModule, RouterModule],
  template: `
    <article>
      <h2 class="title-list">Todo List</h2>
      <div>
        <ul>
          <mat-list>
            @for (item of dataService.items2(); track item.id){
            <mat-list-item>
                <a [routerLink]="['/details', item.id]" matListItemTitle>{{ item.title }}</a>
                <a matListItemLine>{{ item.status }}</a>
              </mat-list-item>
            }
          </mat-list>
        </ul>
      </div>
    </article>
  `,
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {
  constructor(public dataService: DataService) {}

  ngOnInit() {

  }
}
