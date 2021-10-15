import { appSchema } from '@nozbe/watermelondb/Schema';
import { userSchema } from './userSchema';

export const schemas = appSchema({
  version: 1,
  tables: [userSchema],
});
