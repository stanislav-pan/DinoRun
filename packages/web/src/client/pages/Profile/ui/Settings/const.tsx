import { TEXTS } from "@core/translate";
import { ChangePasswordSvg } from "@icons/ChangePasswordSvg";
import { EditProfileSvg } from "@icons/EditProfileSvg";

import { SettingsListItem } from "./types";

export const SETTINGS: SettingsListItem[] = [
  {
    title: TEXTS.EDIT_PROFILE,
    icon: EditProfileSvg(),
    path: "edit",
  },
  {
    title: TEXTS.CHANGE_PASSWORD,
    icon: ChangePasswordSvg(),
    path: "change-password",
  },
];
