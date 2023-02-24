import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Stack,
  Flex,
  Field,
  FieldLabel,
  Typography,
  useTheme,
  darkTheme,
} from '@strapi/design-system';
import { Landscape, Cross } from '@strapi/icons';
import { useIntl } from 'react-intl';
import styled, { css } from 'styled-components';
import { createTheme, IconButton, Modal, Paper } from '@mui/material';
import ReactPageEditor, { defaultThemeOptions } from '@react-page/editor';
import slate from '@react-page/plugins-slate';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import css1 from '@react-page/editor/lib/index.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import css2 from '@react-page/plugins-slate/lib/index.css';

import cellPlugins from './plugins/cellPlugins';
import pluginId from '../../pluginId';
import getTrad from '../../utils/getTrad';

const LANGUAGES = [
  {
    lang: 'de',
    label: 'Deutsch',
  },
  {
    lang: 'en',
    label: 'English',
  },
  {
    lang: 'fr',
    label: 'French',
  },
  {
    lang: 'se',
    label: 'Svenska',
  },
];

const reactPageDarkTheme = createTheme({
  ...defaultThemeOptions,
  palette: { mode: 'dark' },
});

const useIsDarkMode = () => {
  const theme = useTheme();

  return theme.colors.neutral0 === darkTheme.colors.neutral0;
};

const Editor = ({
  attribute,
  name,
  onChange,
  value,
  intlLabel,
  disabled,
  error,
  description,
  required,
}) => {
  const isDarkMode = useIsDarkMode();
  const { formatMessage } = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lang = attribute.options?.advanced?.lang ?? 'default';

  return (
    <Wrapper isDarkMode={isDarkMode}>
      <style>
        {css1}
        {css2}
      </style>
      <Stack spacing={1}>
        <Box style={{ marginBottom: 2 }}>
          {intlLabel && (
            <Typography variant="pi" fontWeight="bold">
              {formatMessage(intlLabel)}
            </Typography>
          )}
          {required && (
            <Typography variant="pi" fontWeight="bold" textColor="danger600">
              *
            </Typography>
          )}
        </Box>
        <ReactPageEditor
          uiTheme={isDarkMode ? reactPageDarkTheme : undefined}
          sidebarPosition="rightRelative"
          lang={lang}
          languages={LANGUAGES}
          cellPlugins={cellPlugins}
          value={JSON.parse(value)}
          onChange={(data) => {
            onChange({ target: { name, value: JSON.stringify(data) } });
          }}
        />
        {error && (
          <Typography variant="pi" textColor="danger600">
            {formatMessage({ id: error, defaultMessage: error })}
          </Typography>
        )}
        {description && (
          <Typography variant="pi">{formatMessage(description)}</Typography>
        )}
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  h1 {
    font-size: 2em;
    margin-bottom: 1em;
  }

  h2 {
    font-size: 1.8em;
    margin-bottom: 1em;
  }

  h3 {
    font-size: 1.6em;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 1em;
    line-height: 1.3;
  }
  li {
    margin-bottom: 1em;
  }
  ul {
    margin-left: 20px;
    li {
      list-style-type: disc;
    }
  }
  ol {
    margin-left: 20px;
    li {
      list-style-type: decimal;
    }
  }
  margin-right: 50px;
  ${(p) =>
    p.isDarkMode
      ? css`
          color: white;
        `
      : null}
`;

Editor.defaultProps = {
  description: undefined,
  disabled: false,
  error: undefined,
  intlLabel: undefined,
  name: '',
  onChange: () => {},
  required: false,
  value: null,
};

Editor.propTypes = {
  attribute: PropTypes.object.isRequired,
  description: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  intlLabel: PropTypes.shape({
    id: PropTypes.string,
    defaultMessage: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  value: PropTypes.string,
};

export default Editor;
