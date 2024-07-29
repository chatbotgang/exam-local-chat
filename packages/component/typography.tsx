import { FC, PropsWithChildren } from "react";
import styled from "styled-components";

const TypographyContainer = styled.div`
  white-space: pre-wrap;
`;

export const Typography: FC<PropsWithChildren> = ({ children }) => {
  return <TypographyContainer>{children}</TypographyContainer>;
};
