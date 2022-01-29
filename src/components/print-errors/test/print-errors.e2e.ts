import { newE2EPage } from '@stencil/core/testing';

describe('print-errors', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<print-errors></print-errors>');

    const element = await page.find('print-errors');
    expect(element).toHaveClass('hydrated');
  });
});
