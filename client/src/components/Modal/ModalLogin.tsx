import { useState } from "react";
import axios from "axios";

import {
  Button,
  FlexContainer,
  Form,
  Heading,
  Input,
  ModalContainer,
} from "../styled-elements";

const ModalLogin = ({ child, onClose }: { child: any; onClose: any }) => {
  const [email, setPlayerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPlayerEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/auth/login", { email, password });
      localStorage.setItem("email", email);
      onClose({ ...child, login: !child.login });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <ModalContainer>
      <Heading fontSize="3em" color="#000000">
        Please enter your email and password
      </Heading>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          placeholder="Email"
          onChange={(e) => handleEmailChange(e)}
          type="text"
        />
        <Input
          placeholder="Password"
          onChange={(e) => handlePasswordChange(e)}
          type="text"
        />
        <FlexContainer
          flexDirection="row"
          justifyContent="space-between"
          width="50%"
          margin="5%"
        >
          <Button type="submit">Login</Button>
          <Button
            onClick={(e) => {
              onClose({ ...child, login: !child.login });
            }}
          >
            Close
          </Button>
        </FlexContainer>
      </Form>
      {error && <div>{error}</div>}
    </ModalContainer>
  );
};

export default ModalLogin;
