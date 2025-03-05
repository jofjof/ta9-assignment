import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items/items.service';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemFormComponent {
  itemForm: FormGroup;
  submittedInvalid: boolean = false;

  constructor(private dialogRef: MatDialogRef<ItemFormComponent>,
    @Inject(MAT_DIALOG_DATA) private item: Item,
    private fb: FormBuilder,
    private itemsService: ItemsService) {
    this.itemForm = this.fb.group({
      id: [this.item?.id],
      name: [this.item?.name ?? "", Validators.required],
      color: [this.item?.color ?? "#000"],
      createdBy: [this.item?.createdBy ?? "", Validators.required],
      createDate: [this.item?.createDate]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      if (this.itemForm.value.id) {
        const itemInput: Item = { ...this.itemForm.value, lastUpdate: new Date() };
        this.itemsService.editItem(itemInput);
      } else {
        const itemInput: Item = {
          ...this.itemForm.value,
          lastUpdate: new Date(),
          createDate: new Date(),
          id: Math.random().toString(36).substring(2, 9)
        };
        this.itemsService.addItem(itemInput);
      }
      this.dialogRef.close();
    } else {
      this.submittedInvalid = true;
    }
  }
}
