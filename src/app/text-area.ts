import { Component, output } from '@angular/core';

@Component({
  selector: 'text-area',
  standalone: true,
  template: `
    <div class="flex-1">
      <div class="uppercase text-2xl">Text</div>
      <div class="flex">
        <textarea
          class="
        w-full aspect-[100/141]
        text-[1rem]
        outline-none
        resize-none
        px-[0.2em] py-[0.5em]
        bg-orange-50
        border-solid border-[2px] border-black
        hover:border-[3px] hover:border-[#ffda9e]
        focus:border-[3px] focus:border-[#fac36c]
        "
          placeholder="Start typing here..."
          (input)="onInput($event)"
        ></textarea>
      </div>
    </div>
  `,
})
export class TextArea {
  textChange = output<string>();
  onInput(event: Event) {
    const newText = (event.target as HTMLTextAreaElement).value;
    this.textChange.emit(newText);
  }
}
