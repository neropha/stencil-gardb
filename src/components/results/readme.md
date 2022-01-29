# gardener-results



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

 - [gardener-search](../gardener-search)

### Depends on

- [results-pagination](../pagination)

### Graph
```mermaid
graph TD;
  gardener-results --> results-pagination
  gardener-search --> gardener-results
  style gardener-results fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
