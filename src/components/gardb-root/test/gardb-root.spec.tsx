import { newSpecPage } from '@stencil/core/testing';
import { GardbRoot } from '../gardb-root';

describe('gardb-root', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GardbRoot],
      html: `<gardb-root></gardb-root>`,
    });
    expect(page.root).toEqualHtml(`
      <gardb-root>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gardb-root>
    `);
  });
});
