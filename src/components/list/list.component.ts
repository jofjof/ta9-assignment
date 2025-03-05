import { ChangeDetectionStrategy, Component, inject, Input, Signal } from '@angular/core';
import { ItemComponent } from './item/item.component';
import { CommonModule } from '@angular/common';
import { ItemsService } from '../../services/items/items.service';
import { Item } from '../../models/item.model';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-list',
  imports: [ItemComponent, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() isListView!: Signal<boolean>;
  private itemsService = inject(ItemsService);
  itemsList: Signal<Item[]> = toSignal(this.itemsService.items$, { initialValue: [] });
  
  constructor() {
    this.itemsService.fetchItems();
   }
}
