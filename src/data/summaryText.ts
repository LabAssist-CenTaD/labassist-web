export type SummaryText = {
  category: string;
  error_message: string;
  error_text: string;
  no_error_text: string;
};

export const summaryTexts: SummaryText[] = [
  {
    category: "lab goggles",
    error_message: "Goggles should be worn properly",
    error_text: "Lab goggles not worn",
    no_error_text: "Lab goggles worn properly",
  },
  {
    category: "conical flask",
    error_message: "Conical flask should not be grinded on the white tile",
    error_text: "Conical flask grinded on white tile",
    no_error_text: "Swirling done correctly",
  },
  {
    category: "white tile",
    error_message:
      "Conical flask should be placed on the white tile during titration",
    error_text: "Conical flask not placed on white tile during titration",
    no_error_text: "Conical flask placed on white tile during titration",
  },
  {
    category: "funnel",
    error_message:
      "Filter funnel should not be left on the burette during titration",
    error_text: "Filter funnel left on burette during titration",
    no_error_text: "Filter funnel removed from burette during titration",
  },
  {
    category: "funnel",
    error_message:
      "Filter funnel should be used when pouring solution into burette",
    error_text: "Filter funnel used when pouring solution into burette",
    no_error_text: "Filter funnel used when pouring solution into burette",
  },
];
