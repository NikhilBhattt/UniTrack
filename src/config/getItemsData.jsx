import { getDocs, collection } from "firebase/firestore";
import { db } from "./firebase";

export const getItemsData = async (setItemsData) => {
  const itemsCollectionRef = collection(db, "items");

  try {
    const big_data = await getDocs(itemsCollectionRef);
    const data = big_data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setItemsData(data);
  } catch (err) {
    console.error(err);
  }
};
