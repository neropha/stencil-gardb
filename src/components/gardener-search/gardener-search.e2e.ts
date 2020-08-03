import { newE2EPage } from '@stencil/core/testing';

describe('gardener-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<gardener-search></gardener-search>');
    const element = await page.find('gardener-search');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<gardener-search></gardener-search>');
    const component = await page.find('gardener-search');
    const element = await page.find('gardener-search >>> div');
  });
});
