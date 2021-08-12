import { data } from "@/utilities/initData.js";

export default {
  load() {
    if (!localStorage.data) {
      const dataStr = JSON.stringify(data);
      localStorage.setItem("data", dataStr);
    }
  },
};
