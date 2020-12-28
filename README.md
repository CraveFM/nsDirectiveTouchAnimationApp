


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


https://dzone.com/articles/what-are-hostbinding-and-hostlistener-in-angular

```
> The basic difference between a component and a directive is that a component has a template, whereas an attribute or structural directive does not have a template.
```
