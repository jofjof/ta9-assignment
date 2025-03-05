import { Component, ChangeDetectionStrategy } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { ItemsService } from '../../services/items/items.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  imports: [MatIcon],
  templateUrl: './search.component.html',
  styleUrl: './search.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {
  searchValue = new Subject<string>();

  constructor(private itemsService: ItemsService) {
    this.searchValue
      .pipe(debounceTime(200))
      .subscribe((searchValue: string) => {
        this.itemsService.filterItems(searchValue);
      });
  }

  onSearchInputChange(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchValue.next(searchTerm);
  }

  ngOnDestroy() {
    this.searchValue.complete();
  }
}
