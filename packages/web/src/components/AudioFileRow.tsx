import React, { useState } from "react";
import styled from "styled-components";
import makeEventHandler from "../utils/makeEventHandler";
import Icon, { Icons } from "../elements/Icon";
import { Colors } from "../styles/Colors";
import * as Polished from "polished";
import moment from "moment";
import Loader, { LoaderSizes } from "../elements/Loader";
import useAudioFile from "../hooks/useAudioFile.hook";
import IAudioFile from "../models/interfaces/IAudioFile";
import { AudioPlayerProvider, useAudioPlayer, useAudioPosition } from "react-use-audio-player";
import Flex from '../elements/Flex';

const AudioFile = styled.div`
height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  background-color: ${Colors.White};
  border-bottom: 1px solid ${Colors.Grey6};

  /* &:nth-of-type(2n) {
    background-color: ${Colors.White};
  } */
`;

const AudioFileControls = styled.div`
  display: flex;
  align-items: center;

  > div {
    margin-right: 10px;
  }
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${Colors.Grey1};
`;

const Info = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${Colors.Grey1};
`;

type AudioFileRowProps = {
  file: File;
};

const AudioFileRow: React.FC<AudioFileRowProps> = ({ file }) => {
  /* Hooks */
  const {
    audioFile,
    loading,
  }: {
    audioFile: IAudioFile | null;
    loading: boolean;
  } = useAudioFile(file);

  const {
    togglePlayPause,
    ready,
    loading: audioLoading,
    playing,
  } = useAudioPlayer({
    src: audioFile?.url || "",
    format: "mp3",
    autoplay: false,
  });

  const {
    position,
    duration,
  } = useAudioPosition({
    highRefreshRate: true,
  });

  const playDuration = moment
    .utc(moment.duration(position, "seconds").asMilliseconds())
    .format("HH:mm:ss");

  /** Render */
  if (loading || !ready || audioLoading || !audioFile) {
    return (
      <AudioFile>
        <Name>{file.name}</Name>
        <Loader size={LoaderSizes.VerySmall} color={Colors.Blue} />
      </AudioFile>
    );
  }

  return (
    <AudioFile>
      <Name>{audioFile.name}</Name>
      <Flex align="center">
        <AudioFileControls>
          <Icon
            color={Colors.Grey1}
            size={14}
            top="1px"
            icon={Icons.Backward}
            onClick={() => togglePlayPause()}
          />
          <Icon
            color={Colors.Grey1}
            size={14}
            top="1px"
            icon={playing ? Icons.Pause : Icons.Play}
            onClick={() => togglePlayPause()}
          />
          <Icon
            color={Colors.Grey1}
            size={14}
            top="1px"
            icon={Icons.Forward}
            onClick={() => togglePlayPause()}
          />
        </AudioFileControls>
        <Info>
          {playDuration}/{audioFile.duration}&nbsp;|&nbsp;{audioFile.size}
        </Info>
      </Flex>
    </AudioFile>
  );
};

const AudioFileRowRender: React.FC<AudioFileRowProps> = ({ file }) => (
  <AudioPlayerProvider>
    <AudioFileRow file={file} />
  </AudioPlayerProvider>
);

export default AudioFileRowRender;
