import { AuthFirebaseAppPage } from './app.po';

describe('auth-firebase-app App', () => {
  let page: AuthFirebaseAppPage;

  beforeEach(() => {
    page = new AuthFirebaseAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
