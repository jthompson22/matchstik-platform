import React from "react";
import IAudioFile from '../models/interfaces/IAudioFile';
import moment from 'moment';

const audioMetaData = async (file: File): Promise<IAudioFile> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    const audio = document.createElement("audio");

    const result: IAudioFile = {
      name: file.name,
      size: `${Math.round(file.size / 1024 / 1024)}MB`,
      duration: null,
      url: URL.createObjectURL(file),
    };

    reader.onload = function (e: any) {
      audio.src = e.target.result as string;
      audio.addEventListener(
        "loadedmetadata",
        function () {
          const duration = moment
            .utc(moment.duration(audio.duration, "seconds")
            .asMilliseconds())
            .format("HH:mm:ss");
          result.duration = duration;
          resolve(result);
        },
        false
      );
    };

    reader.readAsDataURL(file);
  });
};

type AudioFile = {
  audioFile: IAudioFile | null;
  loading: boolean;
  error?: Error;
}

type AudioFileHook = (file: File) => AudioFile;

const useAudioFileHook: AudioFileHook = (
  file
) => {
  const [loading, setLoading] = React.useState(true);
  const [audioFile, setAudioFile] = React.useState<IAudioFile | null>(null);

  React.useEffect(() => {
    const doEffect = async () => {
      setLoading(true);
      setAudioFile(await audioMetaData(file));
      setLoading(false);
    }
    doEffect();
  }, [file]);

  return { loading, audioFile };
};

export default useAudioFileHook;
