import React, { FC, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiService } from "@api/api.service";

import { CreateTopicSchema } from "@client/validation-schemas";
import { Button } from "@components/Button";
import { Input } from "@components/Input/Input";
import { TextArea } from "@components/Input/TextArea";
import { TEXTS } from "@core/translate";

interface TopicData {
  topic: string;
  describe: string;
}

const defaultValues: TopicData = {
  topic: "",
  describe: "",
};

interface Props {
  onCloseModal: () => void;
  fetchData: () => void;
}

export const CreateTopicForm: FC<Props> = ({
  onCloseModal,
  fetchData,
}: Props) => {
  const methods = useForm<TopicData>({
    defaultValues,
    resolver: yupResolver(CreateTopicSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = useCallback(
    (data: { name: string; description: string }) => {
      try {
        apiService.dino
          .createTopic({
            ...data,
          })
          .then(() => {
            fetchData();
            onCloseModal();
          });
      } catch {
        console.log(TEXTS.ERRORS.SOMETHING_WENT_WRONG);
      }
    },
    [onCloseModal]
  );

  return (
    <FormProvider {...methods}>
      <form
        className="p-5 mx-3 bg-white rounded w-full md:w-3/6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input name="name" label="Topic" info={TEXTS.FORUM.INFO} />
        <TextArea name="description" label="Describe" info={TEXTS.FORUM.INFO} />
        <div className="grid grid-cols-2 grid-rows-1 gap-4">
          <Button type="submit">{TEXTS.FORUM.CREATE_TOPIC}</Button>
          <Button type="button" onClick={onCloseModal}>
            {TEXTS.CANCEL}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
