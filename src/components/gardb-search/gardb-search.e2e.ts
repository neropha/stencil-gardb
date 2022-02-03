import { newE2EPage } from '@stencil/core/testing';

describe('gardb-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gardb-search></gardb-search>');
    const element = await page.find('gardb-search');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<gardb-search></gardb-search>');
    const component = await page.find('gardb-search');
    const element = await page.find('gardb-search >>> div');
  });
});
