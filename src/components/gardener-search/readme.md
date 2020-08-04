# gardener-search



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `api`    | `api`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [gardener-detail](../detail)
- [gardener-results](../results)
- [loading-spinner](../spinner)

### Graph
```mermaid
graph TD;
  gardener-search --> gardener-detail
  gardener-search --> gardener-results
  gardener-search --> loading-spinner
  gardener-results --> results-pagination
  style gardener-search fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
