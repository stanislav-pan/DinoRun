import React, { FC, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { TEXTS } from "@core/translate";
import { useDinoTheme } from "@hooks/useTheme";
import { apiService } from "@api/api.service";
import { userSelector } from "@redux/user/selectors";
import { Obstacle } from "./ui/Obstacle";
import { Player } from "./ui/Player";
import { CanvasText } from "./ui/Text";

export const Game: FC = () => {
  const { userStyle } = useDinoTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const playerRef = useRef<Player | null>(null);
  const scopeRef = useRef<CanvasText | null>(null);
  const highScoreRef = useRef<CanvasText | null>(null);
  const scopeStartTextRef = useRef<CanvasText | null>(null);
  const isFullScreen = useRef(false);

  const audioContext =
    typeof window !== "undefined" ? new AudioContext() : null;

  const playNote = (frequency: number, startTime: number, duration: number) => {
    if (audioContext) {
      const osc = audioContext.createOscillator(),
        volume = audioContext.createGain();

      osc.type = "triangle";
      volume.gain.value = 0.1;
      osc.connect(volume);
      volume.connect(audioContext.destination);
      osc.frequency.value = frequency;

      volume.gain.setValueAtTime(0.1, startTime + duration - 0.05);
      volume.gain.linearRampToValueAtTime(0, startTime + duration);
      osc.start(startTime);
      osc.stop(startTime + duration);
    }
  };

  const playBumpSound = () => {
    if (audioContext) {
      playNote(130, audioContext.currentTime, 0.116);
      playNote(200, audioContext.currentTime + 0.116, 0.232);
    }
  };

  const playJumpSound = () => {
    if (audioContext) {
      playNote(493.883, audioContext.currentTime, 0.116);
      playNote(659.255, audioContext.currentTime + 0.116, 0.232);
    }
  };

  const user = useSelector(userSelector);

  let obstacles: Obstacle[] = [];

  const createTextScore = useCallback(() => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (canvas && context) {
      const scoreTitle = new CanvasText(
        "Score: 0",
        25,
        100,
        "left",
        userStyle?.gameStyle.textColor || "#fff",
        canvas.width <= 876
      );
      scoreTitle.draw(context);
      scopeRef.current = scoreTitle;
    }
  }, [contextRef, canvasRef]);

  const createTextHighScore = useCallback(() => {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    const highScore1 = window.localStorage.getItem("highScore") || 0;
    if (canvas && context) {
      const highScore = new CanvasText(
        `High Score: ${highScore1}`,
        canvas.width,
        100,
        "right",
        userStyle?.gameStyle.textColor || "#fff",
        canvas.width <= 876
      );
      highScore.draw(context);
      highScoreRef.current = highScore;
    }
  }, [contextRef, canvasRef]);

  const createText = useCallback(
    (text: string) => {
      const context = contextRef.current;
      const canvas = canvasRef.current;

      if (canvas && context) {
        const offset = isFullScreen.current ? -100 : 0;

        const startGameText = new CanvasText(
          text,
          canvas.width / 2 + offset,
          canvas.height / 3,
          "center",
          userStyle?.gameStyle.textColor || "#fff",
          canvas.width <= 876
        );
        startGameText.draw(context);
        scopeStartTextRef.current = startGameText;
      }
    },
    [contextRef, canvasRef]
  );

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      const player = new Player(50, 0, 140, 170, "red", playJumpSound);
      createTextScore();
      createTextHighScore();
      requestAnimationFrame(update);
      playerRef.current = player;
    }

    if (event.code === "ArrowUp" || event.code === "ArrowDown") {
      playerRef.current &&
        playerRef.current.setKeys({
          code: event.code,
          value: true,
        });
    }

    if (event.code === "KeyF") {
      document?.body?.requestFullscreen().then(() => {
        isFullScreen.current = true;

        canvasRef.current?.setAttribute("style", "height: 100%");
      });
    }

    if (event.code === "Escape") {
      isFullScreen.current = false;
    }
  };

  const handleKeyup = (event: KeyboardEvent) => {
    if (event.code === "ArrowUp" || event.code === "ArrowDown") {
      playerRef.current &&
        playerRef.current.setKeys({
          code: event.code,
          value: false,
        });
    }
  };

  useEffect(() => {
    document?.addEventListener("keydown", handleKeydown);
    document?.addEventListener("keyup", handleKeyup);
    () => {
      document?.removeEventListener("keydown", handleKeydown);
      document?.removeEventListener("keyup", handleKeyup);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.backgroundColor = "#efcdb8";
      contextRef.current = canvas.getContext("2d");
      createText(TEXTS.GAME.PRESS_TO_START);
    }
  }, []);

  const spawnObstacle = () => {
    const canvas = canvasRef.current;
    if (canvas && playerRef.current) {
      const typeObstacle = Math.random() > 0.5 ? 1 : 0;
      const randomValue = Math.floor(Math.random() * 18);

      const size = (typeObstacle === 1 ? 60 : 90) + randomValue;
      const sizeHeight = (typeObstacle === 1 ? 100 : 50) + randomValue;
      const obstacle = new Obstacle(
        canvas.width + size,
        typeObstacle === 1 ? canvas.height - sizeHeight : canvas.height - 160,
        size,
        sizeHeight,
        "green",
        playerRef.current.gameSpeed,
        typeObstacle
      );
      obstacles.push(obstacle);
    }
  };

  function update(): void {
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (context && canvas && playerRef.current) {
      const start = requestAnimationFrame(update);
      context.clearRect(0, 0, canvas.width, canvas.height);

      playerRef.current.spawnTimer--;
      if (playerRef.current.spawnTimer <= 0) {
        spawnObstacle();

        playerRef.current.spawnTimer = 200 - 3 * 8;

        if (playerRef.current.spawnTimer < 60) {
          playerRef.current.spawnTimer = 60;
        }
      }

      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];

        if (obs.x + obs.w < 0) {
          obstacles.splice(i, 1);
        }

        const playerHeight = playerRef.current.y + playerRef.current.h - 10;
        const playerWidth = playerRef.current.x + playerRef.current.w - 20;
        const obstacleHeight = obs.y + obs.h;
        const obstacleWidth = obs.x + obs.w;

        if (
          playerHeight > obs.y &&
          playerWidth > obs.x &&
          playerRef.current.y < obstacleHeight &&
          playerRef.current.x < obstacleWidth
        ) {
          playBumpSound();
          cancelAnimationFrame(start);
          createText(TEXTS.GAME.GAME_OVER_WITH_SCORE(playerRef.current.score));
          user &&
            apiService.game.leaderboardNewLeaderRequest({
              data: {
                user: user.displayName,
                ottavaDevGame: playerRef.current.score,
              },
              ratingFieldName: "ottavaDevGame",
            });
          playerRef.current.spawnTimer = 200;
          playerRef.current.gameSpeed = 3;
          const oldHighScore = window.localStorage.getItem("highScore") || "0";
          if (
            parseInt(oldHighScore) < playerRef.current.score &&
            highScoreRef.current
          ) {
            window.localStorage.setItem(
              "highScore",
              playerRef.current.score.toString()
            );
            highScoreRef.current.title = TEXTS.GAME.HIGH_SCORE(
              playerRef.current.score
            );
            highScoreRef.current.draw(context);
          }
          playerRef.current.score = 0;
          obstacles = [];
        }
        obs.update(context);
      }

      playerRef.current.animate(canvas, 1, context);
      playerRef.current.score++;

      if (scopeRef.current) {
        scopeRef.current.title = TEXTS.GAME.SCORE(playerRef.current.score);
        scopeRef.current.draw(context);
      }
      if (highScoreRef.current) {
        highScoreRef.current.draw(context);
      }

      playerRef.current.gameSpeed += 0.003;
    }
  }

  return (
    <canvas ref={canvasRef} className={cn(userStyle?.background, "bg-cover")} />
  );
};
