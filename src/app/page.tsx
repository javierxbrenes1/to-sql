"use client";
import PromptInput from "./components/promptInput";
import styles from "./page.module.css";
import 'react-toastify/dist/ReactToastify.css';

import { Container, NextUIProvider, Text } from "@nextui-org/react";
import Editor from "./components/Editor";
import { useState } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function Home() {
  const [response, setResponse] = useState("");
  const [calling, setCalling] = useState(false);

  const handleSubmit = async (prompt: string) => {
    try {
      setCalling(true);
      setResponse("");
      const response = await axios.post<any, AxiosResponse<{ result: string }>>("/api/sendPrompt", {
        prompt
      }, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      console.log(response);
      setResponse(response.data.result);
    } catch (err) {
      const error = err as AxiosError;
      //@ts-ignore;
      toast.error(`😥 ${error.response?.data?.message || 'Hubo un error intentalo de nuevo'}`);
      // do something with the error
    } finally {
      setCalling(false)
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
      <ToastContainer position="top-right" autoClose={10000} pauseOnFocusLoss />
    </NextUIProvider>
  );
}
