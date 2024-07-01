// import { Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import Appbar from "../components/Appbar";
import Crusts from "../components/Crust";
import PizzaSize from "../components/PizzaSize";
import Toppings from "../components/Toppings";
import Modal from "react-modal";
import { motion } from "framer-motion";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-25%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "50%",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    overflow: "auto",
    outline: "none",
    padding: "20px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#ff5c5c",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#ffffff",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
    transition: "background-color 0.3s ease, transform 0.2s ease",
    outline: "none",
  },
  closeButtonHover: {
    backgroundColor: "#e05252",
    transform: "scale(1.05)",
  },
  closeButtonFocus: {
    backgroundColor: "#ff5c5c",
    boxShadow: "0px 0px 0px 4px rgba(255, 92, 92, 0.3)",
  },
  toppingsSection: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "20px",
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "16px",
    margin: "6px 0",
  },
  value: {
    marginLeft: "10px",
    color: "#f27466",
  },
};
function MainPage() {
  const [theCrust, setTheCrust] = useState([]);
  const [theToppings, setTheToppings] = useState([]);
  const [theSize, setTheSize] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showImage, setShowImage] = useState(false);

  const openModal = () => {
    calculateTotal();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowImage(true);
  };

  useEffect(() => {
    console.log(theCrust);
    console.log(theSize);
    console.log(theToppings);
    console.log(calculateTotal());
  }, [theCrust, theSize, theToppings]);

  const appbarStyle = {
    position: "fixed",
  };
  const calculateTotal = () => {
    let totalPrice = 0;
    totalPrice += Object.values(theCrust)[0] || 0;
    totalPrice += Object.values(theSize)[0] || 0;
    theToppings.forEach((topping) => {
      totalPrice += topping.price;
    });
    setTotalPrice(totalPrice);
    return totalPrice;
  };

  return (
    <>
      <Appbar style={appbarStyle} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "60px",
          padding: "20px",
          backgroundColor: "#f27866",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            gap: "20px",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,1.1)",
              borderRadius: "8px",
              backgroundColor: "#faaa9d",
              flex: 1,
            }}
          >
            <Crusts setTheCrust={setTheCrust} />
          </div>

          <div
            style={{
              maxWidth: "500px",
              padding: "40px",
              boxShadow: "0 4px 9px rgba(0,0,0,1.1)",
              borderRadius: "8px",
              backgroundColor: "#faaa9d",
              flex: 1,
            }}
          >
            <PizzaSize setTheSize={setTheSize} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            gap: "20px",
          }}
        >
          <div
            style={{
              maxWidth: "500px",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0,0,0,1.1)",
              borderRadius: "8px",
              backgroundColor: "#f29c77",
              flex: 1,
            }}
          >
            <Toppings setTheToppings={setTheToppings} />
          </div>
        </div>
        <Button onClick={() => openModal()}>Checkout</Button>
      </div>

      {/* <Container>
        <Box mt={6}>
          <Menu />
        </Box>
      </Container> */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          closeModal();
        }}
        style={customStyles}
        contentLabel="Bill"
      >
        <h2>Your Pizza Bill</h2>
        <h4 style={customStyles.heading}>
          Selected Crust:{" "}
          {Object.keys(theCrust).map((type) => (
            <div key={type} style={customStyles.item}>
              <span style={customStyles.value}>{type}</span>
              <span>Price:</span>
              <span style={customStyles.value}>${theCrust[type]}</span>
            </div>
          ))}
        </h4>
        <h4 style={customStyles.heading}>
          Selected Size :{" "}
          {Object.keys(theSize).map((type) => (
            <div key={type} style={customStyles.item}>
              <span>Type:</span>
              <span style={customStyles.value}>{type}</span>
              <span>Price:</span>
              <span style={customStyles.value}>${theSize[type]}</span>
            </div>
          ))}
        </h4>
        <div className="{customStyles.toppingsSection}">
          <h4 style={customStyles.heading}>
            Selected Toppings:{" "}
            {theToppings.length > 0 ? (
              theToppings.map((topping) => (
                <div key={topping.name} style={customStyles.item}>
                  <span>Name:</span>
                  <span style={customStyles.value}>{topping.name}</span>
                  <span>Price:</span>
                  <span style={customStyles.value}>${topping.price}</span>
                </div>
              ))
            ) : (
              <div style={customStyles.item}>
                <span>No Topping Selected</span>
              </div>
            )}
          </h4>
        </div>
        <h4 style={customStyles.heading}>Total Price: ${totalPrice}</h4>
        <button onClick={closeModal} style={customStyles.closeButton}>
          Close Modal
        </button>
        {/* <button onClick={closeModal} style={customStyles.closeButton}>
          Proceed to pay
        </button> */}
      </Modal>

      {showImage && (
        <motion.div
          initial={{ opacity: 0, x: "100vw" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "-100vw" }}
          transition={{ type: "spring", stiffness: 50 }}
          style={{
            position: "fixed",
            top: "60%",
            left: "10%",
            transform: "translate(-50%, -50%)",
            zIndex: 1000,
            width: "100%",
            maxWidth: "1000px",
            height: "auto",
            overflow: "hidden", 
            
          }}
        >
          <motion.img
            src="../../deliveryman.png"
            style={{ width: "300px", height: "auto" }}
          />
          {/* <Button
            style={{
              backgroundColor: "#ffffff",
              border: "none",
              padding: "15px 30px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "#333333",
              borderRadius: "8px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 3.1)",
              cursor: "pointer",
            }}
          >
            Your order is the on the way
          </Button> */}
        </motion.div>
      )}
    </>
  );
}

export default MainPage;
