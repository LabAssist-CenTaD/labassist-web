import { ReactNode } from "react";
import { CachedVideoProvider } from "./CachedVideoContext";
import { SelectedFileProvider } from "./SelectedFileContext";
import { SelectedFilesProvider } from "./SelectedFilesContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <CachedVideoProvider>
      <SelectedFileProvider>
        <SelectedFilesProvider>{children}</SelectedFilesProvider>
      </SelectedFileProvider>
    </CachedVideoProvider>
  );
};

export default AppProviders;
