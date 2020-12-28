


```
$ ns create nsDirectiveTouchAnimationApp --template @nativescript/template-blank-ng
```

:o: Setup 

- [ ] Create a `NSPlayground` directory 

- [ ] Download the old {N} 6.0 project from [play](https://play.nativescript.org/?template=play-ng&id=sxs0F7&v=7)

- [ ] Move the `NSPlayground.zip` file to the `NSPlayground` directory in the project

    `mv ~/Downloads/NSPlayground.zip NSPlayground`

- [ ] Images

* copy `images` folder to the `src` directory by renaming the original `assets` directory

```
$ cp -r NSPlayground/app/assets src/images
```

- [ ] Edit `webpack.config.js` file

* locate the `copyTargets` variable and add the `from: 'images/**'` JSON section like below

```javascript
const copyTargets = [
    { from: 'assets/**', noErrorOnMissing: true, globOptions: { dot: false, ...copyIgnore } },
    { from: 'fonts/**', noErrorOnMissing: true, globOptions: { dot: false, ...copyIgnore } },
    { from: 'images/**', noErrorOnMissing: true, globOptions: { dot: false, ...copyIgnore } },
    ...copyReplacements
  ];
```

## :a: TouchScaleAnimation Directive

https://dzone.com/articles/what-are-hostbinding-and-hostlistener-in-angular

```
> The basic difference between a component and a directive is that a component has a template, whereas an attribute or structural directive does not have a template.
```

- [ ] Generate the directive

```
$ ng generate directive directives/TouchScaleAnimation --skip-tests=true
```


:round_pushpin: in the `TouchScaleAnimationDirective` `Class`

- [ ] Add the instance variables that will be used later on

```typescript
  private element: ElementRef;
  private currentAnimation: Animation;
    ```

- [ ] Edit the constructor

```typescript
    constructor(el: ElementRef) {
        this.element = el;
    }
```

- [ ] implement the private methods that will be used later on


```typescript
    private animatePressed(): void {
        if (this.currentAnimation) {
            this.currentAnimation.cancel();
        }
        this.currentAnimation = this.element.nativeElement.animate({
            scale: { x: 0.98, y: 0.98 },
            opacity: 0.8,
            curve: AnimationCurve.easeIn,
            duration: 100
        }).catch(e => {});
    }

    private animateReleased(): void {
        if (this.currentAnimation) {
            this.currentAnimation.cancel();
        }
        this.currentAnimation = this.element.nativeElement.animate({
            scale: { x: 1, y: 1 },
            opacity: 1,
            curve: AnimationCurve.easeIn,
            duration: 100
        }).catch(e => {});
    }
```



- [ ] implement the `@HostListener` `Decorator` and add its method

```typescript
    @HostListener('touch', ['$event'])
    onTouch(args: TouchGestureEventData): void {
        if (args.action === 'down') {
            this.animatePressed();
        } else if (args.action === 'up') {
            this.animateReleased();
        }
    }
```

