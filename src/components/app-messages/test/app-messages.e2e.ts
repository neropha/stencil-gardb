import { newE2EPage } from '@stencil/core/testing';

describe('app-messages', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<app-messages></app-messages>');

    const element = await page.find('app-messages');
    expect(element).toHaveClass('hydrated');
  });
});
