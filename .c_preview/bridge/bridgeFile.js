import { render } from "../preset/react.js";
export const bridgeData = {
    "workspaceFolder": "file:///c%3A/Users/zhuyu/labassist/labassist-web",
    "serverRootDir": "",
    "previewFolderRelPath": "preview",
    "activeFileRelPath": "src/components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag.tsx",
    "mapFileRelPath": "src/components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag.tsx",
    "presetName": "react",
    "workspaceFolderName": "labassist-web"
};
export const preview = () => render(getMod);
const getMod = () => import("../../src/components/LeftPanel/PredictionList/CardWrapper/Card/StatusBar/TagWrapper/Tag/Tag.tsx");