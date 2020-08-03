import { newE2EPage } from '@stencil/core/testing';

describe('gardener-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gardener-detail></gardener-detail>');

    const element = await page.find('gardener-detail');
    expect(element).toHaveClass('hydrated');
  });
});
