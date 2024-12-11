import { createContext, useState, ReactNode } from "react";

// Define the context type
interface SelectedFileContextType {
  selectedFile: { fileName: string | null; filePath: string | null };
  setSelectedFile: (file: { fileName: string; filePath: string }) => void;
}

// Create the context
const SelectedFileContext = createContext<SelectedFileContextType | null>(null);

// Provider component
export const SelectedFileProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFile, setSelectedFileState] = useState<{
    fileName: string | null;
    filePath: string | null;
  }>({
    fileName: null,
    filePath: null,
  });

  const setSelectedFile = (file: { fileName: string; filePath: string }) => {
    setSelectedFileState(file);
  };

  return (
    <SelectedFileContext.Provider value={{ selectedFile, setSelectedFile }}>
      {children}
    </SelectedFileContext.Provider>
  );
};

export default SelectedFileContext;
