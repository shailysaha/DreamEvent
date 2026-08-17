import { Link } from "react-router";
import {
  FiArrowRight,
  FiCheckCircle,
  FiEdit3,
  FiGrid,
  FiHeart,
  FiImage,
  FiStar,
} from "react-icons/fi";

import EventCard from "../components/EventCard";
import { eventTypes } from "../data/eventTypes";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-blur hero-blur-one"></div>
        <div className="hero-blur hero-blur-two"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-label">
              <FiStar />
              Your personal AI event designer
            </div>

            <h1>
              Turn your dream event into a
              <span> beautiful reality.</span>
            </h1>

            <p>
              Describe your celebration, choose your preferences and receive
              personalized themes, decoration concepts, colour palettes and
              planning suggestions.
            </p>

            <div className="hero-actions">
              <Link to="/planner" className="primary-button">
                Design My Event
                <FiArrowRight />
              </Link>

              <Link to="/inspiration" className="secondary-button">
                Explore Inspiration
              </Link>
            </div>

            <div className="hero-benefits">
              <span>
                <FiCheckCircle />
                Personalized themes
              </span>

              <span>
                <FiCheckCircle />
                Budget-friendly plans
              </span>

              <span>
                <FiCheckCircle />
                Instant inspiration
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image">
              <img
                src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85"
                alt="Beautifully decorated event venue"
              />
            </div>

            <div className="floating-card floating-theme">
              <FiHeart />
              <div>
                <strong>Royal Garden</strong>
                <span>Recommended theme</span>
              </div>
            </div>

            <div className="floating-card floating-ai">
              <FiStar />
              <div>
                <strong>AI Design Ready</strong>
                <span>Based on your preferences</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="event-section">
        <div className="container">
          <div className="section-heading">
            <span>Event inspiration</span>
            <h2>Designed for every celebration</h2>
            <p>
              Start with a popular event style, then customize its theme,
              atmosphere, decoration and colour palette.
            </p>
          </div>

          <div className="event-grid">
            {eventTypes.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="process-section">
        <div className="container">
          <div className="section-heading">
            <span>Simple process</span>
            <h2>From idea to complete visual direction</h2>
          </div>

          <div className="process-grid">
            <article className="process-card">
              <div className="process-number">01</div>
              <FiEdit3 />
              <h3>Describe your event</h3>
              <p>
                Tell us the event type, guest count, budget, location and the
                experience you want to create.
              </p>
            </article>

            <article className="process-card">
              <div className="process-number">02</div>
              <FiStar />
              <h3>Generate concepts</h3>
              <p>
                Receive personalized theme directions, decoration suggestions
                and matching colour palettes.
              </p>
            </article>

            <article className="process-card">
              <div className="process-number">03</div>
              <FiGrid />
              <h3>Customize your design</h3>
              <p>
                Select your preferred concept and change its flowers, lighting,
                furniture and visual style.
              </p>
            </article>

            <article className="process-card">
              <div className="process-number">04</div>
              <FiImage />
              <h3>Save your mood board</h3>
              <p>
                Keep your final design in your dashboard and use it as your
                event-planning reference.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container">
          <div className="home-cta-box">
            <div>
              <span>Ready to begin?</span>
              <h2>Your dream event starts with one idea.</h2>
              <p>
                Create a personalized event concept in a few simple steps.
              </p>
            </div>

            <Link to="/planner" className="primary-button">
              Create My Event
              <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;