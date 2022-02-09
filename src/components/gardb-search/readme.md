# gardb-search



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default     |
| -------- | --------- | ----------- | --------- | ----------- |
| `api`    | `api`     |             | `string`  | `undefined` |
| `debug`  | `debug`   |             | `boolean` | `false`     |


## Dependencies

### Depends on

- [app-messages](../app-messages)
- [app-loading](../app-loading)
- [gardb-filters](../gardb-filters)
- [gardb-results](../gardb-results)

### Graph
```mermaid
graph TD;
  gardb-search --> app-messages
  gardb-search --> app-loading
  gardb-search --> gardb-filters
  gardb-search --> gardb-results
  gardb-results --> gardb-pagination
  style gardb-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
