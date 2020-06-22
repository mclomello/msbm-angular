import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Product } from '../product.model';

const EXAMPLE_DATA: Product[] = [
  { id: 1, name: 'Hydrogen', price: 100.50 },
  { id: 2, name: 'Helium', price: 100.00 },
  { id: 3, name: 'Lithium', price: 100.00 },
  { id: 4, name: 'Beryllium', price: 100.00 },
  { id: 5, name: 'Boron', price: 100.00 },
  { id: 6, name: 'Carbon', price: 100.00 },
  { id: 7, name: 'Nitrogen', price: 100.00 },
  { id: 8, name: 'Oxygen', price: 100.00 },
  { id: 9, name: 'Fluorine', price: 100.00 },
  { id: 10, name: 'Neon', price: 100.00 },
  { id: 11, name: 'Sodium', price: 100.00 },
  { id: 12, name: 'Magnesium', price: 100.00 },
  { id: 13, name: 'Aluminum', price: 100.00 },
  { id: 14, name: 'Silicon', price: 100.00 },
  { id: 15, name: 'Phosphorus', price: 100.00 },
  { id: 16, name: 'Sulfur', price: 100.00 },
  { id: 17, name: 'Chlorine', price: 100.00 },
  { id: 18, name: 'Argon', price: 100.00 },
  { id: 19, name: 'Potassium', price: 100.00 },
  { id: 20, name: 'Calcium', price: 100.00 },
];

export class ProductReadTableDataSource extends DataSource<Product> {
  data: Product[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<Product[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() { }

  private getPagedData(data: Product[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Product[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
