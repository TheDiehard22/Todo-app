import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';

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
                            <span matListItemTitle>1 Title</span>
                            <span matListItemLine>Status</span>
                        </mat-list-item>
                        <mat-list-item>
                            <span matListItemTitle>2 Title</span>
                            <span>Status</span>
                        </mat-list-item>
                        <mat-list-item>
                            <span matListItemTitle>3 Title</span>
                            Status
                        </mat-list-item>
                    </mat-list>
                </ul>
            </div>
        </article>
  `,
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {

}
