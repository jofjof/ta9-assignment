import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { ListComponent } from '../components/list/list.component';
import { MatDialog } from '@angular/material/dialog';
import { ItemFormComponent } from '../components/item-form/item-form.component';
import { SearchComponent } from '../components/search/search.component';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-root',
  imports: [ListComponent, SearchComponent, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  isListView = signal(true);

  constructor(private dialog: MatDialog) { }

  openAddItemDialog(): void {
    this.dialog.open(ItemFormComponent, {
      width: '300px'
    });
  }

  toggleView(): void {
    this.isListView.update((value) => !value);
  }
}
