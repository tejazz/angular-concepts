import { DetailRoutingPage } from './app.po';

describe('detail-routing App', () => {
  let page: DetailRoutingPage;

  beforeEach(() => {
    page = new DetailRoutingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
