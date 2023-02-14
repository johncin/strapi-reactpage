import React from 'react';
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import Editor from './components/Editor';
import getTrad from './utils/getTrad';

export default {
  register(app) {
    const name = pluginPkg.strapi.name;
    const pluginDescription =
      pluginPkg.strapi.description || pluginPkg.description;

    app.customFields.register({
      name,
      pluginId,
      icon: PluginIcon,
      type: 'richtext',
      intlLabel: {
        id: getTrad('reactpage.label'),
        defaultMessage: pluginId,
      },
      intlDescription: {
        id: getTrad('reactpage.description'),
        defaultMessage: pluginDescription,
      },
      components: {
        Input: async () =>
          import(
            /* webpackChunkName: "input-component" */ './components/Editor'
          ),
      },
    });
  },
  bootstrap(app) {},
  async registerTrads({ locales }) {
    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
