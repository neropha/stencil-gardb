import { newSpecPage } from '@stencil/core/testing';
import { FilterBar } from '../filter-bar';

describe('filter-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FilterBar],
      html: `<filter-bar></filter-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <filter-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </filter-bar>
    `);
  });
});
