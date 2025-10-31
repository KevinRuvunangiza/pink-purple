

export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300 group">
      <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}
