import React from 'react';

// import Section from './section';
import HeroBanner from './hero-banner';
// import BlogBanner from './blog-banner';
// import CardSection from './card-section';
// import TeamSection from './team-section';
// import BlogSection from './blog-section';
// import SectionBucket from './section-bucket';
// import AboutSectionBucket from './about-section-bucket';
// import SectionWithHtmlCode from './section-with-html-code';
import { RenderProps } from "../typescript/component";

export default function RenderComponents(props: RenderProps) {
  const { pageComponent, entryUid, contentTypeUid, locale } = props;
  console.log("Props in renderComponent ---->", props, pageComponent)
  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {pageComponent?.hero_banner && 
      // <section className="py-16 text-center bg-white border-b">
        <HeroBanner
          banner={pageComponent.hero_banner}
          // key={`component-${key}`}
        />}
      {pageComponent?.trusted_brands_section && (<section className="py-16 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gray-600 text-lg mb-8">{pageComponent.trusted_brands_section?.heading}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
                {pageComponent.trusted_brands_section?.brands?.map(
                  (brand, index) => (
                    <div key={index} className="flex items-center justify-center h-12">
                      <span className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                        {brand}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>)}
  
      {pageComponent?.product_showcase_section && (<section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{pageComponent?.product_showcase_section?.title}</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {pageComponent?.product_showcase_section?.description}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                <div className="space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-700 rounded-full px-4 py-2 text-sm font-medium">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>{pageComponent?.product_showcase_section.group[0].title}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{pageComponent?.product_showcase_section.group[0].h3}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {pageComponent?.product_showcase_section.group[0].description}
                  </p>
                  <ul className="space-y-3">
                    {pageComponent?.product_showcase_section.group[0]?.feature.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-6">
                        <h4 className="font-semibold text-gray-900">Content Editor</h4>
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-20 bg-gray-100 rounded"></div>
                        <div className="flex space-x-2">
                          <div className="h-8 bg-purple-200 rounded px-4 flex-1"></div>
                          <div className="h-8 bg-blue-200 rounded px-4 flex-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div className="order-2 lg:order-1 relative">
                  <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-white mb-6">{pageComponent?.product_showcase_section?.group[1].h4}</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {pageComponent?.product_showcase_section.group[1]?.metric.value.map((metric, index) => (
                        <div key={index} className="bg-white/20 rounded-lg p-4">
                          <div className="text-2xl font-bold">{metric.value}</div>
                          <div className="text-sm opacity-90">{metric.key}</div>
                        </div>
                      ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-medium">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>{pageComponent?.product_showcase_section.group[1].title}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{pageComponent?.product_showcase_section.group[1].h3}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                  {pageComponent?.product_showcase_section.group[1].description}
                  </p>
                  <ul className="space-y-3">
                    {pageComponent?.product_showcase_section.group[1].feature.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>)}

      {/* {pageComponents?.map((component, key: number) => {
         console.log("Compoenent in renderComponent ---->", component)
      
        if (component.hero_banner) {
          return blogPost ? (
            <BlogBanner
              blogBanner={component.hero_banner}
              key={`component-${key}`}
            />
          ) : (
            <HeroBanner
              banner={component.hero_banner}
              key={`component-${key}`}
            />
          );
        }
        if (component.section) {
          return (
            <Section section={component.section} key={`component-${key}`} />
          );
        }
        if (component.section_with_buckets) {
          return component.section_with_buckets.bucket_tabular ? (
            <AboutSectionBucket
              sectionWithBuckets={component.section_with_buckets}
              key={`component-${key}`}
            />
          ) : (
            <SectionBucket
              section={component.section_with_buckets}
              key={`component-${key}`}
            />
          );
        }
        if (component.from_blog) {
          return (
            <BlogSection
              fromBlog={component.from_blog}
              key={`component-${key}`}
            />
          );
        }
        if (component.section_with_cards) {
          return (
            <CardSection
              cards={component.section_with_cards.cards}
              key={`component-${key}`}
            />
          );
        }
        if (component.section_with_html_code) {
          return (
            <SectionWithHtmlCode
              embedCode={component.section_with_html_code}
              key={`component-${key}`}
            />
          );
        }
        if (component.our_team) {
          return (
            <TeamSection
              ourTeam={component.our_team}
              key={`component-${key}`}
            />
          );
        }
      })} */}
    </div>
  );
}
