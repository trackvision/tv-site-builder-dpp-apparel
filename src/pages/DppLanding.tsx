import Navbar from "@/components/Navbar";
import AuthenticationBadge from "@/components/AuthenticationBadge";
import DppProduct from "@/components/DppProduct";
import ProductDetailsBanner from "@/components/ProductDetailsBanner";
import CTAButton from "@/components/CTAButton";
import ImageCarousel from "@/components/ImageCarousel";
import Manufacturer from "@/components/Manufacturer";
import ProductDetails from "@/components/ProductDetails";
import SizeAndFit from "@/components/SizeAndFit";
import Circularity from "@/components/Circularity";
import Composition from "@/components/Composition";
import EnvironmentalImpact from "@/components/EnvironmentalImpact";
import Compliance from "@/components/Compliance";
import Events from "@/components/Events";
import PassportInfo from "@/components/PassportInfo";
import ScanSurvey from "@/components/ScanSurvey";
import Newsletter from "@/components/Newsletter";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { DppItemTraceProvider } from "@/contexts/DppItemTraceProvider";
import { LanguageProvider } from "@/contexts/LanguageProvider";
import { useDppItemTraceContext } from "@/hooks/useDppItemTraceContext";

function DppLandingContent() {
  const { isLoading, data, error } = useDppItemTraceContext();
  const hasValidData = data && Object.entries(data).length > 0;

  if (isLoading)
    return (
      <div className="flex min-h-svh flex-col items-center justify-center">
        Loading...{" "}
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F3F3]">
      <Navbar />
      {error ? (
        <>
          <div className="text-center py-8 px-6">
            <div className="py-8">
              <h2 className="text-xl font-semibold uppercase tracking-[0.1em] text-primary mb-4">
                Cannot Validate Code
              </h2>
              <p className="text-sm text-gray-600 mb-8 max-w-md mx-auto">
                We were unable to validate this product.
              </p>
              <a
                href="mailto:support@yourbrand.com"
                className="inline-block bg-primary text-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] hover:bg-[#153456] transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
          <ScanSurvey />
          <Newsletter />
          <SocialLinks />
          <Footer />
        </>
      ) : hasValidData ? (
        <>
          <AuthenticationBadge />
          <DppProduct />
          <ProductDetailsBanner />
          <CTAButton />
          <ImageCarousel />
          <div className="bg-white divide-y divide-gray-200">
            <ProductDetails />
            <SizeAndFit />
            <Manufacturer />
            <Composition />
            <Events />
            <EnvironmentalImpact />
            <Circularity />
            <Compliance />
            <PassportInfo />
          </div>
          <ScanSurvey />
          <Newsletter />
          <SocialLinks />
          <Footer />
        </>
      ) : null}
      <CookieConsentBanner />
    </div>
  );
}

export default function DppLanding() {
  return (
    <LanguageProvider>
      <DppItemTraceProvider>
        <DppLandingContent />
      </DppItemTraceProvider>
    </LanguageProvider>
  );
}
