'use client'

import Image from "next/image";
// import ContentstackLivePreview from "@contentstack/live-preview-utils";
// import contentstack from "contentstack";
import { useEffect, useState } from "react";
import { getEntries } from "../../helper/getEntries"
// import { fetchHomePage, initializeLP, Stack } from "./cs-sdk/index.js";
// import { ChevronDown, Play, ArrowRight, Menu, X, Star, Users, Globe, Zap } from "lucide-react"
import Personalize from "@contentstack/personalize-edge-sdk";
import "./page.css"
import RenderComponents from "../../components/render-components";
import { Component } from "../../typescript/component";
// import { Image } from "../typescript/action";
// import { Entry, HeaderProps ,FooterProps } from "./layout";

export const dynamic = 'force-dynamic';

interface page {
  page_components: [];
  pageComponent: Component[];
  uid: string;
  locale: string;
  url: string;
  title: string;
}


export default function Home(searchParams: Record<string, string>) {
  // const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);
  const [getEntry, setEntry] = useState<page>({});
  
// personalize

  async function getDataForWebpage(){
    // let psl = await Personalize.init("68cd07a52aadb24f2c3c5cdd", {
    //     // liveAttributes : {
    //     //   [role] : true
    //     // }
    //   });
    // let varaliases = await psl.getVariantAliases();
    console.log("searchParams---->", Personalize.VARIANT_QUERY_PARAM, searchParams[Personalize.VARIANT_QUERY_PARAM]);
          
    // let variantParam = decodeURIComponent(
    //   searchParams[Personalize.VARIANT_QUERY_PARAM]
    // );
    let variantParam = "0_0";

    let [homepageEntry] = await getEntries(
      process.env.NEXT_PUBLIC_CONTENTSTACK_WEBPAGE_CONTENTTYPE_UID as string,
      {},
      variantParam,
    ) as any[];

      console.log("homepageEntry------->", homepageEntry);
      setEntry(homepageEntry);
  }
  useEffect(() => {
    // const experienceShortUids = (process.env.NEXT_PUBLIC_CONTENTSTACK_WEBPAGE_EXPERIENCES as string).split(',');
    // console.log("Params experienceShortUids---->", experienceShortUids)
    getDataForWebpage();
  },[])
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden" suppressHydrationWarning>
      {/* Top Banner */}
      {/* <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 px-4 text-sm">
        <div className="flex items-center justify-center gap-2">
          <span>Join us in London for ContentCon Europe '25! Register now</span>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </div> */}

      {/* Navigation */}
      {/* Navigation nav will come here */}
      <nav className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
          scrollY > 50 ? "shadow-lg" : ""}`}>
        <div className="flex w-full max-w-480 items-center justify-between px-18">
            <div className="items-center gap-2 md:flex">
                <a className="flex items-center" href="/">
                    <div className="flex w-fit max-w-15 items-center px-0">
                        <Image
                          className="dark size-6 w-fit"
                          src="/CS_OnlyLogo.webp"
                          alt="Contentstack logo"
                          width={60}
                          height={60}
                          priority
                      />
                    </div>
                    <span className="ml-0.5 text-xl font-bold">CONTENTSTACK</span>
                </a>
            </div>
            <ul className="hidden items-center gap-8 text-sm md:flex">
                <li className="text-gray-black hover:text-light-black">
                    <a href="/platform" target="_self" data-test-id="main-nav-link">Platform</a>
                </li>
                <li className="group/dropdown relative" data-dropdown="true"><button
                        className="relative z-10 flex cursor-pointer items-center gap-1 py-2 text-gray-black group-focus-within/dropdown:text-light-black group-hover/dropdown:text-light-black group-active/dropdown:text-light-black hover:text-light-black focus:text-light-black active:text-light-black"
                        aria-haspopup="true" aria-expanded="false">Capabilities</button>
                    <div
                        className="absolute top-full left-1/2 z-50 mt-4.5 hidden w-[327px] -translate-x-1/4 transform flex-col border-transparent bg-shadow-light text-light-black shadow-lg transition-all duration-150 ease-in-out group-focus-within/dropdown:block group-hover/dropdown:block">
                        <div className="absolute -top-[25px] left-0 h-[38px] w-full bg-transparent"></div>
                        <div className="p-6">
                            <div className="mb-6 last:mb-0">
                                <div className="mb-4 text-sm font-normal text-light-black/70">Core products</div>
                                <ul className="flex flex-col gap-3 text-base">
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                        <a href="/platforms/headless-cms" target="_self" data-test-id="nav-link"
                                            tabIndex="0">Headless Content Management</a>
                                    </li>
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                        <a href="/platforms/real-time-cdp" target="_self" data-test-id="nav-link"
                                            tabIndex="0">Real-time Data and Insights</a>
                                    </li>
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                        <a href="/platforms/omnichannel-personalization" target="_self"
                                            data-test-id="nav-link" tabIndex="0">Omnichannel Personalization</a>
                                    </li>
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                          <a
                                            href="/platforms/ai" target="_self" data-test-id="nav-link" tabIndex="0">Agents
                                            &amp; Automations</a></li>
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                          <a
                                            href="/platforms/launch" target="_self" data-test-id="nav-link"
                                            tabIndex="0">Front-end Hosting</a></li>
                                </ul>
                            </div>
                            <div className="mb-6 last:mb-0">
                                <div className="mb-4 text-sm font-normal text-light-black/70">Roles</div>
                                <ul className="flex flex-col gap-3 text-base">
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                        <a href="/roles/developers" target="_self" data-test-id="nav-link"
                                            tabIndex="0">Developer &amp; IT</a></li>
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                        <a href="/roles/business" target="_self" data-test-id="nav-link"
                                            tabIndex="0">Business users</a></li>
                                    <li
                                        className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                        <a href="/roles/leaders" target="_self" data-test-id="nav-link" tabIndex="0">Digital
                                            leaders</a></li>
                                </ul>
                            </div>
                        </div><a href="/solutions" target="_self" data-test-id="nav-link-button" tabIndex="-1"><button
                                className="docs-theme-label flex w-full items-center justify-between bg-dark-light-ameth px-6 py-4 text-base font-normal text-ameth-white hover:bg-violet500-violetLight hover:text-light-black">Explore
                                Solutions<span className="ml-2">→</span></button></a>
                    </div>
                </li>
                <li className="group/dropdown relative" data-dropdown="true"><button
                        className="relative z-10 flex cursor-pointer items-center gap-1 py-2 text-gray-black group-focus-within/dropdown:text-light-black group-hover/dropdown:text-light-black group-active/dropdown:text-light-black hover:text-light-black focus:text-light-black active:text-light-black"
                        tabIndex="0" aria-haspopup="true" aria-expanded="false">Resources</button>
                    <div
                        className="absolute top-full left-1/2 z-50 mt-4.5 hidden w-[327px] -translate-x-1/4 transform flex-col border-transparent bg-shadow-light text-light-black shadow-lg transition-all duration-150 ease-in-out group-focus-within/dropdown:block group-hover/dropdown:block">
                        <div className="absolute -top-[25px] left-0 h-[38px] w-full bg-transparent"></div>
                        <div className="p-6">
                            <ul className="flex flex-col gap-3 text-base">
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/academy" target="_self" data-test-id="nav-link" tabIndex="0">Academy</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/case-studies" target="_self" data-test-id="nav-link" tabIndex="0">Case
                                        studies</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/docs" target="_self" data-test-id="nav-link" tabIndex="0">Documentation</a>
                                </li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/resources" target="_self" data-test-id="nav-link" tabIndex="0">Resources
                                        center</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/blog" target="_self" data-test-id="nav-link" tabIndex="0">Blog</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="https://discord.com/invite/NyWJ68gdDw" target="_blank" data-test-id="nav-link"
                                        tabIndex="0">Developer community</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/platform-updates" target="_self" data-test-id="nav-link" tabIndex="0">Product
                                        updates</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/events" target="_self" data-test-id="nav-link" tabIndex="0">Events</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
                <li className="text-gray-black hover:text-light-black"><a href="/pricing" target="_self"
                        data-test-id="main-nav-link">Plans</a></li>
                <li className="text-gray-black hover:text-light-black"><a href="/partners/solutions" target="_self"
                        data-test-id="main-nav-link">Partners</a></li>
                <li className="group/dropdown relative" data-dropdown="true"><button
                        className="relative z-10 flex cursor-pointer items-center gap-1 py-2 text-gray-black group-focus-within/dropdown:text-light-black group-hover/dropdown:text-light-black group-active/dropdown:text-light-black hover:text-light-black focus:text-light-black active:text-light-black"
                        tabIndex="0" aria-haspopup="true" aria-expanded="false">Company</button>
                    <div
                        className="absolute top-full left-1/2 z-50 mt-4.5 hidden w-[327px] -translate-x-1/4 transform flex-col border-transparent bg-shadow-light text-light-black shadow-lg transition-all duration-150 ease-in-out group-focus-within/dropdown:block group-hover/dropdown:block">
                        <div className="absolute -top-[25px] left-0 h-[38px] w-full bg-transparent"></div>
                        <div className="p-6">
                            <ul className="flex flex-col gap-3 text-base">
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/about" target="_self" data-test-id="nav-link" tabIndex="0">About us</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/company/awards" target="_self" data-test-id="nav-link" tabIndex="0">Awards</a>
                                </li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/company/social-responsibility" target="_self" data-test-id="nav-link"
                                        tabIndex="0">Social responsibility</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/company/press" target="_self" data-test-id="nav-link" tabIndex="0">Press
                                        releases</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/company/careers" target="_self" data-test-id="nav-link"
                                        tabIndex="0">Careers</a></li>
                                <li
                                    className="flex items-center gap-3 transition-colors duration-200 hover:text-violet-300">
                                    <a href="/company/contact-us" target="_self" data-test-id="nav-link"
                                        tabIndex="0">Contact</a></li>
                            </ul>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">  
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800">
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent"></div>
          {/* Floating geometric shapes */}
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-40 right-40 w-24 h-24 bg-white/5 rounded-lg rotate-45 animate-float-delayed"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white space-y-8 animate-in slide-in-from-left-8 duration-1000">
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span>1:1 PERSONALIZATION ON EVERY CHANNEL</span>
                </div>
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight"></h1>
                <span className="text-xl text-gray-200 max-w-lg leading-relaxed">PERSONALIZED DIGITAL EXPERIENCES IN REAL TIME</span>
                {/* <p dangerouslySetInnerHTML={{__html : entry.headline}} >
                </p> */}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                  <span className="flex items-center justify-center gap-2">
                    EXPLORE EDGE
                  </span>
                </button>
                <button className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-white/30">
                  <span className="flex items-center justify-center gap-2">
                    PERSONALIZE THIS PAGE
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - Interactive Demo */}
            <div className="relative animate-in slide-in-from-right-8 duration-1000 delay-300">
              <div className="relative">
                {/* Main demo container */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white text-lg font-semibold">Live Personalization Demo</h3>
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                    </div>

                    {/* Demo content */}
                    <div className="space-y-4">
                      <div className="bg-white/20 rounded-lg p-4 animate-pulse">
                        <div className="h-4 bg-white/30 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-1/2"></div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 animate-pulse delay-100">
                        <div className="h-4 bg-white/30 rounded w-2/3 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-3/4"></div>
                      </div>
                      <div className="bg-white/20 rounded-lg p-4 animate-pulse delay-200">
                        <div className="h-4 bg-white/30 rounded w-1/2 mb-2"></div>
                        <div className="h-3 bg-white/20 rounded w-2/3"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-purple-400 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          {/* <ChevronDown className="w-6 h-6 text-white/70" /> */}
        </div>
      </section>

      {/* Trusted Brands Section */}
      {/* Product Showcase Section */}
      {getEntry?.page_components?.map((pageComponent, key: number) => <RenderComponents
              key={`component-${key}`}
              pageComponent={pageComponent}
              entryUid={getEntry.uid}
              contentTypeUid={process.env.NEXT_PUBLIC_CONTENTSTACK_WEBPAGE_CONTENTTYPE_UID as string}
              locale={getEntry.locale}
            ></RenderComponents>
      )}

      
      
      {/* Statistics Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-xl text-gray-600">See the impact Contentstack delivers for businesses worldwide</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "500+", label: "Enterprise Customers", description: "Trust Contentstack globally" },
              { number: "99.9%", label: "Uptime SLA", description: "Guaranteed reliability" },
              { number: "10x", label: "Faster Deployment", description: "Compared to traditional CMS" },
              { number: "40%", label: "Increase in Conversions", description: "Average customer improvement" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 mb-4 group-hover:shadow-xl transition-shadow">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonial Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
            <p className="text-xl text-gray-600">Hear from the teams building amazing experiences with Contentstack</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Contentstack has transformed how we deliver content across all our digital channels. The speed and flexibility are unmatched.",
                author: "Sarah Johnson",
                role: "Head of Digital Experience",
                company: "Global Retail Corp",
              },
              {
                quote:
                  "The personalization capabilities have increased our conversion rates by 45%. It's been a game-changer for our business.",
                author: "Michael Chen",
                role: "VP of Marketing",
                company: "TechStart Inc",
              },
              {
                quote:
                  "Our development team loves the API-first approach. We can now launch new experiences in days, not months.",
                author: "Emily Rodriguez",
                role: "Lead Developer",
                company: "Innovation Labs",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="mb-6">
                  <svg className="w-8 h-8 text-purple-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <p className="text-gray-700 text-lg leading-relaxed">{testimonial.quote}</p>
                </div>
                <div className="border-t pt-6">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-gray-600">{testimonial.role}</div>
                  <div className="text-purple-600 font-medium">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-in fade-in-50 duration-1000">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Leading Brands Choose Contentstack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Deliver exceptional digital experiences with our composable content platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                //icon: <Zap className="w-8 h-8" />,
                title: "Lightning Fast",
                description: "Deploy content changes in seconds, not hours",
              },
              {
                //icon: <Globe className="w-8 h-8" />,
                title: "Global Scale",
                description: "Reach audiences worldwide with edge delivery",
              },
              {
                //icon: <Users className="w-8 h-8" />,
                title: "Team Collaboration",
                description: "Empower teams to work together seamlessly",
              },
              {
                //icon: <Star className="w-8 h-8" />,
                title: "Enterprise Ready",
                description: "Built for security, compliance, and scale",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-in fade-in-50 duration-1000"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="animate-in fade-in-50 duration-1000">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Digital Experience?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of brands delivering personalized experiences at scale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                <span className="flex items-center justify-center gap-2">
                  Start Free Trial
                  {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
                </span>
              </button>
              <button className="bg-purple-500 hover:bg-purple-400 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 border border-purple-400">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span className="text-xl font-bold">CONTENTSTACK</span>
              </div>
              <p className="text-gray-400">The composable content platform for modern digital experiences.</p>
            </div>

            {["Platform", "Solutions", "Resources", "Company"].map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section}</h3>
                <ul className="space-y-2 text-gray-400">
                  <li className="hover:text-white cursor-pointer transition-colors">Overview</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Contentstack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}