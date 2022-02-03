import { newE2EPage } from '@stencil/core/testing';

describe('gardb-pagination', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gardb-pagination></gardb-pagination>');

    const element = await page.find('gardb-pagination');
    expect(element).toHaveClass('hydrated');
  });
});
