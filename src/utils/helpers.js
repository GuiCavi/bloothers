export const getImageHeight = (imageHeight, deviceHeight) => {
  return Math.min(
    (imageHeight * deviceHeight) / iPhone5sHeight,
    iPhoneXSMaxHeight,
  );
};
export const iPhoneXSMaxHeight = 896;

export const iPhone5sHeight = 568;
