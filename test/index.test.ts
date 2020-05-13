import { Event } from '../src';

describe('test', () => {
  const EE = new Event();
  const onEmitFn = (payload: any) => {
    expect(payload).not.toBe(undefined);
  };
  test('Event on', () => {
    EE.on('hello', onEmitFn);
    EE.on('hello', onEmitFn);

    expect(EE.cbs['hello'].length).toBe(2);
  });

  test('Event off all', () => {
    EE.off('hello');
    expect(EE.cbs['hello']).toBe(undefined);
  });

  test('Event off', () => {
    EE.on('hello2', onEmitFn);
    EE.on('hello2', onEmitFn);

    EE.off('hello2', onEmitFn);
    expect(EE.cbs['hello2'].length).toBe(1);
    EE.off('hello2', onEmitFn);
    expect(EE.cbs['hello2'].length).toBe(0);
  });

  test('Event once', () => {
    EE.once('hello', onEmitFn);
    EE.emit('hello', 'test');
    expect(EE.cbs['hello'].length).toBe(0);
  });
});
