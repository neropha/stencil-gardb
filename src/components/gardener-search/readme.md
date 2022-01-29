# gardener-search



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `api`    | `api`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [loading-spinner](../spinner)
- [filter-bar](../filter-bar)
- [gardener-detail](../detail)
- [gardener-results](../results)

### Graph
```mermaid
graph TD;
  gardener-search --> loading-spinner
  gardener-search --> filter-bar
  gardener-search --> gardener-detail
  gardener-search --> gardener-results
  gardener-results --> results-pagination
  style gardener-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
