import type { Templates } from '@wpengine/headless/react';
import type { NextTemplate } from '@wpengine/headless/next';

const templates: Templates<NextTemplate> = {
  '404': import('./404'),
  'front-pagee': import('./front-pagee'),
  index: import('./index'),
  category: import('./category'),
  page: import('./page'),
  'page-home': import('./page-home'),
  single: import('./single'),
};

export default templates;
