// Min to sec
export const convertMinutesSeconds = (time: number) => {
  const minutes = time / 60;
  const convertMinutesTostring = minutes.toString()?.split(".")[0];
  const mualtipleableValue =
    minutes.toString()?.split(".").length > 1
      ? Number(convertMinutesTostring)
      : Number(convertMinutesTostring) - 1;
  const second = time - mualtipleableValue * 60;

  return { convertedminutes: mualtipleableValue, convertedseconds: second };
};

//  OPT auto focse
export const autoFocusOnOtp = (id: string) => {
  const nextfield: HTMLInputElement | null = document.querySelector(
    `input[id=${id}]`,
  );
  if (nextfield !== null) {
    nextfield.focus();
  }
};

// Dummy Localhostere Save Data
export const sessionStoreData = (val: any) => {
  try {
    return sessionStorage.setItem("_client_data_", JSON.stringify(val));
  } catch (error) {
    console.log(error);
    return null;
  }
};
