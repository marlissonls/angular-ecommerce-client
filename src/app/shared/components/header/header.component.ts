import { Component, input, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  LucideSearch,
  LucideUserRound,
  LucideHeart,
  LucideShoppingCart,
  LucideMenu,
  LucideX,
} from '@lucide/angular';

@Component({
  selector: 'app-header',
  imports: [
    FormsModule,
    RouterLink,
    LucideSearch,
    LucideUserRound,
    LucideHeart,
    LucideShoppingCart,
    LucideMenu,
    LucideX,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private readonly router = inject(Router);

  readonly cartCount = input(0);
  readonly search = signal('');
  readonly menuOpen = signal(false);

  handleSearch(): void {
    const query = this.search().trim();

    if (!query) return;

    this.router.navigate(['/search'], {
      queryParams: { q: query },
    });

    this.search.set('');
    this.closeMenu();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }
}