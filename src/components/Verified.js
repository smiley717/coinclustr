import styled from "styled-components";
import theme from "utils/theme";
import { Label } from 'styled/Typography';
import { CheckCircleTwoTone } from '@ant-design/icons';

const VerifiedStyled = styled.div`
  color: ${theme.colors.green};
  display: grid;
  grid-template-columns: 14px 1fr;
  align-items: center;
  height: 20px;
`;

export const Verified = () => {
  return (
    <VerifiedStyled className="mt-2">
      <CheckCircleTwoTone style={{fontSize: '14px'}} twoToneColor={theme.colors.green} />
      <Label className="flex-1 pl-2">Verified</Label>
    </VerifiedStyled>

  );
}