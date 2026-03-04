import { Component, input } from '@angular/core';

@Component({
  selector: 'app-output',
  template: `<div class="flex-1">
    <div class="w-full">
      <div class="uppercase text-2xl">Handwriting</div>
      <div class="aspect-[100/141] border-black border-2">
        @if (imageUrl() === null) {
          <div
            class="
            text-[1rem] text-gray-500 
            px-[0.5em] py-[0.5em] 
            bg-gray-100 h-full
            "
          >
            nothing to show here yet
          </div>
        } @else {
          <img [src]="imageUrl()" class="object-cover w-full h-full" />
        }
      </div>
    </div>
  </div>`,
})
export class Output {
  imageUrl = input<string | null>(null);
}
