import { newE2EPage } from '@stencil/core/testing';

describe('gardb-results', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gardb-results></gardb-results>');

    const element = await page.find('gardb-results');
    expect(element).toHaveClass('hydrated');
  });
});
