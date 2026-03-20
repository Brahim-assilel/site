import { Helmet } from "react-helmet-async";
import { BRAND_NAME } from "../../config/brand";

type SeoProps = {
  title: string;
  description: string;
  imageUrl?: string;
  url: string;
  type?: "website" | "article";
};

const DEFAULT_IMAGE_URL = `${window.location.origin}/og-default.png`;

export const Seo = ({
  title,
  description,
  imageUrl,
  url,
  type = "website",
}: SeoProps) => {
  const fullTitle = `${title} | ${BRAND_NAME}`;
  const finalImageUrl = imageUrl || DEFAULT_IMAGE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={finalImageUrl} />
      <meta property="og:site_name" content={BRAND_NAME} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={finalImageUrl} />
    </Helmet>
  );
};
