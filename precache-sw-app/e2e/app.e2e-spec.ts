import { SwTestPage } from './app.po';

describe('sw-test App', () => {
  let page: SwTestPage;

  beforeEach(() => {
    page = new SwTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
