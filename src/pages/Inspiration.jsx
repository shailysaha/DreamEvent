import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FiArrowRight,
  FiHeart,
  FiSearch,
  FiStar,
} from "react-icons/fi";

import "./Inspiration.css";

const themes = [
  {
    id: 1,
    title: "Royal Bengali Wedding",
    category: "Wedding",
    style: "Royal",
    color: "Gold",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=85",
    description:
      "A rich wedding concept with gold accents, elegant florals, dramatic stage styling and warm lighting.",
  },
  {
    id: 2,
    title: "Minimal White Wedding",
    category: "Wedding",
    style: "Minimal",
    color: "Cream",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=85",
    description:
      "Clean white florals, simple decor, soft fabrics and modern styling for a calm elegant celebration.",
  },
  {
    id: 3,
    title: "Garden Wedding",
    category: "Wedding",
    style: "Garden",
    color: "Green",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85",
    description:
      "Outdoor floral styling with greenery, fairy lights and relaxed natural seating arrangements.",
  },
  {
    id: 4,
    title: "Luxury Birthday Night",
    category: "Birthday",
    style: "Luxury",
    color: "Purple",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1000&q=85",
    description:
      "An elegant birthday concept with statement lighting, premium table decor and a glamorous backdrop.",
  },
  {
    id: 5,
    title: "Pastel Birthday Party",
    category: "Birthday",
    style: "Modern",
    color: "Rose",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1000&q=85",
    description:
      "Soft pastel colours, balloons, flowers and playful styling for a modern birthday celebration.",
  },
  {
    id: 6,
    title: "Elegant Engagement",
    category: "Engagement",
    style: "Romantic",
    color: "Rose",
    image:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=85",
    description:
      "Romantic lighting, floral backdrops and intimate decor designed for a memorable engagement.",
  },
  {
    id: 7,
    title: "Modern Corporate Gala",
    category: "Corporate",
    style: "Modern",
    color: "Blue",
    image:
      "https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=1000&q=85",
    description:
      "Clean branding, modern stage lighting and premium networking spaces for a professional event.",
  },
  {
    id: 8,
    title: "Graduation Celebration",
    category: "Graduation",
    style: "Modern",
    color: "Gold",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=85",
    description:
      "A bright celebratory setup with photo areas, graduation decor and elegant table styling.",
  },
];

const categories = [
  "All",
  "Wedding",
  "Birthday",
  "Engagement",
  "Corporate",
  "Graduation",
];

function Inspiration() {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const filteredThemes = useMemo(() => {
    return themes.filter((theme) => {
      const categoryMatch =
        activeCategory === "All" ||
        theme.category === activeCategory;

      const searchMatch =
        theme.title.toLowerCase().includes(search.toLowerCase()) ||
        theme.style.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  const toggleFavorite = (id) => {
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const useTheme = (theme) => {
    localStorage.removeItem("editingEventId");
    const currentPlannerData = JSON.parse(
      localStorage.getItem("dreamEventForm") || "{}"
    );

    const updatedData = {
      ...currentPlannerData,
      eventType: theme.category,
      style: theme.style,
      color: theme.color,
    };

    localStorage.setItem(
      "dreamEventForm",
      JSON.stringify(updatedData)
    );

    navigate("/planner");
  };

  return (
    <section className="inspiration-page">
      <div className="inspiration-container">

        <div className="inspiration-hero">
          <span className="inspiration-label">
            <FiStar />
            Curated Event Inspiration
          </span>

          <h1>
            Find a style that feels
            <span> uniquely yours.</span>
          </h1>

          <p>
            Explore wedding, birthday, engagement and event concepts.
            Save your favourites or use one as the starting point for
            your own AI event design.
          </p>
        </div>

        <div className="inspiration-controls">
          <div className="category-filter">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                className={
                  activeCategory === category ? "active" : ""
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="inspiration-search">
            <FiSearch />

            <input
              type="text"
              placeholder="Search themes..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>
        </div>

        <div className="gallery-info">
          <p>
            Showing{" "}
            <strong>{filteredThemes.length}</strong>{" "}
            inspiration themes
          </p>

          <p>
            <FiHeart />
            {favorites.length} saved
          </p>
        </div>

        {filteredThemes.length > 0 ? (
          <div className="inspiration-grid">
            {filteredThemes.map((theme) => (
              <article
                className="inspiration-card"
                key={theme.id}
              >
                <div className="inspiration-image">
                  <img
                    src={theme.image}
                    alt={theme.title}
                  />

                  <span className="category-badge">
                    {theme.category}
                  </span>

                  <button
                    type="button"
                    className={
                      favorites.includes(theme.id)
                        ? "favorite-button active"
                        : "favorite-button"
                    }
                    onClick={() =>
                      toggleFavorite(theme.id)
                    }
                    aria-label="Save inspiration"
                  >
                    <FiHeart />
                  </button>

                  <div className="image-overlay">
                    <button
                      type="button"
                      onClick={() => useTheme(theme)}
                    >
                      Use This Theme
                      <FiArrowRight />
                    </button>
                  </div>
                </div>

                <div className="inspiration-content">
                  <div className="inspiration-tags">
                    <span>{theme.style}</span>
                    <span>{theme.color}</span>
                  </div>

                  <h2>{theme.title}</h2>

                  <p>{theme.description}</p>

                  <button
                    type="button"
                    className="theme-button"
                    onClick={() => useTheme(theme)}
                  >
                    Design with this style
                    <FiArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-gallery">
            <FiSearch />
            <h2>No themes found</h2>
            <p>
              Try another category or search word.
            </p>
          </div>
        )}

        <section className="inspiration-cta">
          <div>
            <span>Have your own idea?</span>

            <h2>
              Start with your vision instead.
            </h2>

            <p>
              Tell us exactly what you want and build your
              event from scratch.
            </p>
          </div>

          <Link
            to="/planner"
            className="inspiration-cta-button"
          >
            Open AI Planner
            <FiArrowRight />
          </Link>
        </section>
      </div>
    </section>
  );
}

export default Inspiration;