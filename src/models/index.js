// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, Plant } = initSchema(schema);

export {
  User,
  Plant
};