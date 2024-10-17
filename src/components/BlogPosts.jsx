import React, { useState, useEffect } from 'react';
import FormattedDate from '../components/FormattedDate.jsx';

const BlogPosts = ({ posts, categories }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isAscending, setIsAscending] = useState(true); // New state for sorting order

  useEffect(() => {
    filterPosts(selectedCategory, isAscending);
  }, [selectedCategory, isAscending]);

  function updateCategory(category) {
    setSelectedCategory(category);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending); // Toggle between ascending and descending
  }

  function filterPosts(category, ascending) {
    let filtered = posts.filter(post => {
      return category === 'All' || post.data.category === category;
    });

    // Sort the filtered posts by date
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.data.pubDate);
      const dateB = new Date(b.data.pubDate);
      return ascending ? dateA - dateB : dateB - dateA;
    });

    setFilteredPosts(filtered);
  }

  return (
    <div className="blog-posts">
      <div className="filter">
        {Object.keys(categories).map((category) => (
          <button
            key={category}
            className={`filter-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => updateCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="sort-button" onClick={toggleSortOrder}>
          Sort by Date {isAscending ? '↑' : '↓'}
        </button>
      </div>
      <ul className="post-list">
        {filteredPosts.map((post) => (
          <li key={post.slug} className="post-item">
            <a href={`/${post.slug}/`} className="post-link">
              <img src={post.data.heroImage} alt={post.data.title} className="post-image" />
              <div className="post-content">
                <h3 className="post-title">{post.data.title}</h3>
                <p className="post-category">{post.data.category}</p>
                <p className="post-date">
                  <FormattedDate date={post.data.pubDate} />
                </p>
                <p className="post-description">{post.data.description}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
