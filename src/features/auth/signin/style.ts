import styled from "@emotion/styled";
import {
  Card as MatCard,
  Typography as MatTypography,
  TextField as MatTextField,
  Button as MatButton,
  Container as MatContainer,
} from "@mui/material";

export const Card = styled(MatCard)`
  max-width: 600px;
  margin: "auto";
  text-align: "center";
  margint-top: 64px;
  margin-bottom: 16px;
  background-color: #f0f0f0;
`;

export const Typography = styled(MatTypography)`
  color: #5c67a3;
  margin-top: 16px;
`;

export const TextField = styled(MatTextField)`
  color: #5c67a3;
  margin-top: 16px;
`;

export const Button = styled(MatButton)`
  margin: "auto";
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const Container = styled(MatContainer)`
  margin-top: 64px;
`;
