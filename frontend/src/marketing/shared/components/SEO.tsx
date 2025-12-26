import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  name = 'MancsNapló', 
  type = 'website' 
}) => {
  const siteTitle = title ? `${title} | ${name}` : name;
  const metaDescription = description || "A kutyatartás új dimenziója. Egészségügy, képzés és közösség egyetlen alkalmazásban.";

  return (
    <Helmet>
      {/* Alap Meta Tagek */}
      <title>{siteTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />

      {/* Facebook / Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={metaDescription} />
      {/* Ide később tehetsz egy képet, ami megjelenik megosztáskor */}
      {/* <meta property="og:image" content="https://mancsnaplo.hu/share-image.jpg" /> */}

      {/* Twitter */}
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={metaDescription} />
    </Helmet>
  );
};

export default SEO;