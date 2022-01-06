import { ToHoursPipe } from './to-hours.pipe';

describe('ToHoursPipe', () => {
  it('create an instance', () => {
    const pipe = new ToHoursPipe();
    expect(pipe).toBeTruthy();
  });
});
