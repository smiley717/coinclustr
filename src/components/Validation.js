import styled from "styled-components";
import theme from "utils/theme";
import { Label } from 'styled/Typography';
import { SyncOutlined } from "@ant-design/icons";

const VerifiedStyled = styled.div`
  color: ${theme.colors.primaryBlueColor};
  display: grid;
  grid-template-columns: 14px 1fr;
  align-items: center;
  height: 20px;
  cursor: pointer;
`;

export const Validation = () => {
  return (
    <VerifiedStyled className="mt-2">
      <SyncOutlined style={{fontSize: '14px'}} spin twoToneColor={theme.colors.primaryBlueColor} />
      <Label className="flex-1 pl-2">Validation</Label>
    </VerifiedStyled>
  );
}