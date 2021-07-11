import React, { FC, useEffect, useState } from "react";
import classNames from "classnames";
import { apiService } from "@api/api.service";

import { Leader } from "@core/models/leaderboard";
import { TEXTS } from "@core/translate";
import { Header } from "@components/Header";
import { useDinoTheme } from "@hooks/useTheme";
import { Spinner } from "@components/Spinner";

export const Leaderbord: FC = () => {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const { userStyle } = useDinoTheme();

  useEffect(() => {
    try {
      apiService.game
        .leaderboardRequest({
          ratingFieldName: "ottavaDevGame",
          cursor: 0,
          limit: 10,
        })
        .then((res) => {
          setLeaders(res.data);
        });
    } catch (e) {
      console.error(e);
    }
  }, []);

  if (!userStyle)
    return (
      <div className="flex justify-center items-center h-screen bg-yellow-100 ">
        <Spinner />
      </div>
    );

  return (
    <div
      className={classNames(
        "h-screen w-full bg-cover p-4",
        userStyle?.background
      )}
    >
      <Header />
      <div
        className={classNames(
          "max-w-screen-md m-auto bg-white text-primary rounded"
        )}
      >
        <h1 className={"p-4 text-3xl text-primary"}>{TEXTS.LEADERBOARD}</h1>
        <table className={"table-auto w-full"}>
          <thead>
            <tr className={"border-b border-gray-200 bg-primary text-white"}>
              <th className={"p-4 w-5/6 text-left border-r-2"}>Ник</th>
              <th className={"p-4 text-left"}>Очки</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map(({ data: leader }) => (
              <tr className={"border-b border-gray-200"} key={leader.user}>
                <td className={"p-4 border-r-2"}>{leader.user || "User"}</td>
                <td className={"p-4"}>{leader.ottavaDevGame}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
