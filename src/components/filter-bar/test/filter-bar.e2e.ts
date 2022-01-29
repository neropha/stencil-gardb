import { newE2EPage } from '@stencil/core/testing';

describe('filter-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<filter-bar></filter-bar>');

    const element = await page.find('filter-bar');
    expect(element).toHaveClass('hydrated');
  });
});
