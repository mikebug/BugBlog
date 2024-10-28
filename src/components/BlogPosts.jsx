import React, { useState, useEffect } from "react";
import FormattedDate from "../components/FormattedDate.jsx";

const BlogPosts = ({ posts, categories }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [selectedCategory, setSelectedCategory] = useState("All");
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
    let filtered = posts.filter((post) => {
      return category === "All" || post.data.category === category;
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
            className={`filter-button ${selectedCategory === category ? "active" : ""}`}
            onClick={() => updateCategory(category)}
          >
            {category}
          </button>
        ))}
        <button className="sort-button" onClick={toggleSortOrder}>
          Sort by Date {isAscending ? "↑" : "↓"}
        </button>
      </div>
      <ul className="post-list">
        {filteredPosts.map((post) => (
          <li key={post.slug} className="post-item">
            <a href={`/${post.slug}/`} className="post-link">
              <img
                src={post.data.heroImage}
                alt={post.data.title}
                className="post-image"
              />
              <div className="post-content">
                <div className="post-header">
                  <p className="post-title">{post.data.title}</p>
                  <p className="post-category">{post.data.category}</p>
                </div>
                <p className="post-description">{post.data.description}</p>
                <div className="post-badges">
                  {post.data.tags && post.data.tags.length > 0 ? (
                    post.data.tags.map((tag, index) => (
                      <span key={`${post.slug}-${index}`} className="badge">
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span>No tags available</span>
                  )}
                </div>
                <p className="post-date">
                  <FormattedDate date={post.data.pubDate} />
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogPosts;
