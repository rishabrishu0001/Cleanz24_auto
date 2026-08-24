import React, { Suspense } from 'react';
import LaundryBlog, { BLOG_POSTS } from '../../../../views/laundry/Blog';

export async function generateStaticParams() {
  const postsList = Array.isArray(BLOG_POSTS) ? BLOG_POSTS : [];
  return postsList.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const postsList = Array.isArray(BLOG_POSTS) ? BLOG_POSTS : [];
  const post = postsList.find((p) => p && p.slug === slug);

  const title = post ? `${post.title} | Cleanz24 Laundry Blog` : 'Laundry & Dry Cleaning Guides | Cleanz24 Blog';
  const description = post ? (post.excerpt || `${post.title} - Read expert insights and tips from Cleanz24.`) : 'Read the latest garment care tips and franchise insights.';
  const url = `https://cleanz24.com/best-laundry-drycleaning/blog/${slug}`;

  return {
    title,
    description,
    keywords: [
      post?.title || 'laundry article',
      'laundry blog',
      'dry cleaning guide',
      'garment care tips',
      'Cleanz24 blog',
    ],
    robots: 'index, follow',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post?.dateTime,
      authors: post?.author ? [post.author] : ['Cleanz24'],
      images: [
        {
          url: 'https://cleanz24.com/logo_laundry.jpg',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://cleanz24.com/logo_laundry.jpg'],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  return (
    <Suspense fallback={<div className="py-5 text-center">Loading...</div>}>
      <LaundryBlog slug={resolvedParams?.slug} />
    </Suspense>
  );
}
