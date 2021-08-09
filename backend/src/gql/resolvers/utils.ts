import { ForbiddenError } from 'apollo-server';
import type { GqlContext } from '../context';

export const withAuthorization = (fn: Function) => (parent: any, args: any, ctx: GqlContext) => {
  if (ctx.user === null) {
    throw new ForbiddenError('You are not allowed to access this part of the Graph');
  }

  return fn(parent, args, ctx);
};

/**
 * Builds a relay-compatible id.
 * Relay compatible IDs are globally unique, which for this app will be a combination of the table name and table id.
 * @param type
 * @param dbId
 * @returns {string}
 */
export const encodeId = (type: string, dbId: number) => {
  return Buffer.from(`${type}:${dbId}`).toString('base64');
};

/**
 * Decodes the relay-compatible id back to its numeric db record id.
 *
 * @param encodedId
 * @returns {number}
 */
export const decodeId = (encodedId: string) => {
  const [type, id] = Buffer.from(encodedId, 'base64').toString().split(':');
  return { type, id: parseInt(id, 10) };
};
