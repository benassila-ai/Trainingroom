import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  AppBar as MatAppBar,
  IconButton as MatIconButton,
  Button as MatButton,
  Container as MatContainer,
} from "@mui/material";

const drawerWidth = 240;
type APPBARProps = {
  open: boolean;
};

export const AppBar = styled(MatAppBar)`
  transition: margin 0.1s ease-out, width 0.1s ease-out;
  background: linear-gradient(45deg, #dce35b 30%, #45b649 90%);
  height: 80px;
  padding-top: 10px;
  ${({ open }: APPBARProps) =>
    open &&
    css`
      &&& {
        width: calc(100% - ${drawerWidth}px);
        margin-left: ${drawerWidth}px;
        transition: margin 0.1s ease-out, width 0.1s ease-out;
      }
    `}
`;

export const IconButton = styled(MatIconButton)`
  margin-right: 36px;
  ${({ open }: APPBARProps) =>
    open &&
    css`
      &&& {
        display: none;
      }
    `}
`;

type ISACTIVEProps = {
  isactive: boolean;
};

export const Button = styled(MatButton)`
  color: #ffffff;
  ${({ isactive }: ISACTIVEProps) =>
    isactive &&
    css`
      &&& {
        color: #5c67a3;
      }
    `}
 
`;

export const Container = styled(MatContainer)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  margin-right: -30px;
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 0 8px;
  justify-content: flex-end;
  min-height: 80px;
`;

export const Main = styled.main`
  flex-grow: 1;
  padding: 3rem 0;
  max-width: 1200px;
  margin: auto;
  transition: margin 0.1s ease-out, width 0.1s ease-out;
   ${({ open }: APPBARProps) =>
    open &&
    css`
      &&& {
        margin-left: ${2 * drawerWidth}px;
        transition: margin 0.1s ease-out, width 0.1s ease-out;
      }
    `}
`;
