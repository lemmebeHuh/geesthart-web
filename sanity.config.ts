import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'geesthart-placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const sanityConfig = {
  basePath: '/studio',
  name: 'Geesthart_Studio',
  title: 'Geesthart CMS Studio',
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
  },
};

export default sanityConfig;
