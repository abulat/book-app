import { beforeEach, describe, expect, it } from 'vitest';
import {
  renderAuthor,
  getAuthorData,
  setAuthorData
} from '../src/js/app.js';

describe('Author rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="site-author-name">Author</div>
      <h1 id="author-name">Author Name</h1>
      <p id="author-bio">Bio text</p>
    `;
  });

  it('should render author name in navbar', () => {
    const authorData = {
      name: { en: 'Ales Begood', be: 'Алесь Бігуд' },
      bio: { en: 'English bio', be: 'Беларускае баіа' }
    };
    setAuthorData(authorData);
    renderAuthor('en');
    
    expect(document.getElementById('site-author-name').textContent).toBe('Ales Begood');
  });

  it('should render author name in hero section', () => {
    const authorData = {
      name: { en: 'Ales Begood', be: 'Алесь Бігуд' },
      bio: { en: 'English bio', be: 'Беларускае баіа' }
    };
    setAuthorData(authorData);
    renderAuthor('en');
    
    expect(document.getElementById('author-name').textContent).toBe('Ales Begood');
  });

  it('should render author bio', () => {
    const authorData = {
      name: { en: 'Ales Begood', be: 'Алесь Бігуд' },
      bio: { en: 'English bio', be: 'Беларускае баіа' }
    };
    setAuthorData(authorData);
    renderAuthor('en');
    
    expect(document.getElementById('author-bio').textContent).toBe('English bio');
  });

  it('should render author data in Belarusian', () => {
    const authorData = {
      name: { en: 'Ales Begood', be: 'Алесь Бігуд' },
      bio: { en: 'English bio', be: 'Беларускае баіа' }
    };
    setAuthorData(authorData);
    renderAuthor('be');
    
    expect(document.getElementById('site-author-name').textContent).toBe('Алесь Бігуд');
    expect(document.getElementById('author-name').textContent).toBe('Алесь Бігуд');
    expect(document.getElementById('author-bio').textContent).toBe('Беларускае баіа');
  });

  it('should get author data', () => {
    const authorData = {
      name: { en: 'Ales Begood', be: 'Алесь Бігуд' }
    };
    setAuthorData(authorData);
    expect(getAuthorData()).toEqual(authorData);
  });
});
