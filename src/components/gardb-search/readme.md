# gardb-search



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `api`    | `api`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [app-loading](../spinner)
- [gardb-filters](../gardb-filters)
- [gardb-detail](../gardb-detail)
- [gardb-results](../gardb-results)

### Graph
```mermaid
graph TD;
  gardb-search --> app-loading
  gardb-search --> gardb-filters
  gardb-search --> gardb-detail
  gardb-search --> gardb-results
  gardb-results --> gardb-pagination
  style gardb-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
