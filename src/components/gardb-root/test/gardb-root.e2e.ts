import { newE2EPage } from '@stencil/core/testing';

describe('gardb-root', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gardb-root></gardb-root>');

    const element = await page.find('gardb-root');
    expect(element).toHaveClass('hydrated');
  });
});
