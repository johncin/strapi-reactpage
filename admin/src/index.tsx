import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import Editor from './components/Editor';

export default {
  register(app) {
    const name = pluginPkg.strapi.name;
    const pluginDescription =
      pluginPkg.strapi.description || pluginPkg.description;

    const plugin = {
      blockerComponent: null,
      blockerComponentProps: {},
      description: pluginDescription,
      intlLabel: {
        id: pluginId,
        defaultMessage: pluginId,
      },
      id: pluginId,
      initializer: Initializer,
      isReady: true,
      name,
    };

    app.registerPlugin(plugin);

    app.customFields.register({
      name,
      pluginId,
      type: 'json',
      intlLabel: {
        id: pluginId,
        defaultMessage: pluginId,
      },
      intlDescription: {
        id: pluginId,
        defaultMessage: pluginDescription,
      },
      components: {
        Input: async () => import('./components/Editor/index'),
      },
    });
  },
  bootstrap(app) {},
};
