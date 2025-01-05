import { ReactNode } from "react";
import { CachedVideoProvider } from "./CachedVideoContext";
import { SelectedFileProvider } from "./SelectedFileContext";
import { SelectedFilesProvider } from "./SelectedFilesContext";
import { PlaybackProvider } from "./PlaybackContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <CachedVideoProvider>
      <SelectedFileProvider>
        <SelectedFilesProvider>
          <PlaybackProvider>{children}</PlaybackProvider>
        </SelectedFilesProvider>
      </SelectedFileProvider>
    </CachedVideoProvider>
  );
};

export default AppProviders;
