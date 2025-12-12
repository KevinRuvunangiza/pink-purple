// src/pages/admin/BlogManagePage.tsx
import { useState, useEffect } from 'react';
import { BlogEditor } from '../../components/admin/BlogEditor';
import { BlogService } from '../../services/api.service';
import { Save, Trash2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import type { BlogPost, BlogPostCreate } from '../../types/blog.types';

interface FormData {
  title: string;
  author: string;
  excerpt: string;
  image: string;
  category: string;
  read_time: string;
  content: string;
  slug: string;
  is_published: boolean;
}

export function BlogManagePage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    author: '',
    excerpt: '',
    image: '',
    category: '',
    read_time: '',
    content: '',
    slug: '',
    is_published: false,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await BlogService.getAllPostsForAdmin();
      setPosts(data);
    } catch (error) {
      console.error('Failed to load posts:', error);
      alert('Failed to load blog posts');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate slug from title if empty
      const slug = formData.slug || formData.title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const postData: BlogPostCreate = {
        ...formData,
        slug,
        date: new Date().toISOString().split('T')[0],
      };

      if (editingId) {
        await BlogService.updatePost({ id: editingId, ...postData });
        alert('Blog post updated successfully!');
      } else {
        await BlogService.createPost(postData);
        alert('Blog post created successfully!');
      }

      // Reset form
      setFormData({
        title: '',
        author: '',
        excerpt: '',
        image: '',
        category: '',
        read_time: '',
        content: '',
        slug: '',
        is_published: false,
      });
      setEditingId(null);
      loadPosts();
    } catch (error) {
      console.error('Failed to save post:', error);
      alert('Failed to save blog post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await BlogService.deletePost(id);
      alert('Post deleted successfully!');
      loadPosts();
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post');
    }
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await BlogService.togglePublish(id, !currentStatus);
      loadPosts();
    } catch (error) {
      console.error('Failed to toggle publish status:', error);
      alert('Failed to update publish status');
    }
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      author: post.author,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category,
      read_time: post.read_time,
      content: post.content,
      slug: post.slug,
      is_published: post.is_published,
    });
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      author: '',
      excerpt: '',
      image: '',
      category: '',
      read_time: '',
      content: '',
      slug: '',
      is_published: false,
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
          {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
        </h1>
        {editingId && (
          <div className="mt-2 flex items-center gap-2 text-sm text-purple-600">
            <AlertCircle className="w-4 h-4" />
            <span>You are editing an existing post</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              placeholder="Enter blog post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              placeholder="Author name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              placeholder="e.g., Marketing, Design"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Read Time *
            </label>
            <input
              type="text"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
              placeholder="e.g., 5 min read"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Image URL *
            </label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              required
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
            />
            {formData.image && (
              <img 
                src={formData.image} 
                alt="Preview" 
                className="mt-2 w-full max-w-md h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Slug <span className="text-gray-500 text-xs">(URL-friendly, auto-generated if empty)</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="my-blog-post-title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
            />
            {formData.slug && (
              <p className="mt-1 text-xs text-gray-500">
                URL: /blog/{formData.slug}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Excerpt *
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none resize-none"
              placeholder="Brief summary of the blog post (will appear in blog listings)"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>
          <BlogEditor
            value={formData.content}
            onChange={(html) => setFormData({ ...formData, content: html })}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_published"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            className="w-4 h-4 text-pink-600 rounded focus:ring-pink-500 cursor-pointer"
          />
          <label htmlFor="is_published" className="text-sm font-medium text-gray-700 cursor-pointer">
            Publish immediately
          </label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:from-pink-600 hover:to-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-md"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Saving...' : editingId ? 'Update Post' : 'Create Post'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition font-medium"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Posts List */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">All Posts</h2>
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
              <AlertCircle className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500">No blog posts yet. Create your first post above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-pink-300 hover:shadow-md transition gap-4"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 truncate">{post.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {post.category} • {post.read_time} • {post.view_count} views
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    By {post.author} • {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleTogglePublish(post.id, post.is_published)}
                    className={`p-2 rounded transition ${
                      post.is_published
                        ? 'bg-green-100 text-green-600 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={post.is_published ? 'Published - Click to unpublish' : 'Draft - Click to publish'}
                  >
                    {post.is_published ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-4 py-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 transition font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                    title="Delete post"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}