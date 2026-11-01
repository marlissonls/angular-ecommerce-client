import { Component, input } from '@angular/core';
import type { CategoryPublicView } from '@/app/core/models/category';

@Component({
  selector: 'app-featured-categories',
  standalone: true,
  templateUrl: './featured-categories.component.html',
})
export class FeaturedCategoriesComponent {
  readonly categories = input.required<CategoryPublicView[]>();
  readonly loading = input(false);
}