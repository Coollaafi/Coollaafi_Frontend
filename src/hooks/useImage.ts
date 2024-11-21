type UseImageProps = {
  setImgFile: React.Dispatch<React.SetStateAction<string>>;
  setImgFileBlob: React.Dispatch<React.SetStateAction<Blob>>;
  fileRef: React.RefObject<HTMLInputElement>;
};

export default function useImage({
  setImgFileBlob,
  setImgFile,
  fileRef,
}: UseImageProps) {
  const handleClick = () => {
    fileRef?.current?.click();
  };
  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.target.files?.[0];
    if (targetFile !== undefined) {
      setImgFileBlob(targetFile);
      setImgFile(URL.createObjectURL(targetFile));
    }
  };

  return {
    handleClick,
    changeFile,
  };
}
