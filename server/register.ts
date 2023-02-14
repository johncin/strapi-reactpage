import { Strapi } from '@strapi/strapi';
import pluginId from '../admin/src/pluginId';
import pluginPkg from '../package.json';

export default ({ strapi }: { strapi: Strapi }) => {
  // registeration phase
  strapi.customFields.register({
    name: pluginPkg.strapi.name,
    plugin: pluginId,
    type: 'richtext',
  });
};
