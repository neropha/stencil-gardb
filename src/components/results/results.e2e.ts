import { newE2EPage } from '@stencil/core/testing';

describe('gardener-results', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gardener-results></gardener-results>');

    const element = await page.find('gardener-results');
    expect(element).toHaveClass('hydrated');
  });
});
