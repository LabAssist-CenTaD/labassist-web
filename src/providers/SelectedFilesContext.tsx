import { createContext, useState, ReactNode } from "react";

// Define the context type
interface SelectedFilesContextType {
  selectedFiles: string[]; // Store the file names (or any identifier)
  setSelectedFiles: (files: string[]) => void;
  toggleSelectedFile: (file: string) => void;
}

// Create the context
const SelectedFilesContext = createContext<SelectedFilesContextType | null>(
  null
);

// Provider component
export const SelectedFilesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [selectedFiles, setSelectedFilesState] = useState<string[]>([]);

  // Function to set the selected files
  const setSelectedFiles = (files: string[]) => {
    setSelectedFilesState(files);
  };

  // Function to toggle the selection of a file
  const toggleSelectedFile = (file: string) => {
    setSelectedFilesState((prev) =>
      prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]
    );
  };

  return (
    <SelectedFilesContext.Provider
      value={{ selectedFiles, setSelectedFiles, toggleSelectedFile }}
    >
      {children}
    </SelectedFilesContext.Provider>
  );
};

export default SelectedFilesContext;
