import type, { ITypeofHandler, TypeofResult } from '../';

describe('check typeof', () => {
  test('string', () => {
    expect(type('')).toEqual('string');
    expect(type('hello')).toEqual('string');
    expect(type(new String('helloo'))).toEqual('string');
  });
  test('number', () => {
    expect(type(0)).toEqual('number');
    expect(type(-0)).toEqual('number');
    expect(type(0xff)).toEqual('number');
    expect(type(-3.142)).toEqual('number');
    expect(type(Infinity)).toEqual('number');
    expect(type(-Infinity)).toEqual('number');
    expect(type(NaN)).toEqual('number');
    expect(type(Number(53))).toEqual('number');
    expect(type(new Number(53))).toEqual('number');
  });
  test('boolean', () => {
    expect(type(true)).toEqual('boolean');
    expect(type(false)).toEqual('boolean');
    expect(type(new Boolean(true))).toEqual('boolean');
  });
  test('undefined', () => {
    expect(type(undefined)).toEqual('undefined');
  });
  test('null', () => {
    expect(type(null)).toEqual('null');
  });
  test('symbol', () => {
    expect(type(Symbol())).toEqual('symbol');
    expect(type(Symbol.species)).toEqual('symbol');
  });
  test('arguments', () => {
    expect(
      (function() {
        return type(arguments);
      })(),
    ).toEqual('arguments');
  });
  test('function', () => {
    expect(type(function() {})).toEqual('function');
    expect(type(new Function())).toEqual('function');
    expect(type(class {})).toEqual('function');
  });
  test('regexp', () => {
    expect(type(/^(.+)$/)).toEqual('regexp');
    expect(type(new RegExp('^(.+)$'))).toEqual('regexp');
  });
  test('date', () => {
    expect(type(new Date())).toEqual('date');
  });
  test('set', () => {
    expect(type(new Set())).toEqual('set');
  });
  test('map', () => {
    expect(type(new Map())).toEqual('map');
  });
  test('weakset', () => {
    expect(type(new WeakSet())).toEqual('weakset');
  });
  test('weakmap', () => {
    expect(type(new WeakMap())).toEqual('weakmap');
  });
  test('array', () => {
    expect(type([])).toEqual('array');
    expect(type(Array(5))).toEqual('array');
  });
  test('object', () => {
    expect(type({})).toEqual('object');
    expect(type(new Object())).toEqual('object');
    expect(type(Object())).toEqual('object');
    expect(type(new (class A {})())).toEqual('object');
  });

  test('handler before & after', () => {
    class A {}
    type newType = TypeofResult | 'classAInstance';

    const handlerBefore: ITypeofHandler<newType> = {
      before: true,
      handler: (value, preview) => {
        expect(preview).toBe(undefined);
        return value instanceof A;
      },
      typeName: 'classAInstance',
    };

    const handlerAfter: ITypeofHandler<newType> = {
      handler: (value, preview) => {
        expect(preview).toBe('object');
        return value instanceof A;
      },
      typeName: 'classAInstance',
    };

    expect(type<newType>(new A())).toEqual('object');
    expect(
      type<newType>(new A(), [handlerBefore]),
    ).toEqual('classAInstance');

    expect(
      type<newType>(new A(), [handlerAfter]),
    ).toEqual('classAInstance');
  });
});
