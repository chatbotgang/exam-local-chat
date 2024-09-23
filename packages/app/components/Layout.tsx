import { Container, Typography } from "@mui/material";
import type { FC, ReactNode } from "react";

interface LayoutProps {
  title: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ title, children }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">
        {title}
      </Typography>
      {children}
    </Container>
  );
};

export default Layout;
