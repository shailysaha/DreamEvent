import { useState } from "react";
import { useNavigate } from "react-router";
import { generateEventPlan } from "../services/eventAI";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiGift,
  FiBriefcase,
  FiAward,
  FiStar,
} from "react-icons/fi";
import {
  FaRing,
  FaBirthdayCake,
  FaBaby,
} from "react-icons/fa";
import "./Planner.css";

const eventTypes = [
  {
    name: "Wedding",
    icon: <FaRing />,
    subtitle: "Your perfect day",
  },
  {
    name: "Birthday",
    icon: <FaBirthdayCake />,
    subtitle: "Celebrate another year",
  },
  {
    name: "Engagement",
    icon: <FiHeart />,
    subtitle: "A beautiful beginning",
  },
  {
    name: "Corporate",
    icon: <FiBriefcase />,
    subtitle: "Professional & memorable",
  },
  {
    name: "Graduation",
    icon: <FiAward />,
    subtitle: "Celebrate achievement",
  },
  {
    name: "Baby Shower",
    icon: <FaBaby />,
    subtitle: "Welcome little one",
  },
];

const styles = [
  "Royal",
  "Modern",
  "Minimal",
  "Traditional",
  "Garden",
  "Luxury",
  "Vintage",
  "Romantic",
];

const colors = [
  { name: "Rose", value: "#e88c9d" },
  { name: "Purple", value: "#a855f7" },
  { name: "Gold", value: "#d4a72c" },
  { name: "Blue", value: "#6595c8" },
  { name: "Green", value: "#719b7a" },
  { name: "Cream", value: "#e9dcc9" },
];

function Planner() {
  const navigate = useNavigate();

  const editingEventId = localStorage.getItem("editingEventId");

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("dreamEventForm");

    if (savedData) {
      return JSON.parse(savedData);
    }

    return {
      eventType: "",
      eventName: "",
      guests: "",
      budget: "",
      location: "",
      venue: "",
      style: "",
      color: "",
      description: "",
    };
  });

  const updateField = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const nextStep = () => {
    if (step < 4) {
      setStep((previous) => previous + 1);
    }
  };

  const previousStep = () => {
    if (step > 1) {
      setStep((previous) => previous - 1);
    }
  };

  const generateEvent = () => {
    localStorage.setItem("dreamEventForm", JSON.stringify(formData));

    navigate("/results");
  };

  return (
    <section className="planner-page">
      <div className="planner-shell">
        <div className="planner-preview">
          <div className="preview-overlay"></div>

          <div className="preview-content">
            <span className="preview-badge">
              <FiStar />
              Live Event Preview
            </span>

            <h1>
              {formData.eventName ||
                `${formData.style || "Dream"} ${
                  formData.eventType || "Event"
                }`}
            </h1>

            <p>
              Your selected preferences will appear here while you build your
              event.
            </p>

            <div className="preview-info-grid">
              <div>
                <span>Event</span>
                <strong>{formData.eventType || "Not selected"}</strong>
              </div>

              <div>
                <span>Theme</span>
                <strong>{formData.style || "Not selected"}</strong>
              </div>

              <div>
                <span>Guests</span>
                <strong>{formData.guests || "0"}</strong>
              </div>

              <div>
                <span>Venue</span>
                <strong>{formData.venue || "Not selected"}</strong>
              </div>
            </div>

            {formData.color && (
              <div className="preview-color">
                <span>Selected Color</span>
                <strong>{formData.color}</strong>
              </div>
            )}
          </div>
        </div>

        <div className="planner-workspace">
          <div className="planner-heading">
            <span>
              <FiStar />
              AI Event Designer
            </span>

            <h2>Create Your Dream Event</h2>

            <p>
              Tell us what you are imagining and create a personalized event
              concept step by step.
            </p>
          </div>

          <div className="progress-container">
            {[1, 2, 3, 4].map((number) => (
              <div
                className={`progress-item ${
                  step >= number ? "active" : ""
                }`}
                key={number}
              >
                <div className="progress-circle">
                  {step > number ? <FiCheck /> : number}
                </div>

                <span>
                  {number === 1 && "Event"}
                  {number === 2 && "Details"}
                  {number === 3 && "Style"}
                  {number === 4 && "Vision"}
                </span>
              </div>
            ))}
          </div>

          <div className="planner-card">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="planner-step">
                <div className="step-title">
                  <span>Step 01</span>
                  <h2>What are you celebrating?</h2>
                  <p>Select the type of event you want to design.</p>
                </div>

                <div className="event-type-grid">
                  {eventTypes.map((event) => {
                    const selected = formData.eventType === event.name;

                    return (
                      <button
                        type="button"
                        key={event.name}
                        className={`event-type-card ${
                          selected ? "selected" : ""
                        }`}
                        onClick={() =>
                          updateField("eventType", event.name)
                        }
                      >
                        {selected && (
                          <span className="selected-check">
                            <FiCheck />
                          </span>
                        )}

                        <div className="event-icon-box">
                          {event.icon}
                        </div>

                        <div className="event-type-info">
                          <h3>{event.name}</h3>
                          <p>{event.subtitle}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="planner-step">
                <div className="step-title">
                  <span>Step 02</span>
                  <h2>Tell us about your event</h2>
                  <p>
                    These details will help us personalize your design.
                  </p>
                </div>

                <div className="form-grid">
                  <div className="form-group full-width">
                    <label>Event Name</label>
                    <input
                      type="text"
                      placeholder="Example: Sarah's Dream Wedding"
                      value={formData.eventName}
                      onChange={(e) =>
                        updateField("eventName", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Number of Guests</label>
                    <input
                      type="number"
                      placeholder="Example: 150"
                      value={formData.guests}
                      onChange={(e) =>
                        updateField("guests", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Estimated Budget</label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        updateField("budget", e.target.value)
                      }
                    >
                      <option value="">Select budget</option>
                      <option value="৳50,000 - ৳100,000">
                        ৳50,000 - ৳100,000
                      </option>
                      <option value="৳100,000 - ৳300,000">
                        ৳100,000 - ৳300,000
                      </option>
                      <option value="৳300,000 - ৳500,000">
                        ৳300,000 - ৳500,000
                      </option>
                      <option value="৳500,000+">
                        ৳500,000+
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="Example: Sylhet"
                      value={formData.location}
                      onChange={(e) =>
                        updateField("location", e.target.value)
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Venue Type</label>
                    <select
                      value={formData.venue}
                      onChange={(e) =>
                        updateField("venue", e.target.value)
                      }
                    >
                      <option value="">Select venue</option>
                      <option>Indoor Hall</option>
                      <option>Outdoor Garden</option>
                      <option>Hotel</option>
                      <option>Resort</option>
                      <option>Rooftop</option>
                      <option>Home</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="planner-step">
                <div className="step-title">
                  <span>Step 03</span>
                  <h2>Choose your event style</h2>
                  <p>
                    Select the atmosphere and colour that best match your
                    vision.
                  </p>
                </div>

                <h3 className="option-heading">Preferred Theme</h3>

                <div className="style-grid">
                  {styles.map((style) => (
                    <button
                      type="button"
                      key={style}
                      className={
                        formData.style === style
                          ? "style-option selected"
                          : "style-option"
                      }
                      onClick={() =>
                        updateField("style", style)
                      }
                    >
                      {style}
                      {formData.style === style && <FiCheck />}
                    </button>
                  ))}
                </div>

                <h3 className="option-heading color-heading">
                  Main Colour
                </h3>

                <div className="color-grid">
                  {colors.map((color) => (
                    <button
                      type="button"
                      key={color.name}
                      className={
                        formData.color === color.name
                          ? "color-option selected"
                          : "color-option"
                      }
                      onClick={() =>
                        updateField("color", color.name)
                      }
                    >
                      <span
                        className="color-circle"
                        style={{ backgroundColor: color.value }}
                      />
                      {color.name}
                      {formData.color === color.name && <FiCheck />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="planner-step">
                <div className="step-title">
                  <span>Step 04</span>
                  <h2>Describe your dream event</h2>
                  <p>
                    This is where you can tell our designer exactly what
                    you're imagining.
                  </p>
                </div>

                <div className="vision-box">
                  <FiHeart />

                  <textarea
                    rows="8"
                    placeholder="Example: I want an elegant outdoor wedding with warm lights, white flowers, a romantic stage and a luxurious but peaceful atmosphere..."
                    value={formData.description}
                    onChange={(e) =>
                      updateField("description", e.target.value)
                    }
                  />

                  <div className="textarea-info">
                    <span>
                      Tip: Mention flowers, lighting, stage design,
                      atmosphere or anything you love.
                    </span>

                    <span>{formData.description.length} characters</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP NAVIGATION */}
            <div className="planner-navigation">
              {step > 1 ? (
                <button
                  type="button"
                  className="back-button"
                  onClick={previousStep}
                >
                  <FiArrowLeft />
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  type="button"
                  className="continue-button"
                  onClick={nextStep}
                >
                  Continue
                  <FiArrowRight />
                </button>
              ) : (
                <button
                  type="button"
                  className="generate-button"
                  onClick={generateEvent}
                >
                  <FiStar />
                  Generate My Event
                  <FiArrowRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Planner;