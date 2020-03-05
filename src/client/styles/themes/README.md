# Angular Material Theming

It took me a while to get the hang of theming, and to disentangle what is angular-material in origin, and what is just scss (hint: if it begins with `mat-` then it's probably a ngMat function :).

If you want to go beyond into defining the other "standard" parts
of a material theme then check out the definition of the `mat-light-theme` function in `_theming.scss`:

```scss
@function mat-light-theme($primary, $accent, $warn: mat-palette($mat-red)) {
  @return (
    primary: $primary,
    accent: $accent,
    warn: $warn,
    is-dark: false,
    foreground: $mat-light-theme-foreground,
    background: $mat-light-theme-background
  );
}
```

Note in particular that angular will automatically include two maps as part of the theme that you cannot control: `foreground` and `background`. [This image](https://miro.medium.com/max/3038/1*4JeWYvYowDHOJrJ4An_8IA.png) shows the content of these palettes.
