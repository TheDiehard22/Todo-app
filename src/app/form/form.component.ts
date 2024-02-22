import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
        <h2>Add your first task:</h2>
        <form>
            <mat-form-field class="text-field">
                <input matInput #input maxlength="10" placeholder="Title task">
                <mat-label>Title</mat-label>
            </mat-form-field>
            <mat-form-field [color]="colorControl.value!">
                    <mat-label>Status</mat-label>
                    <mat-select [formControl]="colorControl">
                        <mat-option value="primary">Finished</mat-option>
                        <mat-option value="accent">In progress</mat-option>
                        <mat-option value="warn">Not done</mat-option>
                    </mat-select>
            </mat-form-field>
            <button type="submit"> Add your task</button>
        </form>
    </div>
  `,
  styleUrl: './form.component.css'
})
export class FormComponent {
  colorControl = new FormControl('primary' as ThemePalette);
}
