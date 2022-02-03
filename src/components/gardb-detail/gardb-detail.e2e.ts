import { newE2EPage } from '@stencil/core/testing';

describe('gardb-detail', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gardb-detail></gardb-detail>');

    const element = await page.find('gardb-detail');
    expect(element).toHaveClass('hydrated');
  });
});
