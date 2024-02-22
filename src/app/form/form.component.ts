import { Component, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Add your first task:</h2>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field class="text-field">
          <input matInput #input maxlength="20" placeholder="Title task" [(ngModel)]="formData.title"[ngModelOptions]="{standalone: true}">
          <mat-label>Title</mat-label>
        </mat-form-field>
        <mat-form-field [color]="colorControl.value!">
          <mat-label>Status</mat-label>
          <mat-select [formControl]="colorControl" [(ngModel)]="formData.status">
            <mat-option value="Pending">Pending</mat-option>
            <mat-option value="In Progress">In Progress</mat-option>
            <mat-option value="Completed">Completed</mat-option>
          </mat-select>
        </mat-form-field>
        <button type="submit">Add your task</button>
      </form>
    </div>
  `,
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  formData = { title: '', status: 'Pending' };
  constructor(private dataService: DataService) {}

  ngOnInit() {}

  onSubmit() {
    this.dataService.addItem(this.formData);
    this.formData = { title: '', status: 'Pending' }; // Clear form data
  }

  colorControl = new FormControl('primary' as ThemePalette);
}
