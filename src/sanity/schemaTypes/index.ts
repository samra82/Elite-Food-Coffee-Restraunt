import { type SchemaTypeDefinition } from 'sanity'
import chef from './chefs';
import food from './foods';
import user from './user';
import order from './order';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [food , chef , user , order],
}
