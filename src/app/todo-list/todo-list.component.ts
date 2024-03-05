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
      <div class="a-container">
        <ol>
            @for (item of dataService.items2(); track item.id){
              <li>
                <div>
                  <a [routerLink]="['/details', item.id]" matListItemTitle>{{ item.title }}</a>
                  <a matListItemLine>{{ item.status }}</a>
                </div>
              </li>
            }
        </ol>
      </div>
    </article>
  `,
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  constructor(public dataService: DataService) { }
  ngOnInit() { }

}
