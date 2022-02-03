# gardb-results



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type  | Default     |
| --------- | --------- | ----------- | ----- | ----------- |
| `results` | `results` |             | `any` | `undefined` |


## Events

| Event            | Description | Type                            |
| ---------------- | ----------- | ------------------------------- |
| `recordSelected` |             | `CustomEvent<CustomEvent<any>>` |


## Dependencies

### Used by

 - [gardb-search](../gardb-search)

### Depends on

- [gardb-pagination](../gardb-pagination)

### Graph
```mermaid
graph TD;
  gardb-results --> gardb-pagination
  gardb-search --> gardb-results
  style gardb-results fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
