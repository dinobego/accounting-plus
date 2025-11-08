'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { ArrowLeft, Clock, Calendar, Share2, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { blogPostsData } from '@/lib/blogData';

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Članak nije pronađen</h1>
            <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 cursor-pointer font-semibold">
              <ArrowLeft size={20} className="mr-2" />
              Nazad na blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pt-32 pb-20">
        {/* Hero Section sa Image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative w-full h-96 overflow-hidden"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white"
            >
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-semibold">
                  {post.category}
                </span>
                <div className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-full text-sm backdrop-blur">
                  <Clock size={16} />
                  <span>{post.readTime} min čitanja</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="container mx-auto max-w-4xl px-4 py-16"
        >
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 cursor-pointer font-semibold mb-8 hover:translate-x-1 transition-transform"
          >
            <ArrowLeft size={20} className="mr-2" />
            Nazad na blog
          </Link>

          {/* Title and Meta */}
          <div className="mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              {post.title}
            </motion.h1>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 text-gray-600 border-t border-b border-gray-200 py-6"
            >
              <div className="flex items-center space-x-2">
                <Calendar size={20} className="text-blue-600" />
                <span>{new Date(post.date).toLocaleDateString('sr-RS')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock size={20} className="text-blue-600" />
                <span>{post.readTime} min čitanja</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen size={20} className="text-blue-600" />
                <span>{post.author}</span>
              </div>
            </motion.div>
          </div>

          {/* Article Content - SA INLINE STYLIMA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="article-content"
          >
            <style>{`
              .article-content {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              }

              .article-content h2 {
                font-size: 2rem;
                font-weight: 700;
                color: #1a365d;
                margin-top: 2.5rem;
                margin-bottom: 1.5rem;
                padding-bottom: 0.75rem;
                border-bottom: 3px solid #dbeafe;
                line-height: 1.3;
              }

              .article-content h3 {
                font-size: 1.5rem;
                font-weight: 600;
                color: #1e3a8a;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }

              .article-content p {
                font-size: 1.1rem;
                line-height: 1.8;
                color: #374151;
                margin-bottom: 1.5rem;
                text-align: justify;
              }

              .article-content ul {
                margin-left: 2rem;
                margin-bottom: 1.5rem;
                list-style: none;
              }

              .article-content ul li {
                font-size: 1.05rem;
                line-height: 1.8;
                color: #4b5563;
                margin-bottom: 0.75rem;
                padding-left: 1.5rem;
                position: relative;
              }

              .article-content ul li::before {
                content: '►';
                position: absolute;
                left: 0;
                color: #2563eb;
                font-weight: bold;
              }

              .article-content strong {
                color: #1e3a8a;
                font-weight: 700;
              }

              .article-content ol {
                margin-left: 2rem;
                margin-bottom: 1.5rem;
              }

              .article-content ol li {
                font-size: 1.05rem;
                line-height: 1.8;
                color: #4b5563;
                margin-bottom: 0.75rem;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </motion.div>

          {/* Share Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-16 pt-12 border-t-2 border-gray-200"
          >
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Sviđa vam se ovaj članak?</h3>
                  <p className="text-gray-600 text-lg">Podijelite ga sa vašim kolegama i prijateljima</p>
                </div>
                <div className="flex gap-4">
                  {/* Facebook Share */}
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                      window.open(facebookUrl, '_blank', 'width=600,height=400');
                    }}
                    className="p-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl"
                    title="Podijeli na Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  {/* Twitter Share */}
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const text = post.title;
                      const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                      window.open(twitterUrl, '_blank', 'width=600,height=400');
                    }}
                    className="p-4 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl"
                    title="Podijeli na Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 002.856-3.515 10.009 10.009 0 01-2.8.856 4.994 4.994 0 00-8.688 4.557 14.148 14.148 0 01-10.28-5.14 4.994 4.994 0 001.556 6.684A4.988 4.988 0 01.96 9.5v.063c0 2.113 1.5 3.888 3.496 4.288a4.995 4.995 0 002.25.085 4.994 4.994 0 004.659 3.468 10.025 10.025 0 01-6.177 2.126A10.08 10.08 0 012 18.555a14.126 14.126 0 007.666 2.247c9.2 0 14.205-7.604 14.205-14.205 0-.216-.005-.432-.015-.648a10.12 10.12 0 002.482-2.584z"/>
                    </svg>
                  </button>

                  {/* LinkedIn Share */}
                  <button
                    onClick={() => {
                      const url = window.location.href;
                      const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                      window.open(linkedinUrl, '_blank', 'width=600,height=400');
                    }}
                    className="p-4 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl"
                    title="Podijeli na LinkedIn"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                    </svg>
                  </button>

                  {/* Copy Link */}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link kopiran u clipboard!');
                    }}
                    className="p-4 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-all duration-300 hover:scale-110 cursor-pointer shadow-lg hover:shadow-xl"
                    title="Kopiraj link"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Related Articles CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link 
              href="/blog"
              className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              Pročitajte više članaka
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </>
  );
}
