"use client";
import PromptInput from "./components/promptInput";
import styles from "./page.module.css";

import { Container, NextUIProvider, Text } from "@nextui-org/react";
import Editor from "./components/Editor";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [response, setResponse] = useState("");
  const [calling, setCalling] = useState(false);

  const handleSubmit = async (prompt: string) => {
    try {
      setCalling(true);
      setResponse("");
      const response = await fetch("/api/sendPrompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResponse(data.result);
      setCalling(false);
    } catch (err) {
      const error = err as {
        error: {
          message: string;
        };
      };

      // do something with the error
    }
  };

  return (
    <NextUIProvider>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.title}>
            <Container alignItems="center" display="flex">
              <Image src="/change.png" alt="change" width={64} height={64} />
              <Text h1 style={{paddingLeft: '10px'}}>De texto a SQL</Text>
            </Container>
            <div className={styles.divider} />
          </div>
          <div className={styles.sections}>
            <PromptInput onSubmit={handleSubmit} callingApi={calling} />
            <Editor code={response} />
          </div>
        </div>
      </main>
    </NextUIProvider>
  );
}
