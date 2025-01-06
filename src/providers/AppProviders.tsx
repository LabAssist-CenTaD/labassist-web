import { ReactNode } from "react";
import { CachedVideoProvider } from "./CachedVideoContext";
import { SelectedFileProvider } from "./SelectedFileContext";
import { SelectedFilesProvider } from "./SelectedFilesContext";
import { PlaybackProvider } from "./PlaybackContext";
import { AnnotationHighlightProvider } from "./AnnotationHighlightContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <CachedVideoProvider>
      <SelectedFileProvider>
        <SelectedFilesProvider>
          <PlaybackProvider>
            <AnnotationHighlightProvider>
              {children}
            </AnnotationHighlightProvider>
          </PlaybackProvider>
        </SelectedFilesProvider>
      </SelectedFileProvider>
    </CachedVideoProvider>
  );
};

export default AppProviders;
