export type TypeofResult =
  | 'string'
  | 'number'
  | 'boolean'
  | 'undefined'
  | 'null'
  | 'symbol'
  | 'arguments'
  | 'function'
  | 'regexp'
  | 'date'
  | 'set'
  | 'map'
  | 'weakset'
  | 'weakmap'
  | 'array'
  | 'object';

export interface ITypeofHandler<T> {
  typeName: T | TypeofResult;
  handler: (value: any, previewType: T) => boolean;
  before?: boolean;
}

export default function<T = TypeofResult>(value: any, handlers?: ITypeofHandler<T>[]): T {
  if (handlers && handlers.length > 0) {
    const before = handlers.filter(m => m && m.before);
    if (before.length > 0) {
      for (const handler of before) {
        if (handler.handler(value, void 0)) return handler.typeName as T;
      }
    }
  }
  const regex = /^\[object (\S+?)\]$/;
  const matches = Object.prototype.toString.call(value).match(regex) || [];

  const name = (matches[1] || typeof value).toLowerCase() as T;

  if (handlers && handlers.length > 0) {
    const after = handlers.filter(m => m && !m.before);
    if (after.length > 0) {
      for (const handler of after) {
        if (handler.handler(value, name)) return handler.typeName as T;
      }
    }
  }

  return name;
}
