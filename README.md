![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Gardener database

Search over 15,000 references for sources that provide information about the lives of a wide variety of representatives of the green profession.

**Live example:** [See it in action!](https://gartenbaubibliothek.de/gaertnerdatenbank)

This is an application Built with [Stencil](https://stenciljs.com/) component starter package for a live website. Check out Stencil docs [here](https://stenciljs.com/docs/my-first-component).


## Getting Started
```bash
git clone https://... gardb (TODO)
cd gardb
```

Run in local dev server:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```



## CSS Vars

You can override these CSS Variables to adapt the theme (WIP)

```
:root {
  --gs-container-max-width: 1280px;
  --gs-container-padding: 50px;

  --gs-color-bg: #efefef;
  --gs-color-primary: #71BC51;
  --gs-color-secondary: #2196F3;
  --gs-color-text: #333;
  --gs-color-border: #999;
  --gs-color-disabled: #ccc;
  --gs-color-background: #fff;

  --gs-border-radius: 5px;
  --gs-border-radius-small: 2px;

  --gs-font-size-base: 15px;

  --gs-button-primary: var(--gs-color-primary);
  --gs-button-primary-focus-color: #c1d6b7;
  --gs-button-primary-border: var(--gs-color-primary);

  --gs-button-light: #FFF;
}
```

## Implementation

Checkout repo or copy `dist` folder to desired project

#### Load Script

```
<script nomodule src="/path/to/dist/gardener-search.js"></script>
```

Add this code before closing `<body>` tag:

```
<gardener-search api="//path/to/api"></gardener-search>
```
#### Options
Set debug property to enable visual logging of actions. Without debugging enabled, only errors will be logged.
```
<gardener-search api="//path/to/api" debug></gardener-search>
```
If the app is running in live environment with debugging disabled, there's still a way to enable it for testing!

**Submit the following form values:**

Person: `debug` - Year: `2000` - Keyword: `true` (`false`to disable)

## Modules

- rxjs
- tailwind css

## Testing local
Since you don't have access to my api, there's an export with mock data in `src/utils/gardeners.ts` (TODO)