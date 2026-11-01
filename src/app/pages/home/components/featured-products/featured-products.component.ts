import { Component, input } from '@angular/core';
import type { ProductPublicView } from '@/app/core/models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-featured-products',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './featured-products.component.html',
})
export class FeaturedProductsComponent {
  readonly products = input.required<ProductPublicView[]>();
  readonly loading = input(false);
}