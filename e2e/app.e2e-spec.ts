import { IamplusPage } from './app.po';

describe('iamplus App', () => {
  let page: IamplusPage;

  beforeEach(() => {
    page = new IamplusPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('I am Plus');
  });
});
