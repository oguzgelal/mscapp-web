import { MscappWebPage } from './app.po';

describe('mscapp-web App', function() {
  let page: MscappWebPage;

  beforeEach(() => {
    page = new MscappWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
