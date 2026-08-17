import React from 'react';
import SEO from './seo';
import StickyBar from './ui/StickyBar';
import { I18nProvider } from '../context/i18nContext';

const TemplateBase = ({ children, pageContext, seoData }) => (
  <I18nProvider>
    <>
      <SEO {...seoData} />
      <StickyBar pageContext={pageContext} />
      {children}
    </>
  </I18nProvider>
);

export default TemplateBase;