import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO = ({ title, description, path = "" }) => {
    const { t } = useTranslation();

    const siteTitle = "VITA - Bracciano";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const metaDescription = description || "VITA Bar Bracciano - Colazioni, Pranzi, Aperitivi ed Eventi. Un'esperienza di gusto autentico in una location esclusiva.";

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="canonical" href={`https://vita-bracciano.com${path}`} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content="website" />
        </Helmet>
    );
};

export default SEO;
