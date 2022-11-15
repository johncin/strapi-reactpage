import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: 'strapi-reactpage',
    plugin: 'strapi-reactpage',
    type: 'string',
  });
};
