import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
    selector: 'img-view',
    templateUrl: './img-view.component.html',
    styleUrls: ['./img-view.component.scss']
})
export class ImgViewComponent implements OnInit {
    @Input() src: string = '';
    @Input() linkTo: string = `['/']`;
    @Input() clickable: boolean = false;
    @Input() contain: boolean = false;
    @ViewChild('image') img: ElementRef;
    error: boolean = false;

    isVideo: boolean = false;
    type: string = 'video/mp4';
    supported = ['mp4', 'webm', 'ogg'];
    constructor() { }

    ngOnInit() {
        let cloneSrc = this.src + '';
        if (this.checkVideo(cloneSrc)) {
            this.isVideo = true;
        }
    }
    success() {
        let n_width = this.img.nativeElement.naturalWidth;
        let n_height = this.img.nativeElement.naturalHeight;
        let ratio = n_width / n_height;
        if (ratio > 1.42) {
            this.contain = false;
        } else {
            this.contain = true;
        }
    }

    checkVideo(image) {
        let type = image.substring(image.lastIndexOf('.') + 1, image.length);
        return this.checkMatch(type, this.supported);
    }

    checkMatch(src: string, supported: Array<string>): boolean {
        let filters = supported.filter(support => src.toLowerCase() === support);
        if (filters.length > 0) {
            this.type = `video/${filters[0]}`;
            return true;
        }
        return false;
    }
}
