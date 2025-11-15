import { useParams, Link } from "react-router";
import blogPosts from "../data/blogPost.json";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-950 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center pt-32">
          <h1 className="text-4xl font-bold text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-xl text-gray-400 mb-8">
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
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(168, 85, 247) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 py-12 px-4 pt-32">
        <article className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link
              to="/blog"
              className="inline-flex items-center text-purple-400 hover:text-pink-400 font-medium transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Blog
            </Link>
          </div>

          {/* Hero Image */}
          <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden mb-8 border border-purple-500/20">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
          </div>

          {/* Content Card */}
          <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 p-8 md:p-12">
            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <span className="text-purple-400 font-bold uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{post.readTime}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{post.date}</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center mb-8 pb-8 border-b border-purple-500/20">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {post.author.charAt(0)}
              </div>
              <div className="ml-4">
                <p className="font-semibold text-white">{post.author}</p>
                <p className="text-sm text-gray-400">Author</p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="bg-purple-500/10 border-l-4 border-purple-500 p-6 rounded-r-lg mb-8">
              <p className="text-lg text-gray-300 leading-relaxed italic">
                {post.excerpt}
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="text-gray-300 leading-relaxed space-y-4 whitespace-pre-line">
                {post.content}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="mt-12 pt-8 border-t border-purple-500/20 flex flex-col sm:flex-row gap-4 justify-between items-center">
              <Link
                to="/blog"
                className="inline-flex items-center text-purple-400 hover:text-pink-400 font-medium transition-colors"
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
  );
}