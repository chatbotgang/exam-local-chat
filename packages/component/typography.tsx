import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

interface ITypographyProps {
  color?: string;
  fontSize?: string;
}

const TypographyContainer = styled.div`
  white-space: pre-wrap;
`;

export const Typography: FC<PropsWithChildren<ITypographyProps>> = ({
  color,
  fontSize,
  children,
}) => {
  return (
    <TypographyContainer style={{ color, fontSize }}>
      {children}
    </TypographyContainer>
  );
};
