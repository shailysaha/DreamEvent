import { Link, useNavigate } from "react-router";
import {
  FiArrowLeft,
  FiBookmark,
  FiCheckCircle,
  FiDownload,
  FiHeart,
  FiMapPin,
  FiStar,
  FiUsers,
} from "react-icons/fi";
import "./Results.css";

function Results() {
  const navigate = useNavigate();

  const generatedPlanData = localStorage.getItem("generatedEventPlan");

  const generatedPlan = generatedPlanData
    ? JSON.parse(generatedPlanData)
    : null;

  const editingEventId = localStorage.getItem("editingEventId");

  const isEditing = Boolean(editingEventId);

  const savedData = localStorage.getItem("dreamEventForm");

  const eventData = savedData
    ? JSON.parse(savedData)
    : {
        eventType: "Wedding",
        eventName: "Dream Event",
        guests: "150",
        budget: "৳300,000 - ৳500,000",
        location: "Sylhet",
        venue: "Outdoor Garden",
        style: "Royal",
        color: "Gold",
        description:
          "An elegant event with warm lighting, floral decoration and a luxurious atmosphere.",
      };

  const saveEvent = () => {
    try {
      const existingEvents =
        JSON.parse(localStorage.getItem("savedEvents")) || [];

      // EDIT MODE
      if (isEditing) {
        const updatedEvents = existingEvents.map((event) =>
          String(event.id) === String(editingEventId)
            ? {
                ...eventData,
                id: event.id,
                createdAt: event.createdAt,
                updatedAt: new Date().toLocaleDateString(),
              }
            : event
        );

        localStorage.setItem("savedEvents", JSON.stringify(updatedEvents));

        localStorage.removeItem("editingEventId");

        alert("Event updated successfully!");

        navigate("/dashboard");

        return;
      }

      // NEW EVENT MODE
      const newEvent = {
        ...eventData,
        id: Date.now(),
        createdAt: new Date().toLocaleDateString(),
      };

      const updatedEvents = [newEvent, ...existingEvents];

      localStorage.setItem("savedEvents", JSON.stringify(updatedEvents));

      alert("Event saved successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error("Save event error:", error);

      alert("Something went wrong while saving.");
    }
  };

  const decorationIdeas = generatedPlan
    ? [
        {
          title: "Stage Design",
          text: generatedPlan.decoration.stage,
          icon: "🌸",
        },
        {
          title: "Entrance",
          text: generatedPlan.decoration.entrance,
          icon: "✨",
        },
        {
          title: "Lighting",
          text: generatedPlan.decoration.lighting,
          icon: "💡",
        },
        {
          title: "Seating",
          text: generatedPlan.decoration.seating,
          icon: "🪑",
        },
        {
          title: "Venue Styling",
          text: generatedPlan.decoration.venue,
          icon: "🏛️",
        },
      ]
    : [];

  return (
    <section className="results-page">
      <div className="results-container">
        <div className="results-topbar">
          <Link to="/planner" className="back-link">
            <FiArrowLeft />
            Edit Event
          </Link>

          <span className="result-badge">
            <FiStar />
            Event Concept Ready
          </span>
        </div>

        <section className="result-hero">
          <div className="result-hero-content">
            <span className="eyebrow">Your personalized event concept</span>

            <h1>
              {eventData.eventName ||
                generatedPlan?.themeName ||
                "Dream Event"}
            </h1>

            <p>
              {generatedPlan?.summary ||
                "Your personalized event concept is ready."}
            </p>

            <div className="result-meta">
              <span>
                <FiUsers />
                {eventData.guests || "Not set"} guests
              </span>

              <span>
                <FiMapPin />
                {eventData.location || "Location not set"}
              </span>

              <span>
                <FiHeart />
                {eventData.venue || "Venue not set"}
              </span>
            </div>

            <div className="result-actions">
              <button
                type="button"
                className="save-button"
                onClick={saveEvent}
              >
                <FiBookmark />
                {isEditing ? "Update Design" : "Save Design"}
              </button>

              <button className="download-button">
                <FiDownload />
                Download Plan
              </button>
            </div>
          </div>

          <div className="result-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85"
              alt="Event decoration inspiration"
            />

            <div className="floating-score">
              <span>Design Match</span>
              <strong>94%</strong>
            </div>
          </div>
        </section>

        <section className="summary-grid">
          <article className="summary-card">
            <span>Event Type</span>
            <strong>{eventData.eventType || "Not selected"}</strong>
          </article>

          <article className="summary-card">
            <span>Theme</span>
            <strong>{eventData.style || "Not selected"}</strong>
          </article>

          <article className="summary-card">
            <span>Venue</span>
            <strong>{eventData.venue || "Not selected"}</strong>
          </article>

          <article className="summary-card">
            <span>Budget</span>
            <strong>{eventData.budget || "Not selected"}</strong>
          </article>
        </section>

        <section className="result-section">
          <div className="section-heading result-heading">
            <span>Visual Direction</span>
            <h2>Your Event Style</h2>
            <p>
              A coordinated visual direction based on your selected theme,
              colour preference and venue style.
            </p>
          </div>

          <div className="visual-grid">
            <article className="theme-panel">
              <span className="panel-label">Theme Concept</span>

              <h3>
                {eventData.style || "Elegant"}{" "}
                {eventData.eventType || "Celebration"}
              </h3>

              <p>
                Use elegant styling, layered decoration and coordinated details
                to create a consistent atmosphere throughout the event.
              </p>

              <div className="theme-tags">
                <span>{eventData.style || "Elegant"}</span>
                <span>{eventData.venue || "Indoor"}</span>
                <span>{eventData.color || "Neutral"}</span>
              </div>
            </article>

            <article className="palette-panel">
              <span className="panel-label">Suggested Palette</span>

              <div className="palette">
                {generatedPlan?.palette?.map((color, index) => (
                  <div className="palette-item" key={color}>
                    <span
                      className="palette-color"
                      style={{ backgroundColor: color }}
                    />

                    <p>Color {index + 1}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="ai-recommendation">
          <div className="ai-recommendation-icon">
            ✨
          </div>

          <div>
            <span>Event Designer Recommendation</span>

            <h2>How to improve this concept</h2>

            <p>
              {generatedPlan?.recommendation ||
                "Your event concept is ready for customization."}
            </p>
          </div>
        </section>

        <section className="result-section">
          <div className="section-heading result-heading">
            <span>Decoration Plan</span>
            <h2>Recommended Design Elements</h2>
          </div>

          <div className="decoration-grid">
            {decorationIdeas.map((item) => (
              <article className="decoration-card" key={item.title}>
                <div className="decoration-icon">{item.icon}</div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="budget-section">
          <div className="budget-content">
            <span className="panel-label">Suggested Allocation</span>
            <h2>Budget Breakdown</h2>

            <p>
              A sample distribution you can adjust based on your priorities.
            </p>

            <div className="budget-list">
              <div>
                <span>Venue</span>
                <strong>25%</strong>
              </div>

              <div>
                <span>Food & Catering</span>
                <strong>30%</strong>
              </div>

              <div>
                <span>Decoration</span>
                <strong>20%</strong>
              </div>

              <div>
                <span>Photography</span>
                <strong>15%</strong>
              </div>

              <div>
                <span>Other</span>
                <strong>10%</strong>
              </div>
            </div>
          </div>

          <div className="budget-visual">
            <div className="budget-circle">
              <div>
                <span>Planned</span>
                <strong>100%</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="vision-section">
          <div>
            <span className="panel-label">Your Vision</span>
            <h2>What you described</h2>

            <p>
              {eventData.description ||
                "No description was provided for this event."}
            </p>
          </div>

          <div className="vision-checklist">
            <p>
              <FiCheckCircle />
              Theme matched
            </p>

            <p>
              <FiCheckCircle />
              Colour palette prepared
            </p>

            <p>
              <FiCheckCircle />
              Decoration concept ready
            </p>

            <p>
              <FiCheckCircle />
              Budget allocation suggested
            </p>
          </div>
        </section>

        <section className="result-bottom-cta">
          <div>
            <span>Want another concept?</span>
            <h2>Create a different event style.</h2>
          </div>

          <Link to="/planner" className="primary-button">
            Design Another Event
          </Link>
        </section>
      </div>
    </section>
  );
}

export default Results;