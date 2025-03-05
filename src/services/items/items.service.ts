import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ItemDTO } from '../../models/item.dto';
import { Item } from '../../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  readonly items$ = this.itemsSubject.asObservable();
  private allItems: Item[] = [];
  FILE_PATH = 'assets/items.json';

  constructor(private http: HttpClient) { }

  fetchItems(): void {
    this.http.get<ItemDTO[]>(this.FILE_PATH).pipe(
      map((items) =>
        items.map((item) => this.itemMapper(item))
      ),
      tap((items) => {
        this.itemsSubject.next(items)
        this.allItems = items;
      }),
      catchError((error) => {
        console.error('Error fetching items:', error);
        return throwError(() => new Error('Failed to load items'));
      })
    ).subscribe(); 
  }

  addItem(item: Item): void {
    this.itemsSubject.next([...this.itemsSubject.value, item]);
    this.allItems.push(item);
  }

  editItem(item: Item): void {
    this.itemsSubject.next(
      this.itemsSubject.value.map((i) => (i.id === item.id ? item : i)));
      this.allItems.map((i) => (i.id === item.id ? item : i));
  }

  filterItems(searchTerm: string): void {
    const filteredItems = this.allItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.itemsSubject.next(filteredItems);
  }

  resetFilter(): void {
    this.itemsSubject.next(this.allItems);
  }

  private itemMapper(item: ItemDTO): Item {
    return {
      ...item,
      createDate: new Date(item.createDate),
      lastUpdate: new Date(item.lastUpdate),
    };
  }
}
