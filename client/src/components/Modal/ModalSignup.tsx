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

const ModalSignup = ({ child, onClose }: { child: any; onClose: any }) => {
  const [name, setName] = useState("");
  const [email, setPlayerEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

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
      await axios.post("http://localhost:3001/auth/signup", {
        email,
        password,
        name,
      });
      localStorage.setItem("email", email);
      onClose({ ...child, signup: !child.signup });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <ModalContainer>
      <Heading fontSize="2em" color="#000000">
        Enter your name, email and password
      </Heading>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Input
          placeholder="Name"
          onChange={(e) => handleNameChange(e)}
          type="text"
        />
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
          <Button type="submit">Signup</Button>
          <Button
            onClick={(e) => {
              onClose({ ...child, signup: !child.signup});
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

export default ModalSignup;
