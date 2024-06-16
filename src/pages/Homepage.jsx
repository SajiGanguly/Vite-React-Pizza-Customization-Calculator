import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import AppBar from "../components/Appbar";
import { motion } from "framer-motion";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    margin: 0,
  },
  content: {
    textAlign: "center",
    maxWidth: "200px",
    width: "100%",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    marginTop: "10px",
  },
};

function Homepage() {
  const navigate = useNavigate();

  const goToMainpage = () => {
    navigate("/about");
  };
  return (
    <>
      <div>
        <AppBar />
      </div>

      <div style={styles.container}>
        <div style={styles.content}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            style={{ width: "100%" }}
          >
            <motion.img
              src="src/assets/pizzaNew.png"
              alt="Pizza"
              style={{ width: "100%", height: "auto" }}
              initial={{ opacity: 0, x: "-100vw", rotate: 0 }}
              animate={{ opacity: 1, x: 0, rotate: 360 }}
              transition={{ type: "spring", stiffness: 50 }}
            />
            <Button onClick={goToMainpage} style={styles.button}>
              Click to order your pizza!
              <ArrowForwardOutlinedIcon />
            </Button>
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
