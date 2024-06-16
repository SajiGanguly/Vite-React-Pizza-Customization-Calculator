// src/components/InfiniteScroll.js
import { useState, useRef, useCallback } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

const data = [
  "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
  "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
  "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
  "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
  "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
  "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
  "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
  "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
  "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
];

const loadMoreItems = (startIndex, count) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newItems = data.slice(startIndex, startIndex + count);
      resolve(newItems);
    }, 500);
  });
};

const InfiniteScroll = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const observer = useRef();

  const ITEMS_PER_LOAD = 5;

  const lastItemRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreItems(startIndex, ITEMS_PER_LOAD).then((newItems) => {
            if (newItems.length === 0) {
              setHasMore(false);
            } else {
              setItems((prevItems) => [...prevItems, ...newItems]);
              setStartIndex((prevIndex) => prevIndex + ITEMS_PER_LOAD);
            }
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, startIndex]
  );

  return (
    <Box>
      {items.map((item, index) => (
        <img
          key={index}
          ref={index === items.length - 1 ? lastItemRef : null}
          src={item}
          alt={`Image ${index}`}
          style={{ width: "100%", height: "auto", marginBottom: "10px" }}
        />
      ))}
      {hasMore && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default InfiniteScroll;
