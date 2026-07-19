import { Highlight } from './highlight';

describe('Highlight', () => {
  it('should create an instance', () => {
    const directive = new Highlight({ nativeElement: document.createElement('div') } as any);
    expect(directive).toBeTruthy();
  });
});
