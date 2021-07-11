import React, { FC } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { useDinoTheme } from "@hooks/useTheme";
import { Spinner } from "@components/Spinner";
import { Header } from "@components/Header";
import { userAllSelector } from "@redux/user/selectors";

export const Home: FC = () => {
  const { userStyle } = useDinoTheme();
  const { pending } = useSelector(userAllSelector);

  if (pending)
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );

  return (
    <div className={cn("h-screen w-full bg-cover p-4", userStyle?.background)}>
      <Header />
      <div className={userStyle?.text}>
        Добро пожаловать в игру «DinoRun» — играйте, набивая рекорды пробега по
        прериям. По ходу игры динозавр прыгает через кактусы различных размеров,
        уворачивается от летящих с неба птеродактилей. Важно успеть вовремя,
        иначе пропадёт прогресс. Вот и весь геймплей, как долго сумеете
        выстоять? Играйте и бейте мировой рекорд пробега DinoRun!
      </div>
    </div>
  );
};
