import { Link } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import "./EventCard.css";

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-card-image">
        <img src={event.image} alt={event.title} />

        <span className="event-category">
          {event.category}
        </span>
      </div>

      <div className="event-card-content">
        <h3>{event.title}</h3>
        <p>{event.description}</p>

        <Link to="/planner">
          Design this event
          <FiArrowUpRight />
        </Link>
      </div>
    </article>
  );
}

export default EventCard;