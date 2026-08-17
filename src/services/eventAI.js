export function generateEventPlan(formData) {
  const {
    eventType,
    style,
    color,
    guests,
    venue,
    location,
    description,
  } = formData;

  return {
    themeName: `${style || "Elegant"} ${eventType || "Event"}`,

    summary: `A ${
      style?.toLowerCase() || "beautiful"
    } ${
      eventType?.toLowerCase() || "event"
    } designed for ${
      guests || "your"
    } guests in ${
      location || "your preferred location"
    }.`,

    palette: [
      "#C084FC",
      "#F9A8D4",
      "#FDE68A",
      "#FFF7FB",
    ],

    decoration: {
      stage:
        "Use coordinated flowers, fabric and elegant stage lighting.",

      entrance:
        "Create a welcoming floral entrance with decorative lighting.",

      lighting:
        "Use warm ambient lights with focused stage lighting.",

      seating:
        "Arrange seating so every guest has a comfortable view of the stage.",

      venue:
        venue
          ? `Design the ${venue} using coordinated decorations and lighting.`
          : "Create separate areas for entrance, stage, seating and dining.",
    },

    recommendation:
      description && description.length > 50
        ? "Your event vision is detailed. Keep the selected theme consistent throughout the decoration."
        : "Add more details about flowers, lighting, stage and atmosphere for better recommendations.",
  };
}