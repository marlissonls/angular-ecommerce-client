import { Component, input } from '@angular/core';
import type { ProductPublicView } from '@/app/core/models/product';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './new-arrivals.component.html',
})
export class NewArrivalsComponent {
  readonly products = input.required<ProductPublicView[]>();
  readonly loading = input(false);
}