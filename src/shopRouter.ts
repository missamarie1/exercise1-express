import express from "express";
import Shop from "./models/Shop";

const shopRouter = express.Router();

const shops: Shop[] = [
  { id: 111, name: "Pepper's Pizza", rating: 4.5 },
  { id: 222, name: "Clive's Chives", rating: 3.4 },
  { id: 333, name: "Betty's Brews", rating: 4.3 },
  { id: 444, name: "Sylvester's Shoes", rating: 3.8 },
  { id: 555, name: "Teddy's Tunes", rating: 4.7 },
];

shopRouter.get("/", (req, res) => {
  const { minRating } = req.query;
  let filteredArray: Shop[] = shops;
  if (minRating) {
    filteredArray = filteredArray.filter((shop) => {
      return shop.rating >= +minRating;
    });
  }

  res.status(200).json(filteredArray);
});

shopRouter.get("/:id", (req, res) => {
  const id: number = +req.params.id;
  const foundShop: Shop | undefined = shops.find((shop) => {
    return shop.id === id;
  });
  if (foundShop) {
    res.status(200).json(foundShop);
  } else {
    res.status(404).json({ message: `Shop not found: ${id}` });
  }
});

export default shopRouter;
