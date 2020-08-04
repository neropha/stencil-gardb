import { newE2EPage } from '@stencil/core/testing';

describe('results-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<results-pagination></results-pagination>');

    const element = await page.find('results-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
