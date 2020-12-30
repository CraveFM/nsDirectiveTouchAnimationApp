
# Apple Card 3D App

<img src="https://github.com/angular/angular/blob/master/aio/src/assets/images/logos/angular/angular.png" width="31" height="31"></img> Adding [Animations using Angular Attibute Directives](https://nativescripting.com/posts/animations-using-angular-directives) by [William TjondroSuharto](https://twitter.com/williamjuan27)

[<img src="https://nativescripting.com/758edc112b99236de995159be8c7567b/directive-animation.gif" width="210" height="375"></img>](https://play.nativescript.org/?template=play-ng&id=Wh9rvG&v=49)

Example taken from [:bookmark:`nativescripting.com`](https://nativescripting.com/posts/animations-using-angular-directives) by [William TjondroSuharto](https://twitter.com/williamjuan27) and can be used as a template since it has already been converted to [NativeScript 7](https://nativescript.org/blog/nativescript-7-announcement)

## :o: Create a project by using this template

```
$ ns create nsDirectiveTouchAnimationApp --template https://github.com/CraveFM/nsDirectiveTouchAnimationApp
```

## :bookmark: Create a project from Scratch

```
$ ns create nsDirectiveTouchAnimationApp --template @nativescript/template-blank-ng
```

:gear: Reverse Engineering from [William TjondroSuharto](https://twitter.com/williamjuan27)'s Example

- [ ] Create a `NSPlayground` directory 

- [ ] Download the old {N} 6.0 project from [Playground](https://play.nativescript.org/?template=play-ng&id=sxs0F7&v=7)

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

### :a: TouchScaleAnimation Attribute Directive

### :m: The directives

https://dzone.com/articles/what-are-hostbinding-and-hostlistener-in-angular

The basic difference between a component and a directive is that a component has a template, whereas an attribute or structural directive does not have a template.

- [ ] Generate the directive

```
$ ng generate directive directives/TouchScaleAnimation --skip-tests=true
```

#### :construction: Visibility Issue!

This will add the `TouchScaleAnimationDirective` class to the `App` Module Class, 

```typescript
@NgModule({
    imports: [
        NativeScriptCommonModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        TouchScaleAnimationDirective
...
```

it needs to be moved to the `Home` Module Class

```typescript
@NgModule({
    imports: [
        NativeScriptCommonModule,
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
        TouchScaleAnimationDirective
...
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

### :m: Home Component

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

- [ ] Let's finish with the XML template

* In the current `<GridLayout>` replace the comment `<!-- Add your page content here -->` with


```xml
    <ScrollView>
        <StackLayout class="container">
            <StackLayout [nsTouchScaleAnimation] class="cards"
                (tap)="onCardTap(1)">
                <Image src="~/images/img1.png" width="200"
                    stretch="aspectFit"></Image>
            </StackLayout>

            <StackLayout [nsTouchScaleAnimation] class="cards"
                (tap)="onCardTap(2)">
                <Image src="~/images/img2.png" width="200"
                    stretch="aspectFit"></Image>
            </StackLayout>

            <StackLayout [nsTouchScaleAnimation] class="cards"
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

## :b: ActionBar Structural Directive

We will follow the {N} [Ng Directives](https://docs.nativescript.org/angular/ui/ng-components/ng-directives) example and change the `ActionBar` of the `HomeComponent` template


:round_pushpin: Structural Directives

- [ ] Generate the directives for `Android` and `iOS`

```
$ ng generate directive directives/ifAndroid --skip-tests=true
```

```
$ ng generate directive directives/ifIos --skip-tests=true
```

:construction: Follow the same directives for fixing the [Visibility Issue](README.md#construction-visibility-issue) when running the directives under a specific module.

- [ ] Change the constructors

change the constructor from :

```typescript
  constructor() { }
```

to : 

:bulb: change the platform accordingly for testing `iOS` it's `isIOS` and `Android` it's `isAndroid`

```typescript
  constructor(container: ViewContainerRef, templateRef: TemplateRef<View>) {
    if (isIOS) {
        container.createEmbeddedView(templateRef);
    }
  }
```

:gear: `Fonts` settings


- [ ] `Font Awesome` Fonts

* download and copy the `fonts` folder to the `src` directory

```
$ cp -r fonts src/fonts
```

- [ ] `Font Awesome` Settings

* In the `app.css` file, add the `fonts` `.fa` class

```css
.fa {
    font-family: 'FontAwesome'
  }

```

:round_pushpin: `HomeComponent` Template

- [ ] `HomeComponent` Action Bar

* In the `home.component.html` file change the `Label` tag in the `ActionBar` tag from :

```xml
<ActionBar>
    <Label text="Home"></Label>
</ActionBar>
```

to :

```xml
<ActionBar>
    <Label *nsIfAndroid text="&#xf17b;" class="fa t-36"></Label>
    <Label *nsIfIos     text="&#xf179;" class="fa t-36"></Label>
</ActionBar>
```

:bulb: You can notice the two `structural` directives (preceded by a `*` ) `*nsIfAndroid` and `*nsIfIos`

:x: Pipes

https://nativescripting.com/posts/how-to-display-protected-images


```
$ ng generate pipe pipes/protectedImage --skip-tests=true
```

- [ ] Replace the ccurrent `transform` method

```typesccript
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
```

by 

```typescript
  transform(url: string): Observable<ImageSource> {
    return from(
      Http.getImage({
        headers: {
          Authorization: `Bearer ${this.getToken()}`, // or whatever additional headers that needs to be passed in
        },
        url: url,
        method: 'GET',
      })
    )
  }
```
