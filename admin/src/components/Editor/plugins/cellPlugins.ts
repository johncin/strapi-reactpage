import type { CellPluginList } from '@react-page/editor';

// The background plugin
import background, { ModeEnum } from '@react-page/plugins-background';
import '@react-page/plugins-background/lib/index.css';

// The divider plugin
import divider from '@react-page/plugins-divider';
import '@react-page/plugins-divider/lib/index.css';

// The html5-video plugin
import html5video from '@react-page/plugins-html5-video';
import '@react-page/plugins-html5-video/lib/index.css';

// The image plugin
import type { ImageUploadType } from '@react-page/plugins-image';
import { imagePlugin } from '@react-page/plugins-image';
import '@react-page/plugins-image/lib/index.css';

// The spacer plugin
import spacer from '@react-page/plugins-spacer';
import '@react-page/plugins-spacer/lib/index.css';

// The video plugin
import video from '@react-page/plugins-video';
import '@react-page/plugins-video/lib/index.css';

// The slate plugin
import slate from '@react-page/plugins-slate';
import '@react-page/plugins-slate/lib/index.css';

import imageUploadService from './imageUploadService';
// no-commit put custom plugin imports here
// no-commit

const cellPlugins: CellPluginList = [
  slate(),
  spacer,
  imagePlugin({
    imageUpload: imageUploadService(),
  }),
  video,
  divider,
  html5video,
  background({
    imageUpload: imageUploadService(),
  }),
  // no-commit put custom plugins here
  // no-commit
];

export default cellPlugins;
