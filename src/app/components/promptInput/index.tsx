import {
  Button,
  Container,
  FormElement,
  Loading,
  Modal,
  Text,
  Textarea,
} from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import getPrompt from "./prompt";
function PromptInput(props: {
  onSubmit: (prompt: string) => Promise<void>;
  callingApi: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const [fullPrompt, setFullPrompt] = useState("");
  const [seePrompt, setSeePrompt] = useState(false);

  const onPromptChange = (
    ev: React.ChangeEvent<HTMLTextAreaElement> | ChangeEvent<FormElement>
  ) => {
    setPrompt(ev.target.value);
    setFullPrompt(getPrompt(ev.target.value));
  };

  const onCloseModal = () => {
    setSeePrompt(false);
  };

  const onGenerateSqlClick = () => {
    props.onSubmit(fullPrompt);
  };

  const disableButtons = !prompt || props.callingApi;
  return (
    <div>
      <Text h2>Describe la sentencia</Text>
      <Textarea fullWidth minRows={20} onChange={onPromptChange} />
      <Container
        display="flex"
        direction="row"
        justify="flex-end"
        css={{ paddingTop: "$10" }}
      >
        {!props.callingApi && (
          <>
            <Button
              color="gradient"
              auto
              disabled={disableButtons}
              onClick={() => {
                setSeePrompt(true);
              }}
            >
              Ver Prompt
            </Button>
            <Button
              color="gradient"
              auto
              disabled={disableButtons}
              css={{ marginLeft: "12px" }}
              onClick={onGenerateSqlClick}
            >
              Generar SQL
            </Button>
          </>
        )}
        {props.callingApi && <Loading size="md" />}
      </Container>
      <Modal blur open={seePrompt} onClose={onCloseModal}>
        <Modal.Header>
          <Text h3>Prompt</Text>
        </Modal.Header>
        <Modal.Body>{fullPrompt}</Modal.Body>
        <Modal.Footer>
          <Button onClick={onCloseModal} color="gradient">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PromptInput;
