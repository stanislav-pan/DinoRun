import React, { FC } from "react";

import { Button } from "@components/Button";
import { TextArea } from "@components/Input/TextArea";
import { TEXTS } from "@core/translate";

export const SendMessageView: FC = () => (
  <>
    <TextArea name="text" label="Message" info={TEXTS.FORUM.ENTER_MESSAGE} />
    <Button type="submit" className="w-max px-20 py-1 m-0 mr-10">
      {TEXTS.FORUM.SEND_MESSAGE}
    </Button>
  </>
);
