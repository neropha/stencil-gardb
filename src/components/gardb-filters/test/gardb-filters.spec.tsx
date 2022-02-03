import { newSpecPage } from '@stencil/core/testing';
import { FilterBar } from '../gardb-filters';

describe('gardb-filters', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FilterBar],
      html: `<gardb-filters></gardb-filters>`,
    });
    expect(page.root).toEqualHtml(`
      <gardb-filters>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gardb-filters>
    `);
  });
});
