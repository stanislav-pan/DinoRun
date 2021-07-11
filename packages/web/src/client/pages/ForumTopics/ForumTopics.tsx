import React, { FC, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";

import { Header } from "@components/Header";
import { useDinoTheme } from "@hooks/useTheme";
import { ForumHeader } from "@components/Forum/ForumHeader";
import { TEXTS } from "@core/translate";
import { useModal } from "@hooks/useModal";
import { ForumRequest } from "@redux/forum/actions";
import { Modal } from "@components/Modal";
import { Button } from "@components/Button";
import { CreateTopicForm } from "./ui/CreateTopic.form";
import { ForumTopicsList } from "./ui/TopicList";

export const ForumTopics: FC = () => {
  const { userStyle } = useDinoTheme();
  const { isOpenModal, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const fetchData = useCallback(() => {
    dispatch(ForumRequest());
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen w-ful">
      <div className={cn("w-full bg-cover", userStyle?.background)}>
        <Header />
      </div>
      <ForumHeader>{TEXTS.FORUM.HEADER}</ForumHeader>
      <div className="container mx-auto font-light">
        <Button type="button" className="w-max px-4 mb-3" onClick={openModal}>
          {TEXTS.FORUM.CREATE_TOPIC}
        </Button>
        <ForumTopicsList />
      </div>
      {isOpenModal && (
        <Modal onCloseModal={closeModal}>
          <CreateTopicForm onCloseModal={closeModal} fetchData={fetchData} />
        </Modal>
      )}
    </div>
  );
};
