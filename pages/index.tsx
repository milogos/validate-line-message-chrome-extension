import { Button } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  console.log("hello");
  return (
    <>
      <Button colorScheme="blue">Button</Button>
      <main className={styles.main}></main>
    </>
  );
}
