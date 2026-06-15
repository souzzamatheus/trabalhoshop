import { AsyncPipe, CurrencyPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../models/store.models';
import { StoreApiService } from '../../services/store-api.service';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CurrencyPipe, NgFor, NgIf, RouterLink, TitleCasePipe],
  templateUrl: './home.html',
})
export class Home {
  private readonly storeApi = inject(StoreApiService);
  readonly products$: Observable<Product[]> = this.storeApi.getProducts();
}
