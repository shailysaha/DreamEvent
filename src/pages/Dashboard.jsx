import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  FiCalendar,
  FiEdit3,
  FiEye,
  FiHeart,
  FiMapPin,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("savedEvents")) || [];

    setEvents(savedEvents);
  }, []);

  const categories = [
    "All",
    ...new Set(
      events
        .map((event) => event.eventType)
        .filter(Boolean)
    ),
  ];

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const eventName =
        event.eventName || event.eventType || "";

      const location = event.location || "";
      const style = event.style || "";

      const matchesSearch =
        eventName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        location
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        style
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" ||
        event.eventType === filter;

      return matchesSearch && matchesFilter;
    });
  }, [events, search, filter]);

  const deleteEvent = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event design?"
    );

    if (!confirmed) return;

    const updatedEvents = events.filter(
      (event) => event.id !== id
    );

    setEvents(updatedEvents);

    localStorage.setItem(
      "savedEvents",
      JSON.stringify(updatedEvents)
    );
  };

  const viewEvent = (event) => {
    localStorage.setItem(
      "dreamEventForm",
      JSON.stringify(event)
    );

    navigate("/results");
  };

  const editEvent = (event) => {
    localStorage.setItem(
      "dreamEventForm",
      JSON.stringify(event)
    );
    localStorage.setItem(
    "editingEventId",
    event.id.toString()
  );

    navigate("/planner");
  };
  const createNewEvent = () => {
  localStorage.removeItem("dreamEventForm");
  localStorage.removeItem("editingEventId");

  navigate("/planner");
};

  return (
    <section className="dashboard-page">
      <div className="dashboard-container">

        <div className="dashboard-header">
          <div>
            <span className="dashboard-label">
              My Event Studio
            </span>

            <h1>My Event Designs</h1>

            <p>
              Manage, edit and revisit your personalized
              event concepts.
            </p>
          </div>
          <button
           type="button"
           className="create-event-button"
           onClick={createNewEvent}
         >
         <FiPlus />
         Create New Event
        </button>

          
        </div>

        <div className="dashboard-stats">

          <article className="dashboard-stat-card">
            <div className="stat-icon">
              <FiHeart />
            </div>

            <div>
              <span>Total Designs</span>
              <strong>{events.length}</strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon">
              <FiCalendar />
            </div>

            <div>
              <span>Event Types</span>

              <strong>
                {
                  new Set(
                    events
                      .map((event) => event.eventType)
                      .filter(Boolean)
                  ).size
                }
              </strong>
            </div>
          </article>

          <article className="dashboard-stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>

            <div>
              <span>Guests Planned</span>

              <strong>
                {events.reduce(
                  (total, event) =>
                    total +
                    (Number(event.guests) || 0),
                  0
                )}
              </strong>
            </div>
          </article>
        </div>

        {events.length > 0 && (
          <div className="dashboard-tools">

            <div className="dashboard-search">
              <FiSearch />

              <input
                type="text"
                placeholder="Search events, locations or styles..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />
            </div>

            <div className="dashboard-filters">
              {categories.map((category) => (
                <button
                  type="button"
                  key={category}
                  className={
                    filter === category
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setFilter(category)
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}

        {events.length === 0 ? (

          <div className="empty-dashboard">

            <div className="empty-dashboard-icon">
              <FiHeart />
            </div>

            <h2>
              Your event studio is waiting.
            </h2>

            <p>
              You haven't saved an event design yet.
              Create your first concept and it will
              appear here.
            </p>

            <Link
              to="/planner"
              className="empty-create-button"
            >
              <FiPlus />
              Create My First Event
            </Link>

          </div>

        ) : filteredEvents.length === 0 ? (

          <div className="no-results">

            <FiSearch />

            <h2>No events found</h2>

            <p>
              Try changing your search or category.
            </p>

          </div>

        ) : (

          <div className="dashboard-event-grid">

            {filteredEvents.map((event) => (

              <article
                className="dashboard-event-card"
                key={event.id}
              >

                <div className="dashboard-card-image">

                  <img
                    src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80"
                    alt={
                      event.eventName ||
                      event.eventType ||
                      "Event"
                    }
                  />

                  <span className="dashboard-event-type">
                    {event.eventType || "Event"}
                  </span>

                  <span className="dashboard-event-date">
                    <FiCalendar />
                    {event.createdAt || "Saved"}
                  </span>

                </div>

                <div className="dashboard-card-content">

                  <div className="dashboard-theme-tags">

                    {event.style && (
                      <span>{event.style}</span>
                    )}

                    {event.color && (
                      <span>{event.color}</span>
                    )}

                  </div>

                  <h2>
                    {event.eventName ||
                      `${event.style || ""} ${
                        event.eventType || "Event"
                      }`}
                  </h2>

                  <div className="dashboard-event-details">

                    <p>
                      <FiMapPin />
                      {event.location ||
                        "Location not set"}
                    </p>

                    <p>
                      <FiUsers />
                      {event.guests ||
                        "0"}{" "}
                      Guests
                    </p>

                  </div>

                  <div className="dashboard-budget">
                    <span>Budget</span>

                    <strong>
                      {event.budget ||
                        "Not specified"}
                    </strong>
                  </div>

                  <div className="dashboard-card-actions">

                    <button
                      type="button"
                      className="view-event"
                      onClick={() =>
                        viewEvent(event)
                      }
                    >
                      <FiEye />
                      View
                    </button>

                    <button
                      type="button"
                      className="edit-event"
                      onClick={() =>
                        editEvent(event)
                      }
                    >
                      <FiEdit3 />
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-event"
                      onClick={() =>
                        deleteEvent(event.id)
                      }
                      aria-label="Delete event"
                    >
                      <FiTrash2 />
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}

export default Dashboard;