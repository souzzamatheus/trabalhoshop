import { AsyncPipe, CurrencyPipe, NgIf, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Product } from '../../models/store.models';
import { StoreApiService } from '../../services/store-api.service';

@Component({
  selector: 'app-product-detail',
  imports: [AsyncPipe, CurrencyPipe, NgIf, RouterLink, TitleCasePipe],
  templateUrl: './product-detail.html',
})
export class ProductDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly storeApi = inject(StoreApiService);

  readonly product$: Observable<Product> = this.route.paramMap.pipe(
    map((params) => Number(params.get('id'))),
    switchMap((id) => this.storeApi.getProduct(id))
  );
}
