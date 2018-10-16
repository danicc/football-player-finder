export const getAge = dt2 => {
  if (dt2 && typeof dt2.getMonth === "function") {
    var diff = (dt2.getTime() - Date.now()) / 1000;
    diff /= 60 * 60 * 24;
    return Math.abs(Math.round(diff / 365.25));
  } else {
    return -1;
  }
};
