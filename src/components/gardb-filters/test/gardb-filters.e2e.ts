import { newE2EPage } from '@stencil/core/testing';

describe('gardb-filters', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gardb-filters></gardb-filters>');

    const element = await page.find('gardb-filters');
    expect(element).toHaveClass('hydrated');
  });
});
