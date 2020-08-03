![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

## Getting Started

Run:

```bash
npm install
npm start
```

To build the component for production, run:

```bash
npm run build
```

To run the unit tests for the components, run:

```bash
npm test
```

Need help? Check out our docs [here](https://stenciljs.com/docs/my-first-component).


## CSS Vars

Zur Anpassung an bestehende Webseite können die Farben und Abstände mit CSS Variablen angepasst werden.

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

## Implementierung 

Copy `dist` folder to desired project

#### Load Script

`<script nomodule src="/path/to/dist/cookie-compliance-banner.js"></script>`

Add this code before closing <body> tag:

<gardener-search></gardener-search>

#### Options

<gardener-search cookie-name="Name des Cookies" cookie-domain="example.com"></gardener-search>

#### Text

Siehe index.html dieses Projects

```
<script>
    const banner_content = {
      headline: 'Cookie Einstellungen',
      paragraph: 'Wir verwenden Cookies, um Ihnen ein optimales Webseiten-Erlebnis zu bieten. Dazu zählen Cookies, die für den Betrieb der Seite und für die Steuerung unserer kommerziellen Unternehmensziele notwendig sind, sowie solche, die lediglich zu anonymen Statistikzwecken oder zur Anzeige personalisierter Inhalte genutzt werden. Sie können selbst entscheiden, welche Kategorien Sie zulassen möchten. Bitte beachten Sie, dass auf Basis Ihrer Einstellungen womöglich nicht mehr alle Funktionalitäten der Seite zur Verfügung stehen. Weitere Informationen finden Sie in unseren Datenschutzhinweisen.',
      show_details: 'Details anzeigen',
      description: '<h4>Notwendig</h4><p>Diese Cookies sind für den Betrieb der Seite unbedingt notwendig und ermöglichen beispielsweise sicherheitsrelevante Funktionalitäten. Außerdem können wir mit dieser Art von Cookies ebenfalls erkennen, ob Sie in Ihrem Profil eingeloggt bleiben möchten, um Ihnen unsere Dienste bei einem erneuten Besuch unserer Seite schneller zur Verfügung zu stellen.</p><h4>Statistic</h4><p>Um unser Angebot und unsere Webseite weiter zu verbessern, erfassen wir anonymisierte Daten für Statistiken und Analysen. Mithilfe dieser Cookies können wir beispielsweise die Besucherzahlen und den Effekt bestimmter Seiten unseres Web-Auftritts ermitteln und unsere Inhalte optimieren.</p><h4>Personalisierung</h4><p>Diese Cookies werden genutzt, um Ihnen personalisierte Inhalte, passend zu Ihren Interessen anzuzeigen. Somit können wir Ihnen Angebote präsentieren, die für Sie und ihre geplante Reise besonders relevant sind.</p>',
      checkboxes: [
        {
          key: 'essential',
          label: 'Notwendig',
          readOnly: true,
          disabled: true,
          checked: true
        },
        {
          key: 'statistics', 
          label: 'Statistik',
          attr: ''
        },
        {
          key: 'personalization', 
          label: 'Personalisierung',
          attr: ''
        },
      ],
      buttons: {
        selection: 'Auswahl bestätigen',
        all: 'Alle auswählen'
      }
    }

    const banner = document.querySelector('gardener-search');
    banner.content = banner_content;

  </script>
```






