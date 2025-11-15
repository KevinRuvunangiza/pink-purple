import { useParams, Link } from "react-router";
import blogPosts from "../data/blogPost.json";

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog"
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-[80px]">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-96 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-8 md:p-12">
          <div className="mb-6">
            <Link
              to="/blog"
              className="text-pink-600 hover:text-pink-700 font-medium"
            >
              ← Back to Blog
            </Link>
          </div>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            <span className="font-semibold text-pink-600 uppercase">
              {post.category}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>

          <div className="flex items-center mb-8 pb-8 border-b border-gray-200">
            <div className="w-12 h-12 bg-brand-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {post.author.charAt(0)}
            </div>
            <div className="ml-4">
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-600">Author</p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>
                {post.content}
              </p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Key Takeaways
              </h2>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Conclusion
              </h2>
              
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/blog"
              className="inline-block bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
            >
              ← Back to All Posts
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}