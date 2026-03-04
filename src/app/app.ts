import { Component, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Output } from './output';
import { NavbarComponent } from './navbar/navbar';
import { TextArea } from './text-area';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, TextArea, Output],
  template: `<div class="w-full mb-10">
    <app-navbar></app-navbar>

    <div
      class="flex flex-col gap-10 md:gap-0 items-center md:items-start md:flex-row justify-around pt-7"
    >
      <text-area (textChange)="triggerApiCall($event)" class="w-8/12 md:w-5/12"></text-area>
      <app-output class="w-8/12 md:w-5/12" [imageUrl]="fetchedImage()"></app-output>
    </div>
  </div>`,
})
export class App {
  private http = inject(HttpClient);
  fetchedImage = signal<string | null>(null);

  triggerApiCall(text: string) {
    // if (!text.trim()) {
    //   return;
    // }

    this.http
      .get<{ text: string; page_image: string; num_pages: number }>('/api/get-page', {
        params: {
          text: text,
          pageNumber: 0,
        },
      })
      .subscribe({
        next: (res) => {
          // Save the image data exactly as it comes from Flask
          this.fetchedImage.set(res.page_image);
        },
        error: (err) => console.error('Failed to load page:', err),
      });
  }
}
