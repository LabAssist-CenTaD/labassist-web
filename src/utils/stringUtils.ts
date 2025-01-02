export function toTitleCase(input: string): string {
  return input
    .split(/[-_]/) // Split on hyphens or underscores
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalise first letter, lowercase the rest
    )
    .join(" "); // Join with a space
}
