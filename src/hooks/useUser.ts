import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";

const useUser = () => {
  const [userId, setUserId] = useState<string>("");
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (!userId) {
      const newUserId = uuidv4();
      setUserId(newUserId);
      Cookies.set("userId", newUserId, { expires: 365 });
    } else {
      setUserId(userId);
    }
  }, []);

  return {
    userId,
  };
};

export default useUser;
