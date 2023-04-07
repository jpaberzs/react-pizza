import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle cx="140" cy="130" r="130" />
    <rect x="0" y="268" rx="14" ry="14" width="280" height="39" />
    <rect x="0" y="320" rx="18" ry="18" width="280" height="54" />
    <rect x="0" y="391" rx="12" ry="12" width="102" height="31" />
    <rect x="124" y="387" rx="18" ry="18" width="151" height="43" />
  </ContentLoader>
);

export default MyLoader;
