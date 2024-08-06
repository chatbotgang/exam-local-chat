import { isString } from "./typeGuard";

export const readDataUriFromFile = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    const onLoad = () => {
      if (reader.result) {
        if (isString(reader.result)) {
          resolve(reader.result);
        } else {
          const str = new TextDecoder().decode(reader.result);
          resolve(str);
        }

        reader.removeEventListener("load", onLoad);
      }
    };
    reader.addEventListener("load", onLoad, false);
    reader.readAsDataURL(file);
  });
};
