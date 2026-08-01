import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PillarsLadder from "@/components/PillarsLadder";
import CoursesSection from "@/components/CoursesSection";
import FormatBand from "@/components/FormatBand";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import { brand, courses } from "@/lib/content";

function CourseStructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": courses.map((course) => ({
      "@type": "Course",
      name: course.fullTitle,
      description: course.dek,
      provider: {
        "@type": "Organization",
        name: brand.name,
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: `P${course.accessMonths}M`,
      },
      offers: {
        "@type": "Offer",
        price: course.price,
        priceCurrency: "USD",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function Home() {
  return (
    <>
      <CourseStructuredData />
      <Header />
      <main className="flex-1">
        <Hero />
        <PillarsLadder />
        <CoursesSection />
        <FormatBand />
        <PricingSection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
