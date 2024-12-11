import { ReactNode } from "react";
import { CachedVideoProvider } from "./CachedVideoContext";
import { SelectedFileProvider } from "./SelectedFileContext";

interface AppProvidersProps {
  children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps): JSX.Element => {
  return (
    <CachedVideoProvider>
      <SelectedFileProvider>{children}</SelectedFileProvider>
    </CachedVideoProvider>
  );
};

export default AppProviders;
