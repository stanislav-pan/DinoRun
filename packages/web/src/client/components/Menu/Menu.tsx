import React, { FC, useRef, MouseEvent, useMemo } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

import { userSelector } from "@redux/user/selectors";

const menuAuthList = [
  {
    id: 1,
    value: "HOME",
    link: "/",
  },
  {
    id: 2,
    value: "PROFILE",
    link: "/profile",
  },
  {
    id: 3,
    value: "GAME",
    link: "/game",
  },
  {
    id: 4,
    value: "FORUM",
    link: "/forum",
  },
  {
    id: 5,
    value: "LEADERBOARD",
    link: "/leaderboard",
  },
];

const menuList = [
  {
    id: 1,
    value: "HOME",
    link: "/",
  },
  {
    id: 2,
    value: "SIG IN",
    link: "/login",
  },
  {
    id: 3,
    value: "SIGN UP",
    link: "/signup",
  },
];

interface Props {
  setIsMenu: (prop: boolean) => void;
}
export const Menu: FC<Props> = ({ setIsMenu }: Props) => {
  const history = useHistory();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const user = useSelector(userSelector);

  const currentMenu = useMemo(() => (user ? menuAuthList : menuList), [user]);

  const hideModal = (event: MouseEvent<HTMLDivElement>) => {
    if (wrapperRef.current === event.target) {
      setIsMenu(false);
    }
  };

  return (
    <div
      onClick={hideModal}
      ref={wrapperRef}
      className="fixed top-0 left-0 flex justify-center items-center w-full h-screen bg-gray-600 bg-opacity-70 z-40"
    >
      <ul className="text-6xl text-white text-center font-extralight bg-opacity-70 z-40">
        {currentMenu.map((item) => (
          <li
            key={item.id}
            className="py-4 px-10 border-b-2 border-t-2 cursor-pointer bg-indigo-900 bg-opacity-50 hover:bg-opacity-90 z-40"
            onClick={() => {
              if (history.location.pathname !== item.link) {
                history.push(item.link);
              } else {
                setIsMenu(false);
              }
            }}
          >
            {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};
