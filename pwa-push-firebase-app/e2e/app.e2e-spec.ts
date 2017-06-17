import { PwaPushFirebasePage } from './app.po';

describe('pwa-push-firebase App', () => {
  let page: PwaPushFirebasePage;

  beforeEach(() => {
    page = new PwaPushFirebasePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
