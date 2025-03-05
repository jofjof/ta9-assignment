import { ChangeDetectionStrategy, Component, Input, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemFormComponent } from '../../item-form/item-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Item } from '../../../models/item.model';

@Component({
  selector: 'app-item',
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemComponent {
  @Input() item!: Item;
  @Input() isListView!: Signal<boolean>;
  constructor(private dialog: MatDialog) { }

  openEditItemDialog(): void {
    this.dialog.open(ItemFormComponent, {
      width: '300px',
      data: this.item
    });
  }
}
