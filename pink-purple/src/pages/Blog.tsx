import { Link } from "react-router";
import blogPosts from "../data/blogPost.json";
import NavBarSolid from "../components/AltNavBar";

export default function Blog() {
  return (
    <>
    <NavBarSolid />
    <div className="min-h-screen bg-gray-50 relative overflow-hidden pt-10">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(168, 85, 247) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Gradient orbs for atmosphere */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-purple-600 text-sm font-bold tracking-widest uppercase">
                Latest Articles
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-900">
              Our Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and updates from our team
            </p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group relative bg-white backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-200 hover:border-pink-400 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-300/40 hover:-translate-y-2"
              >
                {/* Image Container */}
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40"></div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                    <span className="text-sm text-gray-500">{post.author}</span>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                </div>

                {/* Hover gradient effect */}
                <div className="absolute inset-0 bg-linear-to-br from-purple-100/0 via-pink-100/0 to-purple-100/0 group-hover:purple-100/50  transition-all duration-500 pointer-events-none"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}