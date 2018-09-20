import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostBinding, HostListener, Injectable, Input, NgModule, Output, Renderer, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, HAMMER_GESTURE_CONFIG, HammerGestureConfig } from '@angular/platform-browser';

var NgxGalleryActionComponent = /** @class */ (function () {
    function NgxGalleryActionComponent() {
        this.disabled = false;
        this.titleText = '';
        this.onClick = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    NgxGalleryActionComponent.prototype.handleClick = function (event) {
        if (!this.disabled) {
            this.onClick.emit(event);
        }
        event.stopPropagation();
        event.preventDefault();
    };
    NgxGalleryActionComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-gallery-action',
                    template: "\n        <div class=\"ngx-gallery-icon\" [class.ngx-gallery-icon-disabled]=\"disabled\"\n            aria-hidden=\"true\"\n            title=\"{{ titleText }}\"\n            (click)=\"handleClick($event)\">\n                <i class=\"ngx-gallery-icon-content {{ icon }}\"></i>\n        </div>",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryActionComponent.ctorParameters = function () { return []; };
    NgxGalleryActionComponent.propDecorators = {
        'icon': [{ type: Input },],
        'disabled': [{ type: Input },],
        'titleText': [{ type: Input },],
        'onClick': [{ type: Output },],
    };
    return NgxGalleryActionComponent;
}());

var NgxGalleryArrowsComponent = /** @class */ (function () {
    function NgxGalleryArrowsComponent() {
        this.onPrevClick = new EventEmitter();
        this.onNextClick = new EventEmitter();
    }
    /**
     * @return {?}
     */
    NgxGalleryArrowsComponent.prototype.handlePrevClick = function () {
        this.onPrevClick.emit();
    };
    /**
     * @return {?}
     */
    NgxGalleryArrowsComponent.prototype.handleNextClick = function () {
        this.onNextClick.emit();
    };
    NgxGalleryArrowsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-gallery-arrows',
                    template: "\n        <div class=\"ngx-gallery-arrow-wrapper ngx-gallery-arrow-left\">\n            <div class=\"ngx-gallery-icon ngx-gallery-arrow\" aria-hidden=\"true\" (click)=\"handlePrevClick()\" [class.ngx-gallery-disabled]=\"prevDisabled\">\n                <i class=\"ngx-gallery-icon-content {{arrowPrevIcon}}\"></i>\n            </div>\n        </div>\n        <div class=\"ngx-gallery-arrow-wrapper ngx-gallery-arrow-right\">\n            <div class=\"ngx-gallery-icon ngx-gallery-arrow\" aria-hidden=\"true\" (click)=\"handleNextClick()\" [class.ngx-gallery-disabled]=\"nextDisabled\">\n                <i class=\"ngx-gallery-icon-content {{arrowNextIcon}}\"></i>\n            </div>\n        </div>\n    ",
                    styles: [".ngx-gallery-arrow-wrapper { position: absolute; height: 100%; width: 1px; display: table; z-index: 2000; table-layout: fixed; } .ngx-gallery-arrow-left { left: 0px; } .ngx-gallery-arrow-right { right: 0px; } .ngx-gallery-arrow { top: 50%; transform: translateY(-50%); cursor: pointer; } .ngx-gallery-arrow.ngx-gallery-disabled { opacity: 0.6; cursor: default; } .ngx-gallery-arrow-left .ngx-gallery-arrow { left: 10px; } .ngx-gallery-arrow-right .ngx-gallery-arrow { right: 10px; } "]
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryArrowsComponent.ctorParameters = function () { return []; };
    NgxGalleryArrowsComponent.propDecorators = {
        'prevDisabled': [{ type: Input },],
        'nextDisabled': [{ type: Input },],
        'arrowPrevIcon': [{ type: Input },],
        'arrowNextIcon': [{ type: Input },],
        'onPrevClick': [{ type: Output },],
        'onNextClick': [{ type: Output },],
    };
    return NgxGalleryArrowsComponent;
}());

var NgxGalleryHelperService = /** @class */ (function () {
    /**
     * @param {?} renderer
     */
    function NgxGalleryHelperService(renderer) {
        this.renderer = renderer;
        this.swipeHandlers = new Map();
    }
    /**
     * @param {?} status
     * @param {?} element
     * @param {?} id
     * @param {?} nextHandler
     * @param {?} prevHandler
     * @return {?}
     */
    NgxGalleryHelperService.prototype.manageSwipe = function (status, element, id, nextHandler, prevHandler) {
        var /** @type {?} */ handlers = this.getSwipeHandlers(id);
        // swipeleft and swiperight are available only if hammerjs is included
        try {
            if (status && !handlers) {
                this.swipeHandlers.set(id, [
                    this.renderer.listen(element.nativeElement, 'swipeleft', function () { return nextHandler(); }),
                    this.renderer.listen(element.nativeElement, 'swiperight', function () { return prevHandler(); })
                ]);
            }
            else if (!status && handlers) {
                handlers.map(function (handler) { return handler(); });
                this.removeSwipeHandlers(id);
            }
        }
        catch (e) { }
    };
    /**
     * @param {?} url
     * @return {?}
     */
    NgxGalleryHelperService.prototype.validateUrl = function (url) {
        if (url.replace) {
            return url.replace(new RegExp(' ', 'g'), '%20');
        }
        else {
            return url;
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxGalleryHelperService.prototype.getBackgroundUrl = function (image) {
        return 'url(\'' + this.validateUrl(image) + '\')';
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NgxGalleryHelperService.prototype.getSwipeHandlers = function (id) {
        return this.swipeHandlers.get(id);
    };
    /**
     * @param {?} id
     * @return {?}
     */
    NgxGalleryHelperService.prototype.removeSwipeHandlers = function (id) {
        this.swipeHandlers.delete(id);
    };
    NgxGalleryHelperService.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryHelperService.ctorParameters = function () { return [
        { type: Renderer, },
    ]; };
    return NgxGalleryHelperService;
}());

var NgxGalleryAnimation = /** @class */ (function () {
    function NgxGalleryAnimation() {
    }
    NgxGalleryAnimation.Fade = 'fade';
    NgxGalleryAnimation.Slide = 'slide';
    NgxGalleryAnimation.Rotate = 'rotate';
    NgxGalleryAnimation.Zoom = 'zoom';
    return NgxGalleryAnimation;
}());

var NgxGalleryImageComponent = /** @class */ (function () {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     */
    function NgxGalleryImageComponent(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.onClick = new EventEmitter();
        this.onActiveChange = new EventEmitter();
        this.canChangeImage = true;
    }
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.ngOnInit = function () {
        if (this.arrows && this.arrowsAutoHide) {
            this.arrows = false;
        }
        if (this.autoPlay) {
            this.startAutoPlay();
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'image', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.onMouseEnter = function () {
        if (this.arrowsAutoHide && !this.arrows) {
            this.arrows = true;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.onMouseLeave = function () {
        if (this.arrowsAutoHide && this.arrows) {
            this.arrows = false;
        }
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.reset = function (index) {
        this.selectedIndex = index;
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.getImages = function () {
        if (this.lazyLoading) {
            var /** @type {?} */ indexes_1 = [this.selectedIndex];
            var /** @type {?} */ prevIndex = this.selectedIndex - 1;
            if (prevIndex === -1 && this.infinityMove) {
                indexes_1.push(this.images.length - 1);
            }
            else if (prevIndex >= 0) {
                indexes_1.push(prevIndex);
            }
            var /** @type {?} */ nextIndex = this.selectedIndex + 1;
            if (nextIndex == this.images.length && this.infinityMove) {
                indexes_1.push(0);
            }
            else if (nextIndex < this.images.length) {
                indexes_1.push(nextIndex);
            }
            return this.images.filter(function (img, i) { return indexes_1.indexOf(i) != -1; });
        }
        else {
            return this.images;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.startAutoPlay = function () {
        var _this = this;
        this.stopAutoPlay();
        this.timer = setInterval(function () {
            if (!_this.showNext()) {
                _this.selectedIndex = -1;
                _this.showNext();
            }
        }, this.autoPlayInterval);
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.stopAutoPlay = function () {
        if (this.timer) {
            clearInterval(this.timer);
        }
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.handleClick = function (event, index) {
        if (this.clickable) {
            this.onClick.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.showNext = function () {
        if (this.canShowNext() && this.canChangeImage) {
            this.selectedIndex++;
            if (this.selectedIndex === this.images.length) {
                this.selectedIndex = 0;
            }
            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.showPrev = function () {
        if (this.canShowPrev() && this.canChangeImage) {
            this.selectedIndex--;
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.images.length - 1;
            }
            this.onActiveChange.emit(this.selectedIndex);
            this.setChangeTimeout();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.setChangeTimeout = function () {
        var _this = this;
        this.canChangeImage = false;
        var /** @type {?} */ timeout = 1000;
        if (this.animation === NgxGalleryAnimation.Slide
            || this.animation === NgxGalleryAnimation.Fade) {
            timeout = 500;
        }
        setTimeout(function () {
            _this.canChangeImage = true;
        }, timeout);
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.canShowNext = function () {
        if (this.images) {
            return this.infinityMove || this.selectedIndex < this.images.length - 1
                ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.canShowPrev = function () {
        if (this.images) {
            return this.infinityMove || this.selectedIndex > 0 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxGalleryImageComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    NgxGalleryImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-gallery-image',
                    template: "\n        <div class=\"ngx-gallery-image-wrapper ngx-gallery-animation-{{animation}} ngx-gallery-image-size-{{size}}\">\n            <div class=\"ngx-gallery-image\" *ngFor=\"let image of getImages(); let i = index;\" [ngClass]=\"{ 'ngx-gallery-active': selectedIndex == image.index, 'ngx-gallery-inactive-left': selectedIndex > image.index, 'ngx-gallery-inactive-right': selectedIndex < image.index, 'ngx-gallery-clickable': clickable }\"  [style.background-image]=\"image?.type ? '' : getSafeUrl(image)\" (click)=\"handleClick($event, image.index)\">\n                <video *ngIf=\"image?.type\" preload=\"false\" controls style=\"width: 100%\">\n                    <source [src]=\"image.src\" type=\"video/mp4\">\n                </video>    \n                <div class=\"ngx-gallery-icons-wrapper\">\n                    <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, image.index)\"></ngx-gallery-action>\n                </div>\n                <div class=\"ngx-gallery-image-text\" *ngIf=\"showDescription && descriptions[image.index]\" [innerHTML]=\"descriptions[image.index]\"></div>\n            </div>\n        </div>\n        <ngx-gallery-arrows class=\"ngx-gallery-image-size-{{size}}\" *ngIf=\"arrows\" (onPrevClick)=\"showPrev()\" (onNextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n    ",
                    styles: [":host { width: 100%; display: inline-block; position: relative; } .ngx-gallery-image-wrapper { width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; overflow: hidden; } .ngx-gallery-image { background-position: center; background-repeat: no-repeat; height: 100%; width: 100%; top: 0px; } .ngx-gallery-image.ngx-gallery-active { z-index: 1000; } .ngx-gallery-image-size-cover .ngx-gallery-image { background-size: cover; } .ngx-gallery-image-size-contain .ngx-gallery-image { background-size: contain; } .ngx-gallery-animation-fade .ngx-gallery-image { left: 0px; opacity: 0; transition: 0.5s ease-in-out; } .ngx-gallery-animation-fade .ngx-gallery-image.ngx-gallery-active { opacity: 1; } .ngx-gallery-animation-slide .ngx-gallery-image { transition: 0.5s ease-in-out; } .ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-active { left: 0px; } .ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-left { left: -100%; } .ngx-gallery-animation-slide .ngx-gallery-image.ngx-gallery-inactive-right { left: 100%; } .ngx-gallery-animation-rotate .ngx-gallery-image { transition: 1s ease; transform: scale(3.5, 3.5) rotate(90deg); left: 0px; opacity: 0; } .ngx-gallery-animation-rotate .ngx-gallery-image.ngx-gallery-active { transform: scale(1, 1) rotate(0deg); opacity: 1; } .ngx-gallery-animation-zoom .ngx-gallery-image { transition: 1s ease; transform: scale(2.5, 2.5); left: 0px; opacity: 0; } .ngx-gallery-animation-zoom .ngx-gallery-image.ngx-gallery-active { transform: scale(1, 1); opacity: 1; } .ngx-gallery-image-text { width: 100%; background: rgba(0, 0, 0, 0.7); padding: 10px; text-align: center; color: white; font-size: 16px; position: absolute; bottom: 0px; z-index: 10; } "]
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryImageComponent.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
        { type: NgxGalleryHelperService, },
    ]; };
    NgxGalleryImageComponent.propDecorators = {
        'images': [{ type: Input },],
        'clickable': [{ type: Input },],
        'selectedIndex': [{ type: Input },],
        'arrows': [{ type: Input },],
        'arrowsAutoHide': [{ type: Input },],
        'swipe': [{ type: Input },],
        'animation': [{ type: Input },],
        'size': [{ type: Input },],
        'arrowPrevIcon': [{ type: Input },],
        'arrowNextIcon': [{ type: Input },],
        'autoPlay': [{ type: Input },],
        'autoPlayInterval': [{ type: Input },],
        'autoPlayPauseOnHover': [{ type: Input },],
        'infinityMove': [{ type: Input },],
        'lazyLoading': [{ type: Input },],
        'actions': [{ type: Input },],
        'descriptions': [{ type: Input },],
        'showDescription': [{ type: Input },],
        'onClick': [{ type: Output },],
        'onActiveChange': [{ type: Output },],
        'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
        'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
    };
    return NgxGalleryImageComponent;
}());

var NgxGalleryOrder = /** @class */ (function () {
    function NgxGalleryOrder() {
    }
    NgxGalleryOrder.Column = 1;
    NgxGalleryOrder.Row = 2;
    return NgxGalleryOrder;
}());

var NgxGalleryThumbnailsComponent = /** @class */ (function () {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     */
    function NgxGalleryThumbnailsComponent(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.minStopIndex = 0;
        this.onActiveChange = new EventEmitter();
        this.index = 0;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['selectedIndex']) {
            this.validateIndex();
        }
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', function () { return _this.moveRight(); }, function () { return _this.moveLeft(); });
        }
        if (this.images) {
            this.remainingCountValue = this.images.length - (this.rows * this.columns);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.onMouseEnter = function () {
        this.mouseenter = true;
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.onMouseLeave = function () {
        this.mouseenter = false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.reset = function (index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getImages = function () {
        if (this.remainingCount) {
            return this.images.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order != NgxGalleryOrder.Row) {
            var /** @type {?} */ stopIndex = this.index + this.columns + this.moveSize;
            if (this.rows > 1 && this.order === NgxGalleryOrder.Column) {
                stopIndex = stopIndex * this.rows;
            }
            if (stopIndex <= this.minStopIndex) {
                stopIndex = this.minStopIndex;
            }
            else {
                this.minStopIndex = stopIndex;
            }
            return this.images.slice(0, stopIndex);
        }
        else {
            return this.images;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getImages2 = function () {
        var /** @type {?} */ imgs = this.getImages();
        this.firstImg = imgs[0];
        return imgs.slice(1);
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.handleClick = function (event, index) {
        if (!this.hasLinks()) {
            this.selectedIndex = index;
            this.onActiveChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.hasLinks = function () {
        if (this.links && this.links.length)
            return true;
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.moveRight = function () {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            var /** @type {?} */ maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.moveLeft = function () {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.canMoveRight = function () {
        return this.index + this.columns < this.getMaxIndex() ? true : false;
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.canMoveLeft = function () {
        return this.index !== 0 ? true : false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getThumbnailLeft = function (index) {
        var /** @type {?} */ calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = Math.floor(index / this.rows);
        }
        else {
            calculatedIndex = index % Math.ceil(this.images.length / this.rows);
        }
        return this.getThumbnailPosition(calculatedIndex, this.columns);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getThumbnailTop = function (index) {
        var /** @type {?} */ calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = index % this.rows;
        }
        else {
            calculatedIndex = Math.floor(index / Math.ceil(this.images.length / this.rows));
        }
        return this.getThumbnailPosition(calculatedIndex, this.rows);
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getThumbnailWidth = function () {
        return this.getThumbnailDimension(this.columns);
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getThumbnailHeight = function () {
        return this.getThumbnailDimension(this.rows);
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.setThumbnailsPosition = function () {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.setDefaultPosition = function () {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.canShowArrows = function () {
        if (this.remainingCount) {
            return false;
        }
        else if (this.arrows && this.images && this.images.length > this.getVisibleCount()
            && (!this.arrowsAutoHide || this.mouseenter)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.validateIndex = function () {
        var /** @type {?} */ newIndex;
        if (this.order === NgxGalleryOrder.Column) {
            newIndex = Math.floor(this.selectedIndex / this.rows);
        }
        else {
            newIndex = this.selectedIndex % Math.ceil(this.images.length / this.rows);
        }
        if (this.remainingCount) {
            newIndex = 0;
        }
        if (newIndex < this.index || newIndex >= this.index + this.columns) {
            var /** @type {?} */ maxIndex = this.getMaxIndex() - this.columns;
            this.index = newIndex > maxIndex ? maxIndex : newIndex;
            this.setThumbnailsPosition();
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    /**
     * @param {?} index
     * @param {?} count
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getThumbnailPosition = function (index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    };
    /**
     * @param {?} count
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getThumbnailDimension = function (count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getMaxIndex = function () {
        if (this.isEven(this.images.length)) {
            return Math.ceil(this.images.length / this.rows) + (this.images.length / 4);
        }
        else {
            return Math.ceil(this.images.length / this.rows) + ((this.images.length / 4) - 1);
        }
    };
    /**
     * @param {?} n
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.isEven = function (n) {
        return n % 2 == 0;
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getVisibleCount = function () {
        return this.columns * this.rows;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxGalleryThumbnailsComponent.prototype.getSafeStyle = function (value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    };
    NgxGalleryThumbnailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-gallery-thumbnails',
                    template: "<div class=\"ngx-gallery-thumbnails-wrapper ngx-gallery-thumbnail-size-{{size}}\"> <div class=\"ngx-gallery-thumbnails ngx-gallery-thumbnails-lg\" [style.transform]=\"'translateX(' + thumbnailsLeft + ')'\" [style.marginLeft]=\"thumbnailsMarginLeft\"> <a [hidden]=\"firstImg?.type\" [href]=\"hasLinks() ? links[0] : '#'\" [target]=\"linkTarget\" class=\"ngx-gallery-thumbnail\" [style.background-image]=\"getSafeUrl(firstImg)\" (click)=\"handleClick($event, 0)\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\" [style.left]=\"getThumbnailLeft(0)\" [style.top]=\"getThumbnailTop(0)\" [ngClass]=\"{ 'ngx-gallery-active': 0 == selectedIndex, 'ngx-gallery-clickable': clickable }\" [attr.aria-label]=\"labels[0]\"> <div class=\"ngx-gallery-icons-wrapper\"> <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, 0)\"></ngx-gallery-action> </div> <div class=\"ngx-gallery-remaining-count-overlay\" *ngIf=\"remainingCount && remainingCountValue && (0 == (rows * columns) - 1)\"> <span class=\"ngx-gallery-remaining-count\">+{{remainingCountValue}}</span> </div> </a> <a [hidden]=\"!firstImg?.type\" (click)=\"handleClick($event, 0)\" [href]=\"hasLinks() ? links[0] : '#'\" [target]=\"linkTarget\" class=\"ngx-gallery-thumbnail\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\" [style.left]=\"getThumbnailLeft(0)\" [style.top]=\"getThumbnailTop(0)\" [ngClass]=\"{ 'ngx-gallery-active': 0 == selectedIndex, 'ngx-gallery-clickable': clickable }\" [attr.aria-label]=\"labels[0]\"> <video #media id=\"singleVideo\" preload=\"false\" controls style=\"width: 100%\"> <source [src]=\"firstImg.src\" type=\"video/mp4\"> </video> </a> </div> <div class=\"ngx-gallery-thumbnails ngx-gallery-thumbnails-sm\" [style.transform]=\"'translateX(' + thumbnailsLeft + ')'\" [style.marginLeft]=\"thumbnailsMarginLeft\"> <a [href]=\"hasLinks() ? links[i] : '#'\" [target]=\"linkTarget\" class=\"ngx-gallery-thumbnail\" *ngFor=\"let image of getImages2(); let i = index;\" [style.background-image]=\"image?.type ? '' : getSafeUrl(image)\" (click)=\"handleClick($event, i+1)\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\" [style.left]=\"getThumbnailLeft(i)\" [style.top]=\"getThumbnailTop(i)\" [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\" [attr.aria-label]=\"labels[i]\"> <video *ngIf=\"image?.type\" preload=\"false\" controls style=\"width: 100%\"> <source [src]=\"image.src\" type=\"video/mp4\"> </video> <div class=\"ngx-gallery-icons-wrapper\"> <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, i)\"></ngx-gallery-action> </div> <div class=\"ngx-gallery-remaining-count-overlay\" *ngIf=\"remainingCount && remainingCountValue && (i == (rows * columns) - 1)\"> <span class=\"ngx-gallery-remaining-count\">+{{remainingCountValue}}</span> </div> </a> </div> </div> <ngx-gallery-arrows *ngIf=\"canShowArrows()\" (onPrevClick)=\"moveLeft()\" (onNextClick)=\"moveRight()\" [prevDisabled]=\"!canMoveLeft()\" [nextDisabled]=\"!canMoveRight()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows> ",
                    styles: [":host { width: 100%; display: inline-block; position: relative; } .ngx-gallery-thumbnails-wrapper { width: 100%; height: 100%; position: absolute; overflow: hidden; } .ngx-gallery-thumbnails { height: 100%; width: 100%; position: absolute; left: 0px; transform: translateX(0); transition: transform 0.5s ease-in-out; will-change: transform; } .ngx-gallery-thumbnails .ngx-gallery-thumbnail { position: absolute; height: 100%; background-position: center; background-repeat: no-repeat; text-decoration: none; } .ngx-gallery-thumbnail-size-cover .ngx-gallery-thumbnails .ngx-gallery-thumbnail { background-size: cover; } .ngx-gallery-thumbnail-size-contain .ngx-gallery-thumbnails .ngx-gallery-thumbnail { background-size: contain; } .ngx-gallery-remaining-count-overlay { width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; background-color: rgba(0, 0, 0, 0.4); } .ngx-gallery-remaining-count { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 30px; } "]
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryThumbnailsComponent.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
        { type: NgxGalleryHelperService, },
    ]; };
    NgxGalleryThumbnailsComponent.propDecorators = {
        'images': [{ type: Input },],
        'links': [{ type: Input },],
        'labels': [{ type: Input },],
        'linkTarget': [{ type: Input },],
        'columns': [{ type: Input },],
        'rows': [{ type: Input },],
        'arrows': [{ type: Input },],
        'arrowsAutoHide': [{ type: Input },],
        'margin': [{ type: Input },],
        'selectedIndex': [{ type: Input },],
        'clickable': [{ type: Input },],
        'swipe': [{ type: Input },],
        'size': [{ type: Input },],
        'arrowPrevIcon': [{ type: Input },],
        'arrowNextIcon': [{ type: Input },],
        'moveSize': [{ type: Input },],
        'order': [{ type: Input },],
        'remainingCount': [{ type: Input },],
        'lazyLoading': [{ type: Input },],
        'actions': [{ type: Input },],
        'onActiveChange': [{ type: Output },],
        'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
        'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
    };
    return NgxGalleryThumbnailsComponent;
}());

var NgxGalleryPreviewComponent = /** @class */ (function () {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     * @param {?} renderer
     */
    function NgxGalleryPreviewComponent(sanitization, elementRef, helperService, renderer) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.renderer = renderer;
        this.showSpinner = false;
        this.positionLeft = 0;
        this.positionTop = 0;
        this.zoomValue = 1;
        this.loading = false;
        this.rotateValue = 0;
        this.index = 0;
        this.tab = 1;
        this.star = 0;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onActiveChange = new EventEmitter();
        this.isOpen = false;
        this.initialX = 0;
        this.initialY = 0;
        this.initialLeft = 0;
        this.initialTop = 0;
        this.isMove = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'preview', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.ngOnDestroy = function () {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.onKeyDown = function (e) {
        if (this.isOpen) {
            if (this.keyboardNavigation) {
                if (this.isKeyboardPrev(e)) {
                    this.showPrev();
                }
                else if (this.isKeyboardNext(e)) {
                    this.showNext();
                }
            }
            if (this.closeOnEsc && this.isKeyboardEsc(e)) {
                this.close();
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.open = function (index) {
        var _this = this;
        this.onOpen.emit();
        this.index = index;
        this.isOpen = true;
        this.show(true);
        if (this.forceFullscreen) {
            this.manageFullscreen();
        }
        this.keyDownListener = this.renderer.listenGlobal("window", "keydown", function (e) { return _this.onKeyDown(e); });
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.close = function () {
        this.isOpen = false;
        this.closeFullscreen();
        this.onClose.emit();
        this.stopAutoPlay();
        if (this.previewVideo) {
            this.previewVideo.nativeElement.pause();
        }
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.imageMouseEnter = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.imageMouseLeave = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.startAutoPlay = function () {
        var _this = this;
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.timer = setTimeout(function () {
                if (!_this.showNext()) {
                    _this.index = -1;
                    _this.showNext();
                }
            }, this.autoPlayInterval);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.stopAutoPlay = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.showNext = function () {
        if (this.canShowNext()) {
            this.index++;
            if (this.index === this.images.length) {
                this.index = 0;
            }
            this.show();
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.selectImage = function (index) {
        this.index = index;
        this.show();
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.showPrev = function () {
        if (this.canShowPrev()) {
            this.index--;
            if (this.index < 0) {
                this.index = this.images.length - 1;
            }
            this.show();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.canShowNext = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index < this.images.length - 1 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.canShowPrev = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index > 0 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.manageFullscreen = function () {
        if (this.fullscreen || this.forceFullscreen) {
            var /** @type {?} */ doc = (document);
            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            }
            else {
                this.closeFullscreen();
            }
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getSafeUrl = function (image) {
        if (image.type) {
            return {
                src: image.src,
                type: 'video'
            };
        }
        return image.substr(0, 10) === 'data:image' ?
            image : this.sanitization.bypassSecurityTrustUrl(image);
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getSafeUrl2 = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.zoomIn = function () {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;
            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.zoomOut = function () {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;
            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }
            if (this.zoomValue <= 1) {
                this.resetPosition();
            }
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.rotateLeft = function () {
        this.rotateValue -= 90;
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.rotateRight = function () {
        this.rotateValue += 90;
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getTransform = function () {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.canZoomIn = function () {
        return this.zoomValue < this.zoomMax ? true : false;
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.canZoomOut = function () {
        return this.zoomValue > this.zoomMin ? true : false;
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.canDragOnZoom = function () {
        return this.zoom && this.zoomValue > 1;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.mouseDownHandler = function (e) {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;
            e.preventDefault();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.mouseUpHandler = function (e) {
        this.isMove = false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.mouseMoveHandler = function (e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getClientX = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getClientY = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.resetPosition = function () {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.isKeyboardNext = function (e) {
        return e.keyCode === 39 ? true : false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.isKeyboardPrev = function (e) {
        return e.keyCode === 37 ? true : false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.isKeyboardEsc = function (e) {
        return e.keyCode === 27 ? true : false;
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.openFullscreen = function () {
        var /** @type {?} */ element = (document.documentElement);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.closeFullscreen = function () {
        var /** @type {?} */ doc = (document);
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        }
        else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
        else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        }
        else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        }
    };
    /**
     * @param {?=} first
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.show = function (first) {
        var _this = this;
        if (first === void 0) { first = false; }
        this.loading = true;
        this.stopAutoPlay();
        this.onActiveChange.emit(this.index);
        if (first || !this.animation) {
            this._show();
        }
        else {
            setTimeout(function () { return _this._show(); }, 600);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype._show = function () {
        var _this = this;
        this.zoomValue = 1;
        this.rotateValue = 0;
        this.resetPosition();
        this.src = this.getSafeUrl(/** @type {?} */ (this.images[this.index]));
        this.srcIndex = this.index;
        this.description = this.descriptions[this.index];
        if (this.src['type']) {
            this.loading = false;
            this.showSpinner = false;
            return;
        }
        setTimeout(function () {
            if (_this.isLoaded(_this.previewImage.nativeElement)) {
                _this.loading = false;
                _this.startAutoPlay();
            }
            else {
                setTimeout(function () {
                    if (_this.loading) {
                        _this.showSpinner = true;
                    }
                });
                _this.previewImage.nativeElement.onload = function () {
                    _this.loading = false;
                    _this.showSpinner = false;
                    _this.previewImage.nativeElement.onload = null;
                    _this.startAutoPlay();
                };
            }
        });
    };
    /**
     * @param {?} img
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.isLoaded = function (img) {
        if (!img.complete) {
            return false;
        }
        if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
            return false;
        }
        return true;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getThumbnailLeft = function (index) {
        var /** @type {?} */ calculatedIndex;
        var /** @type {?} */ rows = Math.floor(this.smallImages.length / 6);
        // if (this.order === NgxGalleryOrder.Column) {
        //     calculatedIndex = Math.floor(index / rows);
        // } else {
        calculatedIndex = index % Math.ceil(this.images.length / rows);
        // }
        return this.getThumbnailPosition(calculatedIndex, 6);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getThumbnailTop = function (index) {
        var /** @type {?} */ calculatedIndex;
        var /** @type {?} */ rows = Math.floor(this.smallImages.length / 6);
        // if (this.order === NgxGalleryOrder.Column) {
        //     calculatedIndex = index % rows;
        // } else {
        calculatedIndex = Math.floor(index / Math.ceil(this.images.length / rows));
        // }
        return this.getThumbnailPosition(calculatedIndex, rows);
    };
    /**
     * @param {?} index
     * @param {?} count
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getThumbnailPosition = function (index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((10 - (((count - 1) * 10) / count)) * index) + 'px)');
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getThumbnailWidth = function () {
        return this.getThumbnailDimension(6);
    };
    /**
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getThumbnailHeight = function () {
        return this.getThumbnailDimension(Math.floor(this.smallImages.length / 6));
    };
    /**
     * @param {?} count
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getThumbnailDimension = function (count) {
        return this.getSafeStyle('calc(' + (100 / count) + '% - '
            + (((count - 1) * 10) / count) + 'px)');
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxGalleryPreviewComponent.prototype.getSafeStyle = function (value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    };
    NgxGalleryPreviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-gallery-preview',
                    template: "<div class=\"preview\"> <ngx-gallery-arrows (onPrevClick)=\"showPrev()\" (onNextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows> <div class=\"ngx-gallery-preview-top\"> <div class=\"ngx-gallery-preview-icons\"> <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, index)\"></ngx-gallery-action> <a *ngIf=\"download && src\" [href]=\"src\" class=\"ngx-gallery-icon\" aria-hidden=\"true\" download> <i class=\"ngx-gallery-icon-content {{ downloadIcon }}\"></i> </a> <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomOutIcon\" [disabled]=\"!canZoomOut()\" (onClick)=\"zoomOut()\"></ngx-gallery-action> <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomInIcon\" [disabled]=\"!canZoomIn()\" (onClick)=\"zoomIn()\"></ngx-gallery-action> <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateLeftIcon\" (onClick)=\"rotateLeft()\"></ngx-gallery-action> <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateRightIcon\" (onClick)=\"rotateRight()\"></ngx-gallery-action> <ngx-gallery-action *ngIf=\"fullscreen\" [icon]=\"'ngx-gallery-fullscreen ' + fullscreenIcon\" (onClick)=\"manageFullscreen()\"></ngx-gallery-action> <ngx-gallery-action [icon]=\"'ngx-gallery-close ' + closeIcon\" (onClick)=\"close()\"></ngx-gallery-action> </div> </div> <div class=\"ngx-spinner-wrapper ngx-gallery-center\" [class.ngx-gallery-active]=\"showSpinner\"> <i class=\"ngx-gallery-icon ngx-gallery-spinner {{spinnerIcon}}\" aria-hidden=\"true\"></i> </div> <div class=\"ngx-gallery-preview-wrapper\" (click)=\"closeOnClick && close()\" (mouseup)=\"mouseUpHandler($event)\" (mousemove)=\"mouseMoveHandler($event)\" (touchend)=\"mouseUpHandler($event)\" (touchmove)=\"mouseMoveHandler($event)\"> <div class=\"ngx-gallery-preview-img-wrapper\"> <div class=\"ngx-gallery-preview-agent-navbar\"> <ul *ngIf=\"!isProject\" class=\"ngx-gallery-preview-agent-info\"> <li class=\"ngx-gallery-preview-nav-item\"> <img *ngIf=\"src\" class=\"ngx-gallery-preview-company-avatar\" [src]=\"src\" alt=\"\" style=\"width: 70px; height:70px\"> <span class=\"ngx-gallery-preview-company-name\">MEKONG REALITY</span> </li> <li class=\"ngx-gallery-preview-nav-item agent-info\"> <div class=\"agent-avatar-bg\"> <p class=\"agent-name\">Hoang Phi Yen</p> <p class=\"agent-position\">Independent agent</p> </div> </li> <li class=\"ngx-gallery-preview-nav-item\"> <button class=\"btn btn-primary btn-call\">Call</button> <button class=\"btn btn-primary btn-message\">Message</button> </li> </ul> <div *ngIf=\"isProject\" class=\"ngx-gallery-preview-project\"> <div class=\"row pt-3\"> <div class=\"col-md-6\"></div> <div class=\"col-md-6\"> <div class=\"row\"> <div class=\"col-md-1\"></div> <div class=\"col-md-3\"> <button class=\"btn btn-primary\">Listing for sale</button> </div> <div class=\"col-md-3\"> <button class=\"btn btn-primary\">Listing for rent</button> </div> <div class=\"border-right\"></div> <div class=\"col-md-2\"> <form class=\"rating\"> <label> <input type=\"radio\" name=\"stars\" value=\"1\" (click)=\"setStar(1)\" [checked]=\"star == 1\" [disabled]=\"!editable\" /> <i class=\"far fa-star\"></i> </label> <label> <input type=\"radio\" name=\"stars\" value=\"2\" (click)=\"setStar(2)\" [checked]=\"star == 2\" [disabled]=\"!editable\" /> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> </label> <label> <input type=\"radio\" name=\"stars\" value=\"3\" (click)=\"setStar(3)\" [checked]=\"star == 3\" [disabled]=\"!editable\" /> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> </label> <label> <input type=\"radio\" name=\"stars\" value=\"4\" (click)=\"setStar(4)\" [checked]=\"star == 4\" [disabled]=\"!editable\" /> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> </label> <label> <input type=\"radio\" name=\"stars\" value=\"5\" (click)=\"setStar(5)\" [checked]=\"star >= 5\" [disabled]=\"!editable\" /> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> <i class=\"far fa-star\"></i> </label> </form> <p class=\"\">From 12 views</p> </div> </div> </div> </div> <div class=\"dropdown-divider\"></div> </div> </div> <div class=\"ngx-gallery-preview-image\"> <video #previewVideo *ngIf=\"src?.type\" preload=\"auto\" controls style=\"height: 500px\"> <source [src]=\"src?.src\" type=\"video/mp4\"> </video> <img *ngIf=\"src && !src?.type\" #previewImage class=\"ngx-gallery-preview-img ngx-gallery-center\" [src]=\"src\" style=\"width: 800px; height: 500px;\" (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\" (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\" [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\" /> </div> <div class=\"ngx-gallery-preview-tab\"> <div class=\"ngx-gallery-preview-menu\"> <ul class=\"ngx-gallery-preview-menu-navbar\"> <li [class.active]=\"tab == 1\" (click)=\"tab = 1\"> <span>All (30)</span> </li> <li [class.active]=\"tab == 2\" (click)=\"tab = 2\"> <span>Rooms (10)</span> </li> <li [class.active]=\"tab == 3\" (click)=\"tab = 3\"> <span>Property view (5)</span> </li> <li [class.active]=\"tab == 4\" (click)=\"tab = 4\"> <span>Facilities (5)</span> </li> <li [class.active]=\"tab == 5\" (click)=\"tab = 5\"> <span>Dining (5)</span> </li> <li [class.active]=\"tab == 6\" (click)=\"tab = 6\"> <span>Other (5)</span> </li> </ul> </div> <div class=\"ngx-gallery-preview-img-list\"> <div class=\"row\"> <div class=\"col-3 col-md-1 col-sm-2 img-item\" *ngFor=\"let image of smallImages; let i = index;\" [class.active]=\"i == index\" (click)=\"selectImage(i)\"> <div *ngIf=\"image.type\" class=\"img-thumnails\"> <video preload=\"false\" style=\"width: 100%\" muted (click)=\"selectImage(i)\"> <source [src]=\"image.src\" type=\"video/mp4\"> </video> </div> <div *ngIf=\"!image.type\" class=\"img-thumnails\" [style.background-image]=\"getSafeUrl2(image)\"> </div> </div> </div> </div> </div> </div> <div class=\"ngx-gallery-preview-text\" *ngIf=\"showDescription && description\" [innerHTML]=\"description\"></div> </div> </div> ",
                    styles: [":host(.ngx-gallery-active) { width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: rgba(0, 0, 0, 0.7); z-index: 10000; display: inline-block; } :host { display: none; } :host /deep/ .ngx-gallery-arrow { font-size: 50px; } .ngx-gallery-preview-img { opacity: 0; max-width: 72%; max-height: 80%; top: 5.8rem !important; user-select: none; transition: transform .5s; } .ngx-gallery-preview-img.animation { transition: opacity 0.5s linear, transform .5s; } .ngx-gallery-preview-img.ngx-gallery-active { opacity: 1; } .ngx-gallery-preview-img.ngx-gallery-grab { cursor: grab; cursor: -webkit-grab; } .ngx-gallery-icon.ngx-gallery-spinner { font-size: 50px; left: 0; display: inline-block; } :host /deep/ .ngx-gallery-preview-top { position: absolute; width: 100%; user-select: none; } :host /deep/ .ngx-gallery-preview-icons { float: right; } :host /deep/ .ngx-gallery-preview-icons .ngx-gallery-icon { position: relative; margin-right: 10px; margin-top: 10px; font-size: 25px; cursor: pointer; text-decoration: none; } :host /deep/ .ngx-gallery-preview-icons .ngx-gallery-icon.ngx-gallery-icon-disabled { cursor: default; opacity: 0.4; } .ngx-spinner-wrapper { width: 50px; height: 50px; display: none; } .ngx-spinner-wrapper.ngx-gallery-active { display: inline-block; } .ngx-gallery-center { left: 0; right: 0; bottom: 0; margin: auto; top: 0; } .ngx-gallery-preview-text { width: 100%; background: rgba(0, 0, 0, 0.7); padding: 10px; text-align: center; color: white; font-size: 16px; flex: 0 1 auto; z-index: 10; } ngx-gallery-preview ngx-gallery-arrows .ngx-gallery-arrow-wrapper .ngx-gallery-icon { background-color: transparent !important; } .ngx-gallery-preview-wrapper { width: 100%; height: 100%; display: flex; flex-flow: column; overflow: scroll; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper { flex: 1 1 auto; position: relative; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-image { position: relative; text-align: center; padding-top: 15px; padding-bottom: 40px; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-menu { text-align: center; padding-bottom: 10px; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-menu .ngx-gallery-preview-menu-navbar { color: white; display: inline-flex; list-style-type: none; border-bottom: 1px solid #ffffff; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-menu .ngx-gallery-preview-menu-navbar .active { border-bottom: 2px solid #e4375c; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-menu .ngx-gallery-preview-menu-navbar li { padding: 0px 25px 25px 25px; display: inline-block; margin: 0 auto; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-img-list .row { padding-left: 7em; padding-right: 7em; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-img-list .img-item { width: 100%; height: 100%; background-repeat: no-repeat; padding: 5px; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-img-list .img-item.active { border: 1px solid #e75474; opacity: 1; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-tab .ngx-gallery-preview-img-list .img-item .img-thumnails { background-size: cover; width: 100%; height: 110px; opacity: 0.9; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-navbar { text-align: center; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-project .col-md-2 { flex: 0 0 20% !important; max-width: 20% !important; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-project p { color: #ffffff; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-project .btn { width: 140px !important; border-radius: 0 !important; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-info { display: inline-flex; border-bottom: 1px solid white; padding-top: 15px; padding-bottom: 15px; list-style-type: none; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-info .ngx-gallery-preview-nav-item .ngx-gallery-preview-company-name { color: white; padding-left: 10px; font-weight: 700; font-size: 18px; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-info .ngx-gallery-preview-nav-item.agent-info { padding-left: 250px; padding-right: 250px; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-info .ngx-gallery-preview-nav-item .agent-avatar-bg { background-image: url(/assets/images/user.png); background-repeat: no-repeat; padding-left: 70px; height: 100%; text-align: left; color: white; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-info .ngx-gallery-preview-nav-item .agent-avatar-bg .agent-name { font-size: 22px; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-info .ngx-gallery-preview-nav-item .agent-avatar-bg .agent-position { font-size: 12px; } .ngx-gallery-preview-wrapper .ngx-gallery-preview-img-wrapper .ngx-gallery-preview-agent-info .ngx-gallery-preview-nav-item .btn-call { margin-right: 15px; } @media (min-width: 768px) { .col-md-1 { flex: 0 0 10%; max-width: 10%; } } .rating { display: inline-block; position: relative; height: 30px; font-size: 14px; margin-right: 10px; } .rating label { position: absolute; top: 0; left: 0; height: 100%; cursor: pointer; } .rating label:last-child { position: static; } .rating label:nth-child(1) { z-index: 5; } .rating label:nth-child(2) { z-index: 4; } .rating label:nth-child(3) { z-index: 3; } .rating label:nth-child(4) { z-index: 2; } .rating label:nth-child(5) { z-index: 1; } .rating label input { position: absolute; top: 0; left: 0; opacity: 0; } .rating label .icon { float: left; color: transparent; } .rating label .far { color: #3acaaa; } .rating:not(:hover) label input:checked ~ .far, .rating:hover label:hover input ~ .far { font-weight: 900; color: #3acaaa; } .rating label input:focus:not(:checked) ~ .far:last-child { color: #3acaaa; text-shadow: 0 0 5px #3acaaa; } .preview ngx-gallery-arrows .ngx-gallery-arrow-left { margin-left: 3em; } .preview ngx-gallery-arrows .ngx-gallery-arrow-right { margin-right: em; } "]
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryPreviewComponent.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
        { type: NgxGalleryHelperService, },
        { type: Renderer, },
    ]; };
    NgxGalleryPreviewComponent.propDecorators = {
        'star': [{ type: Input },],
        'isProject': [{ type: Input },],
        'images': [{ type: Input },],
        'smallImages': [{ type: Input },],
        'descriptions': [{ type: Input },],
        'showDescription': [{ type: Input },],
        'swipe': [{ type: Input },],
        'fullscreen': [{ type: Input },],
        'forceFullscreen': [{ type: Input },],
        'closeOnClick': [{ type: Input },],
        'closeOnEsc': [{ type: Input },],
        'keyboardNavigation': [{ type: Input },],
        'arrowPrevIcon': [{ type: Input },],
        'arrowNextIcon': [{ type: Input },],
        'closeIcon': [{ type: Input },],
        'fullscreenIcon': [{ type: Input },],
        'spinnerIcon': [{ type: Input },],
        'autoPlay': [{ type: Input },],
        'autoPlayInterval': [{ type: Input },],
        'autoPlayPauseOnHover': [{ type: Input },],
        'infinityMove': [{ type: Input },],
        'zoom': [{ type: Input },],
        'zoomStep': [{ type: Input },],
        'zoomMax': [{ type: Input },],
        'zoomMin': [{ type: Input },],
        'zoomInIcon': [{ type: Input },],
        'zoomOutIcon': [{ type: Input },],
        'animation': [{ type: Input },],
        'actions': [{ type: Input },],
        'rotate': [{ type: Input },],
        'rotateLeftIcon': [{ type: Input },],
        'rotateRightIcon': [{ type: Input },],
        'download': [{ type: Input },],
        'downloadIcon': [{ type: Input },],
        'onOpen': [{ type: Output },],
        'onClose': [{ type: Output },],
        'onActiveChange': [{ type: Output },],
        'previewImage': [{ type: ViewChild, args: ['previewImage',] },],
        'previewVideo': [{ type: ViewChild, args: ['previewVideo',] },],
    };
    return NgxGalleryPreviewComponent;
}());

var NgxGalleryImageSize = /** @class */ (function () {
    function NgxGalleryImageSize() {
    }
    NgxGalleryImageSize.Cover = 'cover';
    NgxGalleryImageSize.Contain = 'contain';
    return NgxGalleryImageSize;
}());

var NgxGalleryLayout = /** @class */ (function () {
    function NgxGalleryLayout() {
    }
    NgxGalleryLayout.ThumbnailsTop = 'thumbnails-top';
    NgxGalleryLayout.ThumbnailsBottom = 'thumbnails-bottom';
    return NgxGalleryLayout;
}());

var NgxGalleryAction = /** @class */ (function () {
    /**
     * @param {?} action
     */
    function NgxGalleryAction(action) {
        this.icon = action.icon;
        this.disabled = action.disabled ? action.disabled : false;
        this.titleText = action.titleText ? action.titleText : '';
        this.onClick = action.onClick;
    }
    return NgxGalleryAction;
}());

var NgxGalleryOptions = /** @class */ (function () {
    /**
     * @param {?} obj
     */
    function NgxGalleryOptions(obj) {
        var preventDefaults = obj.breakpoint === undefined ? false : true;
        function use(source, defaultValue) {
            return obj && (source !== undefined || preventDefaults) ? source : defaultValue;
        }
        this.breakpoint = use(obj.breakpoint, undefined);
        this.width = use(obj.width, '500px');
        this.height = use(obj.height, '400px');
        this.fullWidth = use(obj.fullWidth, false);
        this.layout = use(obj.layout, NgxGalleryLayout.ThumbnailsBottom);
        this.startIndex = use(obj.startIndex, 0);
        this.linkTarget = use(obj.linkTarget, '_blank');
        this.lazyLoading = use(obj.lazyLoading, true);
        this.image = use(obj.image, true);
        this.imagePercent = use(obj.imagePercent, 75);
        this.imageArrows = use(obj.imageArrows, true);
        this.imageArrowsAutoHide = use(obj.imageArrowsAutoHide, false);
        this.imageSwipe = use(obj.imageSwipe, false);
        this.imageAnimation = use(obj.imageAnimation, NgxGalleryAnimation.Fade);
        this.imageSize = use(obj.imageSize, NgxGalleryImageSize.Cover);
        this.imageAutoPlay = use(obj.imageAutoPlay, false);
        this.imageAutoPlayInterval = use(obj.imageAutoPlayInterval, 2000);
        this.imageAutoPlayPauseOnHover = use(obj.imageAutoPlayPauseOnHover, false);
        this.imageInfinityMove = use(obj.imageInfinityMove, false);
        if (obj && obj.imageActions && obj.imageActions.length) {
            obj.imageActions = obj.imageActions.map(function (action) { return new NgxGalleryAction(action); });
        }
        this.imageActions = use(obj.imageActions, []);
        this.imageDescription = use(obj.imageDescription, false);
        this.thumbnails = use(obj.thumbnails, true);
        this.thumbnailsColumns = use(obj.thumbnailsColumns, 4);
        this.thumbnailsRows = use(obj.thumbnailsRows, 1);
        this.thumbnailsPercent = use(obj.thumbnailsPercent, 25);
        this.thumbnailsMargin = use(obj.thumbnailsMargin, 10);
        this.thumbnailsArrows = use(obj.thumbnailsArrows, true);
        this.thumbnailsArrowsAutoHide = use(obj.thumbnailsArrowsAutoHide, false);
        this.thumbnailsSwipe = use(obj.thumbnailsSwipe, false);
        this.thumbnailsMoveSize = use(obj.thumbnailsMoveSize, 1);
        this.thumbnailsOrder = use(obj.thumbnailsOrder, NgxGalleryOrder.Column);
        this.thumbnailsRemainingCount = use(obj.thumbnailsRemainingCount, false);
        this.thumbnailsAsLinks = use(obj.thumbnailsAsLinks, false);
        this.thumbnailMargin = use(obj.thumbnailMargin, 10);
        this.thumbnailSize = use(obj.thumbnailSize, NgxGalleryImageSize.Cover);
        if (obj && obj.thumbnailActions && obj.thumbnailActions.length) {
            obj.thumbnailActions = obj.thumbnailActions.map(function (action) { return new NgxGalleryAction(action); });
        }
        this.thumbnailActions = use(obj.thumbnailActions, []);
        this.preview = use(obj.preview, true);
        this.previewDescription = use(obj.previewDescription, true);
        this.previewSwipe = use(obj.previewSwipe, false);
        this.previewFullscreen = use(obj.previewFullscreen, false);
        this.previewForceFullscreen = use(obj.previewForceFullscreen, false);
        this.previewCloseOnClick = use(obj.previewCloseOnClick, false);
        this.previewCloseOnEsc = use(obj.previewCloseOnEsc, false);
        this.previewKeyboardNavigation = use(obj.previewKeyboardNavigation, false);
        this.previewAnimation = use(obj.previewAnimation, true);
        this.previewAutoPlay = use(obj.previewAutoPlay, false);
        this.previewAutoPlayInterval = use(obj.previewAutoPlayInterval, 2000);
        this.previewAutoPlayPauseOnHover = use(obj.previewAutoPlayPauseOnHover, false);
        this.previewInfinityMove = use(obj.previewInfinityMove, false);
        this.previewZoom = use(obj.previewZoom, false);
        this.previewZoomStep = use(obj.previewZoomStep, 0.1);
        this.previewZoomMax = use(obj.previewZoomMax, 2);
        this.previewZoomMin = use(obj.previewZoomMin, 0.5);
        this.previewRotate = use(obj.previewRotate, false);
        this.previewDownload = use(obj.previewDownload, false);
        this.previewCustom = use(obj.previewCustom, undefined);
        this.arrowPrevIcon = use(obj.arrowPrevIcon, 'fa fa-arrow-circle-left');
        this.arrowNextIcon = use(obj.arrowNextIcon, 'fa fa-arrow-circle-right');
        this.closeIcon = use(obj.closeIcon, 'fa fa-times-circle');
        this.fullscreenIcon = use(obj.fullscreenIcon, 'fa fa-arrows-alt');
        this.spinnerIcon = use(obj.spinnerIcon, 'fa fa-spinner fa-pulse fa-3x fa-fw');
        this.zoomInIcon = use(obj.zoomInIcon, 'fa fa-search-plus');
        this.zoomOutIcon = use(obj.zoomOutIcon, 'fa fa-search-minus');
        this.rotateLeftIcon = use(obj.rotateLeftIcon, 'fa fa-undo');
        this.rotateRightIcon = use(obj.rotateRightIcon, 'fa fa-repeat');
        this.downloadIcon = use(obj.downloadIcon, 'fa fa-arrow-circle-down');
        this.project = use(obj.project, false);
        if (obj && obj.actions && obj.actions.length) {
            obj.actions = obj.actions.map(function (action) { return new NgxGalleryAction(action); });
        }
        this.actions = use(obj.actions, []);
    }
    return NgxGalleryOptions;
}());

var NgxGalleryOrderedImage = /** @class */ (function () {
    /**
     * @param {?} obj
     */
    function NgxGalleryOrderedImage(obj) {
        this.src = obj.src;
        this.index = obj.index;
    }
    return NgxGalleryOrderedImage;
}());

var NgxGalleryComponent = /** @class */ (function () {
    /**
     * @param {?} myElement
     */
    function NgxGalleryComponent(myElement) {
        this.myElement = myElement;
        this.imagesReady = new EventEmitter();
        this.change = new EventEmitter();
        this.previewOpen = new EventEmitter();
        this.previewClose = new EventEmitter();
        this.previewChange = new EventEmitter();
        this.oldImagesLength = 0;
        this.selectedIndex = 0;
        this.breakpoint = undefined;
        this.prevBreakpoint = undefined;
    }
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.ngOnInit = function () {
        this.options = this.options.map(function (opt) { return new NgxGalleryOptions(opt); });
        this.sortOptions();
        this.setBreakpoint();
        this.setOptions();
        this.checkFullWidth();
        if (this.currentOptions) {
            this.selectedIndex = /** @type {?} */ (this.currentOptions.startIndex);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.ngDoCheck = function () {
        if (this.images !== undefined && (this.images.length !== this.oldImagesLength)
            || (this.images !== this.oldImages)) {
            this.oldImagesLength = this.images.length;
            this.oldImages = this.images;
            this.setImages();
            if (this.images && this.images.length) {
                this.imagesReady.emit();
            }
            if (this.image) {
                this.image.reset(/** @type {?} */ (this.currentOptions.startIndex));
            }
            this.resetThumbnails();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.ngAfterViewInit = function () {
        this.checkFullWidth();
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.onResize = function () {
        var _this = this;
        this.setBreakpoint();
        if (this.prevBreakpoint !== this.breakpoint) {
            this.setOptions();
            this.resetThumbnails();
        }
        if (this.currentOptions && this.currentOptions.fullWidth) {
            if (this.fullWidthTimeout) {
                clearTimeout(this.fullWidthTimeout);
            }
            this.fullWidthTimeout = setTimeout(function () {
                _this.checkFullWidth();
            }, 200);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.getImageHeight = function () {
        return (this.currentOptions && this.currentOptions.thumbnails) ?
            this.currentOptions.imagePercent + '%' : '100%';
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.getThumbnailsHeight = function () {
        if (this.currentOptions && this.currentOptions.image) {
            return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
                + this.currentOptions.thumbnailsMargin + 'px)';
        }
        else {
            return '100%';
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.getThumbnailsMarginTop = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsBottom) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.getThumbnailsMarginBottom = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsTop) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryComponent.prototype.openPreview = function (index) {
        if (this.currentOptions.previewCustom) {
            this.currentOptions.previewCustom(index);
        }
        else {
            this.previewEnabled = true;
            this.preview.open(index);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.onPreviewOpen = function () {
        this.previewOpen.emit();
        if (this.image && this.image.autoPlay) {
            this.image.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.onPreviewClose = function () {
        this.previewEnabled = false;
        this.previewClose.emit();
        if (this.image && this.image.autoPlay) {
            this.image.startAutoPlay();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryComponent.prototype.selectFromImage = function (index) {
        this.select(index);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryComponent.prototype.selectFromThumbnails = function (index) {
        this.select(index);
        if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
            && (!this.currentOptions.image || this.currentOptions.thumbnailsRemainingCount)) {
            this.openPreview(this.selectedIndex);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryComponent.prototype.show = function (index) {
        this.select(index);
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.showNext = function () {
        this.image.showNext();
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.showPrev = function () {
        this.image.showPrev();
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.canShowNext = function () {
        if (this.images && this.currentOptions) {
            return (this.currentOptions.imageInfinityMove || this.selectedIndex < this.images.length - 1)
                ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.canShowPrev = function () {
        if (this.images && this.currentOptions) {
            return (this.currentOptions.imageInfinityMove || this.selectedIndex > 0) ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryComponent.prototype.previewSelect = function (index) {
        this.previewChange.emit({ index: index, image: this.images[index] });
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.resetThumbnails = function () {
        if (this.thubmnails) {
            this.thubmnails.reset(/** @type {?} */ (this.currentOptions.startIndex));
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        this.change.emit({
            index: index,
            image: this.images[index]
        });
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.checkFullWidth = function () {
        if (this.currentOptions && this.currentOptions.fullWidth) {
            this.width = document.body.clientWidth + 'px';
            this.left = (-(document.body.clientWidth -
                this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px';
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.setImages = function () {
        this.smallImages = this.images.map(function (img) { /** @type {?} */ return (img.small); });
        this.smallImages = this.filterImages(this.smallImages);
        this.mediumImages = this.images.map(function (img, i) { return new NgxGalleryOrderedImage({
            src: img.medium,
            index: i
        }); });
        this.bigImages = this.images.map(function (img) { /** @type {?} */ return (img.big); });
        this.bigImages = this.filterImages(this.bigImages);
        this.descriptions = this.images.map(function (img) { /** @type {?} */ return (img.description); });
        this.links = this.images.map(function (img) { /** @type {?} */ return (img.url); });
        this.labels = this.images.map(function (img) { /** @type {?} */ return (img.label); });
    };
    /**
     * @param {?} images
     * @return {?}
     */
    NgxGalleryComponent.prototype.filterImages = function (images) {
        var _this = this;
        var /** @type {?} */ data = [];
        images.forEach(function (image) {
            if (_this.checkVideo(image)) {
                data.push({
                    src: image,
                    type: true
                });
            }
            else {
                data.push(image);
            }
        });
        return data;
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxGalleryComponent.prototype.checkVideo = function (image) {
        var /** @type {?} */ type = image.substring(image.lastIndexOf('.'), image.length);
        return type == '.mp4';
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.setBreakpoint = function () {
        this.prevBreakpoint = this.breakpoint;
        var /** @type {?} */ breakpoints;
        if (typeof window !== 'undefined') {
            breakpoints = this.options.filter(function (opt) { return opt.breakpoint >= window.innerWidth; })
                .map(function (opt) { return opt.breakpoint; });
        }
        if (breakpoints && breakpoints.length) {
            this.breakpoint = breakpoints.pop();
        }
        else {
            this.breakpoint = undefined;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.sortOptions = function () {
        this.options = this.options.filter(function (a) { return a.breakpoint === undefined; }).concat(this.options
            .filter(function (a) { return a.breakpoint !== undefined; })
            .sort(function (a, b) { return b.breakpoint - a.breakpoint; }));
    };
    /**
     * @return {?}
     */
    NgxGalleryComponent.prototype.setOptions = function () {
        var _this = this;
        this.currentOptions = new NgxGalleryOptions({});
        this.options
            .filter(function (opt) { return opt.breakpoint === undefined || opt.breakpoint >= _this.breakpoint; })
            .map(function (opt) { return _this.combineOptions(_this.currentOptions, opt); });
        this.width = /** @type {?} */ (this.currentOptions.width);
        this.height = /** @type {?} */ (this.currentOptions.height);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    NgxGalleryComponent.prototype.combineOptions = function (first, second) {
        Object.keys(second).map(function (val) { return first[val] = second[val] !== undefined ? second[val] : first[val]; });
    };
    NgxGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-gallery-gocodee',
                    template: "\n    <div class=\"ngx-gallery-layout {{currentOptions?.layout}}\">\n        <ngx-gallery-image *ngIf=\"currentOptions?.image\" [style.height]=\"getImageHeight()\" [images]=\"mediumImages\" [clickable]=\"currentOptions?.preview\" [selectedIndex]=\"selectedIndex\" [arrows]=\"currentOptions?.imageArrows\" [arrowsAutoHide]=\"currentOptions?.imageArrowsAutoHide\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [swipe]=\"currentOptions?.imageSwipe\" [animation]=\"currentOptions?.imageAnimation\" [size]=\"currentOptions?.imageSize\" [autoPlay]=\"currentOptions?.imageAutoPlay\" [autoPlayInterval]=\"currentOptions?.imageAutoPlayInterval\" [autoPlayPauseOnHover]=\"currentOptions?.imageAutoPlayPauseOnHover\" [infinityMove]=\"currentOptions?.imageInfinityMove\"  [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.imageActions\" [descriptions]=\"descriptions\" [showDescription]=\"currentOptions?.imageDescription\" (onClick)=\"openPreview($event)\" (onActiveChange)=\"selectFromImage($event)\"></ngx-gallery-image>\n\n        <ngx-gallery-thumbnails *ngIf=\"currentOptions?.thumbnails\" [style.marginTop]=\"getThumbnailsMarginTop()\" [style.marginBottom]=\"getThumbnailsMarginBottom()\" [style.height]=\"getThumbnailsHeight()\" [images]=\"smallImages\" [links]=\"currentOptions?.thumbnailsAsLinks ? links : []\" [labels]=\"labels\" [linkTarget]=\"currentOptions?.linkTarget\" [selectedIndex]=\"selectedIndex\" [columns]=\"currentOptions?.thumbnailsColumns\" [rows]=\"currentOptions?.thumbnailsRows\" [margin]=\"currentOptions?.thumbnailMargin\" [arrows]=\"currentOptions?.thumbnailsArrows\" [arrowsAutoHide]=\"currentOptions?.thumbnailsArrowsAutoHide\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [clickable]=\"currentOptions?.image || currentOptions?.preview\" [swipe]=\"currentOptions?.thumbnailsSwipe\" [size]=\"currentOptions?.thumbnailSize\" [moveSize]=\"currentOptions?.thumbnailsMoveSize\" [order]=\"currentOptions?.thumbnailsOrder\" [remainingCount]=\"currentOptions?.thumbnailsRemainingCount\" [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.thumbnailActions\"  (onActiveChange)=\"selectFromThumbnails($event)\"></ngx-gallery-thumbnails>\n\n        <ngx-gallery-preview [star]=\"data?.star\" [isProject]=\"currentOptions?.project\" [images]=\"bigImages\" [smallImages]=\"smallImages\" [descriptions]=\"descriptions\" [showDescription]=\"currentOptions?.previewDescription\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [closeIcon]=\"currentOptions?.closeIcon\" [fullscreenIcon]=\"currentOptions?.fullscreenIcon\" [spinnerIcon]=\"currentOptions?.spinnerIcon\" [swipe]=\"currentOptions?.previewSwipe\" [fullscreen]=\"currentOptions?.previewFullscreen\" [forceFullscreen]=\"currentOptions?.previewForceFullscreen\" [closeOnClick]=\"currentOptions?.previewCloseOnClick\" [closeOnEsc]=\"currentOptions?.previewCloseOnEsc\" [keyboardNavigation]=\"currentOptions?.previewKeyboardNavigation\" [animation]=\"currentOptions?.previewAnimation\" [autoPlay]=\"currentOptions?.previewAutoPlay\" [autoPlayInterval]=\"currentOptions?.previewAutoPlayInterval\" [autoPlayPauseOnHover]=\"currentOptions?.previewAutoPlayPauseOnHover\" [infinityMove]=\"currentOptions?.previewInfinityMove\" [zoom]=\"currentOptions?.previewZoom\" [zoomStep]=\"currentOptions?.previewZoomStep\" [zoomMax]=\"currentOptions?.previewZoomMax\" [zoomMin]=\"currentOptions?.previewZoomMin\" [zoomInIcon]=\"currentOptions?.zoomInIcon\" [zoomOutIcon]=\"currentOptions?.zoomOutIcon\" [actions]=\"currentOptions?.actions\" [rotate]=\"currentOptions?.previewRotate\" [rotateLeftIcon]=\"currentOptions?.rotateLeftIcon\" [rotateRightIcon]=\"currentOptions?.rotateRightIcon\" [download]=\"currentOptions?.previewDownload\" [downloadIcon]=\"currentOptions?.downloadIcon\" (onClose)=\"onPreviewClose()\" (onOpen)=\"onPreviewOpen()\" (onActiveChange)=\"previewSelect($event)\" [class.ngx-gallery-active]=\"previewEnabled\"></ngx-gallery-preview>\n    </div>\n    ",
                    styles: [":host { display: inline-block; } :host > * { float: left; } :host /deep/ * { box-sizing: border-box; } :host /deep/ .ngx-gallery-icon { color: white; font-size: 25px; position: absolute; z-index: 2000; display: inline-block; } :host /deep/ .ngx-gallery-icon .ngx-gallery-icon-content { display: block; } :host /deep/ .ngx-gallery-clickable { cursor: pointer; } :host /deep/ .ngx-gallery-icons-wrapper .ngx-gallery-icon { position: relative; margin-right: 5px; margin-top: 5px; font-size: 20px; cursor: pointer; } :host /deep/ .ngx-gallery-icons-wrapper { float: right; } :host .ngx-gallery-layout { width: 100%; height: 100%; display: flex; flex-direction: column; } :host .ngx-gallery-layout.thumbnails-top ngx-gallery-image { order: 2; } :host .ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails { order: 1; } :host .ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails-mobile { order: 1; } :host .ngx-gallery-layout.thumbnails-bottom ngx-gallery-image { order: 1; } :host .ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails { order: 2; } :host .ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails-mobile { order: 2; } "],
                    providers: [NgxGalleryHelperService]
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    NgxGalleryComponent.propDecorators = {
        'options': [{ type: Input },],
        'images': [{ type: Input },],
        'data': [{ type: Input },],
        'imagesReady': [{ type: Output },],
        'change': [{ type: Output },],
        'previewOpen': [{ type: Output },],
        'previewClose': [{ type: Output },],
        'previewChange': [{ type: Output },],
        'preview': [{ type: ViewChild, args: [NgxGalleryPreviewComponent,] },],
        'image': [{ type: ViewChild, args: [NgxGalleryImageComponent,] },],
        'thubmnails': [{ type: ViewChild, args: [NgxGalleryThumbnailsComponent,] },],
        'width': [{ type: HostBinding, args: ['style.width',] },],
        'height': [{ type: HostBinding, args: ['style.height',] },],
        'left': [{ type: HostBinding, args: ['style.left',] },],
        'onResize': [{ type: HostListener, args: ['window:resize',] },],
    };
    return NgxGalleryComponent;
}());

var NgxGalleryThumbnailsMobileComponent = /** @class */ (function () {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     */
    function NgxGalleryThumbnailsMobileComponent(sanitization, elementRef, helperService) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.minStopIndex = 0;
        this.onActiveChange = new EventEmitter();
        this.index = 0;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['selectedIndex']) {
            this.validateIndex();
        }
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'thumbnails', function () { return _this.moveRight(); }, function () { return _this.moveLeft(); });
        }
        if (this.images) {
            this.remainingCountValue = this.images.length - (this.rows * this.columns);
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.onMouseEnter = function () {
        this.mouseenter = true;
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.onMouseLeave = function () {
        this.mouseenter = false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.reset = function (index) {
        this.selectedIndex = index;
        this.setDefaultPosition();
        this.index = 0;
        this.validateIndex();
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getImages = function () {
        if (this.remainingCount) {
            return this.images.slice(0, this.rows * this.columns);
        }
        else if (this.lazyLoading && this.order != NgxGalleryOrder.Row) {
            var /** @type {?} */ stopIndex = this.index + this.columns + this.moveSize;
            if (this.rows > 1 && this.order === NgxGalleryOrder.Column) {
                stopIndex = stopIndex * this.rows;
            }
            if (stopIndex <= this.minStopIndex) {
                stopIndex = this.minStopIndex;
            }
            else {
                this.minStopIndex = stopIndex;
            }
            return this.images.slice(0, stopIndex);
        }
        else {
            return this.images;
        }
    };
    /**
     * @param {?} event
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.handleClick = function (event, index) {
        if (!this.hasLinks()) {
            this.selectedIndex = index;
            this.onActiveChange.emit(index);
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.hasLinks = function () {
        if (this.links && this.links.length)
            return true;
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.moveRight = function () {
        if (this.canMoveRight()) {
            this.index += this.moveSize;
            var /** @type {?} */ maxIndex = this.getMaxIndex() - this.columns;
            if (this.index > maxIndex) {
                this.index = maxIndex;
            }
            this.setThumbnailsPosition();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.moveLeft = function () {
        if (this.canMoveLeft()) {
            this.index -= this.moveSize;
            if (this.index < 0) {
                this.index = 0;
            }
            this.setThumbnailsPosition();
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.canMoveRight = function () {
        return this.index + this.columns < this.getMaxIndex() ? true : false;
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.canMoveLeft = function () {
        return this.index !== 0 ? true : false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getThumbnailLeft = function (index) {
        var /** @type {?} */ calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = Math.floor(index / this.rows);
        }
        else {
            calculatedIndex = index % Math.ceil(this.images.length / this.rows);
        }
        return this.getThumbnailPosition(calculatedIndex, this.columns);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getThumbnailTop = function (index) {
        var /** @type {?} */ calculatedIndex;
        if (this.order === NgxGalleryOrder.Column) {
            calculatedIndex = index % this.rows;
        }
        else {
            calculatedIndex = Math.floor(index / Math.ceil(this.images.length / this.rows));
        }
        return this.getThumbnailPosition(calculatedIndex, this.rows);
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getThumbnailWidth = function () {
        return this.getThumbnailDimension(this.columns);
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getThumbnailHeight = function () {
        return this.getThumbnailDimension(this.rows);
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.setThumbnailsPosition = function () {
        this.thumbnailsLeft = -((100 / this.columns) * this.index) + '%';
        this.thumbnailsMarginLeft = -((this.margin - (((this.columns - 1)
            * this.margin) / this.columns)) * this.index) + 'px';
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.setDefaultPosition = function () {
        this.thumbnailsLeft = '0px';
        this.thumbnailsMarginLeft = '0px';
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.canShowArrows = function () {
        if (this.remainingCount) {
            return false;
        }
        else if (this.arrows && this.images && this.images.length > this.getVisibleCount()
            && (!this.arrowsAutoHide || this.mouseenter)) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.validateIndex = function () {
        var /** @type {?} */ newIndex;
        if (this.order === NgxGalleryOrder.Column) {
            newIndex = Math.floor(this.selectedIndex / this.rows);
        }
        else {
            newIndex = this.selectedIndex % Math.ceil(this.images.length / this.rows);
        }
        if (this.remainingCount) {
            newIndex = 0;
        }
        if (newIndex < this.index || newIndex >= this.index + this.columns) {
            var /** @type {?} */ maxIndex = this.getMaxIndex() - this.columns;
            this.index = newIndex > maxIndex ? maxIndex : newIndex;
            this.setThumbnailsPosition();
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getSafeUrl = function (image) {
        return this.sanitization.bypassSecurityTrustStyle(this.helperService.getBackgroundUrl(image));
    };
    /**
     * @param {?} index
     * @param {?} count
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getThumbnailPosition = function (index, count) {
        return this.getSafeStyle('calc(' + ((100 / count) * index) + '% + '
            + ((this.margin - (((count - 1) * this.margin) / count)) * index) + 'px)');
    };
    /**
     * @param {?} count
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getThumbnailDimension = function (count) {
        if (this.margin !== 0) {
            return this.getSafeStyle('calc(' + (100 / count) + '% - '
                + (((count - 1) * this.margin) / count) + 'px)');
        }
        else {
            return this.getSafeStyle('calc(' + (100 / count) + '% + 1px)');
        }
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getMaxIndex = function () {
        return Math.ceil(this.images.length / this.rows);
    };
    /**
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getVisibleCount = function () {
        return this.columns * this.rows;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    NgxGalleryThumbnailsMobileComponent.prototype.getSafeStyle = function (value) {
        return this.sanitization.bypassSecurityTrustStyle(value);
    };
    NgxGalleryThumbnailsMobileComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-gallery-thumbnails-mobile',
                    template: "\n    <div class=\"ngx-gallery-thumbnails-wrapper ngx-gallery-thumbnail-size-{{size}}\">\n        <div class=\"ngx-gallery-thumbnails\" [style.transform]=\"'translateX(' + thumbnailsLeft + ')'\" [style.marginLeft]=\"thumbnailsMarginLeft\">\n            <a [href]=\"hasLinks() ? links[i] : '#'\" [target]=\"linkTarget\" class=\"ngx-gallery-thumbnail\" *ngFor=\"let image of getImages(); let i = index;\" [style.background-image]=\"image?.type ? '' : getSafeUrl(image)\" (click)=\"handleClick($event, i)\" [style.width]=\"getThumbnailWidth()\" [style.height]=\"getThumbnailHeight()\" [style.left]=\"getThumbnailLeft(i)\" [style.top]=\"getThumbnailTop(i)\" [ngClass]=\"{ 'ngx-gallery-active': i == selectedIndex, 'ngx-gallery-clickable': clickable }\" [attr.aria-label]=\"labels[i]\">\n                <video *ngIf=\"image?.type\" preload=\"false\" controls style=\"width: 100%\">\n                    <source [src]=\"image.src\" type=\"video/mp4\">\n                </video>\n                <div class=\"ngx-gallery-icons-wrapper\">\n                    <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, i)\"></ngx-gallery-action>\n                </div>\n                <div class=\"ngx-gallery-remaining-count-overlay\" *ngIf=\"remainingCount && remainingCountValue && (i == (rows * columns) - 1)\">\n                    <span class=\"ngx-gallery-remaining-count\">+{{remainingCountValue}}</span>\n                </div>\n            </a>\n        </div>\n    </div>\n    <ngx-gallery-arrows *ngIf=\"canShowArrows()\" (onPrevClick)=\"moveLeft()\" (onNextClick)=\"moveRight()\" [prevDisabled]=\"!canMoveLeft()\" [nextDisabled]=\"!canMoveRight()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n    ",
                    styles: [":host { width: 100%; display: inline-block; position: relative; } .ngx-gallery-thumbnails-wrapper { width: 100%; height: 100%; position: absolute; overflow: hidden; } .ngx-gallery-thumbnails { height: 100%; width: 100%; position: absolute; left: 0px; transform: translateX(0); transition: transform 0.5s ease-in-out; will-change: transform; } .ngx-gallery-thumbnails .ngx-gallery-thumbnail { position: absolute; height: 100%; background-position: center; background-repeat: no-repeat; text-decoration: none; } .ngx-gallery-thumbnail-size-cover .ngx-gallery-thumbnails .ngx-gallery-thumbnail { background-size: cover; } .ngx-gallery-thumbnail-size-contain .ngx-gallery-thumbnails .ngx-gallery-thumbnail { background-size: contain; } .ngx-gallery-remaining-count-overlay { width: 100%; height: 100%; position: absolute; left: 0px; top: 0px; background-color: rgba(0, 0, 0, 0.4); } .ngx-gallery-remaining-count { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: white; font-size: 30px; } "]
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryThumbnailsMobileComponent.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
        { type: NgxGalleryHelperService, },
    ]; };
    NgxGalleryThumbnailsMobileComponent.propDecorators = {
        'images': [{ type: Input },],
        'links': [{ type: Input },],
        'labels': [{ type: Input },],
        'linkTarget': [{ type: Input },],
        'columns': [{ type: Input },],
        'rows': [{ type: Input },],
        'arrows': [{ type: Input },],
        'arrowsAutoHide': [{ type: Input },],
        'margin': [{ type: Input },],
        'selectedIndex': [{ type: Input },],
        'clickable': [{ type: Input },],
        'swipe': [{ type: Input },],
        'size': [{ type: Input },],
        'arrowPrevIcon': [{ type: Input },],
        'arrowNextIcon': [{ type: Input },],
        'moveSize': [{ type: Input },],
        'order': [{ type: Input },],
        'remainingCount': [{ type: Input },],
        'lazyLoading': [{ type: Input },],
        'actions': [{ type: Input },],
        'onActiveChange': [{ type: Output },],
        'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
        'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
    };
    return NgxGalleryThumbnailsMobileComponent;
}());

var GocodeeGalleryPreviewComponent = /** @class */ (function () {
    /**
     * @param {?} sanitization
     * @param {?} elementRef
     * @param {?} helperService
     * @param {?} renderer
     */
    function GocodeeGalleryPreviewComponent(sanitization, elementRef, helperService, renderer) {
        this.sanitization = sanitization;
        this.elementRef = elementRef;
        this.helperService = helperService;
        this.renderer = renderer;
        this.showSpinner = false;
        this.positionLeft = 0;
        this.positionTop = 0;
        this.zoomValue = 1;
        this.loading = false;
        this.rotateValue = 0;
        this.index = 0;
        this.onOpen = new EventEmitter();
        this.onClose = new EventEmitter();
        this.onActiveChange = new EventEmitter();
        this.isOpen = false;
        this.initialX = 0;
        this.initialY = 0;
        this.initialLeft = 0;
        this.initialTop = 0;
        this.isMove = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes['swipe']) {
            this.helperService.manageSwipe(this.swipe, this.elementRef, 'preview', function () { return _this.showNext(); }, function () { return _this.showPrev(); });
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.ngOnDestroy = function () {
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.onKeyDown = function (e) {
        if (this.isOpen) {
            if (this.keyboardNavigation) {
                if (this.isKeyboardPrev(e)) {
                    this.showPrev();
                }
                else if (this.isKeyboardNext(e)) {
                    this.showNext();
                }
            }
            if (this.closeOnEsc && this.isKeyboardEsc(e)) {
                this.close();
            }
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.open = function (index) {
        var _this = this;
        this.onOpen.emit();
        this.index = index;
        this.isOpen = true;
        this.show(true);
        if (this.forceFullscreen) {
            this.manageFullscreen();
        }
        this.keyDownListener = this.renderer.listenGlobal("window", "keydown", function (e) { return _this.onKeyDown(e); });
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.close = function () {
        this.isOpen = false;
        this.closeFullscreen();
        this.onClose.emit();
        this.stopAutoPlay();
        if (this.keyDownListener) {
            this.keyDownListener();
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.imageMouseEnter = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.imageMouseLeave = function () {
        if (this.autoPlay && this.autoPlayPauseOnHover) {
            this.startAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.startAutoPlay = function () {
        var _this = this;
        if (this.autoPlay) {
            this.stopAutoPlay();
            this.timer = setTimeout(function () {
                if (!_this.showNext()) {
                    _this.index = -1;
                    _this.showNext();
                }
            }, this.autoPlayInterval);
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.stopAutoPlay = function () {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.showNext = function () {
        if (this.canShowNext()) {
            this.index++;
            if (this.index === this.images.length) {
                this.index = 0;
            }
            this.show();
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.showPrev = function () {
        if (this.canShowPrev()) {
            this.index--;
            if (this.index < 0) {
                this.index = this.images.length - 1;
            }
            this.show();
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.canShowNext = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index < this.images.length - 1 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.canShowPrev = function () {
        if (this.loading) {
            return false;
        }
        else if (this.images) {
            return this.infinityMove || this.index > 0 ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.manageFullscreen = function () {
        if (this.fullscreen || this.forceFullscreen) {
            var /** @type {?} */ doc = (document);
            if (!doc.fullscreenElement && !doc.mozFullScreenElement
                && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                this.openFullscreen();
            }
            else {
                this.closeFullscreen();
            }
        }
    };
    /**
     * @param {?} image
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.getSafeUrl = function (image) {
        if (image.type) {
            return {
                src: image.src,
                type: 'video'
            };
        }
        return image.substr(0, 10) === 'data:image' ?
            image : this.sanitization.bypassSecurityTrustUrl(image);
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.zoomIn = function () {
        if (this.canZoomIn()) {
            this.zoomValue += this.zoomStep;
            if (this.zoomValue > this.zoomMax) {
                this.zoomValue = this.zoomMax;
            }
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.zoomOut = function () {
        if (this.canZoomOut()) {
            this.zoomValue -= this.zoomStep;
            if (this.zoomValue < this.zoomMin) {
                this.zoomValue = this.zoomMin;
            }
            if (this.zoomValue <= 1) {
                this.resetPosition();
            }
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.rotateLeft = function () {
        this.rotateValue -= 90;
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.rotateRight = function () {
        this.rotateValue += 90;
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.getTransform = function () {
        return this.sanitization.bypassSecurityTrustStyle('scale(' + this.zoomValue + ') rotate(' + this.rotateValue + 'deg)');
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.canZoomIn = function () {
        return this.zoomValue < this.zoomMax ? true : false;
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.canZoomOut = function () {
        return this.zoomValue > this.zoomMin ? true : false;
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.canDragOnZoom = function () {
        return this.zoom && this.zoomValue > 1;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.mouseDownHandler = function (e) {
        if (this.canDragOnZoom()) {
            this.initialX = this.getClientX(e);
            this.initialY = this.getClientY(e);
            this.initialLeft = this.positionLeft;
            this.initialTop = this.positionTop;
            this.isMove = true;
            e.preventDefault();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.mouseUpHandler = function (e) {
        this.isMove = false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.mouseMoveHandler = function (e) {
        if (this.isMove) {
            this.positionLeft = this.initialLeft + (this.getClientX(e) - this.initialX);
            this.positionTop = this.initialTop + (this.getClientY(e) - this.initialY);
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.getClientX = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.getClientY = function (e) {
        return e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.resetPosition = function () {
        if (this.zoom) {
            this.positionLeft = 0;
            this.positionTop = 0;
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.isKeyboardNext = function (e) {
        return e.keyCode === 39 ? true : false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.isKeyboardPrev = function (e) {
        return e.keyCode === 37 ? true : false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.isKeyboardEsc = function (e) {
        return e.keyCode === 27 ? true : false;
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.openFullscreen = function () {
        var /** @type {?} */ element = (document.documentElement);
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.closeFullscreen = function () {
        var /** @type {?} */ doc = (document);
        if (doc.exitFullscreen) {
            doc.exitFullscreen();
        }
        else if (doc.msExitFullscreen) {
            doc.msExitFullscreen();
        }
        else if (doc.mozCancelFullScreen) {
            doc.mozCancelFullScreen();
        }
        else if (doc.webkitExitFullscreen) {
            doc.webkitExitFullscreen();
        }
    };
    /**
     * @param {?=} first
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.show = function (first) {
        var _this = this;
        if (first === void 0) { first = false; }
        this.loading = true;
        this.stopAutoPlay();
        this.onActiveChange.emit(this.index);
        if (first || !this.animation) {
            this._show();
        }
        else {
            setTimeout(function () { return _this._show(); }, 600);
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype._show = function () {
        var _this = this;
        this.zoomValue = 1;
        this.rotateValue = 0;
        this.resetPosition();
        this.src = this.getSafeUrl(this.images[this.index]);
        this.srcIndex = this.index;
        this.description = this.descriptions[this.index];
        setTimeout(function () {
            if (_this.isLoaded(_this.previewImage.nativeElement)) {
                _this.loading = false;
                _this.startAutoPlay();
            }
            else {
                setTimeout(function () {
                    if (_this.loading) {
                        _this.showSpinner = true;
                    }
                });
                _this.previewImage.nativeElement.onload = function () {
                    _this.loading = false;
                    _this.showSpinner = false;
                    _this.previewImage.nativeElement.onload = null;
                    _this.startAutoPlay();
                };
            }
        });
    };
    /**
     * @param {?} img
     * @return {?}
     */
    GocodeeGalleryPreviewComponent.prototype.isLoaded = function (img) {
        if (!img.complete) {
            return false;
        }
        if (typeof img.naturalWidth !== 'undefined' && img.naturalWidth === 0) {
            return false;
        }
        return true;
    };
    GocodeeGalleryPreviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gocodee-gallery-preview',
                    template: "\n        <ngx-gallery-arrows (onPrevClick)=\"showPrev()\" (onNextClick)=\"showNext()\" [prevDisabled]=\"!canShowPrev()\" [nextDisabled]=\"!canShowNext()\" [arrowPrevIcon]=\"arrowPrevIcon\" [arrowNextIcon]=\"arrowNextIcon\"></ngx-gallery-arrows>\n        <div class=\"ngx-gallery-preview-top\">\n            <div class=\"ngx-gallery-preview-icons\">\n                <ngx-gallery-action *ngFor=\"let action of actions\" [icon]=\"action.icon\" [disabled]=\"action.disabled\" [titleText]=\"action.titleText\" (onClick)=\"action.onClick($event, index)\"></ngx-gallery-action>\n                <a *ngIf=\"download && src\" [href]=\"src\" class=\"ngx-gallery-icon\" aria-hidden=\"true\" download>\n                    <i class=\"ngx-gallery-icon-content {{ downloadIcon }}\"></i>\n                </a>\n                <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomOutIcon\" [disabled]=\"!canZoomOut()\" (onClick)=\"zoomOut()\"></ngx-gallery-action>\n                <ngx-gallery-action *ngIf=\"zoom\" [icon]=\"zoomInIcon\" [disabled]=\"!canZoomIn()\" (onClick)=\"zoomIn()\"></ngx-gallery-action>\n                <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateLeftIcon\" (onClick)=\"rotateLeft()\"></ngx-gallery-action>\n                <ngx-gallery-action *ngIf=\"rotate\" [icon]=\"rotateRightIcon\" (onClick)=\"rotateRight()\"></ngx-gallery-action>\n                <ngx-gallery-action *ngIf=\"fullscreen\" [icon]=\"'ngx-gallery-fullscreen ' + fullscreenIcon\" (onClick)=\"manageFullscreen()\"></ngx-gallery-action>\n                <ngx-gallery-action [icon]=\"'ngx-gallery-close ' + closeIcon\" (onClick)=\"close()\"></ngx-gallery-action>\n            </div>\n        </div>\n        <div class=\"ngx-spinner-wrapper ngx-gallery-center\" [class.ngx-gallery-active]=\"showSpinner\">\n            <i class=\"ngx-gallery-icon ngx-gallery-spinner {{spinnerIcon}}\" aria-hidden=\"true\"></i>\n        </div>\n        <div class=\"ngx-gallery-preview-wrapper\" (click)=\"closeOnClick && close()\" (mouseup)=\"mouseUpHandler($event)\" (mousemove)=\"mouseMoveHandler($event)\" (touchend)=\"mouseUpHandler($event)\" (touchmove)=\"mouseMoveHandler($event)\">\n            <div class=\"ngx-gallery-preview-img-wrapper\">\n                <video #previewImage *ngIf=\"src?.type\" preload=\"auto\" controls>\n                    <source [src]=\"src?.src\" type=\"video/mp4\">\n                </video>\n                <img *ngIf=\"src && !src?.type\" #previewImage class=\"ngx-gallery-preview-img ngx-gallery-center\" [src]=\"src\" (click)=\"$event.stopPropagation()\" (mouseenter)=\"imageMouseEnter()\" (mouseleave)=\"imageMouseLeave()\" (mousedown)=\"mouseDownHandler($event)\" (touchstart)=\"mouseDownHandler($event)\" [class.ngx-gallery-active]=\"!loading\" [class.animation]=\"animation\" [class.ngx-gallery-grab]=\"canDragOnZoom()\" [style.transform]=\"getTransform()\" [style.left]=\"positionLeft + 'px'\" [style.top]=\"positionTop + 'px'\"/>\n            </div>\n            <div class=\"ngx-gallery-preview-text\" *ngIf=\"showDescription && description\" [innerHTML]=\"description\"></div>\n        </div>\n    ",
                    styles: [":host(.ngx-gallery-active) { width: 100%; height: 100%; position: fixed; left: 0; top: 0; background: rgba(0, 0, 0, 0.7); z-index: 10000; display: inline-block; } :host { display: none; } :host /deep/ .ngx-gallery-arrow { font-size: 50px; } .ngx-gallery-preview-img { opacity: 0; max-width: 90%; max-height: 90%; user-select: none; transition: transform .5s; } .ngx-gallery-preview-img.animation { transition: opacity 0.5s linear, transform .5s; } .ngx-gallery-preview-img.ngx-gallery-active { opacity: 1; } .ngx-gallery-preview-img.ngx-gallery-grab { cursor: grab; cursor: -webkit-grab; } .ngx-gallery-icon.ngx-gallery-spinner { font-size: 50px; left: 0; display: inline-block; } :host /deep/ .ngx-gallery-preview-top { position: absolute; width: 100%; user-select: none; } :host /deep/ .ngx-gallery-preview-icons { float: right; } :host /deep/ .ngx-gallery-preview-icons .ngx-gallery-icon { position: relative; margin-right: 10px; margin-top: 10px; font-size: 25px; cursor: pointer; text-decoration: none; } :host /deep/ .ngx-gallery-preview-icons .ngx-gallery-icon.ngx-gallery-icon-disabled { cursor: default; opacity: 0.4; } .ngx-spinner-wrapper { width: 50px; height: 50px; display: none; } .ngx-spinner-wrapper.ngx-gallery-active { display: inline-block; } .ngx-gallery-center { position: absolute; left: 0; right: 0; bottom: 0; margin: auto; top: 0; } .ngx-gallery-preview-text { width: 100%; background: rgba(0, 0, 0, 0.7); padding: 10px; text-align: center; color: white; font-size: 16px; flex: 0 1 auto; z-index: 10; } .ngx-gallery-preview-wrapper { width: 100%; height: 100%; display: flex; flex-flow: column; } .ngx-gallery-preview-img-wrapper { flex: 1 1 auto; position: relative; } "]
                },] },
    ];
    /**
     * @nocollapse
     */
    GocodeeGalleryPreviewComponent.ctorParameters = function () { return [
        { type: DomSanitizer, },
        { type: ElementRef, },
        { type: NgxGalleryHelperService, },
        { type: Renderer, },
    ]; };
    GocodeeGalleryPreviewComponent.propDecorators = {
        'images': [{ type: Input },],
        'descriptions': [{ type: Input },],
        'showDescription': [{ type: Input },],
        'swipe': [{ type: Input },],
        'fullscreen': [{ type: Input },],
        'forceFullscreen': [{ type: Input },],
        'closeOnClick': [{ type: Input },],
        'closeOnEsc': [{ type: Input },],
        'keyboardNavigation': [{ type: Input },],
        'arrowPrevIcon': [{ type: Input },],
        'arrowNextIcon': [{ type: Input },],
        'closeIcon': [{ type: Input },],
        'fullscreenIcon': [{ type: Input },],
        'spinnerIcon': [{ type: Input },],
        'autoPlay': [{ type: Input },],
        'autoPlayInterval': [{ type: Input },],
        'autoPlayPauseOnHover': [{ type: Input },],
        'infinityMove': [{ type: Input },],
        'zoom': [{ type: Input },],
        'zoomStep': [{ type: Input },],
        'zoomMax': [{ type: Input },],
        'zoomMin': [{ type: Input },],
        'zoomInIcon': [{ type: Input },],
        'zoomOutIcon': [{ type: Input },],
        'animation': [{ type: Input },],
        'actions': [{ type: Input },],
        'rotate': [{ type: Input },],
        'rotateLeftIcon': [{ type: Input },],
        'rotateRightIcon': [{ type: Input },],
        'download': [{ type: Input },],
        'downloadIcon': [{ type: Input },],
        'onOpen': [{ type: Output },],
        'onClose': [{ type: Output },],
        'onActiveChange': [{ type: Output },],
        'previewImage': [{ type: ViewChild, args: ['previewImage',] },],
    };
    return GocodeeGalleryPreviewComponent;
}());

var GocodeeGalleryComponent = /** @class */ (function () {
    /**
     * @param {?} myElement
     */
    function GocodeeGalleryComponent(myElement) {
        this.myElement = myElement;
        this.imagesReady = new EventEmitter();
        this.change = new EventEmitter();
        this.previewOpen = new EventEmitter();
        this.previewClose = new EventEmitter();
        this.previewChange = new EventEmitter();
        this.oldImagesLength = 0;
        this.selectedIndex = 0;
        this.breakpoint = undefined;
        this.prevBreakpoint = undefined;
    }
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.ngOnInit = function () {
        this.options = this.options.map(function (opt) { return new NgxGalleryOptions(opt); });
        this.sortOptions();
        this.setBreakpoint();
        this.setOptions();
        this.checkFullWidth();
        if (this.currentOptions) {
            this.selectedIndex = /** @type {?} */ (this.currentOptions.startIndex);
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.ngDoCheck = function () {
        if (this.images !== undefined && (this.images.length !== this.oldImagesLength)
            || (this.images !== this.oldImages)) {
            this.oldImagesLength = this.images.length;
            this.oldImages = this.images;
            this.setImages();
            if (this.images && this.images.length) {
                this.imagesReady.emit();
            }
            if (this.image) {
                this.image.reset(/** @type {?} */ (this.currentOptions.startIndex));
            }
            this.resetThumbnails();
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.ngAfterViewInit = function () {
        this.checkFullWidth();
    };
    /**
     * @param {?} images
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.filterImages = function (images) {
        var _this = this;
        var /** @type {?} */ data = [];
        images.forEach(function (image) {
            if (_this.checkVideo(image)) {
                data.push({
                    src: image,
                    type: true
                });
            }
            else {
                data.push(image);
            }
        });
        return data;
    };
    /**
     * @param {?} image
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.checkVideo = function (image) {
        var /** @type {?} */ type = image.substring(image.lastIndexOf('.'), image.length);
        return type == '.mp4';
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.onResize = function () {
        var _this = this;
        this.setBreakpoint();
        if (this.prevBreakpoint !== this.breakpoint) {
            this.setOptions();
            this.resetThumbnails();
        }
        if (this.currentOptions && this.currentOptions.fullWidth) {
            if (this.fullWidthTimeout) {
                clearTimeout(this.fullWidthTimeout);
            }
            this.fullWidthTimeout = setTimeout(function () {
                _this.checkFullWidth();
            }, 200);
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.getImageHeight = function () {
        return (this.currentOptions && this.currentOptions.thumbnails) ?
            this.currentOptions.imagePercent + '%' : '100%';
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.getThumbnailsHeight = function () {
        if (this.currentOptions && this.currentOptions.image) {
            return 'calc(' + this.currentOptions.thumbnailsPercent + '% - '
                + this.currentOptions.thumbnailsMargin + 'px)';
        }
        else {
            return '100%';
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.getThumbnailsMarginTop = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsBottom) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.getThumbnailsMarginBottom = function () {
        if (this.currentOptions && this.currentOptions.layout === NgxGalleryLayout.ThumbnailsTop) {
            return this.currentOptions.thumbnailsMargin + 'px';
        }
        else {
            return '0px';
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.openPreview = function (index) {
        if (this.currentOptions.previewCustom) {
            this.currentOptions.previewCustom(index);
        }
        else {
            this.previewEnabled = true;
            this.preview.open(index);
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.onPreviewOpen = function () {
        this.previewOpen.emit();
        if (this.image && this.image.autoPlay) {
            this.image.stopAutoPlay();
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.onPreviewClose = function () {
        this.previewEnabled = false;
        this.previewClose.emit();
        if (this.image && this.image.autoPlay) {
            this.image.startAutoPlay();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.selectFromImage = function (index) {
        this.select(index);
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.selectFromThumbnails = function (index) {
        this.select(index);
        if (this.currentOptions && this.currentOptions.thumbnails && this.currentOptions.preview
            && (!this.currentOptions.image || this.currentOptions.thumbnailsRemainingCount)) {
            this.openPreview(this.selectedIndex);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.show = function (index) {
        this.select(index);
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.showNext = function () {
        this.image.showNext();
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.showPrev = function () {
        this.image.showPrev();
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.canShowNext = function () {
        if (this.images && this.currentOptions) {
            return (this.currentOptions.imageInfinityMove || this.selectedIndex < this.images.length - 1)
                ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.canShowPrev = function () {
        if (this.images && this.currentOptions) {
            return (this.currentOptions.imageInfinityMove || this.selectedIndex > 0) ? true : false;
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.previewSelect = function (index) {
        this.previewChange.emit({ index: index, image: this.images[index] });
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.resetThumbnails = function () {
        if (this.thubmnails) {
            this.thubmnails.reset(/** @type {?} */ (this.currentOptions.startIndex));
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.select = function (index) {
        this.selectedIndex = index;
        this.change.emit({
            index: index,
            image: this.images[index]
        });
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.checkFullWidth = function () {
        if (this.currentOptions && this.currentOptions.fullWidth) {
            this.width = document.body.clientWidth + 'px';
            this.left = (-(document.body.clientWidth -
                this.myElement.nativeElement.parentNode.innerWidth) / 2) + 'px';
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.setImages = function () {
        this.smallImages = this.images.map(function (img) { /** @type {?} */ return (img.small); });
        this.smallImages = this.filterImages(this.smallImages);
        this.mediumImages = this.images.map(function (img, i) { return new NgxGalleryOrderedImage({
            src: img.medium,
            index: i
        }); });
        this.bigImages = this.images.map(function (img) { /** @type {?} */ return (img.big); });
        this.bigImages = this.filterImages(this.bigImages);
        this.descriptions = this.images.map(function (img) { /** @type {?} */ return (img.description); });
        this.links = this.images.map(function (img) { /** @type {?} */ return (img.url); });
        this.labels = this.images.map(function (img) { /** @type {?} */ return (img.label); });
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.setBreakpoint = function () {
        this.prevBreakpoint = this.breakpoint;
        var /** @type {?} */ breakpoints;
        if (typeof window !== 'undefined') {
            breakpoints = this.options.filter(function (opt) { return opt.breakpoint >= window.innerWidth; })
                .map(function (opt) { return opt.breakpoint; });
        }
        if (breakpoints && breakpoints.length) {
            this.breakpoint = breakpoints.pop();
        }
        else {
            this.breakpoint = undefined;
        }
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.sortOptions = function () {
        this.options = this.options.filter(function (a) { return a.breakpoint === undefined; }).concat(this.options
            .filter(function (a) { return a.breakpoint !== undefined; })
            .sort(function (a, b) { return b.breakpoint - a.breakpoint; }));
    };
    /**
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.setOptions = function () {
        var _this = this;
        this.currentOptions = new NgxGalleryOptions({});
        this.options
            .filter(function (opt) { return opt.breakpoint === undefined || opt.breakpoint >= _this.breakpoint; })
            .map(function (opt) { return _this.combineOptions(_this.currentOptions, opt); });
        this.width = /** @type {?} */ (this.currentOptions.width);
        this.height = /** @type {?} */ (this.currentOptions.height);
    };
    /**
     * @param {?} first
     * @param {?} second
     * @return {?}
     */
    GocodeeGalleryComponent.prototype.combineOptions = function (first, second) {
        Object.keys(second).map(function (val) { return first[val] = second[val] !== undefined ? second[val] : first[val]; });
    };
    GocodeeGalleryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gocodee-gallery',
                    template: "\n    <div class=\"ngx-gallery-layout {{currentOptions?.layout}}\">\n        <ngx-gallery-image *ngIf=\"currentOptions?.image\" [style.height]=\"getImageHeight()\" [images]=\"bigImages\" [clickable]=\"currentOptions?.preview\" [selectedIndex]=\"selectedIndex\" [arrows]=\"currentOptions?.imageArrows\" [arrowsAutoHide]=\"currentOptions?.imageArrowsAutoHide\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [swipe]=\"currentOptions?.imageSwipe\" [animation]=\"currentOptions?.imageAnimation\" [size]=\"currentOptions?.imageSize\" [autoPlay]=\"currentOptions?.imageAutoPlay\" [autoPlayInterval]=\"currentOptions?.imageAutoPlayInterval\" [autoPlayPauseOnHover]=\"currentOptions?.imageAutoPlayPauseOnHover\" [infinityMove]=\"currentOptions?.imageInfinityMove\"  [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.imageActions\" [descriptions]=\"descriptions\" [showDescription]=\"currentOptions?.imageDescription\" (onClick)=\"openPreview($event)\" (onActiveChange)=\"selectFromImage($event)\"></ngx-gallery-image>\n\n        <ngx-gallery-thumbnails-mobile *ngIf=\"currentOptions?.thumbnails\" [style.marginTop]=\"getThumbnailsMarginTop()\" [style.marginBottom]=\"getThumbnailsMarginBottom()\" [style.height]=\"getThumbnailsHeight()\" [images]=\"smallImages\" [links]=\"currentOptions?.thumbnailsAsLinks ? links : []\" [labels]=\"labels\" [linkTarget]=\"currentOptions?.linkTarget\" [selectedIndex]=\"selectedIndex\" [columns]=\"currentOptions?.thumbnailsColumns\" [rows]=\"currentOptions?.thumbnailsRows\" [margin]=\"currentOptions?.thumbnailMargin\" [arrows]=\"currentOptions?.thumbnailsArrows\" [arrowsAutoHide]=\"currentOptions?.thumbnailsArrowsAutoHide\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [clickable]=\"currentOptions?.image || currentOptions?.preview\" [swipe]=\"currentOptions?.thumbnailsSwipe\" [size]=\"currentOptions?.thumbnailSize\" [moveSize]=\"currentOptions?.thumbnailsMoveSize\" [order]=\"currentOptions?.thumbnailsOrder\" [remainingCount]=\"currentOptions?.thumbnailsRemainingCount\" [lazyLoading]=\"currentOptions?.lazyLoading\" [actions]=\"currentOptions?.thumbnailActions\"  (onActiveChange)=\"selectFromThumbnails($event)\"></ngx-gallery-thumbnails-mobile>\n\n        <gocodee-gallery-preview [images]=\"bigImages\" [descriptions]=\"descriptions\" [showDescription]=\"currentOptions?.previewDescription\" [arrowPrevIcon]=\"currentOptions?.arrowPrevIcon\" [arrowNextIcon]=\"currentOptions?.arrowNextIcon\" [closeIcon]=\"currentOptions?.closeIcon\" [fullscreenIcon]=\"currentOptions?.fullscreenIcon\" [spinnerIcon]=\"currentOptions?.spinnerIcon\" [swipe]=\"currentOptions?.previewSwipe\" [fullscreen]=\"currentOptions?.previewFullscreen\" [forceFullscreen]=\"currentOptions?.previewForceFullscreen\" [closeOnClick]=\"currentOptions?.previewCloseOnClick\" [closeOnEsc]=\"currentOptions?.previewCloseOnEsc\" [keyboardNavigation]=\"currentOptions?.previewKeyboardNavigation\" [animation]=\"currentOptions?.previewAnimation\" [autoPlay]=\"currentOptions?.previewAutoPlay\" [autoPlayInterval]=\"currentOptions?.previewAutoPlayInterval\" [autoPlayPauseOnHover]=\"currentOptions?.previewAutoPlayPauseOnHover\" [infinityMove]=\"currentOptions?.previewInfinityMove\" [zoom]=\"currentOptions?.previewZoom\" [zoomStep]=\"currentOptions?.previewZoomStep\" [zoomMax]=\"currentOptions?.previewZoomMax\" [zoomMin]=\"currentOptions?.previewZoomMin\" [zoomInIcon]=\"currentOptions?.zoomInIcon\" [zoomOutIcon]=\"currentOptions?.zoomOutIcon\" [actions]=\"currentOptions?.actions\" [rotate]=\"currentOptions?.previewRotate\" [rotateLeftIcon]=\"currentOptions?.rotateLeftIcon\" [rotateRightIcon]=\"currentOptions?.rotateRightIcon\" [download]=\"currentOptions?.previewDownload\" [downloadIcon]=\"currentOptions?.downloadIcon\" (onClose)=\"onPreviewClose()\" (onOpen)=\"onPreviewOpen()\" (onActiveChange)=\"previewSelect($event)\" [class.ngx-gallery-active]=\"previewEnabled\"></gocodee-gallery-preview>\n    </div>\n    ",
                    styles: [":host { display: inline-block; } :host > * { float: left; } :host /deep/ * { box-sizing: border-box; } :host /deep/ .ngx-gallery-icon { color: white; font-size: 25px; position: absolute; z-index: 2000; display: inline-block; } :host /deep/ .ngx-gallery-icon .ngx-gallery-icon-content { display: block; } :host /deep/ .ngx-gallery-clickable { cursor: pointer; } :host /deep/ .ngx-gallery-icons-wrapper .ngx-gallery-icon { position: relative; margin-right: 5px; margin-top: 5px; font-size: 20px; cursor: pointer; } :host /deep/ .ngx-gallery-icons-wrapper { float: right; } :host .ngx-gallery-layout { width: 100%; height: 100%; display: flex; flex-direction: column; } :host .ngx-gallery-layout.thumbnails-top ngx-gallery-image { order: 2; } :host .ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails { order: 1; } :host .ngx-gallery-layout.thumbnails-top ngx-gallery-thumbnails-mobile { order: 1; } :host .ngx-gallery-layout.thumbnails-bottom ngx-gallery-image { order: 1; } :host .ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails { order: 2; } :host .ngx-gallery-layout.thumbnails-bottom ngx-gallery-thumbnails-mobile { order: 2; } "],
                    providers: [NgxGalleryHelperService]
                },] },
    ];
    /**
     * @nocollapse
     */
    GocodeeGalleryComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    GocodeeGalleryComponent.propDecorators = {
        'options': [{ type: Input },],
        'images': [{ type: Input },],
        'imagesReady': [{ type: Output },],
        'change': [{ type: Output },],
        'previewOpen': [{ type: Output },],
        'previewClose': [{ type: Output },],
        'previewChange': [{ type: Output },],
        'preview': [{ type: ViewChild, args: [GocodeeGalleryPreviewComponent,] },],
        'image': [{ type: ViewChild, args: [NgxGalleryImageComponent,] },],
        'thubmnails': [{ type: ViewChild, args: [NgxGalleryThumbnailsMobileComponent,] },],
        'width': [{ type: HostBinding, args: ['style.width',] },],
        'height': [{ type: HostBinding, args: ['style.height',] },],
        'left': [{ type: HostBinding, args: ['style.left',] },],
        'onResize': [{ type: HostListener, args: ['window:resize',] },],
    };
    return GocodeeGalleryComponent;
}());

var NgxGalleryImage = /** @class */ (function () {
    /**
     * @param {?} obj
     */
    function NgxGalleryImage(obj) {
        this.small = obj.small;
        this.medium = obj.medium;
        this.big = obj.big;
        this.description = obj.description;
        this.url = obj.url;
        this.label = obj.label;
    }
    return NgxGalleryImage;
}());

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CustomHammerConfig = /** @class */ (function (_super) {
    __extends(CustomHammerConfig, _super);
    function CustomHammerConfig() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.overrides = ({
            'pinch': { enable: false },
            'rotate': { enable: false }
        });
        return _this;
    }
    return CustomHammerConfig;
}(HammerGestureConfig));
var NgxGalleryGoCodeeModule = /** @class */ (function () {
    function NgxGalleryGoCodeeModule() {
    }
    NgxGalleryGoCodeeModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxGalleryActionComponent,
                        NgxGalleryArrowsComponent,
                        NgxGalleryImageComponent,
                        NgxGalleryThumbnailsComponent,
                        NgxGalleryThumbnailsMobileComponent,
                        NgxGalleryPreviewComponent,
                        GocodeeGalleryComponent,
                        GocodeeGalleryPreviewComponent,
                        NgxGalleryComponent
                    ],
                    exports: [
                        NgxGalleryComponent,
                        GocodeeGalleryComponent
                    ],
                    providers: [
                        { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    NgxGalleryGoCodeeModule.ctorParameters = function () { return []; };
    return NgxGalleryGoCodeeModule;
}());

export { CustomHammerConfig, NgxGalleryGoCodeeModule, NgxGalleryComponent, GocodeeGalleryComponent, GocodeeGalleryPreviewComponent, NgxGalleryActionComponent, NgxGalleryImageComponent, NgxGalleryThumbnailsComponent, NgxGalleryThumbnailsMobileComponent, NgxGalleryPreviewComponent, NgxGalleryArrowsComponent, NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryHelperService, NgxGalleryImageSize, NgxGalleryLayout, NgxGalleryOrder, NgxGalleryOrderedImage, NgxGalleryAction };
