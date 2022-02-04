import { newSpecPage } from '@stencil/core/testing';
import { AppMessages } from '../app-messages';

describe('app-messages', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AppMessages],
      html: `<app-messages></app-messages>`,
    });
    expect(page.root).toEqualHtml(`<app-messages></app-messages>`);
  });
});
