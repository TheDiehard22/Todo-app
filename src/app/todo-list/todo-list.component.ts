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
              <a [routerLink]="['/details', item.id]" matListItemTitle>
                <li>
                  <div>
                    <p>{{ item.title }}</p>
                    <p matListItemLine>{{ item.status }}</p>
                  </div>
                </li>
              </a>
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
