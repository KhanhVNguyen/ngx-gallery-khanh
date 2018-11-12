import { Component, OnInit, Input } from '@angular/core';

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
