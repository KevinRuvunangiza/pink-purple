import { useParams, Link } from "react-router";
import blogPosts from "../data/blogPost.json";
import NavBarSolid from "../components/AltNavBar";

export default function BlogPost() {
  const { title } = useParams();
  const post = blogPosts.find((p) => p.title === (title));

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center pt-32">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBarSolid />
      <div className="min-h-screen bg-gray-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(168, 85, 247) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10 py-12 px-4 pt-32">
          <article className="max-w-4xl mx-auto">
            {/* Back button */}
            <div className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center text-purple-600 hover:text-pink-600 font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Blog
              </Link>
            </div>

            {/* Hero Image */}
            <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-8 border border-purple-200">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent"></div>
            </div>

            {/* Content Card */}
            <div className="bg-white backdrop-blur-sm rounded-2xl border border-purple-200 shadow-lg p-8 md:p-12">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                <span className="text-purple-600 font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-black">•</span>
                <span className="text-black">{post.readTime}</span>
                <span className="text-black">•</span>
                <span className="text-black">{post.date}</span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-stone-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Author */}
              <div className="flex items-center mb-8 pb-8 border-b border-purple-200">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {post.author.charAt(0)}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-600">Author</p>
                </div>
              </div>

              {/* Excerpt */}
              <div className="bg-purple-50 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
                <p className="text-lg text-black leading-relaxed italic">
                  {post.excerpt}
                </p>
              </div>

              {/* Content with proper HTML rendering */}
              <div 
                className="blog-content prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Bottom CTA */}
              <div className="mt-12 pt-8 border-t border-purple-200 flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Link
                  to="/blog"
                  className="inline-flex items-center text-purple-600 hover:text-pink-600 font-medium transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to All Posts
                </Link>
                
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                >
                  Get Help with Registration
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>

      {/* Add custom styles for the blog content */}
      <style>{`
        .blog-content h2 {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .blog-content p {
          color: black;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        
        .blog-content ul {
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        
        .blog-content ul li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }
        
        .blog-content ol {
          list-style-type: decimal;
          padding-left: 1.5rem;
          margin-bottom: 1rem;
          color: #374151;
        }
        
        .blog-content ol li {
          margin-bottom: 0.5rem;
          line-height: 1.75;
        }
        
        .blog-content strong {
          font-weight: 700;
          color: black;
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          border: 1px solid #e5e7eb;
        }
        
        .blog-content table th {
          background-color: #f3f4f6;
          padding: 0.75rem;
          text-align: left;
          font-weight: 600;
          color: #111827;
          border: 1px solid #e5e7eb;
        }
        
        .blog-content table td {
          padding: 0.75rem;
          border: 1px solid #e5e7eb;
          color: #374151;
        }
        
        .blog-content table tr:nth-child(even) {
          background-color: #f9fafb;
        }
      `}</style>
    </>
  );
}