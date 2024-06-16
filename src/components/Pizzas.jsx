import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  hover: { scale: 1.05, boxShadow: "0 8px 16px rgba(0,0,0,0.2)" },
};

const mediaVariants = {
  hover: { scale: 1.1 },
};

const initialCards = [
  { id: 1, title: "Tomato and mushroom pizza", image: "src/assets/pizza1.jpg" },
  { id: 2, title: "tomato and oregano pizza", image: "src/assets/pizza2.jpg" },
  {
    id: 3,
    title: "Italian pizza",
    image: "src/assets/pizza6.jpg",
  },
  { id: 4, title: "All-in-one Pizza", image: "src/assets/pizza3.jpg" },
  { id: 5, title: "3All-Out pizza", image: "src/assets/pizza5.jpg" },
  { id: 6, title: "pepperoni pizza", image: "src/assets/pizza4.jpg" },
  { id: 7, title: "paneer pizza", image: "src/assets/pizza13.jpg" },
  { id: 8, title: "cheesy pizza", image: "src/assets/pizza7.jpg" },
  { id: 9, title: "thin sausage pizza", image: "src/assets/pizza9.jpg" },
  { id: 10, title: "roasted cheese pizza", image: "src/assets/pizza10.jpg" },
  { id: 11, title: "mozarella cheese pizza", image: "src/assets/pizza11.jpg" },
  { id: 12, title: "salsa sauce pizza", image: "src/assets/pizza12.jpg" },
  { id: 13, title: "3All-Out pizza", image: "src/assets/pizza8.jpg" },
];

const loadMoreCards = (page) => {
  const newCards = [
    {
      id: page * 2 + 1,
      title: `new pizza ${page * 2 + 1}`,
      image: "src/assets/pizza14.jpg",
    },
    {
      id: page * 2 + 2,
      title: `new pizza ${page * 2 + 2}`,
      image: "src/assets/pizza15.jpg",
    },
    {
      id: page * 3 + 3,
      title: `new pizza ${page * 3 + 3}`,
      image: "src/assets/pizza16.jpg",
    },
    {
      id: page * 4 + 4,
      title: `new pizza ${page * 4 + 4}`,
      image: "src/assets/pizza17.jpg",
    },
  ];
  return newCards;
};

export default function ImgMediaCard() {
  const [cards, setCards] = useState(initialCards);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMoreData = () => {
    console.log("Current page:", page);
    if (cards.length >= 30) {
      console.log("New cards:", newCards);
      setHasMore(false);
      return;
    }

    const newCards = loadMoreCards(page);
    setTimeout(() => {
      console.log(newCards);
      setCards((prevCards) => [...prevCards, ...newCards]);
      console.log("few more new items added");
      setPage((prevPage) => prevPage + 1);
      console.log("list of items is incremented by 1");
    }, 800);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>PizzaPalace Menu</h1>
      </div>
      <InfiniteScroll
        dataLength={cards.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all</b>
          </p>
        }
        style={{ overflow: "hidden" }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <Card sx={{ maxWidth: 345 }}>
                <Tooltip title={card.title}>
                  <motion.div variants={mediaVariants} whileHover="hover">
                    <CardMedia
                      component="img"
                      alt="pizza"
                      height="140"
                      image={card.image}
                      sx={{ objectFit: "cover" }}
                    />
                  </motion.div>
                </Tooltip>
                <CardActions>
                  <Button size="small">
                    <ShareIcon sx={{ color: "#cc4e2f" }} />
                  </Button>
                  <Button size="small">
                    <ShoppingCartIcon sx={{ color: "#7798ed" }} />
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
