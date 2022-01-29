import { newSpecPage } from '@stencil/core/testing';
import { PrintErrors } from '../print-errors';

describe('print-errors', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PrintErrors],
      html: `<print-errors></print-errors>`,
    });
    expect(page.root).toEqualHtml(`
      <print-errors>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </print-errors>
    `);
  });
});
