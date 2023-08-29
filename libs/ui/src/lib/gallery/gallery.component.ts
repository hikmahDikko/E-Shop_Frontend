import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ui-gallery',
  templateUrl: './gallery.component.html'
})
export class GalleryComponent implements OnInit {
  @Input() images! : string[];
  selectedImageUrl!: string;
  
  ngOnInit(): void {
    console.log(this.images.length);
    if(this.images.length){
      this.selectedImageUrl = this.images[0];
    }
  }

  changeSelectedImage(imageUrl : string) {
    this.selectedImageUrl = imageUrl
  }

  get hasImage() {
    return this.images?.length > 0
  }
}
