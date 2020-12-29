


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
  private view: View;
  private duration: number; 
  private currentAnimation;
```

- [ ] Edit the constructor

```typescript
  constructor(el: ElementRef) {
    this.view = el.nativeElement;
    this.duration = 0;
  }
```

- [ ] implement the private methods that will be used later on


```typescript
  private animatePressed(): void {
    let view: View = this.view;
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
    }
    this.currentAnimation = view.animate({ opacity: 0, duration: this.duration })
      .then(() => view.animate({ scale: { x: 0.98, y: 0.98 }, duration: this.duration }))
      .then(() => view.animate({ opacity: 0.8, duration: this.duration }))
      .then(() => view.animate({ curve: AnimationCurve.easeIn, duration: this.duration } ))
      .catch((e) => { console.log(e.message); } );
    }

  private animateReleased(): void {
    let view: View = this.view;
    if (this.currentAnimation) {
      this.currentAnimation.cancel();
    }
    this.currentAnimation = view.animate({ opacity: 0, duration: this.duration })
      .then(() => view.animate({ scale: { x: 1, y: 1 }, duration: this.duration }))
      .then(() => view.animate({ opacity: 1, duration: this.duration }))
      .then(() => view.animate({ curve: AnimationCurve.easeIn, duration: this.duration } ))
      .catch((e) => { console.log(e.message); } );
  }
```

- [ ] implement the `@HostListener` `Decorator` and add its method

```typescript
  @HostListener('touch', ['$event'])
  onTouch(args: TouchGestureEventData): void {
    console.log('action: ' + args.action);
    if (args.action === 'down') {
        this.animatePressed();
    } else if (args.action === 'up') {
        this.animateReleased();
    }
  }
```

## :b: Home Component

:round_pushpin: Styles

- [ ] Add the `styleUrls` operator to the `@Component` decorator

```typescript
@Component({
    selector: "Home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
```

- [ ] Let's add a new `home.component.css` stylesheet and add the following stylesheet classes

```scss
.container {
    font-size: 20;
    background-color: #D0CCE0;
    padding: 10 0;
}

.cards {
    margin: 4 20;
    background-color: #fff;
    padding: 20;
    border-radius: 10;
}
```


:round_pushpin: Template

- [ ] Let finish with the XML template

* In the current `<GridLayout>` replace the comment `<!-- Add your page content here -->` with


```xml
    <ScrollView>
        <StackLayout class="container">
            <StackLayout appTouchScaleAnimation class="cards"
                (tap)="onCardTap(1)">
                <Image src="~/images/img1.png" width="200"
                    stretch="aspectFit"></Image>
            </StackLayout>

            <StackLayout appTouchScaleAnimation class="cards"
                (tap)="onCardTap(2)">
                <Image src="~/images/img2.png" width="200"
                    stretch="aspectFit"></Image>
            </StackLayout>

            <StackLayout appTouchScaleAnimation class="cards"
                (tap)="onCardTap(3)">
                <Image src="~/images/img3.png" width="200"
                    stretch="aspectFit"></Image>
            </StackLayout>

        </StackLayout>
    </ScrollView>
```

:round_pushpin: `HomeComponent` Class

- [ ] in the HomeComponent `Class`, add the method associated with the gestures

```typescript
    onCardTap(index: number): void {
        console.log('card tap', index);
    }
```

