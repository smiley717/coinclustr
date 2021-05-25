import styled from "styled-components";

export const H3 = styled.h3`
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  letter-spacing: 0px;
  color: ${(props) => props.theme.colors.gray50};
`;

export const H4 = styled.h4`
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${(props) => props.theme.colors.gray50};
`;

export const LabelLarge = styled.span`
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0px;
  color: ${(props) => props.theme.colors.gray50};
`;

export const Label = styled.span`
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  color: ${(props) => props.theme.colors.menuColor};
`;

export const BodyText = styled.span`
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0em;
  color: ${(props) => props.theme.colors.alertDefaultDescriptionColor};
`;
export const BodyText500 = styled(BodyText)`
  font-weight: 500;
  line-height: 32px;
  text-align: center;
  color: ${(props) => props.theme.colors.gray80};
`;

export const Subtitle = styled.span`
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: 24px;
  letter-spacing: 0px;
  color: ${(props) => props.theme.colors.gray20};
`;

export const BigText = styled.span`
  font-family: ${(props) => props.theme.fonts.primaryFont};
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0px;
`;

export const Text = styled.span`
  font-size: 10px;
  line-height: 20px;
  display: flex;
  align-items: center;
`;
