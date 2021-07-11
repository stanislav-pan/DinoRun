import React, { FC, MouseEvent, useCallback, useRef } from "react";
import { Picker, EmojiData } from "emoji-mart";

interface Props {
  commentId: number;
  addReactionOfComment: (data: { emojiId: string; commentId: number }) => void;
  setEmojiPicker: (isEmojiPickerState: boolean) => void;
}

export const EmojiPicker: FC<Props> = ({
  commentId,
  addReactionOfComment,
  setEmojiPicker,
}: Props) => {
  const wrapperPickerRef = useRef<HTMLDivElement>(null);

  const triggerPicker = (event: MouseEvent<HTMLElement>) => {
    if (wrapperPickerRef.current === event.target) {
      setEmojiPicker(false);
      return;
    }
  };

  const onSelect = useCallback((emoji: EmojiData) => {
    emoji.id &&
      addReactionOfComment({
        emojiId: emoji.id,
        commentId,
      });
    setEmojiPicker(false);
  }, []);

  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center h-full w-full">
      <div
        ref={wrapperPickerRef}
        className="fixed h-full w-full flex items-center justify-center  bg-gray-900 bg-opacity-70"
        onClick={triggerPicker}
      >
        <Picker title="Pick your emoji…" emoji="point_up" onSelect={onSelect} />
      </div>
    </div>
  );
};
